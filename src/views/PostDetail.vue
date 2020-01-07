<template>
  <div class="PostDetail">
    <van-nav-bar
      :title="postDetailData ? postDetailData.tMeta.title : '加载中...'"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <topicHead />
    <div v-html="topicContent">{{topicContent}}</div>
  </div>
</template>

<script>
import * as hu60Api from '@/api/hu60Api';
import topicHead from '@/components/topicHead';

export default {
  name: 'PostDetail',
  components: { topicHead },
  data() {
    return {
      postDetailData: null,
      loadedPageCount: 0, // 帖子详情已加载页数，总页数是 maxPage
    };
  },
  computed: {
    topicContent() {
      return this.postDetailData
        ? this.postDetailData.tContents[0].content
        : '';
    },
  },
  mounted() {
    // 帖子详情页面不keepalive
    console.log(this.$route.query.topic_id);
    this.loadContentAndReply();
  },
  methods: {
    loadContentAndReply() {
      hu60Api
        .getPostDetailAndReply(
          this.$route.query.topic_id,
          this.loadedPageCount + 1,
        )
        .then((response) => {
          if (!this.postDetailData) {
            this.postDetailData = response.data;
          } else {
            // 拼接回复列表
          }
        });
    },
    onClickLeft() {
      this.$toast('返回');
      this.$router.go(-1);
    },
    onClickRight() {
      this.$toast('按钮');
    },
  },
  watch: {},
};
</script>

<style lang="scss">
.PostDetail {
  text-align: left;
}
</style>