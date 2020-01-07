import { $post } from '../axios'
export const userBinkBank = data => $post('/userinfo/userBinkBank', data) // 用户绑定银行卡
export const bindEmail = data => $post('/userinfo/bindEmail', data) // 用户绑定邮箱
export const userBinkAlipay = data => $post('/userinfo/userBinkAlipay', data) // 用户绑定银行卡



