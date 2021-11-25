import { state } from "../../state"
export function initRules(params) {
    const div = document.createElement('div');
    div.className = "container"
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
    const buttonId = div.querySelector("#button");
    buttonId.addEventListener("click", () => {
        /* state.data.currentGame.playerMove = "" */
        params.goTo("/ingame")
    })
    return div
    /* estaba por añadirle styles a los containers */
}