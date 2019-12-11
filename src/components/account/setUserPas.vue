<template>
  <el-form
    :model="formMember"
    :rules="rules"
    :inline="true"
    label-position="left"
    ref="formMember"
    class="demo-form-inline account-bind"
  >
  <div v-if="isShow">
     <el-form-item label="新手机号码" required prop="user_id">
       <el-input v-model="formMember.depart_name" placeholder="请输入部门名称"></el-input>
    </el-form-item>
    <el-form-item label="短信验证码" required prop="depart_name">
      <el-input v-model="formMember.depart_name" placeholder="请输入部门名称" class="bind-input-code"></el-input>
      <el-button type="primary" class="code-btn" plain>发送验证码</el-button>
    </el-form-item>
  </div>
   <el-form-item label="原密码" required v-if="isUpdate">
      <el-input v-model="formMember.depart_name"
       suffix-icon="el-icon-success input-success"
       placeholder="请输入原密码"></el-input>
      <span class="error el-icon-warning">密码错误</span>
    </el-form-item>
    <el-form-item :label="label" required prop="depart_name">
        <el-progress
          :percentage="40"
          :format="format"
          class="error progress"
          color="#FE2A00"
          v-if="formMember.depart_name.length&&formMember.depart_name.length<=6"
        ></el-progress>
        <el-progress
          :percentage="70"
          :format="format"
          class="error progress"
          color="#FF9938"
          v-if="formMember.depart_name.length>6&&formMember.depart_name.length<=10"
        ></el-progress>
        <el-progress
          :percentage="100"
          :format="format"
          class="error progress"
          color="#58B44E"
          v-if="formMember.depart_name.length>10"
        ></el-progress>
      <el-input v-model="formMember.depart_name"
      suffix-icon="el-icon-success input-success"
       :placeholder="'请输入'+ isUpdate ? '新': '' + '密码，6-16位字母/数字/符号组合'"></el-input>
    </el-form-item>
    <el-form-item :label="label1" required>
      <el-input v-model="formMember.depart_name"
      suffix-icon="el-icon-success input-success"
       placeholder="请输入和上面相同的密码"></el-input>
      <span class="error el-icon-warning">两次密码不一致</span>
    </el-form-item>
    <el-link type="primary" @click="handelForget" v-if="isUpdate" class="forget-password">忘记原密码</el-link>
  </el-form>
</template>
<script>
import { validateIdCard } from '../../util/util'
export default {
  props: ['dialogTableVisible','isUpdate'],
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
        ]
      },
      isShow: false,
      uid: localStorage.getItem('uid')
    }
  },
  created () {

  },
  computed: {
    label(){
      return this.isUpdate ? '新密码' : '设置密码'
    },
    label1(){
      return this.isUpdate ? '确认新密码' : '确认密码'
    }
  },
  methods: {
    handelForget(){
      this.isShow = true
    },
    format (percentage) {
      return percentage === 100 ? '强度：高' : percentage === 70 ? '强度：中' : '强度：低';
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
.account-bind {
  .error {
    position:absolute;
    top:-24px;
    right:0;
    color:#FE2A00;
    font-size:12px;
  }
  .input-success {
    color: #67C23A;
  }
}

</style>