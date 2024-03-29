import TeamSetting from '../components/TeamSetting.vue'
import AccountSettings from '../components/AccountSettings.vue'

const addResume = resolve => (require(['../components/resumeManage/addResume.vue'], resolve))
const recommendJob = resolve => (require(['../components/resumeManage/recommendJob.vue'], resolve))
const applyResume = resolve => (require(['../components/resumeManage/applyResume.vue'], resolve)) // 推荐简历

const onTheJobResumes = resolve => (require(['../components/resumeManage/onTheJobResumes.vue'], resolve)) // 在职简历
const dimissionResume = resolve => (require(['../components/resumeManage/dimissionResume.vue'], resolve)) // 离职简历
const waiverOfResume = resolve => (require(['../components/resumeManage/waiverOfResume.vue'], resolve)) // 放弃简历


const teamApplication = resolve => (require(['../components/teamReceiptManage/applicationTeam.vue'], resolve)) // 团队申请接单
const teamInterviewPersonnel = resolve => (require(['../components/teamReceiptManage/interviewPersonnel.vue'], resolve)) // 团队人才输送

const resumeResult = resolve => (require(['../components/teamReceiptManage/talentResume.vue'], resolve)) // 团队面试结果
const teamEntryList = resolve => (require(['../components/teamReceiptManage/entryList.vue'], resolve)) // 团队入职结果
const commonTableList = resolve => (require(['../components/teamReceiptManage/commonTableList.vue'], resolve)) // 团队入职结果
const recommendResume = resolve => (require(['../components/teamReceiptManage/recommendResume.vue'], resolve)) // 团队 推荐简历
const CollectJob = resolve => (require(['../components/CollectJob.vue'], resolve))
const userRecommend = resolve => (require(['../components/collectManage/userRecommend.vue'], resolve)) // 成员推荐
const publishJobList = resolve => (require(['../components/internalInvoice/publishJobList.vue'], resolve)) // 内部发单
const jobDetail = resolve => (require(['../components/internalInvoice/jobDetail.vue'], resolve)) // 内部发单详情
const postJob = resolve => (require(['../components/internalInvoice/postJob.vue'], resolve)) // 内部发单详情
const putList = resolve => (require(['../components/internalInvoice/putList.vue'], resolve)) // 内部发单详情

const collectingInvoice = resolve => (require(['../components/internalInvoice/collectingInvoice.vue'], resolve)) // 领取发单
const checkResumeInvoice = resolve => (require(['../components/internalInvoice/checkResume.vue'], resolve)) // 内部审核简历

const resumeList = resolve => (require(['../components/internalInvoice/resumeList.vue'], resolve)) // 内部审核简历
const transfer = resolve => (require(['../components/finance/transfer.vue'], resolve)) // 
const teamCompanyForm = resolve => (require(['../components/teamMessage/teamCompanyForm.vue'], resolve)) // 团队企业
const personalForm = resolve => (require(['../components/teamMessage/personalForm.vue'], resolve)) // 团队个人
const teamOrder = resolve => (require(['../components/teamCenter/teamOrder.vue'], resolve)) // 团队排名
const logList = resolve => (require(['../components/teamCenter/logList.vue'], resolve)) // 团队日志

const teamData = resolve => (require(['../components/teamCenter/teamData.vue'], resolve)) // 团队中心

const receiptTable = resolve => (require(['../components/teamReceipt/receiptTable.vue'], resolve)) // 接单分配 只有总经理和经理可看
const Department = resolve => (require(['../components/Department.vue'], resolve)) //部门
const Userlist = resolve => (require(['../components/Userlist.vue'], resolve)) //全部用户
const commonts = resolve => (require(['../components/commonts.vue'], resolve)) //评论
const Team = resolve => (require(['../views/Team.vue'], resolve))
import {
  commonRouters
} from './index'
// 团队路由
let children = [{ // 团队论坛
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
  // 团队申请
  {
    path: '/teamApplication',
    name: 'teamApplication',
    component: teamApplication,
    meta: {
      requiresAuth: 1
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
  { //
    path: '/accountSettings',
    name: 'AccountSettings',
    component: AccountSettings,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/addResume', // 新建简历
    name: addResume,
    component: addResume,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/recommendJob', // 推荐岗位
    name: recommendJob,
    component: recommendJob,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/applyResume', // 报名简历
    name: applyResume,
    component: applyResume,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/onTheJobResumes', // 在职简历
    name: onTheJobResumes,
    component: onTheJobResumes,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/dimissionResume', // 离职简历
    name: dimissionResume,
    component: dimissionResume,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/waiverOfResume', // 放弃简历
    name: waiverOfResume,
    component: waiverOfResume,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/collectJob', // 收藏职位
    name: CollectJob,
    component: CollectJob,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/userRecommend', // 成员推荐 只有团长看到菜单
    name: userRecommend,
    component: userRecommend,
    meta: {
      requiresAuth: 1
    }
  },
  {
    path: '/transfer', // 转账
    component: transfer,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/teamData', // 团队排名
    component: teamData,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/teamOrder', // 团队排名
    component: teamOrder,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/logList', // 日志
    component: logList,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/receiptTable', // 日志
    component: receiptTable,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/putList', // 
    component: putList,
    meta: {
      requiresAuth: 2
    }
  }
]
let rootList = [{ // 团队设置
    path: '/teamSetting',
    name: 'TeamSetting',
    component: TeamSetting,
    meta: {
      requiresAuth: 1
    }
  },
  { // 团队企业设置
    path: '/personalForm',
    name: 'personalForm',
    component: personalForm,
    meta: {
      requiresAuth: 1
    }
  },
  { // 团队个人设置
    path: '/teamCompanyForm',
    name: 'teamCompanyForm',
    component: teamCompanyForm,
    meta: {
      requiresAuth: 1
    }
  },
  { // 部门列表
    path: '/department',
    name: 'Department',
    component: Department,
    meta: {
      requiresAuth: 1
    }
  },
]
let receiptList = [{
    path: '/publishJobList', // 内部发单
    name: publishJobList,
    component: publishJobList,
    meta: {
      requiresAuth: 1
    }
  },
  {
    path: '/jobDetail', // 内部发单详情
    name: jobDetail,
    component: jobDetail,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/postJob', // 发布岗位
    name: postJob,
    component: postJob,
    meta: {
      requiresAuth: 1
    }
  },
  {
    path: '/collectingInvoice', // 领取发单
    name: collectingInvoice,
    component: collectingInvoice,
    meta: {
      requiresAuth: 1
    }
  },
  {
    path: '/checkResumeInvoice', // 内部审核简历
    name: checkResumeInvoice,
    component: checkResumeInvoice,
    meta: {
      requiresAuth: 1
    }
  },
  {
    path: '/resumeList',
    name: resumeList,
    component: resumeList,
    meta: {
      requiresAuth: 2
    }
  },

]
// if (userPosition == 1) {
//   children = [...children, ...rootList, ...receiptList]
// }
children = [...children, ...rootList, ...receiptList]
// if (userPosition == 2) {
//   children = [...children, ...receiptList]
// }
export const teamRouters = {
  path: '/team',
  name: 'Team',
  component: Team,
  meta: {
    requiresAuth: 2
  },
  redirect: 'teamData',
  children: [...children, ...commonRouters]
}