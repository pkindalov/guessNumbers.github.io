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
    for (let input of inputs) {
        input.disabled = false;
        input.parentNode.className = 'active';
        input.value = 0;
    }

    startBtn.disabled = true;
    sendBtn.disabled = false;
    // inputs.forEach(input => {
    //     input.disabled = false;
    // });
}

startBtn.addEventListener("click", startGame);