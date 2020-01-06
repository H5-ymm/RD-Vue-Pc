
import { $post } from '../axios'
export const getrank = data => $post('/teamrank/getrank', data) // 团队排名
export const getapplyLog = data => $post('/teamrank/getapply_log', data) //接单简历日志
export const getCompare = data => $post('/Teamindex/get_compare', data) //团队首页统计数据
export const getnumLeader = data => $post('/Teamindex/getnum_leader', data) //团队首页折线图数据
export const getmemberList = data => $post('/Teamindex/getmember_list', data) //团队首页折线图数据
