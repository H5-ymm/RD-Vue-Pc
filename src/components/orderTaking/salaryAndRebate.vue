<style lang="scss">
@import '@/assets/css/salaryRebate.scss';
</style>
<template>
  <div class="salary-rebate">
    <el-form-item label="员工薪资" required>
      <div class="x-flex-start">
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
    <el-form-item label="返利模式" class="reward_type" required>
      <div class="x-flex-start width700">
        <el-select v-model="orderTakingForm.reward_type" class="width160" placeholder="请选择">
          <el-option
            :label="item.label"
            :value="item.value"
            v-show="index"
            v-for="(item,index) in rewardTypeList"
            :key="item.label"
          ></el-option>
        </el-select>
        <div v-if="orderTakingForm.reward_type">
          <el-input
            placeholder="请输入金额"
            v-if="orderTakingForm.reward_type==1"
            class="width160 text-input"
            v-model="orderTakingForm.reward_money"
          >
            <template slot="append">
              <span class="moneyType">元/人/月</span>
            </template>
          </el-input>
          <div v-else-if="orderTakingForm.reward_type==4">
            <el-input placeholder="请输入" class="width160 text-input" v-model="orderTakingForm.money">
              <template slot="prepend">
                <span class="moneyType">返利总金额</span>
              </template>
            </el-input>
            <el-input
              placeholder="请输入"
              class="width160 text-input"
              v-model="orderTakingForm.reward_needatime"
            >
              <template slot="prepend">
                <span class="moneyType">需入职满</span>
              </template>
              <template slot="append">
                <span class="moneyType">天</span>
              </template>
            </el-input>
          </div>
          <el-select
            v-model="orderTakingForm.reward_continuous"
            v-else
            class="width160"
            placeholder="请选择"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in payTypeList"
              :key="item.label"
            ></el-option>
          </el-select>
        </div>
      </div>
      <span class="error el-icon-warning">入职天数为0时，代表入职当天返利</span>
    </el-form-item>
    <el-form-item class="reward_type">
      <div
        class="x-flex-start width500"
        v-if="orderTakingForm.reward_type==1&&orderTakingForm.reward_money_type==3"
      >
        <el-input
          placeholder="请输入"
          class="width160 text-input"
          v-model="orderTakingForm.settlement_time"
        >
          <template slot="prepend">
            <span class="moneyType">次月</span>
          </template>
          <template slot="append">
            <span class="moneyType">号结算</span>
          </template>
        </el-input>
        <el-select
          v-model="orderTakingForm.reward_money_type"
          @blur="blurInput"
          @change="changePayType"
          class="width160"
          placeholder="结算类型"
        >
          <el-option label="长期返利" :value="1"></el-option>
          <div class="width160" ref="reward" :value="2">
            <el-input
              placeholder="请输入"
              class="text-input"
              v-model="orderTakingForm.reward_needatime"
              @change="changeInput"
            >
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
      <div
        class="x-flex-start width700"
        v-if="orderTakingForm.reward_type!=1&&orderTakingForm.reward_type!=4"
      >
        <el-input
          placeholder="请输入"
          class="width160 text-input"
          v-model="orderTakingForm.reward_money"
          v-if="orderTakingForm.reward_money_type"
        >
          <template slot="append">
            <span class="moneyType">元/人/{{rewardType}}</span>
          </template>
        </el-input>
        <el-select
          v-model="orderTakingForm.settlement_type"
          class="width160"
          placeholder="结算类型"
          v-if="orderTakingForm.reward_money_type"
        >
          <el-option :label="`次${rewardType}结算`" :value="1"></el-option>
          <el-option :label="`本${rewardType}结算`" :value="2"></el-option>
        </el-select>
        <el-select
          v-model="orderTakingForm.settlement_time"
          v-if="orderTakingForm.reward_pay_type&&orderTakingForm.reward_money_type==2"
          class="width160"
          placeholder="请选择"
        >
          <el-option
            :label="`${payType}${item.label}`"
            :value="item.value"
            v-for="item in weekList"
            :key="item.label"
          ></el-option>
        </el-select>
      </div>
    </el-form-item>
    <el-form-item
      class="reward_type"
      v-if="(orderTakingForm.reward_type==2||orderTakingForm.reward_type==3)&&orderTakingForm.reward_money_type"
    >
      <div class="x-flex-start-justify width500">
        <el-input
          placeholder="请输入"
          @focus="focusInput"
          class="width160 text-input"
          v-model="orderTakingForm.money"
        >
          <template slot="prepend">
            <span class="moneyType">持续</span>
          </template>
          <template slot="append">
            <span class="moneyType">{{rewardType}}</span>
          </template>
        </el-input>
        <el-input
          placeholder="请输入"
          class="width160 text-input"
          @focus="focusInput"
          v-model="orderTakingForm.money"
        >
          <template slot="prepend">
            <span class="moneyType">需入职满</span>
          </template>
          <template slot="append">
            <span class="moneyType">{{rewardType}}</span>
          </template>
        </el-input>
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
  props: ['moneyList'],
  data () {
    return {
      orderTakingForm: {},
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
