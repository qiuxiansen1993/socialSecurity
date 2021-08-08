import { get, post } from "../utils/main";
import {
  getUserProperty,
  getBalanceList,
  getLwCoinList,
} from "../utils/api/mybalance";
import "./index.scss";
let balanceNum = 1;
let lwCoinNum = 1;
let isBalanceRecord = true
const orderTypeMap = {
  '01':'银行汇款',
  '02':'在线微信付款',
  '03':'缴费扣款',
  '04':'邀请好友返现',
  '05':'管理员手动调整',
  '06':'余额提现',
}
const getLocalTime = (nS) =>{    
  console.log(new Date(parseInt(nS))) 
    return new Date(parseInt(nS)).toLocaleString().split(' ')[0]//.replace(/:\d{1,2}$/,' ');     
 }
const viewContainer = document.querySelector('.mui-table-view');
 const renderBalance = (resList)=>{
      resList.map((item) => {
        const _listDom = document.createElement(`LI`)
        _listDom.setAttribute('class','mui-table-view-cell');
        _listDom.innerHTML = `
        <div class="mui-row">
                <div class="mui-col-sm-4 mui-col-xs-4">
                ${getLocalTime(item.orderDate)}
                </div>
                <div class="mui-col-sm-4 mui-col-xs-4" style="border-left: 1px solid #fff;border-right: 1px solid #fff;">
                ${orderTypeMap[item.orderType]}
                </div>
                <div class="mui-col-sm-4 mui-col-xs-4">
                充值 ${(item.orderBalance || item.orderLwCoin)}
                </div>
              </div>`;
        viewContainer.appendChild(_listDom);
    })
 }
 // 结束下拉刷新
const endPullRefresh = ()=>{
  mui('#recordLoad').pullRefresh().endPullupToRefresh(false);
}
const getBalanceListFunc = async(page)=>{
    const { data,code,msg } = await get(getBalanceList,{
      page,
        pageSize:10
    });
    if(code !== 200){
        mui.toast(msg || "获取失败");
        return
    }
    const {pageSize,pageNum,recordCount,resList} = data;
    balanceNum = pageNum;
    if(pageNum*pageSize >= recordCount){
      mui('#recordLoad').pullRefresh().disablePullupToRefresh();
    }
    if(!recordCount || recordCount < 1){
      viewContainer.innerHTML = '<li style="text-align:center;padding:20px;">您还没有订单</li>'
    }else{
      renderBalance(resList)
      endPullRefresh()
    }
}
const getLwCoinDetailFunc = async(page)=>{
    const { data,code,msg } = await get(getLwCoinList,{
      page,
      pageSize:10
    });
    if(code !== 200){
        mui.toast(msg || "获取失败");
        return
    }
    const {pageSize,pageNum,recordCount,resList} = data;
    lwCoinNum = pageNum;
    if(pageNum*pageSize >= recordCount){
      mui('#recordLoad').pullRefresh().disablePullupToRefresh();
    }
    if(!recordCount || recordCount < 1){
      viewContainer.innerHTML = '<li style="text-align:center;padding:20px;">您还没有订单</li>'
    }else{
      renderBalance(resList)
      endPullRefresh()
    }
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
        isBalanceRecord?getBalanceListFunc(balanceNum+1):getLwCoinDetailFunc(lwCoinNum+1);
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
    viewContainer.innerHTML = ''
    if (event.detail.isActive) {
      lwCoinNum = 1;// 初始化请求下标
      getLwCoinDetailFunc(lwCoinNum);
      isBalanceRecord = false // 切换记录
    } else {
      balanceNum = 1;
      getBalanceListFunc(balanceNum)
      isBalanceRecord = true
    }
  });
const init =()=>{
    getBalanceListFunc(balanceNum);
    getUserPropertyfunc();
}
init()