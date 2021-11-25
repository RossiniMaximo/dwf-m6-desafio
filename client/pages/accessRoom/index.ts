import { nanoid } from "nanoid";
import { state } from "../../state";
export function initAccessRoom(params) {
  state.setState(state.data);
  const cs = state.getState();
  const div = document.createElement("div");
  div.className = "container-homepage";
  div.innerHTML = `
        <div  class="title-container">
            <h1 class="piedra">Piedra</h1>
            <span class="papel">Papel <span class="o-word">ó</span></span>
            <span class="tijera">Tijera</span>
        </div>
        <form class="content_container">
          <div class="input-container">
              <input type="text" class="access-input" name="user-name" placeholder="Ingrese su nombre"/>
          </div>
          <div class="input-container">
              <input type="text" class="access-input" name="room-id" placeholder="Ingrese el código aquí"/>
          </div>
          <div class="button-container">
              <button id="button-id">Ingresar a una sala</button>
          </div>
        </form>
    `;
  const formEl = div.querySelector(".content_container");
  console.log(formEl);

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target as any;
    const nameVal = target["user-name"].value;
    console.log(nameVal);
    const roomIdVal = target["room-id"].value;
    console.log(roomIdVal);
    if (nameVal != "" && roomIdVal != "") {
      cs.userName = nameVal;
      cs.roomId = roomIdVal;
      state.setState(cs);
      params.goTo("/rules");
    }
  });

  /* const buttonEl = div.querySelector("#button-id");
  buttonEl.addEventListener("click", (e) => {
    params.goTo("/rules");
  }); */

  return div;
}
