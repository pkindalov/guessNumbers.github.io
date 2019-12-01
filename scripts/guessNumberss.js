var that = this;
that.startGameCount = 0;
let startBtn = document.getElementById("startGame");
let sendBtn = document.getElementById("sendResult");
// sendBtn.style.visibility = 'hidden';
let topLimitRandNums = 20;
that.errors = {
    ids: []
}
that.fields = [{
        id: 'firstRowSecNum',
        row: 0,
        col: 2
    },
    {
        id: 'firstRowThirdNum',
        row: 0,
        col: 4
    },
    {
        id: 'thirdRowFirstNum',
        row: 2,
        col: 0
    },
    {
        id: 'thirdRowSecNum',
        row: 2,
        col: 2
    },
    {
        id: 'thirdRowThirdNum',
        row: 2,
        col: 4
    },
    {
        id: 'fifthRowFirstNum',
        row: 4,
        col: 0
    },
    {
        id: 'fifthRowSecNum',
        row: 4,
        col: 2
    },
    {
        id: 'fifthRowThirdNum',
        row: 4,
        col: 4
    }
];

that.userInputs = [];


that.gameMatrix = [
    [0, 'mathChar', 0, 'mathChar', 0, 'mathChar', 0],
    ['mathChar', 'empty', 'mathChar', 'empty', 'mathChar', 'empty', 'empty'],
    [0, 'mathChar', 0, 'mathChar', 0, 'mathChar', 0],
    ['mathChar', 'empty', 'mathChar', 'empty', 'mathChar', 'empty', 'empty'],
    [0, 'mathChar', 0, 'mathChar', 0, 'mathChar', 0],
    ['mathChar', 'empty', 'mathChar', 'empty', 'mathChar', 'empty', 'empty'],
    [0, 'empty', 0, 'empty', 0, 'empty', 'empty']
];

that.numDividers = [];
that.filteredDividers = [];
that.numName = '';
that.availableNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// that.availableNumbersForUse = {
//     one: {
//         num: 1,
//         count: 0
//     },
//     two: {
//         num: 2,
//         count: 0
//     },
//     three: {
//         num: 3,
//         count: 0
//     },
//     four: {
//         num: 4,
//         count: 0
//     },
//     five: {
//         num: 5,
//         count: 0
//     },
//     six: {
//         num: 6,
//         count: 0
//     },
//     seven: {
//         num: 7,
//         count: 0
//     },
//     eight: {
//         num: 8,
//         count: 0
//     },
//     nine: {
//         num: 9,
//         count: 0
//     },
// };

// function getNotRepeatDivider(dividers) {
//     let dividerName = "";
//     for (let div of dividers) {
//         // console.log(div);
//         if (div == 0) continue;
//         dividerName = getNumberName(div);
//         if (that.availableNumbersForUse[dividerName].count == 0) {
//             that.availableNumbersForUse[dividerName].count = 1;
//             return that.availableNumbersForUse[dividerName].num;
//         }


//         return 1;
//     }
// }

function genNumOneByNumTwoDividedByThirdNum() {
    let pos = -1;
    let num1 = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
    let num2 = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
    let cyclesCounter = 0;

    // while (num1 == num2) {
    //     num2 = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
    // }

    pos = that.availableNums.indexOf(num1);
    if (pos != -1) {
        that.availableNums.splice(pos, 1);
    }

    pos = that.availableNums.indexOf(num2);
    if (pos != -1) {
        that.availableNums.splice(pos, 1);
    }


    let divider = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];

    while (divider == 0 || divider == num1 || divider == num2) {
        divider = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
    }

    pos = that.availableNums.indexOf(divider);
    if (pos != -1) {
        that.availableNums.splice(pos, 1);
    }

    let expression = (num1 * num2) % divider == 0;
    if (!expression) {
        that.availableNums.push(num1);
        that.availableNums.push(num2);
        that.availableNums.push(divider);
    }

    while (!expression) {
        if (cyclesCounter > 9) break;
        num1 = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
        pos = that.availableNums.indexOf(num1);
        if (pos != -1) {
            that.availableNums.splice(pos, 1);
        }
        num2 = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
        pos = that.availableNums.indexOf(num2);
        if (pos != -1) {
            that.availableNums.splice(pos, 1);
        }
        divider = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
        pos = that.availableNums.indexOf(divider);
        if (pos != -1) {
            that.availableNums.splice(pos, 1);
        }

        // while (num1 == num2) {
        //     num2 = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
        // }

        expression = (num1 * num2) % divider == 0;

        if (expression) {
            break;
        }

        // for (let i = that.availableNums.length - 1; i >= 0; i--) {
        //     expression = (num1 * num2) % that.availableNums[i] == 0;
        //     if (expression) {
        //         if (that.availableNums[i] != num1 && that.availableNums[i] != num2) {
        //             divider = that.availableNums[i];
        //             pos = that.availableNums[divider];
        //             that.availableNums.splice(pos, 1);
        //             break;
        //         } else {
        //             continue;
        //         }
        //     }
        // }
        cyclesCounter++;

        that.availableNums.push(num1);
        that.availableNums.push(num2);
        that.availableNums.push(divider);

    }


    pos = that.availableNums.indexOf(divider);
    if (pos != -1) {
        that.availableNums.splice(pos, 1);
    }
    pos = that.availableNums.indexOf(num1);

    if (pos != -1) {
        that.availableNums.splice(pos, 1);
    }
    pos = that.availableNums.indexOf(num2);

    if (pos != -1) {
        that.availableNums.splice(pos, 1);
    }

    // that.availableNums.push(num1);
    // that.availableNums.push(num2);
    // that.availableNums.push(divider);
    // console.log('num1 : ' + num1 + '\n' + 'num2: ' + num2 + '\n' + 'divider: ' + divider);

    return [num1, num2, divider];

}





function genNumOneByNumTwoDividedByThirdNumFiftRow(num2) {
    let pos = that.availableNums.indexOf(num2);
    if (pos != -1) {
        that.availableNums.splice(pos, 1);
    }
    pos = -1;
    let num1 = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
    let cyclesCounter = 0;
    // console.log(that.availableNums);

    while (num1 == num2) {
        num1 = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
    }

    pos = that.availableNums.indexOf(num1);
    if (pos != -1) {
        that.availableNums.splice(pos, 1);
    }

    let divider = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];

    while (divider == 0 || divider == num1 || divider == num2) {
        divider = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
    }

    pos = that.availableNums.indexOf(divider);
    if (pos != -1) {
        that.availableNums.splice(pos, 1);
    }

    let expression = (num1 * num2) % divider == 0;
    if (!expression) {
        that.availableNums.push(num1);
        that.availableNums.push(divider);
    }

    while (!expression) {
        if (cyclesCounter > 9) break;
        num1 = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
        pos = that.availableNums.indexOf(num1);
        that.availableNums.splice(pos, 1);
        divider = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
        pos = that.availableNums.indexOf(divider);
        that.availableNums.splice(pos, 1);

        while (num1 == num2) {
            num1 = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
        }

        expression = (num1 * num2) % divider == 0;
        // for (let i = that.availableNums.length - 1; i >= 0; i--) {
        //     let deb = that.availableNums[i];
        //     expression = (num1 * num2) % that.availableNums[i] == 0;
        //     if (expression && num2 != that.availableNums[i]) {
        //         divider = that.availableNums[i];
        //         // pos = that.availableNums[divider];
        //         that.availableNums.splice(pos, i);
        //         break;
        //     }
        // }

        cyclesCounter++;

        that.availableNums.push(num1);
        that.availableNums.push(divider);
    }


    pos = that.availableNums.indexOf(divider);
    if (pos != -1) {
        that.availableNums.splice(pos, 1);
    }

    return [num1, num2, divider];
}








// }


//function getRndEvenNumber() {
//    let evenNumsArr = [2, 4, 6, 8];
//    // console.log(that.availableNums);
//    let evenNum = evenNumsArr[(Math.floor(Math.random() * evenNumsArr.length))];
//    let evenNumPos = that.availableNums.indexOf(evenNum);
//
//    while (evenNumPos < 0) {
//        evenNum = evenNumsArr[(Math.floor(Math.random() * evenNumsArr.length))];
//        evenNumPos = that.availableNums.indexOf(evenNum);
//    }

//that.availableNums.splice(evenNumPos, 1);
//     // console.log(that.availableNums);
//return evenNum;

// if (evenNumPos != -1) {
//     that.availableNums.splice(evenNumPos, 1);
//     // console.log(that.availableNums);
//     return evenNum;
// } else {
//     getRndEvenNumber();
// }
// }


// function getRndOddNumber() {
//     let oddNumsArr = [1, 3, 5, 7, 9];
//     // console.log(that.availableNums);
//     let oddNum = oddNumsArr[(Math.floor(Math.random() * oddNumsArr.length))];
//     let oddNumPos = that.availableNums.indexOf(oddNum);

//     while (oddNumPos < 0) {
//         oddNum = oddNumsArr[(Math.floor(Math.random() * oddNumsArr.length))];
//         oddNumPos = that.availableNums.indexOf(oddNum);
//     }

//     that.availableNums.splice(oddNumPos, 1);
//     //     // console.log(that.availableNums);
//     return oddNum;

// }




// function genRndNumInEmptyCells() {
//     let availNumKeys = Object.keys(that.availableNumbersForUse);
//     //let rndNumName = '';
//     let rndNum = Math.floor(Math.random() * availNumKeys.length);
//     let retNumber = 1;
//     let keyName = '';

//     if (availNumKeys[rndNum]) {
//         keyName = availNumKeys[rndNum];
//         retNumber = that.availableNumbersForUse[keyName].num;
//         delete that.availableNumbersForUse[keyName];
//         return retNumber;
//     }
// }


// function genNumDeleteCell(number, number2 = 1) {
//     let availNumKeys = Object.keys(that.availableNumbersForUse);
//     //let rndNumName = '';
//     let rndNum = Math.floor(Math.random() * availNumKeys.length);
//     let retNumber = 1;
//     let keyName = '';

//     if (availNumKeys[rndNum] && (number * number2) % that.availableNumbersForUse[availNumKeys[rndNum]].num == 0) {
//         keyName = availNumKeys[rndNum];
//         retNumber = that.availableNumbersForUse[keyName].num;
//         delete that.availableNumbersForUse[keyName];
//         return retNumber;
//     } else if (availNumKeys[rndNum]) {
//         for (let key of availNumKeys) {
//             if (number % that.availableNumbersForUse[key].num == 0) {
//                 retNumber = that.availableNumbersForUse[key].num;
//                 delete that.availableNumbersForUse[key];
//                 return retNumber;
//             }
//         }

//         return that.availableNumbersForUse[availNumKeys[0]].num;
//         // retNumber = that.availableNumbersForUse[keyName].num;
//         // keyName = availNumKeys[rndNum];
//         // return retNumber;
//     }


// }



// function getNumberName(num) {
//     switch (num) {
//         case 0:
//             return 0;
//         case 1:
//             return "one";
//         case 2:
//             return "two";
//         case 3:
//             return "three";
//         case 4:
//             return "four";
//         case 5:
//             return "five";
//         case 6:
//             return "six";
//         case 7:
//             return "seven";
//         case 8:
//             return "eight";
//         case 9:
//             return "nine";
//     }
// }


// function getRandNum(limit) {
//     let randomNumber = Math.floor(Math.random() * limit);
//     randomNumber % 2 == 0 ? randomNumber : getRandNum(limit);
//     return randomNumber;
//     // if (randomNumber % 2 == 0 && randomNumber % 4 == 0 && randomNumber % 6 == 0 && randomNumber % 8 == 0) {
//     //     return randomNumber;
//     // } else {
//     //     getRandNum(limit);
//     // }
// }

function generateFirstRowNum(number) {
    let randomNumber = Math.floor(Math.random() * 50);
    let expression = randomNumber % number == 0;
    let counter = 0;
    while (!expression) {
        randomNumber = Math.floor(Math.random() * 50);
        expression = randomNumber % number == 0;
        if (counter > 9) break;
    }

    let numDividers = getNumDividers(randomNumber);
    let result = 0;
    counter = 0;
    while (randomNumber == 0 || numDividers.length > 6 || randomNumber == number || (randomNumber % number) != 0 || that.availableNums.indexOf(randomNumber) >= 0) {
        randomNumber = Math.floor(Math.random() * 50);
        numDividers = getNumDividers(randomNumber);
        if (counter > 9) break;
        counter++;
    }

    // console.log(numDividers);
    result = randomNumber;
    return result;
}


function generateThirdRowFirstCell(number) {
    let randomNumber = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
    let pos = that.availableNums.indexOf(randomNumber);
    while (randomNumber == 0) {
        randomNumber = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
    }

    if (number % randomNumber == 0 && pos != -1) {
        that.availableNums.splice(pos, 1);
        return randomNumber;
    }

    for (let num of that.availableNums) {
        if (number % num == 0) {
            pos = that.availableNums.indexOf(num);
            if (pos != -1) {
                that.availableNums.splice(pos, 1);
            }
            return num;
        }
    }

    pos = that.availableNums.indexOf(randomNumber);
    if (pos != -1) {
        that.availableNums.splice(pos, 1);
    }
    return randomNumber;

}

function restCellsRndNumGen() {
    let randomNumber = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
    let pos = that.availableNums.indexOf(randomNumber);

    while (pos == -1) {
        randomNumber = that.availableNums[Math.floor(Math.random() * that.availableNums.length)];
        pos = that.availableNums.indexOf(randomNumber);
    }

    that.availableNums.splice(pos, 1);
    return randomNumber;

}


function checkFirstRowColNumIfDivide(rowCell1, collCell1, rowCell2, colCell2, rowCell3, collCell3) {
    let isFieldNumValid = true;

    if (that.gameMatrix[rowCell1][collCell1] % that.gameMatrix[rowCell2][colCell2] != 0 ||
        that.gameMatrix[rowCell1][collCell1] % that.gameMatrix[rowCell3][collCell3] != 0
    ) {
        isFieldNumValid = false;
    }

    console.log(isFieldNumValid);
    return isFieldNumValid;

}



function fillMatrixCells() {
    let secondVerticalRowInfo = genNumOneByNumTwoDividedByThirdNum();
    // console.log(secondVerticalRowInfo);
    that.gameMatrix[0][2] = secondVerticalRowInfo[0];
    // document.getElementById('firstRowSecNum').value = that.gameMatrix[0][2];

    that.gameMatrix[2][2] = secondVerticalRowInfo[1];
    // document.getElementById('thirdRowSecNum').value = that.gameMatrix[2][2];

    that.gameMatrix[4][2] = secondVerticalRowInfo[2];
    // document.getElementById('fifthRowSecNum').value = that.gameMatrix[4][2];

    document.getElementById('verticalTotalTwo').value = (that.gameMatrix[0][2] * that.gameMatrix[2][2]) / that.gameMatrix[4][2];


    that.gameMatrix[0][0] = generateFirstRowNum(that.gameMatrix[0][2]);
    // document.getElementById('firstRowFirstNum').value = that.gameMatrix[0][0];

    that.gameMatrix[2][0] = generateThirdRowFirstCell(that.gameMatrix[0][0]);
    // document.getElementById('thirdRowFirstNum').value = that.gameMatrix[2][0];



    let fifthHorizontalRowInfo = genNumOneByNumTwoDividedByThirdNumFiftRow(that.gameMatrix[4][2]);
    that.gameMatrix[4][0] = fifthHorizontalRowInfo[0];
    // document.getElementById('fifthRowFirstNum').value = that.gameMatrix[4][0];
    that.gameMatrix[4][4] = fifthHorizontalRowInfo[2];
    // document.getElementById('fifthRowThirdNum').value = that.gameMatrix[4][4];
    document.getElementById('fifthRowTotalNum').value = (that.gameMatrix[4][0] * fifthHorizontalRowInfo[1]) / that.gameMatrix[4][4];


    that.gameMatrix[0][4] = restCellsRndNumGen();
    // document.getElementById("firstRowThirdNum").value = that.gameMatrix[0][4];

    that.gameMatrix[2][4] = restCellsRndNumGen();
    // document.getElementById("thirdRowThirdNum").value = that.gameMatrix[2][4];


    //calculate num from table cells
    that.gameMatrix[0][6] = parseInt((that.gameMatrix[0][0] / that.gameMatrix[0][2]) + that.gameMatrix[0][4]);
    that.gameMatrix[6][0] = parseInt((that.gameMatrix[0][0] / that.gameMatrix[2][0]) * that.gameMatrix[4][0]);
    that.gameMatrix[2][3] = parseInt(that.gameMatrix[2][0] + that.gameMatrix[2][2] - that.gameMatrix[2][4]);
    that.gameMatrix[4][6] = parseInt(that.gameMatrix[4][0] * that.gameMatrix[4][2] / that.gameMatrix[4][4]);
    that.gameMatrix[6][1] = parseInt(that.gameMatrix[0][2] * that.gameMatrix[2][2] / that.gameMatrix[4][2]);
    that.gameMatrix[6][2] = parseInt(that.gameMatrix[0][4] + that.gameMatrix[2][4] * that.gameMatrix[4][4]);

    document.getElementById("firstRowTotalNum").value = that.gameMatrix[0][6];
    document.getElementById("verticalTotalOne").value = that.gameMatrix[6][0];
    document.getElementById("thirdRowTotalNum").value = that.gameMatrix[2][3];
    document.getElementById("fifthRowTotalNum").value = that.gameMatrix[4][6];
    document.getElementById("verticalTotalTwo").value = that.gameMatrix[6][1];
    document.getElementById("verticalTotalThree").value = that.gameMatrix[6][2];

    console.log(that.gameMatrix);
}



function checkFieldsRepeatNums() {
    let validFields = true;
    let fieldsNums = [
        [that.gameMatrix[0][2], that.gameMatrix[0][4], that.gameMatrix[2][0], that.gameMatrix[2][2],
            that.gameMatrix[2][4], that.gameMatrix[4][0], that.gameMatrix[4][2], that.gameMatrix[4][4]
        ],
        // [that.gameMatrix[2][4], that.gameMatrix[4][0], that.gameMatrix[4][2], that.gameMatrix[4][4]]
    ];

    fieldsNums[0].sort((a, b) => a - b);


    for (let row = 0; row < fieldsNums.length; row++) {
        for (let col = 0; col < fieldsNums[row].length; col++) {
            let num1 = fieldsNums[row][col];
            let num2 = fieldsNums[row][col + 1];

            if (fieldsNums[row][col] == fieldsNums[row][col + 1]) {
                // console.log('Number: ' + fieldsNums[row][col] + ' is repeating');
                validFields = false;
                break;
            }
        }
    }
    // console.log(fieldsNums);
    return validFields;
}


function checkForNegativeResultsAndZeroes() {
    let validFields = true;
    let totalResultFields = [that.gameMatrix[0][6], that.gameMatrix[6][0], that.gameMatrix[2][3],
        that.gameMatrix[4][6], that.gameMatrix[6][1], that.gameMatrix[6][2]
    ];

    for (let i = 0; i < totalResultFields.length; i++) {
        if (totalResultFields[i] <= 0) {
            validFields = false;
            break;
        }
    }

    return validFields;
}


function checkUserInputs() {
    that.errors = {
        ids: []
    }

    that.userInputs = [{
        id: 'firstRowSecNum',
        value: parseInt(document.getElementById('firstRowSecNum').value)
    }, {
        id: 'firstRowThirdNum',
        value: parseInt(document.getElementById('firstRowThirdNum').value),

    }, {
        id: 'thirdRowFirstNum',
        value: parseInt(document.getElementById('thirdRowFirstNum').value),
    }, {
        id: 'thirdRowSecNum',
        value: parseInt(document.getElementById('thirdRowSecNum').value),
    }, {
        id: 'thirdRowThirdNum',
        value: parseInt(document.getElementById('thirdRowThirdNum').value),
    }, {
        id: 'fifthRowFirstNum',
        value: parseInt(document.getElementById('fifthRowFirstNum').value),
    }, {
        id: 'fifthRowSecNum',
        value: parseInt(document.getElementById('fifthRowSecNum').value),
    }, {
        id: 'fifthRowThirdNum',
        value: parseInt(document.getElementById('fifthRowThirdNum').value),
    }];

    for (let i = 0; i < that.userInputs.length; i++) {
        if (that.userInputs[i].id == that.fields[i].id && that.userInputs[i].value != that.gameMatrix[that.fields[i].row][that.fields[i].col]) {
            let pos = errors.ids.indexOf(that.userInputs[i].id);
            if (pos < 0) {
                that.errors.ids.push(userInputs[i].id);
            }

        }
    }

    if (that.errors.ids.length > 0) {
        document.getElementById('errorsContainer').innerHTML = `<p class="errors">You have <span class"errorSpan">${that.errors.ids.length}</span> errors</p>`;
    } else {
        document.getElementById('errorsContainer').innerHTML = '';
        let gameContainer = document.getElementById('gameContainer');
        gameContainer.innerHTML = '';

        gameContainer.innerHTML = '<div id="congratImageCont"><img src="images/congratulations.gif" alt="you won image" />';
        gameContainer.innerHTML += '<button id="restart" class="btn waves-effect waves-light" type="submit" name="action">Play Again <i class="material-icons right">send</i></button>';
        gameContainer.innerHTML += '</div>';
        document.getElementById('restart').onclick = () => window.location.reload();

        document.getElementById('gameTittle').innerHTML = '<h1>Congratulations! You won!</h1>';
        sendBtn.style.visibility = 'hidden';

    }
    console.log(that.errors.ids.length);

}




function startGame() {


    let inputs = document.getElementsByTagName("input");

    //let numPos = -1;
    // that.gameMatrix[0][0] = getRandNum(topLimitRandNums);

    // console.log(document.getElementsByTagName("summary")[0]);
    document.getElementsByTagName("summary")[0].hidden = true;
    // console.log(that.gameMatrix[0]);
    // return;

    // that.numDividers = getNumDividers(that.gameMatrix[0][0]);
    // while (numDividers.length < 5) {
    //     that.gameMatrix[0][0] = getRandNum(topLimitRandNums);
    //     that.numDividers = getNumDividers(that.gameMatrix[0][0]);
    // }

    // that.filteredDividers = filterDividers(that.numDividers);

    // console.log(numDividers[Math.floor(Math.random() * numDividers.length)]);
    for (let i = 0; i < inputs.length; i++) {
        // console.log(inputs[i]);
        switch (i) {
            case 0:
                inputs[i].value = that.gameMatrix[0][0];
                break;
            case 3:
            case 7:
            case 11:
            case 12:
            case 13:
            case 14:
                break;
            default:
                inputs[i].disabled = false;
                inputs[i].parentNode.className = 'active';
                inputs[i].value = 0;
                break;
        }
    }

    // console.log(genNumOneByNumTwoDividedByThirdNum());


    // startBtn.disabled = true;
    startBtn.style.visibility = 'hidden';
    sendBtn.disabled = false;
    sendBtn.style.visibility = 'visible';

    fillMatrixCells();
    checkFieldsRepeatNums();

    while (!checkFieldsRepeatNums() || !checkForNegativeResultsAndZeroes() || !checkFirstRowColNumIfDivide(0, 0, 0, 2, 2, 0)) {
        if (that.startGameCount > 10) return;
        that.availableNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        startGame();
        that.startGameCount++;
        console.log('restart game count: ' + that.startGameCount);
    }

    that.startGame = 0;
    // let secondVerticalRowInfo = genNumOneByNumTwoDividedByThirdNum();
    // // console.log(secondVerticalRowInfo);
    // that.gameMatrix[0][2] = secondVerticalRowInfo[0];
    // document.getElementById('firstRowSecNum').value = that.gameMatrix[0][2];

    // that.gameMatrix[2][2] = secondVerticalRowInfo[1];
    // document.getElementById('thirdRowSecNum').value = that.gameMatrix[2][2];

    // that.gameMatrix[4][2] = secondVerticalRowInfo[2];
    // document.getElementById('fifthRowSecNum').value = that.gameMatrix[4][2];

    // document.getElementById('verticalTotalTwo').value = (that.gameMatrix[0][2] * that.gameMatrix[2][2]) / that.gameMatrix[4][2];


    // that.gameMatrix[0][0] = generateFirstRowNum(that.gameMatrix[0][2]);
    // document.getElementById('firstRowFirstNum').value = that.gameMatrix[0][0];

    // that.gameMatrix[2][0] = generateThirdRowFirstCell(that.gameMatrix[0][0]);
    // document.getElementById('thirdRowFirstNum').value = that.gameMatrix[2][0];



    // let fifthHorizontalRowInfo = genNumOneByNumTwoDividedByThirdNumFiftRow(that.gameMatrix[4][2]);
    // that.gameMatrix[4][0] = fifthHorizontalRowInfo[0];
    // document.getElementById('fifthRowFirstNum').value = that.gameMatrix[4][0];
    // that.gameMatrix[4][4] = fifthHorizontalRowInfo[2];
    // document.getElementById('fifthRowThirdNum').value = that.gameMatrix[4][4];
    // document.getElementById('fifthRowTotalNum').value = (that.gameMatrix[4][0] * fifthHorizontalRowInfo[1]) / that.gameMatrix[4][4];


    // that.gameMatrix[0][4] = restCellsRndNumGen();
    // document.getElementById("firstRowThirdNum").value = that.gameMatrix[0][4];

    // that.gameMatrix[2][4] = restCellsRndNumGen();
    // document.getElementById("thirdRowThirdNum").value = that.gameMatrix[2][4];


    // //calculate num from table cells
    // that.gameMatrix[0][6] = parseInt((that.gameMatrix[0][0] / that.gameMatrix[0][2]) + that.gameMatrix[0][4]);
    // that.gameMatrix[6][0] = parseInt((that.gameMatrix[0][0] / that.gameMatrix[2][0]) * that.gameMatrix[4][0]);
    // that.gameMatrix[2][3] = parseInt(that.gameMatrix[2][0] + that.gameMatrix[2][2] - that.gameMatrix[2][4]);
    // that.gameMatrix[4][6] = parseInt(that.gameMatrix[4][0] * that.gameMatrix[4][2] / that.gameMatrix[4][4]);
    // that.gameMatrix[6][1] = parseInt(that.gameMatrix[0][2] * that.gameMatrix[2][2] / that.gameMatrix[4][2]);
    // that.gameMatrix[6][2] = parseInt(that.gameMatrix[0][4] + that.gameMatrix[2][2] * that.gameMatrix[4][2]);

    // document.getElementById("firstRowTotalNum").value = that.gameMatrix[0][6];
    // document.getElementById("verticalTotalOne").value = that.gameMatrix[6][0];
    // document.getElementById("thirdRowTotalNum").value = that.gameMatrix[2][3];
    // document.getElementById("fifthRowTotalNum").value = that.gameMatrix[4][6];
    // document.getElementById("verticalTotalTwo").value = that.gameMatrix[6][1];
    // document.getElementById("verticalTotalThree").value = that.gameMatrix[6][2];

    // console.log(that.gameMatrix);

}

// function getRandNum(limit) {
//     let randomNumber = Math.floor(Math.random() * limit)

//     if (!((randomNumber % 2) > 0)) {
//         return randomNumber;
//     }
//     getRandNum(limit);
// }


function getNumDividers(num) {
    let numFactors = [],
        i;

    for (i = 1; i <= Math.floor(Math.sqrt(num)); i += 1)
        if (num % i === 0) {
            numFactors.push(i);
            if (num / i !== i)
                numFactors.push(num / i);
        }
    numFactors.sort(function(x, y) {
        return x - y;
    }); // numeric sort
    return numFactors;
}


function filterDividers(dividers) {
    let filtered = [];
    dividers.forEach(div => {
        if (div > 0 && div < 10) {
            filtered.push(div);
        }
    });

    return filtered;
}

function putNumberInMatrixDeleteCell(row, col, inputId) {
    let rndNumber = 0;
    rndNumber = that.filteredDividers[Math.floor(Math.random() * that.filteredDividers.length)];
    that.gameMatrix[row][col] = rndNumber;
    that.numName = getNumberName(rndNumber);
    document.getElementById(inputId).value = that.gameMatrix[row][col];
    delete that.availableNumbersForUse[that.numName];
    numPos = that.filteredDividers.indexOf(rndNumber);
    that.filteredDividers.splice(numPos, 1);
}

function putNumInCellDepending2Nums(numOne, numTwo, row, col, inputId) {
    let num = numOne * numTwo;
    let keys = Object.keys(that.availableNumbersForUse);
    let dividers = getNumDividers(num);
    //let filteredDividers = filterDividers(dividers);
    //let numToReturn = 0;
    let numName = '';

    // let posNumToRem = 0;
    for (let div of dividers) {
        numName = getNumberName(div);
        if (keys.indexOf(numName) != -1) {
            // return div;
            that.gameMatrix[row][col] = div;
            posNumToRem = keys.indexOf(div);
            if (posNumToRem != -1) {
                let nameNumToDelete = getNumberName(div);
                delete that.availableNumbersForUse[nameNumToDelete];
                return;
            }
        }
    }

    that.gameMatrix[row][col] = genRndNumInEmptyCells();
    document.getElementById(inputId).value = that.gameMatrix[row][col];
}


function checkDividers(dividers) {
    let neededDividers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let rightNumber = true;

    for (let div of dividers) {
        if (neededDividers.indexOf(div) < 0) {
            rightNumber = false;
            break;
        }
    }

    return rightNumber;
}

startBtn.addEventListener("click", startGame);
sendBtn.addEventListener('click', checkUserInputs);