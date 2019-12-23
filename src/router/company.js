
const checkReceipt = resolve => (require(['../components/receiptManagement/checkReceipt.vue'], resolve))
const applicationTeam = resolve => (require(['../components/receiptManagement/applicationTeam.vue'], resolve))
const talentResume = resolve => (require(['../components/receiptManagement/talentResume.vue'], resolve))
const entryList = resolve => (require(['../components/receiptManagement/entryList.vue'], resolve))
const entryDetailTable = resolve => (require(['../components/receiptManagement/entryDetailTable.vue'], resolve))
const auditionNameList = resolve => (require(['../components/receiptManagement/auditionNameList.vue'], resolve))
const commonTable = resolve => (require(['../components/receiptManagement/commonTableList.vue'], resolve))
const interviewPersonnel = resolve => (require(['../components/receiptManagement/interviewPersonnel.vue'], resolve))
const checkResume = resolve => (require(['../components/receiptManagement/checkResume.vue'], resolve))
import CompanyForm from '../components/teamMessage/companyForm'   // 企业
const createOrderTaking = resolve => (require(['../components/CeateOrderTaking.vue'], resolve))
export const companyRouters = [
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
  { // 团队个人设置
    path: '/companyForm',
    name: 'CompanyForm',
    component: CompanyForm,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/createOrderTaking',  // 新建接单
    name: createOrderTaking,
    component: createOrderTaking,
    meta: {
      requiresAuth: 1
    }
  }
]