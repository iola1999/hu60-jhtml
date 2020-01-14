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
    if (from.name !== 'PostDetail') {
      // 如果是离开帖子详情页面则不存储离开位置。也可以优化为按 fullPath 存储 scrollTo
      from.meta.scrollTo = [window.scrollX, window.scrollY];
      next();
    }
  },
};
