import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./assets/icons/iconfont.css";
import "./assets/css/comm.css";
import "./assets/iconsSvg/index";
import axios from "./utils/http";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  //获取token
  const token = localStorage.jwtToken ? true : false;
  if (to.path === "/login" || to.path === "/register" || to.path === "/") {
    next();
  } else {
    token ? next() : next("/login");
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
