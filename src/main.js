import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import moment from 'moment'
import './assets/css/init.css';
import './assets/css/element-variables.scss';
// 引入axios
Vue.prototype.$moment = moment
Vue.config.productionTip = false

// 注册element-ui
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
