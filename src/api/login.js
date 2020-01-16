import { $post } from '../axios'

export const goLogin = data => $post('/login/login', data);

export const getCode = data => $post('/login/sendVerification', data)

export const userRegister = data => $post('/login/userRegister', data)

// export const getProvincesList = () => $post('/company/getProvincesList')

export const getProvincesList = () => $post('/index/getProvincesList')
export const getCitysList = data => $post('/index/getCitysList', data)

export const getAreasList = data => $post('/index/getAreasList', data)

export const logout = data => $post('/login/logout', data)
