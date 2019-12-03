import { post } from '../axios'

export const getList = data => post('/receipt/receiptList', data);

export const homeList = data => post('/receipt/indexReceiptList', data)