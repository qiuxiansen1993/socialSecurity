import { get, post } from "../utils/main";
import {
  getUserInfo,
  getTopMessage
} from "../utils/api/personal";
import {
  getUserProperty,
} from "../utils/api/mybalance";
import {
  getUserServiceLimit,
} from "../utils/api/createOrder";
import "./index.scss";
window.__isreload = false
let timer = null
mui(document).on('tap', 'a', function() {
  var a = document.createElement('a');
  a = this.cloneNode(true);
  a.click();
})
const getUserInfoFunc = async()=>{
  const { code,data } = await get(getUserInfo);
  if(code ===200){
    const {userInfo:{userIdCard,userName},user:{headimg}} = data;
    document.getElementById("welcome-to-language").innerHTML='欢迎你，'+userName;
    document.getElementById("userIdCard").innerHTML='身份证：'+userIdCard;
    const headimgDom = document.getElementById("headimg");
    if(headimg){
      headimgDom.src=headimg
    }else{
      headimgDom.style='display:none;'
    }
  }
}
const getUserServiceLimitFunc = async()=>{
  const { code,data } = await get(getUserServiceLimit);
  if(code ===200){
    document.getElementById('serviceLimit').innerHTML = '服务期限：'+data
  }
}
const getUserPropertyFunc = async()=>{
  const { code,data } = await get(getUserProperty);
  if(code ===200){
    const {lwCoin,balance,orderSum} = data
    document.getElementById('lwcion-num').innerHTML = Math.floor(lwCoin * 100) / 100||0;
    document.getElementById('mybalance-num').innerHTML = Math.floor(balance * 100)/100||0;
    document.getElementById('order-sum').innerHTML = Math.floor(orderSum * 100)/100||0;
  }
}
const getTopMessageFunc = async()=>{
  const { code,data } = await get(getTopMessage);
  if(code ===200){
    const topMessage = document.getElementById('topMessage');
    if(!data || data?.length < 1){
      document.querySelector('.content-notice').style="display:none;";
      return
    }
    clearInterval(timer)
    timer = null;
    let timer_num = 0;
    topMessage.innerHTML= data[timer_num]?.mess || ''
    timer = setInterval(()=>{
      if(timer_num === data.length){
        timer_num = 0
      }
      console.log(timer_num)
      topMessage.innerHTML= data[timer_num]?.mess || ''
      timer_num++
    },2000);
    
  }
}
const initGuide = (localStorageTime)=>{
  const localStorageGuideTime = localStorage.getItem("home_guide_show");
  console.log(localStorageGuideTime>localStorageTime)
  if(!localStorageGuideTime || localStorageTime < new Date().getTime()){
    localStorage.setItem("home_guide_show", new Date().getTime()+3600*1000*24*30);//
    const guideContent = document.getElementById('guide-content');
    guideContent.style="display:block;"
    guideContent.addEventListener('tap',function(e){
      guideContent.remove();
    })
  }
  
}
const initProcessAlert = (localStorageTime)=>{
  localStorage.setItem("home_title_show", new Date().getTime()+3600*1000*24*300);//
    mui.alert(`
    <img style="width:270px;margin:0 auto;" src="/asset/doc/liuchengtu.jpeg"/>
    `,'服务流程','我知道了',()=>{
      initGuide(localStorageTime)
    });
}
window.onload = () => {
  if(!window.__isreload){
    window.__isreload = true
  }
  const localStorageTime = localStorage.getItem("home_title_show")
  if(!localStorageTime || localStorageTime < new Date().getTime()){
    initProcessAlert(localStorageTime);
  }else{
    initGuide(localStorageTime);
  }
  
  
  const homeMenu = document.getElementById("home-menu");
  const homeBody = document.getElementById("home-body");
  const contactUser = document.getElementById('contact-user');
  const detailsShare = document.querySelector('.details-share');
  const toMyServer1 = document.getElementById('toMyServer1');
  const toMyServer2 = document.getElementById('toMyServer2');
  const toMyServer3 = document.getElementById('toMyServer3');
  const toPayCost = document.getElementById('toPayCost');
  const SbView = document.getElementById('SbView');
  const GjjView = document.getElementById('GjjView');
  
  toPayCost &&
  toPayCost.addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/MyBalance/index.html`;
    });
  toMyServer1 &&
  toMyServer1.addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/MyServer/index.html`;
  });
  toMyServer2 &&
    toMyServer2.addEventListener("tap", function () {
      window.location = `${document.location.protocol}//${window.location.host}/MyServer/index.html`;
      });
  toMyServer3 &&
  toMyServer3.addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/MyServer/index.html`;
    });
  homeMenu &&
    homeMenu.addEventListener("tap", function (event) {
      //mui(".mui-off-canvas-wrap").offCanvas().toggle();
      mui('.mui-popover').popover('toggle');
      event.stopPropagation()
    });
  homeBody &&
    homeBody.addEventListener("tap", function () {
      //mui(".mui-off-canvas-wrap").offCanvas().close();
      mui('.mui-popover').popover('close');
    });
  [...document.querySelectorAll(".nav-item__click")].map((item) => {
    item.addEventListener("tap", function (e) {
      const _url = this.getAttribute("data-href");
      window.location = `${document.location.protocol}//${window.location.host}${_url}`;
    });
  });
  detailsShare.addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/Marketing/index.html`;
  })
  SbView.addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/sbinfo/querySbData.php?type=sb`;
  })
  GjjView.addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/sbinfo/querySbData.php?type=gjj`;
  })
  getUserInfoFunc()
  getUserPropertyFunc()
  getTopMessageFunc()
  getUserServiceLimitFunc()
  setTimeout(function(){
    new Swiper('.swiper-container',{
      autoplay : 3000,
      })
},300)
};
