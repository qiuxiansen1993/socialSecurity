import { get, post } from "../utils/main";
import { getQrCode,invitedUsersStat,invitedUsersList } from "../utils/api/myInvite";
import './index.scss';
// 获取邀请二维码
const getQrCodeFunc = async()=>{
    const { data = [],code,msg } = await get(getQrCode);
    if(code !== 0){
        mui.toast(msg || "获取失败");
        return
    }
    const qrEl=document.getElementById('qrcode-img');
    if(qrEl){
        qrEl.setAttribute('src',data || '/asset/imgs/qrCode/1601627106666_.pic.jpg')
    }
}
// 获取被邀请用户统计
const invitedUsersStatFunc = async()=>{
    const { data = [],code,msg } = await get(invitedUsersStat);
    if(code !== 0){
        mui.toast(msg || "获取失败");
        return
    }
    const el = document.querySelectorAll('.myinvite-item');
    if(el){
        [...el].map((it,index)=>{
            const html = `<span>${index === 0 ? data.userCount : data.balanceGive}</span>
              <h5>邀请的用户数</h5>`;
              it.innerHTML = html
        })
    }
    
}
// 邀请用户列表
const invitedUsersListFunc = async()=>{
    const { data = [],code,msg } = await get(invitedUsersList);
    const el = document.getElementById('invitedUsersList');
    if(code !== 0){
        mui.toast(msg || "获取失败");
    }
    if(el){
        if(data.length>0){
            el.innerHTML = data.map((item)=>{
                const { userId,nickName,inviteDate } = item;
                return `<li class="mui-table-view-cell"><span>${nickName}</span><span style="margin-left: 10px;">${inviteDate}</span></li>`
            });
        }else{
            el.innerHTML = `<p class="myinvite-empty">你还没有邀请</p>`
        }
        
    }
}
const init = ()=>{
    getQrCodeFunc()
    invitedUsersStatFunc()
    invitedUsersListFunc()
}
init()