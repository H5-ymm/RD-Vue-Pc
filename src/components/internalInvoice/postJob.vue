
<style lang="scss">
.post-job-view {
  margin-bottom: 76px;
  overflow: auto;
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
      <li :class="{'tab-active':tabIndex==0}" @click="tabIndex=0">
        <p class="x-flex-center">
          团队接单
          <span v-if="tabIndex!=0" class="el-icon-circle-check has-info-icon">已完善</span>
          <!-- <span v-if="tabIndex!=0" class="el-icon-warning no-info-icon">未填写</span> -->
        </p>
        <img src="../../assets/img/icon6.png" v-if="tabIndex==0" alt />
      </li>
      <li :class="{'tab-active':tabIndex==1}" @click="tabIndex=1">
        <p class="x-flex-center">
          团队接单
          <span v-if="tabIndex!=1" class="el-icon-warning no-info-icon">未填写</span>
        </p>
        <img src="../../assets/img/icon6.png" v-if="tabIndex==1" alt />
      </li>
      <li :class="{'tab-active':tabIndex==2}" @click="tabIndex=2">
        <p class="x-flex-center">
          团队接单
          <span v-if="tabIndex!=2" class="el-icon-warning no-info-icon">未填写</span>
        </p>
        <img src="../../assets/img/icon6.png" v-if="tabIndex==2" alt />
      </li>
    </ul>
    <div>
      <keep-alive>
        <component :is="comName" @submitForm="submitForm"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import baseInfo from './baseInfo'
import rewardRule from './rewardRule'
import { setjobtouser } from '@/api/internalInvoice'
import operationInfo from './operationInfo'

export default {
  components:{
    baseInfo,
    rewardRule,
    operationInfo
  },
  data() {
    return {
      tabIndex:0,
      comName: 'baseInfo',
      formInfo: {
        job_name:'',
        number:'',
        uid: localStorage.getItem('uid'),
        is_up: 1
      }
    }
  },
  watch:{
    tabIndex(val) {
      if (val==0) {
        this.comName = 'baseInfo'
      }
      else if (val==1) {
        this.comName = 'rewardRule'
      }
      else {
        this.comName = 'operationInfo'
      }
    }
  },
  methods:{
    submitForm(val) {
      if (this.tabIndex < 2) {
        this.tabIndex = this.tabIndex + 1
      }
      this.formInfo = Object.assign(this.formInfo,val)
      console.log(this.formInfo)
      if (this.comName == 'operationInfo') {
        setjobtouser(this.formInfo).then(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>

