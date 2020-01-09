<template>
  <div id="chat">
    <!-- 选择聊天室，可选项由父组件“聊天内容”传入（因为那个页面需要最新发言聊天室） -->
  </div>
</template>

<script>
export default {
  name: 'chooseRoom',
  data() {
    return {
      list: [],
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>