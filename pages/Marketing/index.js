import { get, post } from "../utils/main";
import { recommandPic } from "../utils/api/marketing";
import "./index.scss";
const getLocalTime = (nS) => {
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, " ");
};
const swiperWrapper = document.querySelector(".swiper-wrapper");
// 获取邀请二维码
const recommandPicFunc = async () => {
  try {
    mui.showLoading("正在提交..", "div");
    const { data, code, msg } = await get(recommandPic);
    mui.hideLoading();
    if (code !== 200) {
      mui.toast(msg || "获取失败");
      return;
    }
    swiperWrapper.innerHTML = data
      .map((item, index) => {
        return `<div class="swiper-slide"><img class="slide-img" src="${item}" alt=""></div>`;
      })
      .join("");
      registerSwiper(data);
  } catch (e) {
    mui.hideLoading();
  }
};
const registerSwiper = (data) => {
  new Swiper(".swiper-container", {
    slidesPerView: "auto",
    paginationClickable: true,
    pagination: ".swiper-pagination",
    paginationBulletRender: function (swiper, index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
    }
  });
};
const init = () => {
  recommandPicFunc();
  
};

init();
