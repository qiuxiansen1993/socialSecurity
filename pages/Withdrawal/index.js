import { post,get } from "../utils/main";
import {
    createBalanceChange,
  } from "../utils/api/balanceChange";
import './index.scss';
const createBalanceChangeFunc = async()=>{
    const totalMoney = document.getElementById('totalMoney').value
    console.log(totalMoney)
    if(!totalMoney || !/^[0-9]*$/.test(totalMoney))return mui.toast("请填写金额");
    const memo = document.getElementById('memo').value
    const {code,msg} = await post(createBalanceChange,{
        totalMoney,
        memo
    });
    if(code === 200){
        mui.toast("提交成功");
        window.location=`${document.location.protocol}//${window.location.host}/WithdrawalRecore/index.html`;
    }else{
        mui.toast(msg || "提交异常~");
    }
}
document.getElementById('save').addEventListener("tap", async function () {
    createBalanceChangeFunc();
})
document.getElementById('view-record').addEventListener("tap", async function () {
    window.location=`${document.location.protocol}//${window.location.host}/WithdrawalRecore/index.html`;
})