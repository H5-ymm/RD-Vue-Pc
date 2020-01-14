
<style lang="scss">
.post-job-view {
  margin-bottom: 76px;
  overflow-y: auto;
  overflow-x: hidden;
  // width: 100%;
  .tab-box {
    margin: 0 0 25px;
    >li {
      width:200px;
      height:40px;
      background:#fff;
      box-shadow:2px 5px 17px 0px rgba(51,51,51,0.2);
      border-radius:5px;
      color: #333333;
      margin-right: 40px;
      text-align: center;
      line-height: 40px;
      img {
        width: 34px;
        height: 14px;
      }
      &.tab-active {
        background:#1890FF;
        color: #fff;
      }
      .no-info-icon {
        font-size: 12px;
        color: #FE2A00;
      }
      .has-info-icon {  
        color: #83D260;
      }
      span {
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }
}
</style>

<template>
  <div class="post-job-view">
    <ul class="x-flex-start tab-box">
      <li :class="{'tab-active':tabIndex==0}" @click="switchTab(0)">
        <p class="x-flex-center">
          基本信息
          <span v-if="tabIndex!=0" class="el-icon-circle-check " :class="!isCheck(baseInfo)?'no-info-icon':'has-info-icon'">{{isCheck(baseInfo)?'已完善':'未完善'}}</span>
          <!-- <span v-if="tabIndex!=0&&!isBaseInfo" class="el-icon-warning no-info-icon">未填写</span> -->
        </p>
        <img src="../../assets/img/icon6.png" v-if="tabIndex==0" alt />
      </li>
      <li :class="{'tab-active':tabIndex==1}" @click="switchTab(1)">
        <p class="x-flex-center">
          返利规则
          <span v-if="tabIndex!=1" :class="!isCheckReward(rewardInfo)?'no-info-icon':'has-info-icon'">{{!isCheckReward(rewardInfo)?'未填写':'已完善'}}</span>
        </p>
        <img src="../../assets/img/icon6.png" v-if="tabIndex==1" alt />
      </li>
      <li :class="{'tab-active':tabIndex==2}" @click="switchTab(2)">
        <p class="x-flex-center">
          运营信息
          <span v-if="tabIndex!=2" class="el-icon-warning no-info-icon">未填写</span>
        </p>
        <img src="../../assets/img/icon6.png" v-if="tabIndex==2" alt />
      </li>
    </ul>
    <div>
      <keep-alive>
        <component :is="comName" @submitForm="submitForm" :tabIndex="tabIndex" :formJob="formMember"></component>
      </keep-alive>
    </div>

  </div>
</template>
<script>
import baseInfo from './baseInfo'
import rewardRule from './rewardRule'
import { setjobtouser, addjob, savejob } from '@/api/internalInvoice'
import operationInfo from './operationInfo'
import { getJobinfo } from '@/api/internalInvoice'
export default {
  components: {
    baseInfo,
    rewardRule,
    operationInfo,
  },
  data () {
    return {
      tabIndex: 0,
      comName: 'baseInfo',
      formInfo: {
        job_name: '',
        number: '',
        uid: localStorage.getItem('uid'),
        is_up: 1
      },
      baseInfo: {
        address: '',
        age_max: 0,
        age_min: 0,
        com_introduction: '',
        company_logo: '',
        entry_requirements: '',
        is_five_risks: 2,
        is_fund: 2,
        job_description: '',
        offtime: '',
        sex: 0,
        uid: '',
        welfare_statement: '',
        working_hours: ''
      },
      rewardInfo: {
        reward_type: '', // 返利类型(1月返 2日返 3时返 4一次性返)
        reward_money: '', // 返利金额(根据类型修改单位)
        reward_money_type: '', // 1日2周3月(针对日返和时返) 1长期2持续（针对月返）结算类型 
        settlement_time: '', // 结算时间(针对月返：次月第XX多少天；)
        reward_needtime: '', // 需求入职天数/周数/月数(一次性时：0表示当天返)
        duration_time: '', // 持续 (天数/周数/月数)
        settlement_type: ''
      },
      formMember: {},
      id: '',
      modalInfo: {
        title: '您的信息未完善！',
        okText: '前去完善',
        closeText: '',
        imgBg: require('../../assets/img/info.png')
      },
      dialogVisible: false,
      baserRequireInfo: {
        job_name: '',
        company_name: '',
        number: '',
        offermoney_type: '',
        offermoney: ''
      },
      otherInfo: null
    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getInfo(this.id)
    }
  },
  methods: {
    switchTab (index) {
      this.tabIndex = index
    },
    isCheck (obj) {
      let flag = false
      for (let key in obj) {
        if (obj[key] == '') {
          flag = false
          break;
        }
        else {
          flag = true
        }
      }
      return flag
    },
    getInfo (id) {
      getJobinfo({ id }).then(res => {
        this.formMember = res.data
        this.baseInfo = { ...this.formMember }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    isCheckReward (info) {
      let flag = false
      if (info.type == 2) {
        flag = true
      }
      else if (info.tabIndex) {
        return false
      }
      else {
        console.log(info)
        for (let key in info) {
          if (info.reward_type == 1) {
            if (info[key] != '' && key != 'reward_needtime' && key != 'duration_time') {
              flag = true
              break;
            }
            else {
              flag = false
            }
          }
          else {
            if (info[key] != '') {
              flag = true
              break;
            }
            else {
              flag = false
            }
          }
        }
      }
      console.log(flag)
      return flag
    },
    submitForm (val) {
      let index = 0
      if (typeof val == 'number') {
        if (val == 2) {
          index = val - 1
        }
        else {
          index = val
        }
        this.switchTab(index)
      }
      else {
        if (val && val.type == 2) {
          index = 2
          this.tabIndex = 2
        }
        else {
          index = this.tabIndex
        }
      }
      if (index == 0) {
        this.comName = 'baseInfo'
        this.baseInfo = val
        if (!this.isCheck(this.baseInfo)) {
          this.tabIndex = 1
          this.comName = 'rewardRule'
        }
      }
      else if (index == 1) {
        this.comName = 'rewardRule'
        this.rewardInfo = val
      }
      else {
        this.otherInfo = val
        this.comName = 'operationInfo'
      }
      if (val.tabIndex && this.tabIndex == 1) {
        this.tabIndex = 0
        this.comName = 'baseInfo'
      }
      let isSave = val.job_type
      this.formInfo = Object.assign(this.formInfo, val)
      if (this.comName == 'operationInfo' && isSave != undefined) {
        addjob(this.formInfo).then(res => {
          if (res.data) {
            this.$message.success('发布成功')
            this.$router.push('publishJobList?view=1')
          } else {
            this.$message.error('发布失败')
          }
        }).catch(error => {
          this.$message.error(error.status.remind)
        })
      }
    }
  }
}
</script>

