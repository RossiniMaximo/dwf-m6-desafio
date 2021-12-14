import { state } from "../../state";
const winURL = require("url:../../images/Star.png");
const loseURL = require("url:../../images/Star2.png");
const tieURL = require("url:../../images/tie-game.jpg");

export function initResultPage(params) {
  const currentState = state.getState();
  state.result();

  if (currentState.winner == "player2" && currentState.imPlayer2) {
    state.scoreCounter("player2");
    state.setPlayer2ScoreinDb();
    state.setWinPlayer2();
  }
  if (currentState.winner == "player2" && currentState.imPlayer1) {
    state.scoreCounter("player2");
  }

  if (currentState.winner == "player1" && currentState.imPlayer1) {
    state.scoreCounter("player");
    state.setPlayerScoreinDb();
    state.setWinPlayer();
  }
  if (currentState.winner == "player1" && currentState.imPlayer2) {
    state.scoreCounter("player1");
  }

  const div = document.createElement("div");
  div.innerHTML = `
    <div class="result-img">
    <p id="text" class="result-text">Ganaste!</p>
    <img src=${winURL} id="image-id"class="img">
    </div>
    <div class="content">
    <div class="scoreboard-container">
    <h4 class="scoreboard__title">Puntaje</h4>
    <p class="scoreboard__player"></p>
    <p class="scoreboard__computer">Máquina:${currentState.computerScore}</p>
    </div>
    <div class="butt-container">
    <my-button id="play-again-button">Volver a jugar</my-button>
    </div>
    </div>
    `;

  const pEl = div.querySelector(".scoreboard__player");
  if (currentState.imPlayer1) {
    pEl.textContent = "Vos :" + currentState.playerScore;
  } else {
    pEl.textContent = "Vos :" + currentState.player2Score;
  }
  const secondPEl = div.querySelector(".scoreboard__computer");
  if (currentState.imPlayer1) {
    secondPEl.textContent =
      currentState.player2Name + ":" + currentState.player2Score;
  } else {
    secondPEl.textContent =
      currentState.userName + ":" + currentState.playerScore;
  }
  const imgEl = div.querySelector("#image-id");
  const textEl = div.querySelector("#text");

  /* if (currentState.winner == "player1") {
    imgEl.setAttribute("src", winURL);
    textEl.textContent = "¡Ganaste!";
  } */
  if (currentState.winner == "player2" && currentState.imPlayer2) {
    imgEl.setAttribute("src", winURL);
    textEl.textContent = "¡Ganaste!";
  }
  if (currentState.winner == "player1" && currentState.imPlayer2) {
    imgEl.setAttribute("src", loseURL);
    textEl.textContent = "¡Perdiste!";
  }
  if (currentState.winner == "player1" && currentState.imPlayer1) {
    imgEl.setAttribute("src", winURL);
    textEl.textContent = "¡Ganaste!";
  }
  if (currentState.winner == "player2" && currentState.imPlayer1) {
    imgEl.setAttribute("src", loseURL);
    textEl.textContent = "¡Perdiste!";
  }
  if (currentState.winner == "") {
    imgEl.setAttribute("src", tieURL);
    textEl.textContent = "¡Empate!";
  }
  currentState.imInResultPage = "true";
  currentState.readyPlayer1 == "";
  currentState.readyPlayer2 == "";
  const buttonEl = div.querySelector("#play-again-button");

  buttonEl.addEventListener("click", () => {
    currentState.currentGame.playerMove = "";
    currentState.currentGame.player2Move = "";

    if (currentState.imPlayer1 == "true") {
      currentState.playAgainPlayer1 = "true";
      state.setState(currentState);
      state.setPlayerPlayAgain();
    }
    if (currentState.imPlayer2 == "true") {
      currentState.playAgainPlayer2 = "true";
      state.setState(currentState);
      state.setPlayer2PlayAgain();
    }
  });
  /* Entra en recursión */
  state.suscribe(() => {
    if (
      currentState.playAgainPlayer1 == "true" &&
      currentState.playAgainPlayer2 == "true" &&
      currentState.imInResultPage == "true"
    ) {
      params.goTo("/ingame");
    }
  });

  return div;
}
