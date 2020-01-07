<template>
  <div id="app">
    <router-view />
    <van-tabbar active-color="#07c160" inactive-color="#000" route>
      <van-tabbar-item name="Posts" icon="orders-o" replace to="/Posts">帖子</van-tabbar-item>
      <van-tabbar-item name="Chatroom" icon="chat-o" replace to="/Chatroom">聊天室</van-tabbar-item>
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
