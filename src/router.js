import Vue from 'vue'
import Router from 'vue-router'
import { teamRouters } from './router/team'
import { companyRouters } from './router/company'
import { commonRouters } from './router/index'

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

Vue.use(Router)
let routerList = []
let userType = localStorage.getItem('userType')
// 企业和团队路由
let publiceRouters = [
  {
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
    component: Home
  },
  {
    path: '/orderTaking',
    name: 'OrderTaking',
    component: OrderTaking
  },
  {
    path: '/orderTakingDetail',
    name: 'OrderTakingDetail',
    component: OrderTakingDetail
  },
  {
    path: '/information',
    name: 'Information',
    component: Information
  },
  {
    path: '/informationDetail',
    name: 'InformationDetail',
    component: InformationDetail
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
// if (userType == 1) {
//   routerList.push(companyRouters)
// }
// else {
//   routerList.push(teamRouters)
// }
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
// 注册全局钩子用来拦截导航

export default routers
