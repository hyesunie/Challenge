import CafeApp from "./cafe_app.js";
import CafeManager from "./cafe_manager.js";

function init() {
  const cafeManager = new CafeManager();
  const cafeApp = new CafeApp(cafeManager);
  cafeApp.init();
}

window.addEventListener("DOMContentLoaded", (e) => {
  init();
});
