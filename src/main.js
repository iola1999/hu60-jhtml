import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/hu60web.css'; // 虎绿林网页版的部分样式
import './style/github-markdown.css'; // 虎绿林对 markdown 的支持

import { Button } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { NavBar } from 'vant';
import { Toast } from 'vant';
import { List } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Icon } from 'vant';
import { PullRefresh } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Loading } from 'vant';
import { Notify } from 'vant';
import { Field } from 'vant';
import { Col, Row } from 'vant';
import { Picker } from 'vant';
import { Popup } from 'vant';

Vue.use(Popup);
Vue.use(Picker);
Vue.use(Col);
Vue.use(Row);
Vue.use(Field);
Vue.use(Notify);
Notify.setDefaultOptions({ duration: 1500 });
Vue.use(Loading);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(PullRefresh);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);
Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Button);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
