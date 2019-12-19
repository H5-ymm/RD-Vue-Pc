import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import store from './store.js'
import Team from './views/Team.vue'  //登录页
import About from './views/About.vue'
import TeamSetting from './components/TeamSetting.vue'
import AccountSettings from './components/AccountSettings.vue'
import AccountSafe from './components/AccountSafe.vue'
import AccountBank from './components/AccountBank.vue'
import PasswordManage from './components/PasswordManage.vue'
const login = resolve => (require(['./views/Login.vue'], resolve))
const register = resolve => (require(['./views/Register.vue'], resolve)) //登录页
const OrderTaking = resolve => (require(['./views/OrderTaking.vue'], resolve))
const OrderTakingDetail = resolve => (require(['./views/OrderTakingDetail.vue'], resolve)) // 接单详情
const checkReceipt = resolve => (require(['./components/receiptManagement/checkReceipt.vue'], resolve))
const applicationTeam = resolve => (require(['./components/receiptManagement/applicationTeam.vue'], resolve))
const talentResume = resolve => (require(['./components/receiptManagement/talentResume.vue'], resolve))
const entryList = resolve => (require(['./components/receiptManagement/entryList.vue'], resolve))
const entryDetailTable = resolve => (require(['./components/receiptManagement/entryDetailTable.vue'], resolve))
const auditionNameList = resolve => (require(['./components/receiptManagement/auditionNameList.vue'], resolve))
const commonTable = resolve => (require(['./components/receiptManagement/commonTableList.vue'], resolve))
const interviewPersonnel = resolve => (require(['./components/receiptManagement/interviewPersonnel.vue'], resolve))
const checkResume = resolve => (require(['./components/receiptManagement/checkResume.vue'], resolve))
const addResume = resolve => (require(['./components/resumeManage/addResume.vue'], resolve))
const ResumeManage = resolve => (require(['./components/ResumeManage.vue'], resolve))
const recommendJob = resolve => (require(['./components/resumeManage/recommendJob.vue'], resolve))
const applyResume = resolve => (require(['./components/resumeManage/applyResume.vue'], resolve)) // 推荐简历

const onTheJobResumes = resolve => (require(['./components/resumeManage/onTheJobResumes.vue'], resolve)) // 在职简历
const dimissionResume = resolve => (require(['./components/resumeManage/dimissionResume.vue'], resolve)) // 离职简历
const waiverOfResume = resolve => (require(['./components/resumeManage/waiverOfResume.vue'], resolve)) // 放弃简历


const teamApplication = resolve => (require(['./components/teamReceiptManage/applicationTeam.vue'], resolve)) // 团队申请接单
const teamInterviewPersonnel = resolve => (require(['./components/teamReceiptManage/interviewPersonnel.vue'], resolve)) // 团队人才输送

const resumeResult = resolve => (require(['./components/teamReceiptManage/talentResume.vue'], resolve)) // 团队面试结果
const teamEntryList = resolve => (require(['./components/teamReceiptManage/entryList.vue'], resolve)) // 团队入职结果
const commonTableList = resolve => (require(['./components/teamReceiptManage/commonTableList.vue'], resolve)) // 团队入职结果
const recommendResume = resolve => (require(['./components/teamReceiptManage/recommendResume.vue'], resolve)) // 团队 推荐简历

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
        {
          path: '/teamApplication',
          name: 'teamApplication',
          component: teamApplication,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/teamInterviewPersonnel',
          name: 'teamInterviewPersonnel',
          component: teamInterviewPersonnel,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/recommendResume',
          name: 'recommendResume',
          component: recommendResume,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/resumeResult',
          name: 'resumeResult',
          component: resumeResult,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/teamEntryList',
          name: 'teamEntryList',
          component: teamEntryList,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/commonTableList',
          name: 'commonTableList',
          component: commonTableList,
          meta: {
            requiresAuth: 2
          }
        },
        { // 审核发单
          path: '/checkReceipt',
          name: 'checkReceipt',
          component: checkReceipt,
          meta: {
            requiresAuth: 2
          }
        },
        { // 申请团队
          path: '/applicationTeam',
          name: 'applicationTeam',
          component: applicationTeam,
          meta: {
            requiresAuth: 2
          }
        },
        { // 个人简历
          path: '/talentResume',
          name: 'talentResume',
          component: talentResume,
          meta: {
            requiresAuth: 2
          }
        },
        { // 入职名单
          path: '/entryList',
          name: 'entryList',
          component: entryList,
          meta: {
            requiresAuth: 2
          }
        },
        { // 审核简历
          path: '/checkResume',
          name: 'checkResume',
          component: checkResume,
          meta: {
            requiresAuth: 2
          }
        },
        { // 简历详情
          path: '/entryDetailTable',
          name: 'entryDetailTable',
          component: entryDetailTable,
          meta: {
            requiresAuth: 2
          }
        },
        { // 面试人才
          path: '/interviewPersonnel',
          name: 'interviewPersonnel',
          component: interviewPersonnel,
          meta: {
            requiresAuth: 2
          }
        },
        { // 面试名单
          path: '/auditionNameList',
          name: 'auditionNameList',
          component: auditionNameList,
          meta: {
            requiresAuth: 2
          }
        },
        { // 查看简历
          path: '/commonTable',
          name: 'commonTable',
          component: commonTable,
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
        },
        {
          path: '/addResume',  // 新建简历
          name: addResume,
          component: addResume,
          meta: {
            requiresAuth: 1
          }
        },
        {
          path: '/recommendJob',  // 推荐岗位
          name: recommendJob,
          component: recommendJob,
          meta: {
            requiresAuth: 1
          }
        },
        {
          path: '/applyResume',  // 报名简历
          name: applyResume,
          component: applyResume,
          meta: {
            requiresAuth: 1
          }
        },
        {
          path: '/onTheJobResumes',  // 在职简历
          name: onTheJobResumes,
          component: onTheJobResumes,
          meta: {
            requiresAuth: 1
          }
        },
        {
          path: '/dimissionResume',  // 离职简历
          name: dimissionResume,
          component: dimissionResume,
          meta: {
            requiresAuth: 1
          }
        },
        {
          path: '/waiverOfResume',  // 放弃简历
          name: waiverOfResume,
          component: waiverOfResume,
          meta: {
            requiresAuth: 1
          }
        }
      ],
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
