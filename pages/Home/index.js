import "../utils/main"
import "./index.scss";
const homeMenu = document.getElementById("home-menu");
const homeBody= document.getElementById("home-body");
//监听点击事件
homeMenu && homeMenu.addEventListener("tap", function () {
  mui(".mui-off-canvas-wrap").offCanvas().toggle();
});
homeBody && homeBody.addEventListener("tap", function () {
    mui(".mui-off-canvas-wrap").offCanvas().close();
});
