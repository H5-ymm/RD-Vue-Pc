import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'babel-polyfill';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/init.css';
import './assets/css/element-variables.scss';
import 'default-passive-events'
import router from './router'
import store from './store'
import axios from './axios'
import moment from 'moment'
// 引入axios
Vue.prototype.$moment = moment
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// Vue.prototype.$store = store

// 注册element-ui
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')