<template>
	<img class="user-avatar" :src="avatarUrl" @error="handleAvatarError" />
</template>

<script>
	export default {
		name: 'userAvatar',
		props: {
			userId: Number,
		},
		components: {},
		data() {
			return {
				avatarUrl: 'http://file.hu60.cn/avatar/' + this.userId + '.jpg'
			}
		},
		computed: {},
		methods: {
			handleAvatarError() {
				this.avatarUrl = "http://hu60.cn/upload/default.jpg"
			},
		}
	};
</script>

<style lang="scss">
	.user-avatar {
		width: 30px;
		height: 30px;
		vertical-align: middle;
		border-radius: 15px;
	}
</style>
