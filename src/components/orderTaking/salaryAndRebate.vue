<style lang="scss">
@import '@/assets/css/salaryRebate.scss';
</style>
<template>
  <div class="salary-rebate">
    <el-form-item label="员工薪资" required>
      <div class="x-flex-start">
        <el-select v-model="orderTakingForm.money_type" class="width160" placeholder="请选择">
          <el-option :label="item.label" :value="item.value" v-show="index" v-for="(item,index) in moneyTypeList" :key="item.label"></el-option>
        </el-select>
        <el-select v-model="orderTakingForm.money" v-if="orderTakingForm.money_type==1" class="width160" placeholder="请选择">
          <el-option :label="item" :value="key" v-for="(item,key) in moneyList" :key="key"></el-option>
        </el-select>
        <el-input placeholder="请输入薪资" v-if="orderTakingForm.money_type&&orderTakingForm.money_type!=1" class="width160 money_type text-input" v-model="orderTakingForm.money">
          <template slot="append">
            <span class="moneyType" v-if="orderTakingForm.money_type==2">元/人/日</span>
            <span class="moneyType" v-if="orderTakingForm.money_type==3">元/人/时</span>
          </template>
        </el-input>
      </div>
    </el-form-item>
    <el-form-item label="返利模式" class="reward_type" required>
      <div class="x-flex-start width700">
        <el-select v-model="orderTakingForm.reward_type" @change="changeReward" class="width160" placeholder="请选择">
          <el-option :label="item.label" :value="item.value" v-show="index" v-for="(item,index) in rewardTypeList" :key="item.label"></el-option>
        </el-select>
        <div v-if="orderTakingForm.reward_type">
          <el-input placeholder="请输入金额" v-if="orderTakingForm.reward_type==1" class="width160 text-input" v-model="orderTakingForm.reward_money">
            <template slot="append">
              <span class="moneyType">元/人/月</span>
            </template>
          </el-input>
          <div v-else-if="orderTakingForm.reward_type==4">
            <el-input placeholder="请输入" class="width160 text-input" v-model="orderTakingForm.reward_money">
              <template slot="prepend">
                <span class="moneyType">返利总金额</span>
              </template>
            </el-input>
            <el-input placeholder="请输入" class="width160 text-input" v-model="orderTakingForm.reward_needtime">
              <template slot="prepend">
                <span class="moneyType">需入职满</span>
              </template>
              <template slot="append">
                <span class="moneyType">天</span>
              </template>
            </el-input>
          </div>
          <el-select v-model="orderTakingForm.reward_money_type" v-else class="width160" placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="item in payTypeList" :key="item.label"></el-option>
          </el-select>
        </div>
      </div>
    </el-form-item>
    <el-form-item class="reward_type">
      <div class="x-flex-start width500" v-if="orderTakingForm.reward_type==1">
        <el-input placeholder="请输入" class="width160 text-input" v-model="orderTakingForm.settlement_time">
          <template slot="prepend">
            <span class="moneyType">次月</span>
          </template>
          <template slot="append">
            <span class="moneyType">号结算</span>
          </template>
        </el-input>
        <el-select v-model="reward_money_type" @blur="blurInput" @change="changePayType" class="width160" placeholder="结算类型">
          <el-option label="长期返利" :value="1"></el-option>
          <div class="width160 reward-input" ref="reward" :value="2">
            <el-input placeholder="请输入" class="text-input" v-model="orderTakingForm.duration_time" @change="changeInput">
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
        <el-input placeholder="请输入" class="width160 text-input" v-model="orderTakingForm.reward_money" v-if="orderTakingForm.reward_money_type">
          <template slot="append">
            <span class="moneyType">元/人/{{rewardType}}</span>
          </template>
        </el-input>
        <el-select v-model="orderTakingForm.settlement_type" class="width160" placeholder="结算类型" v-if="orderTakingForm.reward_money_type">
          <el-option :label="`次${rewardType}结算`" :value="1"></el-option>
          <el-option :label="`本${rewardType}结算`" :value="2"></el-option>
        </el-select>
        <el-select v-model="orderTakingForm.settlement_time" v-if="orderTakingForm.reward_money_type==2&&orderTakingForm.settlement_type" @xhange="changeSettlementTime" class="width160" placeholder="请选择">
          <el-option :label="`${item.label}`" :value="item.value" v-for="item in weekList" :key="item.label"></el-option>
        </el-select>
        <el-input placeholder="请输入" v-if="orderTakingForm.reward_money_type==3&&orderTakingForm.settlement_type" class="width160 text-input" v-model="orderTakingForm.settlement_time">
          <template slot="prepend">
            <span class="moneyType">{{payType}}月</span>
          </template>
          <template slot="append">
            <span class="moneyType">号</span>
          </template>
        </el-input>
      </div>
    </el-form-item>
    <el-form-item class="reward_type" v-if="(orderTakingForm.reward_type==2||orderTakingForm.reward_type==3)&&orderTakingForm.reward_money_type">
      <div class="x-flex-start-justify width500 duration_time">
        <el-input placeholder="请输入" @focus="focusInput" class="width160 text-input" v-model="orderTakingForm.duration_time">
          <template slot="prepend">
            <span class="moneyType">持续</span>
          </template>
          <template slot="append">
            <span class="moneyType">{{rewardType}}</span>
          </template>
        </el-input>
        <el-input placeholder="请输入" class="width160 text-input" @input="changeNeedtime" v-model="orderTakingForm.reward_needtime">
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
  props: ['moneyList', 'from'],
  data () {
    return {
      orderTakingForm: {
        money: '',  // 薪资
        money_type: '', //薪资类型 // （1：月薪，2：日薪，3：时薪）
        reward_type: '', // 返利类型(1月返 2日返 3时返 4一次性返)
        reward_money: '', // 返利金额(根据类型修改单位)
        reward_money_type: '', // 1日2周3月(针对日返和时返) 1长期2持续（针对月返）结算类型 
        settlement_time: '', // 结算时间(针对月返：次月第XX多少天；)
        reward_needtime: '', // 需求入职天数/周数/月数(一次性时：0表示当天返)
        duration_time: '', // 持续 (天数/周数/月数)
        settlement_type: '', // 结算方式（1 当月/当周/当日，2 次月/次周/次日）
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
      return this.orderTakingForm.reward_money_type == 1 ? '日' : this.orderTakingForm.reward_money_type == 2 ? '周' : '月'
    },
    moneyType () {
      return this.orderTakingForm.reward_money_type == 1 ? '日' : this.orderTakingForm.reward_money_type == 2 ? '周' : '月'
    }
  },
  watch: {
    orderTakingForm: {
      handler (val, oldName) {
        for (let key in val) {
          if (val.reward_type == 1) {
            if (val[key] != '' && key != 'reward_needtime' && key != 'duration_time') {
              if (Number(this.orderTakingForm.settlement_time) > 31) {
                return this.$message.warning('结算时间最大输入31')
                this.$emit('submit', null)
              }
              else {
                this.$emit('submit', val)
              }
            }
          }
          else {
            if (val[key] != '') {
              if (val.reward_type != 4 && Number(this.orderTakingForm.reward_needtime) > Number(this.orderTakingForm.duration_time)) {
                this.orderTakingForm.reward_needtime = this.orderTakingForm.duration_time
                this.$emit('submit', val)
              }
              else if (val.reward_money_type == 3 && Number(val.settlement_time > 31)) {
                this.orderTakingForm.settlement_time = 31
                return this.$message.warning('最大输入31')
                this.$emit('submit', null)
              }
              else {
                this.$emit('submit', val)
              }
            }
          }
        }
      },
      deep: true
    },
    from (val) {
      if (val) {
        for (let key in val) {
          this.orderTakingForm[key] = val[key]
        }
      }
    }
  },
  methods: {
    changeReward (val) {
      if (val == 1) {
        this.orderTakingForm.settlement_type = 1
      }
    },
    changeSettlementTime (val) {
      console.log(val)
    },
    changeNeedtime (val) {
      console.log(val)
    },
    focusInput (e) {
      console.log(e)
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
