<template>
  <div
    class="job-detail-view reward-rule-row">
    <div class="job-detail-row">
      <section class="resume-col3">
        <el-form
          :model="formMember"
          :rules="rules"
          ref="formMember"
          class="demo-form-inline"
          label-position="right"
          label-width="100px"
          :inline="true"
        >
          <section class="resume-card">
            <div class="x-flex-between-start resume-card-row">
              <div class="resume-card-item">
                <el-form-item label="招聘类型">
                  <el-radio-group v-model="formMember.type">
                    <el-radio :label="1" border>返利招聘</el-radio>
                    <el-radio :label="2" border>普通招聘</el-radio>
                  </el-radio-group>
                </el-form-item>
                <div v-if="formMember.type==1">
                  <rewardType></rewardType>
                </div>
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
import { selectUserResumeInfo } from '@/api/resume'
import { moneyTypeList } from '@/base/base'
import rewardType from './rewardType'
export default {
  components: {
    rewardType
  },
  data () {
    return {
      formMember: {
        type:1
      },
      moneyTypeList,
      moneyArray: {}
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
      })
    },
    getList (filed) {
      getConstant({ filed }).then(res => {
        this.edu_type = res.data.edu_type
        this.moneyArray = res.data.money_array
      })
    },
    handleClose () {
      this.$parent.dialogTableVisible = false
    },
    submitForm () {
      this.$emit('submitForm', this.formMember)
    }
  }
}
</script>
<style lang="scss">
.job-detail-view{
  border-radius:10px;
  background: #fff;
  &.reward-rule-row {
  .job-detail-row {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #333333;
    padding: 40px 0 10px;
    .el-form-item{
      display: block;
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
        .el-form-item {
          margin-bottom: 10px;
        }
        .el-input__inner{
          height:38px;
          line-height:38px;
          border-radius:3px;
        }
      }
    }
  }
  .resume-card {  
    .resume-card-row {
      margin: 20px 0 0 -15px;
       .resume-card-item {
        width: 100%;
        text-align: left;
        &:nth-child(2) {
          .el-form-item {
            margin-right:0;
          }
        }
        .el-radio.is-bordered {
          height: 38px;
          width: 145px;
          border-radius: 3px;
          line-height: 38px;
          padding:0;
          margin-right: 0;
          &+.el-radio.is-bordered {
            margin-left: 10px;
          }
        }
        .el-radio__input {
          float: right;
          margin-top: 12px;
          margin-right: 10px;
        }
      }
      .el-form-item__error{
        top:-50%;
      }
    }  
  }
  .resume-footer-btn {
    margin-left: 120px;
    padding-bottom: 32px;
  }
 }
}
</style>