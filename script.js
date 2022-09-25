'use strict';

// Selecting the DOM elements to Maipulate

// Final Scores of Both Players

const scorePlayer0 = document.getElementById('score--0');
const scorePlayer1 = document.getElementById('score--1');

// Dice Image

const diceImg = document.querySelector('.dice');

// DOM Elements for RollDice Function

const rollBtn = document.querySelector('.btn--roll');

// Setting Initial Score Values to 0

scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;
diceImg.classList.add('hidden');

// Creating Dice Roll Function

const diceRoll = () => {
  // 1. Generate random dice value

  const diceRollVal = Math.trunc(Math.random() * 6) + 1;
  console.log(diceRollVal);
  console.log(diceImg.src);

  // 2. Display Dice Image

  diceImg.src = `./dice-${diceRollVal}.png`;
  // Remove Hide class from Dice Img
  diceImg.classList.remove('hidden');

  // 3. Check Is it a 1
  // 4. Add Dice Value to current Score Value
  // 5. Display new Current Score
};

rollBtn.addEventListener('click', diceRoll);
