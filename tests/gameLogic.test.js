import { 
    getNumDividers, 
    checkFieldsRepeatNums, 
    checkForNegativeResultsAndZeroes, 
    calculateTotals,
    genDividableTriplet,
    genFifthRowTriplet,
    generateFirstRowNum,
    generateCompleteGrid
} from '../scripts/gameLogic.js';

describe('Game Logic Tests - Extended', () => {
    test('getNumDividers returns correct factors including edge cases', () => {
        expect(getNumDividers(12)).toEqual([1, 2, 3, 4, 6, 12]);
        expect(getNumDividers(1)).toEqual([1]);
        expect(getNumDividers(0)).toEqual([]); 
        expect(getNumDividers(-5)).toEqual([]);
        expect(getNumDividers(7)).toEqual([1, 7]); // Prime number
        const divisors100 = getNumDividers(100);
        [1, 2, 4, 5, 10, 20, 25, 50, 100].forEach(d => {
            expect(divisors100).toContain(d);
        });
    });

    test('checkFieldsRepeatNums detects duplicates including [0][0]', () => {
        const matrix = Array(7).fill(null).map(() => Array(7).fill(0));
        // Fill with unique numbers 1-9
        matrix[0][0] = 1; matrix[0][2] = 2; matrix[0][4] = 3;
        matrix[2][0] = 4; matrix[2][2] = 5; matrix[2][4] = 6;
        matrix[4][0] = 7; matrix[4][2] = 8; matrix[4][4] = 9;
        expect(checkFieldsRepeatNums(matrix)).toBe(true);

        // Duplicate [0][0] and [0][2]
        matrix[0][0] = 2;
        expect(checkFieldsRepeatNums(matrix)).toBe(false);
    });

    test('checkForNegativeResultsAndZeroes validates correctly', () => {
        const matrix = Array(7).fill(null).map(() => Array(7).fill(1));
        matrix[0][6] = 10; matrix[2][6] = 20; matrix[4][6] = 30;
        matrix[6][0] = 40; matrix[6][2] = 50; matrix[6][4] = 60;
        expect(checkForNegativeResultsAndZeroes(matrix)).toBe(true);

        // Zero value
        matrix[0][6] = 0;
        expect(checkForNegativeResultsAndZeroes(matrix)).toBe(false);
        matrix[0][6] = 10;

        // Negative value
        matrix[2][6] = -5;
        expect(checkForNegativeResultsAndZeroes(matrix)).toBe(false);
        matrix[2][6] = 20;

        // Non-integer
        matrix[4][6] = 10.5;
        expect(checkForNegativeResultsAndZeroes(matrix)).toBe(false);
        matrix[4][6] = 30;

        // Above 100
        matrix[6][0] = 101;
        expect(checkForNegativeResultsAndZeroes(matrix)).toBe(false);
    });

    test('genDividableTriplet produces valid triplet with large range', () => {
        const available = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const [n1, n2, d] = genDividableTriplet(available);
        expect((n1 * n2) % d).toBe(0);
        expect(d).not.toBe(0);
    });

    test('generateFirstRowNum respects maxRange', () => {
        const available = [];
        const divisor = 5;
        const result = generateFirstRowNum(available, divisor, 100);
        expect(result % divisor).toBe(0);
        expect(result).toBeLessThanOrEqual(100);
    });

    test('calculateTotals computes correct values for larger numbers', () => {
        const matrix = Array(7).fill(null).map(() => Array(7).fill(0));
        matrix[0][0] = 100; matrix[0][2] = 10; matrix[0][4] = 50;
        matrix[2][0] = 20;  matrix[2][2] = 30; matrix[2][4] = 10;
        matrix[4][0] = 15;  matrix[4][2] = 8;  matrix[4][4] = 4;

        const updated = calculateTotals(matrix);
        expect(updated[0][6]).toBe(60);
        expect(updated[2][6]).toBe(40);
        expect(updated[4][6]).toBe(30);
        expect(updated[6][0]).toBe(75);
        expect(updated[6][2]).toBe(37.5);
        expect(updated[6][4]).toBe(90);
    });

    test('generateCompleteGrid returns a valid matrix for Hard (50) mode', () => {
        const matrix = generateCompleteGrid(50);
        expect(matrix).not.toBeNull();
        
        const allNums = matrix.flat().filter(n => typeof n === 'number');
        expect(allNums.every(n => n > 0 && n <= 100)).toBe(true);
        expect(checkFieldsRepeatNums(matrix)).toBe(true);
        expect(checkForNegativeResultsAndZeroes(matrix)).toBe(true);
    });
});
