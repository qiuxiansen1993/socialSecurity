import { get, post } from "../utils/main";
import { viewUserOrderDetail } from "../utils/api/orderList";
import { GetRequest } from "../utils/tool";
import './index.scss';
const viewUserOrderDetailFunc = async () => {
    const { id } = GetRequest();
  const { code, data } = await get(viewUserOrderDetail,{
      id
  });
  if(code === 200){
      const {detailList} = data
    document.getElementById("pay-details-container").innerHTML = detailList.map((item)=>{
        const {month,sbMoney,fund,salaryTax,status} = item
        return `
        <ul class="mui-table-view">
            <li class="mui-table-view-cell" style="background-color: #1199FF;color:#fff;">缴费月份: ${month}</li>
            <li class="mui-table-view-cell">社保金额: ${sbMoney}元</li>
            <li class="mui-table-view-cell">公积金金额: ${fund}元</li>
            <li class="mui-table-view-cell">工资金额: ${salaryTax}元</li>
            <li class="mui-table-view-cell">状态：${status === '0'?'待审核':status === '1'?'已审核':'已拒绝'}</li>
        </ul>
        `
    }).join('');
  }
};
viewUserOrderDetailFunc();

