<template>
  <div class="job-detail-view">
    <div class="job-detail-row">
      <section class="resume-col3">
        <el-form :model="formMember" :rules="rules" ref="formMember" class="demo-form-inline" label-position="right" label-width="114px" :inline="true">
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/receipt/icon1.png" />
              <span>基本信息</span>
            </p>
            <div class="x-flex-between-start resume-card-row">
              <div class="resume-card-item">
                <el-form-item label="岗位名称" prop="job_name">
                  <el-input v-model="formMember.job_name" placeholder="请输入岗位名称" class="width406"></el-input>
                </el-form-item>
                <el-form-item label="招聘人数" prop="number">
                  <el-input v-model="formMember.number" placeholder="请输入招聘人数" class="width406"></el-input>
                </el-form-item>
                <el-form-item label="团队logo">
                  <el-upload class="avatar-uploader" action="customize" ref="upload" :show-file-list="false" :http-request="upload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-circle-plus avatar-uploader-icon"></i>
                    <p>上传企业logo</p>
                  </el-upload>
                </el-form-item>
              </div>
              <div class="resume-card-item">
                <el-form-item label="用工企业名称" prop="company_name">
                  <el-input v-model="formMember.company_name" class="width406" placeholder="请输入用工企业名称"></el-input>
                </el-form-item>
                <el-form-item label="招工截止日期">
                  <el-date-picker class="width406" format="yyyy-MM-dd" value-format="timestamp" v-model="offtime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </div>
            </div>
          </section>
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/receipt/icon2.png" />
              <span>薪资说明</span>
            </p>
            <div class="x-flex-between-start resume-card-row">
              <div class="resume-card-item">
                <moneyType @submit="submit"></moneyType>
                <el-form-item label="福利说明">
                  <el-input v-model="formMember.welfare_statement" type="textarea" class="width406" :autosize="{ maxRows: 3}" placeholder="请输入福利说明"></el-input>
                </el-form-item>
              </div>
            </div>
          </section>
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/receipt/icon3.png" />
              <span>岗位说明</span>
            </p>
            <div class="x-flex-between-start resume-card-row">
              <div class="resume-card-item">
                <el-form-item label="工作地址">
                  <div class="width406">
                    <districtSelet @change="change" :disabled="true" placeholder="请选择省市区" :address="address"></districtSelet>
                  </div>
                  <!-- <el-input v-model="formMember.address" class="width406" placeholder="请输入工作地址"></el-input> -->
                </el-form-item>
                <el-form-item label="入职条件">
                  <el-input v-model="formMember.entry_requirements" class="width406" placeholder="请输入入职条件"></el-input>
                </el-form-item>
                <el-form-item label="工作内容">
                  <el-input v-model="formMember.job_description" type="textarea" class="width406" :autosize="{ maxRows: 3}" placeholder="请输入工作内容"></el-input>
                </el-form-item>
              </div>
              <div class="resume-card-item">
                <el-form-item label="工作时长">
                  <el-input v-model="formMember.working_hours" class="width406" placeholder="请输入工作时长"></el-input>
                </el-form-item>
              </div>
            </div>
          </section>
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/receipt/icon4.png" />
              <span>其他说明</span>
            </p>
            <div class="x-flex-between-start resume-card-row">
              <div class="resume-card-item">
                <el-form-item label="性别要求">
                  <el-select v-model="formMember.sex" class="width406" placeholder="请选择">
                    <el-option :label="item.label" :value="item.value" v-for="item in sexList" :key="item.label"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="缴纳五险">
                  <el-radio-group v-model="formMember.is_five_risks" class="width406">
                    <el-radio :label="2">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="3">试用期后</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="企业介绍">
                  <el-input v-model="formMember.com_introduction" type="textarea" class="width406" :autosize="{ maxRows: 3}" placeholder="请输入企业介绍"></el-input>
                </el-form-item>
              </div>
              <div class="resume-card-item">
                <el-form-item label="年龄要求">
                  <div class="x-flex-start-justify">
                    <el-select v-model="formMember.age_min" class="width180" placeholder="请选择">
                      <el-option :label="item" :value="item" v-for="item in ageList" :key="item"></el-option>
                    </el-select>
                    <span class="line">-</span>
                    <el-select v-model="formMember.age_max" class="width180" placeholder="请选择">
                      <el-option :label="item" :value="item" v-for="item in ageList" :key="item"></el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item label="缴纳公积金">
                  <el-radio-group v-model="formMember.is_fund" class="width406">
                    <el-radio :label="2">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="3">试用期后</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
          </section>
        </el-form>
      </section>
    </div>
    <div class="resume-footer-btn">
      <el-button type="primary" @click="submitForm">下一步</el-button>
    </div>
  </div>
</template>
<script>

import { getConstant } from '@/api/dictionary'
import districtSelet from '../districtSelet'
import { selectUserResumeInfo } from '@/api/resume'
import { getImg } from '@/util/util'
import { moneyTypeList } from '@/base/base'
import { uploadFile } from '@/api/upload'
import moneyType from './moneyType'
export default {
  components: {
    districtSelet,
    moneyType
  },
  props: ['formJob'],
  data () {
    return {
      formMember: {
        address: '',
        com_introduction: "",
        company_logo: "",
        company_name: "",
        entry_requirements: "",
        is_up: 1,
        job_description: "",
        job_name: '',
        number: 1,
        offermoney: '',
        offermoney_type: 1,
        offtime: '',
        sex: 0,
        uid: '',
        welfare_statement: '',
        working_hours: '',
        is_five_risks: 2,
        is_fund: 2,
        age_min: 16,
        age_max: 65,
        uid: localStorage.getItem('uid'),
      },
      address: [],
      rules: {
        job_name: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
        ],
        company_name: [
          { required: true, message: '请输入用工企业名称', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入招聘人数', trigger: 'blur' }
        ],
        offermoney_type: [
          { required: true, message: '请选择薪资类型', trigger: 'change' }
        ]
      },
      edu_type: [],
      jobList: [],
      ageList: [],
      moneyTypeList,
      moneyArray: {},
      imageUrl: '',
      sexList: [
        {
          label: '男', value: 1
        },
        {
          label: '女', value: 2
        },
        {
          label: '男女不限', value: 0
        }
      ],
      offtime: ''
    }
  },
  watch: {
    formJob (val) {
      if (val) {
        for (let key in this.formMember) {
          this.formMember[key] = val[key]
        }
      }
    }
  },
  created () {
    let params = 'edu_type,money_array'
    for (let i = 16; i < 46; i++) {
      this.ageList.push(i)
    }
    this.getList(params)
  },
  methods: {
    getInfo () {
      let params = {
        uid: localStorage.getItem('uid'),
        resumeId: this.resumeId
      }
      selectUserResumeInfo(params).then(res => {
        this.formMember = res.data
        this.entryTime[0] = res.data.entry_begintime
        this.entryTime[1] = res.data.entry_endtime
        if (this.formMember.provinceid) {
          this.address = [this.formMember.provinceid, this.formMember.provinceid.cityid]
        }
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
        this.formMember.company_logo = res.data.url
      })
    },
    getList (filed) {
      getConstant({ filed }).then(res => {
        this.edu_type = res.data.edu_type
        this.moneyArray = res.data.money_array
      })
    },
    changeDate (val) {
      this.formMember.entry_begintime = val ? val[0] : ''
      this.formMember.entry_endtime = val ? val[1] : ''
    },
    change (val) {
      this.formMember.provinceid = val[0]
      this.formMember.cityid = val[1]
    },
    submit (val) {
      this.formMember = Object.assign(this.formMember, val)
    },
    handleClose () {
      this.$parent.dialogTableVisible = false
    },
    submitForm () {
      this.$refs['formMember'].validate((valid) => {
        if (valid) {
          if (this.formMember.offermoney_type
            && !this.formMember.offermoney) {
            return this.$message.warning('请选择薪资')
          }
          if (this.formMember.age_max < this.formMember.age_min) {
            return this.$message.warning('最大年龄应该大于最小年龄')
          }
          if (this.offtime) {
            let offtime = this.offtime + ''
            this.formMember.offtime = offtime.slice(0, 10)
          }
          if (!this.formMember.provinceid) {
            this.formMember.provinceid = 0
            this.formMember.cityid = 0
          }
          this.$emit('submitForm', this.formMember)
        }
        else {
          console.log(1)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.job-detail-view{
  border-radius:10px;
  background: #fff;
  .job-detail-row {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #333333;
    padding: 0 0 10px;
    .el-form-item{
      display: block;
      margin-bottom: 22px;
    }
    .width406 {
      width: 406px;
    }
    .width180{
      width: 180px;
    }
    .line {
      margin: 0 10px;
      color: #BEBEBE;
    }
    .resume-col3 {
      width: 100%;
      // border-top: 1px solid #eee;
      padding-top: 10px;
      margin: 0 auto;
      .demo-form-inline {
        width: 100%;
        margin: 10px auto;
        padding: 0 16px;
        .el-form-item {
          margin-bottom: 10px;
        }
        .el-input__inner{
          height:38px;
          line-height:38px;
          border-radius:3px;
        }
        .el-textarea {
          border-radius:3px;      
          textarea {
            height: 100px!important;
          }
        }
      }
    }
  }
  .resume-card {  
    .resume-main-title {
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      >img {
        width: 20px;
        margin-right: 10px;
      }
    }
    .resume-card-row {
      margin: 20px 0 0 -15px;
       .resume-card-item {
        width: 50%;
        text-align: left;
        &:nth-child(2) {
          .el-form-item {
            margin-right:0;
          }
        } 
      }
      .el-form-item__error{
        top:-50%;
      }
    }  
  }
  .resume-footer-btn {
    margin-left: 114px;
    padding-bottom: 32px;
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