<template>
  <el-form
    :model="formMember"
    :rules="rules"
    :inline="true"
    label-position="left"
    ref="formMember"
    class="demo-form-inline account-bind"
  >
    <el-form-item label="姓名" required prop="depart_name">
      <el-input v-model="formMember.depart_name" placeholder="请输入持卡人真实姓名"></el-input>
    </el-form-item>
    <el-form-item label="身份证号码" required prop="depart_name">
      <el-input v-model="formMember.depart_name" placeholder="请输入持卡人的身份证号"></el-input>
    </el-form-item>
    <el-form-item label="银行卡号码" required prop="depart_name">
      <el-input v-model="formMember.depart_name" placeholder="请输入您的银行卡号"></el-input>
    </el-form-item>
     <el-form-item label="银行卡类型" required>
      <el-radio-group v-model="formMember.status">
        <el-radio :label="1" border>借记卡</el-radio>
        <el-radio :label="2" border>信用卡</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="银行卡属性" required>
      <el-radio-group v-model="formMember.status">
        <el-radio :label="1" border>对私</el-radio>
        <el-radio :label="2" border>对公</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="选择银行" required>
      <el-select v-model="formMember.user_id" placeholder="请选择部门经理">
        <el-option
          :label="item.bank_name"
          :value="item.bank_code"
          v-for="(item,index) in bankList"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="手机号码" required prop="user_id">
       <el-input v-model="formMember.depart_name" placeholder="请输入部门名称"></el-input>
    </el-form-item>
    <el-form-item label="短信验证码" required prop="depart_name">
      <el-input v-model="formMember.depart_name" placeholder="请输入部门名称" class="bind-input-code"></el-input>
      <el-button type="primary" class="code-btn" plain>发送验证码</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getBankList } from '../../api/user'
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
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
        ],
        user_id: [
          { required: true, message: '请选择部门经理', trigger: 'blur' }
        ]
      },
      bankList: [],
      uid: localStorage.getItem('uid')
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getBankList({ }).then(res => {
        this.bankList = res.data
      })
    },
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