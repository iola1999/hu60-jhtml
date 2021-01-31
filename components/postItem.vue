<template>
	<view class="post-item">
		<view class="post-title u-line-3">{{ onePostInfo.title }}</view>
		<view class="post-info">
			<img class="post-avatar" :src="avatarUrl" @error="handleAvatarError" />
			<span class="post-author-name">{{ onePostInfo.uinfo.name }}</span>
			<span class="post-forum-name">{{ onePostInfo.forum_name }}</span>
			<span class="post-lastactivetime">{{ lastActiveTime }}</span>
			<view class="comment-and-read">
				<img class="post-info-icon" src="@/static/assets/comment_count.png" />
				<span class="post-info-count">{{ onePostInfo.reply_count }}</span>
			</view>
			<view class="comment-and-read">
				<img class="post-info-icon" src="@/static/assets/read_count.png" />
				<span class="post-info-count">{{ onePostInfo.read_count }}</span>
			</view>
		</view>
	</view>
</template>

<script>
	import formatMsgTime from '@/utils/formatMsgTime';

	export default {
		name: 'postItem',
		props: {
			onePostInfo: {
				type: Object,
				default: () => null,
			},
		},
		data() {
			return {
				avatarUrl: 'http://file.hu60.cn/avatar/' + this.onePostInfo.uid + '.jpg'
			}
		},
		computed: {
			lastActiveTime() {
				return formatMsgTime(1000 * this.onePostInfo.mtime);
			},
		},
		methods: {
			handleAvatarError() {
				this.avatarUrl = "http://hu60.cn/upload/default.jpg"
			}
		}
	};
</script>

<style scoped lang="scss">
	.post-item {
		border-bottom: 1px solid #dddddd;
		padding: 10px;

		.post-title {
			margin-bottom: 2px;
			font-size: 16px;
			font-weight: 600;
		}

		.post-info {
			color: #777;
			font-size: small;
			vertical-align: middle;

			.post-avatar {
				width: 30px;
				height: 30px;
				// position: absolute;
				vertical-align: middle;
				border-radius: 15px;
			}

			.post-author-name {
				margin-left: 8px;
				vertical-align: middle;
			}

			.post-forum-name {
				border: 1px solid #dddddd;
				border-radius: 4px;
				margin-left: 8px;
				padding: 2px;
				vertical-align: middle;
			}

			.post-lastactivetime {
				margin-left: 8px;
				vertical-align: middle;
			}

			.comment-and-read {
				float: right;
				display: flex;
				margin-right: 8px;
				margin-top: 5px;

				.post-info-icon {
					width: 20px;
					height: 20px;
					margin-right: 2px;
				}

				.post-info-count {
					line-height: 20px;
				}
			}
		}
	}
</style>
