import Vue from 'vue'
import Vuex from 'vuex'
import {
  teamRouters
} from './router/team'
import {
  companyRouters
} from './router/company'
import {
  goLogin
} from './api/login'
import router from './router'
import {
  getUserInfo,
  editUserInfo
} from '@/api/user'
import {
  logout
} from '@/api/login'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}, //用户信息
    token: localStorage.getItem('token'), //token
    uid: '',
    teamType: '', // 团队性质
    userType: '', // 登录身份
    baseInfo: {},
    routes: [],
    permissionList: null,
    teamInfo: {},
    userPosition: '',
    menus: []
  },
  getters: {
    breadcrumb(state) {
      let arr = []
      if (state.menus.length) {
        arr = state.menus.splice(0)
      } else {
        let type = localStorage.getItem('userType')
        if (type == 1) {
          arr = sessionStorage.getItem('menus') ?
            JSON.parse(sessionStorage.getItem('menus')) : ['新建接单']
        } else {
          arr = sessionStorage.getItem('menus') ?
            JSON.parse(sessionStorage.getItem('menus')) : ['团队中心']
        }
      }
      console.log(arr)
      return arr
    }
  },
  mutations: {
    getBaseInfo(state, info) {
      state.baseInfo = info
    },
    getUserInfo(state, info) {
      state.userInfo = info
    },
    setMenus(state, list) {
      state.menus = list
    },
    getTeamInfo(state, info) {
      state.teamInfo = info
      localStorage.setItem('teamInfo', JSON.stringify(info))
      localStorage.setItem('departId', info.departId)
      localStorage.setItem('userType', info.type)
      localStorage.setItem('uid', info.uid)
      localStorage.setItem('token', info.token)
    },
    userType(state, info) {
      state.userType = info
    },
    SET_PERMISSION(state, routes) {
      state.permissionList = routes
    },
    CLEAR_PERMISSION(state) {
      state.permissionList = null
    },
    getUid(state, uid) {
      state.uid = uid
    },
    getUserPosition(state, position) {
      state.userPosition = position
    },
    setType(state, type) {
      state.userType = type
    }
  },
  actions: {
    FETCH_PERMISSION({
      commit,
      state
    }) {
      /*  获取后台给的权限数组 */
      let children = []
      if (state.userType == 1) {
        children.push(...companyRouters)
      } else {
        children.push(...teamRouters)
      }
      /* 完整的路由表 */
      commit('SET_PERMISSION', [...children])
    },
    logoutUser({
      commit,
      state
    }) {
      let outUser = new Promise((resolve, reject) => {
        let uid = localStorage.getItem('uid')
        logout({
          uid
        }).then(res => {
          let remindUserInfo = localStorage.getItem('remindUserInfo')
          if (remindUserInfo) {
            localStorage.removeItem('teamInfo')
            localStorage.removeItem('departId')
            localStorage.removeItem('userType')
            localStorage.removeItem('departName')
            localStorage.removeItem('uid')
            localStorage.removeItem('token')
            localStorage.removeItem('userPosition')
            localStorage.removeItem('teamType')
          } else {
            localStorage.clear('')
          }
          sessionStorage.clear()
          commit('getUserInfo', {})
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
      return outUser
    },
    getUserAllInfo({
      commit,
      state
    }) {
      let allInfo = new Promise((resolve, reject) => {
        let uid = localStorage.getItem('uid')
        if (uid) {
          getUserInfo({
            uid
          }).then(res => {
            sessionStorage.setItem('baseInfo', JSON.stringify(res.data.data))
            commit('getUserInfo', res.data.data)
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        }
      })
      return allInfo
    },
    updateUserInfo({
      dispatch
    }, params) {
      let infoPromise = new Promise((resolve, reject) => {
        editUserInfo(params).then(res => {
          dispatch('getUserAllInfo')
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
      return infoPromise
    },
    loginSaveInfo({
      commit,
      dispatch
    }, params) {
      let LoginPromise = new Promise((resolve, reject) => {
        goLogin(params).then(res => {
          dispatch('getUserAllInfo')
          localStorage.setItem('userType', res.data.type)
          localStorage.setItem('userName', res.data.username)
          localStorage.setItem('departName', res.data.departName)
          localStorage.setItem('uid', res.data.uid)
          commit('getUid', res.data.uid)
          commit('getUserPosition', res.data.gradeNum)
          commit('getTeamInfo', res.data)
          commit('setMenus', [])
          let registerType = res.data.type
          if (registerType == 1) {
            router.push('/createOrderTaking?userType=' + res.data.type)
          } else {
            localStorage.setItem('teamType', res.data.team_type)
            // 登录人身份
            sessionStorage.setItem('userPosition', res.data.gradeNum)
            localStorage.setItem('userPosition', res.data.gradeNum)
            router.push('/teamData?userType=' + res.data.type)
          }
          resolve(res)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
      return LoginPromise
    }
  }
})