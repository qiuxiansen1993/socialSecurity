import { get } from "../utils/main";
import {
    getBalanceChangeList
  } from "../utils/api/balanceChange";
  import { format } from '../utils/tool'
import './index.scss';
const viewContainer = document.querySelector('.mui-table-view');
const getBalanceChangeListFunc = async()=>{
    const {code,data = [],msg} = await get(getBalanceChangeList);
    if(code ===200){
        data.map((item) => {
            const {createDate ,totalMoney,status} = item;
            const _listDom = document.createElement(`LI`)
            _listDom.setAttribute('class','mui-table-view-cell');
            _listDom.innerHTML = `时间：${createDate?format(createDate):'---'} | 金额：${totalMoney} | 状态：${status === '0' ? '待审核':status === '1'?'审核通过':''}`;
            viewContainer.appendChild(_listDom);
        })
    }else{
        mui.toast(msg||'请求异常，请稍后重试');
    }
}

getBalanceChangeListFunc();