import Vue from 'vue'
import Router from 'vue-router'
import { teamRouters } from './router/team'
import { companyRouters } from './router/company'
import { commonRouters } from './router/index'
import About from './views/About.vue'
const Home = resolve => (require(['./views/Home.vue'], resolve))
const login = resolve => (require(['./views/Login.vue'], resolve))
const Team = resolve => (require(['./views/Team.vue'], resolve))
const ForgetPassword = resolve => (require(['./views/ForgetPassword.vue'], resolve))
const register = resolve => (require(['./views/Register.vue'], resolve)) //登录页
const OrderTaking = resolve => (require(['./views/OrderTaking.vue'], resolve))
const OrderTakingDetail = resolve => (require(['./views/OrderTakingDetail.vue'], resolve)) // 接单详情
Vue.use(Router)
let children = []
let userType = localStorage.getItem('userType')
// 企业和团队路由
if (userType == 1) {
  children = [...companyRouters, ...commonRouters]
}
else {
  children = [...teamRouters, ...commonRouters]
}
let publiceRouters = [
  {
    path: '/',
    redirect: 'home',
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
    children: children,
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
let routers = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...publiceRouters]
})
// 全部钩子
// routers.beforeEach((to, from, next) => {
//   let path = from.path
//   console.log(path)
//   console.log(to.path === '/team')
//   if (to.path === '/team') {
//     if (userType == 1) {
//       next({ to: '/commonts' })
//     } else {
//       next({ to: '/createOrderTaking' })
//     }
//   } else {
//     next()
//   }
// })
// 公出路由
export default routers
