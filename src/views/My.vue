<template>
  <div id="My">
    <img
      class="my-avatar"
      :src="'http://qiniu.img.hu60.cn/avatar/' + myUserInfo.uid + '.jpg'"
      onerror="onerror=null;src='https://hu60.net/upload/default.jpg'"
    />
  </div>
</template>

<script>
import { scrollToLeavingPosition } from '@/mixins/scrollToLeavingPosition';
import * as Hu60Api from '@/api/hu60Api';

export default {
  name: 'My',
  mixins: [scrollToLeavingPosition],
  data() {
    return {
      myUserInfo: {},
      loginResponseData: {},
    };
  },
  created() {},
  mounted() {
    this.login();
    this.getSelfInfo();
  },
  methods: {
    getSelfInfo() {
      Hu60Api.getSelfInfo().then((response) => {
        this.myUserInfo = response.data;
      });
    },
    login() {
      Hu60Api.login().then((response) => {
        this.loginResponseData = response.data;
      });
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