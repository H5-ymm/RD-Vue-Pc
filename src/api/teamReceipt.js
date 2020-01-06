import { $post } from '../axios'
export const getTeamReceiptList = data => $post('/teamapply/list_apply', data) // 发单列表
export const getResumeList = data => $post('/teamtalent/getcurapply', data) // 接单通过列表

export const addApply = data => $post('/teamapply/add_apply', data) // 添加接单
export const cancelApply = data => $post('/teamapply/cancel_apply', data) // 取消接单

export const delApply = data => $post('/teamapply/del_apply', data)

export const getcurapply = data => $post('/teamapply/getcurapply', data) // 已通过的接单列表

export const apportionJjob = data => $post('/teamapply/apportion_job', data) // 添加分配接单

export const auditRecv = data => $post('/teamapply/audit_recv', data) // 团长同意或者拒绝领取接单分配申请

export const curapportionList = data => $post('/teamapply/curapportion_list', data) //已分配列表

export const getpartMember = data => $post('/teamapply/getpart_member', data) // 部门所有团员列表

export const addTomember = data => $post('/teamapply/add_tomember', data) // 部门经理分配跟进人
export const applyList = data => $post('/teamtalent/apply_list', data) //根据接单状态获取接单列表
export const getListPut = data => $post('/teamtalent/getList_put', data) //根据接单状态获取推荐简历列表
export const addApportion = data => $post('/teamapply/add_apportion_bymember', data)

export const changeApportion = data => $post('/teamapply/change_apportion', data)
