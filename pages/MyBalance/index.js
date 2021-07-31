import { get, post } from "../utils/main";
import {
  getUserProperty,
  getBalanceList,
  getLwCoinList,
} from "../utils/api/mybalance";
import "./index.scss";
const getLocalTime = (nS) =>{     
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');     
 }
 const renderBalance = (resList)=>{
    document.querySelector(".mui-table-view").innerHTML = resList.map((item) => {
        return `<li class="mui-table-view-cell">
        <span>${item.orderType}: </span>
        <span>${getLocalTime(item.orderDate)}</span>
        <span>充值 ${(item.orderBalance || item.orderLwCoin)}</span>
        </li>`;
      })
      .join("");
 }
const getBalanceListFunc = async()=>{
    const { data:{resList},code,msg } = await get(getBalanceList);
    if(code !== 200){
        mui.toast(msg || "获取失败");
        return
    }
    renderBalance(resList)
}
const getLwCoinDetailFunc = async()=>{
    const { data:{resList},code,msg } = await get(getLwCoinList);
    if(code !== 200){
        mui.toast(msg || "获取失败");
        return
    }
    renderBalance(resList)
}
const getUserPropertyfunc = async()=>{
    const { data:{balance,lwCoin},code,msg } = await get(getUserProperty);
    if(code !== 200){
        return
    }
    document.getElementById('lwcion-num').innerHTML = Math.floor(lwCoin * 100) / 100||0;
    document.getElementById('mybalance-num').innerHTML = Math.floor(balance * 100)/100||0;
    
}
mui.init({
  pullRefresh: {
    container: "#recordLoad", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
    up: {
      height: 50, //可选.默认50.触发上拉加载拖动距离
      auto: false, //可选,默认false.自动上拉加载一次
      contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
      contentnomore: "没有更多数据了", //可选，请求完毕若没有更多数据时显示的提醒内容；
      callback: () => {
        console.log("中");
      }, //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    },
  },
});
document.getElementById('withdrawal').addEventListener("tap", async function () {
  window.location=`${document.location.protocol}//${window.location.host}/Withdrawal/index.html`;
})
document.getElementById('top-up').addEventListener("tap", async function () {
  window.location=`${document.location.protocol}//${window.location.host}/PayList/index.html`;
})
// 监听开关
document
  .getElementById("mybalance-switch")
  .addEventListener("toggle", function (event) {
    if (event.detail.isActive) {
      console.log("你启动了开关");
      getLwCoinDetailFunc()
    } else {
      console.log("你关闭了开关");
      getBalanceListFunc()
    }
  });
const init =()=>{
    getBalanceListFunc();
    getUserPropertyfunc();
}
init()