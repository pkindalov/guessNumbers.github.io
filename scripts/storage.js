/**
 * Storage utility for persistence.
 */

const STORAGE_KEY = 'guessNumbers_gameState';
const STATS_KEY = 'guessNumbers_stats';

export const saveGameState = (state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadGameState = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};

export const clearGameState = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const updateStats = (difficulty, won = true) => {
    const stats = loadStats();
    if (won) {
        stats.totalWins += 1;
        stats.difficultyWins[difficulty] = (stats.difficultyWins[difficulty] || 0) + 1;
    }
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const loadStats = () => {
    const data = localStorage.getItem(STATS_KEY);
    return data ? JSON.parse(data) : { totalWins: 0, difficultyWins: {} };
};
