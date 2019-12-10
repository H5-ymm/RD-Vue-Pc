<template>
  <el-form
    :model="formMember"
    :rules="rules"
    :inline="true"
    label-position="left"
    ref="formMember"
    class="demo-form-inline account-bind"
  >
    <el-form-item label="支付宝账号" required prop="depart_name">
      <el-input v-model="formMember.depart_name" placeholder="请输入要绑定的支付宝账号"></el-input>
    </el-form-item>
    <el-form-item label="姓名" required prop="depart_name">
      <el-input v-model="formMember.depart_name" placeholder="请输入身份证姓名"></el-input>
    </el-form-item>
    <el-form-item label="身份证号码" required prop="user_id">
       <el-input v-model="formMember.depart_name" placeholder="请输入支付宝认证的身份证号"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" required prop="user_id">
       <el-input v-model="formMember.depart_name" placeholder="请输入支付宝绑定的手机号"></el-input>
    </el-form-item>
    <!-- <el-form-item label="短信验证码" required prop="depart_name">
      <el-input v-model="formMember.depart_name" placeholder="请输入部门名称" class="bind-input-code"></el-input>
      <el-button type="primary" class="code-btn" plain>发送验证码</el-button>
    </el-form-item> -->
  </el-form>
</template>
<script>
import { validateIdCard } from '../../util/util'
export default {
  props: ['dialogTableVisible'],
  data () {
    return {
      formMember: {
        depart_name: '',
        user_id: '',
        uid: localStorage.getItem('uid'),
      },
      rules: {
        depart_name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
        ],
        user_id: [
          { required: true, message: '请选择部门经理', trigger: 'blur' }
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
<style lang="scss">

</style>