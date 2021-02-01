<template>
	<view class="user-content">
		<!-- <rich-text :nodes="formatRichText(htmlContent)"></rich-text> -->
		<view v-html="formatRichText(htmlContent)"></view>
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
		created() {
			// TODO 放这里处理合适吗？
			window.atAdd = (a, b) => {
				console.log(a, b)
			}
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
				newContent = newContent.replace(/<video[^>]*>/gi, function(match, capture) {
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
				newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;"');
				newContent = newContent.replace(/\<video/gi, '<video style="max-width:100%;height:auto;"');
				// display:block;margin:0px auto; 会导致行内的表情也块级

				// 对于链接，应该考虑的处理方式？
				// <a href="javascript:void(0);" onclick="handleClickHtmlUrl(原链接)">
				// handleClickHtmlUrl 注意 特殊处理原链接为 # 的
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
