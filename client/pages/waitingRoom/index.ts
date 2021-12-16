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
                <div class="users_scores">${`<p class="my_score"> ${cs.userName} : ${cs.playerScore}</p>`}</div>
                </div>
                <div class="room-info_container">
                    <p class="info">Sala</p>
                    <p class="info roomId_number">${cs.roomId}</p>
                </div>
            </header>
        </div>
        <div class="text-field">
        <p class="room_id__text">Comparti el código con tu advesario : ${`<p class="shareCode users_scores">${cs.roomId}</p>`}</p>
            <p class="text-field_content">Esperando a que el adversario presione ¡Jugar!...</p>
        </div>
    </div>
  `;

  console.log("rtdbRoomId:", cs.rtdbRoomId);
  state.listenPlayer2Values();
  state.accessToRoom();
  state.suscribe(() => {
    const myScoreEl = div.querySelector(".my_score");
    myScoreEl.textContent = cs.playerScore;
    const roomIdEl = div.querySelector(".roomId_number");
    roomIdEl.textContent = cs.roomId;
    const shareCodeEl = div.querySelector(".shareCode");
    shareCodeEl.textContent = cs.roomId;
    state.setReadyPlayer();
  });
  cs.imInPageWaitingRoom = "true";
  console.log("Es aca la cosa : ", cs.readyPlayer2);

  state.suscribe(() => {
    if (cs.readyPlayer2 == "true") {
      if (cs.imInPageWaitingRoom == "true") {
        params.goTo("/ingame");
      }
    }
  });

  return div;
}
