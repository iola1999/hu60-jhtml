import httpFetch from '@/api/httpFetch';
// import store from "@/store";

/**
 * 获取首页帖子列表
 * @param {Number} pageNumber 首页第几页
 * @returns {Promise}
 */
export const listNewPosts = (pageNumber) => {
  const requestUrl = '/index.index.json';
  const params = {
    p: pageNumber,
  };
  return httpFetch.get(requestUrl, { params });
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
 * @param {Number} replyPageNumber 第几页，默认是1
 * @returns {Promise}
 */
export const room = (name, page = 1) => {
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
 * 获取个人（本人）信息
 * @returns {Promise}
 */
export const getSelfInfo = () => {
  const requestUrl = '/user.index.json';
  // const requestUrl = '/tools.ua.html'; // 用于测试 devServer 的代理结果
  // user.index.json 接口的返回表明似乎没能正确传递 cookie，但是看 tools.ua.json 的响应是有 cookie 的，或许应该考虑开发过程中换一种跨域方式（如 nginx）（线上无此问题）
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
