module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://hu60.cn/q.php/", //对应服务器地址
        changeOrigin: true //允许跨域
      }
    }
  }
};
