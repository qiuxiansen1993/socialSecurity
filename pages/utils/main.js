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