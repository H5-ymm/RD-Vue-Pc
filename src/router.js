import Vue from 'vue'
import Router from 'vue-router'
import { teamRouters } from './router/team'
import { companyRouters } from './router/company'
import About from './views/About.vue'
const Home = resolve => (require(['./views/Home.vue'], resolve))
const login = resolve => (require(['./views/Login.vue'], resolve))
const ForgetPassword = resolve => (require(['./views/ForgetPassword.vue'], resolve))
const register = resolve => (require(['./views/Register.vue'], resolve)) //登录页
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
    redirect: 'home',
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
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: ForgetPassword
  }
]
if (userType == 1) {
  routerList.push(companyRouters)
}
else {
  routerList.push(teamRouters)
}
let routers = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...publiceRouters, ...routerList]
})
// let router = []
// console.log(companyRouters)
// console.log(userType)
// if (userType == 1) {
//   router.push(companyRouters)
// }
// else if (userType == 2) {
//   router.push(teamRouters)
// }
// else {
//   router = publiceRouters
// }
// routers.addRoutes(router)

// 注册全局钩子用来拦截导航
// routers.afterEach((to, from) => {
//   if (to.query.redirect && to.path == '/login') {
//     window.location.reload();
//   }
// })
export default routers
