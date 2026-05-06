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
    test('getNumDividers returns correct factors', () => {
        expect(getNumDividers(12)).toEqual([1, 2, 3, 4, 6, 12]);
        const divisors100 = getNumDividers(100);
        [1, 2, 4, 5, 10, 20, 25, 50, 100].forEach(d => {
            expect(divisors100).toContain(d);
        });
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
