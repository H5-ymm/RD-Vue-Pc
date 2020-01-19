<style lang="scss">
  .demo-form-inline {
    &.account-bind{
        .el-form-item {
          text-align: left;
        }
        .bind-input-code {
          overflow: hidden;
          &.el-input {
            width: 280px;
            float: left;
          }
          .el-input__inner {
            width: 280px!important;
          }
        }
        .el-input__inner {
          width: 400px!important;
        }
        .el-radio__label {
          float: left;
          margin-left: 10px;
        }
        .el-radio.is-bordered {
          width: 195px;
          height: 42px;
          line-height: 42px;
          padding:0;
          margin-right: 0;
          &+.el-radio.is-bordered {
            margin-left: 10px;
          }
        }
        .el-radio__input {
          float: right;
          margin-top: 12px;
          margin-right: 10px;
        }
        .code-btn {
          &.el-button--primary.is-plain{
            &:hover {
              background-color: #1890ff;
              color: #fff;
            }
          }
        }
     }
  }
</style>
<template>
  <el-form :model="formMember" :rules="rules" :inline="true" label-position="left" ref="formMember" class="demo-form-inline account-bind">
    <el-form-item label="姓名" prop="user_name">
      <el-input v-model="formMember.user_name" placeholder="请输入持卡人真实姓名"></el-input>
    </el-form-item>
    <el-form-item label="身份证号码" prop="idCard">
      <el-input v-model="formMember.idCard" placeholder="请输入持卡人的身份证号"></el-input>
    </el-form-item>
    <el-form-item label="银行卡号码" prop="bankNum">
      <el-input v-model="formMember.bankNum" placeholder="请输入您的银行卡号"></el-input>
    </el-form-item>
    <el-form-item label="银行卡类型" prop="card_type">
      <el-radio-group v-model="formMember.card_type">
        <el-radio label="DC" border>借记卡</el-radio>
        <el-radio label="CC" border>信用卡</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="银行卡属性" prop="card_attribute">
      <el-radio-group v-model="formMember.card_attribute">
        <el-radio label="C" border>对私</el-radio>
        <el-radio label="B" border>对公</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="选择银行" prop="bank_name">
      <el-select v-model="formMember.bank_name" placeholder="选择银行">
        <el-option :label="item.bank_name" :value="item.bank_code" v-for="(item,index) in bankList" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="手机号码" prop="mobile">
      <el-input v-model="formMember.mobile" placeholder="请输入手机号码"></el-input>
    </el-form-item>
    <el-form-item label="短信验证码" prop="code">
      <el-input v-model="formMember.code" placeholder="请输入短信验证码" class="bind-input-code"></el-input>
      <el-button type="primary" class="code-btn" @click="sendCode" plain>发送验证码</el-button>
    </el-form-item>
    <div class="account-btn-box x-flex-end">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">绑定</el-button>
    </div>
  </el-form>
</template>
<script>
import { getBankList, sendPayPassword } from '../../api/user'
import { validateIdCard } from '../../util/util'
export default {
  props: ['dialogTableVisible'],
  data () {
    var validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号码'));
      } else {
        if (!validateIdCard(value)) {
          callback(new Error('请输入正确的身份证号码'));
        }
        callback()
      }
    };
    return {
      formMember: {
        uid: localStorage.getItem('uid'),
        type: 2,
        card_type: 'DC',
        card_attribute: 'C',
        token: ''
      },
      rules: {
        user_name: [
          { required:true,message: '请输入姓名', trigger: 'blur' }
        ],
        idCard: [
          { required:true,message: '请输入身份证号码', trigger: 'blur' },
          { validator: validate, trigger: 'blur' }
        ],
        bankNum: [
          { required:true,message: '请输入银行卡号', trigger: 'blur' }
        ],
        card_type: [
          { required:true,message: '请选择银行卡类型', trigger: 'blur' },
        ],
        card_attribute: [
          { required:true,message: '请选择银行卡属性', trigger: 'blur' }
        ],
        bank_name: [
          { required:true,message: '请选择银行卡', trigger: 'change' },
        ],
        mobile: [
          { required:true,message: '请输入手机号', trigger: 'blur' }
        ],
        code: [
          { required:true,message: '请输入验证码', trigger: 'blur' }
        ]
      },
      bankList: [],
      uid: localStorage.getItem('uid'),
      content: '发送验证码',
      canClick: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getBankList({}).then(res => {
        this.bankList = res.data
      })
    },
    sendCode () {
      if (!this.formMember.mobile) {
        return this.$message.warning('手机号不能为空')
      }
      this.countDown()
      sendPayPassword({ mobile: this.formMember.mobile }).then(res => {
        this.formMember.token = res.data.token
      })
    },
    countDown () {
      if (!this.canClick) return  //改动的是这两行代码
      this.canClick = false
      this.content = this.totalTime + 's后重发'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重发'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 60
          this.canClick = true  //这里重新开启
        }
      }, 1000)
    },
    handleClose () {
      this.$emit('handleClose')
    },
    submitForm () {
      this.$refs['formMember'].validate((valid) => {
        if (valid) {
          this.$emit('submitForm', this.formMember)
        } else {
          return false
        }
      })
    }
  }
}
</script>
