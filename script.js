'use strict';

// *********************************************** Adding Confetti Styles **********************************************************

// ************************************************************ DOM Elements **********************************************************

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

// DOM elements for Hold function
const holdBtn = document.querySelector('.btn--hold');
const displayFinalScores = document.querySelectorAll('.score');
const winnerBoxEl = document.querySelector('.winner-box');
const newGameBtn = document.querySelector('.btn--new');

//  **************************  Working on showing Players Turn *************************************

const diceRollBoards = document.querySelectorAll('.dice-score');
const scoreHd = document.querySelectorAll('.scoreHeading');
const diceScoreSpan = document.querySelectorAll('.scoreSpan');

// ********************************** Variables *****************************************

let activePlayer = 0;
const finalScores = [0, 0];
let currentScore = 0;

// ************************************************************ All Game Functions **********************************************************

// ******************** 1 - Dice Roll Function ************************

const diceRoll = () => {
  // 1. Generate random dice value
  const diceRollVal = Math.trunc(Math.random() * 6) + 1;
  // 2. Display Dice Image
  diceImg.src = `./dice-${diceRollVal}.png`;
  // Remove Hide class from Dice Img
  diceImg.classList.remove('hidden');

  // 2.B - - -  Show the Dice Value
  diceScoreSpan[activePlayer].textContent = 'Dice value: ';
  scoreHd[activePlayer].style.color = '#0b1d51';
  scoreHd[activePlayer].textContent = diceRollVal;
  diceRollBoards[activePlayer].style.display = 'flex';

  // 3. Check Is it a 1
  if (diceRollVal !== 1) {
    // 4. Add Dice value to current Score
    currentScore += diceRollVal;
    // 5. Display new current Value
    playersCurrentScore[activePlayer].textContent = currentScore;
  } else {
    // Switch Player
    diceScoreSpan[activePlayer].textContent = 'Oops! You Got.';
    // Disabing Roll Btn
    rollBtn.style.backgroundColor = '#d62246';

    scoreHd[activePlayer].style.color = '#d62246';
    scoreHd[activePlayer].textContent = diceRollVal;

    switchPlayers();
  }
};

// ******************** 2. Hold Function ************************

const holdScore = () => {
  // Add current Score to Final Score
  finalScores[activePlayer] += currentScore;
  // Display Final score
  displayFinalScores[activePlayer].textContent = finalScores[activePlayer];
  // Check if finalScore >= 100 to End  the Game
  if (finalScores[activePlayer] >= 20) {
    // Game Over
    gameOver();
  } else {
    // Switch Player
    switchPlayers();
  }
};

// ******************** 3. Switch Players Function ************************

const switchPlayers = () => {
  setTimeout(() => {
    // Enabling Roll Btn
    rollBtn.style.backgroundColor = '#ffffffcc';
    // Hide Dice Roll Val of prev Player
    diceRollBoards[activePlayer].style.display = 'none';

    // setting current Value to 0
    currentScore = 0;
    // Display Current Value
    playersCurrentScore[activePlayer].textContent = currentScore;
    // Switch Active Player
    activePlayer = activePlayer === 0 ? 1 : 0;
    // Toggle Active Player Class for the Overlay Highlight
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    winnerBoxEl.textContent = `Player ${activePlayer + 1}'s turn`;
  }, 500);
};

// ******************** 4. Game Over Function ************************

const gameOver = () => {
  // adding winner class to Active player and loser class to the other player for Styling

  playersEl[activePlayer].classList.add('winner');
  let otherPlayer = activePlayer === 0 ? 1 : 0;
  playersEl[otherPlayer].classList.add('loser');

  // Showing the Winner Message
  winnerBoxEl.textContent = `Player ${activePlayer + 1} Wins The Game.`;
  winnerBoxEl.style.display = 'block';

  // Hide Dice Image
  diceImg.classList.add('hidden');

  // Hiding Play Buttons
  rollBtn.style.visibility = 'hidden';
  holdBtn.style.visibility = 'hidden';
};

// ******************** 5. Game Reset Function ************************

const resetToStart = () => {
  // ****************** Resetting All Values to Initial Values and removing additional classes added for styling *****************************************

  // Removing Dice Value

  scoreHd[activePlayer].textContent = '&#8211;';
  diceScoreSpan[activePlayer].textContent = 'Dice Value';
  diceRollBoards[activePlayer].style.display = 'none';

  // Determining Active Player( Winner ) and Other Player ( Loser ) and removing styles
  let otherPlayer = activePlayer === 0 ? 1 : 0;
  playersEl[activePlayer].classList.remove('winner');
  playersEl[otherPlayer].classList.remove('loser');

  // Hiding Winner Message and Displaying Back the Game Buttons
  winnerBoxEl.style.display = 'none';
  rollBtn.style.visibility = 'visible';
  holdBtn.style.visibility = 'visible';

  // Setting all Values to initial Values
  finalScores[0] = 0;
  finalScores[1] = 0;
  currentScore = 0;

  // Displaying Finals Scores and Current Scores for both players to 0
  playersCurrentScore[activePlayer].textContent = 0;
  playersCurrentScore[otherPlayer].textContent = 0;
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;

  // Adding "Player---active" class to player 1 & Setting Active Player to 0
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  activePlayer = 0;

  winnerBoxEl.textContent = `Player ${activePlayer + 1}'s turn`;
  winnerBoxEl.style.display = 'block';

  // Showing Message Box with the Player Turns
};

// Showing Message Box to show Players Turn

// const messageBox

// ************************************************************ Game Execution Steps **********************************************************

// Setting Initial Score Values to 0

scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;
diceImg.classList.add('hidden');

rollBtn.addEventListener('click', diceRoll);
holdBtn.addEventListener('click', holdScore);
newGameBtn.addEventListener('click', resetToStart);

winnerBoxEl.textContent = `Player ${activePlayer + 1}'s turn`;
winnerBoxEl.style.display = 'block';
