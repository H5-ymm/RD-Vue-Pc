import { post, $post } from '../axios'

export const getCompanyDetail = data => $post('/company/selectCompanyInfo', data);