const topLeft = document.querySelector('.box1');
const topRight = document.querySelector('.box2');
const bottomLeft = document.querySelector('.box3');
const bottomRight = document.querySelector('.box4');
const level = document.getElementById('#level');
const flashTime = 250;
let score = 0;
let canClick = false;
// Populated on reset
let sequence;
let sequenceToGuess;

/*
Returns a random box for the user to click
*/
const getRandomBox = () => {
    const boxes = [topLeft, topRight, bottomLeft, bottomRight]
    return boxes[parseInt(Math.random() * boxes.length)];
};

function resetSequence() {
    sequence = [getRandomBox()];
    sequenceToGuess = [...sequence];
}

/*
Sets a timer for the box in the sequence to flash
*/
const flash = (box) => {
    return new Promise((resolve, reject) => {
        box.className += ' active';
        setTimeout(() => {
            // This is where the box is flashed via the class
            box.className = box.className.replace(
                'active',
                ''
            );

            setTimeout(() => {
                resolve();
            }, flashTime);
        }, 1000);
    });
};

const boxClicked = boxClicked => {
    if (!canClick) return;

    const expectedBox = sequenceToGuess.shift();
    if (expectedBox === boxClicked) {
        if (sequenceToGuess.length === 0) {
            // start new round
            sequence.push(getRandomBox());
            sequenceToGuess = [...sequence];
            startFlashing();
            score += 1;
        }
    } else {
        // end game
        handleGameOver();
    }
};

function handleGameOver() {
    displayUserMessage(`Game Over with Score ${score}. Press Start to continue from where you left off or Reset to start over.`);
    score = 0;
    canClick = false;
}

const startFlashing = async () => {
    canClick = false;
    for (const box of sequence) {
        await flash(box);
    }
    canClick = true;
};

function displayUserMessage(message) {
    alert(message);
}

function playGame() {
    // When we start the game, sequence will be undefined
    if (sequence === undefined || sequenceToGuess === undefined) {
        resetSequence();
    }
    sequenceToGuess = [...sequence]; // Reset the sequenceToGuess regardless
    displayUserMessage('Game will start in 1 seconds');
    setTimeout(() => {
        startFlashing();
    }, 1000);
}

function resetGame() {
    // Clear any variables and the sequence, score etc.
    resetSequence();
    playGame();
}
