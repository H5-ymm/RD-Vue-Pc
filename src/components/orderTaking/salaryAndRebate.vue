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
    <el-form-item label="返利模式" required>
      <div class="x-flex-start width500">
        <el-select v-model="orderTakingForm.reward_type" class="width160" placeholder="请选择">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in rewardTypeList"
            :key="item.label"
          ></el-option>
        </el-select>
        <el-input placeholder="请输入薪资" class="width160 text-input" v-model="orderTakingForm.money">
          <template slot="append">
            <span class="moneyType">元/人/日</span>
          </template>
        </el-input>
      </div>
    </el-form-item>
    <el-form-item>
      <div class="x-flex-start">
        <el-input placeholder="请输入薪资" class="width160 text-input" v-model="orderTakingForm.money">
          <template slot="append">
            <span class="moneyType" v-if="orderTakingForm.money_type==2">元/人/日</span>
            <span class="moneyType" v-if="orderTakingForm.money_type==3">元/人/时</span>
          </template>
        </el-input>
        <el-select v-model="orderTakingForm.reward_type" class="width160" placeholder="结算方式">
          <el-option
            :label="item"
            :value="index+1"
            v-for="(item,index) in comTypeList"
            :key="index"
          ></el-option>
        </el-select>
      </div>
    </el-form-item>
  </div>
</template>
<script>
import { moneyTypeList, rewardTypeList } from '../../base/base'
export default {
  props: ['moneyList'],
  data () {
    return {
      orderTakingForm: {},
      comTypeList: [],
      moneyTypeList,
      rewardTypeList
    }
  },
}
</script>
<style lang="scss">
  .salary-rebate {
    padding-bottom: 20px;
    .width500 {
      width: 500px;
    }
    .width110 {
      width: 110px;
      margin: 0 20px;
    }
    .width160 {
      width: 160px;
      margin-right: 30px;
    }
    .moneyType {
      color: #333;
    }
    .el-input-group__append {
      border: 1px solid #eee;
      border-left:none;
      border-radius: 0;
      background: none;
      padding: 0 15px 0 0;
    }
    .el-input__inner {
      padding: 0  0 0 10px;
    }
    .text-input {
      .el-input__inner {
        border-right: none!important;
      }
    }
  }
</style>