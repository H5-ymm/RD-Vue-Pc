import { $post } from '../axios'

export const getJoblist = data => $post('/teamselfjob/get_joblist', data) // 团队职位列表
export const addPutSelf = data => $post('/teamselfjob/add_put', data) // 推送简历（可批量）
export const getTomember = data => $post('/teamselfjob/getTomember', data) // 获取跟进人列表
export const getassignlist = data => $post('/teamselfjob/getassignlist', data) // 获取指定人列表
export const getPutresume = data => $post('/teamselfjob/get_putresume', data) // 根据发单状态获取简历列表
export const putResumelist = data => $post('/teamselfjob/put_resumelist', data) // 获取未被推荐的简历列表

export const addjob = data => $post('/teamselfjob/addjob', data) // 新增发单信息

export const savejob = data => $post('/teamselfjob/savejob', data) // 修改职位信息
export const deleteJob = data => $post('/teamselfjob/delete_job', data) // 删除发单职位
export const changestatus = data => $post('/teamselfjob/changestatus', data) // 修改职位上下架

export const cancelrecv = data => $post('/teamselfjob/cancelrecv', data) //取消分配

export const setjobtouser = data => $post('/teamselfjob/setjobtouser', data) //分配跟进人（新增修改）
export const getTeamManage = data => $post('/teamselfjob/get_team_manage', data) //分配跟进人（新增修改）
export const auditRemuse = data => $post('/teamselfjob/audit_remuse', data) //设置审核
export const viewResult = data => $post('/teamselfjob/view_result', data) //设置面试结果
export const entrantResult = data => $post('/teamselfjob/entrant_result', data) //设置入职结果
export const checkPutresume = data => $post('/teamselfjob/get_putresume', data)

export const getJobinfo = data => $post('/teamselfjob/getJobinfo', data)

export const recvjob = data => $post('/teamselfjob/recvjob', data)

export const getobedistributedList = data => $post('/Teamselfjob/getobedistributed_list', data) //获取 待分配跟进人列表

export const cancelrecvList = data => $post('/Teamselfjob/cancelrecv_list', data) //已分配 领取/跟进列表（取消分配用）
export const giveupPut = data => $post('/Teamselfjob/giveup_put', data) // 取消推送
export const giveupView = data => $post('/Teamselfjob/giveup_view', data) // 放弃面试
export const giveEntry = data => $post('/Teamselfjob/give_entry', data) // 放弃入职
