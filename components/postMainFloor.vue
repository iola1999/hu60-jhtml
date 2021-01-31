<template>
	<view class="post-main-floor">
		<!-- 楼主的内容，展示帖子信息、内容 -->
		{{postDetailData.tMeta.title}}
		<userAvatar :userId="postDetailData.tMeta.uid" />
		{{postDetailData.tContents[0].uinfo.name}}
		<userContentRenderer :htmlContent="postDetailData.tContents[0].content" class="user-content-renderarea" />
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
				return formatMsgTime(1000 * this.msgItem.time);
			},
		},
		methods: {}
	};
</script>

<style lang="scss">
	.post-main-floor {
		border: 1px solid #dddddd;
		border-radius: 4px;
		margin-top: 2px;
		padding: 8px 4px;
	}
</style>
