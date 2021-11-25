import { state } from "../../state"
export function initGamePage(params) {
    const currentState = state.getState();

    const div = document.createElement("div");
    div.className = "container"
    div.innerHTML = `
    <h2 class="title"> ¡Elige una opción!</h2>
    <div class="timer-container">
    <the-timer id="timer"></the-timer> 
    </div>
    <p class="your-move">tu jugada :</p>
    <p class="move-receptor">${currentState.playerMove}</p>
    <div class="hands-container">
    <rps-hands></rps-hands>
    </div>
    `;
    console.log("Soy el state en la pág ingame");

    const moves = ["piedra", "papel", "tijeras"];
    let move = moves[Math.floor(Math.random() * moves.length)];
    console.log("soy el move de la pc", move);
    state.setComputerMove(move);
    state.suscribe(() => {
        const pEl = div.querySelector(".move-receptor");
        const pElContent = pEl.textContent = currentState.currentGame.playerMove
    })


    function goToChoices() {
        setTimeout(() => {
            params.goTo("/choices");
        }, 5000)
    }
    goToChoices();
    return div
}