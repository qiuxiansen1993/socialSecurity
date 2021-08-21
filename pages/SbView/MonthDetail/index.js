import { get, post } from "../../utils/main";
import { GetRequest } from "../../utils/tool";
import {
    getSbDetailDataByMonth,
  } from "../../utils/api/viewTool";
import './index.scss';
const dataMonth = document.getElementById('data-month');
const companyNameDom = document.getElementById('companyName');
const monthDom = document.getElementById('month');
const { month } = GetRequest();
const getSbDetailDataByMonthFunc = async()=>{
    const {code,data} = await get(getSbDetailDataByMonth,{
        month
    })
    if(code === 200){
        const {yiliaoDetail,yanglaoDetail,gongshangDetail,shiyeDetail,month,companyName} = data
        companyNameDom.innerHTML = companyName || '-';
        monthDom.innerHTML = month || '-';
        dataMonth.innerHTML = [`
        <div class="mui-row" style="border-bottom: 1px solid #eee;">
            <div class="mui-col-sm-3 mui-col-xs-3">项目</div>
            <div class="mui-col-sm-3 mui-col-xs-3">基数</div>
            <div class="mui-col-sm-3 mui-col-xs-3">公司</div>
            <div class="mui-col-sm-3 mui-col-xs-3">个人</div>
        </div>
        `,`<div class="mui-row" style="border-bottom: 1px solid #eee;">
                <div class="mui-col-sm-3 mui-col-xs-3">养老</div>
                <div class="mui-col-sm-3 mui-col-xs-3">${yanglaoDetail.base || '-'}</div>
                <div class="mui-col-sm-3 mui-col-xs-3">${yanglaoDetail.grjf|| '-'}</div>
                <div class="mui-col-sm-3 mui-col-xs-3">${yanglaoDetail.dwjf|| '-'}</div>
            </div>`
            ,`<div class="mui-row" style="border-bottom: 1px solid #eee;">
            <div class="mui-col-sm-3 mui-col-xs-3">医疗</div>
            <div class="mui-col-sm-3 mui-col-xs-3">${yiliaoDetail.base|| '-'}</div>
            <div class="mui-col-sm-3 mui-col-xs-3">${yiliaoDetail.grjf|| '-'}</div>
            <div class="mui-col-sm-3 mui-col-xs-3">${yiliaoDetail.dwjf|| '-'}</div>
        </div>`
        ,`<div class="mui-row" style="border-bottom: 1px solid #eee;">
                <div class="mui-col-sm-3 mui-col-xs-3">工商</div>
                <div class="mui-col-sm-3 mui-col-xs-3">${gongshangDetail.base|| '-'}</div>
                <div class="mui-col-sm-3 mui-col-xs-3">${gongshangDetail.grjf|| '-'}</div>
                <div class="mui-col-sm-3 mui-col-xs-3">${gongshangDetail.dwjf|| '-'}</div>
            </div>`,
            ,`<div class="mui-row" style="border-bottom: 1px solid #eee;">
            <div class="mui-col-sm-3 mui-col-xs-3">失业</div>
            <div class="mui-col-sm-3 mui-col-xs-3">${shiyeDetail.base|| '-'}</div>
            <div class="mui-col-sm-3 mui-col-xs-3">${shiyeDetail.grjf|| '-'}</div>
            <div class="mui-col-sm-3 mui-col-xs-3">${shiyeDetail.dwjf|| '-'}</div>
        </div>`
        ].join('')
    }else{
        dataMonth.innerHTML = `<div class="mui-row" style="border-bottom: 1px solid #eee;">
        <div class="mui-col-sm-3 mui-col-xs-3">项目</div>
        <div class="mui-col-sm-3 mui-col-xs-3">基数</div>
        <div class="mui-col-sm-3 mui-col-xs-3">公司</div>
        <div class="mui-col-sm-3 mui-col-xs-3">个人</div>
    </div><div style="text-align:center;margin-top:20px;">暂无数据</div>`
    }
}

const init = ()=>{
    getSbDetailDataByMonthFunc()
}
init()