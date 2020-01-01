<template>
  <el-form
    :model="formMember"
    :rules="rules"
    :inline="true"
    label-position="left"
    ref="formMember"
    class="demo-form-inline account-bind"
  >
    <el-form-item label="原手机号码" required prop="mobile">
      <el-input v-model="formMember.mobile" readonly placeholder="请输入原手机号码"></el-input>
    </el-form-item>
    <el-form-item label="新手机号码" required prop="newMobile">
      <el-input v-model="formMember.newMobile" placeholder="请输入新手机号码"></el-input>
    </el-form-item>
    <el-form-item label="短信验证码" required prop="code">
      <el-input v-model="formMember.code" placeholder="请输入短信验证码" class="bind-input-code"></el-input>
      <el-button type="primary" class="code-btn" plain>发送验证码</el-button>
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
  props: ['mobile'],
  data () {
    return {
      formMember: {
        uid: localStorage.getItem('uid'),
      },
      rules: {
      },
      uid: localStorage.getItem('uid')
    }
  },
  created () {
    this.formMember.mobile = this.mobile
  },
  methods: {
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