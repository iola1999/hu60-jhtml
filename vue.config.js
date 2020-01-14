module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://hu60.cn/q.php/', // 对应服务器地址
        changeOrigin: true, // 允许跨域，这仅仅修改了 host，虎绿林限制了 Origin
        // 其实线上就没这问题了，开发时难以测试 post 数据
        headers: {
          // https://blog.csdn.net/a250185087/article/details/102391096
          Origin: 'https://hu60.cn',
          Referer: 'https://hu60.cn/q.php/user.login.json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // onProxyReq: (proxyReq, _req, _res) => {
        //   // 直接修改 req 是没用的，应该用 setHeader
        //   经测试，以下修改等于上面设置的 headers:
        //   proxyReq.setHeader('x-forwarded-host', 'hu60.cn');
        //   proxyReq.setHeader('origin', 'https://hu60.cn');
        //   proxyReq.setHeader('referer', 'https://hu60.cn/q.php/user.login.json');
        //   proxyReq.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        //   proxyReq.setHeader('content-Type', 'application/x-www-form-urlencoded');
        // },
        // onProxyRes: (proxyRes)=> {
        //   var cookies = proxyRes.headers['set-cookie'];
        //   var cookieRegex = /Domain=\.?hu60.cn/i;
        //   if (cookies) {
        //     var newCookie = cookies.map(function(cookie) {
        //       if (cookieRegex.test(cookie)) {
        //         return cookie.replace(cookieRegex, 'Domain=localhost');
        //       }
        //       return cookie;
        //     });
        //     delete proxyRes.headers['set-cookie'];
        //     proxyRes.headers['set-cookie'] = newCookie;
        //   }
        // },
      },
    },
  },
  productionSourceMap: false,
  filenameHashing: false,
  // 虎绿林的 jhtml 只能存放 html，所以 js、css 需要放到自己的 cdn 或者其他位置，可以写在下面方便 build 时自动修改 html
  publicPath:
    process.env.NODE_ENV === 'production'
      ? 'https://www.gotosjtu.cn/hu60-jhtml/'
      : '/',
};
