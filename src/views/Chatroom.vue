<template>
  <div id="room">
    <van-dropdown-menu active-color="#197b30">
      <van-dropdown-item :title="'当前聊天室：' + currentChatroomName" ref="chooseChatroom">
        <van-cell
          v-for="oneChatroom in chatroomList"
          :key="oneChatroom.id"
          :title="oneChatroom.name"
          :class="oneChatroom.name === currentChatroomName ? 'green-title' : ''"
          :value="formatMsgTime(1000 * oneChatroom.ztime)"
          @click="handleChatroomChange(oneChatroom.name)"
        />
        <van-cell title="这里可以新建或进入隐藏的" value=">" />
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 好像往上翻加载历史发言不太好做（懒得用 pull-refresh+独立刷新按钮了），就按网页的样子顶部是新发言 -->
    <div id="chatroomContent"></div>
    <div>3.输入框</div>
  </div>
</template>

<script>
import * as Hu60Api from '@/api/hu60Api';
import formatMsgTime from '@/util/formatMsgTime';
import { scrollToLeavingPosition } from '@/mixins/scrollToLeavingPosition';

export default {
  name: 'Chatroom',
  mixins: [scrollToLeavingPosition],
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
    handleChatroomChange(newChatroomName) {
      this.currentChatroomName = newChatroomName;
      this.$refs.chooseChatroom.toggle(); // 收起聊天室选择
    },
    formatMsgTime(timespan) {
      return formatMsgTime(timespan);
    },
  },
  created() {
    this.getChatRoomList();
  },
  mounted() {},
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

<style scoped lang="scss">
#room {
  text-align: left;
  // position: relative;
  height: 100%;
  // width: 100%;
  .green-title {
    .van-cell__title {
      color: #197b30;
    }
  }
  #chatroomContent {
    height: calc(100% - 100px);
  }
}
</style>
