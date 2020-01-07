<template>
  <div class="topic-head"></div>
</template>

<script>
export default {
  name: 'topicHead',
  props: {
    topicContent: {
      type: Object,
      default: () => {},
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
