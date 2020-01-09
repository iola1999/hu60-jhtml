<template>
  <div id="app">
    <!-- 这里 transition 未能生效，需要排查 -->
    <transition :name="transitionName">
      <keep-alive include="Posts,Chatroom,My,PostDetail">
        <!-- 复用 PostDetail，且 key 使用 fullPath，可以缓存已浏览（且未活跃）的帖子，体验好一丢丢 -->
        <router-view :style="styleObj" :key="$route.fullPath" />
      </keep-alive>
    </transition>
    <van-tabbar active-color="#07c160" inactive-color="#000" route v-show="!$route.meta.fullScreen">
      <van-tabbar-item name="Posts" icon="orders-o" replace to="/Posts">帖子</van-tabbar-item>
      <van-tabbar-item name="Chatroom" icon="chat-o" replace to="/Chatroom">聊天室</van-tabbar-item>
      <van-tabbar-item name="My" icon="user-o" replace to="/My">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data() {
    return {
      showingTab: 'Posts',
      transitionName: '',
    };
  },
  computed: {
    styleObj() {
      return 'margin-bottom:' + (this.$route.meta.fullScreen ? '0' : '50px'); // 底部存在标签栏时，防止内容被遮挡
    },
  },
  watch: {
    $route(to, from) {
      console.log(this.$route);
      console.log(to.meta.index, from.meta.index);
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left';
      } else {
        this.transitionName = 'slide-right';
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
