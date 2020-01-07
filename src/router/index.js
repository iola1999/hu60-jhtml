import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";

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
  }
];

const router = new VueRouter({
  routes
});

export default router;
