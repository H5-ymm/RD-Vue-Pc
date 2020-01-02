<style lang="scss">
 @import '@/assets/css/orderTarking.scss';
 .orderTaking-main-content .orderTaking-detail {
  height: 200px;
  width: 100%;
  background: url('../assets/img/detailsBg.jpg') no-repeat top center;
  background-size: contain；
}
.orderTaking-jobDeail {
   background: #fff;
   margin: 20px 0;
   padding:0 20px;
   height: 148px;
   line-height: 36px;
}
.orderTaking-jobDeail .job-name-top {
  font-size:28px;
  font-weight:400;
}
.orderTaking-main-col1 .orderTaking-card {
  margin-bottom: 20px;
  background: #fff;
}
.orderTaking-jobDeail .job-name-top .job-status{
  background:#61BC74;
  color: #fff;
  font-size: 12px;
  border-radius:10px;
  width:62px;
  height:22px;
  display: inline-block;
  text-align: center;
  line-height: 22px;
  margin-left: 15px;
}
.panel-content {
  padding: 20px 28px 0;
}
.orderTaking-info {
  color: #6A6A6A;
  margin-right: 20px;
  width: 50%;
}
.orderTaking-info span{
  font-size:16px;
  color: #333;
  display: inline-block;
  margin-right: 20px;
}
.orderTaking-info span:nth-of-type(1){
  text-align: right;
  font-size:14px;
  width: 100px;
  margin-left: -30px;
}
.orderTaking-jobDeail .orderTarking-btn {
  width: 298px;
  padding: 6px 20px;
}
.orderTarking-link {
  margin-left: 5px;
}
 .company-detail {
  background:#fff;
  min-height:321px;
  margin: 0 auto 20px;
  text-align: center;
  font-size: 14px;
  color: #6A6A6A;
  padding: 0 28px 0;
}
.company-detail .company-logo {
  width:82px;
  height:82px;
  margin: 20px auto 10px;
}
.company-detail .company-name {
  font-size:16px;
  text-align: center;
  font-weight:bold;
}
.company-detail .company-profile {
  text-align: left;
  line-height: 23px;
  margin-top: 10px;
  padding-bottom: 10px;
}
.company-detail .company-profile-content {
  overflow : hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.company-detail .company-profile>span {
  color: #999999;
  font-size: 14px;
}
.company-detail .profile-more {
  margin: 0 5px;
}
</style>
<template>
  <el-container class="orderTaking">
    <el-header class="header x-flex-around home" height="50px" id="header">
      <headerView :activeIndex="1"></headerView>
    </el-header>
    <el-main class="orderTaking-main-content">
      <div class="orderTaking-detail"></div>
      <div class="orderTaking-main-list orderTaking-detail-content">
        <div class="x-flex-between orderTaking-jobDeail">
          <div class="orderTaking-jobDeail-left">
            <p class="job-name-top x-flex-between">
              {{orderTakingDetail.name}}
              <span class="job-status">招聘中</span>
            </p>
            <p>职位类别</p>
            <p>发布时间：2019-12-01 15:32</p>
          </div>
          <div class="orderTaking-jobDeail-right">
            <el-button
              type="primary"
              size="medium"
              class="orderTarking-btn"
              @click="applyReceipt"
              plain
            >申请接单</el-button>
            <div class="x-flex-around">
              <p class="x-flex-around">
                <img src="../assets/img/collect.png" alt />
                <el-link :underline="false" class="orderTarking-link" @click="handleCollect">收藏</el-link>
              </p>
              <p class="x-flex-around">
                <img src="../assets/img/tip.png" alt />
                <el-link
                  :underline="false"
                  class="orderTarking-link"
                  @click="tipDialogVisible = true"
                >举报</el-link>
              </p>
            </div>
          </div>
        </div>
        <div class="orderTaking-main-row">
          <div class="orderTaking-main-col1">
            <div class="grid-content">
              <section class="orderTaking-card">
                <Panel title="接单详情">
                  <div slot="content" class="panel-content x-flex-start">
                    <div class="orderTaking-info">
                      <p>
                        <span>需求人数：</span>
                        <span>{{orderTakingDetail.required_number}}</span>
                      </p>
                      <p>
                        <span>年龄：</span>
                        <span>{{orderTakingDetail.min_age}}-{{orderTakingDetail.max_age}}周岁</span>
                      </p>
                      <p>
                        <span>性别：</span>
                        <span>{{orderTakingDetail.sex==1?'男':'女'}}</span>
                      </p>
                      <p>
                        <span>工作地址：</span>
                        <span>{{orderTakingDetail.address}}</span>
                      </p>
                    </div>
                    <div class="orderTaking-info">
                      <p>
                        <span>月薪：</span>
                        <span>{{orderTakingDetail.money}}</span>
                      </p>
                      <p>
                        <span>缴纳五险：</span>
                        <span>{{orderTakingDetail.is_five_risks==1?'是':'否'}}</span>
                      </p>
                      <p>
                        <span>缴纳公积金：</span>
                        <span>{{orderTakingDetail.is_fund==1?'是':'否'}}</span>
                      </p>
                      <p>
                        <span>要求学历：</span>
                        <span>{{orderTakingDetail.education}}</span>
                      </p>
                    </div>
                  </div>
                </Panel>
              </section>
              <section class="orderTaking-card">
                <Panel title="职位描述">
                  <div slot="content" class="panel-content" v-html="orderTakingDetail.job_content"></div>
                </Panel>
              </section>
              <section class="orderTaking-card">
                <Panel title="返利详情">
                  <div slot="content" class="panel-content x-flex-start">
                    <div class="orderTaking-info">
                      <p>
                        <span>返利方式：</span>
                        <span>{{getRewardType(orderTakingDetail.reward_type)}}</span>
                      </p>
                      <p v-if="orderTakingDetail.reward_type==1">
                        <span>结算时间：</span>
                        <span>次月第{{orderTakingDetail.settlement_time}}号结算</span>
                      </p>
                      <p class="team-info-card-item" v-else>
                        <span>结算时间：</span>
                        <span>{{orderTakingDetail.settlement_type==1?'本':'次'}}{{orderTakingDetail.reward_money_type==1?'天':orderTakingDetail.reward_money_type==2?'周': '月'}}{{orderTakingDetail.settlement_time?orderTakingDetail.settlement_time:'第一天'}}</span>
                      </p>
                      <p v-if="orderTakingDetail.reward_type==2||orderTakingDetail.reward_type==3">
                        <span>持续时长：</span>
                        <span>{{orderTakingDetail.settlement_time?orderTakingDetail.settlement_time:'1'}}{{orderTakingDetail.reward_continuous==1?'天':orderTakingDetail.reward_continuous==2?'周': '个月'}}</span>
                      </p>
                      <p class="team-info-card-item" v-if="orderTakingDetail.reward_type==4">
                        <span>需入职满：</span>
                        <span
                          v-if="orderTakingDetail.reward_needtime"
                        >{{orderTakingDetail.reward_needtime}}{{orderTakingDetail.reward_continuous==1?'天':orderTakingDetail.reward_continuous==2?'周': '月'}}</span>
                        <span
                          v-else
                        >当{{orderTakingDetail.reward_continuous==1?'天':orderTakingDetail.reward_continuous==2?'周': '月'}}返利</span>
                      </p>
                    </div>
                    <div class="orderTaking-info">
                      <p>
                        <span>返利金额：</span>
                        <span>{{orderTakingDetail.reward_money}}元/人/{{rewardMoney}}</span>
                      </p>
                      <p v-if="orderTakingDetail.reward_money_type==1">
                        <span>返利时长：</span>
                        <span v-if="orderTakingDetail.reward_money_type==1">长期返利</span>
                        <span
                          v-if="orderTakingDetail.reward_money_type==2"
                        >持续返利{{orderTakingDetail.settlement_time?orderTakingDetail.settlement_time:'1'}}{{orderTakingDetail.reward_continuous==1?'天':orderTakingDetail.reward_continuous==2?'周': '月'}}</span>
                      </p>
                      <p v-if="orderTakingDetail.reward_type==2||orderTakingDetail.reward_type==3">
                        <span>需入职满：</span>
                        <span>{{orderTakingDetail.reward_needtime?orderTakingDetail.reward_needtime:'1'}}{{orderTakingDetail.reward_continuous==1?'天':orderTakingDetail.reward_continuous==2?'周': '个月'}}</span>
                      </p>
                    </div>
                  </div>
                </Panel>
              </section>
              <section class="orderTaking-card">
                <Panel title="推荐接单">
                  <section
                    slot="content"
                    class="orderTaking-main-card"
                    v-for="(item,index) in list"
                    :key="index"
                    :class="{'orderTaking-main-sectionActive':index==0}"
                  >
                    <div class="orderTaking-main-section x-flex-between">
                      <div class="orderTaking-main-row orderTaking-main-row1">
                        <ul class="orderTaking-main-item">
                          <li class="job-name">
                            <span class="company-name">{{item.name}}</span>
                          </li>
                          <li class="require-number">
                            <span>需求人数：{{item.required_number}}人</span>
                          </li>
                          <li>返利方式：{{getRewardType(item.reward_type)}}</li>
                        </ul>
                        <ul class="orderTaking-main-item">
                          <li>{{getmoneyType(item.money_type)}}薪: {{item.money}}/人/{{getmoneyType(item.money_type)}}</li>
                          <li>返利：{{item.reward_money_type}}/人/{{getmoneyType(item.money_type)}}</li>
                          <li
                            v-if="item.reward_money_type==3"
                          >持续时间：{{item.reward_money_type==1?'长期返利':'持续返利'}}</li>
                          <li
                            v-if="item.reward_money_type!=3&&item.reward_continuous"
                          >持续时间：{{item.reward_continuous}}{{getmoneyType(item.money_type)}}</li>
                        </ul>
                      </div>
                      <div class="orderTaking-main-col">
                        <ul class="orderTaking-main-item">
                          <li class="company-name x-flex-start-justify">
                            <span>{{item.com_name}}</span>
                            <img
                              src="../assets/img/noIcon.png"
                              class="orderTaking-icon"
                              alt
                              v-if="item.status==2"
                            />
                            <img src="../assets/img/noIcon.png" alt v-else />
                            <span class="ctime">{{ $moment(item.ctime).format('HH:mm')}}发布</span>
                          </li>
                          <li>
                            <el-tag size="small" v-if="item.is_fund">五险</el-tag>
                            <el-tag size="small" v-if="item.is_fund==1">公积金</el-tag>
                            <el-tag size="small" v-if="item.is_fund==2">试用期过后</el-tag>
                          </li>
                          <li>地点：{{item.address}}</li>
                        </ul>
                      </div>
                      <div>
                        <el-button type="primary">查看详情</el-button>
                      </div>
                    </div>
                  </section>
                </Panel>
              </section>
            </div>
          </div>
          <div class="orderTaking-main-col2">
            <div class="company-detail">
              <img :src="logoUrl" alt class="company-logo" />
              <p class="company-name">{{companyInfo.com_name}}</p>
              <div class="x-flex-between">
                <p class="x-flex-around">
                  <img src="../assets/img/hy.png" alt />
                  <span :underline="false" class="orderTarking-link">{{companyInfo.com_sort}}</span>
                </p>
                <p class="x-flex-around">
                  <img src="../assets/img/my.png" alt />
                  <span :underline="false" class="orderTarking-link">{{companyInfo.com_scale}}</span>
                </p>
              </div>
              <div class="x-flex-between">
                <p class="x-flex-around">
                  <img src="../assets/img/address.png" alt />
                  <span :underline="false" class="orderTarking-link">{{companyInfo.address}}</span>
                </p>
              </div>
              <div class="company-profile">
                <span>公司简介</span>
                <p
                  class="company-profile-content"
                  ref="content"
                  v-html="companyInfo.content+'哈哈哈哈哈哈哈哈哈哈哈剋坎坎坷坷坎坎坷坷'"
                ></p>
                <p class="x-flex-center" @click="showMore()">
                  <img src="../assets/img/moreDown.png" alt />
                  <span class="profile-more">查看更多</span>
                </p>
              </div>
            </div>
            <div class="bg-purple-light">
              <p class="job-title">该公司的接单职位</p>
              <div>
                <ul
                  class="orderTaking-main-item orderTaking-main-history"
                  v-for="(item,index) in browsingList"
                  :key="index"
                >
                  <li class="x-flex-between">
                    <span class="company-name">{{item.name}}</span>
                    <span class="require-number">{{item.required_number}}人</span>
                  </li>
                  <li class="x-flex-between">
                    <span class="require-number">{{getmoneyType(item.money_type)}}薪:</span>
                    <span>{{item.money}}/人/{{getmoneyType(item.money_type)}}</span>
                  </li>
                  <li class="x-flex-between">{{item.com_name}}</li>
                </ul>
              </div>
            </div>
            <div class="orderTaking-login">
              <LoginBox></LoginBox>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <FooterView></FooterView>
    <AsideBox :isShow="isShow"></AsideBox>
    <Dialog
      :centerDialogVisible="centerDialogVisible"
      :modalInfo="modalInfo"
      @handleClose="handleClose"
      @handleOk="handleOk"
    ></Dialog>
    <TipDialog :tipDialogVisible="tipDialogVisible"></TipDialog>
  </el-container>
</template>
<script>
// @ is an alias to /src
import homeAside from '@/components/Aside' //侧边栏
import ModalCity from '@/components/ModalCity'
import LoginBox from '@/components/LoginBox'
import Panel from '@/components/Panel'
import Dialog from '@/components/Dialog'
import TipDialog from '@/components/TipDialog'
import AsideBox from '@/components/AsideBox'
import HeaderView from '@/components/HeaderView'
import FooterView from '@/components/FooterView'
import { getOrderDetail, getList } from '../api/orderTarking'
import { getCompanyDetail, getCompanyInfo } from '../api/company'
import { teamCollectionJob } from '../api/collect'
import { moneyTypeList } from '../base/base'
export default {
  name: 'home',
  components: {
    homeAside,
    ModalCity,
    LoginBox,
    Panel,
    Dialog,
    TipDialog,
    FooterView,
    HeaderView,
    AsideBox
  },
  data () {
    return {
      tipDialogVisible: false,
      dialogVisible: false,
      centerDialogVisible: false,
      total: 0,
      activeIndex: 0,
      keywords: '',
      menus: [
        {
          title: '首页',
          url: ''
        },
        {
          title: '接单',
          url: ''
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
        type: '',
        kew_name: '',
        limit: 20,
        page: 1
      },
      list: [],
      areaList: [],
      moneyTypeList,
      money_type: '',
      browsingList: [],
      orderTakingDetail: {},
      companyInfo: {},
      id: '',
      uid: '',
      isShow: false,
      textShow: true,
      modalInfo: {
        title: '收藏成功！',
        okText: '继续逛逛',
        closeText: '查看收藏',
        imgBg: require('../assets/img/collect1.png')
      },
      dialogType: 1
    }
  },
  computed: {
    rewardMoney () {
      if (this.id) {
        return this.orderTakingDetail.money_type == 1 ? '月' : this.orderTakingDetail.money_type == 2 ? '日' : '时'
      }
    },
    logoUrl () {
      console.log(`http://tiantianxsg.com:39888/` + this.companyInfo.logo_url)
      return `http://tiantianxsg.com:39888/` + this.companyInfo.logo_url
    }
  },
  created () {
    this.getData(this.params)
    this.id = this.$route.query.id
    this.uid = this.$route.query.uid
    this.getOrderTakingData()
    this.getCompanyData(this.uid)
  },
  mounted () {
    window.addEventListener('scroll', this.windowScroll)
    if (this.$refs.content.clientHeight > 30) {
      this.textShow = true
      this.$refs.content.style.display = '-webkit-box'
    }
    else {
      this.textShow = false
    }
  },
  methods: {
    showMore () {
      this.$refs.content.style.display = ''
    },
    windowScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop - document.documentElement.clientHeight + 400 >= 0) {
        this.isShow = true
      }
      else {
        this.isShow = false
      }
    },
    getOrderTakingData () {
      let params = {
        id: this.id
      }
      getOrderDetail(params).then(res => {
        this.orderTakingDetail = res.data
      })
    },
    getCompanyData (uid) {
      getCompanyDetail({ uid }).then(res => {
        console.log(res)
        this.companyInfo = res.data
      }).catch(error => {
        this.message.$error(error.status.remind)
      })
    },
    switchNav (item, index) {
      this.activeIndex = index
    },
    getData (params) {
      getList(params).then(res => {
        console.log(res.data.count)
        this.list = res.data.data.data
        console.log(this.list)
        this.browsingList = res.data.data.data
        this.total = res.data.count
      }).catch(error => {
        this.message.$error(error.status.remind)
      })
    },
    applyReceipt () {
      this.modalInfo = {
        title: '申请成功！',
        okText: '查看申请',
        closeText: '关闭',
        imgBg: require('../assets/img/success.png')
      }
    },
    // 收藏
    handleCollect () {
      let params = {
        uid: this.orderTakingDetail.uid,
        jobId: this.orderTakingDetail.id
      }
      teamCollectionJob(params).then(res => {
        this.centerDialogVisible = true
      }).catch(error => {
        this.message.$error(error.status.remind)
      })
    },
    handleClose () {
      this.centerDialogVisible = false
      if (this.dialogType == 2) {
        this.$router.push('CollectJob')
      }
    },
    handleOk () {
      this.centerDialogVisible = false
      if (this.dialogType == 1) {
        this.$router.push('teamApplication')
      }
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
    }
  }
}
</script>