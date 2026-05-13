import { 
    generateCompleteGrid,
    checkFieldsRepeatNums,
    checkForNegativeResultsAndZeroes
} from '../scripts/gameLogic.js';

describe('Strict Game Rules Verification', () => {
    
    const verifyGridForRange = (maxRange) => {
        const matrix = generateCompleteGrid(maxRange);
        expect(matrix).not.toBeNull();

        const inputCells = [
            matrix[0][0], matrix[0][2], matrix[0][4],
            matrix[2][0], matrix[2][2], matrix[2][4],
            matrix[4][0], matrix[4][2], matrix[4][4]
        ];

        // Rule 1: All inputs must be within [1, maxRange]
        inputCells.forEach(val => {
            expect(val).toBeGreaterThanOrEqual(1);
            expect(val).toBeLessThanOrEqual(maxRange);
        });

        // Rule 2: All 9 inputs must be unique
        const uniqueInputs = new Set(inputCells);
        expect(uniqueInputs.size).toBe(9);

        // Rule 3: Math must be correct and results must be positive integers <= 100
        expect(checkForNegativeResultsAndZeroes(matrix)).toBe(true);
    };

    test('Easy Mode (1-10) satisfies all strict rules', () => {
        // Run multiple times to ensure stability of random generation
        for(let i = 0; i < 10; i++) {
            verifyGridForRange(10);
        }
    });

    test('Medium Mode (1-20) satisfies all strict rules', () => {
        for(let i = 0; i < 5; i++) {
            verifyGridForRange(20);
        }
    });

    test('Hard Mode (1-50) satisfies all strict rules', () => {
        for(let i = 0; i < 5; i++) {
            verifyGridForRange(50);
        }
    });

    test('Reproduction: generateFirstRowNum bug (was picking numbers outside available pool)', () => {
        const matrix = generateCompleteGrid(10); // Easy mode
        const inputCells = [
            matrix[0][0], matrix[0][2], matrix[0][4],
            matrix[2][0], matrix[2][2], matrix[2][4],
            matrix[4][0], matrix[4][2], matrix[4][4]
        ];
        
        // Before fix, matrix[0][0] often returned something like 12 or 25 for maxRange=10
        inputCells.forEach(n => expect(n).toBeLessThanOrEqual(10));
    });
});
