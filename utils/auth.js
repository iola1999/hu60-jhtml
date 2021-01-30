const TokenKey = 'hu60-jhtml'

export function getToken() {
	try {
		return uni.getStorageSync(TokenKey);
	} catch (e) {
		return undefined
	}
}

export function setToken(token) {
	try {
		uni.setStorageSync(TokenKey, token);
	} catch (e) {
		// error
	}
}

export function removeToken() {
	try {
		uni.removeStorageSync(TokenKey);
	} catch (e) {
		// error
	}
}
