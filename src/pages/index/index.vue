<template>
	<view class="page-content">
		<postItem v-for="postItem in postList" :key="postItem.topic_id" :onePostInfo="postItem" />
		<u-loadmore v-show="loadedPageCount>0" :status="loadMoreStatus" icon-type="flower" bg-color="transperant" margin-top="30"
		 margin-bottom="30" />
	</view>
</template>

<script>
	import {
		listNewPosts
	} from '@/api/hu60Api.js';
	import postItem from '@/components/postItem'
	export default {
		components: {
			postItem
		},
		data() {
			return {
				postList: [],
				loadedPageCount: 0, // 首页已加载的帖子数量。后面也可以考虑将这个组件拆分用于展示搜索结果之类的？
				loadMoreStatus: 'loading', // loadmore	loading / nomore
			};
		},
		computed: {},
		onLoad() {
			// created
			this.loadPostList();
		},
		onReady() {
			// mounted
		},
		onPullDownRefresh() {
			// 没有生效，原因待排查
			console.log('refresh');
			this.initMainPageStatus()
			this.loadPostList()
		},
		onReachBottom() {
			console.log('onReachBottom');
			if (this.loadMoreStatus === 'loadmore') {
				this.loadPostList()
			}
		},
		methods: {
			async loadPostList() {
				this.loadMoreStatus = 'loading'
				const loadPostRes = (await listNewPosts(this.loadedPageCount + 1)).data
				uni.stopPullDownRefresh();
				if (loadPostRes.newTopicList.length === 0) {
					this.loadMoreStatus = 'nomore';
				} else {
					this.loadMoreStatus = 'loadmore'
					this.postList.push(...loadPostRes.newTopicList);
					this.loadedPageCount += 1;
				}
			},
			initMainPageStatus() {
				this.postList = []
				this.loadedPageCount = 0
				this.loadMoreStatus = 'loading'
			}
		}
	}
</script>

<style lang="scss"></style>
