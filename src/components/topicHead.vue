<template>
  <div class="topic-head">{{postDetailData ? postDetailData.tMeta.title : '加载中...'}}</div>
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
};
</script>

<style scoped lang="scss">
.topic-head {
  height: 70px;
  border: 1px solid #dddddd;
  background-color: #fdfdfd;
  padding: 2px;
  border-radius: 3px;
}
</style>
