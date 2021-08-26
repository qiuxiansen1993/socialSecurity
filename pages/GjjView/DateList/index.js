import { get, post } from "../../utils/main";
import {
    getGjjDetailDataByYear,
    getGjjStatDataByYear,
  } from "../../utils/api/viewTool";
import "./index.scss";
let sliderList = []
const getGjjStatDataByYearFunc = async()=>{
    const {code,data} = await get(getGjjStatDataByYear);
    if(code === 200){
        const dataArr = data.sort((a,b)=>a.year - b.year)
        sliderList = dataArr
        let slider = dataArr.map((item)=>`<div class="swiper-slide">${item.year},缴存:${item.increase},提取:${item.decrease}</div>`)
        mui('.swiper-wrapper')[0].innerHTML = slider.join('');
        regerterSwiper(dataArr.length-1)
        getGjjDetailDataByYearFunc(sliderList[dataArr.length-1]?.year)
    }
}

const getGjjDetailDataByYearFunc = async(year)=>{
    mui.showLoading("正在提交..","div");
    const {code,data} = await get(getGjjDetailDataByYear,{
        year
    });
    mui.hideLoading();
    if(code === 200){
        document.getElementById('data-list').innerHTML = data.map((item)=>{
            const {month,recordTime,increaseMoney,companyName,accountName,type,operatePlatform,decreaseMoney} = item
            return `
            <ul class="mui-table-view"> 
                <li class="mui-table-view-cell mui-collapse">
                    <a class="mui-navigate-right" href="#">${recordTime}，增加${increaseMoney}元，减少：${decreaseMoney}元</a>
                    <div class="mui-collapse-content">
                        <p>缴费单位：${companyName}</p>
                        <p>缴费类型：${type}</p>
                    </div>
                </li>
            </ul>
            `
        }).join('')
    }else{
        document.getElementById('data-list').innerHTML = '<div style="text-align:center;">无数据</div>'
    }
}
const init = ()=>{
    getGjjStatDataByYearFunc();
}
const regerterSwiper = (i)=>{
    new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: i || 0,
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        },
        onTransitionEnd: function(swiper,event){
            console.log(swiper.activeIndex,sliderList)
            getGjjDetailDataByYearFunc(sliderList[swiper.activeIndex]?.year)
          }
    });
}
init()
