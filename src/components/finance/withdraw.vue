<style lang="scss">
@import '@/assets/css/finance.scss';
.my-account-withdraw{
  .bank-info-box {
    width: 640px;
    margin-bottom: 20px;
    .el-dropdown {
      .el-button {
        padding:11px 13px;
        border-radius:3px;
        background: #fff;
        border: 1px solid #1890FF;
        color: #1890FF;
        &:hover {
          color: #1890FF;
        }
      }
    }
  }
  .my-acount-form {
    padding-top: 10px;
    .el-radio__label {
      color: #333!important;
    }
  }
  .bank-info {
    border: 1px solid #eee;
    padding: 0 15px;
    width: 512px;
    font-size: 14px;
    color: #333333;
    position: relative;
    height: 38px;
    line-height: 38px;
    border-radius:3px;
    &::before{
      content:'';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #1890FF;
      position: absolute;
      top: 40%;
      left: 6px;
    }
    .bank-btn {
      line-height: 38px;
      span {
        display: inline-block;
        width:38px;
        height:18px;
        line-height: 18px;
        text-align: center;
        background: #8BB0D1;
        border-radius:9px;
        color: #fff;
        font-size: 12px;
        margin-left: 5px;
      }
      .default {
        background:#E6B67C;
      }
    }
    .tip {
      color: #999999;
    }
  }
  .my-account-pay {
    color: #333;
  }
}
.account-dropdown {
  .el-dropdown-menu__item {
    padding: 0 6px;
    text-align: center;
  }
}
</style>
<template>
  <div class="my-account-view">
    <div class="my-account-deposit my-account-withdraw">
      <div class="my-account-info">
        <p>账户余额（元）</p>
        <p class="money">100.00</p>
      </div>
      <div class="my-account-pay">
        <p>选择提现方式</p>
        <el-form
          label-width="80px"
          label-position="left"
          :model="form"
          class="my-acount-form team-setting-box"
        >
          <el-form-item label="充值金额">
            <el-radio-group v-model="form.radio" @change="selectPay">
              <el-radio :label="1">
                提现到支付宝账户
                <span>1*********2</span>
                <!-- <span>未绑定</span> -->
                <el-button type="text">查看</el-button>
                <!-- <el-button type="text">去绑定</el-button> -->
              </el-radio>
              <el-radio :label="2">选择银行卡提现</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.radio==2">
            <div class="x-flex-between bank-info-box">
              <label class="bank-info x-flex-around">
                <p>上海银行</p>
                <p>尾号：3764</p>
                <p class="bank-btn">
                  <span class="default">默认</span>
                  <span>快捷</span>
                  <span>次日</span>
                </p>
                <p class="tip">单笔5000.00元，单日无限额</p>
              </label>
              <el-dropdown @command="handleCommand">
                <el-button plain type="primary">
                  管理
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="account-dropdown">
                  <el-dropdown-item :command="0">设为默认</el-dropdown-item>
                  <el-dropdown-item :command="1">编辑</el-dropdown-item>
                  <el-dropdown-item :command="2">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <el-button
              icon="el-icon-plus"
              v-if="!bankList.length"
              @click="$router.push('accountBank')"
            >添加银行卡</el-button>
            <el-select placeholder="请选择" v-model="form.bankId" v-if="bankList.length">
              <el-option
                :label="item.bank_name"
                :value="item.bank_id"
                v-for="(item,index) in bankList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提现金额">
            <el-input v-model="form.type" type="number" class="width200" placeholder="请输入充值备注"></el-input>&nbsp;元
          </el-form-item>
          <el-form-item label="到账时间">
            <el-radio :label="1" v-model="form.time">{{form.radio==1?'实时到账':'次日到账'}}</el-radio>
          </el-form-item>
          <el-form-item class="my-acount-btn">
            <el-button type="primary">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { getBindBankList } from '@/api/user'
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        type: '',
        radio: 1,
        time: 1
      },
      uid: localStorage.getItem('uid'),
      bankList: [

        {

          "id": 1,

          "uid": 6,

          "bank_id": "11660",

          "bank_name": "招商银行",

          "bankaccountno": "6214832135801137",

          "account_name": "测试用户",

          "card_type": "DC",

          "card_attribute": "C",

          "addtime": 1575529003

        }

      ]
    };
  },
  created () {

  },
  methods: {
    selectPay (val) {
      console.log(val)
      if (val == 2) {
        this.getList()
      }
    },
    getList () {
      getBindBankList({ uid: this.uid }).then(res => {
        console.log(res)
        // this.bankList = res.data || []
      })
    },
    handleCommand (val) {
      console.log(val)
    }
  },
}
</script>