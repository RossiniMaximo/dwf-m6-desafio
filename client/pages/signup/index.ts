import { state } from "../../state";
export function initSignUpPage(params) {
  const cs = state.getState();
  const div = document.createElement("div");
  div.className = "main-container";
  div.innerHTML = `
    <form class="form">
        <div class="title-container">
            <h2 class="title">Registro</h2>
        </div>
        <div class="fields-container">
            <label>
                <p class="etiqueta">Nombre</p>
            </label>
            <input type="text" name="nombre" class="input">
        </div>
        <div class="button-cont">
            <button class="button">Registrarse</button>
        </div>
        <div class="login-cont">
            <p class="login-text">¿Ya tienes cuenta?</p>
            <a href="/home" class="login-text">¡Ingresa aquí!</a>
        </div> 
    </form>
    `;
  const formEl = div.querySelector(".form");
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target as any;
    const nameValue = target.nombre.value;
    console.log(nameValue);
    if (nameValue != "") {
      cs.signName = nameValue;
      state.setState(cs);
      state.signUp();
      params.goTo("/home");
    }
  });
  const stylesheet = document.createElement("style");
  stylesheet.innerHTML = `
            *{
                box-sizing: border-box
            }
            body{
                margin:0;
            }
            .main-container{
                height : 100vh;
            }
            .form{
                display : flex;
                flex-direction : column;
                gap : 40px;
            }
            .title-container{
                display:flex;
                flex-direction :column;
                align-items:center;
            }
            .title{
                font-family: "Gluten", cursive;
                font-size: 32px;
                margin : 0;
                margin-top : 80px;
                margin-bottom : 50px;
            }

            .etiqueta{
                font-family: "Gluten", cursive;
                font-size : 16px;   
                margin : 0;
                color : white;
            }
            input:focus, textarea:focus, select:focus{
                outline: none;
            }
            .input{
                max-width :200px;
                padding: 8px;
            }

            .fields-container{
                display : flex;
                flex-direction : column;
                margin : 0 auto;
            }
            .button-cont{
                    max-width :200px;
                    margin: 0 auto;
            }
            .button{
                width :100%;
                padding :10px;
                border : solid 2px;
                border-radius : 4px;
                background-color : purple;
                color : white;
                font-family: "Gluten", cursive;
                font-size:14px;
            }
            .login-cont{
                display:flex;
                flex-direction : column;
                align-items:center;
            }
            .login-text{
                font-family: "Gluten", cursive;
                color : white;
            }
        `;
  div.appendChild(stylesheet);
  return div;
}
