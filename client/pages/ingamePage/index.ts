import { state } from "../../state";
export function initGamePage(params) {
  const cs = state.getState();
  cs.winner = "";
  let moveValue = "";
  state.suscribe(() => {
    if (cs.imPlayer2 == "true") {
      moveValue = cs.currentGame.player2Move;
    } else {
      moveValue = cs.currentGame.playerMove;
    }
  });
  const div = document.createElement("div");
  div.className = "container";
  div.innerHTML = `
<h2 class="title"> ¡Elige una opción!</h2>
<div class="timer-container">
<the-timer id="timer"></the-timer> 
</div>
<p class="your-move">tu jugada :</p>
<p class="move-receptor">${moveValue}</p>
<div class="hands-container">
<rps-hands></rps-hands>
</div>
`;
  const pEl = div.querySelector(".move-receptor");
  state.suscribe(() => {
    const pElContent = (pEl.textContent = moveValue);
  });
  if (cs.imPlayer2 == "true") {
    cs.imInPageRules = "false";
  }
  if (cs.imPlayer1 == "true") {
    cs.imInPageWaitingRoom = "false";
  }
  cs.imInResultPage == "false";
  cs.playAgainPlayer1 = "false";
  cs.playAgainPlayer2 = "false";
  state.setState(cs);

  function goToChoices() {
    setTimeout(() => {
      params.goTo("/choices");
    }, 5000);
  }
  goToChoices();
  return div;
}
