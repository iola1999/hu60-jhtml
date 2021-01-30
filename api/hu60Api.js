import httpFetch from '@/api/httpFetch';
// import store from "@/store";

/**
 * 获取首页帖子列表
 * @param {Number} pageNumber 首页第几页
 * @returns {Promise}
 */
export const listNewPosts = (pageNumber = 1) => {
	const requestUrl = '/index.index.json';
	const params = {
		p: pageNumber,
	};
	return httpFetch.get(requestUrl, params);
};
