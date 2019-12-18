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
            <li
              v-for="(item, index) in menus"
              class="nav-item"
              :key="index"
              @click="switchNav(item, index)"
              :class="{'active': activeIndex==index}"
            >
              {{item.title}}
              <span class="line" v-if="activeIndex==index"></span>
            </li>
          </ul>
        </div>
        <div class="bg-purple-light bg-purple">
          <span class="home-purple-left" v-if="!userInfo">
            <i class="el-icon-user-solid"></i>
            <a class="welcome" href="login">登录</a>
            <a class="divider">|</a>
            <a class="welcome" href="register">注册</a>
          </span>
          <P class="home-purple-left" v-else>
            <img :src="userInfo.head_img" alt v-if="userInfo.head_img" />
            <i class="el-icon-user-solid" v-else></i>&nbsp;
            <span>{{userInfo.user_name?userInfo.user_name:userInfo.mobile}}</span>
          </P>
          <a class="el-icon-phone-outline">&nbsp;021-51991869</a>
        </div>
      </div>
    </el-header>
    <el-main class="home-main-content">
      <div class="home-main-box">
        <searchInput @searchQuery="searchQuery"></searchInput>
        <el-row class="home-img-box">
          <el-col :span="16">
            <div class="grid-content bg-purple-img"></div>
          </el-col>
          <el-col :span="8">
            <div class="bg-purple-right grid-content">
              <div class="bg-purple-img-right"></div>
              <div class="bg-purple-img-right bg-purple-img-right1"></div>
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
                  <p class="home-main-list-title" :class="{'home-list-title-active':index==0}">全职拉新</p>
                  <el-row
                    type="flex"
                    justify="space-between"
                    class="home-list-clearfix home-list-clearfix-active"
                  >
                    <el-col :span="14">
                      <div
                        class="bg-purple"
                      >{{getmoneyType(item.money_type)}}薪: {{item.money}}/人/{{getmoneyType(item.money_type)}}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="bg-purple-light">需求人数: {{item.required_number}}人</div>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="space-between" class="home-list-clearfix">
                    <el-col :span="14">
                      <div class="bg-purple">返利:</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="bg-purple-light">返利方式: {{getRewardType(item.reward_type)}}</div>
                    </el-col>
                  </el-row>
                </div>
                {{item.com_name}}
                <el-button type="primary" size="medium" plain class="handle-btn">接单</el-button>
              </el-card>
            </el-col>
          </el-row>
          <el-button class="home-main-more" @click="$router.push('OrderTaking')">查看更多</el-button>
          <div class="home-main-more-right">
            <el-link type="primary" @click="$router.push('OrderTaking')">查看更多</el-link>
            <img src="../assets/img/more.png" alt />
          </div>
        </section>
        <section class="home-main-section">
          <p class="home-main-title">
            <img src="../assets/img/icon.png" />资讯
          </p>
          <el-row>
            <el-col :span="12" v-for="(item, index) in informationList" :key="index">
              <div class="grid-information-card">
                <img :src="item.imgUrl" class="grid-information-img" />
                <div class="grid-information">
                  <p class="grid-information-title">{{item.title}}</p>
                  <p class="grid-information-content">{{item.content}}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </section>
      </div>
    </el-main>
    <el-footer height="320px">
      <section class="home-main-section home-main-section-footer">
        <el-row :gutter="20" class="footer-main" type="flex" justify="start">
          <el-col :span="4">
            <ul class="home-footer-box">
              <li class="home-footer-title">企业服务</li>
              <li>公司搜索</li>
              <li>职位搜索</li>
              <li>新闻咨讯</li>
            </ul>
          </el-col>
          <el-col :span="10">
            <ul class="home-footer-box">
              <li class="home-footer-title">联系方式</li>
              <li>仁达网络科技(上海)有限公司</li>
              <li>公司地址：上海市浦东新区金海路2588号1幢A区310室</li>
              <li>服务热线：021-51991869（9:00-18:00)</li>
              <li>违法和不良信息举报邮箱：</li>
            </ul>
          </el-col>
          <el-col :span="8" :offset="8">
            <ul class="home-footer-box home-footer-box1">
              <li class="home-footer-title">微信公众号</li>
              <li>
                <img src="../assets/img/qrcode.png" class="home-footer-img" />
              </li>
            </ul>
          </el-col>
        </el-row>
      </section>
    </el-footer>
    <ul class="fixed">
      <li>
        <a href="#header">
          <el-tooltip class="item" effect="dark" content="一键置顶" placement="left">
            <img src="../assets/img/top.png" alt />
          </el-tooltip>
        </a>
      </li>
      <li>
        <el-tooltip class="item" effect="dark" content="联系客服" placement="left">
          <img src="../assets/img/kefu.png" alt />
        </el-tooltip>
      </li>
      <li class="help">
        <el-tooltip class="item" effect="dark" content="帮助反馈" placement="left">
          <img src="../assets/img/help.png" alt />
        </el-tooltip>
      </li>
    </ul>
  </el-container>
</template>
<script>
// @ is an alias to /src
import homeAside from '@/components/Aside' //侧边栏
import searchInput from '@/components/searchInput'
import { homeList } from '../api/home'
export default {
  name: 'home',
  components: {
    homeAside,
    searchInput
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
          title: '拼团',
          url: ''
        },
        {
          title: '资讯',
          url: ''
        }
      ],
      params: {
        limit: 20,
        page: 1
      },
      informationList: [{
        imgUrl: require('../assets/img/img1.png'),
        title: '当代职场人：7成人入职不满3年就跳槽',
        content: '近日，前程无忧最新发布的“2019年第四季度求职者跳槽意愿度调查”结果显示：2019年第四季度有明确跳槽意愿的受访者占35.2%，和上个季度比没有太大变化。进入2019年的尾声，大部分职场人本着“拿完年'
      },
      {
        imgUrl: require('../assets/img/img2.png'),
        title: '大多数90后离职和薪资有关，面试能说吗？',
        content: '你是不是也听到过这样的言论，比如“90后太难管了，说两句就要离职”、“现在的90后离职率比80后高多了”……所以，这些宁愿折损“名声”也要离职的90后到底都经历了什么？'
      }],
      list: [],
      userInfo: null,
      token: ''
    }
  },
  computed: {

  },
  methods: {
    switchNav (item, index) {
      this.activeIndex = index
      this.$router.push(item.url)
    },
    getList (params) {
      homeList(params).then(res => {
        console.log(res)
        this.list = res.data.data.data
        console.log(this.list)
      })
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
        text = '按月结算'
      }
      else if (type == 2) {
        text = '按日结算'
      }
      else if (type == 3) {
        text = '按周结算'
      }
      else {
        text = '一次性返利'
      }
      return text
    }
  },
  created () {
    this.getList(this.params)
    // this.token = localStorage.getItem('token')
    if (sessionStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }
  }
}
</script>

<style lang="scss">
 @import '@/assets/css/home.scss';
</style>
