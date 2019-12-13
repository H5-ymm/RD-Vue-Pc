<template>
  <el-container class="loads login-page">
    <el-header class="header x-flex-around">
      <div class="bg-purple head-left">
        <span class="header-left">人事达</span>
        <a class="welcome">欢迎注册</a>
      </div>
      <div class="bg-purple-light">
        <span @click="$router.push('home')">浏览首页</span>
        <a>021-51991869</a>
      </div>
    </el-header>
    <el-main>
      <div class="content register-form" :class="{'timerContent':registerType==2}">
        <el-row class="loads-box">
          <el-col :span="12">
            <el-form
              :model="formTab"
              label-width="20"
              ref="TabForm"
              :rules="formTabs"
              class="register-form-box"
            >
              <div class="x-flex login-btn">
                <el-button
                  class="button"
                  :class="registerType==1?'comRight':'timm-right'"
                  @click="goRegister(1)"
                >注册企业</el-button>
                <el-button
                  class="button"
                  :class="registerType==2?'comRight':'timm-right'"
                  @click="goRegister(2)"
                >注册团队</el-button>
              </div>
              <el-form-item prop="mobile" label="手机号">
                <el-input v-model="formTab.mobile" placeholder="请输入手机号"></el-input>
                <span class="error el-icon-warning" v-if="isShowPhone">请输入手机号</span>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <span class="error el-icon-warning passwordSave" v-if="isShowPasword">请输入密码</span>
                <el-progress
                  :percentage="40"
                  :format="format"
                  class="error progress"
                  color="#FE2A00"
                  v-if="formTab.password.length&&formTab.password.length<=6"
                ></el-progress>
                <el-progress
                  :percentage="70"
                  :format="format"
                  class="error progress"
                  color="#FF9938"
                  v-if="formTab.password.length>6&&formTab.password.length<=10"
                ></el-progress>
                <el-progress
                  :percentage="100"
                  :format="format"
                  class="error progress"
                  color="#58B44E"
                  v-if="formTab.password.length>10"
                ></el-progress>
                <el-input v-model="formTab.password" placeholder="请输入密码" show-word-limit></el-input>
              </el-form-item>
              <el-form-item prop="passworded" label="确认密码">
                <span class="error el-icon-warning" v-if="isShowPas">两次输入的密码不一致</span>
                <el-input v-model="formTab.passworded" placeholder="请输入密码" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="发送验证码">
                <el-input
                  v-model="formTab.code"
                  placeholder="请输入密码"
                  class="inputCode"
                  show-word-limit
                ></el-input>
                <el-button type="primary" class="code-btn" @click="sendCode" plain>{{content}}</el-button>
              </el-form-item>
              <el-form-item prop="name" :label="registerType==1?'公司名称':'团队名称'">
                <span
                  class="error el-icon-warning"
                  v-if="isShowName"
                >请输入{{registerType==1?'公司名称':'团队名称'}}</span>
                <span
                  class="error error1 el-icon-warning"
                  v-if="isShowRe"
                >该{{registerType==1?'公司名称':'团队名称'}}已被注册，请使用其他{{registerType==1?'公司名称':'团队名称'}}注册</span>
                <el-input v-model="formTab.name" placeholder="请输入您要创建的团队名称" show-word-limit></el-input>
              </el-form-item>
              <el-form-item :label="registerType==1?'公司地址':'团队地址'">
                <districtSelet @change="districtChange"></districtSelet>
                <span
                  class="error el-icon-warning"
                  v-if="isShowCom"
                >请选择{{registerType==1?'公司地址':'团队地址'}}</span>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit('TabForm')" class="register">注册</el-button>
              </el-form-item>
              <p class="text">
                点击注册即表示同意
                <a>用户协议及隐私保护规则</a>
              </p>
            </el-form>
          </el-col>
          <el-col :span="12">
            <div class="grid-content x-flex register-grid-content" ref="bg">
              <img src="../assets/img/rightBg.png" v-if="registerType==1" />
              <img src="../assets/img/timerBg.png" v-if="registerType==2" />
              <p class="text">
                已有账户，
                <a>直接登录</a>
                <img src="../assets/img/loginRight.png" alt class="loginRight" />
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { userRegister, getCode } from '../api/login'
import districtSelet from '../components/districtSelet'
export default {
  components: {
    districtSelet
  },
  data () {
    let validatereg = (rule, value, callback) => {   //验证用户名是否合法
      let reg = /^1[3456789]\d{9}$/;
      if (value === '') {
        this.isShowPhone = true
        callback();
      }
      else if (!(reg.test(value))) {
        this.isShowPhone = false
        callback(new Error('手机号格式不正确'));
      } else {
        this.isShowPhone = false
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        this.isShowPasword = true
        callback();
      } else {
        if (this.formTab.password !== '') {
          this.$refs.TabForm.validateField('passworded')
        }
        let reg = /^[a-zA-Z][a-zA-Z0-9]{6,16}$/;
        if (!reg.test(value)) {
          callback();
        } else {
          callback(new Error('密码不合法(请输入数字或字母)'));
        }
        this.isShowPasword = false
        callback();
      }
    };
    let validatePassReg = (rule, value, callback) => {   //验证密码是否合法
      if (value == this.formTab.password) {
        this.isShowPas = false
        callback();
      } else {
        this.isShowPas = true
        callback();
      }
    }
    return {
      formTab: {
        mobile: '',
        password: '',
        passworded: '',
        name: '',
        code: '',
        type: 1,
        province: '',
        city: '',
        area: ''
      },
      isShowPhone: false,
      isShowPasword: false,
      isShowPas: false,
      isShowName: false,
      isShowRe: false,
      isShowCom: false,
      formTabTsxt: {
        name: 'test',
        passwords: 'test1234',
        checked: false
      },
      formTabs: {  //验证规则
        mobile: [
          { validator: validatereg, trigger: 'blur' }
        ],
        password: [
          // { message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        passworded: [
          { message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePassReg, trigger: 'blur' }
        ]
      },
      registerType: 1,
      value: [],
      options: [],
      proviceList: [],
      props: {},
      departmentOptions: [],
      cascaderData: [],
      selectedOptions: [],
      content: '发送验证码',  // 按钮里显示的内容
      totalTime: 60,
      timer: null,
      canClick: true
    }
  },
  methods: {
    districtChange (val) {
      console.log(val)
      this.formTab.province = val[0]
      this.formTab.city = val[1]
      this.formTab.area = val[2]
    },
    handleChange (value) {
      console.log(value);
    },
    handleExpand (value) {
      console.log(value)
    },
    format (percentage) {
      return percentage === 100 ? '强度：高' : percentage === 70 ? '强度：中' : '强度：低';
    },
    goRegister (index) {
      this.registerType = index
    },
    sendCode () {
      if (!this.formTab.mobile) {
        return this.$message.warning('手机号不能为空')
      }
      this.countDown()
      getCode({ mobile: this.formTab.mobile }).then(res => {
        console.log(res)
      })
    },
    countDown () {
      if (!this.canClick) return  //改动的是这两行代码
      this.canClick = false
      this.content = this.totalTime + 's后重发'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重发'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 10
          this.canClick = true  //这里重新开启
        }
      }, 1000)
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formTab.province == '') {
            this.isShowCom = true
            return
          }
          userRegister(this.formTab).then(res => {
          }).catch(error => {
            this.$message.error(error.status.remind)
          })
        } else {
          this.isShowCom = false
          return false;
        }
      })
    },
    onForget () {
      this.$router.push('/register')
    }
  },
  created () {  //验证Token   
    // this.getPro()
  }
}
</script>

<style >
.header {
  width:100%;
  height:49px;
  background:rgba(50,55,62,1);
  color:#fff;
  font-size:14px;
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
.loads{
  width: 100vw;
  /* height: 100vh; */
  /* overflow: hidden;  */
}
.login-page {
  height: 100%;
}
.loads .el-main {
  padding:0;
  /* overflow:hidden; */
  overflow-x: hidden;
  overflow-y: auto;
}

.loads .el-form-item {
  margin-bottom:6px;
}
.loads .city-cascader {
  display:block;
}
.x-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.x-flex-start-justify{
  display: flex;
  justify-content:flex-start;
  align-items: center;
}
.loads .error {
  position:absolute;
  top:18%;
  right:0;
  color:#FE2A00;
  font-size:12px;
  transition: 3s;
}
.loads .error1 {
  top:60%;
  z-index:23;
}
.loads .passwordSave {
  right:30%;
}
.loads .progress {
  width:100px;
  margin-right:-50px;
}
.loads .el-progress__text {
  font-size:10px;
  position:absolute;
  top:-15px;
  left:-16px;
  transform:scale(0.8); 
}
.login-btn  .button {
  padding:8px 30px;
  margin-bottom: 30px; 
}
.x-flex  .comRight {
  border:1px solid #1890FF;
  color:#1890FF;
  border-radius:0;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  width:110%;
  /* overflow:hidden; 
  padding: 40px 0;*/
  background: url('../assets/img/bg.png') no-repeat left center;
  background-size:cover;
}
.register-form {
  /* padding: 0 0 40px; */
  /* padding: 40px 0; */
}
.timerContent {
  background: url('../assets/img/comBg.jpg') no-repeat left center;
  background-size:cover;
}
.register-form-box {
  width:90%;
  padding: 40px 0;
  height: 630px;
}
.loads-box{
  width: 60%;
  /* height: 86%; */
  background:rgba(255,255,255,1);
  box-shadow:0px 5px 18px 0px rgba(0, 0, 0, 0.15);
  border-radius:5px;
  /* margin-left:-5%; */
  margin: 40px 0 40px -5%;
}
.loads-box .el-input__inner {
  border-radius:0;
  border:1px solid rgba(238,238,238,1);
}
.el-input__inner:focus {
  border:1px solid #1890FF;
}
.loads-box .inputCode {
  width: 68%!important;
  margin-right:10px;
  display:block;
}
.loads-box .code-btn {
  width: 110px!important;
  position:absolute;
  bottom:0;
  right:0;
  border-radius:0;
  padding: 12px 0;
}
.loads-box .el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height:100%;
}
.grid-content {
  background:rgba(248,248,248,1);
  border-radius:0px 5px 5px 0px;
  width:100%;
  flex-wrap:wrap;
}
.register-grid-content {
  height:720px;
}
.register-form-box .text {
  text-align:left;
  font-size:12px;
  margin-top: 16px;
}
.grid-content .text {
  text-align:right;
  width:100%;
  font-size:12px;
  position: absolute;
  bottom: 55px;
  right: 30px
}
.text .loginRight {
  margin-top: 2px;
  margin-left: 5px;
}
.grid-content img {
  max-width: 1200px;
  margin: 0 auto ;
}
.loads-box .el-button--primary{
  width: 100%;
}
.texts{
  text-align: center;
}
.passwords{
  text-align: right;
}
.register{
  background:linear-gradient(180deg,rgba(24,144,255,1),rgba(89,175,255,1));
  border-radius:5px;
  border:none;
  margin: 20px 0 0;
}
</style>
