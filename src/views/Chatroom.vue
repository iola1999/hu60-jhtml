<template>
  <div id="room">
    <!-- 1.顶部聊天室选择 -->
    <div>当前聊天室：{{currentChatroomName}} [切换] DropdownMenu, DropdownItem</div>
    <div>2.当前聊天室内容，倒序，上拉加载更多 pull-refresh</div>
    <div>3.输入框</div>
  </div>
</template>

<script>
import * as Hu60Api from '@/api/hu60Api';

export default {
  name: 'Chatroom',
  data() {
    return {
      currentChatroomName: '', // 当前聊天室名称
      chatroomList: [], // 全部聊天室列表，第一项（最新发言）是默认展示的。另外 没做新建聊天室（即手动输入名称进入聊天室）
    };
  },
  methods: {
    getChatRoomList() {
      // 聊天室列表，其中第一项是最新发言的，默认展示它
      Hu60Api.getChatRoomList().then((response) => {
        this.chatroomList = response.data.chatRomList;
        if (this.chatroomList.length > 0) {
          this.currentChatroomName = this.chatroomList[0].name;
        }
      });
    },
  },
  created() {
    this.getChatRoomList();
  },
  mounted() {},
  // 在被缓存，且需要重新进入时返回离开时位置的页面，加上如下 activated、beforeRouteLeave
  activated() {
    setTimeout(() => {
      const targetPosition = this.$route.meta.scrollTo || [0, 0];
      window.scrollTo(...targetPosition);
    }, 300); // 250 毫秒的动画过渡时间，稍微再加点
  },
  beforeRouteLeave(to, from, next) {
    from.meta.scrollTo = [window.scrollX, window.scrollY];
    next();
  },
  watch: {
    currentChatroomName: {
      handler(newValue) {
        // 加载该聊天室内容
        console.log('展示该聊天室：', newValue);
      },
      immediate: false,
    },
  },
};
</script>

<style scoped>
#room {
  text-align: left;
}
</style>