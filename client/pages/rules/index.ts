import { STATUS_CODES } from "http";
import { state } from "../../state";
export function initRules(params) {
  const div = document.createElement("div");
  div.className = "container";
  div.innerHTML = `
        <div class="text-container">
            <p class="text">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos .</p>
        </div>
        <div class="img-container">
            <rps-hands></rps-hands>
        </div>

    `;
  const cs = state.getState();
  cs.imInPageRules = "true";

  /* Aca entra en recursión */
  state.suscribe(()=>{
    if (cs.readyPlayer1 == "ready") {
      if(cs.imInPageRules == "true"){
        params.goTo("/ingame");
      }
    }
  })

  return div;
}
