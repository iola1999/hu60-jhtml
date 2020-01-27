# hu60-jhtml

（并非官方的）虎绿林的 jhtml 版本

# 使用方法

[https://hu60.cn/q.php/bbs.topic.92126.html](https://hu60.cn/q.php/bbs.topic.92126.html)

# 已实现的功能

- [x] 帖子列表展示
- [ ] 帖子内容、回复展示
- [ ] 登录
- [ ] 个人资料展示
- [ ] 回帖
- [ ] 板块列表
- [ ] 发帖
- [ ] 聊天室

# 开发过程中的跨域解决

理论上直接使用 devServer 即可，但虎绿林服务器解析请求有很多奇怪的表现（可能是我太菜了吧），使用 devServer 有很多问题。尝试使用 nginx 做开发时的代理（线上没影响），参考配置如下：

```
location /sockjs-node/ {
    proxy_pass               'http://localhost:8080/sockjs-node/';
    proxy_http_version       1.1;
    proxy_set_header         Upgrade $http_upgrade;
    proxy_set_header         Connection "upgrade";
}

location /api/ {
    proxy_pass               'https://hu60.cn/q.php/';
    proxy_set_header         Host 'hu60.cn';
    proxy_set_header         'Referer' 'https://hu60.cn';
    proxy_set_header         'origin' 'https://hu60.cn';
    #修改登录响应的set-cookie域名
    proxy_cookie_domain      hu60.cn localhost;
    expires                  0;
}

location / {
    proxy_pass               'http://localhost:8080/';
    expires                  0;
}
```