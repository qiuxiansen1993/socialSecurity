import "../utils/main"
import './index.scss';
const CopyMap = ['account-name','opening-bank','account-number'];
const copyText = document.getElementById('copyText');
CopyMap.forEach((key)=>{
    document.getElementById(key).addEventListener("tap", async function () {
        copyText.value = document.querySelector('.'+key).innerHTML;
        copyText.select(); 
        document.execCommand("copy");
        mui.toast("拷贝成功~");
    })
})
document.getElementById('toNotice').addEventListener("tap", async function () {
    window.location=`${document.location.protocol}//${window.location.host}/TransferNotice/index.html`;
})
document.querySelector('.to-transfer-record').addEventListener("tap", async function () {
    window.location=`${document.location.protocol}//${window.location.host}/TransferRecord/index.html`;
})
