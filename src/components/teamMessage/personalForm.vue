<style lang="scss">
@import '@/assets/css/formMessage.scss';
</style>
<template>
  <div class="teamMessage">
    <div class="title">基本信息</div>
    <div class="teamMessage-form-row">
      <el-form :model="personalForm" :rules="rules" ref="personalForm" label-width="110px" class="teamMessage-form">
        <el-form-item label="团队名称" prop="team_name">
          <el-input v-model="personalForm.team_name" class="width408" placeholder="请输入团队名称"></el-input>
        </el-form-item>
        <el-form-item label="团队logo" required>
          <el-upload class="avatar-uploader" action="customize" ref="upload" :show-file-list="false" :http-request="upload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-circle-plus avatar-uploader-icon"></i>
            <p>上传logo</p>
          </el-upload>
        </el-form-item>
        <el-form-item label="申请人姓名" required>
          <el-input v-model="personalForm.user_name" class="width408" placeholder="请输入申请人姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证" required prop="id_card">
          <el-input v-model="personalForm.id_card" class="width408" placeholder="请输入身份证"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="delivery">
          <el-radio-group class="width408" v-model="personalForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" require>
          <el-input v-model="personalForm.age" class="width408" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select v-model="personalForm.education" class="width408" placeholder="请选择学历">
            <el-option :label="item" :value="index" v-for="(item,index) in edu_type" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="region">
          <div class="width408">
            <districtSelet @change="change" :address="address"></districtSelet>
          </div>
        </el-form-item>
        <el-form-item label="团队简介" prop="introduction">
          <el-input type="textarea" class="width408" :autosize="{minRows: 5}" v-model="personalForm.introduction" placeholder="请输入团队介绍"></el-input>
        </el-form-item>
        <el-form-item class="teamMessage-btn">
          <el-button type="primary" @click="submitForm('personalForm')">保存</el-button>
          <el-button @click="resetForm('personalForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getConstant } from '@/api/dictionary'
import districtSelet from '../districtSelet'
import { getImg, getImgUrl, validateIdCard } from '@/util/util'
import { updateTeamInfo, getTeamInfo } from '@/api/team'
import { uploadFile } from '@/api/upload'
export default {
  components: {
    districtSelet
  },
  data () {
    var validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号码'));
      } else {
        if (!validateIdCard(value)) {
          callback(new Error('请输入正确的身份证号码'));
        }
        callback()
      }
    };
    return {
      personalForm: {
        type: 2,
        id: ''
      },
      imageUrl: '',
      rules: {
        team_name: [
          { message: '请输入团队名称', trigger: 'blur' }
        ],
        id_card: [
          { message: '请输入身份证号码', trigger: 'blur' },
          { validator: validate, trigger: 'blur' }
        ]
      },
      edu_type: [],
      uid: localStorage.getItem('uid'),
      address: []
    };
  },
  created () {
    this.personalForm.id = this.$route.query.teamId
    let params = 'edu_type'
    this.getList(params)
    if (this.personalForm.id) {
      this.getInfo(this.personalForm.id)
    }
  },
  methods: {
    getInfo (uid) {
      getTeamInfo({ uid }).then(res => {
        if (res.data) {
          this.personalForm = res.data || {}
          if (this.personalForm.log) {
            this.imageUrl = getImgUrl(this.personalForm.log)
          }
          this.personalForm.type = this.$route.query.type
          this.address.push(this.personalForm.provinceid, this.personalForm.cityid, this.personalForm.three_cityid)
        }
      })
    },
    getList (filed) {
      getConstant({ filed }).then(res => {
        this.edu_type = res.data.edu_type
      })
    },
    upload (params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("请上传2M以下的.xlsx文件");
        return false;
      }
      uploadFile(_file).then(res => {
        this.imageUrl = getImg(_file)
        this.personalForm.log = res.data.url
      })
    },
    change (val) {
      this.personalForm.provinceid = val[0]
      this.personalForm.cityid = val[1]
      this.personalForm.three_cityid = val[2]
    },
    submitForm (personalForm) {
      this.$refs[personalForm].validate((valid) => {
        if (valid) {
          updateTeamInfo(this.personalForm).then(res => {
            if (res.status.code == 200) {
              this.$router.push('userlist')
            }
          }).catch(error => {
            this.$message.error(error.status.remind)
          })
        } else {
          return false
        }
      });
    },
    resetForm () {
      this.getInfo(this.personalForm.id)
    }
  }
}
</script>
