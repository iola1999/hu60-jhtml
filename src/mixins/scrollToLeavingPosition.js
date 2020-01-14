// 在被缓存，且需要重新进入时返回离开时位置的页面，加上如下 activated、beforeRouteLeave
export const scrollToLeavingPosition = {
  mounted() {
    setTimeout(() => {
      const targetPosition = this.$route.meta.scrollTo || [0, 0];
      window.scrollTo(...targetPosition);
    }, 300); // 250 毫秒的动画过渡时间，稍微再加点
  },
  activated() {
    setTimeout(() => {
      const targetPosition = this.$route.meta.scrollTo || [0, 0];
      window.scrollTo(...targetPosition);
    }, 300); // 250 毫秒的动画过渡时间，稍微再加点
  },
  beforeRouteLeave(to, from, next) {
    from.meta.scrollTo = [window.scrollX, window.scrollY];
    next();
  },
};
