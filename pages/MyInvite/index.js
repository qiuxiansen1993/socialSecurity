import { get, post } from "../utils/main";
import {
  getQrCode,
  invitedUsersStat,
  invitedUsersList,
  updateUserShareType,
} from "../utils/api/myInvite";
import "./index.scss";
const getLocalTime = (nS) => {
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, " ");
};
// 获取邀请二维码
const getQrCodeFunc = async () => {
  try {
    mui.showLoading("正在提交..", "div");
    const { data, code, msg } = await get(getQrCode);
    mui.hideLoading();
    if (code !== 200) {
      mui.toast(msg || "获取失败");
      return;
    }
    const qrEl = document.getElementById("qrcode-img");
    if (qrEl) {
      qrEl.setAttribute(
        "src",
        data || "/asset/imgs/qrCode/1601627106666_.pic.jpg"
      );
    }
  } catch (e) {
    mui.hideLoading();
  }
};
// 获取被邀请用户统计
const invitedUsersStatFunc = async () => {
  const { data, code, msg } = await get(invitedUsersStat);
  if (code !== 200) {
    mui.toast(msg || "获取失败");
    return;
  }
  const el = document.querySelectorAll(".myinvite-item");
  if (el && data) {
    [...el].map((it, index) => {
      const html = `<span>${
        index === 0 ? data.userCount : data.balanceGive
      }</span>
              <h5>${index === 0 ? "邀请的用户数" : "获得返现金额"}</h5>`;
      it.innerHTML = html;
    });
  }
};
// 邀请用户列表
const invitedUsersListFunc = async () => {
  const { data = [], code, msg } = await get(invitedUsersList);
  const el = document.getElementById("invitedUsersList");
  if (code !== 200) {
    mui.toast(msg || "获取失败");
  }
  console.log(data);
  if (el) {
    if (data && data.length > 0) {
      el.innerHTML = [
        '<li class="mui-table-view-cell invitelist-header"><span style="display:inline-block;width:2rem;">昵称</span><span style="margin-left: 20px;">邀请时间</span></li>',
        ...data.map((item) => {
          const { nickname, regTime } = item;
          return `<li class="mui-table-view-cell"><span style="display:inline-block;width:2rem;">${nickname}</span><span style="margin-left: 20px;">${getLocalTime(
            regTime
          )}</span></li>`;
        }),
      ].join("");
    } else {
      el.innerHTML = `<p class="myinvite-empty">你还没有邀请</p>`;
    }
  }
};
const handleRulesEvent = () => {
  document.getElementById("rules").addEventListener("tap", function () {
    mui.alert(
      `
        1.活动时间：<b>2021.8.29 - 2021.9.30</b>
        2.活动期间，您通过自己的二维码邀请的好友成为新用户，您将获得二选一以下奖励：
         &nbsp;&nbsp;a.您可选择“顺延服务期限”，获得新用户所交服务费总月数顺延（基于已经扣费的订单顺延）。
         &nbsp;&nbsp;b.您也可选择“服务费返现”，获得新用户缴纳服务费的30%额度的现金，可在公众号“我的资产——余额”查看返利金额，并发起提现；
        3.本活动禁止任何形式的违法违规操作，否则平台有权取消参与活动并扣除所得。
        <b>长期活动：</b>
        1.买一送一：所有用户首次下单交几个月的服务费，额外再送几个月的服务期限。
        2.合伙人：您通过自己的二维码邀请的好友成为新用户，新用户交服务费成功后您可获得30%服务费的返利；
    `,
      "邀请规则"
    );
  });
};
window.UserCallback = (info) => {
  const {
    userInfo: { userShareType },
  } = info;
  let picker = new mui.PopPicker();
  picker.setData(["顺延服务期限", "服务费返现"]);
  let showUserPickerButton = document.getElementById("reward-way");
  let result = document.getElementById("reward-way-txt");
  result.innerHTML =
    userShareType === "01"
      ? "顺延服务期限"
      : userShareType === "02"
      ? "服务费返现"
      : "顺延服务期限";
  showUserPickerButton.addEventListener(
    "tap",
    function (event) {
      picker.show(async function (items) {
        result.innerText = items[0];
        try {
          mui.showLoading("正在修改..", "div");
          const { data = [], code, msg } = await get(updateUserShareType, {
            userShareType:
              items[0] === "顺延服务期限"
                ? "01"
                : items[0] === "服务费返现"
                ? "02"
                : "",
          });
          mui.hideLoading();
          if (code == 200) {
            mui.toast("修改成功");
            return;
          }
          mui.toast(msg || "获取失败");
        } catch (e) {
          mui.hideLoading();
        }
      });
    },
    false
  );
};
const init = () => {
  handleRulesEvent();
  getQrCodeFunc();
  invitedUsersStatFunc();
  invitedUsersListFunc();
};
init();
