<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="PostList,Chatroom,My,PostDetail">
        <!-- 复用 PostDetail，且 key 使用 fullPath，可以缓存已浏览（且未活跃）的帖子，体验好一丢丢 -->
        <router-view :style="styleObj" :key="$route.fullPath" class="appView" />
      </keep-alive>
    </transition>
    <van-tabbar active-color="#197b30" inactive-color="#000" route v-show="!$route.meta.fullScreen">
      <van-tabbar-item name="PostList" icon="orders-o" replace to="/PostList">帖子</van-tabbar-item>
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
      showingTab: 'PostList',
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
      this.transitionName =
        to.meta.index > from.meta.index
          ? 'slide-left'
          : to.meta.index === from.meta.index
          ? ''
          : 'slide-right';
    },
  },
};
</script>

<style lang="scss">
#app {
  // 这里设宽度 100 会导致动画不太正常.......啊动画好多坑啊
  // width: 375px;
}
.appView {
  width: 100%;
  // position: absolute;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 250ms;
  // position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
