import { get, post } from "../utils/main";
import { GetRequest } from "../utils/tool";
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
  "userBankCard",
  "userBankName",
];
let userHouseHold = "";
const updateUserInfoFunc = async () => {
  let param = {};
  let canSave = true;
  submitMap.forEach((item) => {
    const value = document.getElementById(item).value;
    if (!value) {
      mui.toast("请填写全部信息");
      canSave = false;
    } else {
      param[item] = value;
    }
  });
  if (!userHouseHold) return mui.toast("请填写全部信息");
  if (!canSave) return;
  const { code, msg } = await post(updateUserInfo, { ...param, userHouseHold });
  if (code === 200) {
    mui.toast("提交成功");
    const {back} = GetRequest()
    window.location = `${document.location.protocol}//${window.location.host}${'/'+back+'/index.html'}`;
  } else {
    mui.toast(msg || "提交异常~");
  }
};
const getUserInfoFunc = async () => {
  const { code, data } = await get(getUserInfo);
  if (code === 200) {
      try{
          const {userInfo = {},user : {headimg}} = data
        submitMap.forEach((item) => {
            document.getElementById(item).value = userInfo[item] || '';
        });
        document.getElementById('headimg').innerHTML = headimg ? `<img class="head-portrait" src="${headimg}"/>` : `<i id="headimg" class="mui-icon mui-icon-contact" style="font-size: 50px; color: #1199ff"></i>`
        document.getElementById("nickname").innerHTML = '昵称：' + (userInfo?.nickname || '');
        document.getElementById("userMobile").innerHTML = '电话号码：'+userInfo?.userMobile || '';
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
      userHouseHold = _userHouseHold;
    });
  });
initUpload();
getMaterialListFunc();
getUserInfoFunc();
