<template>
  <el-form
    :model="formMember"
    :rules="rules"
    :inline="true"
    label-position="left"
    ref="formMember"
    class="demo-form-inline account-bind"
  >
    <el-form-item label="姓名" required v-if="isUpdate">
      <el-input
        v-model="formMember.depart_name"
        suffix-icon="el-icon-success input-success"
        placeholder="请输入已认证信息的姓名"
      ></el-input>
      <span class="error el-icon-warning">姓名与已认证信息不符</span>
    </el-form-item>
    <el-form-item label="身份证" required v-if="isUpdate">
      <el-input
        v-model="formMember.depart_name"
        suffix-icon="el-icon-success input-success"
        placeholder="请输入已认证的身份证号码"
      ></el-input>
      <span class="error el-icon-warning">身份证号码与已认证信息不符</span>
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
      <el-input
        v-model="formMember.depart_name"
        suffix-icon="el-icon-success input-success"
        placeholder="请输入6为数字组合的新密码"
      ></el-input>
    </el-form-item>
    <el-form-item :label="label1" required>
      <el-input
        v-model="formMember.depart_name"
        suffix-icon="el-icon-success input-success"
        placeholder="请输入和上面相同的密码"
      ></el-input>
      <span class="error el-icon-warning">两次密码不一致</span>
    </el-form-item>
    <div class="account-btn-box x-flex-end">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
    <el-link type="primary" @click="handelForget" v-if="isUpdate" class="forget-password">换一种方式修改密码</el-link>
  </el-form>
</template>
<script>
import { validateIdCard } from '../../util/util'
export default {
  props: ['dialogTableVisible', 'isUpdate'],
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
    label () {
      return this.isUpdate ? '设置支付密码' : '设置支付密码'
    },
    label1 () {
      return this.isUpdate ? '确认新密码' : '确认密码'
    }
  },
  methods: {
    handelForget () {
      this.isShow = true
    },
    handleClose () {
      this.$emit('handleClose')
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
  .forget-password {
    position: absolute;
    bottom: 30px;
    left: 50px;
  }
}

</style>