import { post, $post } from '../axios'

export const getList = data => post('/receipt/receiptList', data);
export const getOrderDetail = data => post('/enterpriseinvoice/selectInvoiceInfo', data);
export const addjob = data => post('/teamselfjob/addjob', data); //新建接单


