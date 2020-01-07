import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";
import PostDetail from "../views/PostDetail.vue";
import Chat from "../views/chat/Chat";
import Room from "../views/chat/Room";

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
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
  },
  {
    path: "/chat/room",
    name: "room",
    component: Room
  }
];

const router = new VueRouter({
  routes
});

export default router;
