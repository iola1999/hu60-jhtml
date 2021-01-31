<template>
	<view class="page-content post-detail">
		<u-navbar title="" :background="navbarBackground" :height="navbarHeight" class="nav-bar">
			<view slot="right">右边放个三横线</view>
		</u-navbar>
		<view>
			<postMainFloor :postDetailData="postDetailData" />
			<scroll-view :style='"height: " +scrollViewHeight+"px;"' scroll-y="true" @scrolltolower="handleReachCommentBottom">
				<!-- <userContentItem v-for="msgItem in reverseChatMsgList" :key="msgItem.id" :msgItem="msgItem" :ref="'msgItem'+msgItem.id" /> -->
			</scroll-view>
		</view>
		<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight -1"></u-top-tips>
		<addCommentBtn />
	</view>
</template>

<script>
	import {
		getChatroomMsg
	} from '@/api/hu60Api.js';
	import addCommentBtn from '@/components/addCommentBtn'
	import userContentItem from '@/components/userContentItem'
	import postMainFloor from '@/components/postMainFloor'
	export default {
		data() {
			return {
				navbarBackground: {
					backgroundColor: '#53b1a8',
				},
				postDetailData: {
					tContents: []
				}, // 帖子的请求结果

				loadedPageCount: 0,

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
			userContentItem,
			postMainFloor
		},
		onLoad() {
			// created
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
		onHide() {
			console.log('onHide')
		},
		onShow() {
			console.log('onShow')
		},
		onUnload() {

		},
		computed: {},
		methods: {
			async loadContentAndReply() {
				const postDetail = (await getPostDetailAndReply(this.$route.query.topic_id, this.loadedPageCount + 1)).data
				this.loadedPageCount += 1;
				if (this.loadedPageCount === 1) {
					this.postDetailData = postDetail;
				} else {
					// 拼接回复列表
					this.postDetailData.tContents.push(...response.data.tContents);
				}
			},
			handleReachCommentBottom() {

			}
		},
		watch: {

		}
	};
</script>

<style lang="scss" scoped>
	.post-detail {
		.nav-bar {}

		.u-tip-show {
			z-index: 980 !important;
		}
	}
</style>
