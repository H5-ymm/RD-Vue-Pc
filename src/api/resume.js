import { $post, uploadFile, postFormData } from '../axios'
export const getResumeList = data => $post('/resume/teamUserResumeList', data) // 简历列
export const addUserResume = data => $post('/resume/addUserResume', data)
export const selectUserResumeInfo = data => $post('/resume/selectUserResumeInfo', data)
export const updateUserResume = data => $post('/resume/updateUserResume', data)
export const giveUpResume = data => $post('/resume/teamGiveUpResume', data)
export const importUserResume = data => uploadFile('/resume/importUserResume', data)
export const exportUserResume = data => postFormData('/resume/exportUserResume', data)
export const downloadTestTable = data => $post('/uploads/test/testTable.xlsx', data)
export const teamRecommendResumeList = data => $post('/teamresume/teamRecommendResumeList', data)



