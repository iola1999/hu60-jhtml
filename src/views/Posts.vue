<template>
  <div class="Posts">
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
      <van-list
        v-model="isLoadingMore"
        :finished="finished"
        finished-text="没有更多了"
        @load="isLoadingMore = true; loadPostsList(loadedPageCount + 1)"
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
      finished: false,
      loadedPageCount: 0, // 首页帖子已加载页数
    };
  },
  mounted() {},
  methods: {
    loadPostsList(pageNumber) {
      hu60Api.listNewPosts(pageNumber).then((response) => {
        if (response.data.newTopicList.length === 0) {
          this.finished = true;
        } else {
          this.postsList.push(...response.data.newTopicList);
          this.loadedPageCount += 1;
          this.isLoadingMore = false;
          this.isRefreshing = false; // 顺便也置一下
        }
      });
    },
    onRefresh() {
      this.postsList = [];
      this.isRefreshing = true; // 刷新
      this.finished = false;
      this.loadedPageCount = 0;
      this.loadPostsList(this.loadedPageCount + 1);
    },
  },
};
</script>
