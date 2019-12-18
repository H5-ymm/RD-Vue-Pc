import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}, //用户信息
    token: '', //token
    uid: localStorage.getItem('uid'),
    baseUrl: 'http://tiantianxsg.com:39888/index.php/',
    teamType: '',  // 团队性质
    userType: '', // 登录身份
    baseInfo: {}
  },
  mutations: {
    getBaseInfo (state, info) {
      state.baseInfo = info
    }
  },
  actions: {

  }
})
