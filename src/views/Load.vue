<template>
    <el-container class="loads">
        <el-header class="header x-flex-around">
            <div class="bg-purple">
              <span class="header-left">人事达</span>
              <a class="welcome">欢迎注册</a>
            </div>
            <div class="bg-purple-light">
              <span>浏览首页</span>
              <a>021-51991869</a>
            </div>
        </el-header>
        <el-main>   
         <div class="content" :class="{'timerContent':registerType==2}">
              <el-row class="loads-box">
                <el-col :span="12">
                  <el-form ref="TabForm" :model="formTab" label-width="20" :rules="formTabs" class="form-box">
                    <div class="x-flex login-btn">
                        <el-button class="button" :class="registerType==1?'comRight':'timm-right'" @click="goRegister(1)">注册企业</el-button>
                        <el-button class="button" :class="registerType==2?'comRight':'timm-right'" @click="goRegister(2)">注册团队</el-button>
                    </div>
                    <el-form-item prop="mobile" label="手机号">
                        <el-input v-model="formTab.mobile" placeholder="请输入手机号"></el-input>
                        <span class="error el-icon-warning">请输入手机号</span>
                    </el-form-item>
                    <el-form-item prop="password" label="密码">
                        <span class="error  el-icon-warning passwordSave">请输入密码</span>
                        <el-progress :percentage="40" :format="format" class="error progress" v-if="formTab.password.length<5"></el-progress>
                        <el-progress :percentage="70" :format="format" class="error progress" status="warning" v-else-if="formTab.password.length>5&&formTab.passwords.length<12"></el-progress>
                        <el-progress :percentage="100" :format="format" class="error progress" status="success"  v-else></el-progress>
                        <el-input  v-model="formTab.password" placeholder="请输入密码"  show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item prop="passworded" label="确认密码">
                        <span class="error el-icon-warning">两次输入的密码不一致</span>
                        <el-input  v-model="formTab.passworded" placeholder="请输入密码"  show-word-limit></el-input>
                    </el-form-item>
                     <el-form-item label="发送验证码">
                        <el-input  v-model="formTab.code" placeholder="请输入密码" class="inputCode" show-word-limit></el-input>
                        <el-button type="primary" class="code-btn" plain>发送验证码</el-button>
                    </el-form-item>
                    <el-form-item prop="name" :label="registerType==1?'公司名称':'团队名称'">
                        <span class="error el-icon-warning">请输入{{registerType==1?'公司名称':'团队名称'}}</span>
                        <span class="error error1 el-icon-warning">该{{registerType==1?'公司名称':'团队名称'}}已被注册，请使用其他{{registerType==1?'公司名称':'团队名称'}}注册</span>
                        <el-input  v-model="formTab.name" placeholder="请输入您要创建的团队名称"  show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item :label="registerType==1?'公司地址':'团队地址'">
                        <el-cascader
                          class="city-cascader"
                          v-model="value"
                          :options="proviceList"
                          @change="handleChange">
                          <template slot-scope="{ node, data }">
                            <span>{{ data.province }}</span>
                          </template>
                        </el-cascader>
                        <span class="error el-icon-warning">请选择{{registerType==1?'公司地址':'团队地址'}}</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('TabForm')" class="register">注册</el-button>
                    </el-form-item>
                    <p class="text">点击注册即表示同意 <a>用户协议及隐私保护规则</a></p>
                </el-form>    
                </el-col>
                <el-col :span="12">
                    <div class="grid-content x-flex">
                      <img src="../assets/img/rightBg.png" v-if="registerType==1">
                      <img src="../assets/img/timerBg.png" v-if="registerType==2">
                      <p class="text">已有账户，<a>直接登录</a></p>
                    </div>
               </el-col>
            </el-row>
        </div>
    </el-main>
  </el-container>
</template>

<script>
import { userRegister, getCode, getProvincesList } from '../api/login'
export default {
    data(){
        let validatereg=function(rule, value, callback){   //验证用户名是否合法
          let reg=/^[a-zA-Z][a-zA-Z0-9]{3,15}$/;  
            if(reg.test(value)==true){  
              callback()        
            } else{
              callback(new Error('用户名不合法(请输入数字或字母,必须以字母开头)'));
            }                
        };
         let validatePassReg=function(rule, value, callback){   //验证密码是否合法
            let reg=/^[a-zA-Z][a-zA-Z0-9]{6,30}$/;  
            if (reg.test(value)==true){
                callback();                 
            } else{
              callback(new Error('密码不合法(请输入数字或字母)'));
            }
        }
        return {
            formTab:{
              mobile:'',
              password:'',
              passworded: '',
              name: '',
              code: '',
              type: 1,
              province: '',
              city: '',
              area: ''
            },
            formTabTsxt:{
              name:'test',
              passwords:'test1234',
              checked:false
            },
            formTabs:{  //验证规则
                name:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: validatereg, trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' },
                    { validator: validatePassReg, trigger: 'blur' }
                ]
            },
            registerType:1,
            value: [],
            options: [],
            proviceList: []
      }    
    },
    methods:{
      handleChange(value) {
        console.log(value);
      },
      format(percentage) {
        return percentage === 100 ? '强度：高' :  percentage === 700 ? '强度：中' : '强度：低';
      },
      goRegister(index) {
        this.registerType = index
      },
      onSubmit:function(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$http({
                    method:'POST',
                    url: 'loadUser',
                    data:this.formTab
                }).then((res)=>{
                    //console.log(res)
                    if(res.data.code==0){   
                            if(this.formTab.checked){
                                window.localStorage.setItem('token',res.data.data)
                            }else{
                                window.sessionStorage.setItem('token',res.data.data)
                            }
                        this.formTab.name=''
                        this.formTab.passwords=''
                        this.formTab.checked=false
                        // this.$store.commit('addtoken',res.data.date)
                        // this.$router.push('/')
                        this.onLoading()
                      
                    }else{
                          this.$message({
                            showClose: true,
                            message: '用户名或密码错误',
                            type: 'warning'
                        });
                        // this.formTab.name=''
                        this.formTab.passwords=''
                    }
                })
            } else {
                // console.log('error submit!!');
                return false;
            }
        });
    },
    onTest:function(){   //测试登陆
            this.$http({
                    method:'POST',
                    url: 'loadUser',
                    data:this.formTabTsxt
                }).then((res)=>{
                    //console.log(res)
                    if(res.data.code==0){   
                            if(this.formTabTsxt.checked){
                                window.localStorage.setItem('token',res.data.data)
                            }else{
                                window.sessionStorage.setItem('token',res.data.data)
                            }
                        
                        // this.$store.commit('addtoken',res.data.date)
                        // this.$router.push('/')
                        this.onLoading()
                      
                    }else{
                          this.$message({
                            showClose: true,
                            message: '用户名或密码错误',
                            type: 'warning'
                        });
                        // this.formTab.name=''
                        this.formTab.passwords=''
                    }
                })
    },
    onLoading:function(){
            let token=null
                  if(window.localStorage.getItem('token')){
                        token=window.localStorage.getItem('token')
                    }else if(window.sessionStorage.getItem('token')){
                        token=window.sessionStorage.getItem('token')
                    }else{
                        token=null
                    }
                // console.log(token)

                    if(token){
                        this.$http({
                            url:'rulesToken',
                            methos: 'GET',
                            headers:{
                                'Authorization':token
                            }
                            }).then(res=>{
                            
                                if(res.data.code==0){
                                    this.$message({
                                            showClose: true,
                                            message: '登陆成功',
                                            type: 'success'
                                        });
                                    this.$store.commit('adduser',res.data.msg)
                                    this.$router.push('/')

                                }else{
                                    this.$message({
                                            showClose: true,
                                            message: '登陆失败',
                                            type: 'success'
                                        });
                                    window.localStorage.clear()
                                    window.sessionStorage.clear()
                                }
                            }).catch(error=>{
                                  //   this.$message.error('Token过期，请重新登陆');
                                /// this.$router.push('/load')
                                window.localStorage.clear()
                                window.sessionStorage.clear()
                            })
                    }
        },
        onForget(){
          this.$router.push('/register')
        },
        getPro() {
          getProvincesList().then(res=>{
            console.log(res.data)
            this.proviceList = res.data
          })
        }
    },
    components:{

    },
    created:function(){  //验证Token   
      this.getPro()
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
  height: 100vh;
  overflow: hidden; 
}
.loads .el-main {
  padding:0;
  overflow:hidden;
}
.loads .el-form-item {
  margin-bottom:15px;
}
.loads .city-cascader {
  display:block;
}
.x-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-btn {
  margin-bottom:10px;
}
.loads .error {
  position:absolute;
  top:23%;
  right:0;
  color:#FE2A00;
  font-size:12px;
}
.loads .error1 {
  top:60%;
  z-index:2322;
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
  overflow:hidden;
  background: url('../assets/img/bg.png') no-repeat left center;
  background-size:cover;
}
.timerContent {
  background: url('../assets/img/timerBg.png') no-repeat left center;
  background-size:cover;
}
.form-box {
  width:90%;
}
.loads-box{
  width: 60%;
  height: 86%;
  background:rgba(255,255,255,1);
  box-shadow:0px 5px 18px 0px rgba(0, 0, 0, 0.15);
  border-radius:5px;
  margin-left:-5%;
}
.loads-box .el-input__inner {
  border-radius:0;
  border:1px solid rgba(238,238,238,1);
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
  height:100%;
  flex-wrap:wrap;
}
.form-box .text {
  text-align:left;
  font-size:12px;
}
.grid-content .text {
  text-align:right;
  width:100%;
  font-size:12px;
}
.grid-content img {
  max-width: 302px;
  margin: 30% auto -30px;
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
}
</style>
