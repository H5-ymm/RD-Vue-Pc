import Vue from 'vue'
import Vuex from 'vuex'
import {
  getImgUrl
} from "@/util/util";
// import {
//   teamRouters
// } from './router/team'
// import {
//   companyRouters
// } from './router/company'
import {
  goLogin
} from './api/login'
import router from './router'
import {
  getUserInfo,
  editUserInfo
} from '@/api/user'
import {
  getTeamInfo,
  updateTeamInfo
} from "@/api/team";
import {
  addCompanyInfo,
  getCompanyDetail
} from "@/api/company";
import {
  logout
} from '@/api/login'
import {
  Message
} from 'element-ui';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}, //用户信息
    token: localStorage.getItem('token'), //token
    uid: '',
    teamType: '', // 团队性质
    userType: '', // 登录账号性质
    baseInfo: {},
    teamInfo: {},
    userPosition: '', // 登录身份
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
      return arr
    },
    getTeam(state) {
      return state.teamInfo && state.teamInfo.uid ? state.teamInfo :
        JSON.parse(localStorage.getItem('teamSys'))
    },
    getUser(state) {
      return state.userInfo && state.userInfo.uid ? state.userInfo :
        JSON.parse(sessionStorage.getItem('userInfo'))
    },
    getBase(state) {
      let info = state.baseInfo && state.baseInfo.uid ? state.baseInfo :
        JSON.parse(sessionStorage.getItem('baseInfo'))
      return info
    },
    getUserUid(state) {
      return state.uid ? state.uid : localStorage.getItem('uid')
    },
    getUserType(state) {
      return state.userType ? state.userType : localStorage.getItem('userType')
    },
    getUserPosition(state) {
      return state.userPosition ? state.userPosition : localStorage.getItem('userPosition')
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
      state.menus = list || []
    },
    setTeamSys(state, info) {
      state.teamInfo = info
    },
    setUserType(state, info) {
      state.userType = info
    },
    getUid(state, uid) {
      state.uid = uid
    },
    setUserPosition(state, position) {
      state.userPosition = position
    },
    setType(state, type) {
      state.userType = type
    }
  },
  actions: {
    logoutUser({
      commit
    }) {
      let outUser = new Promise((resolve, reject) => {
        let uid = localStorage.getItem('uid')
        logout({
          uid
        }).then(res => {
          let remindUserInfo = localStorage.getItem('remindUserInfo')
          if (remindUserInfo) {
            localStorage.removeItem('teamInfo')
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
    // 获取个人信息
    getUserAllInfo({
      commit
    }, uid) {
      let allInfo = new Promise((resolve, reject) => {
        getUserInfo({
          uid
        }).then(res => {
          console.log(res.data)
          let userinfo = res.data
          if (userinfo.head_img) {
            if (userinfo.head_img.indexOf('http')==-1) {
              userinfo.head_img =  getImgUrl(res.data.head_img)
            } else {
              userinfo.head_img =  res.data.head_img
            }
          }
          sessionStorage.setItem('userInfo', JSON.stringify(userinfo))
          commit('getUserInfo', userinfo)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
      return allInfo
    },
    // 修改个人信息
    updateUserInfo({
      dispatch
    }, params) {
      let infoPromise = new Promise((resolve, reject) => {
        editUserInfo(params).then(res => {
          dispatch('getUserAllInfo', params.uid)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
      return infoPromise
    },
    // 获取团队信息
    getTeamData({
      commit
    }, uid) {
      let allInfo = new Promise((resolve, reject) => {
        getTeamInfo({
          uid
        }).then(res => {
          let Info = res.data || null;
          sessionStorage.setItem("baseInfo", JSON.stringify(Info));
          commit('getBaseInfo', Info)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
      return allInfo
    },
    // 编辑团队信息
    editTeamInfo({
      dispatch
    }, params) {
      let infoPromise = new Promise((resolve, reject) => {
        updateTeamInfo(params).then(res => {
          dispatch('getTeamData', params.uid)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
      return infoPromise
    },
    // 获取企业信息
    getCompanymData({
      commit
    }, uid) {
      let allInfo = new Promise((resolve, reject) => {
        getCompanyDetail({
          uid
        }).then(res => {
          let Info = res.data || null;
          if (Info.head_img) {
            if (Info.logo_url.indexOf('http')==-1) {
              Info.logo_url =  getImgUrl(res.data.logo_url)
            } else {
              Info.logo_url =  res.data.logo_url
            }
          }
          sessionStorage.setItem("baseInfo", JSON.stringify(Info));
          commit('getBaseInfo', Info)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
      return allInfo
    },
    // 编辑企业信息
    updateCompanyInfo({
      dispatch
    }, params) {
      let infoPromise = new Promise((resolve, reject) => {
        addCompanyInfo(params).then(res => {
          dispatch('getCompanymData', params.uid)
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
          localStorage.setItem('userType', res.data.type)
          localStorage.setItem('userName', res.data.username)
          localStorage.setItem('uid', res.data.uid)
          localStorage.setItem('token', res.data.token)
          commit('getUid', res.data.uid)
          commit('setUserPosition', res.data.gradeNum)
          commit('setUserType', res.data.type)
          let registerType = res.data.type
          if (registerType == 1) {
            commit('setMenus', ['发单招聘'])
            dispatch("getCompanymData", res.data.uid)
            router.push('/createOrderTaking')
          } else if (registerType == 3) {
            return Message.warning('个人账户无法登录，请登录人事达小程序体验!');
          } else {
            dispatch("getUserAllInfo", res.data.uid)
            dispatch("getTeamData", res.data.uid)
            localStorage.setItem('teamType', res.data.team_type)
            // 登录人身份
            localStorage.setItem('teamSys', JSON.stringify(res.data))
            localStorage.setItem('departName', res.data.departName)
            sessionStorage.setItem('userPosition', res.data.gradeNum)
            localStorage.setItem('userPosition', res.data.gradeNum)
            router.push('/teamData')
            commit('setMenus', ['团队中心'])
            commit('setTeamSys', res.data)
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