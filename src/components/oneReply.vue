<template>
  <div class="one-reply">
    <div class="reply-info">
      <img
        class="reply-avatar"
        :src="'http://qiniu.img.hu60.cn/avatar/' + oneReplyInfo.uid + '.jpg'"
        onerror="onerror=null;src='https://hu60.net/upload/default.jpg'"
      />
      <span class="reply-author-name">{{ oneReplyInfo.uinfo.name }}</span>
      <span class="reply-forum-lastactivetime">{{ lastActiveTime }}</span>
      #{{ oneReplyInfo.floor }}

      <div class="reply-content" v-html="oneReplyInfo.content">
        {{ oneReplyInfo.content }}
      </div>
    </div>
  </div>
</template>

<script>
import formatMsgTime from '@/util/formatMsgTime';

export default {
  name: 'oneReply',
  props: {
    oneReplyInfo: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    lastActiveTime() {
      return formatMsgTime(1000 * this.oneReplyInfo.mtime);
    },
  },
};
</script>

<style scoped lang="scss">
.one-reply {
  // height: 75px;
  // width: calc(100% - 32px);
  border-bottom: 1px solid #dddddd;
  margin: 2px 8px;
  padding: 2px 8px;

  .reply-info {
    color: #777;
    font-size: small;

    .reply-avatar {
      width: 30px;
      height: 30px;
      // position: absolute;
      border-radius: 15px;
    }

    .reply-author-name {
      margin-left: 8px;
    }

    .reply-forum-lastactivetime {
      margin-left: 8px;
    }
  }
}
</style>
