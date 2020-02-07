import Vue from 'vue'
import Router from 'vue-router'
import {
  Message
} from 'element-ui';
import {
  teamRouters
} from './router/team'
import {
  companyRouters
} from './router/company'
import About from './views/About.vue'
import store from './store'
const Home = resolve => (require(['./views/Home.vue'], resolve))
const login = resolve => (require(['./views/Login.vue'], resolve))
const ForgetPassword = resolve => (require(['./views/ForgetPassword.vue'], resolve))
const register = resolve => (require(['./views/register.vue'], resolve)) // 注册页
const OrderTaking = resolve => (require(['./views/OrderTaking.vue'], resolve))
const OrderTakingDetail = resolve => (require(['./views/OrderTakingDetail.vue'], resolve)) // 接单详情
const Information = resolve => (require(['./views/Information.vue'], resolve)) // 资讯
const InformationDetail = resolve => (require(['./views/InformationDetail.vue'], resolve)) //  资讯详情
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)
// 企业和团队路由
let publiceRouters = [{
    path: '/',
    redirect: 'login',
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: 1
    }
  },
  {
    path: '/orderTaking',
    name: 'OrderTaking',
    component: OrderTaking,
    meta: {
      requiresAuth: 1
    }
  },
  {
    path: '/orderTakingDetail',
    name: 'OrderTakingDetail',
    component: OrderTakingDetail,
    meta: {
      requiresAuth: 1
    }
  },
  {
    path: '/information',
    name: 'Information',
    component: Information,
    meta: {
      requiresAuth: 1
    }
  },
  {
    path: '/informationDetail',
    name: 'InformationDetail',
    component: InformationDetail,
    meta: {
      requiresAuth: 1
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: ForgetPassword
  }
]
let routers = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...publiceRouters]
})
let router = []
router.push(companyRouters)
router.push(teamRouters)
router = [...router]
// 4.将生成好的路由addRoutes
routers.addRoutes(router)
routers.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    if (to.meta.requiresAuth) {
      next({
        path: '/login'
      })
      Message.warning('请先登录')
    } else {
      next()
    }
  }
})
routers.afterEach(route => {
  window.scroll(0, 0)
})
export default routers