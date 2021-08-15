import OriginAxios from 'axios';
import Qs from 'qs'
import {
  getUserInfo,
} from "../utils/api/personal";
// import './rem';
import './main.css';

const axios = OriginAxios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

export function get(url, data = {}) {
  return axios.get(url, {
    params: data,
  });
}

// By default, axios serializes JavaScript objects to JSON
export function post(url, data = {}) {
  return axios({
    url,
    method: 'post',
    data:Qs.stringify(data),
  });
}

// Add a request interceptor
axios.interceptors.request.use(
  function config(config) {
    // Do something before request is sent
    return config;
  },
  function error(error) {
    // Do something with request error
    mui.toast("请求异常");
    return Promise.reject(error);
  },
);
axios.defaults.withCredentials = true; //配置为true
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    // if (res.data && res.data.code !== 0) {
    //   let errorMsg = res.data.msg;
    //   return Promise.reject(errorMsg);
    // }
    return res.data;
  },
  error =>{
    mui.toast("请求异常");
    return {}
  }
);
const _nav = document.querySelector('.nav-bar-handle');
_nav && _nav.addEventListener("tap", function (e) {
  const classNames = e.target.getAttribute('class');
  console.log(classNames)
  if(classNames.indexOf('mui-icon-home')>0){
    window.location = `${document.location.protocol}//${window.location.host}${'/Home/index.html'}`;
  }else{
    window.history.back(); 
  }
  
});
export default axios;
/**是否处于开发模式 */    
const IS_DEV = window.NODE_ENV !== 'production';
// if(IS_DEV){
//   require('../../mock/mocker')
// }
const check = async()=>{
  const {code} = await get(getUserInfo);
  const pathname = window.location.pathname;
  if(code === 402 && pathname.indexOf('/Login')<0){
    window.location = `${document.location.protocol}//${window.location.host}/Login/index.html`;
    return
  }
}
check();
//扩展mui.showLoading  
(function($, window) {  
  //显示加载框  
  $.showLoading = function(message,type) {  
      if ($.os.plus && type !== 'div') {  
          $.plusReady(function() {  
              plus.nativeUI.showWaiting(message);  
          });  
      } else {  
          var html = '';  
          html += '<i class="mui-spinner mui-spinner-white"></i>';  
          html += '<p class="text">' + (message || "数据加载中") + '</p>';  

          //遮罩层  
          var mask=document.getElementsByClassName("mui-show-loading-mask");  
          if(mask.length==0){  
              mask = document.createElement('div');  
              mask.classList.add("mui-show-loading-mask");  
              document.body.appendChild(mask);  
              mask.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});  
          }else{  
              mask[0].classList.remove("mui-show-loading-mask-hidden");  
          }  
          //加载框  
          var toast=document.getElementsByClassName("mui-show-loading");  
          if(toast.length==0){  
              toast = document.createElement('div');  
              toast.classList.add("mui-show-loading");  
              toast.classList.add('loading-visible');  
              document.body.appendChild(toast);  
              toast.innerHTML = html;  
              toast.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});  
          }else{  
              toast[0].innerHTML = html;  
              toast[0].classList.add("loading-visible");  
          }  
      }     
  };  

  //隐藏加载框  
    $.hideLoading = function(callback) {  
      if ($.os.plus) {  
          $.plusReady(function() {  
              plus.nativeUI.closeWaiting();  
          });  
      }   
      var mask=document.getElementsByClassName("mui-show-loading-mask");  
      var toast=document.getElementsByClassName("mui-show-loading");  
      if(mask.length>0){  
          mask[0].classList.add("mui-show-loading-mask-hidden");  
      }  
      if(toast.length>0){  
          toast[0].classList.remove("loading-visible");  
          callback && callback();  
      }  
    }  
})(mui, window);