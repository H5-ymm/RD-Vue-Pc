import { $post, exportData } from '../axios'
// 企业发单管理
export const getReceiptList = data => $post('/company/companyReceiptList', data) // 发单列表
export const companyReceiptShelf = data => $post('/company/companyReceiptShelf', data) // 上下架操作
export const delReceiptShelf = data => $post('/company/delReceiptShelf', data) // 删除
export const applyInvoiceList = data => $post('/company/applyInvoiceList', data) // 接单申请列表
export const auditInvoiceInfo = data => $post('/company/auditInvoiceInfo', data) // 企业操作接单申请
export const delCompanyTeamApply = data => $post('/company/delCompanyTeamApply', data) // 企业删除团队的接单申请

export const companyResumeList = data => $post('/company/CompanyResumeList', data) // 人才简历
export const auditResumeList = data => $post('/company/auditResumeList', data)  // 审核简历列表
export const auditResumeRecommend = data => $post('/company/auditResumeRecommend', data) //简历审核
export const exportRecommendResume = data => exportData('/company/exportRecommendResume', data) // 导出
export const editInterviewTime = data => $post('/company/editInterviewTime', data) // 设置面试时间
export const endEntry = data => $post('/company/endEntry', data)  // 提前结束入职

export const invoiceInterviewList = data => $post('/company/invoiceInterviewList', data) //面试职位列表
export const auditEntryResume = data => $post('/company/auditInterviewResumeRecommend', data) //面试结果操作
export const endInterview = data => $post('/company/endInterview', data) // 结束面试操作
export const entryResumeList = data => $post('/company/entryRecommendResumeList', data)
export const exportInterviewResume = data => $post('/company/exportInterviewRecommendResume', data) //面试简历导出

export const entryInvoiceList = data => $post('/company/entryInvoiceList', data) //入职职位列表
export const entryUserResumeList = data => $post('/company/entryUserRecommendResumeList', data)  //入职名单列表

export const updateEntryUser = data => $post('/company/updateEntryUser', data)  //人员入职操作
export const incumbencyUserResumeList = data => $post('/company/incumbencyUserRecommendResumeList', data) //在职名单列表
export const editEntryTime = data => $post('/company/editEntryTime', data)  //入职时间

export const quitResumeRecommend = data => $post('/company/quitResumeRecommend', data)  //人员离职
export const selectInterviewEntryInfo = data => $post('/company/selectInterviewEntryInfo', data)  //人员离职
export const setVideoInterviewTime = data => $post('/company/setVideoInterviewTime', data)
export const noticeRecord = data => $post('/videointerview/videoInterviewNoticeRecord', data)
