
<style lang="scss">
 @import '@/assets/css/orderTarking.scss';
</style>

<template>
  <el-container class="orderTaking" id="header">
    <el-header class="header x-flex-around home" height="50px">
      <headerView></headerView>
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
              <li
                v-for="(item, index) in cityList"
                :key="index"
                @click="querySelect(item.value,'cityid')"
                :class="{'active': cityid==item.value}"
              >{{item.name}}</li>
            </ul>
            <el-button type="text" class="orderTaking-more" @click="dialogVisible=true">更多</el-button>
          </div>
          <div class="orderTaking-search-query x-flex-start-justify">
            <span class="orderTaking-search-label">不限</span>
            <ul class="orderTaking-search-value">
              <li
                v-for="(item, index) in areaList"
                :key="index"
                @click="querySelect(item.value,'three_cityid')"
                :class="{'active': three_cityid==item.value}"
              >{{item.name}}</li>
            </ul>
          </div>
          <div class="orderTaking-search-select">
            <div class="orderTaking-search-value">
              <el-select
                v-model="params.money_type"
                @change="querySelect($event,'money_type')"
                placeholder="薪资方式"
              >
                <el-option
                  v-for="(item,index) in moneyTypeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="params.reward_type"
                @change="querySelect($event,'reward_type')"
                placeholder="返利方式"
              >
                <el-option
                  v-for="(item,index) in rewardList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="params.require_number"
                @change="querySelect($event,'require_number')"
                placeholder="需求人数"
              >
                <el-option
                  v-for="(item,index) in requirePersonList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="params.is_five_risks"
                @change="querySelect($event,'is_five_risks')"
                placeholder="缴纳五金"
              >
                <el-option
                  v-for="(item,index) in paymentTaxType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="params.is_fund"
                @change="querySelect($event,'is_fund')"
                placeholder="缴纳公积金"
              >
                <el-option
                  v-for="(item,index) in paymentTaxType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
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
              <section
                v-for="(item,index) in list"
                :key="index"
                :class="{'orderTaking-main-sectionActive':index==0}"
              >
                <div class="orderTaking-main-section x-flex-between">
                  <div class="orderTaking-main-row orderTaking-main-row1">
                    <ul class="orderTaking-main-item">
                      <li
                        class="job-name"
                        @click="$router.push({path:'orderTakingDetail',query:{id:item.id,uid:item.uid}})"
                      >
                        <span class="company-name">{{item.name}}</span>
                      </li>
                      <li class="require-number">
                        <span>需求人数：{{item.required_number}}人</span>
                      </li>
                      <li>返利方式：长期返利</li>
                    </ul>
                    <ul class="orderTaking-main-item">
                      <li
                        class="require-number"
                      >{{getmoneyType(item.money_type)}}薪: {{item.money}}/人/{{getmoneyType(item.money_type)}}</li>
                      <li>返利：20人</li>
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
                        <span>{{item.com_name||'公司名称'}}</span>
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
                    <el-button type="primary" @click="handleApply(item)">立即接单</el-button>
                  </div>
                </div>
              </section>
            </div>
            <el-pagination
              background
              class="pagination"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="total"
            ></el-pagination>
          </div>
          <div class="orderTaking-main-col2">
            <div class="bg-purple-light">
              <p class="job-title">看过的接单职位</p>
              <div v-if="browsingList.length">
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
                  <li class="bg-purple">{{item.com_name}}</li>
                </ul>
              </div>
            </div>
            <div class="orderTaking-login" v-if="isShowLogin">
              <LoginBox></LoginBox>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <FooterView></FooterView>
    <AsideBox :isShow="isShow"></AsideBox>
    <ModalCity :dialogVisible="dialogVisible" @getCityCode="getCityCode" @handleClose="handleClose"></ModalCity>
  </el-container>
</template>
<script>
// @ is an alias to /src
import homeAside from '@/components/Aside' //侧边栏
import ModalCity from '@/components/ModalCity'
import LoginBox from '@/components/LoginBox'
import HeaderView from '@/components/HeaderView'
import FooterView from '@/components/FooterView'
import AsideBox from '@/components/AsideBox'
import searchInput from '@/components/searchInput'
import { getList, addApply } from '@/api/orderTarking'
import { getProvincesList, getCitysList, getAreasList } from '../api/login'
import { cityList, moneyTypeList, rewardList, requirePersonList, paymentTaxType } from '../base/base'
export default {
  name: 'OrderTaking',
  components: {
    homeAside,
    ModalCity,
    LoginBox,
    AsideBox,
    HeaderView,
    FooterView,
    searchInput
  },
  data () {
    return {
      isShow: false,
      dialogVisible: false,
      total: 0,
      activeIndex: 1,
      keywords: '',
      rewardList,
      requirePersonList,
      paymentTaxType,
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
      cityid: '310100',
      three_cityid: '310101',
      list: [],
      cityList,
      areaList: [],
      moneyTypeList,
      code: '310100',
      money_type: '',
      browsingList: [],
      token: localStorage.getItem('token'),
      isShowLogin: false
    }
  },
  created () {
    this.getData(this.params)
    this.getAreaList(this.code)
  },
  mounted () {
    window.addEventListener('scroll', this.windowScroll)
  },
  methods: {
    windowScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop - document.documentElement.clientHeight + 100 >= 0) {
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
    querySelect (val, key) {
      this.params[key] = val
      this[key] = val
      this.getData(this.params)
    },
    handleClose () {
      this.dialogVisible = false
    },
    getCityCode (value) {
      this.params.three_cityid = value[0]
      this.getData(this.params)
      this.dialogVisible = false
    },
    getData (params) {
      getList(params).then(res => {
        if (res.data.data) {
          this.list = res.data.data.data
          this.browsingList = res.data.data.data
          this.total = res.data.count
        }
        else {
          this.list = []
          this.browsingList = []
          this.total = 0
        }
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
        this.isShowLogin = true
      }
    },
    searchQuery (val) {
      let params = Object.assign(val, this.params)
      this.getData(params)
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
    },
    getAreaList (code) {
      getAreasList({ code }).then(res => {
        this.areaList = res.data
      })
    },
    currentChange (page) {
      this.params.page = page
      this.getData(this.params)
    },
    clearQuery () {
      this.params = {
        limit: 20,
        page: 1
      }
      this.getData(this.params)
    }
  }
}
</script>
