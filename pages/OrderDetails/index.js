import { get } from "../utils/main";
import { GetRequest } from "../utils/tool";
import {
    viewUserOrderDetail
  } from "../utils/api/orderList";
import './index.scss';
const viewUserOrderDetailFunc = async()=>{
    const {id} = GetRequest('id');
    if(!id)return mui.toast("订单id为空");
    const {code,data} = await get(viewUserOrderDetail,{
        id
    });
    if(code ===200){
        const {} = data;
    }
}
viewUserOrderDetailFunc();