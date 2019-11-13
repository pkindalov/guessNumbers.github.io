var that = this;
let startBtn = document.getElementById("startGame");
let sendBtn = document.getElementById("sendResult");
let topLimitRandNums = 100;

that.gameMatrix = [
    [0, 'mathChar', 0, 'mathChar', 0, 'mathChar', 0],
    ['mathChar', 'empty', 'mathChar', 'empty', 'mathChar', 'empty', 'empty'],
    [0, 'mathChar', 0, 'mathChar', 0, 'mathChar', 0],
    ['mathChar', 'empty', 'mathChar', 'empty', 'mathChar', 'empty', 'empty'],
    [0, 'mathChar', 0, 'mathChar', 0, 'mathChar', 0],
    ['mathChar', 'empty', 'mathChar', 'empty', 'mathChar', 'empty', 'empty'],
    [0, 'empty', 0, 'empty', 0, 'empty', 'empty']
];


function getRandNum(limit) {
    let randomNumber = Math.floor(Math.random() * limit)
    randomNumber % 2 == 0 ? randomNumber : getRandNum(limit);
    return randomNumber;
}

function startGame() {
    // console.log(that.gameMatrix[0]);
    // return;
    // console.log(that.gameMatrix);
    // that.gameMatrix[0][0] = 44;
    // return;

    let inputs = document.getElementsByTagName("input");
    that.gameMatrix[0][0] = getRandNum(topLimitRandNums);
    // console.log(that.gameMatrix[0]);
    // return;

    let numDividers = getNumDividers(that.gameMatrix[0, 0]);
    while (numDividers.length < 5) {
        that.gameMatrix[0][0] = getRandNum(topLimitRandNums);
        numDividers = getNumDividers(that.gameMatrix[0][0]);
    }

    // console.log(numDividers[Math.floor(Math.random() * numDividers.length)]);
    for (let i = 0; i < inputs.length; i++) {
        switch (i) {
            case 0:
                inputs[i].value = that.gameMatrix[0][0];
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

    //first horizontal line
    // that.gameMatrix[0, 2] = numDividers[Math.floor(Math.random() * numDividers.length)];
    that.gameMatrix[0][2] = numDividers[getRandNum(numDividers.length)];
    that.gameMatrix[0][4] = numDividers[getRandNum(numDividers.length)];
    that.gameMatrix[0][6] = parseInt((that.gameMatrix[0][0] / that.gameMatrix[0][2]) + that.gameMatrix[0][4]);

    document.getElementById("firstRowSecNum").value = that.gameMatrix[0][2];
    document.getElementById("firstRowThirdNum").value = that.gameMatrix[0][4];
    document.getElementById("firstRowTotalNum").value = that.gameMatrix[0][6];

    //first vertical line

    // console.log(numDividers);
    // console.log(numDividers[Math.floor(Math.random() * numDividers.length)]);
    // console.log(numDividers[Math.floor(Math.random() * numDividers.length)]);


    that.gameMatrix[2][0] = numDividers[Math.floor(Math.random() * numDividers.length)];
    that.gameMatrix[4][0] = numDividers[Math.floor(Math.random() * numDividers.length)];
    that.gameMatrix[6][0] = parseInt((that.gameMatrix[0][0] / that.gameMatrix[2][0]) * that.gameMatrix[4][0]);
    document.getElementById("thirdRowFirstNum").value = that.gameMatrix[2][0];
    document.getElementById("fifthRowFirstNum").value = that.gameMatrix[4][0];
    document.getElementById("verticalTotalOne").value = that.gameMatrix[6][0];

    //second row horizontal
    that.gameMatrix[2][1] = numDividers[Math.floor(Math.random() * numDividers.length)];
    that.gameMatrix[2][2] = numDividers[Math.floor(Math.random() * numDividers.length)];
    that.gameMatrix[2][3] = parseInt(that.gameMatrix[2][0] + that.gameMatrix[2][1] - that.gameMatrix[2][2]);

    document.getElementById("thirdRowSecNum").value = that.gameMatrix[2][1];
    document.getElementById("thirdRowThirdNum").value = that.gameMatrix[2][2];
    document.getElementById("thirdRowTotalNum").value = that.gameMatrix[2][3];

    //third row horizontal
    that.gameMatrix[4][1] = numDividers[Math.floor(Math.random() * numDividers.length)];
    that.gameMatrix[4][2] = numDividers[Math.floor(Math.random() * numDividers.length)];
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

startBtn.addEventListener("click", startGame);