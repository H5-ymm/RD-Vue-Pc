import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import store from './store.js'

import Load from './views/Load.vue'  //登录页
import Register from './views/register.vue'  //登录页

import Team from './views/Team.vue'  //登录页

import OrderTaking from './views/OrderTaking.vue'   //接单
import OrderTakingDetail from './views/OrderTakingDetail.vue'  //接单详情
import About from './views/About.vue'
import TeamSetting from './components/TeamSetting.vue'
import AccountSettings from './components/AccountSettings.vue'
import AccountSafe from './components/AccountSafe.vue'
import AccountBank from './components/AccountBank.vue'
import PasswordManage from './components/PasswordManage.vue'

import Department from './components/Department.vue'
import personalForm from './components/teamMessage/personalForm'  // 个人
import CompanyForm from './components/teamMessage/companyForm'   // 企业
import Userlist from './components/Userlist.vue'  //全部用户
import commonts from './components/commonts.vue'  //评论
const createOrderTaking = resolve => (require(['./components/CeateOrderTaking.vue'], resolve))
Vue.use(Router)

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
      children: [
        {  //MarkDown编辑器commonts
          path: '/commonts',
          name: 'commonts',
          component: commonts,
          meta: {
            requiresAuth: 2
          }
        },
        { //成员管理
          path: '/userlist',
          name: 'Userlist',
          component: Userlist,
          meta: {
            requiresAuth: 2
          }
        },
        { // 团队设置
          path: '/teamSetting',
          name: 'TeamSetting',
          component: TeamSetting,
          meta: {
            requiresAuth: 2
          }
        },
        { // 团队企业设置
          path: '/personalForm',
          name: 'personalForm',
          component: personalForm,
          meta: {
            requiresAuth: 2
          }
        },
        { // 团队个人设置
          path: '/companyForm',
          name: 'CompanyForm',
          component: CompanyForm,
          meta: {
            requiresAuth: 2
          }
        },
        { // 部门列表
          path: '/department',
          name: 'Department',
          component: Department,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/accountSettings',  //账户设置
          component: AccountSettings,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/accountSafe',  //账户安全
          name: AccountSafe,
          component: AccountSafe,
          meta: {
            requiresAuth: 1
          }
        },
        {
          path: '/accountBank',  //账户设置
          component: AccountBank,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/passwordManage',  //账户设置
          component: PasswordManage,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: 'userlist',  //用户列表
          name: 'Userlist',
          component: Userlist,
          meta: {
            requiresAuth: 1
          }
        },
        {
          path: '/createOrderTaking',  // 新建接单
          name: createOrderTaking,
          component: createOrderTaking,
          meta: {
            requiresAuth: 1
          }
        }],
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
      path: '/load',
      name: 'Load',
      component: Load
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
// 全部钩子
// routers.beforeEach((to,from,next)=>{
//   let path=from.path
//       if (to.path === '/load'|| to.path === '/about' || to.path==='/register') {
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
