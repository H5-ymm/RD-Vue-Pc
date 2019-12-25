
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

const collectingInvoice = resolve => (require(['../components/internalInvoice/collectingInvoice.vue'], resolve)) // 领取发单
const checkResume = resolve => (require(['../components/internalInvoice/checkResume.vue'], resolve)) // 内部审核简历

const transfer = resolve => (require(['../components/finance/transfer.vue'], resolve)) // 内部审核简历
const CompanyForm = resolve => (require(['../components/teamMessage/teamCompanyForm.vue'], resolve)) // 团队企业
const personalForm = resolve => (require(['../components/teamMessage/personalForm.vue'], resolve)) // 团队个人
import Department from '../components/Department.vue'
import Userlist from '../components/Userlist.vue'  //全部用户
import commonts from '../components/commonts.vue'  //评论

// 团队路由
export const teamRouters = [{  // 团队论坛
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
{ // 部门列表
  path: '/accountSettings',
  name: 'AccountSettings',
  component: AccountSettings,
  meta: {
    requiresAuth: 2
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
},
{
  path: '/collectJob',  // 收藏职位
  name: CollectJob,
  component: CollectJob,
  meta: {
    requiresAuth: 1
  }
},
{
  path: '/userRecommend',  // 成员推荐 只有团长看到菜单
  name: userRecommend,
  component: userRecommend,
  meta: {
    requiresAuth: 1
  }
},
// 成员无法查看
{
  path: '/publishJobList',  // 内部发单
  name: publishJobList,
  component: publishJobList,
  meta: {
    requiresAuth: 1
  }
},
{
  path: '/jobDetail',  // 内部发单详情
  name: jobDetail,
  component: jobDetail,
  meta: {
    requiresAuth: 1
  }
},
{
  path: '/postJob',  // 发布岗位
  name: postJob,
  component: postJob,
  meta: {
    requiresAuth: 1
  }
},
{
  path: '/collectingInvoice',  // 领取发单
  name: collectingInvoice,
  component: collectingInvoice,
  meta: {
    requiresAuth: 1
  }
},
{
  path: '/checkResume',  // 内部审核简历
  name: checkResume,
  component: checkResume,
  meta: {
    requiresAuth: 1
  }
},
{
  path: '/transfer',  // 转账
  component: transfer,
  meta: {
    requiresAuth: 1
  }
}
]