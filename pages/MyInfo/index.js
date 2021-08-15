import { get, post } from "../utils/main";
import { GetRequest } from "../utils/tool";
import { IdCardValidate,bankCardValidate } from "../utils/rules";
import {
  updateUserInfo,
  uploadMaterial,
  getMaterialList,
  getUserInfo,
} from "../utils/api/personal";
import "./index.scss";
let materialLength = 0;
const uploadForm = document.getElementById("upload-form");
const openUpload = document.getElementById("open-upload");
const submitMap = [
  "userIdCard",
  "userHouseCity",
  "userName",
  // "userBankCard",
  // "userBankName",
];
const getMap = [
  "userIdCard",
  "userHouseCity",
  "userName",
  "userBankCard",
  "userBankName",
];
const updateUserInfoFunc = async () => {
  let param = {};
  let canSave = true;
  let userHouseHold = document.getElementById('userHouseHold').innerText;
  const userBankCard = document.getElementById('userBankCard').value;
  const userBankName = document.getElementById('userBankName').value;
  submitMap.forEach((item) => {
    const value = document.getElementById(item).value;
    if (!value) {
      setTimeout(()=>{mui.toast("请填写全部信息");},200)
      canSave = false;
    } else if(item === 'userIdCard' && !IdCardValidate(value)){
      setTimeout(()=>{mui.toast("您填写的身份证号有误");},200)
      canSave = false;
    } else if(item === 'userBankCard' && !bankCardValidate(value)){}else{
      param[item] = value;
    }
  });
  
  if(userBankCard && !bankCardValidate(userBankCard)){
    setTimeout(()=>{mui.toast("您填写的银行卡号有误");},200)
    return
  }
  if (!userHouseHold) return setTimeout(()=>{mui.toast("请填写全部信息");},200)
  if (!canSave) return;
  const { code, msg } = await post(updateUserInfo, { ...param, userHouseHold,userBankCard,userBankName });
  if (code === 200) {
    mui.toast("提交成功");
    const {back} = GetRequest()
    // window.history.back(); 
    window.location = `${document.location.protocol}//${window.location.host}${'/'+back+'/index.html'}`;
  } else {
    mui.toast(msg || "提交异常~");
  }
};
const getUserInfoFunc = async () => {
  const { code, data } = await get(getUserInfo);
  if (code === 200) {
      try{
          const {userInfo = {},user : {headimg,nickname}} = data
          getMap.forEach((item) => {
            document.getElementById(item).value = userInfo[item] || '';
        });
        document.getElementById('headimg').innerHTML = headimg ? `<img class="head-portrait" src="${headimg}"/>` : `<i id="headimg" class="mui-icon mui-icon-contact" style="font-size: 50px; color: #1199ff"></i>`
        document.getElementById("nickname").innerHTML = '昵称：' + (nickname || '');
        document.getElementById("userMobile").innerHTML = '电话号码：'+userInfo?.userMobile || '';
        document.getElementById("userHouseHold").innerHTML = userInfo?.userHouseHold || '';
      }catch(e){
          console.log(e)
      }
  }
};
openUpload.addEventListener("tap", function (e) {
  const _value = document.getElementById("materialName").value;
  if (!_value) return mui.toast("请填写文件名称");
  if (materialLength >= 10) return mui.toast("已超过最大上传限制");
  uploadForm.click();
});
const getMaterialListFunc = async () => {
  const { code, data } = await get(getMaterialList);
  console.log(data);
  if (code === 200) {
    materialLength = data.length;
    document.querySelector(".material-list").innerHTML = data
      .map((item) => {
        const { materialName } = item;
        return `<div class="material-item"><i class="mui-icon mui-icon-paperclip"></i><span>${materialName}</span></div>`;
      })
      .join("");
  }
};
const initUpload = () => {
  //首先监听input框的变动，选中一个新的文件会触发change事件
  uploadForm.addEventListener("change", function () {
    //获取到选中的文件
    var file = uploadForm.files[0];
    if(file.size > 5*1024*1024){
      return mui.toast("您上传的文件不要超过5M");
    }
    //创建formdata对象
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append(
      "materialName",
      document.getElementById("materialName").value
    );

    //创建xhr，使用ajax进行文件上传
    var xhr = new XMLHttpRequest();
    xhr.open("post", uploadMaterial);
    //回调
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        getMaterialListFunc();
        document.getElementById("materialName").value = "";
      }
    };
    //获取上传的进度
    xhr.upload.onprogress = function (event) {};
    //将formdata上传
    xhr.send(formdata);
  });
};
document.getElementById("save-info").addEventListener("tap", () => {
  updateUserInfoFunc();
});
document
  .getElementById("userHouseHoldOpen")
  .addEventListener("tap", async function () {
    var picker = new mui.PopPicker();
    picker.setData([
      { value: "城镇户口", text: "城镇户口" },
      { value: "农业户口", text: "农业户口" },
    ]);
    picker.show(function (selectItems) {
      const _userHouseHold = selectItems[0]?.value;
      document.getElementById("userHouseHold").innerHTML = _userHouseHold;
    });
  });
initUpload();
getMaterialListFunc();
getUserInfoFunc();
