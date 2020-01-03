<style lang="scss">
.orderTaking-header {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.home .header-left{
  display: inline-block;
}
.home .bg-purple .welcome {
  font-size:14px;
  margin-left:8px;
}
.home-aside{
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
<template>
  <div class="orderTaking-header">
    <div class="x-flex-between">
      <span class="header-left">人事达</span>
      <ul class="nav">
        <li v-for="(item, index) in menus" class="nav-item" :key="index" @click="switchNav(item, index)" :class="{'active': activeIndex==index}">
          {{item.title}}
          <span class="line" v-if="activeIndex==index"></span>
        </li>
      </ul>
    </div>
    <div class="bg-purple-light x-flex-between">
      <span class="home-purple-left" v-if="!userInfo">
        <i class="el-icon-user-solid"></i>
        <a class="welcome" href="login">登录</a>
        <a class="divider">|</a>
        <a class="welcome" href="register">注册</a>
      </span>
      <P class="home-purple-left" v-else>
        <el-dropdown @command="handleCommand">
          <div class="el-dropdown-link x-flex-center" style="margin-right:10px">
            <p> <img :src="userInfo.head_img" alt v-if="userInfo.head_img" />
              <i class="el-icon-user-solid" v-else></i>&nbsp;
              <span v-if="userInfo.user_name">{{userInfo.user_name?userInfo.user_name:userInfo.mobile}}</span>
              <span v-else>{{userName}}</span></p>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="item.url" v-for="(item,index) in ommandList" :key="index">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </P>
      <a class="el-icon-phone-outline">&nbsp;021-51991869</a>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: ['activeIndex'],
  data () {
    return {
      // activeIndex: 1,
      menus: [
        {
          title: '首页',
          url: 'home'
        },
        {
          title: '接单',
          url: 'orderTaking'
        },
        {
          title: '资讯',
          url: 'Information'
        }
      ],
      userInfo: null,
      userName: localStorage.getItem('userName')
    }
  },
  created () {
    if (sessionStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }
  },
  computed: {
    ommandList () {
      let arr = []
      if (localStorage.getItem('userType') == 2) {
        arr = [
          { name: '团队中心', url: 'teamData' }, { name: '接单管理', url: 'teamApplication' },
          { name: '简历管理', url: 'addResume' }, { name: '退出登录', url: 'login' }
        ]
      } else {
        arr = [
          { name: '发单招聘', url: 'createOrderTaking' }, { name: '发单管理', url: 'checkReceipt' },
          { name: '账户设置', url: 'companyForm' }, { name: '退出登录', url: 'login' }
        ]
      }
      return arr
    }
  },
  methods: {
    handleCommand (val) {
      this.$router.push(val)
      if (val == 'login') {
        localStorage.clear('')
        sessionStorage.clear('')
      }
    },
    switchNav (item, index) {
      // this.activeIndex = index
      this.$router.push(item.url)
    }
  }
}
</script>
