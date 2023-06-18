"use strict";

let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);
let playing = true;
// let boxes2 = document.querySelectorAll(".box");
// console.log(boxes2);

const O_TEXT = "O";
const X_TEXT = "X";
let currentPLayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  if (playing) {
    const id = e.target.id;

    console.log(id);

    if (!spaces[id]) {
      spaces[id] = currentPLayer;
      console.log(spaces);
      console.log(spaces[id]);
      e.target.innerText = currentPLayer;

      if (playerHasWon() !== false) {
        playerText.innerText = `${currentPLayer} has won`;
        let winning_blocks = playerHasWon();

        winning_blocks.map(
          (box) => (boxes[box].style.backgroundColor = winnerIndicator)
        );
        playing = false;
        return;
      }

      currentPLayer = currentPLayer === X_TEXT ? O_TEXT : X_TEXT;
    }
  }
}
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;
    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}
restartBtn.addEventListener("click", restart);

function restart() {
  playing = true;
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  currentPLayer = X_TEXT;

  playerText.innerText = "Tic Tac Toe";
}

startGame();
