import { get, post } from "../utils/main";
import { getQrCode,invitedUsersStat,invitedUsersList } from "../utils/api/myInvite";
import './index.scss';
const getLocalTime = (nS) =>{     
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');     
 }
// 获取邀请二维码
const getQrCodeFunc = async()=>{
    try{
        mui.showLoading("正在提交..","div");
        const { data,code,msg } = await get(getQrCode);
        mui.hideLoading();
        if(code !== 200){
            mui.toast(msg || "获取失败");
            return
        }
        const qrEl=document.getElementById('qrcode-img');
        if(qrEl){
            qrEl.setAttribute('src',data || '/asset/imgs/qrCode/1601627106666_.pic.jpg')
        }
    }catch(e){
        mui.hideLoading();
    }
}
// 获取被邀请用户统计
const invitedUsersStatFunc = async()=>{
    const { data,code,msg } = await get(invitedUsersStat);
    if(code !== 200){
        mui.toast(msg || "获取失败");
        return
    }
    const el = document.querySelectorAll('.myinvite-item');
    if(el && data){
        [...el].map((it,index)=>{
            const html = `<span>${index === 0 ? data.userCount : data.balanceGive}</span>
              <h5>${index === 0 ?'邀请的用户数':'获得返现金额'}</h5>`;
              it.innerHTML = html
        })
    }
    
}
// 邀请用户列表
const invitedUsersListFunc = async()=>{
    const { data = [],code,msg } = await get(invitedUsersList);
    const el = document.getElementById('invitedUsersList');
    if(code !== 200){
        mui.toast(msg || "获取失败");
    }
    console.log(data)
    if(el){
        if(data && data.length>0){
            el.innerHTML = ['<li class="mui-table-view-cell invitelist-header"><span style="display:inline-block;width:2rem;">昵称</span><span style="margin-left: 20px;">邀请时间</span></li>',...data.map((item)=>{
                const { nickname,regTime } = item;
                return `<li class="mui-table-view-cell"><span style="display:inline-block;width:2rem;">${nickname}</span><span style="margin-left: 20px;">${getLocalTime(regTime)}</span></li>`
            })].join('');
        }else{
            el.innerHTML = `<p class="myinvite-empty">你还没有邀请</p>`
        }
        
    }
}
const handleRulesEvent =()=>{
    document.getElementById("rules").addEventListener("tap", function () {
        mui.alert(`
      规则如下：11111
    `,'邀请规则');
      });
}
const init = ()=>{
    handleRulesEvent()
    getQrCodeFunc()
    invitedUsersStatFunc()
    invitedUsersListFunc()
}
init()