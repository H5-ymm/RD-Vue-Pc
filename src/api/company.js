import { post, $post } from '../axios'

export const getCompanyDetail = data => $post('/company/selectCompanyInfo', data)

export const getCompanyInfo = () => post('/index/getConstant', {})

export const createInvoice = data => $post('/enterpriseinvoice/createInvoice', data) // 企业发单

export const addCompanyInfo = data => $post('/company/authenticationCompanyInfo', data) 
