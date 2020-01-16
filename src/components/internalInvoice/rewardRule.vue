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
<template>
  <div class="job-detail-view reward-rule-row">
    <div class="job-detail-row">
      <section class="resume-col3">
        <el-form :model="formMember" ref="formMember" class="demo-form-inline" label-position="right" label-width="100px" :inline="true">
          <section class="resume-card">
            <div class="x-flex-between-start resume-card-row">
              <div class="resume-card-item">
                <el-form-item label="招聘类型">
                  <el-radio-group v-model="formMember.type">
                    <el-radio :label="1" border>返利招聘</el-radio>
                    <el-radio :label="2" border>普通招聘</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <div v-if="formMember.type==1">
                    <rewardType @submit="submit" :type="formMember.type"></rewardType>
                  </div>
                </el-form-item>
              </div>
            </div>
          </section>
        </el-form>
      </section>
    </div>
    <div class="resume-footer-btn">
      <el-button type="primary" @click="submitForm()">下一步</el-button>
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
  props: ['formJob'],
  data () {
    return {
      formMember: {
        type: 1
      },
      moneyTypeList,
      moneyArray: {},
      rewardForm: {
        reward_type: '', // 返利类型(1月返 2日返 3时返 4一次性返)
        reward_money: '', // 返利金额(根据类型修改单位)
        reward_money_type: '', // 1日2周3月(针对日返和时返) 1长期2持续（针对月返）结算类型 
        settlement_time: '', // 结算时间(针对月返：次月第XX多少天；)
        reward_needtime: '', // 需求入职天数/周数/月数(一次性时：0表示当天返)
        duration_time: '', // 持续 (天数/周数/月数)
        settlement_type: '',
      },
      index: 1
    }
  },
  created () {
    let params = 'money_array'
    this.getList(params)
    this.rewardForm.type = 1
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
        this.moneyArray = res.data.money_array
      })
    },
    handleClose () {
      this.$parent.dialogTableVisible = false
    },
    submit (val) {
      this.rewardForm = val
      console.log(val)
      this.formMember = Object.assign(this.formMember, val)
    },
    checkReward (info) {
      let flag = false
      for (let key in info) {
        if (info.reward_type == 1) {
          if (key == 'settlement_time'
            && key == 'reward_money'
            && key == 'reward_type'
            && key == 'reward_money_type' && info[key] != '') {
            flag = true
          }
          else {
            flag = false
          }
        }
        else if (info.reward_type == 4) {
          if (key != 'reward_needtime' && key != 'reward_money_type'
            && key != 'duration_time' && key != 'settlement_type' && key != 'settlement_time' && info[key] != '') {
            flag = true
            break;
          }
          else {
            flag = false
          }
        }
        else {
          if (key != 'type' && info[key] != '') {
            flag = true
          }
          else {
            flag = false
          }
        }
      }
      return flag
    },
    submitForm () {
      if (this.formMember.type == 1) {
        console.log(this.rewardForm)
        if (this.rewardForm.reward_type != 4 && !this.rewardForm.reward_money && !this.rewardForm.reward_money_type) {
          return this.$message.warning('请设置返利模式规则')
        }
        if (this.rewardForm.reward_type == 4 && !this.rewardForm.reward_money) {
          return this.$message.warning('请设置返利模式规则')
        }
        this.$emit('submitForm', this.formMember)
      }
      else {
        this.$emit('submitForm', this.formMember)
      }
    }
  }
}
</script>
