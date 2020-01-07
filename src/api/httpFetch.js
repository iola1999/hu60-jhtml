import axios from "axios";
// import store from "@/store";
// import router from "@/router";

const httpFetch = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "/q.php" : "/api",
  timeout: 10000
});

// 响应拦截器
httpFetch.interceptors.response.use(
  response => response,
  // 接口错误状态处理
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        //
      }
    }
    return Promise.reject(error.response.status);
  }
);

export default httpFetch;
