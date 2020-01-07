import axios from "axios";
// import store from "@/store";
// import router from "@/router";

const httpFetch = axios.create({
  // 开发时修改此处版本号为自己的，（开发时）config\index.js 的配置会将请求转发到注册中心
  baseURL: "/api",
  timeout: 10000
});

// 响应拦截器
httpFetch.interceptors.response.use(
  response => response,
  // 接口错误状态处理。目前可能不完善
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        //
      }
    }
    return Promise.reject(error.response.status); // 返回接口返回的错误信息。如果是网络连接断开，这样处理不对
  }
);

export default httpFetch;
