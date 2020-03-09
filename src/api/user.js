
import { $post } from '../axios'
export const getUserInfo = data => $post('/userinfo/selectUserInfo', data) // 获取用户基本信息
export const editUserInfo = data => $post('/userinfo/editUserInfo', data) // 个人信息修改
export const setLoginPassword = data => $post('/userinfo/setLoginPassword', data) // 设置登录密码
export const editUserPassword = data => $post('/userinfo/editUserPassword', data) // 修改密码
export const sendVerification = data => $post('/userinfo/sendVerification', data) // 发送重置密码短息验证
export const getUserMobile = data => $post('/userinfo/getUserMobile', data) // 获取当前用户手机号和密码

export const getUserName = data => $post('/userinfo/getUserName', data) // 获取当前用户真实姓名
export const getBankList = data => $post('/userinfo/bankList', data) // 银行列表
export const getUserBinkInfo = data => $post('/userinfo/userBinkInfo', data) // 获取认证状态

export const getBindBankList = data => $post('/userinfo/bindBankList', data) // 用户绑定银行列表
export const userBinkBank = data => $post('/userinfo/userBinkBank', data) // 用户绑定银行卡


export const setPayPassword = data => $post('/userinfo/setPayPassword', data) // 设置支付密码
export const editPayPassword = data => $post('/userinfo/editPayPassword', data) // 修改支付密码
export const sendPayPassword = data => $post('/userinfo/sendPayPassword', data) // 发送重置支付密码短息验证

export const companyBinkInfo = data => $post('/company/companyBinkInfo', data)
export const userSwitchRole = data => $post('/userinfo/userSwitchRole', data)
