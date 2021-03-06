import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import store from "./store/index";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(require("vue-moment"));

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
