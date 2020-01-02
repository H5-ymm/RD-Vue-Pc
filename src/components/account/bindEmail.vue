<template>
  <el-form
    :model="formMember"
    :rules="rules"
    :inline="true"
    label-position="left"
    ref="formMember"
    class="demo-form-inline account-bind"
  >
    <el-form-item label="邮箱地址" required prop="email">
      <el-input v-model="formMember.email" placeholder="请输入绑定邮箱地址"></el-input>
    </el-form-item>
    <div class="account-btn-box x-flex-end">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">绑定</el-button>
    </div>
  </el-form>
</template>
<script>
import { checkEmail } from '../../util/util'
export default {
  props: ['dialogTableVisible'],
  data () {
    var validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        if (!checkEmail(value)) {
          callback(new Error('请输入正确的邮箱'));
        }
        callback()
      }
    };
    return {
      formMember: {
        email: '',
        uid: localStorage.getItem('uid'),
      },
      rules: {
        email: [
          { validator: validate, trigger: 'blur' }
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