<template>
  <div id="My">
    <van-loading size="64px" v-if="myPageStatus === 'unknown'"
      >加载中...</van-loading
    >
    <UserProfile
      v-if="myPageStatus === 'loggedIn'"
      :userInfo="myUserInfo"
      :isSelf="true"
      @refresh-self-user-info="getSelfInfo"
    />
    <Login
      v-if="myPageStatus === 'needLogin'"
      @login-success="handleLoginSuccess"
    ></Login>
    <!-- <van-button type="primary" @click="getSelfInfo()">获取个人信息</van-button> -->
  </div>
</template>

<script>
import { scrollToLeavingPosition } from '@/mixins/scrollToLeavingPosition';
import * as Hu60Api from '@/api/hu60Api';
import Login from './Login';
import UserProfile from './UserProfile';

export default {
  name: 'My',
  mixins: [scrollToLeavingPosition],
  components: { Login, UserProfile },
  data() {
    return {
      myUserInfo: {},
      loginResponseData: {},
      myPageStatus: 'unknown', // 判断“我的”页面是否要展示登录表单
    };
  },
  created() {},
  mounted() {
    this.getSelfInfo();
  },
  methods: {
    getSelfInfo(floorReverse) {
      Hu60Api.getSelfInfo(floorReverse).then((response) => {
        if (response.data.uid) {
          this.myUserInfo = response.data;
          this.myPageStatus = 'loggedIn';
        } else {
          this.myPageStatus = 'needLogin';
          this.$notify({ type: 'warning', message: '未登录' });
        }
      });
    },
    handleLoginSuccess() {
      this.myPageStatus = 'loggedIn';
      this.getSelfInfo();
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
#My {
  padding: 4px;
  height: 100%;
}
</style>
