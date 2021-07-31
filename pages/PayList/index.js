import "../utils/main"
import './index.scss';

document.getElementById('online-pay').addEventListener("tap", async function () {
    window.location=`${document.location.protocol}//${window.location.host}/weixinPay/wxpay.html`;
})
document.getElementById('offline-pay').addEventListener("tap", async function () {
    window.location=`${document.location.protocol}//${window.location.host}/Offline/index.html`;
})