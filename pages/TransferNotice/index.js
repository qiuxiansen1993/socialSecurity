import { post } from "../utils/main";
import { IdCardValidate,bankCardValidate } from "../utils/rules";
import { createBankOrder } from "../utils/api/transferNotice";
import "./index.scss";
const submitMap = [
  "bankName",
  "account",
  "userName",
  "totalMoney",
  "memo",
];
let transferTime = ''
const createBankOrderFunc = async () => {
  let param = {};
  let canSave = true;
  submitMap.forEach((item) => {
    const value = document.getElementById(item).value;
    if (!value) {
      mui.toast("请填写全部信息");
      canSave = false;
    }else {//shizw修改，银行卡不做校验
      param[item] = value;
    }
  });
  if(!transferTime)return mui.toast("请填写全部信息");
  if (!canSave) return;
  const { code, msg } = await post(createBankOrder, {...param,transferTime});
  if (code === 200) {
    mui.toast("您已提交成功");
    window.location = `${document.location.protocol}//${window.location.host}/Offline/index.html`;
  } else {
    mui.toast(msg || "提交异常~");
  }
};
document.getElementById("save").addEventListener("tap", async function () {
  createBankOrderFunc();
});
document
  .getElementById("transferTimeOpen")
  .addEventListener("tap", async function () {
    var dtPicker = new mui.DtPicker({
        type:'date'
    });
    dtPicker.show(function (selectItems) {
      const { y,m,d} = selectItems;
      const _transferTime = `${y.value}-${m.value}-${d.value}`;
      document.getElementById('transferTime').innerHTML = _transferTime;
      transferTime = _transferTime;
    });
  });
