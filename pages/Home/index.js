import { get, post } from "../utils/main";
import "./index.scss";
window.onload = () => {
  const homeMenu = document.getElementById("home-menu");
  const homeBody = document.getElementById("home-body");
  //监听点击事件
  homeMenu &&
    homeMenu.addEventListener("tap", function () {
      mui(".mui-off-canvas-wrap").offCanvas().toggle();
    });
  homeBody &&
    homeBody.addEventListener("tap", function () {
      mui(".mui-off-canvas-wrap").offCanvas().close();
    });
  [...document.querySelectorAll(".nav-item__click")].map((item) => {
    item.addEventListener("tap", function (e) {
      const _url = this.getAttribute("data-href");
      window.location = `${document.location.protocol}//${window.location.host}${_url}`;
    });
  });
};
