<template>
  <div class="PostDetail">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="search" slot="right" />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "PostDetail",
  components: {},
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$toast("返回");
      this.$router.go(-1);
    },
    onClickRight() {
      this.$toast("按钮");
    }
  }
};
</script>
