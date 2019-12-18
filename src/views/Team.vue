<template>
  <div class="team-main-view">
    <el-container>
      <el-aside width="210px" class="team-aside">
        <component :is="aside"></component>
      </el-aside>
      <el-container>
        <el-header :height="height">
          <div class="x-flex-between team-header" :class="{'comany-team-header': type==1}">
            <i class="el-icon-refresh-right" v-if="type==1"></i>
            <!-- <el-link :underline="false" href="home" v-else>首页</el-link> -->
            <div v-else class="x-flex-between">
              <img :src="baseInfo.log" alt class="team-logo" v-if="baseInfo.log" />
              <p class="team-logo no-logo" v-else></p>
              <span>{{baseInfo.team_name}}</span>
            </div>
            <div class="x-flex-center">
              <el-link :underline="false" href="home" v-if="type==2">首页</el-link>
              <el-badge :value="200" :max="99" class="item">
                <i class="el-icon-bell unRead"></i>
              </el-badge>
              <span>{{userInfo.user_name?userInfo.user_name:userInfo.mobile}}</span>
            </div>
          </div>
          <breadcrumb :breadcrumbs="breadcrumb"></breadcrumb>
        </el-header>
        <el-main class="team-main" :class="{'comany-main-page': type==1}">
          <router-view class="team-box"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import homeAside from '@/components/Aside' //侧边栏
import companyAside from '@/components/companyAside'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import { getTeamInfo } from '@/api/team'
import { getUserInfo } from '@/api/user'
import { join } from 'path'

export default {
  name: 'team',
  data () {
    return {
      breadcrumb: [],
      type: '',
      aside: '',
      height: '',
      baseInfo: {},
      userInfo: {}
    }
  },
  components: {
    homeAside,
    Breadcrumb,
    companyAside
  },
  computed: {

  },
  created () {
    // type 1 企业
    // 2 团队
    this.type = localStorage.getItem('userType')
    let uid = localStorage.getItem('uid')
    if (this.type == 1) {
      this.aside = 'companyAside'
      this.height = "90px"
      this.getCompanyInfo(uid)
    }
    else {
      this.aside = 'homeAside'
      this.height = "74px"
      this.getInfo(uid)
    }
    this.getUser(uid)
    this.breadcrumb = JSON.parse(sessionStorage.getItem('menus'))
  },
  methods: {
    getInfo (uid) {
      getTeamInfo({ uid }).then(res => {
        console.log(res)
        this.baseInfo = res.data
        sessionStorage.setItem('baseInfo', this.baseInfo)
      })
    },
    getCompanyInfo (uid) {
      getCompanyDetail({ uid }).then(res => {
        console.log(res)
        this.baseInfo = res.data
        sessionStorage.setItem('baseInfo', this.baseInfo)
      })
    },
    getUser (uid) {
      getUserInfo({ uid }).then(res => {
        console.log(res)
        this.userInfo = res.data
        sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      })
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/common.scss';
.team-main-view{
  width: 100vw;
  height: 100vh;
  /* overflow-y: hidden; */
  /* overflow: auto; */
  overflow: hidden;
  position: relative;
  .unRead {
    font-size: 24px;
  }
  .el-badge {
    margin: 0 20px;
  }
  .el-header {
    padding: 0;
  }
  .team-header {
    padding: 0 30px;
    height: 40px;
    &.comany-team-header{
       height: 50px;
    }
  }
  .team-logo {
    width: 30px;
    height: 30px;
    border-radius:3px;
    margin-right: 10px;
    &.no-logo {
      border: 1px solid #eee;
    }
  }
}
.team .team-header {
  padding: 0 38px;
}
.team-aside{
  overflow: hidden;
}
.team-main{
  height: 100vh;
  /* overflow: hidden; */
  background: #F0F2F5;
  padding: 10px 30px;
  box-sizing: border-box;
  &.comany-main-page {
    padding: 0 ;
  }
}
</style>
