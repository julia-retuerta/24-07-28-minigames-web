// El styles lo importamos aquí, ya se carga después al compilar todo

import '../scss/styles.scss';

const alphabetElement = document.getElementById('alphabet');
const startButtonElement = document.getElementById('button-start-pasapalabra');
const restartButtonElement = document.getElementById('button-restart-pasapalabra');
const questionAnswerContainerElement = document.getElementById('question-answer-container');
const questionElement = document.getElementById('question');
const formElement = document.getElementById('form');
const inputElement = document.getElementById('input');
const pointsElement = document.getElementById('points');
const pasapalabraButtonElement = document.getElementById('button-pasapalabra');
const timeLeftElement = document.getElementById('time-left');

let alphabetLetters;
let currentQuestionPosition = 0;
let score = 0;
let timeLeft = 240;
let timerInterval;
let gameFinished = false;
let skippedQuestions = [];
let pendingQuestions = [];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const questions = [
  { letter: 'A', question: 'STARTS WITH A. What is the capital of Greece?', answer: 'Athens' },
  { letter: 'B', question: 'STARTS WITH B. What is the largest mammal in the world?', answer: 'Blue whale' },
  { letter: 'C', question: 'STARTS WITH C. A domesticated animal known for catching mice.', answer: 'Cat' },
  {
    letter: 'D',
    question: 'STARTS WITH D. What is the name of a small, pointed missile used in a pub game?',
    answer: 'Dart'
  },
  { letter: 'E', question: 'STARTS WITH E. A precious stone that is often green.', answer: 'Emerald' },
  {
    letter: 'F',
    question: 'STARTS WITH F. What is a sweet, cold dessert made from cream or milk called?',
    answer: 'Frozen yogurt'
  },
  {
    letter: 'G',
    question: "STARTS WITH G. What is the name of the force that pulls objects toward the Earth's center?",
    answer: 'Gravity'
  },
  {
    letter: 'H',
    question: 'STARTS WITH H. Which organ in the human body is responsible for pumping blood?',
    answer: 'Heart'
  },
  {
    letter: 'I',
    question: 'STARTS WITH I. What is a word for frozen water?',
    answer: 'Ice'
  },
  {
    letter: 'J',
    question: 'STARTS WITH J. What is a place where two bones meet in the body called?',
    answer: 'Joint'
  },
  {
    letter: 'K',
    question: 'STARTS WITH K. What is a marsupial native to Australia known for carrying its young in a pouch?',
    answer: 'Kangaroo'
  },
  {
    letter: 'L',
    question: 'STARTS WITH L. What is a small body of water surrounded by land?',
    answer: 'Lake'
  },
  {
    letter: 'M',
    question: 'STARTS WITH M. What is a celestial body that orbits a planet called?',
    answer: 'Moon'
  },
  {
    letter: 'N',
    question: "STARTS WITH N. The primary gas in the Earth's atmosphere.",
    answer: 'Nitrogen'
  },
  {
    letter: 'O',
    question: 'STARTS WITH O. What is a round fruit with a tough, bright skin and juicy flesh?',
    answer: 'Orange'
  },
  {
    letter: 'P',
    question: 'STARTS WITH P. What is the name of the process by which plants make their food using sunlight?',
    answer: 'Photosynthesis'
  },
  {
    letter: 'Q',
    question: 'STARTS WITH Q. What is the name of a person who serves as the head of a monarchy?',
    answer: 'Queen'
  },
  {
    letter: 'R',
    question: 'STARTS WITH R. What is a four-legged animal known for its antlers?',
    answer: 'Reindeer'
  },
  {
    letter: 'S',
    question: 'STARTS WITH S. What is the term for a four-sided polygon with equal sides and angles?',
    answer: 'Square'
  },
  {
    letter: 'T',
    question: 'STARTS WITH T. A large red fruit often mistaken for a vegetable.',
    answer: 'Tomato'
  },
  {
    letter: 'U',
    question: 'STARTS WITH U. What is a country in Eastern Europe known for its capital, Kyiv?',
    answer: 'Ukraine'
  },
  {
    letter: 'V',
    question: 'STARTS WITH V. What is a word for a famous Italian city known for its canals?',
    answer: 'Venice'
  },
  {
    letter: 'W',
    question: 'STARTS WITH W. What is a large carnivorous mammal known for living in packs and howling?',
    answer: 'Wolf'
  },
  {
    letter: 'X',
    question: 'STARTS WITH X. A medical imaging technique that uses electromagnetic radiation.',
    answer: 'X-ray'
  },
  {
    letter: 'Y',
    question:
      'STARTS WITH Y. What is a domesticated animal known for its thick fur and used for carrying loads in mountainous regions?',
    answer: 'Yak'
  },
  {
    letter: 'Z',
    question: 'STARTS WITH Z. What is an African animal known for its black and white stripes?',
    answer: 'Zebra'
  }
];

const createAlphabetCircle = () => {
  // 360° = 2π radianes
  // medida de cada ángulo
  const eachAngle = (2 * Math.PI) / alphabet.length;
  const startPoint = -Math.PI / 2; // Ajuste del ángulo para empezar a -90º
  const radius = 140;

  for (let i = 0; i < alphabet.length; i++) {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('pasapalabra-game__alphabet-letter');
    letterDiv.textContent = alphabet[i];

    // para posicionar cada letra equidistante
    // ángulo de cada letra
    const letterAngle = startPoint + i * eachAngle;

    // para situar cada letra en el eje horizontal y vertical del borde del círculo
    const x = radius + radius * Math.cos(letterAngle) - 15; // 15 es la mitad del tamaño del div de la letra
    const y = radius + radius * Math.sin(letterAngle) - 15;

    letterDiv.style.left = `${x}px`;
    letterDiv.style.top = `${y}px`;

    alphabetElement.append(letterDiv);

    // Inicializar alphabetLetters después de crear el círculo
    alphabetLetters = document.querySelectorAll('.pasapalabra-game__alphabet-letter');
  }
};

const startGame = () => {
  startButtonElement.classList.add('hidden');
  questionAnswerContainerElement.classList.remove('hidden');

  timeLeft = 240; // Reiniciar el tiempo
  score = 0;
  currentQuestionPosition = 0;
  skippedQuestions = [];
  pendingQuestions = [...questions.map((_, index) => index)];
  gameFinished = false;

  pointsElement.textContent = score;
  updateTimeDisplay();

  initializeLetterStates();

  formElement.addEventListener('submit', verifyAnswer);
  pasapalabraButtonElement.addEventListener('click', usePasapalabraButton);

  startTimer(); // Iniciar el temporizador
  showQuestion();
};

const letterStates = {}; // Objeto para mantener el estado de cada letra

const initializeLetterStates = () => {
  alphabet.split('').forEach(letter => {
    letterStates[letter] = 'pending'; // Estados posibles: 'pending', 'correct', 'incorrect', 'skipped'
  });
};

const showQuestion = () => {
  questionElement.textContent = '';

  if (pendingQuestions.length === 0 && skippedQuestions.length === 0) {
    if (score === questions.length) {
      endGame('win');
    } else {
      endGame('lose');
    }
    return;
  }

  if (pendingQuestions.length === 0) {
    pendingQuestions = [...skippedQuestions];
    skippedQuestions = [];
    pendingQuestions.sort((a, b) => a - b); // Ordenar para mantener el orden original
  }

  currentQuestionPosition = pendingQuestions.shift();

  const currentQuestion = questions[currentQuestionPosition];

  const questionLetterElement = document.createElement('div');
  questionLetterElement.className = 'pasapalabra-game__question-letter';
  questionLetterElement.textContent = currentQuestion.letter;
  questionElement.append(questionLetterElement);

  const questionTextElement = document.createElement('p');
  questionTextElement.className = 'pasapalabra-game__question-text';
  questionTextElement.textContent = ` ${currentQuestion.question}`;
  questionElement.append(questionTextElement);

  // Reset all letter states to pending
  alphabetLetters.forEach(letterElement => {
    const letter = letterElement.textContent;
    letterStates[letter] = 'pending';
  });

  // Restaurar el estado de todas las letras
  alphabetLetters.forEach(letterElement => {
    letterElement.classList.remove('pasapalabra-game__alphabet-letter--current');
    letterElement.classList.remove('pasapalabra-game__alphabet-letter--correct');
    letterElement.classList.remove('pasapalabra-game__alphabet-letter--incorrect');
    letterElement.classList.remove('pasapalabra-game__alphabet-letter--skipped');
  });

  // Update letter states based on letterStates object
  alphabetLetters.forEach(letterElement => {
    const letter = letterElement.textContent;
    const state = letterStates[letter];
    if (state !== 'pending') {
      letterElement.classList.add(`pasapalabra-game__alphabet-letter--${state}`);
    }
  });

  // Set the current letter as current
  const currentLetterElement = [...alphabetLetters].find(
    letterElement => letterElement.textContent === currentQuestion.letter
  );
  if (currentLetterElement) {
    currentLetterElement.classList.add('pasapalabra-game__alphabet-letter--current');
  }
};

const verifyAnswer = event => {
  event.preventDefault();

  // para eliminar los espacios en blanco al principio y al final del texto
  const userAnswer = inputElement.value.toLowerCase().trim();
  inputElement.value = '';

  const currentQuestion = questions[currentQuestionPosition];
  const isCorrect = userAnswer === currentQuestion.answer.toLowerCase();

  if (isCorrect) {
    score++;
    letterStates[currentQuestion.letter] = 'correct';
    showAnswerMessage('Correct!');
  } else {
    letterStates[currentQuestion.letter] = 'incorrect';
    showAnswerMessage('Incorrect');
  }

  pointsElement.textContent = score;
  currentQuestionPosition++;
  showQuestion();
};

const showAnswerMessage = message => {
  const messageElement = document.createElement('span');
  messageElement.className = 'pasapalabra-game__message';

  if (message === 'Correct!') {
    messageElement.classList.add('pasapalabra-game__message--correct');
  } else if (message === 'Incorrect') {
    messageElement.classList.add('pasapalabra-game__message--incorrect');
  } else if (message === 'Pasapalabra') {
    messageElement.classList.add('pasapalabra-game__message--skipped');
  } else {
    messageElement.classList.add('pasapalabra-game__message--final');
  }

  messageElement.textContent = message;
  alphabetElement.append(messageElement);

  if (message === 'Correct!' || message === 'Incorrect' || message === 'Pasapalabra') {
    setTimeout(() => {
      messageElement.classList.add('hidden');
    }, 1500);
  }
};

const usePasapalabraButton = () => {
  letterStates[currentQuestion.letter] = 'skipped';
  showAnswerMessage('Pasapalabra');

  if (!skippedQuestions.includes(currentQuestionPosition)) {
    skippedQuestions.push(currentQuestionPosition);
  }

  currentQuestionPosition++;
  showQuestion();
};

const updateTimeDisplay = () => {
  timeLeftElement.textContent = timeLeft;
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    timeLeft--;

    updateTimeDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame('lose');
    }
  }, 1000);
};

const endGame = result => {
  gameFinished = true;

  clearInterval(timerInterval);
  formElement.removeEventListener('submit', verifyAnswer);
  pasapalabraButtonElement.removeEventListener('click', usePasapalabraButton);

  setTimeout(() => {
    let message;
    if (result === 'win') {
      message = 'You guessed all the questions!';
    } else if (result === 'lose') {
      message = "You didn't answer all the questions correctly";
    } else if (result === 'timeup') {
      message = 'Time is up!';
    }

    showAnswerMessage(message);

    questionAnswerContainerElement.classList.add('hidden');
    restartButtonElement.classList.remove('hidden');
  }, 1500);
};

const restartGame = event => {
  event.preventDefault();

  restartButtonElement.classList.add('hidden');
  questionAnswerContainerElement.classList.remove('hidden');
  questionElement.textContent = '';

  // Ocultar el mensaje de resultado
  const messageElements = document.querySelectorAll('.pasapalabra-game__message');
  messageElements.forEach(msg => msg.classList.add('hidden'));

  // Reiniciar el estado del juego
  currentQuestionPosition = 0;
  score = 0;
  timeLeft = 240;
  gameFinished = false;
  skippedQuestions = [];

  // Reiniciar los elementos del juego
  pointsElement.textContent = score;
  updateTimeDisplay();

  // Crear el círculo con el alfabeto de nuevo
  createAlphabetCircle();

  // Reiniciar el temporizador y mostrar la primera pregunta
  startTimer();
  showQuestion();

  formElement.addEventListener('submit', verifyAnswer);
  pasapalabraButtonElement.addEventListener('click', usePasapalabraButton);
};

startButtonElement.addEventListener('click', startGame);
formElement.addEventListener('submit', verifyAnswer);
pasapalabraButtonElement.addEventListener('click', usePasapalabraButton);
restartButtonElement.addEventListener('click', restartGame);

createAlphabetCircle();
