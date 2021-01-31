<template>
	<view class="user-content">
		<rich-text :nodes="formatRichText(htmlContent)"></rich-text>
	</view>
	<!-- SwipeAction at 他，帖子回复也是，后续继续封装 -->
</template>

<script>
	import formatMsgTime from '@/utils/formatMsgTime';

	export default {
		name: 'userContentRenderer',
		props: {
			htmlContent: String,
		},
		data() {
			return {}
		},
		computed: {},
		methods: {
			formatRichText(html) {
				// 去掉img标签里的style、width、height属性
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				// 修改所有style里的width属性为max-width:100%
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
					return match;
				});
				// 去掉<br/>标签
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				// img标签添加style属性：max-width:100%;height:auto
				// newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:0px auto;"');
				return newContent;
			}
		}
	};
</script>

<style lang="scss">
	.user-content {
		overflow: hidden;

		// .hu60_face 不清楚为什么没生效,拿index.scss去了
	}
</style>
