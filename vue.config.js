module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://hu60.cn/q.php/', //对应服务器地址
        changeOrigin: true, //允许跨域
      },
    },
  },
  productionSourceMap: false,
  filenameHashing: true,
  // css: {
  //   loaderOptions: {
  //     css: {
  //       // 这里的选项会传递给 css-loader
  //     },
  //     postcss: {
  //       // 这里的选项会传递给 postcss-loader
  //     },
  //   },
  // },
};
