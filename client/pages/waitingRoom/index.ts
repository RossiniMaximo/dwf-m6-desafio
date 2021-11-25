import { state } from "../../state";

export function initWaitingRoomPage(params) {
  const cs = state.getState();
  const div = document.createElement("div");
  div.classList.add(".root_div");
  div.innerHTML = `
    <div class="root_container">
        <div>
            <header class="waiting-room__header">
                <div class="userScores_container">
                    <div class="users_scores">${`<p> ${cs.userName} : ${cs.playerScore}</p>`}</div>
                    <div class="users_scores">${`<p> ${cs.userName} : ${cs.playerScore}</p>`}</div>
                </div>
                <div class="room-info_container">
                    <p class="info">Sala</p>
                    <p class="info">${cs.roomId}</p>
                </div>
            </header>
        </div>
        <div class="text-field">
            <p class="text-field_content">Esperando a que el adversario presione ¡Jugar!...</p>
        </div>
        <div class="container-hands">
            <rps-hands class="hola hands-waiting-room"></rps-hands>
        </div>
    </div>
  `;
  return div;
}
