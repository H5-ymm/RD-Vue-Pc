
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
          <span v-if="tabIndex!=1" class="el-icon-warning no-info-icon">未填写</span>
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
    operationInfo
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
      rewardInfo: {},
      formMember: {},
      id: ''

    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getInfo(this.id)
    }
  },
  computed: {
    isCheckBaseInfo () {
      let flag = false
      for (let key in this.baseInfo) {
        if (this.rewardInfo[key] == '') {
          flag = false
          break;
        }
        else {
          flag = true
        }
      }
      return flag
    }
  },
  watch: {
    // tabIndex (val) {
    //   if (val == 0) {
    //     this.comName = 'baseInfo'
    //   }
    //   else if (val == 1) {
    //     this.comName = 'rewardRule'
    //   }
    //   else {
    //     this.comName = 'operationInfo'
    //   }
    // }
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
        console.log(this.formMember)
        this.baseInfo = { ...this.formMember }
        console.log(this.baseInfo)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    submitForm (val) {
      if (!val) {
        this.tabIndex = this.tabIndex - 1
        console.log(this.tabIndex)
        return
      }
      if (this.tabIndex <= 2) {
        this.tabIndex = this.tabIndex
        if (this.tabIndex == 0) {
          this.comName = 'baseInfo'
        }
        else if (this.tabIndex == 1) {
          this.comName = 'rewardRule'
        }
        else {
          this.comName = 'operationInfo'
        }
      }
      this.baseInfo = { ...val }
      this.formInfo = Object.assign(this.formInfo, val)
      if (this.comName == 'operationInfo') {
        addjob(this.formInfo).then(res => {
          console.log(res)
        }).catch(error => {
          this.$message.error(error.status.remind)
        })
      }
    }
  }
}
</script>

