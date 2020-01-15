import Vue from 'vue'
import Vuex from 'vuex'
import { teamRouters } from './router/team'
import { companyRouters } from './router/company'
import { goLogin } from './api/login'
import { getUserInfo, editUserInfo } from '@/api/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: sessionStorage.getItem('userInfo')? JSON.parse(sessionStorage.getItem('userInfo')): {}, //用户信息
    token: localStorage.getItem('token'), //token
    uid: localStorage.getItem('uid'),
    baseUrl: 'http://tiantianxsg.com:39888/index.php/',
    teamType: '',  // 团队性质
    userType: localStorage.getItem('userType'), // 登录身份
    baseInfo: {},
    routes: [],
    permissionList: null,
    userPosition: sessionStorage.getItem('userPosition')
  },
  mutations: {
    getBaseInfo (state, info) {
      state.baseInfo = info
    },
    getUserInfo(state, info){
      state.userInfo = info
    },
    userType (state, info) {
      state.userType = info
    },
    SET_PERMISSION(state, routes) {
      state.permissionList = routes
    },
    CLEAR_PERMISSION(state) {
      state.permissionList = null
    },
    getUid(state,uid) {
      state.uid = uid
    },
    getUserPosition(state,position) {
      state.userPosition = position
    },
    setType(state,type) {
      state.userType = type
    }
  },
  actions: {
    FETCH_PERMISSION({ commit, state }) {
       /*  获取后台给的权限数组 */
        let children = []
        if (state.userType == 1) {
          children.push(...companyRouters)
        }
        else {
          children.push(...teamRouters)   
        }
        /* 完整的路由表 */
        commit('SET_PERMISSION', [...children])
    },
    getUserAllInfo({ commit ,state}) {
      return new Promise((resolve, reject) => {
        getUserInfo({uid:state.uid}).then(res => {
          commit('getUserInfo', res.data.data)
          sessionStorage.setItem('baseInfo', JSON.stringify(res.data.data))
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateUserInfo({dispatch},params){
      return new Promise((resolve, reject) => {
        editUserInfo(params).then(res => {
         dispatch('getUserAllInfo')
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    loginSaveInfo({ commit },params){
      return new Promise((resolve, reject) => {
        goLogin(params).then(res => {
          commit('getUid', res.data.uid)
          commit('getUserPosition', res.data.gradeNum)
          localStorage.setItem('userType', res.data.type)
          localStorage.setItem('uid', res.data.uid)
          localStorage.setItem('token', res.data.token)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})
