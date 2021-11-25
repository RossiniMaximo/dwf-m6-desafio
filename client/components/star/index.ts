/* import { state } from "../../state"
class Star extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render()
    }
    render() {
        const winImg = require("url:../../images/Star.png");
        const loseImg = require("url:../../images/Star2.png");
        const div = document.createElement('div');
        div.className = "img-container"
        div.innerHTML = `
        <img   class="img">
        `;
        const imgEl = div.querySelector("img");
        let imgAtt = imgEl.getAttribute("src");

        const currentState = state.getState();
        console.log(currentState);

        if (currentState.winner == "player") {
            imgEl.setAttribute("src", winImg)
        };
        if (currentState.winner == "computer") {
            imgEl.setAttribute("src", loseImg);
        };

        const style = document.createElement('style');
        style.innerHTML = `
        .img-container{
            width : 50px
        }
        .img{
           object-fit : cover
        }
        .win{}
        .lose{}
        `

        div.appendChild(style);
        this.shadow.appendChild(div);
    }
}
customElements.define("result-star", Star); */