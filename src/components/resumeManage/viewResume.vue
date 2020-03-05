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
    .member-col1 {
      background: #ebf4fb;
      padding: 21px 0 20px;
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
        width: 82%;
        margin: 10px auto;
      }
    }
  }
  .resume-info-card {
    .resume-card {
      margin-bottom: 20px;
      .resume-col1 {
        color: #6a6a6a;
        width: 90px;
        text-align: right;
        margin-right: 20px;
      }
      p {
        &:nth-of-type(2) {
          flex: 1;
          line-height: 25px;
        }
      }
      .resume-card-row {
        margin: 10px 0;
        .resume-card-item {
          width: 100%;
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
      .resume-card-item {
        width: 50%;
        text-align: left;
        &.view-resume-item {
          line-height: 30px;
          color: #333;
        }
        &:nth-child(2) {
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
    .el-button {
      border-radius: 3px;
      margin-right: 20px;
    }
  }
}
</style>
<template>
  <el-dialog width="500px" top="8vh" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>查看简历</p>
      </section>
      <section class="resume-col3">
        <div class="demo-form-inline resume-info-card">
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/icon7.png" />
              <span>基本信息</span>
            </p>
            <div class="resume-card-row">
              <div class="resume-card-item view-resume-item">
                <div class="x-flex-start-justify">
                  <p class="resume-col1">姓名</p>
                  <p>{{formMember.name}}</p>
                </div>
                <div class="x-flex-start-justify">
                  <p class="resume-col1">年龄</p>
                  <p>{{formMember.age}}</p>
                </div>
                <div class="x-flex-start-justify">
                  <p class="resume-col1">性别</p>
                  <p>{{formMember.sex==1?'男':'女'}}</p>
                </div>
                <div class="x-flex-start-justify">
                  <p class="resume-col1">手机号码</p>
                  <p>{{formMember.mobile}}</p>
                </div>
                <div class="x-flex-start-justify">
                  <p class="resume-col1">学历</p>
                  <p>{{formMember.eduName}}</p>
                </div>
                <div class="x-flex-start-justify">
                  <p class="resume-col1">详细地址</p>
                  <p>{{formMember.address}}</p>
                </div>
              </div>
            </div>
          </section>
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/icon8.png" />
              <span>意向信息</span>
            </p>
            <div class="resume-card-row" v-if="formMember">
              <div class="resume-card-item view-resume-item">
                <div class="x-flex-start-justify">
                  <p class="resume-col1">期望城市</p>
                  <p>{{formMember.name}}</p>
                </div>
                <div class="x-flex-start-justify">
                  <p class="resume-col1">期望岗位</p>
                  <p>{{formMember.desired_position}}</p>
                </div>
                <div class="x-flex-start-justify">
                  <p class="resume-col1">薪资模式</p>
                  <p>{{formMember.salary_type==1?'月薪':formMember.salary_type==2?'日薪':'时薪'}}</p>
                </div>
                <div class="x-flex-start-justify">
                  <p class="resume-col1">期望薪资</p>
                  <p v-if="formMember.salary_type==1&&formMember.min_expect_money">{{formMember.min_expect_money}}~{{formMember.max_expect_money}}</p>
                  <p v-if="formMember.salary_type==1&&!formMember.min_expect_money&&!formMember.max_expect_money">{{formMember.min_expect_money}}</p>
                  <p v-if="formMember.salary_type!=1">{{formMember.money}}}}</p>
                </div>
                <div class="x-flex-start-justify">
                  <p class="resume-col1">预计入职时间</p>
                  <p>{{formMember.entry_begintime?$moment.unix(formMember.entry_begintime).format('YYYY-MM-DD HH:mm'):''}}
                    ~{{formMember.entry_endtime?$moment.unix(formMember.entry_endtime).format('YYYY-MM-DD HH:mm'):''}}
                  </p>
                </div>
                <div class="x-flex-start-justify">
                  <p class="resume-col1">缴纳公积金</p>
                  <p>{{formMember.is_five_risks?'是':formMember.is_fund==2?'否':'试用期后'}}</p>
                </div>
                <div class="x-flex-start-justify">
                  <p class="resume-col1">缴纳五险</p>
                  <p>{{formMember.is_fund==1?'是':formMember.is_fund==2?'否':'试用期后'}}</p>
                </div>
                <div class="x-flex-start-justify">
                  <p class="resume-col1">备注</p>
                  <p>{{formMember.remark}}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
    <div slot="footer" class="resume-footer-btn">
      <el-button type="primary" @click="handleClose">关闭</el-button>
      <!-- <el-button @click="handleClose">编辑</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
// 部门经理只能编辑状态
// 成员只能查看
// 总经理可以编辑部门 职称 状态
import { getConstant } from '../../api/dictionary'
import districtSelet from '../districtSelet'
import { selectUserResumeInfo } from '@/api/resume'
import { moneyTypeList } from '@/base/base'
export default {
  components: {
    districtSelet
  },
  props: ['dialogTableVisible', 'resumeId', 'resumeInfo'],
  data() {
    return {
      formMember: {
        is_five_risks: 0,
        is_fund: 0,
        age: 0,
        sex: 0,
        name: '',
        mobile: '',
        education: '',
        address: '',
        provinceid: '',
        cityid: '',
        uid: localStorage.getItem('uid'),
        remark: ''
      },
      edu_type: [],
      jobList: [],
      ageList: [],
      moneyTypeList,
      moneyArray: {},
      entryTime: []
    }
  },
  created() {
    let params = 'edu_type,money_array'
    for (let i = 16; i < 46; i++) {
      this.ageList.push(i)
    }
    this.getList(params)
  },
  watch: {
    resumeId(val, oldVal) {
      if (val && val != oldVal) {
        this.getInfo()
      }
    }
  },
  methods: {
    getInfo() {
      let params = {
        uid: localStorage.getItem('uid'),
        resumeId: this.resumeId
      }
      selectUserResumeInfo(params).then(res => {
        this.formMember = res.data
        this.entryTime[0] = res.data.entry_begintime
        this.entryTime[1] = res.data.entry_endtime
      })
    },
    getList(filed) {
      getConstant({ filed }).then(res => {
        this.edu_type = res.data.edu_type
        this.moneyArray = res.data.money_array
      })
    },
    changeDate(val) {
      this.formMember.entry_begintime = val[0]
      this.formMember.entry_endtime = val[1]
    },
    change(val) {
      this.formMember.provinceid = val[0]
      this.formMember.cityid = val[1]
    },
    changeExpect(val) {
      this.formMember.expect_provindeid = val[0]
      this.formMember.expect_cityid = val[1]
    },
    handleClose() {
      this.$emit('handleClose')
    },
    submitForm() {
      this.$refs['formMember'].validate(valid => {
        if (valid) {
          this.$emit('submitForm', this.formMember)
        } else {
          return false
        }
      })
    }
  }
}
</script>
