<template>
	<view class="user-content-item">
		楼主的内容，展示帖子信息、内容
		<userContentRenderer :htmlContent="msgItem.content" class="user-content-renderarea" />
	</view>
</template>

<script>
	import formatMsgTime from '@/utils/formatMsgTime';
	import userContentRenderer from './userContentRenderer'

	export default {
		name: 'postMainFloor',
		props: {
			msgItem: Object,
		},
		components: {
			userContentRenderer
		},
		data() {
			return {
				avatarUrl: 'http://file.hu60.cn/avatar/' + this.msgItem.uid + '.jpg'
			}
		},
		computed: {
			lastActiveTime() {
				return formatMsgTime(1000 * this.msgItem.time);
			},
		},
		methods: {
			handleAvatarError() {
				this.avatarUrl = "http://hu60.cn/upload/default.jpg"
			},
		}
	};
</script>

<style lang="scss">
	.user-content-item {
		// 该item
		border-bottom: 1px solid #dddddd;
		padding: 10px 6px;

		.user-content-renderarea {
			// 发言内容
			padding: 12px 0 12px 32px;
		}

		.user-content-info {
			color: #777;
			font-size: small;
			vertical-align: middle;

			.user-content-avatar {
				width: 30px;
				height: 30px;
				vertical-align: middle;
				border-radius: 15px;
			}

			.user-content-author-name {
				margin-left: 8px;
				vertical-align: middle;
			}

			.user-content-lastactivetime {
				margin-left: 8px;
				vertical-align: middle;
			}

			.user-content-info-right {
				float: right;
				display: flex;
				margin-right: 8px;
				margin-top: 5px;

				.user-content-floor {
					line-height: 20px;
				}
			}
		}
	}
</style>
