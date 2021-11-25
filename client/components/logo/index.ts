
class RPSOptions extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.render();
    }
    render() {

        const childrenImg = require('../../images/playingChildren.png');
        const div = document.createElement('div');
        const style = document.createElement('style');
        div.innerHTML = `
                <img class="home-img" src= "${childrenImg} ">
        `
        style.innerHTML = `
            .home-img{
               max-height: 140px;
            }
             
        `
        div.appendChild(style)
        this.shadow.appendChild(div)
    }
    /* Hacer el componente de las manitos y hacerlo funcional ,
       darle eventos y estilos
    */
}
customElements.define("logo-img", RPSOptions)