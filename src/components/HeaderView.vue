<template>
  <div class="orderTaking-header">
    <div class="x-flex-between">
      <span class="header-left">人事达</span>
      <span class="home-purple-left" v-if="!activeIndex" @click="selectCity">
        <i class="el-icon-location-outline"></i>
        <a class="welcome">全国站</a>
      </span>
      <ul class="nav">
        <li v-for="(item, index) in menus" class="nav-item" :key="index" @click="switchNav(item, index)" :class="{'active': activeIndex==index}">
          {{item.title}}
          <span class="line" v-if="activeIndex==index"></span>
        </li>
      </ul>
    </div>
    <div class="bg-purple-light x-flex-between">
      <P class="home-purple-left">
        <el-dropdown @command="handleCommand">
          <div class="el-dropdown-link x-flex-center" style="margin-right:10px">
            <div class="x-flex-between" v-if="type==2">
              <p v-if="userInfo&&userInfo.user_name">{{userInfo.user_name?userInfo.user_name:userInfo.mobile}}</p>
              <p v-else>{{userName}}</p>
              <img :src="getImgUrl(userInfo.head_img)" alt="" v-if="userInfo&&userInfo.head_img" class="head-icon">
              <img src="../assets/img/headIcon.png" v-else class="head-icon">
            </div>
            <div class="x-flex-between" v-if="type==1">
              <p v-if="baseInfo&&baseInfo.com_name">{{baseInfo.com_name?baseInfo.com_name:baseInfo.mobile}}</p>
              <p v-else>{{userName}}</p>
              <img :src="baseInfo.logo_url" alt="" v-if="baseInfo&&baseInfo.logo_url" class="head-icon">
              <img src="../assets/img/headIcon.png" v-else class="head-icon">
            </div>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="item.url" v-for="(item,index) in ommandList" :key="index">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </P>
      <a v-if="info" class="el-icon-phone-outline">&nbsp;{{info.customerTel}}</a>
    </div>
  </div>
</template>
<script>
import { getImgUrl } from '@/util/util'
import { getConfigInfo } from '@/api/home'
import { userSwitchRole } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  name: '',
  props: ['activeIndex'],
  data () {
    return {
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
      userName: localStorage.getItem('userName'),
      info: {}
    }
  },
  created () {
    this.getInfo()
  },
  computed: {
    ...mapGetters({
      type: 'getUserType',
      baseInfo: "getBase",
      userInfo: 'getUser'
    }),
    ommandList () {
      let arr = []
      if (localStorage.getItem('userType') == 2) {
        arr = [
          { name: '团队中心', url: '/teamData' }, { name: '接单管理', url: '/teamApplication' },
          { name: '简历管理', url: '/addResume' }, { name: '切换企业', url: '' }, { name: '退出登录', url: '/login' }
        ]
      } else {
        arr = [
          { name: '发单招聘', url: '/createOrderTaking' }, { name: '发单管理', url: '/checkReceipt' },
          { name: '账户设置', url: '/companyForm' }, { name: '切换团队', url: '' }, { name: '退出登录', url: '/login' }
        ]
      }
      return arr
    }
  },
  methods: {
    getInfo () {
      getConfigInfo().then(res => {
        this.info = res.data
      })
    },
    getImgUrl,
    handleCommand (val) {
      let text = localStorage.getItem('userType') == 2 ? '切换企业' : '切换团队'
      let type = localStorage.getItem('userType') == 2 ? 2 : 1
      if (!val) {
        this.$confirm(`确定${text}账号吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            uid: localStorage.getItem('uid'),
            type: type
          }
          userSwitchRole(params).then(res => {
            if (res.data) {
              this.$message.success("切换成功，请登录账户");
              this.$router.replace('/login');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else if (val == '/login') {
        this.$confirm(`确定退出登录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("logoutUser").then(res => {
            this.$message.success("退出登录成功");
            this.$router.replace(val);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      }
      else {
        this.$router.push(val)
      }
    },
    switchNav (item, index) {
      this.$router.push(item.url)
    },
    selectCity() {
      this.$emit('selectCity')
    }
  }
}
</script>
<style lang="scss" scoped>
.orderTaking-header {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.home-purple-left {
  color: #fff;
}
.home {
  .header-left {
    display: inline-block;
  }
  .bg-purple .welcome {
    font-size: 14px;
    margin-left: 8px;
  }
}
.head-icon {
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border-radius: 50%;
}
.home-aside {
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>