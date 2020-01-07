import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Button } from "vant";
import { Tabbar, TabbarItem } from "vant";
import { NavBar } from "vant";
import { Toast } from "vant";
import { List } from "vant";
import { Cell } from "vant";
import { Icon } from "vant";

Vue.use(Icon);
Vue.use(Cell);
Vue.use(List);
Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Button);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
