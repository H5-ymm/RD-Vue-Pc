
import { $post } from '../axios'
export const getrank = data => $post('/teamrank/getrank', data) // 团队排名