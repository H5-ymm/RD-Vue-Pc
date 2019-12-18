import { $post } from '../axios'
export const getTeamReceiptList = data => $post('/teamapply/list_apply', data) // 发单列表
export const getResumeList = data => $post('/company/CompanyResumeList', data) // 人才简历
