/**
 * Guess the Numbers Game Logic
 * Aligned with Senior Developer Standards: ES6+, Functional Programming, Clean Code.
 */

import { generateCompleteGrid, isLineCorrect } from './gameLogic.js';
import { saveGameState, loadGameState, clearGameState, updateStats, loadStats } from './storage.js';
import { translations } from './translations.js';

const gameState = {
    difficulty: 'easy',
    language: localStorage.getItem('language') || 'en',
    errors: {
        ids: []
    },
    fields: [
        { id: 'firstRowFirstNum', row: 0, col: 0 },
        { id: 'firstRowSecNum', row: 0, col: 2 },
        { id: 'firstRowThirdNum', row: 0, col: 4 },
        { id: 'thirdRowFirstNum', row: 2, col: 0 },
        { id: 'thirdRowSecNum', row: 2, col: 2 },
        { id: 'thirdRowThirdNum', row: 2, col: 4 },
        { id: 'fifthRowFirstNum', row: 4, col: 0 },
        { id: 'fifthRowSecNum', row: 4, col: 2 },
        { id: 'fifthRowThirdNum', row: 4, col: 4 }
    ],
    gameMatrix: [],
    userMatrix: Array(7).fill(null).map(() => Array(7).fill(0))
};

/**
 * Updates the UI language based on current gameState.
 */
const updateLanguageUI = () => {
    const langData = translations[gameState.language];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (langData[key]) el.textContent = langData[key];
    });
    document.getElementById('langToggle').textContent = gameState.language === 'en' ? 'BG' : 'EN';
};

const toggleLanguage = () => {
    gameState.language = gameState.language === 'en' ? 'bg' : 'en';
    localStorage.setItem('language', gameState.language);
    updateLanguageUI();
    
    // Update rules toggle text if visible
    const isRulesVisible = !rulesSection.classList.contains('hidden');
    const langData = translations[gameState.language];
    rulesToggle.querySelector('[data-i18n="howToPlay"]').textContent = isRulesVisible ? langData.hideRules : langData.howToPlay;
};

document.getElementById('langToggle').addEventListener('click', toggleLanguage);

const displayStats = () => {
    const stats = loadStats();
    const container = document.getElementById('statsContainer');
    // Always show container now, but populate with data
    container.classList.remove('hidden');
    document.getElementById('totalWins').textContent = stats.totalWins || 0;
    document.getElementById('easyWins').textContent = stats.difficultyWins.easy || 0;
    document.getElementById('medWins').textContent = stats.difficultyWins.medium || 0;
    document.getElementById('hardWins').textContent = stats.difficultyWins.hard || 0;
};

const startBtn = document.getElementById("startGame");
const sendBtn = document.getElementById("sendResult");
const difficultyBtns = document.querySelectorAll(".difficulty-btn");
const rulesToggle = document.getElementById('rulesToggle');
const rulesSection = document.getElementById('rulesSection');

/**
 * Toggles the rules section visibility and updates the toggle button UI.
 */
const toggleRules = () => {
    rulesSection.classList.toggle('hidden');
    const isVisible = !rulesSection.classList.contains('hidden');
    const langData = translations[gameState.language];
    
    const label = isVisible ? langData.hideRules : langData.howToPlay;
    
    rulesToggle.innerHTML = isVisible ? 
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg> <span data-i18n="howToPlay">${label}</span>` : 
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg> <span data-i18n="howToPlay">${label}</span>`;
};

rulesToggle.addEventListener('click', toggleRules);

/**
 * Validates rows and columns in real-time and updates UI.
 */
const performRealTimeValidation = () => {
    const indices = [0, 2, 4];
    
    // Rows
    indices.forEach(i => {
        const isCorrect = isLineCorrect(gameState.userMatrix, 'row', i);
        const totalInput = document.getElementById(
            i === 0 ? 'firstRowTotalNum' : (i === 2 ? 'thirdRowTotalNum' : 'fifthRowTotalNum')
        );
        const parent = totalInput.parentElement;
        parent.classList.remove('correct-line', 'pending-line');
        if (isCorrect) {
            parent.classList.add('correct-line');
        } else {
            // Check if row is partially filled (dirty)
            const rowInputs = gameState.fields.filter(f => f.row === i);
            const isDirty = rowInputs.some(f => gameState.userMatrix[f.row][f.col] !== 0);
            if (isDirty) parent.classList.add('pending-line');
        }
    });

    // Columns
    indices.forEach(i => {
        const isCorrect = isLineCorrect(gameState.userMatrix, 'col', i);
        const totalInput = document.getElementById(
            i === 0 ? 'verticalTotalOne' : (i === 2 ? 'verticalTotalTwo' : 'verticalTotalThree')
        );
        const parent = totalInput.parentElement;
        parent.classList.remove('correct-line', 'pending-line');
        if (isCorrect) {
            parent.classList.add('correct-line');
        } else {
            const colInputs = gameState.fields.filter(f => f.col === i);
            const isDirty = colInputs.some(f => gameState.userMatrix[f.row][f.col] !== 0);
            if (isDirty) parent.classList.add('pending-line');
        }
    });
};

/**
 * Updates the UI with the generated matrix totals and initial values.
 */
const updateUIWithMatrix = (matrix, userValues = null) => {
    // Horizontal Totals
    document.getElementById("firstRowTotalNum").value = matrix[0][6];
    document.getElementById("thirdRowTotalNum").value = matrix[2][6];
    document.getElementById("fifthRowTotalNum").value = matrix[4][6];
    
    // Vertical Totals
    document.getElementById("verticalTotalOne").value = matrix[6][0];
    document.getElementById("verticalTotalTwo").value = matrix[6][2];
    document.getElementById("verticalTotalThree").value = matrix[6][4];

    // Sync static values to userMatrix
    gameState.userMatrix[0][6] = matrix[0][6];
    gameState.userMatrix[2][6] = matrix[2][6];
    gameState.userMatrix[4][6] = matrix[4][6];
    gameState.userMatrix[6][0] = matrix[6][0];
    gameState.userMatrix[6][2] = matrix[6][2];
    gameState.userMatrix[6][4] = matrix[6][4];

    const inputs = document.querySelectorAll("input");
    
    // Prefill logic for fresh game
    let prefillIndices = [];
    if (!userValues) {
        const prefillCount = gameState.difficulty === 'easy' ? 4 : (gameState.difficulty === 'medium' ? 2 : 1);
        while (prefillIndices.length < prefillCount) {
            const r = Math.floor(Math.random() * gameState.fields.length);
            if (!prefillIndices.includes(r)) prefillIndices.push(r);
        }
    }

    inputs.forEach(input => {
        const fieldIdx = gameState.fields.findIndex(f => f.id === input.id);
        if (fieldIdx !== -1) {
            const field = gameState.fields[fieldIdx];
            if (userValues) {
                // Restore from saved state
                input.value = userValues[field.row][field.col];
                gameState.userMatrix[field.row][field.col] = userValues[field.row][field.col];
                
                // Ensure correct styling even on restore
                if (input.value === matrix[field.row][field.col] && input.disabled) {
                    input.parentElement.classList.remove('bg-slate-100', 'dark:bg-slate-700');
                    input.parentElement.classList.add('bg-emerald-50', 'disabled');
                } else {
                    input.disabled = false;
                    input.parentElement.classList.add('active');
                }
            } else if (prefillIndices.includes(fieldIdx)) {
                input.value = matrix[field.row][field.col];
                input.disabled = true;
                input.parentElement.classList.remove('bg-slate-100', 'dark:bg-slate-700');
                input.parentElement.classList.add('bg-emerald-50', 'disabled');
                gameState.userMatrix[field.row][field.col] = matrix[field.row][field.col];
            } else {
                input.disabled = false;
                input.parentElement.classList.add('active');
                input.value = 0;
                gameState.userMatrix[field.row][field.col] = 0;
            }
        }
    });

    performRealTimeValidation();
};

const handleInput = (e) => {
    const input = e.target;
    const val = parseInt(input.value, 10) || 0;
    const field = gameState.fields.find(f => f.id === input.id);
    if (field) {
        gameState.userMatrix[field.row][field.col] = val;
        performRealTimeValidation();
        saveGameState({
            difficulty: gameState.difficulty,
            gameMatrix: gameState.gameMatrix,
            userMatrix: gameState.userMatrix
        });
    }
};

const handleKeyDown = (e) => {
    const field = gameState.fields.find(f => f.id === e.target.id);
    if (!field) return;

    let nextRow = field.row;
    let nextCol = field.col;

    if (e.key === 'ArrowUp') nextRow -= 2;
    if (e.key === 'ArrowDown') nextRow += 2;
    if (e.key === 'ArrowLeft') nextCol -= 2;
    if (e.key === 'ArrowRight') nextCol += 2;

    const nextField = gameState.fields.find(f => f.row === nextRow && f.col === nextCol);
    if (nextField) {
        document.getElementById(nextField.id).focus();
    }
};

const checkUserInputs = () => {
    gameState.errors.ids = [];
    gameState.fields.forEach(field => {
        if (gameState.userMatrix[field.row][field.col] !== gameState.gameMatrix[field.row][field.col]) {
            gameState.errors.ids.push(field.id);
        }
    });

    const errorContainer = document.getElementById('errorsContainer');
    const langData = translations[gameState.language];

    if (gameState.errors.ids.length > 0) {
        const errorMsg = langData.errorsFound.replace('{n}', gameState.errors.ids.length);
        errorContainer.innerHTML = `<p class="errors text-red-500 font-bold">${errorMsg}</p>`;
    } else {
        updateStats(gameState.difficulty);
        clearGameState();
        errorContainer.innerHTML = '';
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.innerHTML = `
            <div id="congratImageCont" class="text-center py-8">
                <img src="images/congratulations.gif" alt="you won image" class="mx-auto rounded-lg shadow-lg mb-6 max-w-full h-auto" />
                <button id="restart" class="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2 mx-auto">
                    ${langData.restart}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>`;
        document.getElementById('restart').onclick = () => window.location.reload();
        document.getElementById('gameTittle').innerHTML = `<h1 class="text-4xl font-extrabold text-emerald-600 tracking-tight">${langData.winTitle}</h1>`;
        sendBtn.classList.add('hidden');
        
        // Trigger Confetti
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }
};

const handleDifficultyChange = (e) => {
    difficultyBtns.forEach(btn => btn.classList.remove('active-difficulty'));
    e.target.classList.add('active-difficulty');
    gameState.difficulty = e.target.getAttribute('data-difficulty');
};

const startGame = (restoredData = null) => {
    const summary = document.querySelector("summary");
    if (summary) summary.classList.add('hidden');
    document.getElementById('difficultyContainer').classList.add('hidden');

    if (restoredData) {
        gameState.difficulty = restoredData.difficulty;
        gameState.gameMatrix = restoredData.gameMatrix;
        updateUIWithMatrix(gameState.gameMatrix, restoredData.userMatrix);
    } else {
        const maxInputRange = gameState.difficulty === 'easy' ? 10 : (gameState.difficulty === 'medium' ? 20 : 50);
        gameState.gameMatrix = generateCompleteGrid(maxInputRange);
        updateUIWithMatrix(gameState.gameMatrix);
        saveGameState({
            difficulty: gameState.difficulty,
            gameMatrix: gameState.gameMatrix,
            userMatrix: gameState.userMatrix
        });
    }

    startBtn.classList.add('hidden');
    sendBtn.classList.remove('hidden');
    sendBtn.disabled = false;
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateLanguageUI();
    displayStats();
    // Theme initialization
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.getElementById('sunIcon').classList.remove('hidden');
        document.getElementById('moonIcon').classList.add('hidden');
    }

    const saved = loadGameState();
    if (saved) {
        const langData = translations[gameState.language];
        if (confirm(langData.savedGamePrompt)) {
            startGame(saved);
        } else {
            clearGameState();
        }
    }
});

const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('sunIcon').classList.toggle('hidden');
    document.getElementById('moonIcon').classList.toggle('hidden');
};

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

difficultyBtns.forEach(btn => btn.addEventListener('click', handleDifficultyChange));
startBtn.addEventListener("click", () => startGame());
sendBtn.addEventListener('click', checkUserInputs);

document.getElementById('numbersTable').addEventListener('input', handleInput);
document.getElementById('numbersTable').addEventListener('keydown', handleKeyDown);
