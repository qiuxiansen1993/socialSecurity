import { get, post } from "../utils/main";
import { getSmsCode, bindMobile, login } from "../utils/api/login";
import "./index.scss";

const reg = /^1[0-9]{10}$/;
let token = null;
let canSmsCode = true;
let canBind = true;
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
      if (!canSmsCode) return;
      if (!reg.test(mobile)) {
        mui.toast("请填写正确的手机号");
        return;
      }
      canSmsCode = false;
      const { data, code, msg } = await post(getSmsCode, {
        mobile,
      });
      canSmsCode = true;
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
