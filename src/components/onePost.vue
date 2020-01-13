<template>
  <div class="one-post">
    <!-- 上面标题，下面头像，昵称，板块，发布时间，阅读数，评论数 -->
    <div class="post-title van-multi-ellipsis--l2">{{ onePostInfo.title }}</div>
    <div class="post-info">
      <!-- <img class="post-avatar" :src="'https://hu60.net/upload/default.jpg'" alt="头像" /> -->
      <img
        class="post-avatar"
        :src="'http://qiniu.img.hu60.cn/avatar/'+onePostInfo.uid+'.jpg'"
        onerror="onerror=null;src='https://hu60.net/upload/default.jpg'"
        alt="."
      />
      <span class="post-author-name">{{ onePostInfo.uinfo.name }}</span>
      <span class="post-forum-name">{{ onePostInfo.forum_name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'onePost',
  props: {
    onePostInfo: {
      type: Object,
      default: () => null,
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.one-post {
  // height: 75px;
  width: 100%;
  border-bottom: 1px solid #dddddd;
  padding: 2px 3px;

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
    }
  }
}
</style>
