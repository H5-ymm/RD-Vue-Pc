import { $post } from '../axios'
export const getCollectList = data => $post('/teamcollect/teamUserCollectList', data) // 收藏职位列表
export const teamCollectionJob = data => $post('/teamcollect/teamCollectionJob', data) // 收藏接单职位
export const recommendList = data => $post('/teamcollect/recommendRegimentalCommanderList', data) //团员推荐职位给团长职位列表

export const teamcollection = data => $post('/teamcollect/jobRecommendApply', data) //申请接单

export const recommendTeamUserJob = data => $post('/teamcollect/recommendTeamUserJob', data)
export const refuseTeamRecommend = data => $post('/teamcollect/refuseTeamRecommend', data) //团长拒绝团员推荐
