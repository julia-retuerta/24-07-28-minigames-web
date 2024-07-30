// El styles lo importamos aquí, ya se carga después al compilar todo

import '../scss/styles.scss';

// button.addEventListener('click', () => {
//   console.log('BUTTON CLICKED');
// });

const tictactoeGameBoardElement = document.getElementById('tictactoe-game-board');

const BOXES_PER_LINE = 3;

const createGameBoard = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < BOXES_PER_LINE; i++) {
    const newRow = document.createElement('div');
    newRow.classList.add('tictactoe-game__row');

    for (let j = 0; j < BOXES_PER_LINE; j++) {
      const newBox = document.createElement('div');
      newBox.classList.add('tictactoe-game__box');
      newRow.append(newBox);
    }

    fragment.append(newRow);
  }

  tictactoeGameBoardElement.append(fragment);
};

const startGame = () => {
  createGameBoard();
};

startGame();
