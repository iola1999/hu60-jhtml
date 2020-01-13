<template>
  <div class="one-post">
    <!-- 上面标题，下面头像，昵称，板块，发布时间，阅读数，评论数 -->
    <div class="post-title van-multi-ellipsis--l2">{{ onePostInfo.title }}</div>
    <div class="post-info">
      <!-- <img class="post-avatar" :src="'https://hu60.net/upload/default.jpg'" alt="头像" /> -->
      <img
        class="post-avatar"
        :src="'http://qiniu.img.hu60.cn/avatar/' + onePostInfo.uid + '.jpg'"
        onerror="onerror=null;src='https://hu60.net/upload/default.jpg'"
      />
      <span class="post-author-name">{{ onePostInfo.uinfo.name }}</span>
      <span class="post-forum-name">{{ onePostInfo.forum_name }}</span>
      <span class="post-forum-lastactivetime">{{ lastActiveTime }}</span>
      <div class="comment-and-read">
        <img class="post-info-icon" src="@/assets/comment_count.png" />
        <span class="post-info-count">{{ onePostInfo.reply_count }}</span>
      </div>
      <div class="comment-and-read">
        <img class="post-info-icon" src="@/assets/read_count.png" />
        <span class="post-info-count">{{ onePostInfo.read_count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import formatMsgTime from '@/util/formatMsgTime';

export default {
  name: 'onePost',
  props: {
    onePostInfo: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    lastActiveTime() {
      return formatMsgTime(1000 * this.onePostInfo.mtime);
    },
  },
};
</script>

<style scoped lang="scss">
.one-post {
  // height: 75px;
  width: calc(100% - 32px);
  border-bottom: 1px solid #dddddd;
  margin: 2px 8px;
  padding: 2px 8px;

  .post-title {
    margin-bottom: 2px;
  }

  .post-info {
    color: #777;
    font-size: small;

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
}
</style>
