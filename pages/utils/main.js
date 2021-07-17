import OriginAxios from 'axios';
import Qs from 'qs'
import './rem';
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

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    // if (res.data && res.data.code !== 200) {
    //   let errorMsg = res.data.msg;
    //   return Promise.reject(errorMsg);
    // }
    return res.data;
  },
  error =>{
    mui.toast("请求异常");
  }
);

export default axios;
