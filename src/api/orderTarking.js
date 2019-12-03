import { post, $post } from '../axios'

export const getDetail = data => post('/enterpriseinvoice/selectInvoiceInfo', data);

