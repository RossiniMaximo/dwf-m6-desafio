import { state } from "../../state";
export function initHomePage(params) {
  const cs = state.getState();
  const div = document.createElement("div");
  div.className = "container-homepage";
  div.innerHTML = `
        <div  class="title-container">
            <h1 class="piedra">Piedra</h1>
            <span class="papel">Papel <span class="o-word">ó</span></span>
            <span class="tijera">Tijera</span>
        </div>
        <div class="b-container">
            <my-button id="button-id">Nuevo juego</my-button>
        </div>
        <div class="b-container">
            <my-button id="accessRoom-id">Ingresar a una sala</my-button>
        </div>
        <div class="container-hands">
            <rps-hands class="hola"></rps-hands>
        </div>
    `;
  /* Entra en recursión si ejecuto el initStorage aca */
  /* state.initStorage() */
  const buttonEl = div.querySelector("#button-id");
  buttonEl.addEventListener("click", (e) => {
    cs.userName = cs.signName;
    cs.imPlayer1 = "true";
    if (cs.signName) {
      state.askNewRoom(() => {
        params.goTo("/waitingRoom");
      });
    } else {
      params.goTo("/newGame");
    }
  });
  const accessButtonEl = div.querySelector("#accessRoom-id");
  accessButtonEl.addEventListener("click", (e) => {
    params.goTo("/accessRoom");
  });
  return div;
}
