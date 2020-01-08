module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://hu60.cn/q.php/', // 对应服务器地址
        changeOrigin: true, // 允许跨域
      },
    },
  },
  productionSourceMap: false,
  filenameHashing: true,
  // 虎绿林的 jhtml 只能存放 html，所以 js、css 需要放到自己的 cdn 或者其他位置，可以写在下面方便 build 时自动修改 html
  publicPath:
    process.env.NODE_ENV === 'production'
      ? 'https://www.gotosjtu.cn/hu60-jhtml/'
      : '/',
};
