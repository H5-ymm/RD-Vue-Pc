import { $post, uploadFile, exportData, $get } from '../axios'
export const getStaffResumeList = data => $post('/companyresume/companyResumeList', data) // 在职员工列表
export const addCompanyResume = data => $post('/companyresume/addCompanyResume', data)
export const importCompanyResume = data => uploadFile('/companyresume/importCompanyResume', data)


export const exportCompanyResume = data => exportData('/companyresume/exportCompanyResume', data) // Excel导出简历
export const selectCompanyResumeInfo = data => $post('/companyresume/selectCompanyResumeInfo', data) //详情
export const editCompanyResumeInfo = data => $post('/companyresume/editCompanyResumeInfo', data) //修改
export const doQuitCompanyResume = data => $post('/companyresume/doQuitCompanyResume', data) // 删除

export const delCompanyResumeInfo = data => $post('/companyresume/delCompanyResumeInfo', data)
export const quitCompanyResumeList = data => $post('/companyresume/quitCompanyResumeList', data)

export const uploadsCompanyList = () => $get('companyResume.xlsx')

