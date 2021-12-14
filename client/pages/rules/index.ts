import { textSpanContainsTextSpan } from "typescript";
import { state } from "../../state";
export function initRules(params) {
  const div = document.createElement("div");
  div.className = "container";
  div.innerHTML = `
        <div class="text-container">
            <p class="text">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos .</p>
        </div>
        <div class="button-container">
            <my-button id="button">¡Jugar!</my-button>
        </div>
        <div class="img-container">
            <rps-hands></rps-hands>
        </div>

    `;
  const cs = state.getState();
  cs.imInPageRules = "true";
  const buttonId = div.querySelector("#button");
  state.suscribe(() => {
    state.setReadyPlayer2();
  });
  state.suscribe(() => {
    if (cs.readyPlayer1 == "ready" && cs.imInPageRules == "true") {
      params.goTo("/ingame");
    }
  });

  return div;
}
