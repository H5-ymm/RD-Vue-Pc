<template>
  <el-form :model="formMember" :rules="rules" :inline="true" label-position="left" ref="formMember" class="demo-form-inline account-bind">
    <div v-if="isShow">
      <el-form-item label="手机号码" required>
        <el-input v-model="formMember.mobile" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="短信验证码" required>
        <div class="x-flex-between">
          <el-input v-model="formMember.code" placeholder="请输入短信验证码" class="bind-input-code"></el-input>
          <el-button type="primary" class="code-btn" plain :class="{disabled: !this.canClick}" @click="sendCode">{{content}}</el-button>
        </div>
      </el-form-item>
    </div>
    <el-form-item label="姓名" required v-if="!isUpdate&&!isShow">
      <el-input v-model="userName" readonly :suffix-icon="userName?'el-icon-success input-success':''" placeholder="请输入已认证信息的姓名"></el-input>
      <span class="error el-icon-warning">姓名与已认证信息不符</span>
    </el-form-item>
    <el-form-item label="身份证" required v-if="!isUpdate&&!isShow">
      <el-input v-model="formMember.id_card" :suffix-icon="formMember.id_card?'el-icon-success input-success':''" placeholder="请输入已认证的身份证号码"></el-input>
      <span class="error el-icon-warning">身份证号码与已认证信息不符</span>
    </el-form-item>
    <el-form-item :label="label" prop="payPassword" v-if="!isUpdate">
      <el-progress :percentage="40" :format="format" class="error progress" color="#FE2A00" v-if="formMember.payPassword&&formMember.payPassword.length&&formMember.payPassword.length<=6"></el-progress>
      <el-progress :percentage="70" :format="format" class="error progress" color="#FF9938" v-if="formMember.payPassword&&formMember.payPassword.length>6&&formMember.payPassword.length<=10"></el-progress>
      <el-progress :percentage="100" :format="format" class="error progress" color="#58B44E" v-if="formMember.payPassword&&formMember.payPassword.length>10"></el-progress>
      <el-input v-model="formMember.payPassword" :suffix-icon="formMember.payPassword?'el-icon-success input-success':''" placeholder="请输入6为数字组合的新密码"></el-input>
    </el-form-item>
    <el-form-item :label="label" prop="password" v-if="isUpdate&&!isShow">
      <el-input v-model="formMember.password" :suffix-icon="formMember.password?'el-icon-success input-success':''" placeholder="请输入6为数字组合的新密码"></el-input>
    </el-form-item>
    <el-form-item label="新密码" v-if="isUpdate" prop="newPassword">
      <el-progress :percentage="40" :format="format" class="error progress" color="#FE2A00" v-if="formMember.newPassword&&formMember.newPassword.length&&formMember.newPassword.length<=6"></el-progress>
      <el-progress :percentage="70" :format="format" class="error progress" color="#FF9938" v-if="formMember.newPassword&&formMember.newPassword.length>6&&formMember.newPassword.length<=10"></el-progress>
      <el-progress :percentage="100" :format="format" class="error progress" color="#58B44E" v-if="formMember.newPassword&&formMember.newPassword.length>10"></el-progress>
      <el-input v-model="formMember.newPassword" :suffix-icon="formMember.newPassword?'el-icon-success input-success':''" placeholder="请输入和上面相同的密码"></el-input>
    </el-form-item>
    <el-form-item :label="label1" v-if="isUpdate" prop="newPassworded">
      <el-input v-model="formMember.newPassworded" :suffix-icon="formMember.newPassworded&&formMember.newPassworded==formMember.newPassword?'el-icon-success input-success':''" placeholder="请输入和上面相同的密码"></el-input>
      <span class="error el-icon-warning" v-if="formMember.newPassworded&&formMember.newPassword!=formMember.newPassworded">两次密码不一致</span>
    </el-form-item>
    <div class="account-btn-box x-flex-end">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
    <el-link type="primary" @click="handelForget" v-if="isUpdate" class="forget-password">{{isShow?'换一种方式修改密码':'忘记原密码'}}</el-link>
  </el-form>
</template>
<script>
import { validateIdCard } from '../../util/util'
import { getUserName } from '@/api/user'
export default {
  props: ['dialogTableVisible', 'isUpdate'],
  data() {
    return {
      formMember: {
        uid: localStorage.getItem('uid')
      },
      rules: {},
      isShow: false,
      uid: localStorage.getItem('uid'),
      userName: '',
      content: '发送验证码',
      canClick: false,
      token: '',
      pasError: false,
      pasCheck: false
    }
  },
  created() {
    this.getName()
  },
  computed: {
    label() {
      return this.isUpdate ? '原密码' : '设置支付密码'
    },
    label1() {
      return this.isUpdate ? '确认新密码' : '确认密码'
    }
  },
  watch: {
    isUpdate(val) {
      console.log(val)
      if (val && !this.isShow) {
        this.rules = {
          password: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入确认新密码', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    getName() {
      let params = {
        uid: this.uid,
        type: localStorage.getItem('userType')
      }
      getUserName(params)
        .then(res => {
          if (res.data) {
            this.userName = res.data.user_name
            this.formMember.uid = res.data.uid
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    sendCode() {
      if (!this.formMember.mobile) {
        return this.$message.warning('手机号不能为空')
      }
      this.countDown()
      sendVerification({ mobile: this.formMember.mobile })
        .then(res => {
          this.token = res.data.token
          this.formMember.token = res.data.token
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    countDown() {
      if (!this.canClick) return //改动的是这两行代码
      this.canClick = false
      this.content = this.totalTime + 's后重发'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重发'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 60
          this.canClick = true //这里重新开启
        }
      }, 1000)
    },
    handelForget() {
      this.isShow = !this.isShow
      this.formMember = {
        uid: localStorage.getItem('uid')
      }
      if (this.isShow) {
        this.formMember.type = 2
      } else {
        this.formMember.type = 1
      }
    },
    handleClose() {
      this.$emit('handleClose')
    },
    format(percentage) {
      return percentage === 100
        ? '强度：高'
        : percentage === 70
          ? '强度：中'
          : '强度：低'
    },
    submitForm() {
      this.$refs['formMember'].validate(valid => {
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
    position: absolute;
    top: -24px;
    right: 0;
    color: #fe2a00;
    font-size: 12px;
  }
  .input-success {
    color: #67c23a;
  }
  .forget-password {
    position: absolute;
    bottom: 30px;
    left: 50px;
  }
}
</style>