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
        <div>
            缴费月份: ${month}
            <br/>
            社保金额: ${sbMoney}
            <br/>
            公积金金额: ${fund}
            <br/>
            工资金额: ${salaryTax}
            <br/>
            状态：${status === '0'?'待审核':status === '1'?'已审核':'已拒绝'}
        </div>
        `
    }).join('');
  }
};
viewUserOrderDetailFunc();

