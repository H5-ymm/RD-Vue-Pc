import { $post, uploadFile, postFormData, $get } from '../axios'
export const getResumeList = data => $post('/resume/teamUserResumeList', data) // 简历列
export const addUserResume = data => $post('/resume/addUserResume', data)
export const selectUserResumeInfo = data => $post('/resume/selectUserResumeInfo', data)
export const updateUserResume = data => $post('/resume/updateUserResume', data)
export const giveUpResume = data => $post('/resume/teamGiveUpResume', data)
export const importUserResume = data => uploadFile('/resume/importUserResume', data)
export const exportUserResume = data => postFormData('/resume/exportUserResume', data)
export const downloadTestTable = () => $get('/testTable.xlsx')
export const teamRecommendResumeList = data => $post('/teamresume/teamRecommendResumeList', data)
export const entryResumeList = data => $post('/teamresume/entryTeamRecommendResumeList', data)
export const addTrackingInfo = data => $post('/teamresume/addTrackingInfo', data) //添加追踪记录
export const incumbencyResumeList = data => $post('/teamresume/incumbencyResumeRecommend', data)
export const exportIncumbencyResume = data => postFormData('/teamresume/exportIncumbencyRecommendResume', data)

export const quitUser = data => $post('/teamresume/quitResumeRecommend', data) //离职
export const quitResumeList = data => $post('/teamresume/quitResumeRecommendList', data) //离职列表
export const exportDelResumeList = data => $post('/teamresume/exportDelRecommendResume', data) // 导出离职简历

export const delResumeList = data => $post('/teamresume/delResumeRecommend', data)
export const delResume = data => $post('/teamresume/delResume', data) //删除简历
export const giveupResumeList = data => $post('/teamresume/giveupResumeRecommend', data)
export const exportGiveUpResume = data => postFormData('/teamresume/exportGiveUpRecommendResume', data) // 导出放弃简历列表
export const exportDelResume = data => postFormData('/teamresume/exportDelRecommendResume', data)// 导出删除简历列表

export const receiveResume = data => $post('/teamresume/receiveResume', data)// 领取

export const reductionDelResume = data => $post('/teamresume/reductionDelResume', data)// 还原

export const getMatchingResume = data => $post('/teamtalent/getMatchingResume', data)

export const getMatchingJobList = data => $post('/teamtalent/getMatchingJobList', data)







