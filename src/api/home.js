import { post } from '../axios'

export const homeList = data => post('/receipt/indexReceiptList', data)
export const advertisementList = data => post('/index/advertisementList', data)
