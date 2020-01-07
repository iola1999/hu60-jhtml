<template>
  <div class="Posts">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadPostsList(loadedPageCount + 1)"
    >
      <van-cell
        v-for="onePost in postsList"
        :key="onePost.topic_id"
        size="large"
        :value="onePost.title"
        is-link
        to="PostDetail"
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import * as Hu60Api from "@/api/hu60Api";

export default {
  name: "Posts",
  components: {},
  data() {
    return {
      postsList: [],
      loading: false,
      finished: false,
      loadedPageCount: 0 // 首页帖子已加载页数
    };
  },
  mounted() {},
  methods: {
    loadPostsList(pageNumber) {
      this.loading = true;
      Hu60Api.listNewPosts(pageNumber).then(response => {
        if (response.data.newTopicList.length === 0) {
          this.finished = true;
        } else {
          this.postsList.push(...response.data.newTopicList);
          this.loadedPageCount += 1;
          this.loading = false;
        }
      });
    }
  }
};
</script>
