import { state } from "../../state";
const piedraURL = require("url:../../images/piedra.png");
const papelURL = require("url:../../images/papel.png");
const tijerasURL = require("url:../../images/tijera.png");

export function initChoices(params) {
  const cs = state.getState();
  const div = document.createElement("div");
  div.className = "container-choices";
  div.innerHTML = `
        <div class="computer-choice" >
            <img src=${""} ; class="computer-choice__img" id="computer-move">
        </div>
        <div class="player-choice">
            <img src=${""} ; class="player-choice__img" id="player-move">
        </div>
    `;

  const playerimgEl = div.querySelector("#player-move");
  const upperHand = div.querySelector("#computer-move");
  if (cs.currentGame.PlayerMove == "piedra") {
    upperHand.setAttribute("src", piedraURL);
  }
  console.log(playerimgEl);

  const style = document.createElement("style");
  style.innerHTML = `
        .no-hand{
            display : none
        }
    `;
  state.suscribe(() => {
    if (cs.imPlayer1) {
      if (cs.currentGame.player2Move == "piedra") {
        upperHand.setAttribute("src", piedraURL);
      }
      if (cs.currentGame.player2Move == "papel") {
        upperHand.setAttribute("src", papelURL);
      }
      if (cs.currentGame.player2Move == "tijeras") {
        upperHand.setAttribute("src", tijerasURL);
      }
      if (cs.currentGame.player2Move == "") {
        upperHand.className = "no-hand";
      }

      if (cs.currentGame.PlayerMove == "piedra") {
        playerimgEl.setAttribute("src", piedraURL);
      }
      if (cs.currentGame.playerMove == "papel") {
        playerimgEl.setAttribute("src", papelURL);
      }
      if (cs.currentGame.playerMove == "tijeras") {
        playerimgEl.setAttribute("src", tijerasURL);
      }
      if (cs.currentGame.playerMove == "") {
        playerimgEl.className = "no-hand";
      }
    } else {
      if (cs.currentGame.playerMove == "piedra") {
        upperHand.setAttribute("src", piedraURL);
      }
      if (cs.currentGame.playerMove == "papel") {
        upperHand.setAttribute("src", papelURL);
      }
      if (cs.currentGame.playerMove == "tijeras") {
        upperHand.setAttribute("src", tijerasURL);
      }
      if (cs.currentGame.playerMove == "") {
        upperHand.className = "no-hand";
      }
      if (cs.currentGame.player2Move == "piedra") {
        playerimgEl.setAttribute("src", piedraURL);
      }
      if (cs.currentGame.player2Move == "papel") {
        playerimgEl.setAttribute("src", papelURL);
      }
      if (cs.currentGame.player2Move == "tijeras") {
        playerimgEl.setAttribute("src", tijerasURL);
      }
      if (cs.currentGame.player2Move == "") {
        playerimgEl.className = "no-hand";
      }
    }
  });
  if (cs.imPlayer1 == "true") {
    state.setPlayerMoveInDb();
  } else {
    state.setPlayer2MoveInDb();
  }

  function goToResultsPage() {
    setTimeout(() => {
      params.goTo("/result");
    }, 2000);
  }
  goToResultsPage();
  div.appendChild(style);
  return div;
}
