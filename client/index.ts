import "./components/button";
import "./components/logo";
import "./components/hands";
import "./components/timer";
import "./components/star";
import { state } from "./state";
import { initRouter } from "./router";

(function () {
  const rootEl = document.querySelector(".root");
  initRouter(rootEl);
})();
