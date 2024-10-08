// El styles lo importamos aquí, ya se carga después al compilar todo

import '../scss/styles.scss';

const blanksElement = document.getElementById('blanks');
const wrongLettersElement = document.getElementById('wrong-letters');
const formElement = document.getElementById('form');
const inputElement = document.getElementById('input-enter-a-letter');
const triesElement = document.getElementById('tries');
const resultElement = document.getElementById('result');
const playAgainButton = document.getElementById('play-again-button');

const SOLUTION_WORDS = [
  'bread',
  'jigsaw',
  'subway',
  'nightclub',
  'xylophone',
  'lucky',
  'microwave',
  'witchcraft',
  'forest',
  'espionage'
];

let hangmanWord = '';
let correctLetters = [];
let wrongLetters = [];
let numberOfTries = 6;

const chooseHangmanWord = () => {
  const randomNumber = Math.floor(Math.random() * SOLUTION_WORDS.length);
  hangmanWord = SOLUTION_WORDS[randomNumber];
};

const createLetterLines = () => {
  blanksElement.textContent = ''; // Limpiar líneas anteriores

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < hangmanWord.length; i++) {
    const newLine = document.createElement('div');
    newLine.classList.add('hangman-game__line');

    const letterContainer = document.createElement('span');
    letterContainer.classList.add('hangman-game__letter');
    newLine.append(letterContainer);

    fragment.append(newLine);
  }

  blanksElement.append(fragment);
};

// Calcular el número de letras únicas en una palabra
const countUniqueLetters = word => {
  const uniqueLetters = [];
  for (let letter of word) {
    if (!uniqueLetters.includes(letter)) {
      uniqueLetters.push(letter);
    }
  }
  return uniqueLetters.length;
};

// Elementos de las partes del muñeco
const parts = document.querySelectorAll('.hangman-game__doll > div');

const updateDisplay = () => {
  // Mostrar letras correctas
  const lines = blanksElement.querySelectorAll('.hangman-game__line');

  hangmanWord.split('').forEach((letter, index) => {
    const letterContainer = lines[index].querySelector('.hangman-game__letter');
    if (correctLetters.includes(letter)) {
      letterContainer.textContent = letter.toUpperCase();
    } else {
      letterContainer.textContent = '';
    }
  });

  // Mostrar letras incorrectas
  if (wrongLetters.length > 0) {
    wrongLettersElement.textContent = wrongLetters.join(', ').toUpperCase();
  } else {
    wrongLettersElement.textContent = ''; // Limpiar si no hay letras incorrectas
  }

  // Mostrar la siguiente parte del muñeco
  wrongLetters.forEach((letter, index) => {
    if (parts[index]) {
      parts[index].classList.remove('hidden');
    }
  });

  // Actualizar número de intentos restantes
  triesElement.textContent = `NUMBER OF TRIES: ${numberOfTries}`;

  // Comprobar si el jugador ha ganado o ha perdido
  if (numberOfTries === 0) {
    resultElement.textContent = 'YOU LOSE';
    endGame();
  } else if (correctLetters.length === countUniqueLetters(hangmanWord)) {
    resultElement.textContent = 'YOU WIN!';
    endGame();
  }
};

const checkLetterAndUpdate = letter => {
  letter = letter.toLowerCase();

  if (hangmanWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      numberOfTries--; // Disminuir el nº de intentos restantes
    }
  }

  updateDisplay();
};

const startGame = () => {
  chooseHangmanWord();
  createLetterLines();
  correctLetters = [];
  wrongLetters = [];
  numberOfTries = 6;
  resultElement.textContent = ''; // Limpiar resultados anteriores
  inputElement.disabled = false;
  playAgainButton.classList.add('hidden');
  parts.forEach(part => part.classList.add('hidden')); // Ocultar partes del cuerpo
  updateDisplay();
};

const endGame = () => {
  inputElement.disabled = true; // Deshabilitar el input para evitar que se pueda escribir
  playAgainButton.classList.remove('hidden');
};

formElement.addEventListener('submit', event => {
  event.preventDefault();

  // Para eliminar los espacios en blanco al principio y al final
  const letter = inputElement.value.trim();
  checkLetterAndUpdate(letter);

  inputElement.value = ''; // Limpiar el input después de enviar
});

playAgainButton.addEventListener('click', startGame);

startGame();
