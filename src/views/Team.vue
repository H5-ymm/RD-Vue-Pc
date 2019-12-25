<template>
  <div class="team-main-view">
    <el-container>
      <el-aside width="210px" class="team-aside">
        <component :is="aside"></component>
      </el-aside>
      <el-container>
        <el-header :height="height">
          <div class="x-flex-between team-header" :class="{'comany-team-header': type==1}">
            <!-- <i class="el-icon-refresh-right" v-if="type==1"></i> -->
            <el-link :underline="false" href="home" v-if="type==1">首页</el-link>
            <div class="x-flex-start-justify" v-if="type==2">
              <img
                :src="getImgUrl(baseInfo.log)"
                alt
                class="team-logo"
                v-if="baseInfo&&baseInfo.log"
              />
              <p class="team-logo no-logo" v-else></p>
              <span>{{baseInfo&&baseInfo.team_name}}</span>
            </div>
            <div class="x-flex-center" v-if="type==2">
              <el-link :underline="false" href="home">首页</el-link>
              <el-badge :value="200" :max="99" class="item">
                <i class="el-icon-bell unRead"></i>
              </el-badge>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <span>{{userInfo.user_name?userInfo.user_name:userInfo.mobile}}</span>
                  <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="0">账户信息</el-dropdown-item>
                  <el-dropdown-item command="1">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="x-flex-start-justify" v-if="type==1">
              <div v-if="baseInfo">
                <img :src="baseInfo.logo_url" alt class="team-logo" />
              </div>
              <p class="team-logo no-logo" v-else></p>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <span>{{baseInfo&&baseInfo.com_name}}</span>
                  <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="0">账户信息</el-dropdown-item>
                  <el-dropdown-item command="1">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
import { getCompanyDetail } from '@/api/company'
import { getImgUrl } from '@/util/util'
export default {
  name: 'team',
  data () {
    return {
      breadcrumb: [],
      type: '',
      aside: '',
      height: '',
      baseInfo: {},
      userInfo: {},
      uid: localStorage.getItem('uid')
    }
  },
  components: {
    homeAside,
    Breadcrumb,
    companyAside
  },
  created () {
    // type 1 企业
    // 2 团队
    this.type = localStorage.getItem('userType')
    this.getUser(this.uid)
    if (sessionStorage.getItem('menus')) {
      this.breadcrumb = JSON.parse(sessionStorage.getItem('menus'))
    }
  },
  watch: {
    type (val) {
      console.log(val)
      if (val == 1) {
        this.aside = 'companyAside'
        this.height = "88px"
        this.getCompanyInfo(this.uid)
      }
      else {
        this.aside = 'homeAside'
        this.height = "74px"
        this.getInfo(this.uid)
      }
    }
  },
  methods: {
    getImgUrl,
    getInfo (uid) {
      getTeamInfo({ uid }).then(res => {
        this.baseInfo = res.data || null
        sessionStorage.setItem('baseInfo', JSON.stringify(this.baseInfo))
      })
    },
    getCompanyInfo (uid) {
      getCompanyDetail({ uid }).then(res => {
        this.baseInfo = res.data
        console.log(res.data)
        if (res.data && res.data.logo_url) {
          console.log(res.data)
          this.baseInfo.logo_url = getImgUrl(res.data.logo_url)
        }
        sessionStorage.setItem('baseInfo', JSON.stringify(this.baseInfo))
      })
    },
    getUser (uid) {
      getUserInfo({ uid }).then(res => {
        this.userInfo = res.data || null
        sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      })
    },
    handleCommand (val) {
      localStorage.clear('')
      sessionStorage.clear('')
      this.$router.push('login')
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
