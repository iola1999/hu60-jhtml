<script>
	import pageAnimation from './components/Michael-pageAnimationPlus'
	// 要去这个组件的 setting 维护页面层级
	export default {
		mixins: [pageAnimation],
		onLaunch: function() {
			this.$store.dispatch('user/getCurrentLoginInfo');
			// 似乎所有的@click都要改成@tap ？
		},
		onShow: function() {},
		onHide: function() {}
	};
</script>

<style lang="scss">
	@import "uView/uview-ui/index.scss";
	@import '@/styles/index.scss'; // V3 编译器在APP里不能js中导入css，改到这里
	@import '@/styles/github-markdown.css';

	// view,
	// scroll-view,
	// swiper,
	// swiper-item,
	// cover-view,
	// cover-image,
	// icon,
	// text,
	// rich-text,
	// progress,
	// button,
	// checkbox,
	// form,
	// input,
	// label,
	// radio,
	// slider,
	// switch,
	// textarea,
	// navigator,
	// audio,
	// camera,
	// image,
	// video {
	// 	box-sizing: border-box;
	// }
</style>
