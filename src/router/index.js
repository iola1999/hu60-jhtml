import Vue from "vue";
import VueRouter from "vue-router";
import Post from "../views/Post.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Post",
    component: Post
  }
];

const router = new VueRouter({
  routes
});

export default router;
