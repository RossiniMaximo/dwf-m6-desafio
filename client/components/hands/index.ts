import { state } from "../../state";
class Hands extends HTMLElement {
  move: "piedra" | "papel" | "tijeras";
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.syncWithState();
    this.handsLogic();
  }
  syncWithState() {
    this.render();
  }
  handsLogic() {
    const lastState = state.getState();
    lastState.playerMove = "";
    lastState.player2Move = "";
    lastState.computerMove = "";
    const piedraId = this.shadow.querySelector("#piedra");
    piedraId.addEventListener("click", () => {
      piedraId.classList.remove("blur");
      tijerasId.classList.add("blur");
      papelId.classList.add("blur");
      state.data.currentGame.playerMove = "";
      if (lastState.imPlayer2 == "true") {
        state.setPlayer2Move("piedra");
      } else {
        state.setMove("piedra");
      }
    });
    const papelId = this.shadow.querySelector("#papel");
    papelId.addEventListener("click", (e) => {
      papelId.classList.remove("blur");
      piedraId.classList.add("blur");
      tijerasId.classList.add("blur");
      state.data.currentGame.playerMove = "";
      if (lastState.imPlayer2 == "true") {
        state.setPlayer2Move("papel");
      } else {
        state.setMove("papel");
      }
    });
    const tijerasId = this.shadow.querySelector("#tijeras");
    let triggersCounter = 0;
    tijerasId.addEventListener("click", () => {
      tijerasId.classList.remove("blur");
      papelId.classList.add("blur");
      piedraId.classList.add("blur");
      if (lastState.imPlayer2 == "true") {
        state.setPlayer2Move("tijeras");
      } else {
        state.setMove("tijeras");
      }
    });
  }
  render() {
    const piedraURL = require("url:../../images/piedra.png");
    const papelURL = require("url:../../images/papel.png");
    const tijerasURL = require("url:../../images/tijera.png");
    const div = document.createElement("div");
    div.className = "container";
    div.innerHTML = `
        <img class="img piedra borde" id="piedra" src="${piedraURL}">
        <img class="img papel" id="papel" src="${papelURL}">
        <img class="img tijeras" id="tijeras" src="${tijerasURL}">
        `;
    const style = document.createElement("style");
    style.innerHTML = `
        .container{
            display : flex;
            gap : 25px;
        }
        .img{
            height : 150px;
            display : block;
        }
        .blur{filter: blur(4px); transition: all 0.15s;}
        .blur:hover{
            transform: translate3d(0px,-2px,0px);
        }
        `;

    div.appendChild(style);
    this.shadow.appendChild(div);
  }
}
customElements.define("rps-hands", Hands);
