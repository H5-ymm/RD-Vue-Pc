<style lang="scss">
@import "@/assets/css/orderTarking.scss";
.orderTaking-main-content .orderTaking-detail {
  height: 200px;
  width: 100%;
  background: url("../assets/img/detailsBg.jpg") no-repeat top center;
  background-size: contain；;
}
.orderTaking-jobDeail {
  background: #fff;
  margin: 20px 0;
  padding: 0 20px;
  height: 148px;
  line-height: 36px;
}
.orderTaking-jobDeail .job-name-top {
  font-size: 28px;
  font-weight: 400;
}
.orderTaking-main-col1 .orderTaking-card {
  margin-bottom: 14px;
  background: #fff;
}
.orderTaking-jobDeail .job-name-top .job-status {
  background: #61bc74;
  color: #fff;
  font-size: 12px;
  border-radius: 10px;
  width: 62px;
  height: 22px;
  display: inline-block;
  text-align: center;
  line-height: 22px;
  margin-left: 15px;
}
.panel-content {
  padding: 20px 28px 0;
  font-size: 14px;
}
.orderTaking-info {
  color: #6a6a6a;
  margin-right: 20px;
  width: 50%;
}
.orderTaking-info span {
  font-size: 16px;
  color: #333;
  display: inline-block;
  margin-right: 20px;
}
.orderTaking-info span:nth-of-type(1) {
  text-align: right;
  font-size: 14px;
  width: 100px;
  margin-left: -30px;
  color: #6a6a6a;
}
.orderTaking-jobDeail .orderTarking-btn {
  width: 298px;
  padding: 14px 20px;
}
.orderTarking-link {
  margin-left: 5px;
}
.company-detail {
  background: #fff;
  min-height: 321px;
  margin: 0 auto 20px;
  text-align: center;
  font-size: 14px;
  color: #6a6a6a;
  padding: 0 28px 0;
  .company-item {
    margin-bottom: 10px;
  }
  .company-logo {
    width: 82px;
    height: 82px;
    margin: 20px auto 10px;
  }
  .company-name {
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }
  .company-profile {
    text-align: left;
    line-height: 23px;
    margin-top: 10px;
    padding-bottom: 10px;
  }
  .company-profile-content {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .company-profile > span {
    color: #999999;
    font-size: 14px;
  }
  .profile-more {
    margin: 0 5px;
  }
  .view-detail {
    &:hover {
      background: #1890ff;
      color: #fff;
    }
  }
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
            <p class="job-name-top x-flex-start-justify">
              {{orderTakingDetail.name}}
              <span class="job-status">招聘中</span>
            </p>
            <p>{{orderTakingDetail.job_type}}</p>
            <p>发布时间：{{$moment.unix(orderTakingDetail.ctime).format('YYYY-MM-DD HH:mm')}}</p>
          </div>
          <div class="orderTaking-jobDeail-right" v-if="userType==2">
            <el-button type="primary" size="medium" class="orderTarking-btn" @click="applyReceipt" plain>申请接单</el-button>
            <div class="x-flex-around" v-if="userType==2">
              <p class="x-flex-around" @click="handleCollect">
                <img src="../assets/img/collect.png" alt="">
                <el-link :underline="false" class="orderTarking-link" >{{orderTakingDetail.checkCollect?'取消收藏':'收藏'}}</el-link>
              </p>
              <p class="x-flex-around" @click="handleReport">
                <img src="../assets/img/tip.png" alt="">
                <el-link :underline="false" class="orderTarking-link" >{{orderTakingDetail.checkReport?'已举报':'举报'}}</el-link>
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
                        <span>{{orderTakingDetail.provinceName}}{{orderTakingDetail.cityName}}{{orderTakingDetail.address}}</span>
                      </p>
                    </div>
                    <div class="orderTaking-info">
                      <p>
                        <span>{{getmoneyType(orderTakingDetail.money_type)}}薪：</span>
                        <span v-if="orderTakingDetail.money_type==1">{{orderTakingDetail.money_min}} ~ {{orderTakingDetail.money_max}}</span>
                        <span v-else>{{orderTakingDetail.money}}</span>
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
                        <span>{{orderTakingDetail.educationName}}</span>
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
                        <span>次月{{orderTakingDetail.settlement_time?orderTakingDetail.settlement_time:1}}号结算</span>
                      </p>
                      <p class="team-info-card-item" v-else>
                        <span>结算时间：</span>
                        <span v-if="orderTakingDetail.reward_money_type==1">{{orderTakingDetail.settlement_type==1?'当':'次'}}{{orderTakingDetail.reward_money_type==1?'日':orderTakingDetail.reward_money_type==2?'周': '月'}}</span>
                        <span v-else>{{orderTakingDetail.settlement_type==1?'当':'次'}}{{orderTakingDetail.reward_money_type==1?'日':orderTakingDetail.reward_money_type==2?'周': '月'}}{{orderTakingDetail.settlement_time?orderTakingDetail.settlement_time:'第一天'}}</span>
                      </p>
                      <p v-if="orderTakingDetail.reward_type==2||orderTakingDetail.reward_type==3">
                        <span>持续时长：</span>
                        <span>{{orderTakingDetail.reward_duration?orderTakingDetail.reward_duration:'一'}}{{orderTakingDetail.reward_money_type==1?'天':orderTakingDetail.reward_money_type==2?'周': '个月'}}</span>
                      </p>
                      <p class="team-info-card-item" v-if="orderTakingDetail.reward_type==4">
                        <span>需入职满：</span>
                        <span v-if="orderTakingDetail.reward_needtime">{{orderTakingDetail.reward_needtime}}{{orderTakingDetail.reward_money_type==1?'天':orderTakingDetail.reward_money_type==2?'周': '月'}}</span>
                        <span v-else>一天</span>
                      </p>
                    </div>
                    <div class="orderTaking-info">
                      <p>
                        <span>返利金额：</span>
                        <span v-if="orderTakingDetail.reward_type!=4">{{orderTakingDetail.reward_money}}元/人/{{rewardMoney}}</span>
                        <span v-else>{{orderTakingDetail.reward_money}}元/人</span>
                      </p>
                      <p v-if="orderTakingDetail.reward_money_type==1">
                        <span>返利时长：</span>
                        <span v-if="orderTakingDetail.reward_money_type==1">长期返利</span>
                        <span v-if="orderTakingDetail.reward_money_type==2">持续返利{{orderTakingDetail.settlement_time?orderTakingDetail.settlement_time:'1'}}{{orderTakingDetail.reward_continuous==1?'天':orderTakingDetail.reward_continuous==2?'周': '月'}}</span>
                      </p>
                      <p v-if="orderTakingDetail.reward_type==2||orderTakingDetail.reward_type==3">
                        <span>需入职满：</span>
                        <span v-if="orderTakingDetail.reward_needtime">{{orderTakingDetail.reward_needtime?orderTakingDetail.reward_needtime:'一'}}{{orderTakingDetail.reward_continuous==1?'天':orderTakingDetail.reward_continuous==2?'周': '个月'}}</span>
                        <span v-else>一天</span>
                      </p>
                    </div>
                  </div>
                </Panel>
              </section>
              <section class="orderTaking-card">
                <Panel title="推荐接单">
                  <section slot="content" class="orderTaking-main-card" v-for="(item,index) in recommendedList" :key="index" :class="{'orderTaking-main-sectionActive':index==0}">
                    <div class="orderTaking-main-section x-flex-between">
                      <div class="orderTaking-main-row orderTaking-main-row1">
                        <ul class="orderTaking-main-item">
                          <li class="job-name">
                            <el-tooltip class="item" effect="dark" :content="item.name" placement="top-start">
                              <span class="company-name">{{item.name}}</span>
                            </el-tooltip>
                          </li>
                          <li class="require-number">
                            <span>需求人数：{{item.required_number}}人</span>
                          </li>
                          <li>返利方式：{{getRewardType(item.reward_type)}}</li>
                        </ul>
                        <ul class="orderTaking-main-item">
                          <li v-if="item.money_type==1">月薪: {{item.money_min}} ~ {{item.money_max}}/人</li>
                          <li v-else>{{getmoneyType(item.money_type)}}薪: {{item.money}}/人</li>
                          <li v-if="item.reward_type!=4">返利：{{item.reward_money}}/人/{{getmoneyType(item.reward_type)}}</li>
                          <li v-else>返利：{{item.reward_money}}/人</li>
                          <li v-if="item.reward_type==1">持续时间：{{item.reward_money_type==1?'长期返利':'持续返利'}}</li>
                          <li v-if="item.else&&item.reward_duration">持续时间：{{item.reward_duration}}{{getmoneyType(item.reward_money_type)}}</li>
                        </ul>
                      </div>
                      <div class="orderTaking-main-col">
                        <ul class="orderTaking-main-item">
                          <li class="company-name x-flex-start-justify">
                            <el-tooltip class="item" effect="dark" v-if="item.com_name" :content="item.com_name" placement="top-start">
                              <span>{{item.com_name}}</span>
                            </el-tooltip>
                          </li>
                          <li>
                            <el-tag size="small" v-if="item.is_fund">五险</el-tag>
                            <el-tag size="small" v-if="item.is_fund==1">公积金</el-tag>
                            <el-tag size="small" v-if="item.is_fund==2">试用期过后</el-tag>
                          </li>
                          <el-tooltip class="item" v-if="item.address" effect="dark" :content="`${item.address?item.address:''}`" placement="top-start">
                            <li class="text-line">地点：{{item.address}}</li>
                          </el-tooltip>
                          <li class="text-line" v-if="!item.address">地点:无</li>
                        </ul>
                      </div>
                      <div>
                        <el-button type="primary" plain class="view-detail" @click="viewJobDetail(item)">查看详情</el-button>
                      </div>
                    </div>
                  </section>
                </Panel>
              </section>
            </div>
          </div>
          <div class="orderTaking-main-col2">
            <div class="company-detail">
              <img :src="logoUrl" alt="" class="company-logo" v-if="companyInfo.logoUrl">
              <img src="../assets/img/headIcon2.png" alt="" class="company-logo" v-else>
              <el-tooltip class="item" effect="dark" :content="companyInfo.com_name" placement="top-start">
                <p class="company-name">{{companyInfo.com_name}}</p>
              </el-tooltip>
              <div class="x-flex-between">
                <p class="x-flex-around company-item">
                  <img src="../assets/img/hy.png" alt="">
                  <span :underline="false" class="orderTarking-link">{{companyInfo.com_typeName}}</span>
                </p>
                <p class="x-flex-around">
                  <img src="../assets/img/my.png" alt="">
                  <span :underline="false" class="orderTarking-link">{{companyInfo.com_scaleName}}</span>
                </p>
              </div>
              <div class="x-flex-between">
                <p class="x-flex-around">
                  <img src="../assets/img/address.png" alt="">
                  <span :underline="false" class="orderTarking-link">{{companyInfo.citys}}{{companyInfo.address?companyInfo.address:''}}</span>
                </p>
              </div>
              <div class="company-profile">
                <span>公司简介</span>
                <p class="company-profile-content" ref="content" v-html="companyInfo.content"></p>
                <p class="x-flex-center" @click="showMore()">
                  <img src="../assets/img/moreDown.png" alt="" v-if="textShow">
                  <span class="profile-more" v-if="textShow">查看更多</span>
                </p>
              </div>
            </div>
            <div class="bg-purple-light">
              <p class="job-title">该公司的接单职位</p>
              <div>
                <ul class="orderTaking-main-item orderTaking-main-history" v-for="(item,index) in comInvoiceList" :key="index">
                  <li class="x-flex-between">
                    <el-tooltip class="item" effect="dark" :content="item.name" placement="top-start">
                      <span class="company-name1">{{item.name}}</span>
                    </el-tooltip>
                    <span class="require-number">{{item.required_number}}人</span>
                  </li>
                  <li class="x-flex-between">
                    <span v-if="item.money_type==1" class="require-number">月薪: {{item.money_min}}~{{item.money_max}}/人</span>
                    <span v-else class="require-number">{{getmoneyType(item.money_type)}}薪: {{item.money}}/人</span>
                    <span>返利: {{item.reward_money}}/人/{{getmoneyType(item.money_type)}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <FooterView></FooterView>
    <AsideBox :isShow="isShow"></AsideBox>
    <viewJob :dialogTableVisible="dialogJobVisible" :id="id" @handleClose="dialogJobVisible=false,id=''"></viewJob>
    <Dialog :centerDialogVisible="centerDialogVisible" :modalInfo="modalInfo" @handleClose="handleClose" @handleOk="handleOk"></Dialog>
    <TipDialog :tipDialogVisible="tipDialogVisible" @handleClose="tipDialogVisible=false" @submit="submit"></TipDialog>
  </el-container>
</template>
<script>
import HeaderView from '@/components/HeaderView'
import AsideBox from '@/components/AsideBox'
import Panel from '@/components/Panel'
import Dialog from '@/components/Dialog'
import TipDialog from '@/components/TipDialog'
import FooterView from '@/components/FooterView'
import {
  getOrderDetail,
  getList,
  addReportInfo,
  addApply,
  companyInvoiceList,
  jobRecommendedList,
  invoiceInfo,
  getCompanyInfo
} from '@/api/orderTarking'
import { getTeamInfo } from '@/api/team'
import { teamCollectionJob } from '@/api/collect'
import { moneyTypeList } from '@/base/base'
import { getImgUrl } from '@/util/util'
import viewJob from '@/components/common/viewJob'
export default {
  name: 'OrderTakingDetail',
  components: {
    Panel,
    Dialog,
    TipDialog,
    FooterView,
    HeaderView,
    AsideBox,
    viewJob
  },
  data () {
    return {
      tipDialogVisible: false,
      dialogVisible: false,
      centerDialogVisible: false,
      dialogJobVisible: false,
      total: 0,
      activeIndex: 0,
      keywords: '',
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
      dialogType: 1,
      token: localStorage.getItem('token'),
      isShowLogin: false,
      userType: localStorage.getItem('userType'),
      recommendedList: [], // 推荐岗位
      comInvoiceList: []
    }
  },
  computed: {
    rewardMoney () {
      if (this.id) {
        let reward_type = this.orderTakingDetail.reward_type
        return reward_type == 1 ? '月' : reward_type == 2 ? '日' : '时'
      }
    },
    logoUrl () {
      if (this.companyInfo.logo_url) {
        return getImgUrl(this.companyInfo.logo_url)
      }
    }
  },
  created () {
    this.getData(this.params)
    this.id = this.$route.query.id
    this.uid = this.$route.query.uid
    this.getOrderTakingData()
    this.getCompanyData(this.uid)
    this.getRecommendedList()
    this.getCompanyInvoiceList()
  },
  mounted () {
    window.addEventListener('scroll', this.windowScroll)
    if (this.$refs.content.clientHeight > 30) {
      this.textShow = true
      this.$refs.content.style.display = '-webkit-box'
    } else {
      this.textShow = false
    }
  },
  methods: {
    showMore () {
      this.$refs.content.style.display = ''
    },
    windowScroll () {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop - document.documentElement.clientHeight + 500 >= 0) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    // 获取接单详情
    getOrderTakingData () {
      let params = {
        id: this.id,
        uid: localStorage.getItem('uid')
      }
      invoiceInfo(params).then(res => {
        this.orderTakingDetail = res.data
      })
    },
    getRecommendedList () {
      let params = {
        id: this.id,
        uid: localStorage.getItem('uid')
      }
      jobRecommendedList(params)
        .then(res => {
          this.recommendedList = res.data
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    getCompanyData (uid) {
      getCompanyInfo({ uid })
        .then(res => {
          this.companyInfo = res.data || {}
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    getCompanyInvoiceList () {
      let params = {
        id: this.id,
        uid: localStorage.getItem('uid')
      }
      companyInvoiceList(params)
        .then(res => {
          this.comInvoiceList = res.data
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    switchNav (item, index) {
      this.activeIndex = index
    },
    viewJobDetail (val) {
      this.id = val.id
      this.dialogJobVisible = true
    },
    getData (params) {
      getList(params)
        .then(res => {
          this.list = res.data.data.data
          this.total = res.data.count
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    applyReceipt () {
      this.dialogType = 1
      if (this.token) {
        let params = {
          job_id: this.orderTakingDetail.id,
          uid: localStorage.getItem('uid')
        }
        addApply(params)
          .then(res => {
            if (res.data.error == 1) {
              if (res.data.is_lock == 1) {
                return this.$message.error('团队账号已锁定，不能接单')
              } else if (res.data.status == 1) {
                return this.$message.error('团队账号未审核，不能接单')
              } else if (res.data.status == 3) {
                return this.$message.error('团队账号审核未通过，不能接单')
              } else {
                return this.$message.error('接单失败')
              }
            }
            if (res.data) {
              this.centerDialogVisible = true
              this.modalInfo = {
                title: '申请成功！',
                okText: '查看申请',
                closeText: '关闭',
                imgBg: require('../assets/img/success.png')
              }
            } else {
              this.$message.error('接单失败')
            }
          })
          .catch(error => {
            if (error) {
              this.$message.warning(error.status.remind)
            }
          })
      } else {
        this.$message.warning('请先登录')
        this.isShowLogin = true
      }
    },
    handleReport () {
      if (this.orderTakingDetail.checkReport) return
      this.tipDialogVisible = true
    },
    // 收藏
    handleCollect () {
      this.dialogType = 2
      let params = {
        uid: localStorage.getItem('uid'),
        jobId: this.orderTakingDetail.id
      }
      teamCollectionJob(params)
        .then(res => {
          if (res.data && !this.orderTakingDetail.checkCollect) {
            this.orderTakingDetail.checkCollect = 1
            this.centerDialogVisible = true
          } else if (res.data && this.orderTakingDetail.checkCollect) {
            this.$message.success('操作成功')
            this.orderTakingDetail.checkCollect = 0
          } else {
            this.$message.error('操作失败')
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    // 举报
    submit (val) {
      let parasm = {
        uid: localStorage.getItem('uid'),
        jobId: this.orderTakingDetail.id,
        jobName: this.orderTakingDetail.name
      }
      parasm = Object.assign(parasm, val)
      addReportInfo(parasm)
        .then(res => {
          if (res.data) {
            this.orderTakingDetail.checkReport = 1
            this.tipDialogVisible = false
          } else {
            this.message.$error('举报失败')
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    handleClose () {
      this.centerDialogVisible = false
      if (this.dialogType == 2) {
        this.$router.push('collectJob')
      }
    },
    handleOk () {
      this.centerDialogVisible = false
      if (this.dialogType == 1) {
        this.$router.push('teamApplication')
      }
    },
    getmoneyType(type) {
      return type === 1 ? '月' : type === 2 ? '日' : '时'
    },
    getRewardType (type) {
      let text = ''
      if (type == 1) {
        text = '月返'
      } else if (type == 2) {
        text = '日返'
      } else if (type == 3) {
        text = '时返'
      } else {
        text = '一次性返利'
      }
      return text
    }
  }
}
</script>