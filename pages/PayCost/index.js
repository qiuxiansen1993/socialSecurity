import "../utils/main"
import './index.scss';
let json = [
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
    '线上支付订单：2019-01-10 14:15:20',
]
document.querySelector('.mui-table-view').innerHTML= json.map((item)=>{
    return `<li class="mui-table-view-cell">${item}</li>`
}).join('');
mui.init({
    pullRefresh : {
      container:'#recordLoad',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
      up : {
        height:50,//可选.默认50.触发上拉加载拖动距离
        auto:false,//可选,默认false.自动上拉加载一次
        contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback :()=>{
            console.log('中')
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
});
if(json.length<=10){
    mui('#recordLoad').pullRefresh().disablePullupToRefresh();
}
document.querySelector('.paycost-nav').addEventListener('click',(e)=>{
    const el = e.target;
    console.log(el)
    if(el.tagName === 'SPAN'){
        [...document.querySelectorAll('.paycost-nav>span')].forEach((item)=>{
            item.setAttribute('class','')
        })
        el.setAttribute('class','paycost-nav_active')
    }
    
},false)