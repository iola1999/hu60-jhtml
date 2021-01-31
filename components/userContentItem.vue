<template>
	<view class="user-content-item">
		<view class="user-content-info">
			<userAvatar :userId="contentItem.uid" />
			<span class="user-content-author-name">{{ contentItem.uinfo.name }}</span>
			<span class="user-content-lastactivetime">{{ lastActiveTime }}</span>

			<view class="user-content-info-right">
				<span class="user-content-floor">#{{ contentItem.lid||contentItem.floor }}</span>
			</view>
		</view>
		<userContentRenderer :htmlContent="contentItem.content" class="user-content-renderarea" />
	</view>
</template>

<script>
	import formatMsgTime from '@/utils/formatMsgTime';
	import userContentRenderer from './userContentRenderer'
	import userAvatar from './userAvatar'

	export default {
		name: 'user-contentItem',
		props: {
			contentItem: Object,
		},
		components: {
			userContentRenderer,
			userAvatar
		},
		data() {
			return {}
		},
		computed: {
			lastActiveTime() {
				return formatMsgTime(1000 * (this.contentItem.time || this.contentItem.ctime));
			},
		},
		methods: {}
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
