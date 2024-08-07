// El styles lo importamos aquí, ya se carga después al compilar todo

import '../scss/styles.scss';

const alphabetElement = document.getElementById('alphabet');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
  }
};

createAlphabetCircle();
