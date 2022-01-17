/* opens and closes overlay, validates and stores user data */

function openPlayerConfig(_event) {
  editedPlayer = +_event.target.dataset.playerid; // +'1' => 1

  playerConfigOverlayElement.style.display = "block";
  backDropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backDropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = '';
  // not a dynamic way of getting access to an element, but
  // it's good practice for DOM traversal
}

function savePlayerConfig(_event) {
  _event.preventDefault();
  // extract entered data from form
  const formData = new FormData(_event.target);
  const enteredPlayername = formData.get("username").trim();
  //   console.log(enteredPlayername)
  if (!enteredPlayername) {
    // is a falsy value
    _event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid name";
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;
  players[editedPlayer - 1].name = enteredPlayername;

  closePlayerConfig();
}
