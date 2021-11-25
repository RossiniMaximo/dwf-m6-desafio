import { state } from "../../state";
const winURL = require("url:../../images/Star.png");
const loseURL = require("url:../../images/Star2.png");
const tieURL = require("url:../../images/tie-game.jpg");

export function initResultPage(params) {
    console.log("soy el state en la pág result", state);
    const currentState = state.getState();

    state.result(currentState.playerMove, currentState.computerMove);


    if (currentState.winner == "player") {
        state.scoreCounter("player")
    }
    if (currentState.winner == "computer") {
        state.scoreCounter("computer")
    }

    const div = document.createElement('div');
    div.innerHTML = `
    <div class="result-img">
    <p id="text" class="result-text">Ganaste!</p>
    <img src=${winURL} id="image-id"class="img">
    </div>
    <div class="content">
    <div class="scoreboard-container">
    <h4 class="scoreboard__title">Puntaje</h4>
    <p class="scoreboard__player">Vos :${currentState.playerScore}</p>
    <p class="scoreboard__computer">Máquina:${currentState.computerScore}</p>
    </div>
    <div class="butt-container">
    <my-button id="play-again-button">Volver a jugar</my-button>
    </div>
    </div>
    `;

    const imgEl = div.querySelector("#image-id");
    const textEl = div.querySelector("#text")

    if (currentState.winner == "player") {
        imgEl.setAttribute("src", winURL);
        textEl.textContent = "¡Ganaste!"
    }
    if (currentState.winner == "computer") {
        imgEl.setAttribute("src", loseURL);
        textEl.textContent = "¡Perdiste!"
    }
    if (currentState.winner == "") {
        imgEl.setAttribute("src", tieURL);
        textEl.textContent = "¡Empate!";
    }
    state.setState(currentState)
    const buttonEl = div.querySelector("#play-again-button")
    buttonEl.addEventListener("click", () => {
        state.data.currentGame.playerMove = ""
        params.goTo("/ingame")
    })

    return div
}