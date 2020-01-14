import { post, $post } from '../axios'

export const getList = data => post('/receipt/receiptList', data);
export const getOrderDetail = data => $post('/enterpriseinvoice/selectInvoiceInfo', data);
export const addjob = data => $post('/teamselfjob/addjob', data); //
export const addApply = data => $post('/teamapply/add_apply', data); //新建接单

export const addReportInfo = data => $post('/report/addReportInfo', data);
export const invoiceInfo = data => $post('/receipt/invoiceInfo', data);
export const jobRecommendedList = data => $post('/receipt/jobRecommendedList', data); // 推荐职位列表
export const companyInvoiceList = data => $post('/receipt/companyInvoiceList', data); //获取该公司其他单子列表

export const getCompanyInfo = data => $post('/receipt/getCompanyInfo', data); // 企业信息查询
export const getInvoice = data => $post('/enterpriseinvoice/selectInvoiceInfo', data); // 企业信息查询

export const updateInvoice = data => $post('/enterpriseinvoice/updateInvoice', data); // 企业信息查询