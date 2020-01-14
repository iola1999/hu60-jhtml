<template>
  <div id="My">未登录</div>
</template>

<script>
import { scrollToLeavingPosition } from '@/mixins/scrollToLeavingPosition';

export default {
  name: 'My',
  mixins: [scrollToLeavingPosition],
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  watch: {},
};
</script>

<style scoped>
</style>