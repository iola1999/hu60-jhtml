<template>
	<view class="page-content">
		<u-navbar :is-back="false" title="" :background="navbarBackground" :height="navbarHeight" class="nav-bar">
			<view class="chatroom-choose-wrap">
				<u-icon name="chat" color="#ffffff" size="34"></u-icon>
				<text class="chatroom-name-text">{{currentChatroomName}}</text>
				<u-icon name="arrow-down-fill" color="#ffffff" size="24"></u-icon>
			</view>
			<u-loading size="34" mode="flower" :show="isLoadingMsg" style="" class="navbar-loading"></u-loading>
			<view class="auto-refresh-control ">
				<u-switch v-model="isNeedAutoRefresh" active-color="#61e2b0" inactive-color="#d0daa5"></u-switch>自动刷新
			</view>
		</u-navbar>
		<view>
			<scroll-view :style='"height: " +scrollViewHeight+"px;"' scroll-y="true" :scroll-top="scrollTop" :upper-threshold="150"
			 @scrolltoupper="handleReachTop" @scrolltolower="handleReachBottom" @scroll="handleScroll">
				<view id="chatroomMsgScroll">
					<view v-for="msgItem in reverseChatMsgList" :key="msgItem.id" :ref="'msgItem'+msgItem.id">
						<chatroomMsgItem :msgItem="msgItem" />
					</view>
				</view>
			</scroll-view>
		</view>
		<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight -1"></u-top-tips>
		<addCommentBtn />

	</view>
</template>

<script>
	import {
		getChatRoomList,
		getChatroomMsg
	} from '@/api/hu60Api.js';
	import addCommentBtn from '@/components/addCommentBtn'
	import chatroomMsgItem from '@/components/chatroomMsgItem'
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
				isLoadingMsg: false,
				maxPage: 1, // 一共多少页
				totalMsgCount: 0,
				reverseChatMsgList: [],
				scrollViewHeight: 1200, // 这个必须指定高度，css没搞明白怎么计算，用js试试
				scrollTop: 0,
				scrollTopOld: 0, // 不是双向绑定的，要靠事件

				// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				// 导航栏内容区域高度，不包括状态栏高度在内
				navbarHeight: 50
			};
		},
		components: {
			addCommentBtn,
			chatroomMsgItem
		},
		onLoad() {
			// created
			this.getChatRoomList();
		},
		onReady() {
			// mounted
			const uniPageWrapper = document.getElementsByTagName("uni-page-wrapper")
			console.log(uniPageWrapper)
			if (uniPageWrapper[0]) {
				// 它的高度已经减去了底部tabbar，再减顶部自己的导航条即可
				this.scrollViewHeight = uniPageWrapper[0].offsetHeight - this.navbarHeight
			}

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
				if (this.isLoadingMsg) {
					return
				}
				// TODO 加载等待动画
				// 要记录下当前消息的总高度，翻页后滚动过去
				let firstMsgId, lastMsgId
				if (this.loadedPageCount !== 0) {
					firstMsgId = this.reverseChatMsgList[0].id
				}
				console.log('加载当前聊天室的消息')
				this.isLoadingMsg = true;
				const currentChatRoomInfo = (await getChatroomMsg(this.currentChatroomName, this.loadedPageCount + 1)).data
				this.loadedPageCount = currentChatRoomInfo.currPage
				this.maxPage = currentChatRoomInfo.maxPage
				this.totalMsgCount = currentChatRoomInfo.chatCount
				for (let i = 0; i < currentChatRoomInfo.chatList.length; i += 1) {
					this.reverseChatMsgList.unshift(currentChatRoomInfo.chatList[i])
				}
				this.isLoadingMsg = false;
				this.$refs.uTips.show({
					title: '加载第' + this.loadedPageCount + '页完成',
					type: 'success',
					duration: '2000'
				})
				const scrollToPosition = () => {
					if (this.loadedPageCount === 1) {
						this.scrollTo(99999) // 倒序展示的，初次加载时应该滚动到底部看最新的
					} else {
						// 翻页后滚动回去
						this.$refs['msgItem' + firstMsgId][0].$el.scrollIntoView()
					}
				}
				// 会受图片加载影响，导致定位不准。测试这种方式体验还行
				setTimeout(scrollToPosition, 20)
				setTimeout(scrollToPosition, 50)
				setTimeout(scrollToPosition, 120)
				setTimeout(scrollToPosition, 400)
				setTimeout(scrollToPosition, 1000)
			},
			handleReachTop() {
				console.log("handleReachTop")
				this.loadCurrentRoomMsg() // 下一页
				this.isNeedAutoRefresh = false; //有加载上一页的话就不自动刷新
			},
			handleReachBottom() {
				// console.log("handleReachBottom")
			},
			handleScroll(e) {
				// console.log("handleScroll")
				this.scrollTopOld = e.detail.scrollTop // 存一下，翻页时用
			},
			scrollTo(targetTop) {
				this.$nextTick(() => {
					this.scrollTop = this.scrollTopOld
					this.$nextTick(() => {
						this.scrollTop = targetTop
						// 否则可能遇到不生效的情况，看这里 https://uniapp.dcloud.io/vue-api?id=componentsolutions
					})
				})
			},
		},
		watch: {}
	};
</script>

<style lang="scss" scoped>
	.nav-bar {
		.chatroom-choose-wrap {
			display: flex;
			align-items: center;
			padding: 4px 6px;
			background-color: rgba(240, 240, 240, 0.35);
			color: #fff;
			font-size: 16px;
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
			font-size: 16px;
		}

		.navbar-loading {
			margin-left: 12px;
		}
	}

	.u-tip-show {
		z-index: 980 !important;
	}
</style>
