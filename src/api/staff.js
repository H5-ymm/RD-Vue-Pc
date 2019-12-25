import { $post, uploadFile, exportData, $get } from '../axios'
export const getStaffResumeList = data => $post('/companyresume/companyResumeList', data) // 在职员工列表
export const addCompanyResume = data => $post('/companyresume/addCompanyResume', data)
export const importCompanyResume = () => $get('/companyresume/importCompanyResume')
export const exportCompanyResume = () => exportData('/companyresume/exportCompanyResume') // Excel导出简历
export const selectCompanyResumeInfo = data => $post('/companyresume/selectCompanyResumeInfo', data)
export const editCompanyResumeInfo = data => $post('/companyresume/editCompanyResumeInfo', data)
export const giveUpResume = data => $post('/resume/teamGiveUpResume', data)
export const importUserResume = data => uploadFile('/resume/importUserResume', data)
