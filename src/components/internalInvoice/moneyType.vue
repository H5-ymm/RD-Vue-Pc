<template>
  <div class="salary-rebate">
    <el-form-item label="综合薪资" prop="offermoney_type">
      <div>
        <el-select v-model="orderTakingForm.offermoney_type" @change="change" class="width160" placeholder="请选择">
          <el-option :label="item.label" :value="item.value" v-show="index" v-for="(item,index) in moneyTypeList" :key="item.label"></el-option>
        </el-select>
        <el-select v-model="orderTakingForm.offermoney" v-if="orderTakingForm.offermoney_type==1" class="width160" placeholder="请选择">
          <el-option :label="item" :value="key" v-for="(item,key) in moneyList" :key="key"></el-option>
        </el-select>
        <el-input placeholder="请输入薪资" v-if="orderTakingForm.offermoney_type&&orderTakingForm.offermoney_type!=1" class="width160 text-input" v-model="orderTakingForm.offermoney">
          <template slot="append">
            <span class="moneyType" v-if="orderTakingForm.offermoney_type==2">元/人/日</span>
            <span class="moneyType" v-if="orderTakingForm.offermoney_type==3">元/人/时</span>
          </template>
        </el-input>
      </div>
    </el-form-item>
  </div>
</template>
<script>
import { moneyTypeList } from '@/base/base'
import { getConstant } from '@/api/dictionary'
export default {
  data() {
    return {
      orderTakingForm: {
        offermoney_type: 1
      },
      moneyTypeList,
      moneyList: []
    }
  },
  watch: {
    orderTakingForm: {
      handler(val, oldName) {
        for (let key in val) {
          if (val[key] != '') {
            this.$emit('submit', val)
          }
        }
      },
      deep: true
    }
  },
  created() {
    let params = 'money_array'
    this.getList(params)
  },
  methods: {
    getList(filed) {
      getConstant({ filed }).then(res => {
        this.moneyList = res.data.money_array
      })
    },
    change(val) {
      this.orderTakingForm.offermoney = ''
    }
  }
}
</script>
<style lang="scss">
.salary-rebate {
  padding-bottom: 20px;
  .el-form-item {
    display: inline-block !important;
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
        margin-left: 5px;
        font-size: 12px;
        line-height: 20px;
      }
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
}
.width160 {
  width: 160px !important;
  margin-right: 30px;
  &.el-select {
    > .el-input {
      width: 160px !important;
    }
  }
  .moneyType {
    color: #333;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    border: none;
    border-radius: 0;
    background: none;
    padding: 0;
    background-color: none;
  }
}
.text-input {
  padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid #eee;
  height: 38px;
  .el-input__inner {
    // padding: 0;
    // height: 37px !important;
    // line-height: 37px !important;
    padding: 18px 0;
    text-align: center;
    border: none !important;
  }
}
</style>