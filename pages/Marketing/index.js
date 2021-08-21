import { get, post } from "../utils/main";
import { recommandPic } from "../utils/api/marketing";
import './index.scss';
const getLocalTime = (nS) =>{     
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');     
 }
// 获取邀请二维码
const recommandPicFunc = async()=>{
    try{
        mui.showLoading("正在提交..","div");
        const { data,code,msg } = await get(recommandPic);
        mui.hideLoading();
        if(code !== 200){
            mui.toast(msg || "获取失败");
            return
        }
        const qrEl=document.getElementById('qrcode-img');
        if(qrEl){
            for(var i=0;i<data.length;i++){

            }
            //qrEl.setAttribute('src',data || '/asset/imgs/qrCode/1601627106666_.pic.jpg')
        }
    }catch(e){
        mui.hideLoading();
    }
}

const init = ()=>{
    recommandPicFunc()
}
init()