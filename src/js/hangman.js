// El styles lo importamos aquí, ya se carga después al compilar todo

import '../scss/styles.scss';

const blanksElement = document.getElementById('blanks');
const formElement = document.getElementById('form');

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
let failedLetters = [];

const chooseHangmanWord = () => {
  const randomNumber = Math.floor(Math.random() * SOLUTION_WORDS.length);
  hangmanWord = SOLUTION_WORDS[randomNumber];
};

const createLetterLines = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < hangmanWord.length; i++) {
    const newLine = document.createElement('div');
    newLine.classList.add('hangman-game__line');

    fragment.append(newLine);
  }

  blanksElement.append(fragment);
};

const startGame = () => {
  chooseHangmanWord();
  createLetterLines();
};

startGame();

formElement.addEventListener('submit', event => {
  event.preventDefault();
});
