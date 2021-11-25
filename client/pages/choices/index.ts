import { state } from "../../state";
const piedraURL = require("url:../../images/piedra.png");
const papelURL = require("url:../../images/papel.png");
const tijerasURL = require("url:../../images/tijera.png");

export function initChoices(params) {
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
  console.log(playerimgEl);

  const style = document.createElement("style");
  style.innerHTML = `
        .no-hand{
            display : none
        }
    `;

  if (state.data.currentGame.playerMove == "piedra") {
    playerimgEl.src = piedraURL;
  }
  if (state.data.currentGame.playerMove == "papel") {
    playerimgEl.src = papelURL;
  }
  if (state.data.currentGame.playerMove == "tijeras") {
    playerimgEl.src = tijerasURL;
  }
  if (state.data.currentGame.playerMove == "") {
    playerimgEl.className = "no-hand";
  }
  const botimgEl = div.querySelector("#computer-move");

  if (state.data.currentGame.computerMove == "piedra") {
    botimgEl.src = piedraURL;
    botimgEl.setAttribute("src", piedraURL);
  }
  if (state.data.currentGame.computerMove == "papel") {
    botimgEl.src = papelURL;
  }
  if (state.data.currentGame.computerMove == "tijeras") {
    botimgEl.src = tijerasURL;
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
