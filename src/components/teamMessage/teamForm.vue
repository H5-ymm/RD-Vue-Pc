<template>
<div class="teamMessage">
  <div class="title">
    基本信息
  </div>
  <div class="teamMessage-form-row">
  <el-form :model="companyForm" :rules="rules" ref="companyForm" label-width="100px" class="teamMessage-form">
  <el-form-item label="团队名称" prop="companyName">
    <el-input v-model="companyForm.companyName" class="width408" placeholder="请输入团队名称"></el-input>
  </el-form-item>
  <el-form-item label="团队logo" required>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
     >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-circle-plus avatar-uploader-icon"></i>
      <p>上传logo</p>
    </el-upload>
  </el-form-item>
   <el-form-item label="营业执照" required>
    <el-upload
      class="uploader-card avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-circle-plus avatar-uploader-icon"></i>
      <p>上传logo</p>
    </el-upload>
  </el-form-item>
  <el-form-item label="从事行业" prop="com_sort">
    <el-select v-model="companyForm.com_sort" class="width408" placeholder="请选择从事行业">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="企业性质" prop="com_type">
    <el-select v-model="companyForm.com_type" class="width408" placeholder="请选择企业性质">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="企业规模" prop="com_scale">
    <el-select v-model="companyForm.com_scale" class="width408" placeholder="请选择企业规模">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="公司地址" prop="region">
    <el-select v-model="companyForm.region" class="width408" placeholder="请选择公司地址">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
    <el-input v-model="companyForm.address" class="width408 team-address" placeholder="请填写详细地址"></el-input>
  </el-form-item>
   <el-form-item label="公司座机" prop="desc">
    <el-input type="text" class="width408" v-model="companyForm.desc" placeholder="请输入团队介绍"></el-input>
  </el-form-item>
  <el-form-item label="申请人姓名" required>
    <el-input v-model="companyForm.link_man" class="width408" placeholder="请输入申请人姓名"></el-input>
  </el-form-item>
  <el-form-item label="上传身份证" required>
    <div class="uploader-card">
      <el-upload
        class="idCard-uploader-card idCard-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <img v-else src="../../assets/img/team/card.png" alt="" class="card-uploader-icon">
      </el-upload>
      <p class="idcard-text">点击上传带头像一面</p>
    </div>
    <div class="uploader-card">
     <el-upload
        class="idCard-uploader-card idCard-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <img v-else src="../../assets/img/team/card1.png" alt="" class="card-uploader-icon">
      </el-upload>
      <p class="idcard-text">点击上传带国徽的一面</p>
      <ul class="idcard-tip">
        <li>1.上传文件要求为扫描件或清晰照片；</li>
        <li>2.照片要求格式为jpg、jpeg或png。</li>
      </ul>
    </div>
  </el-form-item>
  <el-form-item label="团队简介" prop="content">
    <el-input type="textarea" class="width408" v-model="companyForm.content" placeholder="请输入团队介绍"></el-input>
  </el-form-item>
   <el-form-item label="银行卡号" required>
    <el-input v-model="companyForm.name" class="width408" placeholder="请输入银行卡号"></el-input>
  </el-form-item>
   <el-form-item label="选择银行" prop="region">
    <el-select v-model="companyForm.region" class="width408" placeholder="请选择所属银行">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="手机号码" required prop="link_phone">
    <el-input v-model="companyForm.link_phone" class="width408" placeholder="请输入您的手机号码"></el-input>
  </el-form-item>
  <el-form-item label="短信验证码" required>
    <el-input v-model="companyForm.name"  class="width300" placeholder="请输入您的手机号码"></el-input>
    <el-button type="primary" class="send-code-btn">获取验证码</el-button>
  </el-form-item>
  <el-form-item class="teamMessage-btn">
    <el-button type="primary" @click="submitForm('companyForm')">保存</el-button>
    <el-button @click="resetForm('companyForm')">取消</el-button>
  </el-form-item>
</el-form>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        companyForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        imageUrl:'',
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(){}
    }
  }
</script>
<style lang="scss">
.teamMessage {
  padding-bottom: 80px;
  .title {
      width: 100%;
      height:44px;
      line-height: 44px;
      font-size:14px;
      color: #333;
      padding-left: 15px;
      background:#fff;
      box-shadow:0px 4px 4px 0px rgba(106,106,106,0.1);
      border-radius:5px;
    }
    .teamMessage-form-row {
      background:#fff;
      width: 100%;
      margin:  15px auto;
      padding: 20px 6px;
      border-radius: 10px;
      .teamMessage-form {
        width: 50%;
        margin: 0 auto;
        .width408 {
          width: 408px;
        }
        .el-input__inner {
          height: 38px;
          line-height: 38px;
          border: 1px solid #eee;
          border-radius: 0;
        }
        .team-address {
          margin-top: 5px;
        }
      }
      .avatar-uploader .el-upload {
        background: #eee;
        border-radius: 3px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        color: #999999;
        font-size: 14px;
        width:91px;
        height:91px;
        >p {
          margin-top: -10px;
        }
      }
      .uploader-card {
        display: inline-block;
        margin-right: 20px;
        .idcard-text  {
          color:#6A6A6A;
          text-align: center;
          font-size: 14px;
        }
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
        color: #999999;
        font-size: 42px;
        margin-top: 10px;
      }
      .avatar {
        width:91px;
        height:91px;
        display: block;
      }
    }
    .card-uploader-icon {
      width: 162px;
      height: 128px;
    }
    .idcard-tip {
      position: absolute;
      right: -100px;
      top: 30px;
      font-size: 14px;
      color: #999;
    }
}
</style>
