<template>
	<view class="add-comment-btn">
		<!-- 下面这两个view拆分成组件 -->
		<view class="fab-container">
			<!-- 发言的输入框用一个悬浮按钮，点击后弹窗。 -->
			<u-icon name="edit-pen" color="#ffffff" size="60" @click="isShowChatroomInputMsgbox = true"></u-icon>
		</view>
		<u-popup v-model="isShowChatroomInputMsgbox" mode="bottom" height="500px">
			<view>输入框，这个应该跟回帖的复用</view>
		</u-popup>
	</view>
</template>

<script>
	import formatMsgTime from '@/utils/formatMsgTime';

	export default {
		name: 'addCommentBtn',
		props: {},
		data() {
			return {
				isShowChatroomInputMsgbox: false
			}
		},
		computed: {},
		methods: {}
	};
</script>

<style scoped lang="scss">
	.add-comment-btn {
		.fab-container {
			position: fixed;
			justify-content: center;
			align-items: center;
			z-index: 10;
			height: 100rpx;
			width: 100rpx;
			border-radius: 50rpx;
			right: 30px;
			bottom: 70px;
			padding: 20rpx;
			background-color: #006fff;
			opacity: 0.3;
		}

		.fab-container:active {
			border: 1px solid #006fff;
			opacity: 1;
		}
	}
</style>
