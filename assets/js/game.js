const topLeft = document.querySelector('.box1');
const topRight = document.querySelector('.box2');
const bottomLeft = document.querySelector('.box3');
const bottomRight = document.querySelector('.box4');

const level = document.getElementById('#level');


const getRandomBox = () => {

  const boxes = [topLeft, topRight, bottomLeft, bottomRight]

  return boxes[parseInt(Math.random() * boxes.length)];
};

const sequence = [getRandomBox()];

let sequenceToGuess = [...sequence];

const flash = (box) => {
  return new Promise((resolve, reject) => {
    box.className += ' active';
    setTimeout (() => {
      box.className = box.className.replace(
        'active',
        ''
      );
      setTimeout(() => {
        resolve();
      }, 250);
    }, 1000);
  });
};

let canClick = false;

const boxClicked = boxClicked => {
  if (!canClick) return;

  const expectedBox = sequenceToGuess.shift();
  if (expectedBox === boxClicked) {
    if (sequenceToGuess.length === 0) {
      // start new round
      sequence.push(getRandomBox());
      sequenceToGuess = [...sequence];
      startFlashing();
      level.push += 1;
    }
  } else {
    // end game
    alert('game over');
  }
};

const startFlashing = async () => {
  canClick = false;
  for (const box of sequence) {
    await flash(box);
  }
  canClick = true;
};

startFlashing();



