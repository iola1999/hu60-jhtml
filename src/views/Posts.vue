<template>
  <div class="Posts">
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
      <van-list
        v-model="isLoadingMore"
        :finished="isLoadedAllPosts"
        finished-text="没有更多了"
        @load="onLoadingMore"
      >
        <van-cell
          v-for="onePost in postsList"
          :key="onePost.topic_id"
          size="large"
          :value="onePost.title"
          is-link
          :to="{ name: 'PostDetail', query: { topic_id: onePost.topic_id, mtime:onePost.mtime } }"
        >
          <!-- 模仿 v2 的思路，入参加上帖子活跃时间 mtime（需要确认一下这个是帖子编辑时间还是最后回复时间），就能在无更新时缓存，有更新时重新加载了 -->
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import * as hu60Api from '@/api/hu60Api';

export default {
  name: 'Posts',
  components: {},
  data() {
    return {
      postsList: [],
      isLoadingMore: false, // 加载更多
      isRefreshing: false, // 刷新
      isLoadedAllPosts: false,
      loadedPageCount: 0, // 首页帖子已加载页数
    };
  },
  mounted() {},
  // 在被缓存，且需要重新进入时返回离开时位置的页面，加上如下 activated、beforeRouteLeave
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
  methods: {
    loadPostsList(pageNumber) {
      return hu60Api.listNewPosts(pageNumber).then((response) => {
        if (response.data.newTopicList.length === 0) {
          this.isLoadedAllPosts = true;
        } else {
          this.postsList.push(...response.data.newTopicList);
          this.loadedPageCount += 1;
        }
      });
    },
    onLoadingMore() {
      this.isLoadingMore = true;
      this.loadPostsList(this.loadedPageCount + 1).then(() => {
        this.isLoadingMore = false;
      });
    },
    onRefresh() {
      this.postsList = [];
      this.isLoadedAllPosts = false;
      this.loadedPageCount = 0;
      this.isRefreshing = true; // 刷新
      this.loadPostsList(this.loadedPageCount + 1).then(() => {
        this.isRefreshing = false;
      });
    },
  },
};
</script>
