import httpFetch from "@/api/httpFetch";
// import store from "@/store";

/**
 * 现货委托
 * @returns {Promise} 委托结果
 */
export const listNewPosts = pageNumber => {
  const requestUrl = "/index.index.json";
  const params = {
    p: pageNumber
  };
  return httpFetch.get(requestUrl, { params });
};

export const chatList = () => {
  const requestUrl = "/addin.chat.json";
  return httpFetch.get(requestUrl, {});
};

export const room = (name, page) => {
  const requestUrl = `/addin.chat.${name}.json?p=${page}`;
  return httpFetch.get(requestUrl, {});
};