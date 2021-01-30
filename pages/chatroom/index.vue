<template>
	<view class="page-content">
		<u-navbar :is-back="false" title="" :background="navbarBackground" :height="60">
			<view class="chatroom-choose-wrap">
				<u-icon name="chat" color="#ffffff" size="34"></u-icon>
				<text class="chatroom-name-text">{{currentChatroomName}}</text>
				<u-icon name="arrow-down-fill" color="#ffffff" size="24"></u-icon>
			</view>
			<view class="auto-refresh-control ">
				<u-switch v-model="isNeedAutoRefresh" active-color="#61e2b0" inactive-color="#d0daa5"></u-switch>自动刷新
			</view>
		</u-navbar>
		<view>
			<!-- 应该反序？向上滚动，再排查一下为什么滚动刷新无法触发。 -->
			<view v-for="msgItem in chatMsgList" :key="msgItem.id">
				<!-- SwipeAction at 他，帖子回复也是 -->
				<p> {{msgItem.uinfo.name}}</p>
				<view style="width: 100%;">
					<rich-text :nodes="msgItem.content"></rich-text>
				</view>
				<hr>
			</view>
		</view>
		<!-- 下面这两个view拆分成组件 -->
		<view class="fab-container">
			<!-- 发言的输入框用一个悬浮按钮，点击后弹窗。 -->
			<u-icon name="edit-pen" color="#ffffff" size="64" @click="isShowChatroomInputMsgbox = true"></u-icon>
		</view>
		<u-popup v-model="isShowChatroomInputMsgbox" mode="bottom" height="500px">
			<view>输入框，这个应该跟回帖的复用</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getChatRoomList,
		getChatroomMsg
	} from '@/api/hu60Api.js';
	export default {
		data() {
			return {
				navbarBackground: {
					backgroundColor: '#53b1a8',
					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				isNeedAutoRefresh: true, // 用watch处理
				currentChatroomName: '',
				chatroomList: [], // 全部聊天室列表，第一项（最新发言）是默认展示的。另外 没做新建聊天室（即手动输入名称进入聊天室）

				loadedPageCount: 0, // 已加载的聊天室消息页数
				maxPage: 1, // 一共多少页
				totalMsgCount: 0,
				chatMsgList: [],

				isShowChatroomInputMsgbox: false
			};
		},
		components: {},
		onLoad() {
			// created
			this.getChatRoomList();
		},
		onReady() {
			// mounted
		},
		computed: {},
		methods: {
			async getChatRoomList() {
				// 聊天室列表，其中第一项是最新发言的，默认展示它
				const roomList = (await getChatRoomList()).data.chatRomList
				if (roomList.length > 0) {
					this.currentChatroomName = roomList[0].name;
					this.loadCurrentRoomMsg()
				}
			},
			async loadCurrentRoomMsg() {
				console.log('加载当前聊天室的消息')
				const currentChatRoomInfo = (await getChatroomMsg(this.currentChatroomName, this.loadedPageCount)).data
				this.loadedPageCount = currentChatRoomInfo.currPage
				this.maxPage = currentChatRoomInfo.maxPage
				this.totalMsgCount = currentChatRoomInfo.chatCount
				this.chatMsgList.push(...currentChatRoomInfo.chatList);
			},
		},
		watch: {}
	};
</script>

<style lang="scss">
	.chatroom-choose-wrap {
		display: flex;
		align-items: center;
		padding: 4px 6px;
		background-color: rgba(240, 240, 240, 0.35);
		color: #fff;
		font-size: 18px;
		border-radius: 100rpx;
		margin-left: 30rpx;

		.chatroom-name-text {
			padding: 0 12rpx;
		}
	}

	.auto-refresh-control {
		display: flex;
		align-items: center;
		position: absolute;
		right: 12px;
		color: #fff;
		font-size: 18px;

	}

	.fab-container {
		position: fixed;
		justify-content: center;
		align-items: center;
		z-index: 10;
		height: 60px;
		width: 60px;
		right: 30px;
		border-radius: 30px;
		bottom: 70px;
		padding: 10px;
		background-color: #006fff;

		image {
			z-index: 11;
			width: 30px;
			height: 30px;
		}
	}

	.fab-container:active {
		border: 1px solid #006fff;
	}
</style>
