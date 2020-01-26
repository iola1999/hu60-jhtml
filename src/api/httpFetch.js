import axios from 'axios';
// import store from "@/store";
// import router from "@/router";
import qs from 'qs';

const httpFetch = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/q.php' : '/api',
  timeout: 10000,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

httpFetch.interceptors.request.use(
  (config) => {
    if (config.method === 'post' && config.data) {
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.data = qs.stringify(config.data);
    }
    // console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
httpFetch.interceptors.response.use(
  (response) => response,
  // 接口错误状态处理
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        //
      }
    }
    return Promise.reject(error);
  },
);

export default httpFetch;
