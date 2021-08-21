import { get, post } from "../../utils/main";
import {
    getSbDetailDataByMonth,
    getSbDetailDataByYear,
    getSbStartEndMonth,
    getSbBasicInfo,
  } from "../../utils/api/viewTool";
import "./index.scss";

const init = ()=>{
    new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 0,
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        }
    });
}
init()
