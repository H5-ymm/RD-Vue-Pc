<template>
  <div class="team-main-view">
    <el-container>
      <el-aside width="210px" class="team-aside">
        <component :is="aside" :userPosition="userPosition"></component>
      </el-aside>
      <el-container :class="{'comany-team-container': type==1}">
        <el-header :height="height">
          <div class="x-flex-between team-header" :class="{'comany-team-header': type==1}">
            <!-- <i class="el-icon-refresh-right" v-if="type==1"></i> -->
            <el-link :underline="false" href="home" v-if="type==1">首页</el-link>
            <div class="x-flex-start-justify" v-if="type==2||type==3">
              <img :src="getImgUrl(baseInfo.log)" alt class="team-logo" v-if="baseInfo&&baseInfo.log" />
              <img src="../assets/img/headIcon.png" alt class="team-logo" v-else />
              <span>{{baseInfo&&baseInfo.team_name}}</span>
            </div>
            <div class="x-flex-center" v-if="type==2||type==3">
              <el-link :underline="false" href="home" class="home-link">首页</el-link>
              <img :src="getImgUrl(userInfo.head_img)" alt class="team-logo user-logo" v-if="userInfo&&userInfo.head_img" />
              <img src="../assets/img/headIcon.png" alt class="team-logo user-logo" v-else />
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <span v-if="userInfo">{{userInfo.user_name?userInfo.user_name:userInfo.mobile}}</span>
                  <el-divider direction="vertical" v-if="departName"></el-divider>
                  <span v-if="departName">{{departName}}</span>
                  <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="/accountSettings">账户信息</el-dropdown-item>
                  <el-dropdown-item command="/login">退出登录</el-dropdown-item>
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
                  <el-dropdown-item command="/companyForm">账户信息</el-dropdown-item>
                  <el-dropdown-item command="/login">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <breadcrumb :breadcrumbs="breadcrumb"></breadcrumb>
        </el-header>
        <el-main class="team-main" :class="{'comany-main-page': type==1}">
          <!-- <transition name="el-fade-in"> -->
          <router-view class="team-box" v-if="$route.meta.requiresAuth"></router-view>
          <!-- <keep-alive>
              <router-view class="team-box"></router-view>
            </keep-alive> -->
          <!-- </transition> -->
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
// import { getUserInfo } from '@/api/user'
import { getCompanyDetail } from '@/api/company'
import { getImgUrl } from '@/util/util'
import { logout } from '@/api/login'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'team',
  inject: ['reload'],
  data () {
    return {
      breadcrumb: [],
      type: '',
      aside: '',
      height: '',
      baseInfo: {},
      userInfo: {},
      uid: '',
      departName: '',
      userPosition:'',
      transitionName: 'slide-left'//默认动画
    }
  },
  components: {
    homeAside,
    Breadcrumb,
    companyAside
  },
  computed:{
    ...mapState({
     teamInfo: state => state.teamInfo
    })
  },
  created () {
    // type 1 企业
    this.type = localStorage.getItem('userType')
    this.uid = localStorage.getItem('uid')
    this.userPosition = localStorage.getItem('userPosition')
    this.departName = localStorage.getItem('departName')
    if (this.type == 1) {
      this.aside = 'companyAside'
      this.height = "88px"
      if (this.uid) {
        this.getCompanyInfo(this.uid)
      }
    }
    else {
      this.aside = 'homeAside'
      this.height = "74px"
      if (this.uid) {
        this.getUserAll()
        this.getInfo(this.uid)
      }
    }
    if (sessionStorage.getItem('menus')) {
      this.breadcrumb = JSON.parse(sessionStorage.getItem('menus'))
    }
    this.getUserAll()
    console.log( localStorage.getItem('userPosition'))
  },
  watch: {
    $route (to, from) {
      if (to.query.userType) {
        this.userPosition = localStorage.getItem('userPosition')
        console.log(this.userPosition)
        this.departName = localStorage.getItem('departName')
        this.type = to.query.userType
        if (this.type == 1) {
          this.aside = 'companyAside'
          this.height = "88px"
          if (this.uid) {
            this.getCompanyInfo(this.uid)
          }
        }
        else {
          this.aside = 'homeAside'
          this.height = "74px"
          if (this.uid) {
            this.getUserAll()
            this.getInfo(this.uid)
          }
        }
      }
    }
  },
  methods: {
    getUserAll () {
      this.$store.dispatch('getUserAllInfo').then((res) => {
        this.$store.commit('getUserInfo', res.data)
        this.userInfo = res.data
      })
    },
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
        if (res.data && res.data.logo_url) {
          this.baseInfo.logo_url = this.getImgUrl(res.data.logo_url)
        }
        sessionStorage.setItem('baseInfo', JSON.stringify(this.baseInfo))
        let userInfo = {
          user_name: res.data.com_name,
          mobile: res.data.link_phone,
          head_img: this.getImgUrl(res.data.logo_url)
        }
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      })
    },
    handleCommand (val) {
      if (val == '/login') {
        // let uid = this.$store.state.uid ? this.$store.state.uid : localStorage.getItem('uid')
        this.$store.dispatch('logoutUser').then((res) => {
          this.reload()
          this.$message.success('退出登录成功')
          this.$router.replace(val)
        })
      }
      else {
        this.$router.push(val)
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/common.scss';
.el-container.is-vertical{
  height: 100vh;
}
// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
//   will-change: transform;
//   transition: all 500ms;
//   position: absolute;
// }
 
// .slide-right-enter {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
 
// .slide-right-leave-active {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
 
// .slide-left-enter {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
 
// .slide-left-leave-active {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
.team-main-view{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .home-link {
    margin: 0 10px;
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
    &.user-logo{
      border-radius: 50%;
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
