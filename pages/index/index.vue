<template>
	<view class="page-content">home
		<u-button type="primary">主要按钮</u-button>
	</view>
</template>

<script>
	import {
		getToken,
		setToken,
		removeToken
	} from '@/utils/auth';
	import {
		listNewPosts
	} from '@/api/hu60Api.js';
	export default {
		components: {},
		data() {
			return {};
		},
		computed: {},
		onLoad() {},
		onShow() {
			listNewPosts()
		},
		onHide() {},
		onReady() {},
		methods: {}
	};
</script>

<style lang="scss"></style>
