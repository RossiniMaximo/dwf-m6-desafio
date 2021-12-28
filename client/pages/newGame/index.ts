import { state } from "../../state";
export function initNewGamePage(params) {
  /* state.setState(state.data); */
  const cs = state.getState();
  cs.imPlayer2 = "";
  const div = document.createElement("div");
  div.className = "container-homepage";
  div.innerHTML = `
        <div  class="title-container">
            <h1 class="piedra">Piedra</h1>
            <span class="papel">Papel <span class="o-word">ó</span></span>
            <span class="tijera">Tijera</span>
        </div>
        <form class="input_container">
            <label class="input__label">Tu nombre</label>
            <input type="text" name ="newGame_input" class="newGame_input"/>
            <div class="b-container">
                <button class="start-button"id="accessRoom-id">Empezar</button>
            </div>
        </form>
        <div class="container-hands">
            <rps-hands class="hola"></rps-hands>
        </div>
    `;

  const formEl = div.querySelector(".input_container");
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target as any;
    const nameValue = target["newGame_input"].value;
    if (nameValue != "") {
      cs.userName = nameValue;
      state.signIn(() => {
        state.askNewRoom(() => {
          state.accessToRoom();
        });
      });
      cs.imPlayer1 = "true";
      params.goTo("/waitingRoom");
    }
  });
  return div;
}
