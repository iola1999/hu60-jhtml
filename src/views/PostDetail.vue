<template>
  <div id="postDetail">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <span slot="right" class="actions-top-right">
        <van-icon name="star-o" size="18" @click="onClickStar" />
        <van-icon name="edit" size="18" @click="onClickReply" />
        <van-icon name="wap-nav" size="18" @click="onClickMorkActions" />
      </span>
    </van-nav-bar>
    <!-- 帖子信息、楼主内容 -->
    <topicHead :postDetailData="postDetailData" />
    <!-- 帖子的回复 -->
    <div class="topic-reply" v-if="postDetailData">
      <van-list
        v-model="isLoadingMoreReplies"
        :finished="isLoadedAllReplies"
        finished-text="没有更多回复了"
        @load="onLoadingMoreReplies"
      >
        <oneReply
          v-for="replyItem in postDetailData.tContents.slice(1)"
          :key="replyItem.id"
          :oneReplyInfo="replyItem"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import * as hu60Api from '@/api/hu60Api';
import topicHead from '@/components/topicHead';
import oneReply from '@/components/oneReply';
import { scrollToLeavingPosition } from '@/mixins/scrollToLeavingPosition';

export default {
  name: 'PostDetail',
  components: { topicHead, oneReply },
  mixins: [scrollToLeavingPosition],
  data() {
    return {
      postDetailData: null,
      isLoadingMoreReplies: false, // 加载更多
      isLoadedAllReplies: false, // 已加载完全部回复
      loadedPageCount: 0, // 帖子详情已加载页数，总页数是 maxPage
    };
  },
  computed: {},
  mounted() {
    this.loadContentAndReply(this.loadedPageCount + 1);
  },
  methods: {
    loadContentAndReply(pageNumber) {
      return hu60Api
        .getPostDetailAndReply(this.$route.query.topic_id, pageNumber)
        .then((response) => {
          this.loadedPageCount += 1;
          if (!this.postDetailData) {
            this.postDetailData = response.data;
          } else {
            // 拼接回复列表
            this.postDetailData.tContents.push(...response.data.tContents);
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
      this.$toast('TODO: 点了右上角按钮，弹出一些菜单。ActionSheet 上拉菜单');
    },
    onLoadingMoreReplies() {
      console.log('onLoadingMoreReplies', this.postDetailData);
      if (this.postDetailData) {
        if (this.postDetailData.maxPage > this.loadedPageCount) {
          this.isLoadingMoreReplies = true;
          this.loadContentAndReply(this.loadedPageCount + 1).then(() => {
            this.isLoadingMoreReplies = false;
          });
        } else {
          this.isLoadedAllReplies = true;
          this.isLoadingMoreReplies = false;
        }
      } else {
        this.isLoadingMoreReplies = false;
      }
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
#postDetail {
  text-align: left;
  // width: 100%;

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

  .topic-reply {
    border: 1px solid #dddddd;
    background-color: #fdfdfd;
    padding: 4px;
    margin: 0 4px 4px 4px;
    border-radius: 3px;
  }
}
</style>
