'use strict';

// Variables
const cardValues = ['./assets/images/kiwi.png', './assets/images/avocado.png', './assets/images/apple.png', './assets/images/orange.png', './assets/images/watermelon.png', './assets/images/pineapple.png',];

//Hacemos un duplicado de las cartas y las randomizamos:
const randomisedElements = ([].concat(cardValues, cardValues.slice())).sort(() => Math.random() - 0.5);

let remainingCards = randomisedElements.length;
let flippedCards = [];

// Hacemos el tablero de juego:
const game = document.querySelector('.game');


//Función para el efecto confeti:
const generateConfetti = () => {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  const randomInRange = (min, max) => { return Math.random() * (max - min) + min; };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};

// Definir la función que verifica que las tarjetas son iguales:
const checkMatch = () => {
  if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
    flippedCards.forEach(card => {
      remainingCards -= 1;
      card.removeEventListener('click', flipCard);
    });

    // Limpiar el array de las tarjetas giradas:
    flippedCards = [];
    if (remainingCards === 0) {
      generateConfetti();
    }

  } else {
    //Ocultar la imagen para continuar con el juego:
    flippedCards.forEach(card => card.setAttribute('src', './assets/images/interrogación.jpg'));
    //Limpiar targetas giradas:
    flippedCards = [];
  }
};


// Función de voltear la tarjeta:
function flipCard() {
  console.log(this);
  if (flippedCards.length < 2 && !flippedCards.includes(this)) {
    this.setAttribute('src', this.dataset.value);
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

// Función para generar la tarjeta:
const cardGenerator = (cardValue) => {
  const card = document.createElement('img');

  card.classList.add('card');
  card.dataset.value = cardValue;
  card.setAttribute('src', './assets/images/interrogación.jpg');
  card.addEventListener('click', flipCard, card);


  game.appendChild(card);
};

// Usamos forEach para "iterar" sobre cada elemento del array sin necesidad de usar un bucle for:
randomisedElements.forEach((picture) => {
  cardGenerator(picture);
});

