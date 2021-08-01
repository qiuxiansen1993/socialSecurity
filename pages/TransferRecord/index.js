import { post,get } from "../utils/main";
import {
    getBankOrderList
  } from "../utils/api/transferNotice";
  import { format } from '../utils/tool'
import './index.scss';
let PageIdx = 0
const viewContainer = document.querySelector('.mui-table-view');
const getBankOrderListFunc = async(page = 0)=>{
    const {code,data = [],msg} = await get(getBankOrderList,{
        page,
        pageSize:10
    });
    if(code ===200){
        const { recordCount,pageNum,pageSize,resList } = data
        resList.map((item) => {
            const {transferTime ,transferBank,transferMoney,tranferMan} = item;
            const _listDom = document.createElement(`LI`)
            _listDom.setAttribute('class','mui-table-view-cell');
            _listDom.innerHTML = `<span class="span_width">时间：${transferTime?format(transferTime):'---'}</span>  <span class="span_width">汇款人：${tranferMan}</span><span class="span_width">银行：${transferBank}</span>  <span class="span_width">金额：${transferMoney}</span>`;
            viewContainer.appendChild(_listDom);
        })
        PageIdx = pageNum;
        if(pageNum*pageSize >= recordCount){
            mui('#recordLoad').pullRefresh().disablePullupToRefresh();
        }
        if(recordCount < 1){
            viewContainer.innerHTML = '<li style="text-align:center;padding:20px;">您还没有订单</li>'
        }
    }else{
        mui.toast(msg||'请求异常，请稍后重试');
    }
}

mui.init({
    pullRefresh : {
      container:'#recordLoad',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
      up : {
        height:50,//可选.默认50.触发上拉加载拖动距离
        auto:false,//可选,默认false.自动上拉加载一次
        contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback :()=>{
            getBankOrderListFunc(PageIdx+1);
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
});

getBankOrderListFunc();