<template>
  <div id="room">
    1.顶部聊天室选择
    2.当前聊天室内容，倒序，上拉加载更多
    3.输入框
  </div>
</template>

<script>
// import * as Hu60Api from '@/api/hu60Api';

export default {
  name: 'Room',
  data() {
    return {
      name: '',
      currentChatroomName: '', // 当前聊天室名称
      ChatroomList: [], // 全部聊天室列表，第一项（最新发言）是默认展示的
    };
  },
  methods: {
    // getData(page) {
    //   var name = this.name;
    //   Hu60Api.room(name, page).then((response) => {
    //     if (response.status === 200) {
    //       this.list = response.data.chatList;
    //     } else {
    //       this.$toast('加载失败');
    //     }
    //   });
    // },
  },
};
</script>

<style scoped>
</style>