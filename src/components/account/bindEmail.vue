<template>
  <el-form
    :model="formMember"
    :rules="rules"
    :inline="true"
    label-position="left"
    ref="formMember"
    class="demo-form-inline account-bind"
  >
    <el-form-item label="邮箱地址" required prop="depart_name">
      <el-input v-model="formMember.email" placeholder="请输入绑定邮箱地址"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { validateIdCard } from '../../util/util'
export default {
  props: ['dialogTableVisible'],
  data () {
    return {
      formMember: {
        email: '',
        uid: localStorage.getItem('uid'),
      },
      rules: {
        depart_name: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
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