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
let selectedCity = ''// 选择的城市
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
    xiyiContent.style="";
    const pullText = document.querySelector('.pull-text');
    pullText.style="display:block;"
    pullText.addEventListener("tap",function(e){
      xiyiContent.style="height:auto;";
      e.target.style="display:none;"
    })
    xiyiTitle.innerHTML = '自主就业';
    xiyiContent.innerHTML = `
    <p>因政策要求，2020年9月起，您选择的工作城市不再支持单纯的“社保代缴”服务，<span class="highlight">不合政策要求的社保代缴服务会导致您的权益得不到保障。 </span>
    </p>
    <p>平台的优质合作企业可按照“自主就业”的方式与您建立<span class="highlight">规范的劳动关系</span>，并由专业人事顾问为您<span class="highlight">办理工资、个税、社保、公积金等全面的服务</span>。从而帮您在一个城市保持连续的工作履历和社保、工资、个税记录，享受应有的社会福利。
    </p>
    <p class="">2020年7月5日，北京市人社局已升级了社保申报系统，给员工参保时必须注明员工类型，签有劳动合同，对员工做社保减员时，需声明员工离职原因。</p>
    <p class="highlight">
                <span> 这些政策和措施意味着： </span>
                <span class="text-bold">单纯的社保代缴不再符合政策要求，你若通过不规范的服务单位代缴社保，可能会导致您的权益得不到保障。</span>
    </p>
    <p class="">通过深入研究，为积极响应政策要求，同时充分保障您的合法权益，我们快速推出了“自主就业”解决方案，以合规方式为您提供更全面的专业服务。</p>
    <p class="text-bold text-green offset-top offset-bottom highlight">1. 政策合规的核心在于：您需要在一家京籍公司任职。</p>
    <p class="text-offset">因此，第一步平台会推荐您与一家优质的合作企业建立合法合规的劳动关系，通过电子签约方式签订劳动合同。</p>
    <p class="text-bold text-green offset-top offset-bottom highlight">2. 您入职该公司的工作方式是“个人网络承包经营”</p>
    <p class="text-offset">
                您与公司签订《自主就业协议》，承包经营产生收入（如有）扣除少量税费管理费后由您来支配！这是政府倡导的“自主就业”方式之一。您可以理解为，您成为了一个挂靠到一个正规公司下的自由职业者，您可以从事您喜欢的工作，公司为您遮风挡雨，解除后顾之忧。（关于“个人网络承包经营”的工作方式，平台后续会提供详细的说明文件，敬请关注。
    </p>
    <p class="text-bold text-green offset-top offset-bottom highlight">3. 承包经营中发生的费用支出由承包人来承担</p>
    <p class="text-offset">承包经营中发生的费用支出，包括承包人工资、个税、社保、 公积金等由承包人来承担。您需要将相关费用上
                交给签约公司。专业人事服务团队则
                负责为您办理工资发放、社保公积金缴纳、个税申报等事务，并充当您的“专属人事顾问”。</p>
                <p class="offset-top text-bold"> 合法合规，您的权益才有保障！以上事宜非常重要，请您务必仔细阅读，充分理解后做出决定。 </p>
                <a style="color:#1199ff;" href="/asset/doc/agreement.pdf">同意《劳务派遣协议》</a>
    `
  }else{
    xiyiTitle.innerHTML = '劳务派遣'
    xiyiContent.innerHTML = `
    <p>感谢您对平台的支持与信赖。
          </p>
          <p>平台联合您所在城市的优质人力资源服务企业，为您提供<span class="highlight">规范的社保公积金缴纳、工资个税申报及相关人事服务</span>。无论您是自由职业者、个体创业者还是处于就业空档期，连续的社保、公积金缴纳记录对您都非常重要。我们把您的需求放在第一位，以规范、严谨的服务守护您的权益。
          </p><a target="_blank" style="color:#1199ff;" href="/asset/doc/agreement.pdf">同意《劳务派遣协议》</a>
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
  mui.showLoading("查询中","div");
  try{
    const {code,data} = await get(getRandomCompany,{
      city
    });
    mui.hideLoading();
    if(code === 200){
      UserInfos.corpName = data.corpName
      document.getElementById('workAdree').innerHTML = data.corpName
    }
  }catch(e){
    mui.hideLoading();
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
    const {userIdCard,userName} = UserInfos
    if(!userIdCard || userIdCard === 'null' || !userName || userName === 'null'){
      mui.alert('请先补充个人资料','提示','去补充',()=>{
        window.location = `${document.location.protocol}//${window.location.host}/MyInfo/index.html?back=MyServer`
      })
    }
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
          getRandomCompanyFunc();
          return
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
