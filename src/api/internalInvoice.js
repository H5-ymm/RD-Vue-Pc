import { $post } from '../axios'

export const getJoblist = data => $post('/teamselfjob/get_joblist', data) // 团队职位列表
export const addPut = data => $post('/teamselfjob/add_put', data) // 推送简历（可批量）
export const getTomember = data => $post('/teamselfjob/getTomember', data) // 获取跟进人列表
export const getassignlist = data => $post('/teamselfjob/getassignlist', data) // 获取指定人列表