/* responsible for game logic */

function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (!players[0]["name"] || !players[1]["name"]) {
    alert("Please set custom player names for both players!");
    return;
  }

  resetGameStatus();

  activePlayerName.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer) activePlayer = 0;
  else activePlayer = 1;

  activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(_event) {
  if (_event.target.tagName !== "LI" || gameIsOver) {
    return;
  }

  const selectedField = _event.target;
  const selectedColumn = selectedField.dataset.col - 1; // the - 1 turns it into a number
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select am empty field!");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    endGame(winnerId);
  }
  currentRound++; // keeps track of if there's a tie
  switchPlayer();
}

function checkForGameOver() {
  // checking the rows for a winner
  for (let i = 0; i <= 2; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  // checking cols for a winner
  for (let i = 0; i <= 2; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
  // diagonal: top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] == gameData[1][1] &&
    gameData[1][1] == gameData[2][2]
  ) {
    return gameData[0][0];
  }
  // diagonal: top right to bottom left
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] == gameData[1][1] &&
    gameData[1][1] == gameData[2][0]
  ) {
    return gameData[0][2];
  }

  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
