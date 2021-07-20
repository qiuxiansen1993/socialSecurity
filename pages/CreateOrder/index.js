import "../utils/main";
import "./index.scss";
var picker = new mui.PopPicker();
picker.setData([
  {
    value: "first",
    text: "第一项",
  },
  {
    value: "second",
    text: "第一项",
  },
  {
    value: "third",
    text: "第三项",
  },
  {
    value: "fourth",
    text: "第四项",
  },
  {
    value: "fifth",
    text: "第五项",
  },
]);

picker.pickers[0].setSelectedValue("fourth", 2000);
let showUserPickerButton = document.getElementById("showUserPicker");
let userResult = document.getElementById("userResult");
showUserPickerButton.addEventListener(
  "tap",
  function (event) {
    picker.show(function (items) {
      userResult.innerText = JSON.stringify(items[0]);
      //返回 false 可以阻止选择框的关闭
      //return false;
    });
  },
  false
);
