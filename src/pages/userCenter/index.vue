<template>
	<view class="page-content">个人中心 WIP</view>
</template>

<script>
	import {
		loadUserInfo
	} from '@/api/hu60Api.js';
	export default {
		components: {},
		data() {
			return {};
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo;
			},
		},
		onLoad() {},
		onShow() {},
		onReady() {},
		methods: {}

	};
</script>

<style lang="scss"></style>
