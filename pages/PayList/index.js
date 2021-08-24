import { get, post } from "../utils/main";
import './index.scss';
import {
    getUserProperty,
  } from "../utils/api/mybalance";
const getUserPropertyFunc = async()=>{
    const {data:{balance,orderSum},code} = await get(getUserProperty);
    if(code === 200 && orderSum){
        document.querySelector('.paylist-label').innerHTML = `你的余额${balance}元，待支付金额${orderSum}元`
    }
}
getUserPropertyFunc();
document.getElementById('online-pay').addEventListener("tap", async function () {
    window.location=`${document.location.protocol}//${window.location.host}/weixinPay/wxpay.html`;
})
document.getElementById('offline-pay').addEventListener("tap", async function () {
    window.location=`${document.location.protocol}//${window.location.host}/Offline/index.html`;
})