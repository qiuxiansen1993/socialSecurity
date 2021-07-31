import { get, post } from "../utils/main";

import {
    updateUserInfo,
    uploadMaterial,
    getMaterialList,
    getUserInfo
  } from "../utils/api/personal";
import './index.scss';
let materialLength = 0;
const uploadForm = document.getElementById("upload-form");
const openUpload = document.getElementById('open-upload');
const updateUserInfoFunc = async()=>{
    await post(updateUserInfo,{
        userName:'邱成林',
        userIdCard:'231083199306096811',
        userHouseHold:'城镇户口',// 城镇户口 农业户口

    })
}
/*
userName：姓名
useIdCard:身份证
userHouseHold：户籍
userHouseCity:户籍所在城市
userBankCard:卡号
bankName:开户行名称
*/
const getUserInfoFunc = async()=>{
    const {code,data} = await get(getUserInfo)
}
openUpload.addEventListener("tap",function (e) {
    const _value = document.getElementById('materialName').value
    if(!_value)return mui.toast('请填写文件名称');
    if(materialLength>=10)return mui.toast('已超过最大上传限制');
    uploadForm.click()
})
const getMaterialListFunc = async() =>{
    const {code,data} = await get(getMaterialList)
    console.log(data)
    if(code === 200){
        materialLength = data.length
        document.querySelector('.material-list').innerHTML=data.map((item)=>{
            const {materialName} = item
            return `<div class="material-item"><i class="mui-icon mui-icon-paperclip"></i><span>${materialName}</span></div>`
        }).join('')
    }
}
const initUpload = ()=>{
    //首先监听input框的变动，选中一个新的文件会触发change事件
    uploadForm.addEventListener("change",function () {
        //获取到选中的文件
        var file = uploadForm.files[0];
        //创建formdata对象
        var formdata = new FormData();
        formdata.append("file",file);
        formdata.append("materialName",document.getElementById('materialName').value);
        
        //创建xhr，使用ajax进行文件上传
        var xhr = new XMLHttpRequest();
        xhr.open("post",uploadMaterial);
        //回调
        xhr.onreadystatechange = function () {
            if (xhr.readyState==4 && xhr.status==200){
                getMaterialListFunc()
                document.getElementById('materialName').value = ''
            }
        }
        //获取上传的进度
        xhr.upload.onprogress = function (event) {
        }
        //将formdata上传
        xhr.send(formdata);
    });
}
document.getElementById('save-info').addEventListener('tap',()=>{
    updateUserInfoFunc()
})
initUpload()
getMaterialListFunc()
getUserInfoFunc()