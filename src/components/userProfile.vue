<template>
  <div id="userProfile">
    <div class="user-avatar">
      <img
        :src="'http://qiniu.img.hu60.cn/avatar/' + userInfo.uid + '.jpg'"
        onerror="onerror=null;src='https://hu60.net/upload/default.jpg'"
      />
    </div>
    <div class="user-profile">
      <van-cell-group>
        <van-cell title="uid" :value="userInfo.uid" />
        <van-cell title="昵称" :value="userInfo.name" />
        <van-cell title="发表的帖子" is-link to="todo000000" />
        <van-cell title="发表的回复" is-link to="todo111111" />
      </van-cell-group>
      <van-cell-group v-if="isSelf">
        <van-cell title="回复楼层排序" label="左边正序，右边倒序">
          <van-switch v-model="floorReverseShow" :loading="isSwitchLoading" />
        </van-cell>
        <!-- 其他前端设置，如主题？ -->
      </van-cell-group>
      {{ userInfo }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'userProfile',
  data() {
    return {
      isSwitchLoading: false, // watch userInfo，变化后置非
    };
  },
  props: {
    userInfo: {
      type: Object,
      default: () => null,
    },
    isSelf: {
      // 是否是浏览自己的资料
      type: Boolean,
      default: false,
    },
  },
  computed: {
    floorReverseShow: {
      get() {
        console.log('get');
        return this.userInfo.floorReverse;
      },
      set(value) {
        // switch 转圈
        this.isSwitchLoading = true;
        this.$emit('refresh-self-user-info', value ? '1' : '0');
      },
    },
  },
  methods: {},
  created() {},
  watch: {
    userInfo: {
      handler() {
        // 设置回复楼层展示顺序，转圈，emit要求更新信息，watch到变化停止转圈
        this.isSwitchLoading = false;
      },
      immediate: false,
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
#userProfile {
  .user-avatar {
    text-align: center;
    margin: 30px 0 15px 0;
    img {
      width: 80px;
      height: 80px;
      border-radius: 40px;
    }
  }
  .user-profile {
    padding: 8px;
  }
}
</style>
