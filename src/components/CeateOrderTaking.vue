<style lang="scss">
@import '@/assets/css/formMessage.scss';
  .teamMessage {
    .error {
      position:absolute;
      top: -16px;
      left:0;
      color:#FE2A00;
      font-size:12px;
      &.error-job{
        bottom: 0;
        top: 95%;
      }
    }
    .job_content {
      border: 1px solid #eee;
      height: 250px;
      width: 400px;
      color: #333;
      padding-left: 10px;
      position: relative;
      padding-bottom: 30px;
      margin-bottom: 30px;
      .el-input__inner {
        border: none!important;
      }
      .job_textarea {
        width: 320px;
        min-height: 20px;
        outline: none;
      }
      .content-len {
        color: #6A6A6A;
        font-size: 12px;
        position: absolute;
        bottom: 0;
        right: 0;
        background:rgba(248,248,248,1);
        border-radius:2px;
        padding:0 15px;
        line-height: 30px;
      }
    }
  }
</style>
<template>
  <div class="teamMessage create-orderTaking-view">
    <div class="teamMessage-form-row create-orderTaking">
      <el-form :model="orderTakingForm" :rules="rules" ref="orderTakingForm" label-width="110px" class="teamMessage-form">
        <el-form-item label="职位名称" prop="name">
          <el-input v-model="orderTakingForm.name" class="width408" placeholder="请输入职位名称"></el-input>
          <span class="error el-icon-warning">发单：只有团队可以接单，岗位需求人数由团队统一提供，个人无法接取。</span>
        </el-form-item>
        <el-form-item label="职位类别" prop="job_type" required>
          <el-select v-model="orderTakingForm.job_type" @change="selectJob" class="width408" placeholder="请选择职位类别">
            <el-option :label="item" :value="key" v-for="(item,key) in jobList" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需求人数" required>
          <el-input type="number" v-model="orderTakingForm.required_number" class="width408" @input="numberChange(arguments[0])" :min="2" placeholder="请输入申请人姓名"></el-input>
        </el-form-item>
        <el-form-item label="工作地址" required>
          <div class="width408">
            <districtSelet @change="change"></districtSelet>
          </div>
          <el-input v-model="orderTakingForm.address" class="width408 team-address" placeholder="请填写详细地址"></el-input>
        </el-form-item>
        <el-form-item label="年龄" required>
          <div class="x-flex-start-justify width408">
            <el-input type="number" class="width80" :min="16" v-model="orderTakingForm.min_age" placeholder="请输入"></el-input>
            <span class="landline"></span>
            <el-input type="number" class="width80" :max="45" v-model="orderTakingForm.max_age" placeholder="请输入"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="性别" required>
          <el-radio-group v-model="orderTakingForm.sex">
            <el-radio :label="3">男女不限</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="缴纳五险" prop="is_five_risks" required>
          <el-radio-group v-model="orderTakingForm.is_five_risks">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
            <el-radio :label="3">试用期后</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="缴纳公积金" required>
          <el-radio-group v-model="orderTakingForm.is_fund">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
            <el-radio :label="3">试用期后</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学历" required>
          <el-select v-model="orderTakingForm.education" class="width408" placeholder="请选择学历">
            <el-option :label="item" :value="index+1" v-for="(item,index) in eduList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <!-- 薪资和返利模式 -->
        <salaryAndRebate :moneyList="moneyList" @submit="submitSalary"></salaryAndRebate>
        <!-- 薪资和返利模式 -->
        <el-form-item label="职位描述" required>
          <span class="error el-icon-warning error-job">职位描述，最低输入30个字。</span>
          <div class="job_content">
            <div contenteditable="true" v-html="content" @input="onDivInput($event,'content')" class="job_textarea"></div>
            <!-- <el-input :autosize="{minRows: 5}" v-model="orderTakingForm.content" class="width408" placeholder=""></el-input> -->
            <!-- <div class="x-flex-start"> -->

            <!-- <span>工作内容：</span>
              <div
                contenteditable="true"
                v-html="content"
                @input="onDivInput($event,'content')"
                class="job_textarea"
              ></div>
            </div>
            <div class="x-flex-start">
              <span>职位要求：</span>
              <div
                contenteditable="true"
                @input="onDivInput($event,'jobRequire')"
                v-html="jobRequire"
                class="job_textarea"
              ></div>
            </div>
            <div class="x-flex-start">
              <span>工作时间：</span>
              <div
                contenteditable="true"
                @input="onDivInput($event,'jobTime')"
                v-html="jobTime"
                class="job_textarea"
              ></div>
            </div> -->
            <span class="content-len">{{len}}/1000字</span>
            <!-- </div> -->
          </div>
        </el-form-item>
        <el-form-item label="联系人" required>
          <el-input v-model="orderTakingForm.com_name" class="width408" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" required>
          <el-input v-model="orderTakingForm.tel" class="width408" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="orderTakingForm.email" class="width408" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item class="teamMessage-btn">
          <el-button type="primary" @click="submitForm('orderTakingForm')">发布</el-button>
          <el-button @click="resetForm('orderTakingForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 团队 团队性质选择跳转
// 企业从账户资料跳转
import { getConstant } from '@/api/dictionary'
import districtSelet from './districtSelet'
import { createInvoice } from '@/api/company'
import salaryAndRebate from './orderTaking/salaryAndRebate'
export default {
  components: {
    districtSelet,
    salaryAndRebate
  },
  data () {
    return {
      orderTakingForm: {
        type: 1,
        required_number: 2,
        max_age: 45,
        min_age: 16,
        is_five_risks: 1,
        sex: 3,
        is_fund: 1,
        uid: localStorage.getItem('uid')
      },
      imageUrl: '',
      license_img: '',
      landlineStart: '',
      landlineEnd: '',
      rules: {
        team_name: [
          { required: true, message: '请输入团队名称', trigger: 'blur' }
        ],
        industry: [
          { required: true, message: '请选择从事行业', trigger: 'blur' }
        ]
      },
      moneyList: [],
      jobList: {},
      eduList: [],
      jobName: '',
      content: '工作内容：</br> 职位要求：</br> 工作时间：',
      jobRequire: '',
      jobTime: ''
    };
  },
  created () {
    let params = 'edu_type,money_array,job_array'
    this.getList(params)
  },
  computed: {
    len () {
      return this.content.length
    }
  },
  methods: {
    getList (filed) {
      getConstant({ filed }).then(res => {
        const { edu_type, money_array, job_array } = res.data
        this.jobList = job_array
        this.eduList = edu_type
        this.moneyList = money_array
      })
    },
    selectJob (val) {
      for (let key in this.jobList) {
        if (key == val) {
          this.jobName = this.jobList[key]
        }
      }
      if (!this.orderTakingForm.name) {
        this.orderTakingForm.name = this.jobName
      }
    },
    numberChange (val) {

    },
    onDivInput (e, key) {
      console.log(e.target.innerHTML)
      this[key] = e.target.innerHTML
    },
    change (val) {
      this.orderTakingForm.provinceid = val[0]
      this.orderTakingForm.cityid = val[1]
      this.orderTakingForm.three_cityid = val[2]
    },
    submitSalary (val) {
      console.log(val)
      this.orderTakingForm = Object.assign(this.orderTakingForm, val)
    },
    submitForm (orderTakingForm) {
      if (this.content) {
        this.orderTakingForm.job_content = this.content
      }
      else {
        return this.$message.warning('请输入职位描述')
      }
      this.$refs[orderTakingForm].validate((valid) => {
        if (valid) {
          createInvoice(this.orderTakingForm).then(res => {
            if (res.status.code == 200) {
              this.$router.push('checkReceipt')
            }
          }).catch(error => {
            this.$message.error(error.status.remind)
          })
        } else {
          return false;
        }
      });
    },
    resetForm (orderTakingForm) {
      this.$refs[orderTakingForm].resetFields()
    }
  }
}
</script>

