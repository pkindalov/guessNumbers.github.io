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

        if (d !== 0 && d !== n1 && d !== n2 && (n1 * n2) % d === 0) {
            const res = (n1 * n2) / d;
            if (res > 0 && res <= 100) return [n1, n2, d];
        }
        cyclesCounter++;
    }
    return [4, 5, 2]; 
};

export const genFifthRowTriplet = (availableNums, knownNum2) => {
    const nums = availableNums.filter(n => n !== knownNum2);

    let cyclesCounter = 0;
    while (cyclesCounter < 500) {
        const n1 = nums[Math.floor(Math.random() * nums.length)];
        const d = nums[Math.floor(Math.random() * nums.length)];

        if (d !== 0 && d !== n1 && d !== knownNum2 && (n1 * knownNum2) % d === 0) {
            const res = (n1 * knownNum2) / d;
            if (res > 0 && res <= 100) return [n1, knownNum2, d];
        }
        cyclesCounter++;
    }
    return [2, knownNum2, 1];
};

export const generateFirstRowNum = (availableNums, divisor, maxRange = 50) => {
    let counter = 0;
    while (counter < 200) {
        const randomNumber = Math.floor(Math.random() * maxRange) + 1;
        if (randomNumber % divisor === 0 && !availableNums.includes(randomNumber)) {
            const res = randomNumber / divisor;
            if (res > 0 && res <= 100) return randomNumber;
        }
        counter++;
    }
    return divisor * 2;
};

export const generateThirdRowFirstCell = (availableNums, total) => {
    const divisors = getNumDividers(total).filter(d => availableNums.includes(d));
    if (divisors.length > 0) {
        return divisors[Math.floor(Math.random() * divisors.length)];
    }
    return availableNums[0] || 1;
};

export const restCellsRndNumGen = (availableNums) => {
    const pool = availableNums.filter(n => n <= 10);
    const finalPool = pool.length > 0 ? pool : availableNums;
    return finalPool[Math.floor(Math.random() * finalPool.length)];
};

export const checkFieldsRepeatNums = (gameMatrix) => {
    const nums = [
        gameMatrix[0][0], gameMatrix[0][2], gameMatrix[0][4],
        gameMatrix[2][0], gameMatrix[2][2], gameMatrix[2][4],
        gameMatrix[4][0], gameMatrix[4][2], gameMatrix[4][4]
    ];
    return new Set(nums).size === nums.length;
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

    while (retryCount < 2000) {
        const matrix = JSON.parse(JSON.stringify(initialMatrix));
        let availableNums = [...availablePool];

        const triplet1 = genDividableTriplet(availableNums);
        matrix[0][2] = triplet1[0];
        matrix[2][2] = triplet1[1];
        matrix[4][2] = triplet1[2];
        availableNums = availableNums.filter(n => !triplet1.includes(n));

        matrix[0][0] = generateFirstRowNum(availableNums, matrix[0][2], 100);
        // matrix[0][0] might not be in availableNums if it came from fallback
        availableNums = availableNums.filter(n => n !== matrix[0][0]);

        matrix[2][0] = generateThirdRowFirstCell(availableNums, matrix[0][0]);
        availableNums = availableNums.filter(n => n !== matrix[2][0]);

        const triplet2 = genFifthRowTriplet(availableNums, matrix[4][2]);
        matrix[4][0] = triplet2[0];
        matrix[4][4] = triplet2[2];
        availableNums = availableNums.filter(n => n !== matrix[4][0] && n !== matrix[4][4]);

        matrix[0][4] = restCellsRndNumGen(availableNums);
        availableNums = availableNums.filter(n => n !== matrix[0][4]);

        matrix[2][4] = restCellsRndNumGen(availableNums);
        availableNums = availableNums.filter(n => n !== matrix[2][4]);

        const finalMatrix = calculateTotals(matrix);
        if (checkFieldsRepeatNums(finalMatrix) && checkForNegativeResultsAndZeroes(finalMatrix)) {
             return finalMatrix;
        }
        retryCount++;
    }
    return null;
};
