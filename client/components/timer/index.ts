class Timer extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.setUp();
    }
    setUp() {
        let counter = 0;
        let timeLeft = 4;
        const intervalId = setInterval(() => {
            counter++
            const div = document.createElement("div");
            div.className = "root"
            div.innerHTML = `
                <div class="timer-container">
                    <p id ="timer"class="timer">${timeLeft - counter}</p>
                </div>
            `
            const timerEl = div.querySelector("#timer")
            /* console.log("timer row 24", timerEl.textContent); */


            if (this.shadow.firstChild) {
                this.shadow.firstChild.remove()
            }
            if (counter > 3) {
                clearInterval(intervalId)
            }
            const style = document.createElement("style");
            style.innerHTML = `
                .root{
                    width :100%;
                }
                .timer-container{
                    border : solid 4px;
                    border-radius: 50%;
                    width: 200px;
                    height : 200px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .timer{
                    font-size : 100px;
                    margin: auto;
                }
            `
            div.appendChild(style);
            this.shadow.appendChild(div);
        }, 1000)
    }
}
customElements.define("the-timer", Timer);
