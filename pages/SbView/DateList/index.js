import { get, post } from "../../utils/main";
import {
    getSbDetailDataByMonth,
    getSbDetailDataByYear,
    getSbStartEndMonth,
    getSbBasicInfo,
  } from "../../utils/api/viewTool";
import "./index.scss";
let sliderList = []
const getSbStartEndMonthFunc = async()=>{
    const {code,data} = await get(getSbStartEndMonth);
    if(code === 200){
        const {endMonth,startMonth} = data
        let max = endMonth.split('-')[0]
        let min = startMonth.split('-')[0]
        let slider = []
        for(let i = min;i<max;i++){
            slider.push(`<div class="swiper-slide">${i}</div>`);
            sliderList.push(i)
        }
        mui('.swiper-wrapper')[0].innerHTML = slider.join('');
        regerterSwiper(max-min)
        getSbDetailDataByYearFunc(max)
    }
}
const handleToDetailsEvent = ()=>{
    [...document.querySelectorAll('.toDetails')].forEach((item)=>{
        return item.addEventListener("tap", function (e) {
            let month = e.target.getAttribute('data-month');
            window.location = `${document.location.protocol}//${
        window.location.host
      }/MonthDetail/index.html?month=${month}`;
        })
    })
}
const getSbDetailDataByYearFunc = async(year)=>{
    mui.showLoading("正在提交..","div");
    const {code,data} = await get(getSbDetailDataByYear,{
        year
    });
    mui.hideLoading();
    if(code === 200){
        document.getElementById('data-list').innerHTML = [`
            <div class="mui-row" style="border-bottom: 1px solid #eee;">
            <div class="mui-col-sm-3 mui-col-xs-3">月份</div>
            <div class="mui-col-sm-2 mui-col-xs-2">缴费类型</div>
            <div class="mui-col-sm-2 mui-col-xs-2">养老</div>
            <div class="mui-col-sm-2 mui-col-xs-2">医疗</div>
            <div class="mui-col-sm-2 mui-col-xs-2">失业</div>
            <div class="mui-col-sm-1 mui-col-xs-1"></div>
        </div>`,...data.map((item)=>{
            const {month,type,yanglao,yiliao,shiye} = item
            return `
            <div class="mui-row">
                <div class="mui-col-sm-3 mui-col-xs-3">${month || '-'}</div>
                <div class="mui-col-sm-2 mui-col-xs-2">${type || '-'}</div>
                <div class="mui-col-sm-2 mui-col-xs-2">${yanglao || '-'}</div>
                <div class="mui-col-sm-2 mui-col-xs-2">${yiliao || '-'}</div>
                <div class="mui-col-sm-2 mui-col-xs-2">${shiye || '-'}</div>
                <div class="mui-col-sm-1 mui-col-xs-1"><i class="mui-icon mui-icon-arrowright toDetails" data-month="${month}" style="font-size:12px;" class="mui-icon mui-icon-arrowright"></i></div>
            </div>
            `
        })].join('');  
        handleToDetailsEvent()
    }else{
        document.getElementById('data-list').innerHTML = '<div style="text-align:center;">无数据</div>'
    }
}
const init = ()=>{
    getSbStartEndMonthFunc();
}
const regerterSwiper = (max)=>{
    new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: max||0,
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        },
        onTransitionEnd: function(swiper,event){
            console.log(swiper.activeIndex)
            getSbDetailDataByYearFunc(sliderList[swiper.activeIndex])
          }
    });
}
init()
