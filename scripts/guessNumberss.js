var that = this;
let startBtn = document.getElementById("startGame");
let sendBtn = document.getElementById("sendResult");
// sendBtn.style.visibility = 'hidden';
let topLimitRandNums = 50;

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

that.availableNumbersForUse = {
    one: {
        num: 1,
        count: 0
    },
    two: {
        num: 2,
        count: 0
    },
    three: {
        num: 3,
        count: 0
    },
    four: {
        num: 4,
        count: 0
    },
    five: {
        num: 5,
        count: 0
    },
    six: {
        num: 6,
        count: 0
    },
    seven: {
        num: 7,
        count: 0
    },
    eight: {
        num: 8,
        count: 0
    },
    nine: {
        num: 9,
        count: 0
    },
}

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


function genRndNumInEmptyCells() {
    let availNumKeys = Object.keys(that.availableNumbersForUse);
    let rndNumName = '';
    let rndNum = Math.floor(Math.random() * availNumKeys.length);
    let retNumber = 1;
    let keyName = '';

    if (availNumKeys[rndNum]) {
        keyName = availNumKeys[rndNum];
        retNumber = that.availableNumbersForUse[keyName].num;
        delete that.availableNumbersForUse[keyName];
        return retNumber;
    }
}


function genNumDeleteCell(number, number2 = 1) {
    let availNumKeys = Object.keys(that.availableNumbersForUse);
    let rndNumName = '';
    let rndNum = Math.floor(Math.random() * availNumKeys.length);
    let retNumber = 1;
    let keyName = '';

    if (availNumKeys[rndNum] && (number * number2) % that.availableNumbersForUse[availNumKeys[rndNum]].num == 0) {
        keyName = availNumKeys[rndNum];
        retNumber = that.availableNumbersForUse[keyName].num;
        delete that.availableNumbersForUse[keyName];
        return retNumber;
    } else if (availNumKeys[rndNum]) {
        for (let key of availNumKeys) {
            if (number % that.availableNumbersForUse[key].num == 0) {
                retNumber = that.availableNumbersForUse[key].num;
                delete that.availableNumbersForUse[key];
                return retNumber;
            }
        }

        return that.availableNumbersForUse[availNumKeys[0]].num;
        // retNumber = that.availableNumbersForUse[keyName].num;
        // keyName = availNumKeys[rndNum];
        // return retNumber;
    }


}



function getNumberName(num) {
    switch (num) {
        case 0:
            return 0;
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        case 6:
            return "six";
        case 7:
            return "seven";
        case 8:
            return "eight";
        case 9:
            return "nine";
    }
}


function getRandNum(limit) {
    let randomNumber = Math.floor(Math.random() * limit);
    // randomNumber % 2 == 0 ? randomNumber : getRandNum(limit);
    return randomNumber;
}

function startGame() {


    let inputs = document.getElementsByTagName("input");
    that.gameMatrix[0][0] = getRandNum(topLimitRandNums);

    // console.log(document.getElementsByTagName("summary")[0]);
    document.getElementsByTagName("summary")[0].hidden = true;
    // console.log(that.gameMatrix[0]);
    // return;

    that.numDividers = getNumDividers(that.gameMatrix[0, 0]);
    while (numDividers.length < 5) {
        that.gameMatrix[0][0] = getRandNum(topLimitRandNums);
        that.numDividers = getNumDividers(that.gameMatrix[0][0]);
    }

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

    startBtn.disabled = true;
    sendBtn.disabled = false;
    sendBtn.style.visibility = 'visible';

    //first horizontal line
    // that.gameMatrix[0, 2] = numDividers[Math.floor(Math.random() * numDividers.length)];
    that.gameMatrix[0][2] = genNumDeleteCell(that.gameMatrix[0][0]);
    that.gameMatrix[0][4] = genRndNumInEmptyCells();
    that.gameMatrix[0][6] = parseInt((that.gameMatrix[0][0] / that.gameMatrix[0][2]) + that.gameMatrix[0][4]);

    document.getElementById("firstRowSecNum").value = that.gameMatrix[0][2];
    document.getElementById("firstRowThirdNum").value = that.gameMatrix[0][4];
    document.getElementById("firstRowTotalNum").value = that.gameMatrix[0][6];

    //first vertical line

    // console.log(numDividers);
    // console.log(numDividers[Math.floor(Math.random() * numDividers.length)]);
    // console.log(numDividers[Math.floor(Math.random() * numDividers.length)]);


    that.gameMatrix[2][0] = genNumDeleteCell(that.gameMatrix[0][0]);
    that.gameMatrix[4][0] = genRndNumInEmptyCells();
    that.gameMatrix[6][0] = parseInt((that.gameMatrix[0][0] / that.gameMatrix[2][0]) * that.gameMatrix[4][0]);
    document.getElementById("thirdRowFirstNum").value = that.gameMatrix[2][0];
    document.getElementById("fifthRowFirstNum").value = that.gameMatrix[4][0];
    document.getElementById("verticalTotalOne").value = that.gameMatrix[6][0];

    //second row horizontal
    that.gameMatrix[2][1] = genRndNumInEmptyCells();
    that.gameMatrix[2][2] = genRndNumInEmptyCells();
    that.gameMatrix[2][3] = parseInt(that.gameMatrix[2][0] + that.gameMatrix[2][1] - that.gameMatrix[2][2]);

    document.getElementById("thirdRowSecNum").value = that.gameMatrix[2][1];
    document.getElementById("thirdRowThirdNum").value = that.gameMatrix[2][2];
    document.getElementById("thirdRowTotalNum").value = that.gameMatrix[2][3];

    //third row horizontal
    that.gameMatrix[4][1] = genNumDeleteCell(that.gameMatrix[2][1], that.gameMatrix[0][2]);
    that.gameMatrix[4][2] = genRndNumInEmptyCells();
    that.gameMatrix[4][3] = parseInt(that.gameMatrix[4][0] * that.gameMatrix[4][1] / that.gameMatrix[4][2]);

    document.getElementById("fifthRowSecNum").value = that.gameMatrix[4][1];
    document.getElementById("fifthRowThirdNum").value = that.gameMatrix[4][2];
    document.getElementById("fifthRowTotalNum").value = that.gameMatrix[4][3];

    //second vertical row
    that.gameMatrix[6][1] = parseInt(that.gameMatrix[0][2] * that.gameMatrix[2][1] / that.gameMatrix[4][1]);
    document.getElementById("verticalTotalTwo").value = that.gameMatrix[6][1];

    //third vertical row
    that.gameMatrix[6][2] = parseInt(that.gameMatrix[0][4] + that.gameMatrix[2][2] * that.gameMatrix[4][2]);
    document.getElementById("verticalTotalThree").value = that.gameMatrix[6][2];

    // console.log(that.availableNumbersForUse);
    // console.log(that.gameMatrix[2][1]);
    // console.log(that.gameMatrix[0][2]);

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
    numFactors.sort(function (x, y) {
        return x - y;
    }); // numeric sort
    return numFactors;
}

startBtn.addEventListener("click", startGame);