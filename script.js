'use strict';

// Selecting the DOM elements to Maipulate

// Final Scores of Both Players

const scorePlayer0 = document.getElementById('score--0');
const scorePlayer1 = document.getElementById('score--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const playersEl = document.querySelectorAll('.player');

// Dice Image

const diceImg = document.querySelector('.dice');

// DOM Elements for RollDice Function

const rollBtn = document.querySelector('.btn--roll');
const playersCurrentScore = document.querySelectorAll('.current-score');
let activePlayer = 0;
// let otherPlayer = activePlayer === 0 ? 1 : 0;

// Variables

const finalScores = [0, 0];

let currentScore = 0;

// Setting Initial Score Values to 0

scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;
diceImg.classList.add('hidden');

// Creating Dice Roll Function

const diceRoll = () => {
  // 1. Generate random dice value

  const diceRollVal = Math.trunc(Math.random() * 6) + 1;
  console.log(diceRollVal);
  // 2. Display Dice Image
  diceImg.src = `./dice-${diceRollVal}.png`;
  // Remove Hide class from Dice Img
  diceImg.classList.remove('hidden');
  // 3. Check Is it a 1

  if (diceRollVal !== 1) {
    // 4. Add Dice value to current Score
    currentScore += diceRollVal;
    // 5. Display new current Value
    playersCurrentScore[activePlayer].textContent = currentScore;
  } else {
    // Set CurrentScore to 0
    console.log(`Player Out at ${currentScore}`);

    // Switch Player
    switchPlayers();
  }
};

rollBtn.addEventListener('click', diceRoll);

// DOM elements for Hold function

const holdBtn = document.querySelector('.btn--hold');
const displayFinalScores = document.querySelectorAll('.score');

// Creating Score Hold Function

const holdScore = () => {
  // Add current Score to Final Score
  finalScores[activePlayer] += currentScore;
  // Display Final score
  // console.log(displayFinalScores);
  displayFinalScores[activePlayer].textContent = finalScores[activePlayer];

  // Check if finalScore >= 100 to End  the Game

  if (finalScores[activePlayer] >= 12) {
    gameOver();
  } else {
    // Switch Player
    switchPlayers();
  }
};

holdBtn.addEventListener('click', holdScore);

const winnerBoxEl = document.querySelector('.winner-box');

const switchPlayers = () => {
  currentScore = 0;
  playersCurrentScore[activePlayer].textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const gameOver = () => {
  playersEl[activePlayer].classList.add('winner');
  let otherPlayer = activePlayer === 0 ? 1 : 0;
  playersEl[otherPlayer].classList.add('loser');
  winnerBoxEl.textContent = `Player ${activePlayer + 1} Wins The Game.`;
  winnerBoxEl.style.display = 'block';
  diceImg.classList.add('hidden');
  rollBtn.style.visibility = 'hidden';
  holdBtn.style.visibility = 'hidden';
};

const newGameBtn = document.querySelector('.btn--new');

const resetToStart = () => {
  let otherPlayer = activePlayer === 0 ? 1 : 0;
  playersEl[activePlayer].classList.remove('winner');
  playersEl[otherPlayer].classList.remove('loser');
  winnerBoxEl.style.display = 'none';
  rollBtn.style.visibility = 'visible';
  holdBtn.style.visibility = 'visible';
  finalScores[0] = 0;
  finalScores[1] = 0;
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentScore = 0;
  playersCurrentScore[activePlayer].textContent = 0;
  playersCurrentScore[otherPlayer].textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  activePlayer = 0;
};

newGameBtn.addEventListener('click', resetToStart);
