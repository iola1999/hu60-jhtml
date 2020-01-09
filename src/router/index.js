import Vue from 'vue';
import VueRouter from 'vue-router';
import Posts from '../views/Posts.vue';
import PostDetail from '../views/PostDetail.vue';
import Chatroom from '../views/Chatroom';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: 'Posts',
  },
  {
    path: '/Posts',
    name: 'Posts',
    component: Posts,
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
];

const router = new VueRouter({
  routes,
});

export default router;
