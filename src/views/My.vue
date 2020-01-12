<template>
  <div id="My">未登录</div>
</template>

<script>
export default {
  name: 'My',
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  // 在被缓存，且需要重新进入时返回离开时位置的页面，加上如下 activated、beforeRouteLeave
  // activated() {
  //   setTimeout(() => {
  //     const targetPosition = this.$route.meta.scrollTo || [0, 0];
  //     window.scrollTo(...targetPosition);
  //   }, 300); // 250 毫秒的动画过渡时间，稍微再加点
  // },
  // beforeRouteLeave(to, from, next) {
  //   from.meta.scrollTo = [window.scrollX, window.scrollY];
  //   next();
  // },
  watch: {},
};
</script>

<style scoped>
</style>