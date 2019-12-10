import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import moment from 'moment'

// 引入阿里普惠体
import './assets/fontsize/fontsizea.css'
// 引入阿里图标库
import './assets/css/f1/iconfont.css'
// 引入阿里图标库
import './assets/css/f2/iconfont.css'
import './assets/css/init.css'
import './assets/css/element-variables.scss'
// 引入axios
import axios from './axios'
Vue.prototype.$http = axios
Vue.prototype.$moment = moment

//引入markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

Vue.config.productionTip = false

// 注册element-ui
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
