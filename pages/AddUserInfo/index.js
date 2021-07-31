import { get, post } from "../utils/main";
import {
    updateUserInfo,
    uploadMaterial,
    getMaterialList
  } from "../utils/api/personal";
import './index.scss';
const updateUserInfoFunc = async()=>{
    await post(updateUserInfo,{
        userName:'邱成林',
        userIdCard:'231083199306096811',
        userHouseHold:'城镇户口',// 城镇户口 农业户口

    })
}
document.getElementById('save').addEventListener('tap',()=>{
    updateUserInfoFunc()
})