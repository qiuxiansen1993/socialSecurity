import { get, post } from "../utils/main";
import { login } from "../utils/content";
import "./index.scss";
const loginres = get(login);
const homeMenu = document.getElementById("home-menu");
const homeBody= document.getElementById("home-body");
//监听点击事件
homeMenu && homeMenu.addEventListener("tap", function () {
  mui(".mui-off-canvas-wrap").offCanvas().toggle();
});
homeBody && homeBody.addEventListener("tap", function () {
    mui(".mui-off-canvas-wrap").offCanvas().close();
});
