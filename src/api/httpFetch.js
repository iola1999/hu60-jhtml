// import qs from 'qs';
const baseURL = process.env.NODE_ENV === 'production' ? '/q.php' : '/api';

const makeRequest = (url, data, method) => new Promise((resolve, reject) => {
	uni.request({
		url: baseURL + url,
		method: method,
		data: data,
		header: {},
	}).then(([error, response]) => {
		if (error) {
			// console.log('error', error)
			uni.showToast({
				title: error,
				icon: 'none',
				duration: 2000,
				position: 'bottom'
			});
			reject(error)
		} else {
			// console.log('response', response)
			if (response.statusCode > 299) {
				uni.showToast({
					title: response.data,
					icon: 'none',
					duration: 2000,
					position: 'bottom'
				});
				return;
			}
			// TOOD 这里还可以加一些全局的判断（如登陆状态），其实就是拦截器
			resolve(response)
		}
	});
})


class httpFetch {
	static get = (url, data) => makeRequest(url, data, 'GET')

	static post = (url, data) => makeRequest(url, data, 'POST')

	static put = (url, data) => makeRequest(url, data, 'PUT')

}


export default httpFetch;
