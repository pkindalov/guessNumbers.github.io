/**
 * Core game logic for Guess the Numbers.
 * Pure functions for mathematical generation and validation.
 */

export const getNumDividers = (num) => {
    if (num <= 0) return [];
    const numFactors = [];
    for (let i = 1; i <= Math.floor(Math.sqrt(num)); i++) {
        if (num % i === 0) {
            numFactors.push(i);
            if (num / i !== i) numFactors.push(num / i);
        }
    }
    return numFactors.sort((a, b) => a - b);
};

export const genDividableTriplet = (availableNums) => {
    const nums = [...availableNums];
    let cyclesCounter = 0;
    while (cyclesCounter < 500) {
        const n1 = nums[Math.floor(Math.random() * nums.length)];
        const n2 = nums[Math.floor(Math.random() * nums.length)];
        const d = nums[Math.floor(Math.random() * nums.length)];

        // Ensure unique and mathematically valid
        if (n1 !== n2 && n1 !== d && n2 !== d && (n1 * n2) % d === 0) {
            const res = (n1 * n2) / d;
            if (res > 0 && res <= 100) return [n1, n2, d];
        }
        cyclesCounter++;
    }
    return null; 
};

export const genFifthRowTriplet = (availableNums, knownNum2) => {
    const nums = availableNums.filter(n => n !== knownNum2);

    let cyclesCounter = 0;
    while (cyclesCounter < 500) {
        const n1 = nums[Math.floor(Math.random() * nums.length)];
        const d = nums[Math.floor(Math.random() * nums.length)];

        if (d !== n1 && d !== knownNum2 && n1 !== knownNum2 && (n1 * knownNum2) % d === 0) {
            const res = (n1 * knownNum2) / d;
            if (res > 0 && res <= 100) return [n1, knownNum2, d];
        }
        cyclesCounter++;
    }
    return null;
};

export const generateFirstRowNum = (availableNums, divisor) => {
    const candidates = availableNums.filter(n => n % divisor === 0 && (n / divisor) > 0);
    if (candidates.length > 0) {
        return candidates[Math.floor(Math.random() * candidates.length)];
    }
    return null;
};

export const generateThirdRowFirstCell = (availableNums, total) => {
    const divisors = getNumDividers(total).filter(d => availableNums.includes(d));
    if (divisors.length > 0) {
        return divisors[Math.floor(Math.random() * divisors.length)];
    }
    return null;
};

export const restCellsRndNumGen = (availableNums) => {
    if (availableNums.length === 0) return null;
    return availableNums[Math.floor(Math.random() * availableNums.length)];
};

export const checkFieldsRepeatNums = (gameMatrix) => {
    const nums = [
        gameMatrix[0][0], gameMatrix[0][2], gameMatrix[0][4],
        gameMatrix[2][0], gameMatrix[2][2], gameMatrix[2][4],
        gameMatrix[4][0], gameMatrix[4][2], gameMatrix[4][4]
    ];
    // Check for duplicates and that all numbers are valid
    const validNums = nums.filter(n => typeof n === 'number' && n > 0);
    return new Set(validNums).size === 9;
};

export const checkForNegativeResultsAndZeroes = (gameMatrix) => {
    const results = [
        gameMatrix[0][6], gameMatrix[2][6], gameMatrix[4][6],
        gameMatrix[6][0], gameMatrix[6][2], gameMatrix[6][4]
    ];
    const inputs = [
        gameMatrix[0][0], gameMatrix[0][2], gameMatrix[0][4],
        gameMatrix[2][0], gameMatrix[2][2], gameMatrix[2][4],
        gameMatrix[4][0], gameMatrix[4][2], gameMatrix[4][4]
    ];
    const allNumeric = [...results, ...inputs];
    return allNumeric.every(res => typeof res === 'number' && res > 0 && res <= 100 && Number.isInteger(res));
};

export const calculateTotals = (gameMatrix) => {
    const matrix = JSON.parse(JSON.stringify(gameMatrix));
    // Horizontal Totals
    matrix[0][6] = (matrix[0][0] / matrix[0][2]) + matrix[0][4];
    matrix[2][6] = matrix[2][0] + matrix[2][2] - matrix[2][4];
    matrix[4][6] = (matrix[4][0] * matrix[4][2]) / matrix[4][4];

    // Vertical Totals
    matrix[6][0] = (matrix[0][0] / matrix[2][0]) * matrix[4][0];
    matrix[6][2] = (matrix[0][2] * matrix[2][2]) / matrix[4][2];
    matrix[6][4] = matrix[0][4] + (matrix[2][4] * matrix[4][4]);
    
    return matrix;
};

export const generateCompleteGrid = (maxInputRange = 20) => {
    let retryCount = 0;
    const initialMatrix = [
        [0, 'mathChar', 0, 'mathChar', 0, 'mathChar', 0],
        ['mathChar', 'empty', 'mathChar', 'empty', 'mathChar', 'empty', 'empty'],
        [0, 'mathChar', 0, 'mathChar', 0, 'mathChar', 0],
        ['mathChar', 'empty', 'mathChar', 'empty', 'mathChar', 'empty', 'empty'],
        [0, 'mathChar', 0, 'mathChar', 0, 'mathChar', 0],
        ['mathChar', 'empty', 'mathChar', 'empty', 'mathChar', 'empty', 'empty'],
        [0, 'empty', 0, 'empty', 0, 'empty', 'empty']
    ];

    const availablePool = Array.from({length: maxInputRange}, (_, i) => i + 1);

    while (retryCount < 5000) {
        const matrix = JSON.parse(JSON.stringify(initialMatrix));
        let availableNums = [...availablePool];

        // Step 1: Middle column (dividable triplet)
        const triplet1 = genDividableTriplet(availableNums);
        if (!triplet1) { retryCount++; continue; }
        matrix[0][2] = triplet1[0];
        matrix[2][2] = triplet1[1];
        matrix[4][2] = triplet1[2];
        availableNums = availableNums.filter(n => !triplet1.includes(n));

        // Step 2: First cell (must be divisible by matrix[0][2])
        matrix[0][0] = generateFirstRowNum(availableNums, matrix[0][2]);
        if (!matrix[0][0]) { retryCount++; continue; }
        availableNums = availableNums.filter(n => n !== matrix[0][0]);

        // Step 3: Column 1 dependent cell
        matrix[2][0] = generateThirdRowFirstCell(availableNums, matrix[0][0]);
        if (!matrix[2][0]) { retryCount++; continue; }
        availableNums = availableNums.filter(n => n !== matrix[2][0]);

        // Step 4: Row 5 / Col 1 dependent cells
        const triplet2 = genFifthRowTriplet(availableNums, matrix[4][2]);
        if (!triplet2) { retryCount++; continue; }
        matrix[4][0] = triplet2[0];
        matrix[4][4] = triplet2[2];
        availableNums = availableNums.filter(n => n !== matrix[4][0] && n !== matrix[4][4]);

        // Step 5: Remaining cells
        matrix[0][4] = restCellsRndNumGen(availableNums);
        if (!matrix[0][4]) { retryCount++; continue; }
        availableNums = availableNums.filter(n => n !== matrix[0][4]);

        matrix[2][4] = restCellsRndNumGen(availableNums);
        if (!matrix[2][4]) { retryCount++; continue; }
        availableNums = availableNums.filter(n => n !== matrix[2][4]);

        const finalMatrix = calculateTotals(matrix);
        if (checkFieldsRepeatNums(finalMatrix) && checkForNegativeResultsAndZeroes(finalMatrix)) {
             return finalMatrix;
        }
        retryCount++;
    }
    return null;
};

/**
 * Validates a single row or column of the matrix based on user inputs.
 * @param {Array} matrix - The 7x7 game matrix.
 * @param {string} type - 'row' or 'col'.
 * @param {number} index - The index of the row or column (0, 2, or 4).
 * @returns {boolean} - True if the line is mathematically correct.
 */
export const isLineCorrect = (matrix, type, index) => {
    if (type === 'row') {
        const [a, , b, , c, , total] = matrix[index];
        if (index === 0) return (a / b) + c === total;
        if (index === 2) return a + b - c === total;
        if (index === 4) return (a * b) / c === total;
    } else {
        const a = matrix[0][index];
        const b = matrix[2][index];
        const c = matrix[4][index];
        const total = matrix[6][index];
        if (index === 0) return (a / b) * c === total;
        if (index === 2) return (a * b) / c === total;
        if (index === 4) return a + (b * c) === total;
    }
    return false;
};
