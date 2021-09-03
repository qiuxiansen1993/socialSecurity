import { get, post } from "../utils/main";
import {
    getUserOrderList,
    viewUserOrderDetail,
    cancelUserOrder
  } from "../utils/api/orderList";
  import { format } from '../utils/tool'
import './index.scss';

let PageIdx = 0
const setEndMonth= (startMonth,duration)=>{
    let year = Number(startMonth.slice(0,4))
    let month = Number(startMonth.slice(4))
    for(let i = 0;i<duration-1;i++){
        if(month >= 12){
            year+=1
            month = 1
        }else{
            month+=1
        }
    }
    return [year,(month<10?'0'+month:month)].join('')
}
const viewContainer = document.querySelector('.mui-table-view');
const getUserOrderListFunc = async(page = 0)=>{
    const {code,data = [],msg} = await get(getUserOrderList,{
        page,
        pageSize:10
    });
    if(code ===200){
        const { recordCount,pageNum,pageSize,resList } = data
        resList.map((item) => {
            const {createTime = '',status,startMonth,duration} = item;
            const _listDom = document.createElement(`LI`)
            _listDom.setAttribute('class','mui-table-view-cell');
            _listDom.innerHTML = `
            <div class="mui-row">
                <div class="mui-col-sm-3 mui-col-xs-3">
                ${format(createTime)}
                </div>
                <div class="mui-col-sm-6 mui-col-xs-6">
                ${startMonth}-${setEndMonth(startMonth,duration)}
                </div>
                <div class="mui-col-sm-3 mui-col-xs-3">
                ${status === '0' ?'<span data-id='+item.id+' class="handle-btn">取消订单</span>':status === '1' ?'':'' }
                </div>
                </div> 
                <div class="item-otherinfo">
                    <div>服务费：￥${item.fee}</div>
                    <div>城市信息：${item.cityName || '-'}</div>
                    <div>公司信息：${item.companyName || '-'}</div>
                    <div>是否缴纳社保：${item.includeSb == 1?'是':'否'}</div>
                    <div>是否缴纳公积金：${item.includeGjj == 1?'是':'否'}</div>
                    <div>是否代发工资：${item.includeSalary == 1?'是':'否'}</div>
                    <div>是否新缴纳社保：${item.baseSalary == 1?'是':'否'}</div>
                    <div>是否新缴纳公积金：${item.baseSalary == 1?'是':'否'}</div>
                    <div>基本工资：${item.baseSalary == 1?'是':'否'}</div>
                    <img src="${status === '0'?'/asset/imgs/shenheing.png':'/asset/imgs/shenhesuc.png'}" class="shenheState"></i>
                    <span class="to-search mui-icon mui-icon-search">详情</span>
            </div>    
               `;
            viewContainer.appendChild(_listDom);
            _listDom.addEventListener("tap", function (e) {
                window.location = `${document.location.protocol}//${window.location.host}/PayDetails/index.html?id=${item.id}`;
            })
        })
        addEventCanle()
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
const addEventCanle = ()=>{
    [...document.querySelectorAll('.handle-btn')].forEach((item)=>{
        item.addEventListener("tap", function (e) {
            mui.confirm('是否取消订单','提示',['取消','确认'],(e)=>{
                if(e.index == 1){
                    cancelUserOrderFunc(this.getAttribute('data-id'))
                }
            })
            e.stopPropagation()
        })
    })
}
const cancelUserOrderFunc = async(id)=>{
    const {code,data,msg} = await post(cancelUserOrder,{
        id
    });
    if(code === 200){
        mui.toast('取消成功~');
        viewContainer.innerHTML = ''
        getUserOrderListFunc(0)
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
            getUserOrderListFunc(PageIdx+1);
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
});

getUserOrderListFunc();