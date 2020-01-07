import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";
import PostDetail from "../views/PostDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "Posts"
  },
  {
    path: "/Posts",
    name: "Posts",
    component: Posts
  },
  {
    path: "/PostDetail",
    name: "PostDetail",
    component: PostDetail,
    meta: {
      fullScreen: true
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
