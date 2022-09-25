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
let otherPlayer = activePlayer === 0 ? 1 : 0;

// Variables

const finalsScores = [0, 0];

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
    currentScore = 0;
    playersCurrentScore[activePlayer].textContent = currentScore;

    // Switch Player
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
};

rollBtn.addEventListener('click', diceRoll);

// DOM elements for Hold function

const holdBtn = document.querySelector('.btn--hold');
const displayFinalScores = document.querySelectorAll('.score');

// Creating Score Hold Function

const holdScore = () => {
  // Add current Score to Final Score
  finalsScores[activePlayer] += currentScore;
  // Display Final score
  console.log(displayFinalScores);
  displayFinalScores[activePlayer].textContent = finalsScores[activePlayer];

  // Check if finalScore >= 100 to End  the Game

  if (finalsScores[activePlayer] >= 25) {
    playersEl[activePlayer].classList.add('winner');

    playersEl[otherPlayer].classList.add('loser');
    console.log('Game Over!');
    console.log(`Player ${activePlayer} Wins The Game.`);
  } else {
    // Switch Player
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
};

holdBtn.addEventListener('click', holdScore);
