import { get, post } from "../utils/main";
import {
  getCityList
} from "../utils/api/createOrder";
import "./index.scss";
console.log("Personal.js");
const getCityListFunc = async()=>{
  const {code,data} = await get(getCityList);
  console.log(code,data)
}
getCityListFunc();
window.onload = () => {
  document.getElementById("more-set").addEventListener("tap", function () {
    mui("#set-popover").popover("toggle");
  });
  document
    .getElementById("more-set-cancel")
    .addEventListener("tap", function () {
      mui("#set-popover").popover("toggle");
    });
  document
    .getElementById("to-updataUserInfo")
    .addEventListener("tap", function (e) {
      const _url = this.getAttribute("data-href");
      window.location = `${document.location.protocol}//${window.location.host}${_url}`;
    });
    document
    .getElementById("agreement-btn")
    .addEventListener("tap", function (e) {
        mui.confirm(`<div class="agreement-confirm"><p>手机号：邱成林</p><p>户籍：邱成林</p><p>工作城市：邱成林</p><p>办理单位：邱成林</p></div>
        `, '确认前往办理？', ['否', '是'], function(e) {
            if (e.index == 1) {
                console.log('前往提交')
                window.location = `${document.location.protocol}//${window.location.host}${'/CreateOrder/index.html?city='+escape('北京')}`;
            } else {
                console.log('取消提交')
            }
        })
    });
};
