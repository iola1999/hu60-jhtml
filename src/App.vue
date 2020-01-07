<template>
  <div id="app">
    <keep-alive include="Posts,Chatroom,My">
      <router-view :style="styleObj" />
    </keep-alive>
    <van-tabbar active-color="#07c160" inactive-color="#000" route v-show="!$route.meta.fullScreen">
      <van-tabbar-item name="Posts" icon="orders-o" replace to="/Posts">帖子</van-tabbar-item>
      <van-tabbar-item name="chat" icon="chat-o" replace to="/chat">聊天室</van-tabbar-item>
      <van-tabbar-item name="My" icon="user-o" replace to="/My">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      showingTab: "Posts"
    };
  },
  computed: {
    styleObj() {
      return "margin-bottom:" + (this.$route.meta.fullScreen ? "0" : "50px"); // 底部存在标签栏时，防止内容被遮挡
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
