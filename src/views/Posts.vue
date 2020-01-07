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
      finished: false, // 应该永远加载不完吧
      loadedPageCount: 0
    };
  },
  mounted() {},
  methods: {
    loadPostsList(pageNumber) {
      this.loading = true;
      Hu60Api.listNewPosts(pageNumber).then(response => {
        console.log(response);
        this.postsList.push(...response.data.newTopicList);
        this.loadedPageCount += 1;
        this.loading = false;
      });
    }
  }
};
</script>
