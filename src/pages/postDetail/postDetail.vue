<template>
	<view class="page-content post-detail">
		<u-navbar :title="postDetailData.fName" :background="navbarBackground" :height="navbarHeight" class="nav-bar">
			<view slot="right">
				<u-icon name="list" style="margin-right: 8px" />
			</view>
		</u-navbar>
		<view>
			<postMainFloor :postDetailData="postDetailData" v-if="loadedPageCount>0" />
			<view class="reply-floor-warper" v-if="loadedPageCount>0">
				<userContentItem v-for="replyItem in postDetailData.tContents.slice(1)" :key="replyItem.id" :contentItem="replyItem" />
			</view>
			<u-loadmore :status="loadMoreStatus" icon-type="flower" bg-color="transperant" margin-top="30" margin-bottom="30" />
		</view>
		<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight -1"></u-top-tips>
		<addCommentBtn />
	</view>
</template>

<script>
	import {
		getPostDetailAndReply
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
					fName: '',
					tMeta: {
						uid: 1,
						title: "",
						"read_count": 0,
					},
					floorCount: 1,
					maxPage: 1,
					tContents: [{
						ctime: 0,
						uid: 1,
						uinfo: {
							name: ""
						},
						content: ''
					}]
				}, // 帖子的请求结果

				loadedPageCount: 0,

				loadMoreStatus: 'loading', // loadmore	loading / nomore

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
		onLoad(option) {
			// created
			this.loadContentAndReply()
		},
		onReady() {
			// mounted
		},
		onHide() {
			console.log('onHide')
		},
		onShow() {
			console.log('onShow')
		},
		onUnload() {

		},
		onReachBottom() {
			console.log('onReachBottom');
			if (this.loadMoreStatus === 'loadmore') {
				this.loadContentAndReply()
			}
		},
		computed: {},
		methods: {
			async loadContentAndReply() {
				this.loadMoreStatus = "loading"
				const postDetail = (await getPostDetailAndReply(this.$route.query.topic_id, this.loadedPageCount + 1)).data
				this.loadedPageCount += 1;
				if (this.loadedPageCount === 1) {
					this.postDetailData = postDetail;
				} else {
					// 拼接回复列表
					this.postDetailData.tContents.push(...postDetail.tContents);
				}
				if (this.loadedPageCount === this.postDetailData.maxPage) {
					// 无更多页
					this.loadMoreStatus = "nomore"
				} else {
					this.loadMoreStatus = 'loadmore'
				}
			},
		},
		watch: {

		}
	};
</script>

<style lang="scss" scoped>
	.post-detail {
		background-color: #e6e5ea;

		.nav-bar {}

		.reply-floor-warper {
			margin-top: 8px;
			border: 1px solid #dddddd;
			border-radius: 6px;
			background-color: #f7f8fa;
		}
	}
</style>
