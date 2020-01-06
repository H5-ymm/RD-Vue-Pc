import { post, $post } from '../axios'

export const getList = data => post('/receipt/receiptList', data);
export const getOrderDetail = data => $post('/enterpriseinvoice/selectInvoiceInfo', data);
export const addjob = data => $post('/teamselfjob/addjob', data); //
export const addApply = data => $post('/teamapply/add_apply', data); //新建接单

export const addReportInfo = data => $post('/report/addReportInfo', data);
export const invoiceInfo = data => $post('/receipt/invoiceInfo', data);
