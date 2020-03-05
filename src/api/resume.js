import {
	$post,
	uploadFile,
	postFormData,
	$get
} from '../axios'
export const getResumeList2 = data => $post('/resume/teamUserResumeList', data) // 简历列
export const addUserResume = data => $post('/resume/addUserResume', data)
export const selectUserResumeInfo = data => $post('/resume/selectUserResumeInfo', data)
export const updateUserResume = data => $post('/resume/updateUserResume', data)
export const giveUpResume = data => $post('/resume/teamGiveUpResume', data)

export const importUserResume = data => uploadFile('/resume/importUserResume', data)
export const exportUserResume = data => postFormData('/exportresume/exportUserResume', data)
export const downloadTestTable = () => $get('/testTable.xlsx')
export const teamRecommendResumeList = data => $post('/teamresume/teamRecommendResumeList', data)
export const entryResumeList = data => $post('/teamresume/entryTeamRecommendResumeList', data)
export const addTrackingInfo = data => $post('/teamresume/addTrackingInfo', data) //添加追踪记录
export const incumbencyResumeList = data => $post('/teamresume/incumbencyResumeRecommend', data)
export const exportIncumbencyResume = data => postFormData('/exportresume/exportIncumbencyRecommendResume', data)
export const editRecommendResumeStatus = data => $post('/teamresume/editRecommendResumeStatus', data)
export const quitUser = data => $post('/teamresume/quitResumeRecommend', data) //离职
export const quitResumeList = data => $post('/teamresume/quitResumeRecommendList', data) //离职列表
export const exportDelResumeList = data => $post('/exportresume/exportDelRecommendResume', data) // 导出离职简历
export const interviewTeamResumeList = data => $post('/teamresume/interviewTeamResumeList', data)
export const delResumeList = data => $post('/teamresume/delResumeRecommend', data)
export const delResume = data => $post('/teamresume/delResume', data) //删除简历
export const giveupResumeList = data => $post('/teamresume/giveupResumeRecommend', data)
export const exportGiveUpResume = data => postFormData('/exportresume/exportGiveUpRecommendResume', data) // 导出放弃简历列表
export const exportDelResume = data => postFormData('/exportresume/exportDelRecommendResume', data) // 导出删除简历列表

export const receiveResume = data => $post('/teamresume/receiveResume', data) // 领取

export const reductionDelResume = data => $post('/teamresume/reductionDelResume', data) // 还原

export const getMatchingJobList = data => $post('/teamtalent/getMatchingJobList', data) //简历对应的职位列表(团队接单)

export const getMatchingResume = data => $post('/teamtalent/getMatchingResume', data) // 职位对应匹配的简历列表（团队接单）

export const getInternalMatchingList = data => $post('/teamtalent/getInternalInvoiceMatchingList', data) // 简历对应匹配职位列表（内部发单）

export const getInternalInvoiceList = data => $post('/teamtalent/getInternalInvoiceList', data) // 职位对应匹配简历列表（内部发单）
export const getTrackList = data => $post('/resume/getTrackList', data) // 查询简历跟进记录

export const exportEntryResume = data => postFormData('/exportresume/exportEntryRecommendResume', data) //入职简历导出