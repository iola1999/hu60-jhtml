<template>
  <div id="My">
    <van-loading size="64px" v-if="myPageStatus === 'unknown'"
      >加载中...</van-loading
    >
    <div v-if="myPageStatus === 'loggedIn'">
      <img
        class="my-avatar"
        :src="'http://qiniu.img.hu60.cn/avatar/' + myUserInfo.uid + '.jpg'"
        onerror="onerror=null;src='https://hu60.net/upload/default.jpg'"
      />
      {{ myUserInfo }}
    </div>
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

export default {
  name: 'My',
  mixins: [scrollToLeavingPosition],
  components: { Login },
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
    getSelfInfo() {
      Hu60Api.getSelfInfo().then((response) => {
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

  .my-avatar {
    text-align: center;
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }
}
</style>
