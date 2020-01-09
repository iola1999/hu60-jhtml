import Vue from 'vue';
import VueRouter from 'vue-router';
import Posts from '../views/Posts.vue';
import PostDetail from '../views/PostDetail.vue';
import Chatroom from '../views/Chatroom/Chatroom';

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
  },
  {
    path: '/PostDetail',
    name: 'PostDetail',
    component: PostDetail,
    meta: {
      fullScreen: true, // 即底部不存在标签栏，不需要 margin-bottom: 50px
    },
  },
  {
    path: '/Chatroom',
    name: 'Chatroom',
    component: Chatroom,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
