class Button extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `
            .button{
                padding : 5px;
                background-color :rgb(128, 0, 128);
                color : #D8FCFC;
                font-size : 35px;
                font-family: 'Gluten', cursive;
                border : solid 2px white;
                border-radius : 10px;
                width : 100%;
                cursor:pointer;
            }
            .button:hover{
                transform: translate3d(0px, -2px, 0px);
            }
        `;
    this.shadow.innerHTML = `
        <button class="button"></button>
        `;
    const buttonEl = this.shadow.querySelector("button");
    buttonEl.textContent = this.textContent;
    this.shadow.appendChild(style);
  }
}
customElements.define("my-button", Button);
