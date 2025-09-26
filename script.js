'use strict';

let secretNumber = Math.trunc(Math.random() * 100) + 1;
console.log(secretNumber);
let score = 20;
let highscore = 0;
let previousGuesses = [];

const guessInput = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const numberEl = document.querySelector('.number');

function displayMessage(msg) {
  messageEl.textContent = msg;
}

function handleGuess() {
  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > 100) {
    displayMessage('⛔️ Enter a number between 1 and 100!');
    guessInput.value = '';  
    return;
  }

  if (previousGuesses.includes(guess)) {
    displayMessage('⚠️ You already guessed that number!');
    guessInput.value = '';  
    return;
  }

  previousGuesses.push(guess);

  if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    numberEl.textContent = secretNumber;
    document.body.style.backgroundColor = 'green';
    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
    }
  } else {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      scoreEl.textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      scoreEl.textContent = 0;
      document.body.style.backgroundColor = 'red';
      numberEl.textContent = secretNumber; 
    }
  }
  guessInput.value = '';
}

checkBtn.addEventListener('click', handleGuess);

guessInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    handleGuess();
  }
});

againBtn.addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  previousGuesses = [];
  displayMessage('Start guessing...');
  scoreEl.textContent = score;
  numberEl.textContent = '?';
  guessInput.value = '';
  document.body.style.backgroundColor = '#222';
});