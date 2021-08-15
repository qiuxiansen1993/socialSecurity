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
let isPageHide = false; 
const xiyiTitle = document.getElementById('xiyi-title');
const xiyiContent = document.getElementById('xiyi-content');
  window.addEventListener('pageshow', function () { 
    if (isPageHide) { 
      window.location.reload(); 
    } 
  }); 
  window.addEventListener('pagehide', function () { 
    isPageHide = true; 
  });
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
const setXiyiContent = (city)=>{
  if(city === '北京'){
    xiyiTitle.innerHTML = '自主就业';
    xiyiContent.innerHTML = `
          <p>感谢您对亲亲小保的支持与信赖。
          </p>

          <p>亲亲小保平台联合您所在城市的优质人力资源服务企业，为您提供<span class="highlight">规范的社保公积金缴纳、工资个税申报及相关人事服务</span>。无论您是自由职业者、个体创业者还是处于就业空档期，连续的社保、公积金缴纳记录对您都非常重要。我们把您的需求放在第一位，以规范、严谨的服务守护您的权益。
          </p>
    `
  }else{
    xiyiTitle.innerHTML = '劳务派遣'
    xiyiContent.innerHTML = `
    <p>因政策要求，2020年9月起，您选择的工作城市不再支持单纯的“社保代缴”服务，<span class="highlight">不合政策要求的社保代缴服务会导致您的权益得不到保障。 </span>
        </p>
        <p>亲亲小保平台的优质合作企业可按照“自主就业”的方式与您建立<span class="highlight">规范的劳动关系</span>，并由专业人事顾问为您<span class="highlight">办理工资、个税、社保、公积金等全面的服务</span>。从而帮您在一个城市保持连续的工作履历和社保、工资、个税记录，享受应有的社会福利。
        </p>
    `
  }
}
const initPickerCity = (data) => {
  let picker = new mui.PopPicker();
  picker.setData(data);
  let workCity = document.getElementById('workCity');
  let result = document.getElementById('workCityResult');
  setXiyiContent(city)
  result.innerHTML=city
  getRandomCompanyFunc()
  workCity.addEventListener(
    "tap",
    function (event) {
      picker.show(async function (items) {
        city = items[0];
        setXiyiContent(city)
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
    window.location = `${document.location.protocol}//${window.location.host}/MyInfo/index.html?back=MyServer`
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
                window.location = `${document.location.protocol}//${window.location.host}${'/CreateOrder/index.html?city='+escape(city)}`;
            } else {
                console.log('取消提交')
            }
        })
    });
    [...document.querySelectorAll(".handle-tools-item")].map((item) => {
      item.addEventListener("tap", function (e) {
        const _url = this.getAttribute("data-href");
        window.location = `${document.location.protocol}//${window.location.host}${_url}`;
      });
    });
};
