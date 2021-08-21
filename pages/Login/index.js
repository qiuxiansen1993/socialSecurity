import { get, post } from "../utils/main";
import { getSmsCode, bindMobile, login,validateCode } from "../utils/api/login";
import "./index.scss";

const reg = /^1[0-9]{10}$/;
let token = null;
let canSmsCode = true;
let canBind = true;
const agreement = document.getElementById("select-agreement");
const handleAgreement = () =>{
  document.getElementById("agreement").addEventListener("tap", function (event) {
    mui.alert(`
    协议如下：11111
    `,'协议');
      event.stopPropagation();
      event.preventDefault();
  });
}

document.querySelector(".img-code").addEventListener("tap", function (event) {
  this.src = "/validateCode"
});
const countdownFunc = () => {
  const _verificationCode = document.getElementById("verificationCode");
  let numbers = 60;
  const timer = setInterval(() => {
    if (numbers <= 0) {
      clearInterval(timer);
      canSmsCode = true;
      _verificationCode.innerHTML = '获取验证码'
      return;
    } else {
      _verificationCode.innerHTML = `${numbers}s`;
      canSmsCode = false;
    }
    numbers--;
  }, 1000);
};
document
  .getElementById("verificationCode")
  .addEventListener("tap", async function () {
    try {
      const mobile = document.getElementById("login-phone").value;
      const validateCode = document.getElementById("validateCode").value;
      if (!canSmsCode) return;
      if (!reg.test(mobile)) {
        setTimeout(()=>{
          mui.toast("请填写正确的手机号");
        },50)
        return;
      }
      if(!validateCode){
        setTimeout(()=>{
          mui.toast("请填写图片验证码");
        },50)
        return;
      }
      canSmsCode = false;
      const { data, code, msg } = await post(getSmsCode, {
        mobile,
        validateCode
      });
      canSmsCode = true;
      document.querySelector(".img-code").src = "/validateCode"
      if (code === 200) {
        token = data.token;
        countdownFunc();
        mui.toast("发送成功");
      } else {
        mui.toast(msg || "发送失败");
      }
    } catch (e) {
      canSmsCode = true;
    }
  });
document
  .getElementById("bindMobileSubmit")
  .addEventListener("tap", async function () {
    try {
      const mobile = document.getElementById("login-phone").value;
      const smsCode = document.getElementById("login-code").value;
      // if(!agreement.checked){
      //   mui.toast("请填写阅读协议并勾选");
      //   return;
      // }
      if (!reg.test(mobile)) {
        mui.toast("请填写正确的手机号");
        return;
      }
      if (smsCode.length <= 0) {
        mui.toast("请填写验证码");
      }
      canBind = false;
      const { data, code,msg } = await post(bindMobile, {
        mobile,
        token,
        smsCode,
      });
      canBind = true;
      if (code === 200) {
        mui.toast("绑定成功");
        window.location=`${document.location.protocol}//${window.location.host}/Home/index.html`;
      } else {
        mui.toast(msg || "绑定失败");
      }
    } catch (e) {
      canBind = true;
    }
  });
