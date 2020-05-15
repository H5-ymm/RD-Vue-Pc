<style lang="scss">
@import '@/assets/css/formMessage.scss';
.teamMessage {
  .error {
    position: absolute;
    top: -16px;
    left: 0;
    color: #fe2a00;
    font-size: 12px;
    &.error-job {
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
    overflow: auto;
    .el-input__inner {
      border: none !important;
    }
    .job_textarea {
      width: 320px;
      min-height: 20px;
      outline: none;
      display: inline-block;
      -webkit-user-select: text;
      line-height: normal;
      &:focus {
        padding: 2px 10px;
      }
    }
    .content-len {
      color: #6a6a6a;
      font-size: 12px;
      position: absolute;
      bottom: 0;
      right: 0;
      background: rgba(248, 248, 248, 1);
      border-radius: 2px;
      padding: 0 15px;
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
        <el-form-item label="职位类别" required>
          <el-select v-model="orderTakingForm.job_type" value-key="label" @change="selectJob" class="width408" placeholder="请选择职位类别">
            <el-option :label="item.label" :value="item.value"  v-for="(item,index) in jobList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需求人数" prop="required_number">
          <el-input type="number" v-model="orderTakingForm.required_number" class="width408" @input="numberChange(arguments[0])" :min="2" placeholder="请输入需求人数"></el-input>
        </el-form-item>
        <el-form-item label="工作地址" required>
          <div class="width408">
            <districtSelet @change="change" :address="address"></districtSelet>
          </div>
          <el-input v-model="orderTakingForm.address" class="width408 team-address" placeholder="请填写详细地址"></el-input>
        </el-form-item>
        <el-form-item label="年龄" required>
          <div class="x-flex-start-justify width408">
            <el-input class="width80" @input="changeInput(arguments[0])" v-model="orderTakingForm.min_age" placeholder="请输入"></el-input>
            <span class="landline"></span>
            <el-input class="width80" @input="changeInputmax_age(arguments[0])" v-model="orderTakingForm.max_age" placeholder="请输入"></el-input>
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
            <el-option :label="item" :value="index" v-for="(item,index) in eduList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <!-- 薪资和返利模式 -->
        <salaryAndRebate :from="from" @submit="submitSalary"></salaryAndRebate>
        <!-- 薪资和返利模式 -->
        <el-form-item label="职位描述" required>
          <span class="error el-icon-warning error-job" v-if="len<30">职位描述，最低输入30个字。</span>
          <div class="job_content">
            <div contenteditable="true" v-html="content" @input="keepLastIndex($event)" class="job_textarea"></div>
            <span class="content-len">{{len}}/1000字</span>
          </div>
        </el-form-item>
        <el-form-item label="联系人" prop="link_name">
          <el-input v-model="orderTakingForm.link_name" class="width408" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="orderTakingForm.tel" class="width408" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="orderTakingForm.email" class="width408" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item class="teamMessage-btn">
          <el-button type="primary" :disabled="!disabled" @click="submitForm('orderTakingForm')">发布</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <infoTip :centerDialogVisible="dialogVisible" :modalInfo="modalInfo" @handleClose="dialogVisible=false"></infoTip>
  </div>
</template>

<script>
// 团队 团队性质选择跳转
// 企业从账户资料跳转
import { getConstant } from '@/api/dictionary'
import districtSelet from './districtSelet'
import { createInvoice } from '@/api/company'
import salaryAndRebate from './orderTaking/salaryAndRebate'
import { updateInvoice, getInvoice } from '@/api/orderTarking'
import infoTip from './common/infoTip'
export default {
  components: {
    districtSelet,
    salaryAndRebate,
    infoTip
  },
  data() {
    let validatereg = function(rule, value, callback) {
      //验证用户名是否合法
      let reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    return {
      orderTakingForm: {
        type: 1,
        required_number: 2,
        max_age: 65,
        min_age: 16,
        is_five_risks: 1,
        sex: 3,
        is_fund: 1,
        job_content: '',
        uid: localStorage.getItem('uid')
      },
      imageUrl: '',
      license_img: '',
      landlineStart: '',
      landlineEnd: '',
      rules: {
        name: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ],
        required_number: [
          { required: true, message: '请输入需求人数', trigger: 'blur' }
        ],
        link_name: [
          { required: true, message: '请选择联系人', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatereg, trigger: 'blur' }
        ]
      },
      jobList: [],
      eduList: [],
      jobName: '',
      content: '工作内容：</br> 职位要求：</br> 工作时间：',
      jobRequire: '',
      jobTime: '',
      disabled: false,
      rateInfo: null,
      jobContent: '',
      id: '',
      address: [],
      from: null,
      dialogVisible: false,
      modalInfo: {
        title: '您的信息未完善！',
        okText: '前去完善',
        closeText: '',
        imgBg: require('../assets/img/info.png')
      },
    }
  },
  created() {
    if (!localStorage.getItem('rendacompanyInfo')) {
      this.dialogVisible = true
    } else {
      this.dialogVisible = false
    }
    let params = 'edu_type,money_array,job_array'
    this.getList(params)
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getJobInfo()
    }
  },
  computed: {
    len() {
      let content = this.content.replace(/<[^>]+>/g, '').replace('/</br>/g', '')
      let content1 = this.jobContent
      content = content.replace(/(^\s+)|(\s+$)/g, '')
      let length = content.length
      return !this.jobContent ? content1.length + length : content1.length
    }
  },
  methods: {
    getJobInfo() {
      let params = {
        id: this.id,
        uid: localStorage.getItem('uid')
      }
      getInvoice(params)
        .then(res => {
          this.from = res.data
          this.orderTakingForm = res.data
          if (res.data && res.data.provinceid) {
            this.address = [
              res.data.provinceid,
              res.data.cityid,
              res.data.three_cityid
            ]
            this.content = res.data.job_content
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    getList(filed) {
      getConstant({ filed }).then(res => {
        const { edu_type, money_array, job_array } = res.data
        this.jobList = this.getArray(job_array)
        this.eduList = edu_type
      })
    },
    getArray (obj) {
      let arr = [];
      for (let key in obj) {
        arr.push({
          label: obj[key],
          value: Number(key) + 1
        });
      }
      return arr;
    },
    selectJob(val) {
      for (let key in this.jobList) {
        if (key == val) {
          this.jobName = this.jobList[key]
        }
      }
      if (!this.orderTakingForm.name) {
        this.orderTakingForm.name = this.jobName
      }
    },
    changeInput(val) {
      if (val && val.length >= 2 && Number(val) < 16) {
        this.orderTakingForm.min_age = 16
      }
      if (Number(val) > 65) {
        this.orderTakingForm.min_age = 65
      }
    },
    changeInputmax_age(val) {
      if (val && val.length >= 2 && Number(val) < 16) {
        this.orderTakingForm.max_age = 17
      }
      if (val && val.length >= 2 && Number(val) > 65) {
        this.orderTakingForm.max_age = 65
      }
    },
    keepLastIndex(obj) {
      if (window.getSelection) {
        //ie11 10 9 ff safari
        // obj.focus(); //解决ff不获取焦点无法定位问题
        let range = window.getSelection().getRangeAt(0) //创建range
        // range.selectAllChildren(obj); //range 选择obj下所有子内容
        // range.collapseToEnd(); //光标移至最后
      } else if (document.selection) {
        //ie10 9 8 7 6 5
        let range = document.selection.createRange() //创建选择对象
        range.moveToElementText(obj) //range定位到obj
        range.collapse(false) //光标移至最后
        range.select()
      }
      this.jobContent = obj.target.innerText
      if (!this.jobContent) {
        this.content = ''
      }
      this.orderTakingForm.job_content = obj.target.innerHTML
    },
    numberChange(val) {
      if (val && Number(val) < 2) {
        this.orderTakingForm.required_number = 2
      }
    },
    onDivInput(e, key) {
      this[key] = e.target.innerHTML
    },
    change(val) {
      this.orderTakingForm.provinceid = val[0]
      this.orderTakingForm.cityid = val[1]
      this.orderTakingForm.three_cityid = val[2]
    },
    submitSalary(val) {
      if (val) {
        this.rateInfo = val
        this.disabled = true
        this.orderTakingForm = Object.assign(this.orderTakingForm, val)
      } else {
        this.rateInfo = 'null'
        this.disabled = false
      }
    },
    submitForm(orderTakingForm) {
      if (Number(this.orderTakingForm.min_age) < 16) {
        return this.$message.warning('最小年龄不能小于16')
      }
      if (
        Number(this.orderTakingForm.max_age) <
        Number(this.orderTakingForm.min_age)
      ) {
        return this.$message.warning('最大年龄不能大于最小年龄')
      }
      if (this.orderTakingForm.money=='') {
        return this.$message.warning('请设置员工薪资')
      }
      if (this.orderTakingForm.money=='') {
        return this.$message.warning('请设置员工薪资')
      }
      if (this.orderTakingForm.reward_money_type=='' && this.orderTakingForm.reward_money =='') {
        return this.$message.warning('请设置返利模式')
      }
       if (this.orderTakingForm.reward_money_type==''&& this.orderTakingForm.reward_type!= 4 ) {
        return this.$message.warning('请设置结算类型')
      }
      console.log(this.orderTakingForm)
      if (!this.orderTakingForm.job_content) {
        return this.$message.warning('请输入职位描述')
      }
      if (this.orderTakingForm.job_content < 30) {
        return this.$message.warning('职位描述最低输入30个')
      }

      this.$refs[orderTakingForm].validate(valid => {
        if (valid) {
          // 修改发单
          if (this.orderTakingForm.id) {
            this.updateRecepit(this.orderTakingForm)
          } else {
            // 新增
            createInvoice(this.orderTakingForm)
              .then(res => {
                if (res.data) {
                  this.$router.push('/checkReceipt')
                  this.resetForm()
                } else {
                  this.$message.error('发布失败')
                }
              })
              .catch(error => {
                this.$message.error(error.status.remind)
              })
          }
        } else {
          return false
        }
      })
    },
    updateRecepit(orderTakingForm) {
      updateInvoice(orderTakingForm)
        .then(res => {
          if (res.data) {
            this.$router.push('checkReceipt')
            this.resetForm()
          } else {
            this.$message.error('发布失败')
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    resetForm() {
      this.orderTakingForm = {
        type: 1,
        required_number: 2,
        max_age: 45,
        min_age: 16,
        is_five_risks: 1,
        sex: 3,
        is_fund: 1,
        job_content: '',
        uid: localStorage.getItem('uid')
      }
    }
  }
}
</script>

