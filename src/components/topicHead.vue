<template>
  <div class="topic-head">
    <div class="topic-info">{{postDetailData ? postDetailData.tMeta.title : '加载中...'}}</div>
    <div class="topic-content" v-html="topicContent">{{ topicContent }}</div>
  </div>
</template>

<script>
export default {
  name: 'topicHead',
  props: {
    postDetailData: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    topicContent() {
      return this.postDetailData
        ? this.postDetailData.tContents[0].content
        : '加载中...';
    },
  },
};
</script>

<style scoped lang="scss">
.topic-head {
  // height: 70px;
  border: 1px solid #dddddd;
  background-color: #fdfdfd;
  padding: 2px;
  border-radius: 3px;
}

.topic-info {
  padding: 2px;
  color: green;
}

.topic-content {
  text-align: left;
  background-color: #fdfdfd;
  margin: 7px 0 0 0;
  padding: 2px;
  overflow: hidden;
}
</style>
