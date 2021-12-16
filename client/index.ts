import "./components/button";
import "./components/hands";
import "./components/timer";
import "./components/star";
import { initRouter } from "./router";
import { state } from "./state";
(function () {
  const rootEl = document.querySelector(".root");
  initRouter(rootEl);
  /* state.initStorage(); */
})();
