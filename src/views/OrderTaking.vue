
<style lang="scss">
@import '@/assets/css/orderTarking.scss';
</style>

<template>
  <el-container class="orderTaking" id="header">
    <el-header class="header x-flex-around home" height="50px">
      <headerView :activeIndex="1"></headerView>
    </el-header>
    <el-main class="orderTaking-main-content">
      <div class="orderTaking-search">
        <div class="orderTaking-main-box">
          <searchInput @searchQuery="searchQuery"></searchInput>
        </div>
        <div class="orderTaking-search-list">
          <div class="orderTaking-search-query x-flex-start-justify">
            <span class="orderTaking-search-label">地点</span>
            <ul class="orderTaking-search-value">
              <li v-for="(item, index) in cityList" :key="index" @click="querySelect(item.value,'cityid')" :class="{'active': params.cityid==item.value}">{{item.name}}</li>
            </ul>
            <el-button type="text" class="orderTaking-more" @click="dialogVisible=true">更多</el-button>
          </div>
          <div class="orderTaking-search-query x-flex-start-justify" v-if="params.cityid">
            <span class="orderTaking-search-label">不限</span>
            <ul class="orderTaking-search-value">
              <li v-for="(item, index) in areaList" :key="index" @click="querySelect(item.code,'three_cityid')" :class="{'active': params.three_cityid==item.code}">{{item.name}}</li>
            </ul>
          </div>
          <div class="orderTaking-search-select x-flex-between">
            <div class="orderTaking-search-value">
              <el-select v-model="params.money_type" @change="querySelect($event,'money_type')" placeholder="薪资方式">
                <el-option v-for="(item,index) in moneyTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="params.reward_type" @change="querySelect($event,'reward_type')" placeholder="返利方式">
                <el-option v-for="(item,index) in rewardList" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="params.require_number" @change="querySelect($event,'require_number')" placeholder="需求人数">
                <el-option v-for="(item,index) in requirePersonList" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="params.is_five_risks" @change="querySelect($event,'is_five_risks')" placeholder="缴纳五金">
                <el-option v-for="(item,index) in paymentTaxType" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select v-model="params.is_fund" @change="querySelect($event,'is_fund')" placeholder="缴纳公积金">
                <el-option v-for="(item,index) in paymentTaxType" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <span class="clear" @click="clearQuery">清空筛选条件</span>
          </div>
        </div>
      </div>
      <div class="home-main-box orderTaking-main-list">
        <div class="orderTaking-main-row">
          <div class="orderTaking-main-col1">
            <div class="grid-content orderTaking-grid-content">
              <section v-for="(item,index) in list" :key="index" class="orderTaking-main-card" :class="{'orderTaking-main-sectionActive':index==0}">
                <div class="orderTaking-main-section x-flex-between">
                  <div class="orderTaking-main-row orderTaking-main-row1">
                    <ul class="orderTaking-main-item">
                      <li class="job-name" @click="$router.push({path:'orderTakingDetail',query:{id:item.id,uid:item.uid}})">
                        <span class="company-name">{{item.name}}</span>
                      </li>
                      <li class="require-number">
                        <span>需求人数：{{item.required_number}}人</span>
                      </li>
                      <li>
                        <span>返利方式：</span>
                        <span>{{getRewardType(item.reward_type)}}</span>
                      </li>
                    </ul>
                    <ul class="orderTaking-main-item">
                      <li class="require-number">{{getmoneyType(item.money_type)}}薪: {{item.money}}元</li>
                      <li>返利：{{item.reward_money_type}}/人/{{getmoneyType(item.money_type)}}</li>
                      <li v-if="item.reward_money_type==3">持续时间：{{item.reward_money_type==1?'长期返利':'持续返利'}}</li>
                      <li v-if="item.reward_money_type!=3&&item.reward_continuous">持续时间：{{item.reward_continuous}}{{getmoneyType(item.money_type)}}</li>
                    </ul>
                  </div>
                  <div class="orderTaking-main-col">
                    <ul class="orderTaking-main-item">
                      <li class="company-name x-flex-start-justify">
                        <span>{{item.com_name||'公司名称'}}</span>
                        <img src="../assets/img/noIcon.png" class="orderTaking-icon" alt v-if="item.status==2" />
                        <img src="../assets/img/noIcon.png" alt v-else />
                        <span class="ctime">{{ ctime (item.ctime) }}发布</span>
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
                    <el-button type="primary" plain @click="handleApply(item)">立即接单</el-button>
                  </div>
                </div>
              </section>
            </div>
            <el-pagination background class="pagination" @current-change="currentChange" layout="prev, pager, next" :total="total"></el-pagination>
          </div>
          <div class="orderTaking-main-col2">
            <div class="bg-purple-light" v-if="browsingList.length">
              <p class="job-title">看过的接单职位</p>
              <div>
                <ul class="orderTaking-main-item orderTaking-main-history" v-for="(item,index) in browsingList" :key="index">
                  <li class="x-flex-between">
                    <span class="company-name">{{item.name}}</span>
                    <span class="require-number">{{item.required_number}}人</span>
                  </li>
                  <li class="x-flex-between">
                    <span class="require-number">{{getmoneyType(item.money_type)}}薪:</span>
                    <span>{{item.money}}/人/{{getmoneyType(item.money_type)}}</span>
                  </li>
                  <li class="bg-purple">{{item.com_name}}</li>
                </ul>
              </div>
            </div>
            <!-- <div class="orderTaking-login" v-if="isShowLogin">
              <LoginBox @goLogin="goLogin"></LoginBox>
            </div> -->
          </div>
        </div>
      </div>
    </el-main>
    <FooterView></FooterView>
    <Dialog :centerDialogVisible="centerDialogVisible" :modalInfo="modalInfo" @handleClose="centerDialogVisible=false" @handleOk="handleOk"></Dialog>
    <AsideBox :isShow="isShow"></AsideBox>
    <ModalCity :dialogVisible="dialogVisible" @getCityCode="getCityCode" @handleClose="handleClose"></ModalCity>
  </el-container>
</template>
<script>
// @ is an alias to /src
import homeAside from '@/components/Aside' //侧边栏
import ModalCity from '@/components/ModalCity'
// import LoginBox from '@/components/LoginBox'
import HeaderView from '@/components/HeaderView'
import FooterView from '@/components/FooterView'
import AsideBox from '@/components/AsideBox'
import searchInput from '@/components/searchInput'
import { getList, addApply } from '@/api/orderTarking'
import { getProvincesList, getCitysList, getAreasList } from '@/api/login'
import {
  cityList,
  moneyTypeList,
  rewardList,
  requirePersonList,
  paymentTaxType
} from '../base/base'
export default {
  name: 'OrderTaking',
  components: {
    homeAside,
    ModalCity,
    // LoginBox,
    AsideBox,
    HeaderView,
    FooterView,
    searchInput
  },
  data() {
    return {
      isShow: false,
      dialogVisible: false,
      total: 0,
      activeIndex: 1,
      keywords: '',
      rewardList,
      requirePersonList,
      paymentTaxType,
      params: {
        limit: 20,
        page: 1,
        cityid: ''
      },
      list: [],
      cityList,
      areaList: [],
      moneyTypeList,
      code: '310100',
      money_type: '',
      browsingList: [],
      token: localStorage.getItem('token'),
      isShowLogin: false,
      centerDialogVisible: false,
      textShow: true,
      modalInfo: {
        title: '申请成功！',
        okText: '查看申请',
        closeText: '关闭',
        imgBg: require('../assets/img/success.png')
      }
    }
  },
  created() {
    this.getData(this.params)
    this.getAreaList(this.code)
    if (!this.token) {
      this.isShowLogin = true
    }
  },
  mounted() {
    document.scrollingElement.scrollTop = 0
    window.addEventListener('scroll', this.windowScroll)
  },
  methods: {
    ctime(val) {
      let time = ''
      let newTime = this.$moment(Date.now(), 'YYYY-MM-DD HH:mm').valueOf()
      if (newTime - val > 0) {
        time = this.$moment.unix(val).format('YYYY-MM-DD')
      } else {
        time = this.$moment.unix(val).format('YYYY-MM-DD')
      }
      return time
    },
    windowScroll() {
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
    goLogin(val) {
      if (val) {
        this.token = val
        this.isShowLogin = false
      }
    },
    handleOk() {
      this.centerDialogVisible = false
      this.$router.push('teamApplication')
    },
    switchNav(item, index) {
      this.activeIndex = index
      this.$router.push(item.url)
    },
    querySelect(val, key) {
      this.params[key] = val
      this[key] = val
      if (key == 'cityid') {
        this.getAreaList(val)
      }
      this.getData(this.params)
    },
    handleClose() {
      this.dialogVisible = false
    },
    getCityCode(value) {
      this.params.three_cityid = value[0]
      this.getData(this.params)
      this.dialogVisible = false
    },
    getData(params) {
      getList(params).then(res => {
        if (res.data.data) {
          this.list = res.data.data.data
          this.browsingList = res.data.data.browsing
          this.total = res.data.count
        } else {
          this.list = []
          this.browsingList = []
          this.total = 0
        }
      })
    },
    handleApply(val) {
      if (this.token) {
        let params = {
          job_id: val.id,
          uid: localStorage.getItem('uid')
        }
        addApply(params)
          .then(res => {
            if (res.data) {
              this.centerDialogVisible = true
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
        this.isShowLogin = true
      }
    },
    searchQuery(val) {
      let params = Object.assign(val, this.params)
      this.getData(params)
    },
    getmoneyType(type) {
      return type === 1 ? '日' : type === 2 ? '月' : '时'
    },
    getRewardType(type) {
      let text = ''
      if (type == 1) {
        text = '月返'
      } else if (type == 2) {
        text = '日返'
      } else if (type == 3) {
        text = '周返'
      } else {
        text = '一次性返利'
      }
      return text
    },
    getAreaList(code) {
      getAreasList({ code }).then(res => {
        this.areaList = res.data
      })
    },
    currentChange(page) {
      this.params.page = page
      this.getData(this.params)
    },
    clearQuery() {
      this.params = {
        limit: 20,
        page: 1
      }
      this.getData(this.params)
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.windowScroll)
  }
}
</script>
