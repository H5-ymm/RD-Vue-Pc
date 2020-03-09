<style lang="scss">
@import '@/assets/css/login.scss';
</style>
<template>
  <el-container class="loads register-view">
    <el-header class="header x-flex-around">
      <div class="x-flex-between head-left">
        <span class="header-left">人事达</span>
        <a class="welcome">欢迎登录</a>
      </div>
      <div class="bg-purple-light">
        <a>021-51991869</a>
      </div>
    </el-header>
    <el-main class="login-main">
      <div class="register-content">
        <div class="register-box">
          <el-form ref="TabForm" :model="formTab" label-width="20" :rules="formTabs" class="form-box">
            <div class="x-flex-around register-btn">
              <el-button type="text">忘记密码</el-button>
            </div>
            <el-form-item label="手机号" prop="mobile">
              <span class="error errorInfo el-icon-warning" v-if="isShowError">账号或者密码错误，如遇到问题联系客服，021-51991869</span>
              <el-input placeholder="请输入11位手机号" v-model="formTab.mobile">
                <template slot="prepend">
                  <span>+86</span>
                  <i class="el-icon-arrow-down"></i> |
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="发送验证码">
              <span class="error el-icon-warning" v-if="isCodeError">验证码错误或者已过期</span>
              <el-input v-model="formTab.code" placeholder="请输入验证码" class="inputCode" show-word-limit></el-input>
              <el-button type="primary" class="code-btn password-code-btn" plain :class="{disabled: !this.canClick}" @click="sendCode">{{content}}</el-button>
            </el-form-item>
            <el-form-item prop="newPassword" label="密码">
              <el-input v-model="formTab.newPassword" type="password" placeholder="请输入密码" show-word-limit></el-input>
            </el-form-item>
            <el-form-item prop="newPassworded" label="确认密码">
              <el-input v-model="formTab.newPassworded" placeholder="请输入确认密码" type="password" show-word-limit></el-input>
            </el-form-item>
            <el-form-item class="submit-btn">
              <el-button type="primary" @click="onSubmit('TabForm')" class="login">确认</el-button>
            </el-form-item>
            <p class="text">
              已有账户，
              <a href="/login">现在登录</a>
              <img src="../assets/img/loginRight.png" alt class="loginRight" />
            </p>
          </el-form>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { goLogin, getCode, forgetPassword } from '../api/login'
import { sendVerification } from '../api/user'
import Dialog from '../components/Dialog'
export default {
  components: {
    Dialog
  },
  data () {
    let validatereg = function (rule, value, callback) {
      //验证用户名是否合法
      let reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    let validatePassReg = function (rule, value, callback) {
      //验证密码是否合法
      let reg = /^[a-zA-Z][a-zA-Z0-9]{6,30}$/
      if (reg.test(value) == true) {
        callback()
      } else {
        callback(new Error('密码不合法(请输入数字或字母)'))
      }
    }
    return {
      formTab: {
        mobile: '',
        type: '2'
      },
      checked: false,
      formTabs: {
        //验证规则
        mobile: [
          { message: '请输入手机号', trigger: 'blur' },
          { validator: validatereg, trigger: 'blur' }
        ],
        newPassword: [
          { message: '请输入密码', trigger: 'blur' }
          // { validator: validatePassReg, trigger: 'blur' }
        ],
        newPassworded: [
          { message: '请输入确认密码', trigger: 'blur' }
          // { validator: validatePassReg, trigger: 'blur' }
        ]
      },
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60,
      timer: null,
      canClick: true,
      token: '',
      isShowError: false,
      isCodeError: false,
      dialogVisible: false,
      modalInfo: {
        title: '账号已锁定',
        okText: '',
        closeText: '',
        imgBg: require('../assets/img/lock.png')
      }
    }
  },
  methods: {
    sendCode () {
      if (!this.formTab.mobile) {
        return this.$message.warning('手机号不能为空')
      }
      this.countDown()
      sendVerification({ mobile: this.formTab.mobile })
        .then(res => {
          this.token = res.data.tken
          this.formTab.token = res.data.tken
        })
        .catch(error => {
          return this.$message.error(error.status.remind)
        })
    },
    countDown () {
      if (!this.canClick) return
      this.canClick = false
      this.content = this.totalTime + 's后重发'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重发'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 60
          this.canClick = true // 这里重新开启
        }
      }, 1000)
    },
    switchLogin (index) {
      this.loginWay = index
      this.formTab.type = index
      this.formTab.name = ''
      this.formTab.passwords = ''
      this.formTab.code = ''
    },
    remind (val) {
      if (val) {
        let params = {
          name: this.formTab.name,
          password: this.formTab.passwords
        }
        localStorage.setItem('remindUserInfo', JSON.stringify(params))
      } else {
        localStorage.removeItem('remindUserInfo')
      }
    },
    onSubmit () {
      if (this.loginWay == 2) {
        this.formTab.token = this.token
      }
      this.$refs['TabForm'].validate(valid => {
        if (valid) {
          forgetPassword(this.formTab)
            .then(res => {
              this.$router.push('/login')
            })
            .catch(error => {
              if (error.status.code == 3010) {
                this.isShowError = true
                this.dialogVisible = false
                this.isCodeError = false
              } else if (error.status.code == 1008) {
                this.dialogVisible = true
                this.isShowError = false
              } else if (error.status.code == 3008) {
                this.isCodeError = true
                this.isShowError = false
                this.dialogVisible = false
              } else {
                this.dialogVisible = false
                this.isShowError = false
                this.isCodeError = false
                return this.$message.error(error.status.remind)
              }
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
