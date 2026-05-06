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
        errorContainer.innerHTML = `<p class="errors">You have <span class="errorSpan">${gameState.errors.ids.length}</span> errors</p>`;
    } else {
        errorContainer.innerHTML = '';
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.innerHTML = `
            <div id="congratImageCont">
                <img src="images/congratulations.gif" alt="you won image" />
                <button id="restart" class="btn waves-effect waves-light">Play Again <i class="material-icons right">send</i></button>
            </div>`;
        document.getElementById('restart').onclick = () => window.location.reload();
        document.getElementById('gameTittle').innerHTML = '<h1>Congratulations! You won!</h1>';
        sendBtn.classList.add('hidden-element');
    }
};

const handleDifficultyChange = (e) => {
    difficultyBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    gameState.difficulty = e.target.getAttribute('data-difficulty');
};

const startGame = () => {
    const summary = document.getElementsByTagName("summary")[0];
    if (summary) summary.classList.add('hidden-element');
    document.getElementById('difficultyContainer').classList.add('hidden-element');

    const maxInputRange = gameState.difficulty === 'easy' ? 10 : (gameState.difficulty === 'medium' ? 20 : 50);
    const matrix = generateCompleteGrid(maxInputRange);
    
    if (!matrix) {
        console.error("Failed to generate a valid game grid.");
        gameState.gameMatrix = generateCompleteGrid(20);
    } else {
        gameState.gameMatrix = matrix;
    }

    updateUIWithMatrix(gameState.gameMatrix);

    startBtn.classList.add('hidden-element');
    sendBtn.classList.remove('hidden-element');
    sendBtn.disabled = false;
};

difficultyBtns.forEach(btn => btn.addEventListener('click', handleDifficultyChange));
startBtn.addEventListener("click", startGame);
sendBtn.addEventListener('click', checkUserInputs);
