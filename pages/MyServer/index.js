import { get, post } from "../utils/main";
import {
  getCityList,
  getRandomCompany
} from "../utils/api/createOrder";
import {
  getUserInfo
} from "../utils/api/personal";

import "./index.scss";
let city = '' // 城市
let UserInfos = {} // 信息

const getCityListFunc = async()=>{
  const {code,data} = await get(getCityList);
  if(code === 200){
    city = data[0]
    initPickerCity(data)
  }
}
const getUserInfoFunc = async()=>{
  const {code,data} = await get(getUserInfo);
  console.log(code,data)
  const {userInfo,user:{headimg = ''}} = data
  if(code === 200){
    const infolist = [
      'userIdCard',
      'userMobile',
      'userName',
      'userHouseHold'
    ]
    document.getElementById('headimg').innerHTML = headimg ? `<img class="head-portrait" src="${headimg}"/>` : `<i id="headimg" class="mui-icon mui-icon-contact" style="font-size: 50px; color: #1199ff"></i>`
    UserInfos = {...userInfo}
    infolist.forEach((item)=>{
      document.getElementById(item).innerHTML = userInfo?.[item] || ''
    })
  }
}

const initPickerCity = (data) => {
  let picker = new mui.PopPicker();
  picker.setData(data);
  let workCity = document.getElementById('workCity');
  let result = document.getElementById('workCityResult');
  result.innerHTML=city
  getRandomCompanyFunc()
  workCity.addEventListener(
    "tap",
    function (event) {
      picker.show(async function (items) {
        city = items[0];
        result.innerText = items[0];
        getRandomCompanyFunc()
      });
    },
    false
  );
};
const getRandomCompanyFunc = async()=>{
  const {code,data} = await get(getRandomCompany,{
    city
  });
  if(code === 200){
    UserInfos.corpName = data.corpName
    document.getElementById('workAdree').innerHTML = data.corpName
  }
}
window.onload = () => {
  getCityListFunc();
  getUserInfoFunc();
  document.getElementById("more-set").addEventListener("tap", function () {
    mui("#set-popover").popover("toggle");
  });
  document.getElementById("view-order").addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/PayCost/index.html`
  });
  document.getElementById("create-order").addEventListener("tap", function () {
    document.getElementById("handle-order").style= 'display:none;';
    document.getElementById("order-operation").style= 'display:none;';
    document.getElementById("handle-tools").style= 'display:none;';
    document.getElementById("create-content").style= 'display:block;'
  });
  document.getElementById("view-myInfo").addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/MyInfo/index.html`
  });
  document.getElementById("view-myBanlance").addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/MyBalance/index.html`
  });
  document.getElementById("contract-management").addEventListener("tap", function () {
    mui.toast("暂不支持");
  });
  document
    .getElementById("more-set-cancel")
    .addEventListener("tap", function () {
      mui("#set-popover").popover("toggle");
    });
  document
    .getElementById("to-updataUserInfo")
    .addEventListener("tap", function (e) {
      const _url = this.getAttribute("data-href");
      window.location = `${document.location.protocol}//${window.location.host}${_url}`;
    });
    document
    .getElementById("agreement-btn")
    .addEventListener("tap", function (e) {
        if(Object.keys(UserInfos).length < 1){
          return mui.toast("获取信息失败");
        }
        const {userName,corpName,userHouseHold} = UserInfos
        console.log(UserInfos)
        if(!corpName){
          return mui.toast("您点的太快了，请稍后重试~");
        }
        mui.confirm(`<div class="agreement-confirm"><p>姓名：${userName}</p><p>户籍：${userHouseHold}</p><p>工作城市：${city}</p><p>办理单位：${corpName}</p></div>
        `, '确认前往办理？', ['否', '是'], function(e) {
            if (e.index == 1) {
                console.log('前往提交')
                window.location = `${document.location.protocol}//${window.location.host}${'/CreateOrder/index.html?city='+escape('北京')}`;
            } else {
                console.log('取消提交')
            }
        })
    });
};
