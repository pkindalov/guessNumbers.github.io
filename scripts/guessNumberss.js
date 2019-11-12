let startBtn = document.getElementById("startGame");
let sendBtn = document.getElementById("sendResult");

let gameMatrix = [
    [0, 'mathChar', 0, 'mathChar', 0, 'mathChar', 0],
    ['mathChar', 'empty', 'mathChar', 'empty', 'mathChar', 'empty', 'empty'],
    [0, 'mathChar', 0, 'mathChar', 0, 'mathChar', 0],
    ['mathChar', 'empty', 'mathChar', 'empty', 'mathChar', 'empty', 'empty'],
    [0, 'mathChar', 0, 'mathChar', 0, 'mathChar', 0],
    ['mathChar', 'empty', 'mathChar', 'empty', 'mathChar', 'empty', 'empty'],
    [0, 'empty', 0, 'empty', 0, 'empty', 'empty']
]

function startGame() {
    let inputs = document.getElementsByTagName("input");
    let randomNumber = Math.floor(Math.random() * 101);
    let numDividers = getNumDividers(randomNumber);
    gameMatrix[0, 0] = randomNumber;
    // while (numDividers.length < 3) {
    //     randomNumber = Math.floor(Math.random() * 101);
    // }
    console.log(randomNumber);
    console.log(numDividers);
    for (let i = 0; i < inputs.length; i++) {
        switch (i) {
            case 0:
                inputs[i].value = randomNumber;
                break;
            default:
                inputs[i].disabled = false;
                inputs[i].parentNode.className = 'active';
                inputs[i].value = 0;
                break;
        }
        // if (i ==  0) {
        //     inputs[i].disabled = false;
        //     inputs[i].parentNode.className = 'active';
        //     inputs[i].value = 0;

        // }
    }

    startBtn.disabled = true;
    sendBtn.disabled = false;
}


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