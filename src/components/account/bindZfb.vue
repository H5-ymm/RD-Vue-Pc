<template>
  <el-form
    :model="formMember"
    :rules="rules"
    :inline="true"
    label-position="left"
    ref="formMember"
    class="demo-form-inline account-bind"
  >
    <el-form-item label="支付宝账号" required prop="account_no">
      <el-input v-model="formMember.account_no" placeholder="请输入要绑定的支付宝账号"></el-input>
    </el-form-item>
    <el-form-item label="姓名" required prop="user_name">
      <el-input v-model="formMember.user_name" placeholder="请输入身份证姓名"></el-input>
    </el-form-item>
    <el-form-item label="身份证号码" required prop="idCard">
      <el-input v-model="formMember.idCard" placeholder="请输入支付宝认证的身份证号"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" required prop="mobile">
      <el-input v-model="formMember.mobile" placeholder="请输入支付宝绑定的手机号"></el-input>
    </el-form-item>
    <div class="account-btn-box x-flex-end">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">绑定</el-button>
    </div>
  </el-form>
</template>
<script>
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
    let validatereg = function (rule, value, callback) {
      let reg = /^1[3456789]\d{9}$/;
      if (!(reg.test(value))) {
        callback(new Error('手机号格式不正确'));
      } else {
        callback();
      }
    }
    return {
      formMember: {
        uid: localStorage.getItem('uid'),
        type: 2
      },
      rules: {
        idCard: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { validator: validate, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatereg, trigger: 'blur' }
        ]
      },
      uid: localStorage.getItem('uid')
    }
  },
  created () {

  },
  methods: {
    handleClose () {
      this.$parent.visible = false
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