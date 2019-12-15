import { $post } from '../axios'
export const getReceiptList = data => $post('/company/companyReceiptList', data) // 发单列表
export const getResumeList = data => $post('/company/CompanyResumeList', data) // 人才简历





