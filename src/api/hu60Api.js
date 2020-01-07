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
 * 获取帖子详情及回复
 * @param {Number} topic_id 帖子id
 * @param {Number} replyPageNumber 第几页，默认是1
 * @returns {Promise}
 */
export const getPostDetailAndReply = (topic_id, replyPageNumber = 1) => {
  const requestUrl = '/bbs.topic.' + topic_id + '.' + replyPageNumber + '.json';
  return httpFetch.get(requestUrl, {});
};
