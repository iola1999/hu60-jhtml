<template>
	<view class="chatroom-msg-item">
		<view class="chatroom-msg-info">
			<img class="chatroom-msg-avatar" :src="avatarUrl" @error="handleAvatarError" />
			<span class="chatroom-msg-author-name">{{ msgItem.uinfo.name }}</span>
			<span class="chatroom-msg-lastactivetime">{{ lastActiveTime }}</span>

			<view class="chatroom-msg-info-right">
				<span class="chatroom-msg-floor">#{{ msgItem.lid }}</span>
			</view>
		</view>
		<userContentRenderer :htmlContent="msgItem.content" class="chatroom-msg-content" />
	</view>
</template>

<script>
	import formatMsgTime from '@/utils/formatMsgTime';
	import userContentRenderer from './userContentRenderer'

	export default {
		name: 'chatroom-msgItem',
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
			formatRichText(html) {
				// 去掉img标签里的style、width、height属性
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				// 修改所有style里的width属性为max-width:100%
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
					return match;
				});
				// 去掉<br/>标签
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				// img标签添加style属性：max-width:100%;height:auto
				// newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:0px auto;"');
				return newContent;
			}
		}
	};
</script>

<style lang="scss">
	.chatroom-msg-item {
		border-bottom: 1px solid #dddddd;
		padding: 10px;

		.chatroom-msg-content {
			padding: 12px 0 12px 32px;
		}

		.chatroom-msg-info {
			color: #777;
			font-size: small;
			vertical-align: middle;

			.chatroom-msg-avatar {
				width: 30px;
				height: 30px;
				vertical-align: middle;
				border-radius: 15px;
			}

			.chatroom-msg-author-name {
				margin-left: 8px;
				vertical-align: middle;
			}

			.chatroom-msg-lastactivetime {
				margin-left: 8px;
				vertical-align: middle;
			}

			.chatroom-msg-info-right {
				float: right;
				display: flex;
				margin-right: 8px;
				margin-top: 5px;

				.chatroom-msg-floor {
					line-height: 20px;
				}
			}
		}
	}
</style>
