import { $post, post } from '../axios'

export const goList = data => $post('/receipt/receiptList', data);

export const homeList = data => post('/receipt/indexReceiptList', data)