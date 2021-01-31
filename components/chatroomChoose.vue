<template>
	<view class="chatroom-choose-wrap">
		<u-icon name="chat" color="#ffffff" size="34"></u-icon>
		<text class="chatroom-name-text" @click="handleShowChatroomChoose">{{currentChatroomNameComputed}}</text>
		<u-icon name="arrow-down-fill" color="#ffffff" size="24" @click="handleShowChatroomChoose"></u-icon>

		<u-select v-model="isShowChatroomChoose" mode="single-column" :list="chatroomList" @confirm="handleChooseRoom"></u-select>
	</view>
</template>

<script>
	import {
		getChatRoomList,
		getChatroomMsg
	} from '@/api/hu60Api.js';
	import formatMsgTime from '@/utils/formatMsgTime';

	export default {
		name: 'userContentRenderer',
		props: {
			currentChatroomName: String,
		},
		data() {
			return {
				isShowChatroomChoose: false,
				chatroomList: [], // 全部聊天室列表，第一项（最新发言）是默认展示的。另外 没做新建聊天室（即手动输入名称进入聊天室）
			}
		},
		computed: {
			currentChatroomNameComputed: {
				get() {
					return this.currentChatroomName
				},
				set(value) {
					this.$emit('on-room-change', value)
				}
			}
		},
		created() {
			this.getChatRoomList();
		},
		methods: {
			async getChatRoomList() {
				console.log('getChatRoomList')
				// 聊天室列表，其中第一项是最新发言的，默认展示它
				const roomList = (await getChatRoomList()).data.chatRomList
				this.chatroomList = roomList.map((item) => ({
					value: item.name,
					label: item.name + '  ' + formatMsgTime(1000 * item.ztime),
					...item
				}))
				if (roomList.length > 0) {
					this.currentChatroomNameComputed = roomList[0].name;
				}
			},
			handleShowChatroomChoose() {
				console.log('handleShowChatroomChoose')
				this.isShowChatroomChoose = true
			},
			handleChooseRoom(newValue) {
				console.log(newValue)
				this.currentChatroomNameComputed = newValue[0].value
			}
		}
	};
</script>

<style lang="scss">
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
</style>
