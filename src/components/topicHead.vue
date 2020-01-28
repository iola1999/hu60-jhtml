<template>
  <div class="topic-head" v-if="postDetailData">
    <div class="topic-title">
      {{ postDetailData ? postDetailData.tMeta.title : '加载中...' }}
    </div>
    <div class="topic-postinfo">
      <img
        class="post-avatar"
        :src="
          'http://qiniu.img.hu60.cn/avatar/' + postDetailData.tMeta.uid + '.jpg'
        "
        onerror="onerror=null;src='https://hu60.net/upload/default.jpg'"
      />
      <span class="post-author-name">{{
        postDetailData.tContents[0].uinfo.name
      }}</span>
      <span class="post-forum-name">{{ postDetailData.fName }}</span>
      <span class="post-forum-lastactivetime">{{ lastActiveTime }}</span>
      <div class="comment-and-read">
        <img class="post-info-icon" src="@/assets/comment_count.png" />
        <span class="post-info-count">{{ postDetailData.floorCount - 1 }}</span>
      </div>
      <div class="comment-and-read">
        <img class="post-info-icon" src="@/assets/read_count.png" />
        <span class="post-info-count">{{
          postDetailData.tMeta.read_count
        }}</span>
      </div>
    </div>

    <div class="topic-content" v-html="topicContent">{{ topicContent }}</div>
  </div>
</template>

<script>
import formatMsgTime from '@/util/formatMsgTime';

export default {
  name: 'topicHead',
  props: {
    postDetailData: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {};
  },
  computed: {
    topicContent() {
      return this.postDetailData
        ? this.postDetailData.tContents[0].content
        : '加载中...';
    },
    lastActiveTime() {
      return formatMsgTime(1000 * this.postDetailData.tMeta.ctime);
    },
  },
};
</script>

<style scoped lang="scss">
.topic-head {
  // height: 70px;
  border: 1px solid #dddddd;
  background-color: #fdfdfd;
  padding: 4px;
  margin: 0 4px 4px 4px;
  border-radius: 3px;
}

.topic-title {
  font-size: 18px;
  font-weight: bold;
  margin: 4px 0 4px 0;
}

.topic-postinfo {
  color: #777;
  font-size: small;
  margin: 4px 0 0 4px;

  .post-avatar {
    width: 30px;
    height: 30px;
    // position: absolute;
    border-radius: 15px;
  }

  .post-author-name {
    margin-left: 8px;
  }

  .post-forum-name {
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-left: 8px;
    padding: 2px;
  }

  .post-forum-lastactivetime {
    margin-left: 8px;
  }

  .comment-and-read {
    float: right;
    display: flex;
    margin-right: 8px;
    margin-top: 5px;

    .post-info-icon {
      width: 20px;
      height: 20px;
      margin-right: 2px;
    }

    .post-info-count {
      line-height: 20px;
    }
  }
}

.topic-content {
  text-align: left;
  background-color: #fdfdfd;
  margin: 7px 0 0 0;
  // padding: 2px;
  overflow: hidden;
}
</style>
