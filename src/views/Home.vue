
<style lang="scss">
 @import '@/assets/css/home.scss';
</style>
<template>
  <el-container>
    <el-header class="header x-flex-around home" height="50px" id="header">
      <div class="orderTaking-header">
        <div class="bg-purple">
          <span class="header-left">人事达</span>
          <span class="home-purple-left">
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
    </el-header>
    <el-main class="home-main-content">
      <div class="home-main-box">
        <searchInput @searchQuery="searchQuery"></searchInput>
        <el-row class="home-img-box" v-if="imgList.length">
          <el-col :span="16">
            <div class="grid-content bg-purple-img">
              <img :src="getImgUrl(imgList[0].image)" alt="">
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bg-purple-right grid-content">
              <div class="bg-purple-img-right"><img :src="getImgUrl(imgList[1].image)" alt=""></div>
              <div class="bg-purple-img-right bg-purple-img-right1"> <img :src="getImgUrl(imgList[2].image)" alt=""></div>
            </div>
          </el-col>
        </el-row>
        <section class="home-main-section">
          <p class="home-main-title">
            <img src="../assets/img/icon.png" />
            接单职位
          </p>
          <el-row :gutter="20" class="home-main-list">
            <el-col :span="8" v-for="(item, index) in list" :key="index">
              <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                  <p class="home-main-list-title" @click="$router.push({path:'orderTakingDetail',query:{id:item.id,uid:item.uid}})" :class="{'home-list-title-active':index==0}">{{item.name}}</p>
                  <el-row type="flex" justify="space-between" class="home-list-clearfix home-list-clearfix-active">
                    <el-col :span="14">
                      <div class="bg-purple">{{getmoneyType(item.money_type)}}薪: {{item.money}}元</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="bg-purple-light">需求人数: {{item.required_number}}人</div>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="space-between" class="home-list-clearfix">
                    <el-col :span="14">
                      <div class="bg-purple">返利:{{item.reward_money_type}}/人/{{getmoneyType(item.money_type)}}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="bg-purple-light">返利方式: {{getRewardType(item.reward_type)}}</div>
                    </el-col>
                  </el-row>
                </div>
                {{item.com_name}}
                <el-button type="primary" @click="handleApply(item)" size="medium" plain class="handle-btn">接单</el-button>
              </el-card>
            </el-col>
          </el-row>
          <el-button class="home-main-more" @click="$router.push('OrderTaking')">查看更多</el-button>
        </section>
        <section class="home-main-section">
          <div class="home-main-title x-flex-between">
            <p> <img src="../assets/img/icon2.png" />资讯</p>
            <p class="x-flex-end">
              <el-link type="primary" @click="$router.push('information')">查看更多</el-link>
              <img src="../assets/img/more.png" alt />
            </p>
          </div>
          <el-row class="home-main-list">
            <el-col :span="12" v-for="(item, index) in informationList" :key="index">
              <div class="grid-information-card">
                <img :src="item.image" class="grid-information-img" />
                <div class="grid-information">
                  <el-link :underline="false" class="grid-information-title" href="informationDetail">{{item.title}}</el-link>
                  <p class="grid-information-content" v-html="item.content"></p>
                </div>
              </div>
            </el-col>
          </el-row>
        </section>
      </div>
    </el-main>
    <FooterView></FooterView>
    <AsideBox :isShow="isShow"></AsideBox>
  </el-container>
</template>
<script>
// @ is an alias to /src
import searchInput from '@/components/searchInput'
import { homeList, advertisementList } from '../api/home'
import { addApply } from '@/api/orderTarking'
import FooterView from '@/components/FooterView'
import AsideBox from '@/components/AsideBox'
import { inquiryList } from '@/api/information'
import { getImgUrl } from '@/util/util'
export default {
  name: 'home',
  components: {
    FooterView,
    searchInput,
    AsideBox
  },
  data () {
    return {
      activeIndex: 0,
      keywords: '',
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
      params: {
        limit: 20,
        page: 1
      },
      informationList: [],
      list: [],
      userInfo: null,
      token: localStorage.getItem('token'),
      isShow: false,
      paramsInfo: {
        limit: 2,
        page: 1
      },
      imgList: [],
      userName: localStorage.getItem('userName')
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
  created () {
    this.getImgList()
    this.getList(this.params)
    this.getInfoList(this.paramsInfo)
    // this.token = localStorage.getItem('token')
    if (sessionStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }
  },
  mounted () {
    window.addEventListener('scroll', this.windowScroll)
  },
  methods: {
    handleCommand (val) {
      this.$router.push(val)
      if (val == 'login') {
        localStorage.clear('')
        sessionStorage.clear('')
      }
    },
    getImgUrl,
    getImgList () {
      let params = {
        limit: 3,
        page: 1
      }
      advertisementList(params).then(res => {
        this.imgList = res.data.data
        console.log(res.data.data)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    windowScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      console.log(scrollTop - document.documentElement.clientHeight)
      if (scrollTop - document.documentElement.clientHeight + 500 >= 0) {
        this.isShow = true
      }
      else {
        this.isShow = false
      }
    },
    switchNav (item, index) {
      this.activeIndex = index
      this.$router.push(item.url)
    },
    getInfoList (params) {
      inquiryList(params).then(res => {
        this.informationList = res.data.data
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    getList (params) {
      homeList(params).then(res => {
        console.log(res)
        this.list = res.data.data.data
        console.log(this.list)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleApply (val) {
      if (this.token) {
        let params = {
          job_id: val.id,
          uid: val.uid
        }
        addApply(params).then(res => {
          console.log(res)
        }).catch(error => {
          this.$message.error(error.status.remind)
        })
      }
      else {
        this.$router.push('login')
      }
    },
    searchQuery (val) {
      let params = Object.assign(val, this.params)
      this.getList(params)
    },
    getmoneyType (type) {
      return type === 1 ? '日' : type === 2 ? '月' : '时'
    },
    getRewardType (type) {
      let text = ''
      if (type == 1) {
        text = '月返'
      }
      else if (type == 2) {
        text = '日返'
      }
      else if (type == 3) {
        text = '周返'
      }
      else {
        text = '一次性返利'
      }
      return text
    },
  },
  destroyed () {
    console.log(2)
    window.removeEventListener('scroll', this.windowScroll)
  }
}
</script>

