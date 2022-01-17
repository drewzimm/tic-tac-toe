/* responsible for game logic */

function startNewGame() {
  if (!players[0]["name"] || !players[1]["name"]) {
    alert("Please set custom player names for both players!");
    return;
  }

  activePlayerName.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
   if (activePlayer) activePlayer = 0
   else activePlayer = 1

   activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(_event) {
    if (_event.target.tagName !== 'LI'){
        return;
    }
  _event.target.textContent = players[activePlayer].symbol;
  _event.target.classList.add("disabled");
  switchPlayer();
}
