import Vue from 'vue'
import Vuex from 'vuex'
import { teamRouters } from './router/team'
import { companyRouters } from './router/company'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}, //用户信息
    token: localStorage.getItem('token'), //token
    uid: localStorage.getItem('uid'),
    baseUrl: 'http://tiantianxsg.com:39888/index.php/',
    teamType: '',  // 团队性质
    userType: localStorage.getItem('userType'), // 登录身份
    baseInfo: {},
    routes: [],
    permissionList: null 
  },
  mutations: {
    getBaseInfo (state, info) {
      state.baseInfo = info
    },
    userType (state, info) {
      state.userType = info
    },
    SET_PERMISSION(state, routes) {
      state.permissionList = routes
    },
    CLEAR_PERMISSION(state) {
      state.permissionList = null
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
    }
  }
})
