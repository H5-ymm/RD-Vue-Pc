import { post } from '../axios'

export const inquiryList = data => post('/receipt/inquiryList', data)
export const inquiryInfo = data => post('/receipt/inquiryInfo', data)
export const hortInquiryList = data => post('/receipt/hortInquiryList', data)