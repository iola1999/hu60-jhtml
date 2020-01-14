<template>
  <div class="PostList">
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
      <van-list
        v-model="isLoadingMore"
        :finished="isLoadedAllPosts"
        finished-text="没有更多了"
        @load="onLoadingMore"
      >
        <!-- <van-cell
          v-for="onePost in PostList"
          :key="onePost.topic_id"
          size="large"
          :value="onePost.title"
          is-link
          :to="{ name: 'PostDetail', query: { topic_id: onePost.topic_id, mtime:onePost.mtime } }"
        >-->
        <!-- 入参加上帖子活跃时间 mtime（需要确认一下这个是帖子编辑时间还是最后回复时间），就能在无更新时缓存，有更新时重新加载了 -->
        <!-- 上面这条 考虑后还是暂时不缓存了，加了动画后坑太多了 -->
        <!-- </van-cell> -->
        <onePost
          v-for="onePost in PostList"
          :key="onePost.topic_id"
          :onePostInfo="onePost"
          @click.native="handleClickPost(onePost)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import * as hu60Api from '@/api/hu60Api';
import onePost from '@/components/onePost';
import { scrollToLeavingPosition } from '@/mixins/scrollToLeavingPosition';

export default {
  name: 'PostList',
  components: { onePost },
  mixins: [scrollToLeavingPosition],
  data() {
    return {
      PostList: [],
      isLoadingMore: false, // 加载更多
      isRefreshing: false, // 刷新
      isLoadedAllPosts: false,
      loadedPageCount: 0, // 首页帖子已加载页数
    };
  },
  mounted() {},
  methods: {
    loadPostList(pageNumber) {
      return hu60Api.listNewPosts(pageNumber).then((response) => {
        if (response.data.newTopicList.length === 0) {
          this.isLoadedAllPosts = true;
        } else {
          this.PostList.push(...response.data.newTopicList);
          this.loadedPageCount += 1;
        }
      });
    },
    onLoadingMore() {
      this.isLoadingMore = true;
      this.loadPostList(this.loadedPageCount + 1).then(() => {
        this.isLoadingMore = false;
      });
    },
    onRefresh() {
      this.PostList = [];
      this.isLoadedAllPosts = false;
      this.loadedPageCount = 0;
      this.isRefreshing = true; // 刷新
      this.loadPostList(this.loadedPageCount + 1).then(() => {
        this.isRefreshing = false;
      });
    },
    handleClickPost(onePost) {
      this.$router.push({
        name: 'PostDetail',
        query: { topic_id: onePost.topic_id, mtime: onePost.mtime },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.PostList {
  text-align: left;
  position: absolute;
  width: 100%;
}
</style>