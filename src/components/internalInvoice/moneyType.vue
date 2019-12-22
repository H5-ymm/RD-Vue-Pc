<template>
  <div class="salary-rebate">
    <el-form-item label="综合薪资">
      <div>
        <el-select v-model="orderTakingForm.money_type" class="width160" placeholder="请选择">
          <el-option
            :label="item.label"
            :value="item.value"
            v-show="index"
            v-for="(item,index) in moneyTypeList"
            :key="item.label"
          ></el-option>
        </el-select>
        <el-select
          v-model="orderTakingForm.money"
          v-if="orderTakingForm.money_type==1"
          class="width160"
          placeholder="请选择"
        >
        <el-option :label="item" :value="key" v-for="(item,key) in moneyList" :key="key"></el-option>
        </el-select>
        <el-input
          placeholder="请输入薪资"
          v-if="orderTakingForm.money_type&&orderTakingForm.money_type!=1"
          class="width160 text-input"
          v-model="orderTakingForm.money"
        >
          <template slot="append">
            <span class="moneyType" v-if="orderTakingForm.money_type==2">元/人/日</span>
            <span class="moneyType" v-if="orderTakingForm.money_type==3">元/人/时</span>
          </template>
        </el-input>
      </div>
    </el-form-item>
  </div>
</template>
<script>
import { moneyTypeList, rewardTypeList, payTypeList, weekList } from '../../base/base'
export default {
  props: ['moneyList'],
  data () {
    return {
      orderTakingForm: {
        money_type: 1
      },
      comTypeList: [],
      moneyTypeList,
      rewardTypeList,
      payTypeList,
      weekList,
      reward_money_type: '',
      rewardTipShow: false
    }
  },
  computed: {
    payType () {
      return this.orderTakingForm.reward_pay_type == 1 ? '次' : '本'
    },
    rewardType () {
      console.log(this.orderTakingForm.reward_money_type)
      return this.orderTakingForm.reward_money_type == 1 ? '日' : this.orderTakingForm.reward_money_type == 2 ? '周' : '月'
    }
  },
  methods: {
    getTypeFlag () {

    },
    focusInput () {
      this.rewardTipShow = true
    },
    changePayType (val) {
      console.log(val)
    },
    blurInput ($event) {
      return false
    },
    changeInput (val) {
      if (val) {
        this.orderTakingForm.reward_money_type = `持续返利` + val + `月`
        this.blurInput()
      }
    }
  }
}
</script>
<style lang="scss">
  .salary-rebate {
    padding-bottom: 20px;
    .el-form-item{
      display: inline-block!important;
    }
    .width500 {
      width: 500px;
    }
    .width700 {
      width: 700px;
    }
    .width110 {
      width: 110px;
      margin: 0 20px;
    }
    .reward_type {
      margin-bottom: 10px;
    }
    .error {
      top: -16px;
      &.reward-error {
        width: 300px;
        left: 360px;
        top: -10px;
        ul {
          margin-left:5px;
          font-size:12px;
          line-height: 20px;
        }
      }
    }
  }
  .width160 {
    width: 160px!important;
    margin-right: 30px;
    &.el-select  {
      >.el-input{
        width: 160px!important;
      }
    }
    .moneyType {
      color: #333;
    }
    .el-input-group__append,.el-input-group__prepend {   
      border:none;
      border-radius: 0;
      background: none;
      padding: 0;
      background-color:none;
    }
  }
  .text-input {
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid #eee;
    height: 38px;
    .el-input__inner {
      padding: 0 ;
      height: 37px!important;
      line-height: 37px!important;
      text-align: center;
      border: none!important;
    }
  }
  .el-scrollbar__wrap {
    width: 180px;
    .text-input {
      overflow: hidden;
      border: none;
      padding: 0 0 0 20px;
    }
  }
</style>