<style lang="scss">
.member-dialog {
  box-shadow: 0px 1px 43px 0px rgba(51, 51, 51, 0.3);
  border-radius: 5px;
  .el-dialog__body,
  .el-dialog__header {
    padding: 0;
  }
  .member-row {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #333333;
    padding: 0 0 10px;
    position: relative;
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .member-col2 {
      line-height: 30px;
      margin: 10px auto;
      width: 65%;
      p {
        &:nth-of-type(1) {
          width: 100px;
          text-align: right;
          color: #6a6a6a;
        }
        &:nth-of-type(2) {
          flex: 1;
          text-align: left;
          margin-left: 30px;
        }
      }
    }
    .resume-col3 {
      width: 100%;
      border-top: 1px solid #eee;
      padding-top: 10px;
      margin: 0 auto;
      .demo-form-inline {
        width: 90%;
        margin: 10px auto;
        .el-input__inner {
          width: 300px !important;
        }
        .el-textarea {
          width: 300px !important;
          border-radius: 3px;
          textarea {
            height: 100px !important;
          }
        }
      }
    }
  }
  .resume-card {
    .resume-main-title {
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      > img {
        width: 20px;
        margin-right: 10px;
      }
    }
    .resume-card-row {
      margin: 20px 0 0 -15px;
      .el-form-item {
        margin-bottom: 20px;
      }
      .resume-card-item {
        width: 50%;
        text-align: left;
        &:nth-child(2) {
          box-sizing: border-box;
          .el-form-item {
            padding-left: 55px;
            margin-right: 0;
          }
        }
      }
      .resume-address {
        position: absolute;
        top: 0;
        right: -310px;
      }
    }
  }
  .resume-footer-btn {
    margin-right: 20px;
    .el-buton {
      border-radius: 5px;
    }
  }
}
</style>
<template>
  <el-dialog width="1000px" top="8vh" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>{{resumeId?'修改简历':'添加简历'}}</p>
      </section>
      <section class="resume-col3">
        <el-form :model="formMember" :rules="rules" ref="formMember" class="demo-form-inline" label-position="right" label-width="100px" :inline="true">
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/icon7.png" />
              <span>基本信息</span>
            </p>
            <div class="x-flex-between-start resume-card-row">
              <div class="resume-card-item">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="formMember.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                  <el-input v-model="formMember.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="学历">
                  <el-select v-model="formMember.education" placeholder="请选择学历">
                    <el-option :label="item" :value="key" v-for="(item,key) in edu_type" :key="key"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="详细地址">
                  <districtSelet @change="change" :disabled="true" :address="address" :placeholder="'请选择省市'"></districtSelet>
                  <el-input v-model="formMember.address" class="resume-address" placeholder="请输入详细地址"></el-input>
                </el-form-item>
              </div>
              <div class="resume-card-item">
                <el-form-item label="身份证号码" prop="id_card">
                  <el-input v-model="formMember.id_card" placeholder="请输入身份证号码"></el-input>
                </el-form-item>
                <el-form-item label="年龄" required>
                  <el-select v-model="formMember.age" placeholder="请选择年龄">
                    <el-option :label="item" :value="item" v-for="(item,index) in ageList" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="formMember.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
          </section>
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/icon8.png" />
              <span>意向信息</span>
            </p>
            <div class="x-flex-between-start resume-card-row">
              <div class="resume-card-item">
                <el-form-item label="期望城市" prop="user_name">
                  <districtSelet @change="changeExpect" :disabled="true" :address="addressExpect" :placeholder="'请选择省市'"></districtSelet>
                </el-form-item>
                <el-form-item label="薪资模式">
                  <el-select v-model="formMember.salary_type" value-key="label" placeholder="请选择薪资模式">
                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in moneyTypeList1" :key="item.label"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="预计入职时间">
                  <el-date-picker v-model="entryTime" type="daterange" format="yyyy-MM-dd" value-format="timestamp" @change="changeDate" range-separator="-" start-placeholder="入职开始时间" end-placeholder="入职结束时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="缴纳五险">
                  <el-radio-group v-model="formMember.is_five_risks">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                    <el-radio :label="3">试用期后</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="formMember.remark" type="textarea" :autosize="{ maxRows: 3}" placeholder="请输入备注信息"></el-input>
                </el-form-item>
              </div>
              <div class="resume-card-item">
                <el-form-item label="期望岗位">
                  <el-input v-model="formMember.desired_position" placeholder="请输入期望岗位"></el-input>
                </el-form-item>
                <el-form-item label="期望薪资">
                  <el-select v-model="formMember.money" v-if="formMember.salary_type==1" value-key="label" placeholder="请选择期望薪资">
                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in moneyArray" :key="item.label"></el-option>
                  </el-select>
                  <el-input v-model="formMember.money" v-else placeholder="请输入薪资"></el-input>
                </el-form-item>
                <el-form-item label="缴纳公积金">
                  <el-radio-group v-model="formMember.is_fund">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                    <el-radio :label="3">试用期后</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
          </section>
        </el-form>
      </section>
    </div>
    <div slot="footer" class="resume-footer-btn">
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" @click="submitForm">{{resumeId?'确定修改':'确定添加'}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 部门经理只能编辑状态
// 成员只能查看
// 总经理可以编辑部门 职称 状态
import { getConstant } from '@/api/dictionary'
import districtSelet from '../districtSelet'
import { selectUserResumeInfo } from '@/api/resume'
import { validateIdCard } from '@/util/util'
import { moneyTypeList1 } from '@/base/base'
export default {
  components: {
    districtSelet
  },
  props: ['dialogTableVisible', 'resumeId', 'resumeInfo'],
  data () {
    var validate = (rule, value, callback) => {
      let reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    };
    var validateCard = (rule, value, callback) => {
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
      formMember: {
        is_five_risks: 1,
        is_fund: 1,
        age: 18,
        sex: 1,
        name: '',
        mobile: '',
        education: '',
        address: '',
        provinceid: '',
        cityid: '',
        salary_type: 1,
        uid: localStorage.getItem('uid')
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        id_card: [
          { require: true, message: '请输入身份证号码', trigger: 'blur' },
          { validator: validateCard, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validate, trigger: 'blur' }
        ]
      },
      edu_type: [],
      jobList: [],
      ageList: [],
      moneyTypeList1,
      moneyArray: [],
      entryTime: [],
      address: [],
      addressExpect: []
    }
  },
  created () {
    let params = 'edu_type,resume_intention_salary'
    for (let i = 16; i < 46; i++) {
      this.ageList.push(i)
    }
    this.getList(params)
    this.formMember = {
      is_five_risks: 1,
      is_fund: 1,
      age: 18,
      sex: 1,
      name: '',
      mobile: '',
      education: '',
      address: '',
      provinceid: '',
      cityid: '',
      salary_type: 1,
      uid: localStorage.getItem('uid')
    }
  },
  watch: {
    resumeId (val) {
      if (val) {
        this.getInfo()
      } else {
        this.formMember = {
          is_five_risks: 1,
          is_fund: 1,
          age: 18,
          sex: 1,
          name: '',
          mobile: '',
          education: '',
          address: '',
          provinceid: '',
          cityid: '',
          salary_type: 1,
          uid: localStorage.getItem('uid')
        }
      }
    },
    dialogTableVisible (val) {
      if (!val) {
        this.formMember = {
          is_five_risks: 1,
          is_fund: 1,
          age: 18,
          sex: 1,
          name: '',
          mobile: '',
          education: '',
          address: '',
          provinceid: '',
          cityid: '',
          salary_type: 1,
          uid: localStorage.getItem('uid')
        }
      }
    }
  },
  methods: {
    getInfo () {
      let params = {
        uid: localStorage.getItem('uid'),
        resumeId: this.resumeId
      }
      selectUserResumeInfo(params)
        .then(res => {
          this.formMember = res.data
          this.formMember.salary_type = res.data.salary_type
            ? res.data.salary_type
            : ''
          console.log(res.data.salary_type)
          console.log(res.data.money)
          this.formMember.money = res.data.money ? res.data.money : ''
          if (res.data.entry_begintime) {
            this.entryTime[0] = this.$moment
              .unix(res.data.entry_begintime)
              .format('YYYY-MM-DD')
            this.entryTime[1] = this.$moment
              .unix(res.data.entry_endtime)
              .format('YYYY-MM-DD')
          } else {
            this.entryTime = []
          }
          if (res.data.expect_provindeid != 0 && res.data.expect_cityid != 0) {
            this.addressExpect = [
              res.data.expect_provindeid,
              res.data.expect_cityid
            ]
          }
          if (res.data.provinceid != 0 && res.data.cityid != 0) {
            this.address = [res.data.provinceid, res.data.cityid]
          } else {
            this.address = []
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    getList (filed) {
      getConstant({ filed })
        .then(res => {
          this.edu_type = res.data.edu_type
          this.moneyArray = this.getArry(res.data.resume_intention_salary)
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    getArry (obj) {
      var arr = []
      for (let i in obj) {
        arr.push({
          label: obj[i],
          value: Number(i)
        }) //属性
      }
      return arr
    },
    changeDate (val) {
      let entry_begintime = val ? val[0] + '' : ''
      let entry_endtime = val ? val[1] + '' : ''
      this.formMember.entry_begintime = entry_begintime.slice(0, 10)
      this.formMember.entry_endtime = entry_endtime.slice(0, 10)
    },
    change (val) {
      this.formMember.provinceid = val[0]
      this.formMember.cityid = val[1]
    },
    changeExpect (val) {
      this.formMember.expect_provindeid = val[0]
      this.formMember.expect_cityid = val[1]
    },
    handleClose () {
      this.$emit('handleClose')
      this.formMember = {
        is_five_risks: 1,
        is_fund: 1,
        age: 18,
        sex: 1,
        name: '',
        mobile: '',
        education: '',
        address: '',
        provinceid: '',
        cityid: '',
        salary_type: 1,
        uid: localStorage.getItem('uid')
      }
    },
    submitForm () {
      this.$refs['formMember'].validate(valid => {
        if (valid) {
          if (!this.formMember.provinceid) {
            this.formMember.provinceid = 0
            this.formMember.cityid = 0
          }
          if (!this.formMember.expect_provindeid) {
            this.formMember.expect_provindeid = 0
            this.formMember.expect_cityid = 0
          }
          this.$emit('submitForm', this.formMember)
        } else {
          return false
        }
      })
    }
  }
}
</script>
