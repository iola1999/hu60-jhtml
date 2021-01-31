<template>
	<view class="post-main-floor">
		<u-row gutter="16">
			<u-col span="2">
				<view class="left-avatar">
					<userAvatar :userId="postDetailData.tMeta.uid" :picWidth="52" />
				</view>
			</u-col>
			<u-col span="10">
				<view class="right-info">
					<view class="info-line">{{postDetailData.tContents[0].uinfo.name}}</view>
					<view class="info-line">{{lastActiveTime}} · {{readCount}} 次点击，{{replyCount}} 条回复</view>
				</view>
			</u-col>
		</u-row>
		<view class="post-title"> {{postDetailData.tMeta.title}}</view>
		<userContentRenderer :htmlContent="postDetailData.tContents[0].content" class="main-floor-content-renderarea" />
	</view>
</template>

<script>
	import formatMsgTime from '@/utils/formatMsgTime';
	import userContentRenderer from './userContentRenderer'
	import userAvatar from './userAvatar'

	export default {
		name: 'postMainFloor',
		props: {
			postDetailData: Object,
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
				return formatMsgTime(1000 * (this.postDetailData.tContents[0].ctime));
			},
			readCount() {
				return this.postDetailData.tMeta.read_count
			},
			replyCount() {
				return this.postDetailData.floorCount - 1
			}
		},
		methods: {}
	};
</script>

<style lang="scss">
	.post-main-floor {
		border: 1px solid #dddddd;
		border-radius: 6px;
		margin-top: 8px;
		padding: 8px 4px;
		background-color: #f7f8fa;

		.left-avatar {
			height: 60px;
		}

		.right-info {
			height: 60px;

			.info-line {
				height: 30px;
			}
		}

		.post-title {
			font-size: 24px;
			font-weight: 800;
			padding: 2px 0 0 32px;
		}

		.main-floor-content-renderarea {
			// 主楼的内容渲染
			padding: 12px 0 12px 32px;
		}
	}
</style>
