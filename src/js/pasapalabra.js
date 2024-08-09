// El styles lo importamos aquí, ya se carga después al compilar todo

import '../scss/styles.scss';

const alphabetElement = document.getElementById('alphabet');
const startButtonElement = document.getElementById('button-start-pasapalabra');
const questionAnswerContainerElement = document.getElementById('question-answer-container');
const questionElement = document.getElementById('question');
const questionLetterElement = document.getElementById('question-letter');
let alphabetLetters; // Se inicializará después de crear el círculo de letras

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

let currentQuestionIndex = 0;

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

  // Mostrar la primera pregunta
  showQuestion();
};

// Función para mostrar una pregunta
const showQuestion = () => {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    questionLetterElement.textContent = currentQuestion.letter;

    // Cambiar el color de fondo de la letra actual a morado
    alphabetLetters.forEach(letterElement => {
      // if (letterElement.textContent === currentQuestion.letter) {
      //   const rootStyles = document.documentElement.style;
      //   rootStyles.setProperty('--blue', '--light-purple');
      // }

      // Cambiar color para la letra actual
      if (letterElement.textContent === currentQuestion.letter) {
        letterElement.style.backgroundColor = 'var(--purple)';
      }
    });
  }
};

startButtonElement.addEventListener('click', startGame);

// Llamar a createAlphabetCircle después de definirlo
createAlphabetCircle();
