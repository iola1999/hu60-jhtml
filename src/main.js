import Vue from 'vue'
import App from './App'

import uView from 'uview-ui';
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

import store from './store';
Vue.prototype.$store = store

const app = new Vue({
	...App
})
app.$mount()
