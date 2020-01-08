<template>
  <el-dialog width="500px" title :visible.sync="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row pay-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>支付</p>
      </section>
      <section class="member-col3">
        <div class="x-flex-center">
          <el-alert title="确认转账后，资金将直接转入对方账户，无法退回。" show-icon type="error"></el-alert>
        </div>
        <div class="personal-box resume-info-card">
          <div class="resume-card-row">
            <div class="resume-card-item">
              <div class="x-flex-start">
                <p class="resume-col1">付款账户</p>
                <p>18324567889</p>
              </div>
              <div class="x-flex-start">
                <p class="resume-col1">收款人姓名</p>
                <p>3.薛冰冰</p>
              </div>
              <div class="x-flex-start">
                <p class="resume-col1">转账金额</p>
                <p class="money">
                  ￥500.00
                  <span class="big-money">(伍佰元整）</span>
                </p>
              </div>
              <div class="x-flex-start">
                <p class="resume-col1">转账备注</p>
                <p>水电费大法师的发是的发生法师的发是的法师打发水电费</p>
              </div>
              <div class="x-flex-start pay-password">
                <span class="error el-icon-warning">密码错误，请重新输入</span>
                <p class="resume-col1">支付密码</p>
                <p>
                  <el-input v-model="input" type="password" class="account-password"></el-input>
                  <el-input v-model="input" type="password" class="account-password"></el-input>
                  <el-input v-model="input" type="password" class="account-password"></el-input>
                  <el-input v-model="input" type="password" class="account-password"></el-input>
                  <el-input v-model="input" type="password" class="account-password"></el-input>
                  <el-input v-model="input" type="password" class="account-password"></el-input>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary">确定转账</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTableVisible: false,
    payType: { type: Number, default: 1 }
  },
  data () {
    return {
      list: [
        'yyy', 'kkkk'
      ],
      checkList: [],
      name: '',
      input: ''
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    submit () {
      this.$emit('handleOk', this.checkList)
    }
  }
}
</script>

<style lang="scss">
.member-dialog {
  box-shadow:0px 1px 43px 0px rgba(51,51,51,0.3);
  border-radius:5px;
  .el-dialog__body,.el-dialog__header {
    padding: 0;
  }
  .member-row {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #333333;
    padding: 0 0 10px;
    position: relative;
    &.pay-row {
      width: 100%;
      margin: 0 auto;
      padding-bottom: 20px;
      text-align: center;
      font-size: 14px;
       .el-alert {
         padding: 2px 20px;
       }
      .el-alert--error.is-light {
        color: #FE2A00;
      }
      .money {
        color: #FE2A00;
        font-size: 20px;
        font-weight: bold;
        .big-money {
          font-weight: normal;
          font-size: 14px;
          color: #333;
          margin-left: 10px;
        }
      }
      .member-col3 {
        font-size: 16px;
        .pay-title {
          font-size: 20px;
          margin-left: 10px;
        }
        .resume-info-card {
          line-height: 32px;
          .resume-col1 {
            color: #6A6A6A;
            width: 100px;
            text-align: right;
            margin-right: 20px;
          }
          p {
            &:nth-of-type(2) {
              width: 378px;
              line-height: 28px;
              text-align: left;
            }
          }
          .resume-card-row {
            margin: 10px 0;
          }
          .account-password {
            width: 30px;
            height: 30px;
            color: #333;
            margin-right: 15px;
            border-radius:4px;
            font-size: 16px;
            .el-input__inner {
              padding: 0;
              width: 30px;
              height: 30px;
              line-height: 30px;
              text-align: center;
            }
          }
          .pay-password{
            padding-top: 20px;
            position: relative;
            .error {
              position: absolute;
              top: 0;
              right: 30%;
              color: #FE2A00;
              font-size: 12px;
            }
          }
        }
      }
    }
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .member-col3 {
      width: 82%;
      border-top: 1px solid #eee;
      padding-top: 10px;
      margin: 0 auto;
    }
  }
}
</style>

