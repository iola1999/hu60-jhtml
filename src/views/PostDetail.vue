<template>
  <div id="postDetail">
    <!-- :title="postDetailData ? postDetailData.tMeta.title : '加载中...'" -->
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <span slot="right" class="actions-top-right">
        <van-icon name="star-o" size="18" @click="onClickStar" />
        <van-icon name="edit" size="18" @click="onClickReply" />
        <van-icon name="wap-nav" size="18" @click="onClickMorkActions" />
      </span>
    </van-nav-bar>
    <topicHead :postDetailData="postDetailData" />
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
  computed: {},
  mounted() {
    // 帖子详情页面不keepalive
    this.loadContentAndReply();
    setTimeout(() => {
      const targetPosition = [0, 0];
      window.scrollTo(...targetPosition);
    }, 300); // 250 毫秒的动画过渡时间，稍微再加点
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
      // this.$toast('返回');
      this.$router.go(-1);
    },
    onClickStar() {
      this.$toast(
        'TODO: 点了收藏，后面在看有没有获取收藏状态的，收藏后改成实心',
      );
    },
    onClickReply() {
      this.$toast('TODO: 点了回复');
    },
    onClickMorkActions() {
      this.$toast('TODO: 点了右上角按钮，弹出一些菜单');
    },
  },
  watch: {},
};
</script>

<style lang="scss">
#postDetail {
  text-align: left;

  .van-nav-bar__left {
    left: 4px;
  }
  .van-nav-bar__right {
    right: 4px;
  }

  .actions-top-right {
    .van-icon {
      margin-left: 12px;
    }
  }
}
</style>
