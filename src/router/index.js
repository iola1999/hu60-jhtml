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
      fullScreen: true,
    },
  },
  {
    path: '/Chatroom',
    name: 'Chatroom',
    component: Chatroom,
  },
  // { path: '*', component: NotFoundComponent }, // 使用 history 模式最好加一个 404 页面
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
