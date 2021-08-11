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
        const {month,sbMoney,fund,salaryTax,status,payOrderId} = item
        return `
        <div class="mui-card" style="width: 90%;margin: 5% auto;">
        <div class="mui-card-header mui-card-media">
          <img src="/asset/imgs/zichan.png">
          <div class="mui-media-body">
            订单ID:${payOrderId}
            <p>缴费月份: ${month}</p>
          </div>
        </div>
        <div class="mui-card-content">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell">社保金额: ${sbMoney}元</li>
          <li class="mui-table-view-cell">公积金金额: ${fund}元</li>
          <li class="mui-table-view-cell">工资金额: ${salaryTax}元</li>
          <li class="mui-table-view-cell">状态：${status === '0'?'待审核':status === '1'?'已审核':'已拒绝'}</li>
        </ul>
        </div>
      </div>
        
        `
    }).join('');
  }
};
viewUserOrderDetailFunc();

