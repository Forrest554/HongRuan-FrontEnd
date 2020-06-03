import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
// import 'amfe-flexible' // 屏幕自适应

Vue.config.productionTip = false;
Vue.use(ViewUI)

import '../public/style/normalize.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
