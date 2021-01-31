<template>
	<view class="post-item" @click.native="handleClickPost">
		<view class="post-title u-line-3">{{ onePostInfo.title }}</view>
		<view class="post-info">
			<userAvatar :userId="onePostInfo.uid" />
			<span class="post-author-name">{{ onePostInfo.uinfo.name }}</span>
			<span class="post-forum-name">{{ onePostInfo.forum_name }}</span>
			<span class="post-lastactivetime">{{ lastActiveTime }}</span>
			<view class="post-info-rightslot">
				<img class="post-info-icon" src="@/static/assets/read_count.png" />
				<span class="post-info-text">{{ onePostInfo.read_count }}</span>
				<img class="post-info-icon" src="@/static/assets/comment_count.png" />
				<span class="post-info-text">{{ onePostInfo.reply_count }}</span>
			</view>
		</view>
	</view>
</template>

<script>
	import formatMsgTime from '@/utils/formatMsgTime';
	import userAvatar from './userAvatar'

	export default {
		name: 'postItem',
		props: {
			onePostInfo: {
				type: Object,
				default: () => null,
			},
		},
		components: {
			userAvatar
		},
		data() {
			return {}
		},
		computed: {
			lastActiveTime() {
				return formatMsgTime(1000 * this.onePostInfo.mtime);
			},
		},
		methods: {
			handleClickPost() {
				console.log('进入帖子：', this.onePostInfo)
				uni.navigateTo({
					url: '/pages/postDetail/postDetail?topic_id=' + this.onePostInfo.topic_id
				});
			},
		}
	};
</script>

<style scoped lang="scss">
	.post-item {
		border-bottom: 1px solid #dddddd;
		padding: 10px;

		.post-title {
			margin-bottom: 6px;
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

			.post-info-rightslot {
				float: right;
				display: flex;
				margin-right: -20px;
				margin-top: 5px;

				.post-info-icon {
					width: 20px;
					height: 20px;
					margin-right: 2px;
				}

				.post-info-text {
					line-height: 20px;
					width: 35px;
					text-align: left;
				}
			}
		}
	}
</style>
