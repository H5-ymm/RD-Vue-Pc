<style lang="scss">
@import '@/assets/css/salaryRebate.scss';
.salary-rebate  {
  &.job-salary-rebate {
    // margin-left: 96px;
    .reward_type {
      margin-left: 100px;
    }
    .el-form-item__content {
      width: 70%;
    }
    .width198 {
      width: 198px!important;
      margin-right: 10px;
      &.el-select > .el-input {
        width: 198px!important;
      }
    }
    .width110 {
      width: 110px!important;
      margin: 0 20px;
    }
    .el-scrollbar__wrap {
        width: 180px;
        .text-input {
          overflow: hidden;
          border: none;
          padding: 0 0 0 20px;
        }
      }
    }
    .el-form-item  {
      .error {
        position:absolute;
        top: 0;
        left:0;
        color:#FE2A00;
        font-size:12px;
        &.reward-error {
          width: 300px;
          left: 420px;
          top: 0;
          ul {
            margin-left:5px;
            font-size:12px;
            line-height: 20px;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="salary-rebate job-salary-rebate">
    <el-form-item label="返利模式">
      <div class="x-flex-start width700">
        <el-select v-model="orderTakingForm.reward_type" @change="changeReward" class="width160 width198" placeholder="请选择">
          <el-option :label="item.label" :value="item.value" v-show="index" v-for="(item,index) in rewardTypeList" :key="item.label"></el-option>
        </el-select>
        <div v-if="orderTakingForm.reward_type">
          <el-input placeholder="请输入金额" v-if="orderTakingForm.reward_type==1" class="width160 width198 text-input" v-model="orderTakingForm.reward_money">
            <template slot="append">
              <span class="moneyType">元/人/月</span>
            </template>
          </el-input>
          <div v-else-if="orderTakingForm.reward_type==4">
            <el-input placeholder="请输入" class="width160 width198 text-input" v-model="orderTakingForm.reward_money">
              <template slot="prepend">
                <span class="moneyType">返利总金额</span>
              </template>
            </el-input>
            <el-input placeholder="请输入" class="width160 width198 text-input" v-model="orderTakingForm.reward_needtime">
              <template slot="prepend">
                <span class="moneyType">需入职满</span>
              </template>
              <template slot="append">
                <span class="moneyType">天</span>
              </template>
            </el-input>
          </div>
          <el-select v-model="orderTakingForm.reward_money_type" @change="changeRewardType" v-else class="width160 width198" placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="item in payTypeList" :key="item.label"></el-option>
          </el-select>
        </div>
      </div>
    </el-form-item>
    <el-form-item class="reward_type">
      <div class="x-flex-start width500" v-if="orderTakingForm.reward_type==1">
        <el-input placeholder="请输入" class="width160 width198 text-input" v-model="orderTakingForm.settlement_time">
          <template slot="prepend">
            <span class="moneyType">次月</span>
          </template>
          <template slot="append">
            <span class="moneyType">号结算</span>
          </template>
        </el-input>
        <el-select v-model="reward_money_type" @blur="blurInput" @change="changePayType" class="width160 width198" placeholder="结算类型">
          <el-option label="长期返利" :value="1"></el-option>
          <div class="width160 width198 reward-input" ref="reward" :value="2">
            <el-input placeholder="请输入" class="text-input width110" v-model="orderTakingForm.reward_needtime" @change="changeInput">
              <template slot="prepend">
                <span class="moneyType">持续返利</span>
              </template>
              <template slot="append">
                <span class="moneyType">月</span>
              </template>
            </el-input>
          </div>
        </el-select>
      </div>
      <div class="x-flex-start width700" v-if="orderTakingForm.reward_type!=1&&orderTakingForm.reward_type!=4">
        <el-input placeholder="请输入" class="width160 width198 text-input" v-model="orderTakingForm.reward_money" v-if="orderTakingForm.reward_money_type">
          <template slot="append">
            <span class="moneyType">元/人/{{rewardType}}</span>
          </template>
        </el-input>
        <el-select v-model="orderTakingForm.settlement_type" class="width160 width198" placeholder="结算类型" v-if="orderTakingForm.reward_money_type">
          <el-option :label="`次${rewardType}结算`" :value="1"></el-option>
          <el-option :label="`本${rewardType}结算`" :value="2"></el-option>
        </el-select>
        <el-select v-model="orderTakingForm.settlement_time" v-if="orderTakingForm.reward_money_type==2&&orderTakingForm.settlement_type" class="width160 width198" placeholder="请选择">
          <el-option :label="`${payType}${item.label}`" :value="item.value" v-for="item in weekList" :key="item.label"></el-option>
        </el-select>
        <el-input placeholder="请输入" v-if="orderTakingForm.reward_money_type==3&&orderTakingForm.settlement_type" class="width160 width198 text-input" v-model="orderTakingForm.settlement_time">
          <template slot="prepend">
            <span class="moneyType">{{payType}}月</span>
          </template>
          <template slot="append">
            <span class="moneyType">号</span>
          </template>
        </el-input>
      </div>
    </el-form-item>
    <el-form-item class="reward_type" label-width="96px" v-if="(orderTakingForm.reward_type==2||orderTakingForm.reward_type==3)&&orderTakingForm.reward_money_type">
      <div class="x-flex-start-justify width500 duration_time">
        <el-input placeholder="请输入" @focus="focusInput" class="width160 width198 text-input" v-model="orderTakingForm.duration_time">
          <template slot="prepend">
            <span class="moneyType">持续</span>
          </template>
          <template slot="append">
            <span class="moneyType">{{rewardType}}</span>
          </template>
        </el-input>
        <el-input placeholder="请输入" class="width160 width198 text-input" @focus="focusInput" v-model="orderTakingForm.reward_needtime">
          <template slot="prepend">
            <span class="moneyType">需入职满</span>
          </template>
          <template slot="append">
            <span class="moneyType">{{rewardType}}</span>
          </template>
        </el-input>
        <span class="error el-icon-warning">入职天数为0时，代表入职当天返利</span>
      </div>
      <div class="error reward-error" v-if="rewardTipShow">
        <div class="x-flex-start-justify">
          <i class="el-icon-warning"></i>
          <ul>
            <li>1.此项为选填项</li>
            <li>2.持续天数为空时，默认为1{{rewardType}}</li>
            <li>3.入职时间为空是，默认工作1{{rewardType}}返利1{{rewardType}}</li>
          </ul>
        </div>
      </div>
    </el-form-item>
  </div>
</template>
<script>
import { moneyTypeList, rewardTypeList, payTypeList, weekList } from '../../base/base'
export default {
  props: ['moneyList', 'type'],
  data () {
    return {
      orderTakingForm: {
        reward_type: '', // 返利类型(1月返 2日返 3时返 4一次性返)
        reward_money: '', // 返利金额(根据类型修改单位)
        reward_money_type: '', // 1日2周3月(针对日返和时返) 1长期2持续（针对月返）结算类型 
        settlement_time: '', // 结算时间(针对月返：次月第XX多少天；)
        reward_needtime: '', // 需求入职天数/周数/月数(一次性时：0表示当天返)
        duration_time: '', // 持续 (天数/周数/月数)
        settlement_type: '',
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
  watch: {
    orderTakingForm: {
      handler (val, oldName) {
        for (let key in val) {
          if (val.reward_type == 1) {
            if (Number(val.settlement_time) > 31) {
              return this.$message.warning('结算时间最大输入31')
              this.$emit('submit', null)
            }
            else {
              this.$emit('submit', val)
            }
          }
          else {
            if (val.reward_type != 4 && Number(val.reward_needtime) > Number(this.orderTakingForm.duration_time)) {
              this.orderTakingForm.reward_needtime = val.duration_time
              this.$emit('submit', val)
            }
            else {
              this.$emit('submit', val)
            }
          }
        }
      },
      deep: true
    }
  },
  methods: {
    changeReward (val) {
      if (val == 1) {
        this.orderTakingForm.settlement_type = 1
      }
      for (let key in this.orderTakingForm) {
        if (key != 'reward_type' && key != 'money_type' && key != 'money') {
          this.orderTakingForm[key] = ''
        }
      }
    },
    changeRewardType (val) {
      for (let key in this.orderTakingForm) {
        if (key != 'money_type' && key != 'money' && key != 'reward_type' && key != 'reward_money_type') {
          this.orderTakingForm[key] = ''
        }
      }
    },
    focusInput () {
      this.rewardTipShow = true
    },
    changePayType (val) {
      if (val == 1) {
        this.orderTakingForm.reward_money_type = val
      }
    },
    blurInput ($event) {
      return false
    },
    changeInput (val) {
      if (val) {
        this.reward_money_type = `持续返利` + val + `月`
        this.orderTakingForm.reward_money_type = 2
        this.orderTakingForm.duration_time = val
        this.blurInput()
      }
    }
  }
}
</script>