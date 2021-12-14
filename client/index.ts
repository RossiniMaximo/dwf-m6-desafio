import "./components/button";
import "./components/hands";
import "./components/timer";
import "./components/star";
import { initRouter } from "./router";
(function () {
  const rootEl = document.querySelector(".root");
  initRouter(rootEl);
})();
