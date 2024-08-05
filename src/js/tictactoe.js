// El styles lo importamos aquí, ya se carga después al compilar todo

import '../scss/styles.scss';

const tictactoeGameBoardElement = document.getElementById('tictactoe-game-board');
const yourTurnElement = document.getElementById('your-turn');
const pcTurnElement = document.getElementById('pc-turn');
const resultYouElement = document.getElementById('result-you');
const resultPcElement = document.getElementById('result-pc');
const resultBothElement = document.getElementById('result-both');
const buttonStartTictactoeElement = document.getElementById('button-start-tictactoe');
const buttonRestartTictactoeElement = document.getElementById('button-restart-tictactoe');
const youPointsElement = document.getElementById('you-points');
const pcPointsElement = document.getElementById('pc-points');

const BOXES_PER_LINE_AND_COLUMN = 3;

let youPoints = 0;
let pcPoints = 0;

let isGameOver = false;

const requirementsToWin = [
  // Filas
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Columnas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonales
  [0, 4, 8],
  [2, 4, 6]
];

// Estado del tablero
// Crear array donde todas las casillas están vacías
let board = Array(BOXES_PER_LINE_AND_COLUMN * BOXES_PER_LINE_AND_COLUMN).fill(null);
// let board = [null, null, null, null, null, null, null, null, null];

const createGameBoard = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < BOXES_PER_LINE_AND_COLUMN; i++) {
    const newRow = document.createElement('div');
    newRow.classList.add('tictactoe-game__row');

    for (let j = 0; j < BOXES_PER_LINE_AND_COLUMN; j++) {
      const newBox = document.createElement('div');
      newBox.classList.add('tictactoe-game__box');
      newRow.append(newBox);
    }

    fragment.append(newRow);
  }

  tictactoeGameBoardElement.append(fragment);
};

createGameBoard();

const handleBoxClick = (box, index) => {
  // Solo se puede poner un círculo si box no tiene ninguna imagen, si no es el turno del pc y si el juego no ha terminado
  if (!box.querySelector('img') && !pcTurnElement.classList.contains('active') && !isGameOver) {
    placeCircle(box, index);
  }
};

const startGame = () => {
  buttonStartTictactoeElement.classList.add('hidden');
  yourTurnElement.classList.remove('hidden');
  pcTurnElement.classList.add('hidden');
  resultYouElement.textContent = ''; // Limpiar el resultado anterior
  resultPcElement.textContent = '';
  resultBothElement.textContent = '';

  // Reiniciar el tablero
  board.fill(null);
  // board = [null, null, null, null, null, null, null, null, null];

  isGameOver = false; // Reiniciar el estado del juego

  const boxes = document.querySelectorAll('.tictactoe-game__box');
  // index: para saber la posicion de la casilla, en cuál hay que colocar el círculo y poder actualizar el tablero correctamente
  boxes.forEach((box, index) => {
    box.classList.add('active');
    box.textContent = ''; // Limpiar la casilla

    box.addEventListener('click', () => handleBoxClick(box, index));
  });
};

const placeCircle = (box, index) => {
  const circleImage = document.createElement('img');
  circleImage.src = '../assets/images/circle-desktop.png';
  circleImage.alt = 'Circle';
  circleImage.classList.add('circle');
  box.append(circleImage);
  box.classList.remove('active');
  board[index] = 'O'; // Jugada del usuario en el tablero

  if (checkWinner('O')) {
    resultYouElement.textContent = 'YOU WIN!';
    youPoints++;
    youPointsElement.textContent = youPoints;
    endGame();
  } else if (isBoardComplete()) {
    resultBothElement.textContent = 'DRAW';
    endGame();
  } else {
    pcTurn();
  }
};

const pcTurn = () => {
  pcTurnElement.classList.remove('hidden');
  yourTurnElement.classList.add('hidden');

  setTimeout(() => {
    placeCross();
    // Solo mostrar el turno del jugador si el juego no ha terminado
    if (!isBoardComplete() && !checkWinner('X')) {
      pcTurnElement.classList.add('hidden');
      yourTurnElement.classList.remove('hidden');
    }
  }, 800);
};

const placeCross = () => {
  // Para guardar los índices de las casillas vacías, Esto es para saber en qué casillas puede poner una cruz el pc
  const emptyIndexes = [];

  // Iterar sobre el tablero
  for (let i = 0; i < board.length; i++) {
    // Si la casilla está vacía, guardar el índice
    if (board[i] === null) {
      emptyIndexes.push(i);
    }
  }

  // Que al menos haya un índice vacío
  if (emptyIndexes.length > 0) {
    // Elegir un índice aleatorio de las casillas vacías
    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    const boxes = document.querySelectorAll('.tictactoe-game__box');

    // Elegir una casilla vacía aleatoria
    const randomBox = boxes[randomIndex];

    // Crear y añadir la cruz al tablero
    const crossImage = document.createElement('img');
    crossImage.src = '../assets/images/cross-desktop.png';
    crossImage.alt = 'Cross';
    crossImage.classList.add('cross');
    randomBox.append(crossImage);
    randomBox.classList.remove('active');

    // Actualizar el estado del tablero con la jugada del PC
    board[randomIndex] = 'X';

    // Comprobar si el PC ha ganado o si el tablero está completo
    if (checkWinner('X')) {
      resultPcElement.textContent = 'PC WIN';
      pcPoints++;
      pcPointsElement.textContent = pcPoints;
      yourTurnElement.classList.add('hidden');
      pcTurnElement.classList.add('hidden');
      endGame();
    } else if (isBoardComplete()) {
      resultBothElement.textContent = 'DRAW';
      endGame();
    }
  }
};

// player puede ser 'O' o 'X'
const checkWinner = player => {
  // Recorrer todas las combinaciones ganadoras y verificar si hay una coincidencia en el tablero
  for (const requirement of requirementsToWin) {
    const [a, b, c] = requirement;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
};

const isBoardComplete = () => {
  // iterar sobre el tablero
  for (let i = 0; i < board.length; i++) {
    // si hay alguna casilla vacía devolver false
    if (board[i] === null) {
      return false;
    }
  }
  return true;
};

const deactivateBoard = () => {
  const boxes = document.querySelectorAll('.tictactoe-game__box');
  boxes.forEach((box, index) => {
    box.removeEventListener('click', () => handleBoxClick(box, index));
  });
};

const endGame = () => {
  isGameOver = true;
  deactivateBoard();
  document.querySelectorAll('.tictactoe-game__box.active').forEach(box => {
    box.classList.remove('active');
  });

  pcTurnElement.classList.add('hidden');
  yourTurnElement.classList.add('hidden');
  buttonRestartTictactoeElement.classList.remove('hidden');
};

const restartGame = () => {
  buttonRestartTictactoeElement.classList.add('hidden');
  startGame();
};

buttonStartTictactoeElement.addEventListener('click', startGame);
buttonRestartTictactoeElement.addEventListener('click', restartGame);
