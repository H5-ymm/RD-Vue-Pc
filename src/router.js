import Vue from 'vue'
import Router from 'vue-router'
import {teamRouters} from './router/team'
import {companyRouters} from './router/company'
import { commonRouters} from './router/index'
import Team from './views/Team.vue'  //登录页
import About from './views/About.vue'
import Home from './views/Home.vue'
const login = resolve => (require(['./views/Login.vue'], resolve))
const register = resolve => (require(['./views/Register.vue'], resolve)) //登录页
const OrderTaking = resolve => (require(['./views/OrderTaking.vue'], resolve))
const OrderTakingDetail = resolve => (require(['./views/OrderTakingDetail.vue'], resolve)) // 接单详情
Vue.use(Router)
let children = []
// 企业和团队路由
if (localStorage.getItem('userType')==1) {
  children = [...companyRouters,...commonRouters]
}
else {
  children = [...teamRouters,...commonRouters]
}
let routers = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: 'home',
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
      children:children,
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
    }
  ]
})
// 全部钩子
// routers.beforeEach((to,from,next)=>{
//   let path=from.path
//       if (to.path === '/load'|| to.path === '/about' || to.path==='/login') {
//             next();
//           } else {
//             let desc= store.state.user.desc;
//             if(!desc) {
//               next('/load')
//             }else{
//                 if(desc<=to.meta.requiresAuth){
//                   next()
//                 }else{
//                   next(path)
//                 }
//             }

//           }

// })
// 公出路由
export default routers
