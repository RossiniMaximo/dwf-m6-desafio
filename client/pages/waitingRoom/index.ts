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
            <button class="move-page">Connect to the room</button>
            </div>
    </div>
  `;

  state.suscribe(() => {
    const myScoreEl = div.querySelector(".my_score");
    myScoreEl.textContent = cs.playerScore;
    const roomIdEl = div.querySelector(".roomId_number");
    roomIdEl.textContent = cs.roomId;
    const shareCodeEl = div.querySelector(".shareCode");
    shareCodeEl.textContent = cs.roomId;
    state.setReadyPlayer();
  });
  state.listenPlayer2Values();
  cs.imInPageWaitingRoom = "true";
  state.suscribe(() => {
    if (cs.readyPlayer2 == "true" && cs.imInPageWaitingRoom == "true") {
      params.goTo("/ingame");
    }
  });

  /* const buttonElement = div.querySelector(".move-page");
  buttonElement.addEventListener("click", (e) => {
    if (cs.imPlayer1 == "true") {
      state.suscribe(() => {
        if (cs.readyPlayer2 === "true") {
          params.goTo("/ingame");
        } else {
          console.log("false");
        }
      });
    }
  }); */

  return div;
}
