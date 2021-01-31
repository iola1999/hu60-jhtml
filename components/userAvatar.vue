<template>
	<img class="user-avatar" :src="avatarUrl" @error="handleAvatarError" :style="styleObj" />
</template>

<script>
	export default {
		name: 'userAvatar',
		props: {
			userId: Number,
			picWidth: {
				type: Number,
				default: 30,
			}
		},
		components: {},
		data() {
			return {
				avatarUrl: 'http://file.hu60.cn/avatar/' + this.userId + '.jpg'
			}
		},
		computed: {
			styleObj() {
				return {
					height: this.picWidth + 'px',
					width: this.picWidth + 'px',
					'border-radius': this.picWidth / 2 + 'px',
					'vertical-align': 'middle'
				}
			}
		},
		methods: {
			handleAvatarError() {
				this.avatarUrl = "http://hu60.cn/upload/default.jpg"
			},
		}
	};
</script>

<style lang="scss">
	// .user-avatar {
	// 	width: 30px;
	// 	height: 30px;
	// 	border-radius: 15px;
	// 	vertical-align: middle;
	// }
</style>
