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
        if(data?.length>0){
            data.map((item) => {
                const {createDate ,totalMoney,status} = item;
                const _listDom = document.createElement(`LI`)
                _listDom.setAttribute('class','mui-table-view-cell');
                _listDom.innerHTML = `
                <div class="mui-row">
                  <div class="mui-col-sm-4 mui-col-xs-4">
                  ${createDate?format(createDate):'---'}
                  </div>
                  <div class="mui-col-sm-4 mui-col-xs-4">
                  ${totalMoney}
                  </div>
                  <div class="mui-col-sm-4 mui-col-xs-4">
                  ${status === '0' ? '待审核':status === '1'?'审核通过':''}
                  </div>
                </div>
                `;
                viewContainer.appendChild(_listDom);
            })
        }else{
            viewContainer.innerHTML = '<div style="text-align:center;padding:20px;">您还没有提现记录</div>'
        }
        
    }else{
        mui.toast(msg||'请求异常，请稍后重试');
    }
}

getBalanceChangeListFunc();