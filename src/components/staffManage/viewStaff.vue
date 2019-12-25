<style lang="scss">
@import '@/assets/css/modal.scss';
</style>
<template>
  <el-dialog
    width="500px"
    top="8vh"
    :visible="dialogTableVisible"
    class="member-dialog"
    :show-close="false"
  >
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>查看员工</p>
      </section>
      <!-- <div class="job-detail-view"> -->
      <div class="staff-detail-row">
        <section class="resume-col3">
          <el-form
            :model="formMember"
            :rules="rules"
            ref="formMember"
            class="demo-form-inline"
            label-position="right"
            label-width="80px"
          >
            <section class="resume-card">
              <p class="resume-main-title x-flex-start-justify">
                <img src="../../assets/img/icon7.png" />
                <span>基本信息</span>
              </p>
              <div class="resume-card-row">
                <div class="resume-card-item">
                  <div class="x-flex-around">
                    <p>姓名</p>
                    <p>yangmm</p>
                  </div>
                  <div class="x-flex-around">
                    <p>手机号码</p>
                    <p>1546677777</p>
                  </div>
                  <div class="x-flex-around">
                    <p>身份证号</p>
                    <p>412222222222222</p>
                  </div>
                  <div class="x-flex-around">
                    <p>性别</p>
                    <p>nv</p>
                  </div>
                  <div class="x-flex-around">
                    <p>学历</p>
                    <p>高中以下</p>
                  </div>
                  <div class="x-flex-around">
                    <p>详细地址</p>
                    <p>
                      江苏省杭州市
                      <br />贵林小区3栋301室
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section class="resume-card">
              <p class="resume-main-title x-flex-start-justify">
                <img src="../../assets/img/receipt/icon3.png" />
                <span>岗位信息</span>
              </p>
              <div class="resume-card-row">
                <div class="resume-card-item">
                  <div class="x-flex-around">
                    <p>岗位</p>
                    <p class="x-flex-start">服务员</p>
                  </div>
                </div>
              </div>
            </section>
          </el-form>
        </section>
      </div>
      <!-- <div slot="footer" class="resume-footer-btn">
        <el-button @click="handleClose">关闭</el-button>
        <el-button type="primary" @click="submitForm">{{staffId?'确定修改':'确定添加'}}</el-button>
      </div>-->
    </div>
  </el-dialog>
</template>
<script>

import { getConstant } from '@/api/dictionary'
import districtSelet from '../districtSelet'
import { selectUserResumeInfo } from '@/api/resume'
export default {
  props: ['dialogTableVisible', 'staffId'],
  components: {
    districtSelet,
  },
  data () {
    return {
      formMember: {
        is_five_risks: 2,
        is_fund: 2,
        age_min: 16,
        age_max: 45,
        sex: 0,
        name: '',
        mobile: '',
        education: '',
        address: '',
        provinceid: '',
        cityid: '',
        uid: localStorage.getItem('uid'),
      },
      rules: {
        job_name: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
        ],
        number: [
          { required: true, message: '请输入招聘人数', trigger: 'blur' }
        ]
      },
      edu_type: [],
      ageList: [],
      job_array: {}
    }
  },
  created () {
    let params = 'edu_type,job_array'
    for (let i = 16; i < 46; i++) {
      this.ageList.push(i)
    }
    this.getList(params)
  },
  methods: {
    getInfo () {
      let params = {
        uid: localStorage.getItem('uid'),
        staffId: this.staffId
      }
      selectUserResumeInfo(params).then(res => {
        this.formMember = res.data
        this.entryTime[0] = res.data.entry_begintime
        this.entryTime[1] = res.data.entry_endtime
      })
    },
    getList (filed) {
      getConstant({ filed }).then(res => {
        this.edu_type = res.data.edu_type
        this.job_array = res.data.job_array
      })
    },
    changeDate (val) {
      this.formMember.entry_begintime = val[0]
      this.formMember.entry_endtime = val[1]
    },
    change (val) {
      this.formMember.provinceid = val[0]
      this.formMember.cityid = val[1]
    },
    handleClose () {
      this.$emit('handleClose')
    },
    submitForm () {
      if (this.formMember.age_max < this.formMember.age_min) {
        return this.$message.warning('最大年龄应该大于最小年龄')
      }
      this.$refs['formMember'].validate((valid) => {
        if (valid) {
          console.log(this.formMember)
          this.$emit('submitForm', this.formMember)
        } else {
          return false
        }
      })
    }
  }
}
</script>
