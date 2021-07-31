import { post } from "../utils/main";
import {
    createBankOrder
  } from "../utils/api/transferNotice";
import './index.scss';
const submitMap = ['bankName','account','userName','totalMoney','memo'];
const createBankOrderFunc = async()=>{
    let param = {}
    let canSave = true
    submitMap.forEach((item)=>{
        const value = document.getElementById(item).value;
        if(!value){
            mui.toast("请填写全部信息");
            canSave = false
        }else{
            param[item] = value
        }
    })
    if(!canSave)return
    const {code,msg} = await post(createBankOrder,param);
    if(code === 200){
        mui.toast("提交成功");
    }else{
        mui.toast(msg || "提交异常~");
    }
}
document.getElementById('save').addEventListener("tap", async function () {
    createBankOrderFunc();
})