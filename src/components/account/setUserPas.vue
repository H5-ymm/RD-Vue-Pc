<template>
  <el-form :model="formMember" :rules="rules" :inline="true" label-position="left" ref="formMember" class="demo-form-inline account-bind">
    <div v-if="isShow">
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="formMember.mobile" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="短信验证码" prop="code">
        <div class="x-flex-between">
          <el-input v-model="formMember.code" placeholder="请输入短信验证码" class="bind-input-code"></el-input>
          <el-button type="primary" class="code-btn" plain :class="{disabled: !this.canClick}" @click="sendCode">{{content}}</el-button>
        </div>
      </el-form-item>
    </div>
    <el-form-item label="原密码" v-if="isUpdate&&!isShow">
      <el-input v-model="formMember.password" :suffix-icon="formMember.password?'el-icon-success input-success':''" placeholder="请输入原密码"></el-input>
      <span class="error el-icon-warning" v-if="pasError">密码错误</span>
    </el-form-item>
    <el-form-item :label="label" prop="newPassword">
      <el-progress :percentage="40" :format="format" class="error progress" color="#FE2A00" v-if="formMember.newPassword&&formMember.newPassword.length&&formMember.newPassword.length<=6"></el-progress>
      <el-progress :percentage="70" :format="format" class="error progress" color="#FF9938" v-if="formMember.newPassword&&formMember.newPassword.length>6&&formMember.newPassword.length<=10"></el-progress>
      <el-progress :percentage="100" :format="format" class="error progress" color="#58B44E" v-if="formMember.newPassword&&formMember.newPassword.length>10"></el-progress>
      <el-input v-model="formMember.newPassword" :suffix-icon="formMember.newPassword?'el-icon-success input-success':''" :placeholder="'请输入'+ ( isUpdate ? '新': '' ) + '密码，6-16位字母/数字/符号组合'"></el-input>
    </el-form-item>
    <el-form-item :label="label1">
      <el-input v-model="formMember.newPassworded" :suffix-icon="formMember.newPassworded&&formMember.newPassworded==formMember.newPassword?'el-icon-success input-success':''" placeholder="请输入和上面相同的密码"></el-input>
      <span class="error el-icon-warning" v-if="pasCheck">两次密码不一致</span>
    </el-form-item>
    <div class="account-btn-box x-flex-end">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
    <el-link type="primary" @click="handelForget" v-if="isUpdate" class="forget-password">忘记原密码</el-link>
  </el-form>
</template>
<script>
import { validateIdCard } from '../../util/util'
import { sendVerification } from '../../api/user'
export default {
  props: ['dialogTableVisible', 'isUpdate'],
  data() {
    return {
      formMember: {
        uid: localStorage.getItem('uid'),
        password: '',
        type: 1
      },
      rules: {},
      isShow: false,
      uid: localStorage.getItem('uid'),
      content: '发送验证码',
      totalTime: 60,
      canClick: true,
      token: '',
      pasError: false,
      pasCheck: false
    }
  },
  created() {
    this.isShow = false
    this.formMember.type = 1
  },
  computed: {
    label() {
      return this.isUpdate ? '新密码' : '设置密码'
    },
    label1() {
      return this.isUpdate ? '确认新密码' : '确认密码'
    }
  },
  methods: {
    handelForget() {
      this.isShow = true
      this.formMember.type = 2
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
      let clock = setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重发'
        if (this.totalTime < 0) {
          clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 60
          this.canClick = true //这里重新开启
        }
      }, 1000)
    },
    format(percentage) {
      return percentage === 100
        ? '强度：高'
        : percentage === 70
          ? '强度：中'
          : '强度：低'
    },
    handleClose() {
      this.isShow = false
      this.formMember = {
        uid: localStorage.getItem('uid'),
        password: '',
        type: 1
      }
      this.$emit('handleClose')
    },
    submitForm() {
      this.$refs['formMember'].validate(valid => {
        if (valid) {
          if (this.isShow) {
            this.formMember.reset = true
          }
          this.$emit('submitForm', this.formMember)
          this.isShow = false
          this.formMember = {
            uid: localStorage.getItem('uid'),
            password: '',
            type: 1
          }
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
  .el-form-item__label {
    display: block;
  }
  .el-form-item,
  .el-form-item__content {
    width: 100%;
  }
  .bind-input-code {
    overflow: hidden;
    &.el-input {
      width: 280px;
      // float: left;
    }
    .el-input__inner {
      width: 280px !important;
    }
  }
  .el-input--suffix .el-input__inner {
    padding: 18px 10px;
  }
  .input-success {
    padding-right: 10px;
  }
  .code-btn {
    padding: 11px 20px;
    &.el-button--primary.is-plain,.el-button--primary.disabled {
      &:hover,&:focus {
        background-color: #1890ff;
        color: #fff;
      }
    }
  }
  .error {
    position: absolute;
    top: -24px;
    right: 0;
    color: #fe2a00;
    font-size: 12px;
    &.progress {
      top: -30px;
      width: 100px;
    }
  }
  .input-success {
    color: #67c23a;
  }
}
</style>