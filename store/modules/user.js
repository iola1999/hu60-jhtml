const getDefaultState = () => {
	return {
		userInfo: {}
	};
};

const state = getDefaultState();

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState());
	},
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo;
	},
};

const actions = {
	getCurrentLoginInfo({
		commit
	}) {
		console.log('查询用户信息')
		// 		commit('SET_MYDEVICES', response.data.result.data);
	},

};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
