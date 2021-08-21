import { get, post } from "../utils/main";
import {
  getUserInfo,
  getTopMessage
} from "../utils/api/personal";
import {
  getUserProperty,
} from "../utils/api/mybalance";
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
window.onload = () => {
  if(!window.__isreload){
    window.__isreload = true
  }
  const homeMenu = document.getElementById("home-menu");
  const homeBody = document.getElementById("home-body");
  const contactUser = document.getElementById('contact-user');
  const detailsShare = document.querySelector('.details-share');
  const toMyServer = document.getElementById('toMyServer');
  const toPayCost = document.getElementById('toPayCost');
  const SbView = document.getElementById('SbView');
  const GjjView = document.getElementById('GjjView');
  
  toPayCost &&
  toPayCost.addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/MyBalance/index.html`;
    });
  toMyServer &&
  toMyServer.addEventListener("tap", function () {
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
    window.location = `${document.location.protocol}//${window.location.host}/MyInvite/index.html`;
  })
  SbView.addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/SbView/index.html`;
  })
  GjjView.addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/GjjView/index.html`;
  })
  getUserInfoFunc()
  getUserPropertyFunc()
  getTopMessageFunc()
  setTimeout(function(){
    var gallery = mui('.mui-slider');
    gallery.slider({
         isAuto:true,
         interval:1800//自动轮播周期，若为0则不自动播放，默认为0；
    });
},300)
};
