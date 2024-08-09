// El styles lo importamos aquí, ya se carga después al compilar todo

import '../scss/styles.scss';

const alphabetElement = document.getElementById('alphabet');
const startButtonElement = document.getElementById('button-start-pasapalabra');
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
    question: 'CONTAINS THE K. What is a type of shoe with wheels attached for gliding?',
    answer: 'Skate'
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
  updateTimeDisplay();
  startTimer(); // Iniciar el temporizador

  showQuestion();
};

const showQuestion = () => {
  questionElement.textContent = '';

  if (currentQuestionPosition < questions.length) {
    const currentQuestion = questions[currentQuestionPosition];

    const questionLetterElement = document.createElement('div');
    questionLetterElement.className = 'pasapalabra-game__question-letter';
    questionLetterElement.textContent = currentQuestion.letter;
    questionElement.append(questionLetterElement);

    const questionTextElement = document.createElement('p');
    questionTextElement.className = 'pasapalabra-game__question-text';
    questionTextElement.textContent = ` ${currentQuestion.question}`;
    questionElement.append(questionTextElement);

    alphabetLetters.forEach(letterElement => {
      if (letterElement.textContent === currentQuestion.letter) {
        letterElement.classList.add('pasapalabra-game__alphabet-letter--current');
      }
    });
  } else if (!gameFinished) {
    endGame('You guessed all the questions!');
  }
};

const verifyAnswer = event => {
  event.preventDefault();

  const currentQuestion = questions[currentQuestionPosition];
  // para eliminar los espacios en blanco al principio y al final del texto
  const userAnswer = inputElement.value.trim();

  // Comparar la respuesta del usuario con la respuesta correcta
  if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    // Respuesta correcta
    alphabetLetters.forEach(letterElement => {
      if (letterElement.textContent === currentQuestion.letter) {
        letterElement.classList.remove('pasapalabra-game__alphabet-letter--current');
        letterElement.classList.add('pasapalabra-game__alphabet-letter--correct');
        showAnswerMessage('Correct!');
        score++;
        pointsElement.textContent = score;
      }
    });
  } else {
    // Respuesta incorrecta
    alphabetLetters.forEach(letterElement => {
      if (letterElement.textContent === currentQuestion.letter) {
        letterElement.classList.remove('pasapalabra-game__alphabet-letter--current');
        letterElement.classList.add('pasapalabra-game__alphabet-letter--incorrect');
        // Mostrar mensaje de "incorrecto"
        showAnswerMessage('Incorrect');
      }
    });
  }

  // Limpiar el input
  inputElement.value = '';

  // Avanzar a la siguiente pregunta
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
  }

  messageElement.textContent = message;
  alphabetElement.append(messageElement);

  // Ocultar el mensaje después de un tiempo
  setTimeout(() => {
    messageElement.textContent = '';
  }, 2000);
};

const usePasapalabraButton = () => {
  const currentQuestion = questions[currentQuestionPosition];

  alphabetLetters.forEach(letterElement => {
    if (letterElement.textContent === currentQuestion.letter) {
      letterElement.classList.remove('pasapalabra-game__alphabet-letter--current');
      letterElement.classList.add('pasapalabra-game__alphabet-letter--skipped');
      showAnswerMessage('Pasapalabra');
    }
  });

  // Avanzar a la siguiente pregunta
  currentQuestionPosition++;
  showQuestion();
};

const updateTimeDisplay = () => {
  timeLeftElement.textContent = timeLeft;
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (gameFinished) {
      clearInterval(timerInterval);
      return;
    }

    timeLeft--;
    updateTimeDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame('Time is up!');
    }
  }, 1000);
};

const endGame = message => {
  gameFinished = true;

  questionElement.textContent = message;
  // showAnswerMessage(message);
  formElement.removeEventListener('submit', verifyAnswer);
  pasapalabraButtonElement.removeEventListener('click', usePasapalabraButton);
};

// Llamar a createAlphabetCircle después de definirlo
createAlphabetCircle();
startButtonElement.addEventListener('click', startGame);
formElement.addEventListener('submit', verifyAnswer);
pasapalabraButtonElement.addEventListener('click', usePasapalabraButton);
