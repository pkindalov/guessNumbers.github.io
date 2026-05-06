/**
 * Guess the Numbers Game Logic
 * Aligned with Senior Developer Standards: ES6+, Functional Programming, Clean Code.
 */

import { generateCompleteGrid } from './gameLogic.js';

const gameState = {
    difficulty: 'easy',
    errors: {
        ids: []
    },
    fields: [
        { id: 'firstRowSecNum', row: 0, col: 2 },
        { id: 'firstRowThirdNum', row: 0, col: 4 },
        { id: 'thirdRowFirstNum', row: 2, col: 0 },
        { id: 'thirdRowSecNum', row: 2, col: 2 },
        { id: 'thirdRowThirdNum', row: 2, col: 4 },
        { id: 'fifthRowFirstNum', row: 4, col: 0 },
        { id: 'fifthRowSecNum', row: 4, col: 2 },
        { id: 'fifthRowThirdNum', row: 4, col: 4 }
    ],
    gameMatrix: []
};

const startBtn = document.getElementById("startGame");
const sendBtn = document.getElementById("sendResult");
const difficultyBtns = document.querySelectorAll(".difficulty-btn");

/**
 * Updates the UI with the generated matrix totals and initial values.
 */
const updateUIWithMatrix = (matrix) => {
    // Horizontal Totals (Column 6)
    document.getElementById("firstRowTotalNum").value = matrix[0][6];
    document.getElementById("thirdRowTotalNum").value = matrix[2][6];
    document.getElementById("fifthRowTotalNum").value = matrix[4][6];
    
    // Vertical Totals (Row 6)
    document.getElementById("verticalTotalOne").value = matrix[6][0];
    document.getElementById("verticalTotalTwo").value = matrix[6][2];
    document.getElementById("verticalTotalThree").value = matrix[6][4];

    const inputs = document.getElementsByTagName("input");
    
    // Easy mode: pre-fill 3 more random fields
    const prefillCount = gameState.difficulty === 'easy' ? 3 : (gameState.difficulty === 'medium' ? 1 : 0);
    const indicesToPrefill = [];
    if (prefillCount > 0) {
        while (indicesToPrefill.length < prefillCount) {
            const r = Math.floor(Math.random() * gameState.fields.length);
            if (!indicesToPrefill.includes(r)) indicesToPrefill.push(r);
        }
    }

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input.id === 'firstRowFirstNum') {
            input.value = matrix[0][0];
        } else if (['firstRowTotalNum', 'thirdRowTotalNum', 'fifthRowTotalNum', 'verticalTotalOne', 'verticalTotalTwo', 'verticalTotalThree'].includes(input.id)) {
            // Totals stay disabled/readonly
            input.disabled = true;
        } else {
            const fieldId = input.id;
            const fieldIdx = gameState.fields.findIndex(f => f.id === fieldId);
            
            if (fieldIdx !== -1 && indicesToPrefill.includes(fieldIdx)) {
                input.value = matrix[gameState.fields[fieldIdx].row][gameState.fields[fieldIdx].col];
                input.disabled = true;
                input.parentNode.classList.add('disabled');
            } else {
                input.disabled = false;
                input.parentNode.classList.remove('disabled');
                input.parentNode.classList.add('active');
                input.value = 0;
            }
        }
    }
};

const checkUserInputs = () => {
    gameState.errors.ids = [];
    const results = gameState.fields.map(field => {
        const input = document.getElementById(field.id);
        return {
            id: field.id,
            value: parseInt(input.value, 10),
            expected: gameState.gameMatrix[field.row][field.col]
        };
    });

    results.forEach(res => {
        if (res.value !== res.expected) {
            gameState.errors.ids.push(res.id);
        }
    });

    const errorContainer = document.getElementById('errorsContainer');
    if (gameState.errors.ids.length > 0) {
        errorContainer.innerHTML = `<p class="errors text-red-500 font-bold">You have <span class="errorSpan bg-red-100 px-2 rounded">${gameState.errors.ids.length}</span> errors</p>`;
    } else {
        errorContainer.innerHTML = '';
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.innerHTML = `
            <div id="congratImageCont" class="text-center py-8">
                <img src="images/congratulations.gif" alt="you won image" class="mx-auto rounded-lg shadow-lg mb-6 max-w-full h-auto" />
                <button id="restart" class="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2 mx-auto">
                    Play Again
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>`;
        document.getElementById('restart').onclick = () => window.location.reload();
        document.getElementById('gameTittle').innerHTML = '<h1 class="text-4xl font-extrabold text-emerald-600 tracking-tight">Congratulations! You won!</h1>';
        sendBtn.classList.add('hidden');
    }
};

const handleDifficultyChange = (e) => {
    difficultyBtns.forEach(btn => btn.classList.remove('active-difficulty'));
    e.target.classList.add('active-difficulty');
    gameState.difficulty = e.target.getAttribute('data-difficulty');
};

const startGame = () => {
    const summary = document.getElementsByTagName("summary")[0];
    if (summary) summary.classList.add('hidden');
    document.getElementById('difficultyContainer').classList.add('hidden');

    const maxInputRange = gameState.difficulty === 'easy' ? 10 : (gameState.difficulty === 'medium' ? 20 : 50);
    const matrix = generateCompleteGrid(maxInputRange);
    
    if (!matrix) {
        console.error("Failed to generate a valid game grid.");
        gameState.gameMatrix = generateCompleteGrid(20);
    } else {
        gameState.gameMatrix = matrix;
    }

    updateUIWithMatrix(gameState.gameMatrix);

    startBtn.classList.add('hidden');
    sendBtn.classList.remove('hidden');
    sendBtn.disabled = false;
};

difficultyBtns.forEach(btn => btn.addEventListener('click', handleDifficultyChange));
startBtn.addEventListener("click", startGame);
sendBtn.addEventListener('click', checkUserInputs);
