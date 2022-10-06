import Vue from "vue";
// import App from "./App.vue";
import LayoutView from "./LayoutView.vue";
import router from "./router";
import store from "./store";
import "./assets/common.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(LayoutView),
}).$mount("#app");
