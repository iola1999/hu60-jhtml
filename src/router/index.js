import Vue from 'vue';
import VueRouter from 'vue-router';
import PostList from '../views/PostList.vue';
import PostDetail from '../views/PostDetail.vue';
import Chatroom from '../views/Chatroom';
import My from '../views/My';
import Login from '../views/Login';
import PageNotFound from '../views/PageNotFound';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: 'PostList',
  },
  {
    path: '/PostList',
    name: 'PostList',
    component: PostList,
    meta: {
      // title: '虎绿林 编程学院',
      index: 10, // 页面层级，用于切换时判断动画方向
    },
  },
  {
    path: '/PostDetail',
    name: 'PostDetail',
    component: PostDetail,
    meta: {
      fullScreen: true, // 即底部不存在标签栏，不需要 margin-bottom: 50px
      index: 20,
    },
  },
  {
    path: '/Chatroom',
    name: 'Chatroom',
    component: Chatroom,
    meta: {
      index: 11,
    },
  },
  {
    path: '/My', // 个人中心
    name: 'My',
    component: My,
    meta: {
      index: 12,
    },
  },
  {
    path: '/Login', // 登录
    name: 'Login',
    component: Login,
    meta: {
      index: 99,
    },
  },
  {
    path: '/*',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: {
      index: 99,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
