const topLeft = document.querySelector('.box1');
const topRight = document.querySelector('.box2');
const bottomLeft = document.querySelector('.box3');
const bottomRight = document.querySelector('.box4');
const level = document.getElementById('#level');
const flashTime = 250;
const flashDelay = 1000;
let score = 0;
let canClick = false;
// Populated on reset
let sequence;
let sequenceToGuess;
let count = 4;

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
        }, flashDelay);
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
            setScore(score);
            
        }
    } else {
        // end game
        handleGameOver();
    }
};

function resetScore() {
    score = 0;
    document.getElementById("score").children[0].innerHTML = score;
}

function setScore(score) {
    document.getElementById("score").children[0].innerHTML = score;
}

function handleGameOver() {
    const popUp = document.getElementById("pop-up");
    popUp.children[0].innerHTML = `<h2>Game Over</h2> <br> Your score: ${score} <br> Press Start to continue to try again`;
    popUp.style.display = "block";
    document.getElementsByClassName("container-game")[0].style.filter ="blur(6px)";
    resetScore();
    canClick = false;
}

const startFlashing = async () => {
    canClick = false;
    for (const box of sequence) {
        await flash(box);
    }
    canClick = true;
};

function playGame() {
    // When we start the game, sequence will be undefined
    if (sequence === undefined || sequenceToGuess === undefined) {
        resetSequence();
        resetScore();
        removePopUp();
        count = 4;
        setInterval(countDown, 1000);
        countDown();
        // Clear any variables and the sequence, score etc.
    }
    sequenceToGuess = [...sequence]; // Reset the sequenceToGuess regardless
    setTimeout(() => {
        startFlashing();
    }, 4200);
}

function countDown()
{
  const countdownElement = document.getElementById("countdown");
  countdownElement.style.display = "flex";
  count = count - 1;
  if (count < 0)
  {
    clearInterval(setInterval(countDown, 1000));
    countdownElement.style.display = "none";
    
    return;
  } 
    
  countdownElement.children[0].innerHTML=count;
}


function removePopUp() {
    const popUpElem = document.getElementById("pop-up");
    popUpElem.style.display = "none";
}