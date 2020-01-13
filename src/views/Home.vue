
<style lang="scss">
 @import '@/assets/css/home.scss';
</style>
<template>
  <el-container>
    <el-header class="header x-flex-around home" height="50px" id="header">
      <headerView :activeIndex="0"></headerView>
    </el-header>
    <el-main class="home-main-content">
      <div class="home-main-box">
        <div class="search-main-box">
          <searchInput @searchQuery="searchQuery"></searchInput>
        </div>
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
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <p class="home-main-list-title" @click="$router.push({path:'orderTakingDetail',query:{id:item.id,uid:item.uid}})" :class="{'home-list-title-active':index==0}">{{item.name}}</p>
                  <el-row type="flex" justify="space-between" class="home-list-clearfix home-list-clearfix-active">
                    <el-col :span="14">
                      <div class="bg-purple" v-if="item.money_type==1">{{getmoneyType(item.money_type)}}薪: {{item.money_min}} ~ {{item.money_max}}元</div>
                      <div class="bg-purple" v-else>{{getmoneyType(item.money_type)}}薪: {{item.money}}元</div>

                    </el-col>
                    <el-col :span="10">
                      <div class="bg-purple-light">需求人数: {{item.required_number}}人</div>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="space-between" class="home-list-clearfix">
                    <el-col :span="14">
                      <div class="bg-purple">返利: {{item.reward_money}}/人/{{getRewardType(item.reward_type)}}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="bg-purple-light">返利方式: {{getRewardType(item.reward_type)}}</div>
                    </el-col>
                  </el-row>
                </div>
                <div class="clearfix-bottom x-flex-between">
                  <span> {{item.com_name}}</span>
                  <el-button type="primary" @click="handleApply(item)" size="medium" plain class="handle-btn">接单</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-button class="home-main-more" v-if="list&&list.length" @click="$router.push('OrderTaking')">查看更多</el-button>
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
    <Dialog :centerDialogVisible="centerDialogVisible" :modalInfo="modalInfo" @handleClose="centerDialogVisible=false" @handleOk="handleOk"></Dialog>
    <FooterView></FooterView>
    <AsideBox :isShow="isShow"></AsideBox>
  </el-container>
</template>
<script>
// @ is an alias to /src
import searchInput from '@/components/searchInput'
import { homeList, advertisementList } from '../api/home'
import { addApply } from '@/api/orderTarking'
import Dialog from '@/components/Dialog'
import HeaderView from '@/components/HeaderView'
import FooterView from '@/components/FooterView'
import AsideBox from '@/components/AsideBox'
import { inquiryList } from '@/api/information'
import { getImgUrl } from '@/util/util'
export default {
  name: 'home',
  components: {
    FooterView,
    searchInput,
    AsideBox,
    Dialog,
    HeaderView
  },
  data () {
    return {
      activeIndex: 0,
      keywords: '',
      isShow: false,
      centerDialogVisible: false,
      textShow: true,
      modalInfo: {
        title: '申请成功！',
        okText: '查看申请',
        closeText: '关闭',
        imgBg: require('../assets/img/success.png')
      },
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
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleOk () {
      this.centerDialogVisible = false
      this.$router.push('teamApplication')
    },
    windowScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
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
        this.list = res.data.data.data
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleApply (val) {
      if (this.token) {
        let params = {
          job_id: val.id,
          uid: localStorage.getItem('uid')
        }
        addApply(params).then(res => {
          if (res.data) {
            this.centerDialogVisible = true
          }
          else {
            this.$message.error('接单失败')
          }
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
        text = '时返'
      }
      else {
        text = '一次性返利'
      }
      return text
    },
  },
  destroyed () {
    window.removeEventListener('scroll', this.windowScroll)
  }
}
</script>

