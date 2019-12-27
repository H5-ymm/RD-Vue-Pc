import { $post } from '../axios'
export const getTeamReceiptList = data => $post('/teamapply/list_apply', data) // 发单列表
export const getResumeList = data => $post('/teamtalent/getcurapply', data) // 接单通过列表

export const addApply = data => $post('/teamapply/add_apply', data) // 添加接单
export const cancelApply = data => $post('/teamapply/cancel_apply', data) // 取消接单

export const delApply = data => $post('/teamapply/del_apply', data)