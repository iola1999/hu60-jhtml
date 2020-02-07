<template>
  <div class="one-reply">
    <div class="reply-info">
      <img
        class="reply-avatar"
        :src="'http://qiniu.img.hu60.cn/avatar/' + oneReplyInfo.uid + '.jpg'"
        onerror="onerror=null;src='https://hu60.net/upload/default.jpg'"
      />
      <span class="reply-author-name">{{ oneReplyInfo.uinfo.name }}</span>
      <span class="reply-atTA" @click="debuggggg">@Ta</span>
      <span class="reply-forum-lastactivetime">{{ lastActiveTime }}</span>
      <span class="reply-floor">#{{ oneReplyInfo.floor }}</span>
    </div>
    <div class="reply-content" v-html="oneReplyInfo.content">
      {{ oneReplyInfo.content }}
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
  methods: {
    debuggggg() {
      console.log('要at此人：', this.oneReplyInfo);
    },
  },
};
</script>

<style scoped lang="scss">
.one-reply {
  // height: 75px;
  // width: calc(100% - 32px);
  border-bottom: 1px solid #dddddd;
  // margin: 2px;
  padding: 2px;

  .reply-info {
    color: #777;
    font-size: small;
    margin-top: 3px;

    .reply-avatar {
      width: 30px;
      height: 30px;
      // position: absolute;
      border-radius: 15px;
    }

    .reply-author-name {
      margin-left: 8px;
      line-height: 30px;
    }

    .reply-atTA {
      margin: 0 8px;
      color: #08c;
    }

    .reply-forum-lastactivetime {
      margin-left: 8px;
    }

    .reply-floor {
      float: right;
      display: flex;
      margin-right: 4px;
    }
  }

  .reply-content {
    margin: 2px 0 5px 0;
    padding-left: 32px;
  }
}
</style>
