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

/**
 * 获取聊天室列表，其中第一项是最新发言聊天室
 * @returns {Promise}
 */
export const getChatRoomList = () => {
	const requestUrl = '/addin.chat.json';
	return httpFetch.get(requestUrl, {});
};

/**
 * 获取聊天室详细发言
 * @param {String} name 聊天室名称
 * @param {Number} page 第几页，默认是1
 * @returns {Promise}
 */
export const getChatroomMsg = (name, page = 1) => {
	const requestUrl = `/addin.chat.${name}.json?p=${page}`;
	return httpFetch.get(requestUrl, {});
};

/**
 * 获取帖子详情及回复
 * @param {Number} topic_id 帖子id
 * @param {Number} replyPageNumber 第几页，默认是1
 * @returns {Promise}
 */
export const getPostDetailAndReply = (topic_id, replyPageNumber = 1) => {
	const requestUrl = '/bbs.topic.' + topic_id + '.' + replyPageNumber + '.json';
	return httpFetch.get(requestUrl, {});
};

/**
 * 获取个人（本人）信息。设置回复楼层展示顺序也是这个接口
 * @returns {Promise}
 */
export const getSelfInfo = (floorReverse) => {
	let requestUrl = '';
	if (floorReverse === '0' || floorReverse === '1') {
		requestUrl = '/user.index.json?floorReverse=' + floorReverse;
	} else {
		requestUrl = '/user.index.json';
	}
	return httpFetch.get(requestUrl);
};

/**
 * 登录
 * @returns {Promise}
 */
export const login = (loginData) => {
	const requestUrl = '/user.login.json';
	return httpFetch.post(requestUrl, loginData);
};
