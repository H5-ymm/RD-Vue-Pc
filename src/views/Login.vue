<template>
  <el-container class="loads register-view">
    <el-header class="header x-flex-around">
      <div class="x-flex-between head-left">
        <span class="header-left">人事达</span>
        <a class="welcome">欢迎登录</a>
      </div>
      <div class="bg-purple-light">
        <!-- <span @click="$router.push('home')">浏览首页</span> -->
        <a>021-51991869</a>
      </div>
    </el-header>
    <el-main class="login-main">
      <div class="register-content">
        <div class="register-box">
          <el-form ref="TabForm" :model="formTab" label-width="20" :rules="formTabs" class="form-box">
            <div class="x-flex-around register-btn">
              <el-button type="text" :class="loginWay==1?'':'active'" @click="switchLogin(1)">账号登录</el-button>|
              <el-button type="text" :class="loginWay==2?'':'active'" @click="switchLogin(2)">短信登录</el-button>
            </div>
            <el-form-item prop="name" label="手机号">
              <span class="error errorInfo el-icon-warning" v-if="isShowError">账号或者密码错误，如遇到问题联系客服，021-51991869</span>
              <el-input placeholder="请输入11位手机号" v-model="formTab.name">
                <template slot="prepend">
                  <span>+86</span>
                  <i class="el-icon-arrow-down"></i> |
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="passwords" label="密码" v-if="loginWay==1">
              <el-input v-model="formTab.password" placeholder="请输入密码" @keyup.enter.native="onSubmit('TabForm')" type="password"></el-input>
            </el-form-item>
            <el-form-item label="发送验证码" v-if="loginWay==2">
              <span class="error el-icon-warning" v-if="isCodeError">验证码错误或者已过期</span>
              <el-input v-model="formTab.code" placeholder="请输入验证码" @keyup.enter.native="onSubmit('TabForm')" type="text" class="inputCode"></el-input>
              <el-button type="primary" class="code-btn" plain :class="{disabled: !this.canClick}" @click="sendCode">{{content}}</el-button>
            </el-form-item>
            <el-form-item v-if="loginWay==1">
              <el-checkbox v-model="checked" @change="remind">记住密码</el-checkbox>
              <el-link :underline="false" class="code-btn password" href="forgetPassword">忘记密码</el-link>
            </el-form-item>
            <el-form-item class="submit-btn">
              <el-button type="primary" @click="onSubmit('TabForm')" class="login">登录</el-button>
            </el-form-item>
            <p class="text">
              还没有账户，
              <a href="/register">免费注册</a>
              <img src="../assets/img/loginRight.png" alt class="loginRight" />
            </p>
          </el-form>
        </div>
        <Dialog :centerDialogVisible="dialogVisible" :modalInfo="modalInfo" @handleClose="dialogVisible=false"></Dialog>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { goLogin, getCode, userRegister } from '../api/login'
import { setTimeout } from 'timers';
import Dialog from '../components/Dialog'
export default {
  components: {
    Dialog
  },
  data () {
    let validatereg = function (rule, value, callback) {   //验证用户名是否合法
      let reg = /^1[3456789]\d{9}$/;
      if (!(reg.test(value))) {
        callback(new Error('手机号格式不正确'));
      } else {
        callback();
      }
    };
    let validatePassReg = function (rule, value, callback) {   //验证密码是否合法
      // let reg = /^[a-zA-Z0-9]{6,17}$/;
      // if (reg.test(value) == true) {
      //   callback();
      // } else {
      //   callback(new Error('(请输入6到17位数字和字母混合)'));
      // }
    };
    return {
      formTab: {
        name: '',
        type: '1'
      },
      checked: false,
      formTabs: {  //验证规则
        name: [
          { message: '请输入手机号', trigger: 'blur' },
          { validator: validatereg, trigger: 'blur' }
        ],
        passwords: [
          { message: '请输入密码', trigger: 'blur' },
          // { validator: validatePassReg, trigger: 'blur' }
        ]
      },
      loginWay: 1,
      content: '发送验证码',  // 按钮里显示的内容
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
  watch: {
    loginWay (val) {
      if (val == 1) {
        if (localStorage.getItem('remindUserInfo')) {
          let userInfo = JSON.parse(localStorage.getItem('remindUserInfo'))
          this.formTab.name = userInfo.name
          this.formTab.passwords = userInfo.password
        }
      }
    }
  },
  methods: {
    sendCode () {
      if (!this.formTab.name) {
        return this.$message.warning('手机号不能为空')
      }
      this.countDown()
      getCode({ mobile: this.formTab.name }).then(res => {
        this.token = res.data.token
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
          this.totalTime = 10
          this.canClick = true  // 这里重新开启
        }
      }, 1000)
    },
    switchLogin (index) {
      this.loginWay = index
      this.formTab = {
        name: '',
        type: index
      }
    },
    remind (val) {
      if (val) {
        let params = {
          name: this.formTab.name,
          password: this.formTab.passwords
        }
        localStorage.setItem('remindUserInfo', JSON.stringify(params))
      }
      else {
        localStorage.removeItem('remindUserInfo')
      }
    },
    onSubmit () {
      if (this.loginWay == 2) {
        this.formTab.token = this.token
      }
      this.$refs['TabForm'].validate((valid) => {
        if (valid) {
          goLogin(this.formTab).then(res => {
            localStorage.setItem('userType', res.data.type)
            let registerType = res.data.type
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('uid', res.data.uid)
            localStorage.setItem('userName', res.data.username)
            localStorage.setItem('departName', res.data.departName)
            localStorage.setItem('teamType', res.data.team_type)
            // 登录人身份
            sessionStorage.setItem('userPosition', res.data.gradeNum)
            localStorage.setItem('userPosition', res.data.gradeNum)
            if (res.data.type == 1) {
              this.$router.push('createOrderTaking')
            }
            else {
              this.$router.push('teamData')
            }
          }).catch(error => {
            if (error.status.code == 3010) {
              this.isShowError = true
              this.dialogVisible = false
              this.isCodeError = false
            }
            else if (error.status.code == 1008) {
              this.dialogVisible = true
              this.isShowError = false
            }
            else if (error.status.code == 3008) {
              this.isCodeError = true
              this.isShowError = false
              this.dialogVisible = false
            }
            else {
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

<style lang="scss">
.header {
  width:100%;
  height:49px;
  background:rgba(50,55,62,1);
  color:#fff;
  font-size:14px;
}
.head-left {
  line-height: 30px;
}
.header span{
  font-weight:bold;
  color:#1890FF;
  margin-right:30px;
}
.header .welcome {
  font-size: 18px;
}
.header .header-left {
  font-size:26px;
}
.register-view{
  width: 100vw;
  height: 100vh;
  overflow: hidden; 
}
.loads .el-main {
  padding:0;
  overflow:hidden;
}
.loads .login-main {
  height: 100vh;
}
.loads .el-form-item {
  margin-bottom:6px;
}
.x-flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.register-btn {
  margin:20px 70px;
  color:rgba(153,153,153,1);
  >.el-button {
    font-size:18px;
  }
}
.register-btn  .button{
   margin-right:10px;
}
.register-btn .active {
  color:#6A6A6A;
}
.x-flex  .com-right {
  border:1px solid #1890FF;
  color:#1890FF;
  border-radius:0;
}
.register-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  width:110%;
  /* overflow:hidden; */
  background: url('../assets/img/re-bg.png') no-repeat left center;
  background-size:cover;
}
.form-box {
  width:80%;
  margin:0 auto;
  overflow: hidden;
}
.register-box{
  width: 536px;
  /* height:420px; */
  padding-bottom: 30px;
  background:rgba(255,255,255,1);
  box-shadow:0px 5px 18px 0px rgba(0, 0, 0, 0.15);
  border-radius:5px;
  margin-left:-8%;
}
.register-box .el-input__inner {
  border-radius:3px;
  background:#eee;
  border:none;
}
.register-box .el-input-group__prepend {
  border:none;
  background:#eee;
  padding: 0 0 0 20px ;
}
.register-box .error {
  position:absolute;
  top:16%;
  right:0;
  color:#FE2A00;
  font-size:12px;
}
.register-box .errorInfo {
    right:0;
    width:100%;
    height:20px;
    top:-16px;
    text-align:center;
    line-height:20px;
    background:rgba(254,42,0,0.1);
    border-radius:3px;
 }
.register-box .el-input-group__prepend span {
   opacity:1;
   display:inline-block;
}
.register-box .inputCode {
  width: 70%!important;
  margin-right:10px;
  display:block;
}
.register-box .code-btn {
  width: 130px!important;
  position:absolute;
  bottom:0;
  right:0;
  border-radius:0;
}
.register-box .disabled {
  background:rgba(204,204,204,1);
  border:none;
}
.register-box .password {
  text-align:right;
  color:#6A6A6A;
  font-size:14px;
}
.register-box .el-button--primary{
  width: 100%;
}
.texts{
  text-align: center;
}
.passwords{
  text-align: right;
}
.submit-btn{
  margin-top: 10px;
}
.login{
  background:linear-gradient(180deg,rgba(24,144,255,1),rgba(89,175,255,1));
  border-radius:20px;
  border:none;
}
.register-box .text {
  text-align:right;
  font-size:16px;
  margin-right:30px;
  color:#333333;
  margin-top: 20px;
}
.text  a {
  color:#1890FF;
}
.register-box .loginRight {
  margin-top: 4px;
  margin-left: 4px;
}
</style>
