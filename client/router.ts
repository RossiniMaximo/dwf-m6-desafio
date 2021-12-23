/*  aca se importan las paginas para usarlas en nuestra base de datos 
    sobre nuestras escenas.
*/
import { initHomePage } from "./pages/home";
import { initRules } from "./pages/rules";
import { initGamePage } from "./pages/ingamePage";
import { initResultPage } from "./pages/result";
import { initChoices } from "./pages/choices";
import { initAccessRoom } from "./pages/accessRoom";
import { initNewGamePage } from "./pages/newGame";
import { initWaitingRoomPage } from "./pages/waitingRoom";
import { initSignUpPage } from "./pages/signup";
import { state } from "./state";
import { isGcsTfliteModelOptions } from "firebase-admin/lib/machine-learning/machine-learning-api-client";

export function initRouter(container: Element) {
  const routes = [
    {
      path: /\//,
      component: initHomePage,
    },
    {
      path: /\/home/,
      component: initHomePage,
    },
    {
      path: /\/accessRoom/,
      component: initAccessRoom,
    },
    {
      path: /\/waitingRoom/,
      component: initWaitingRoomPage,
    },
    {
      path: /\/newGame/,
      component: initNewGamePage,
    },
    {
      path: /\/desafio-apx/,
      component: initHomePage,
    },
    {
      path: /\/rules/,
      component: initRules /* initRulesPage */,
    },
    {
      path: /\/ingame/,
      component: initGamePage /* initGamePage */,
    },
    {
      path: /\/signup/,
      component: initSignUpPage /* initGamePage */,
    },
    {
      path: /\/choices/,
      component: initChoices,
    },
    {
      path: /\/result/,
      component: initResultPage /* initResultPage */,
    },
  ];
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }
  function handleRoute(route) {
    for (let r of routes) {
      if (r.path.test(route)) {
        const el = r.component({ goTo: goTo });

        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el as any);
      }
    }
  }

  if (location.pathname == "/") {
    goTo("/signup");
  }
  handleRoute(location.pathname);

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
window.onload = function () {
  state.initStorage();
};
