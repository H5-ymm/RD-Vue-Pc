<template>
  <div class="job-detail-view reward-rule-row">
    <div class="job-detail-row">
      <section class="resume-col3">
        <el-form :model="formMember" ref="formMember" class="demo-form-inline" label-position="right" label-width="100px" :inline="true">
          <section class="resume-card">
            <div class="x-flex-between-start resume-card-row">
              <div class="resume-card-item">
                <el-form-item label="岗位类型">
                  <el-radio-group v-model="formMember.job_type">
                    <!-- @click.native.prevent="changeType(2)"  -->
                    <el-radio :label="0" border class="width126">普通岗位</el-radio>
                    <el-radio :label="1" border class="width126">精选岗位</el-radio>
                    <el-radio :label="2" border class="width126">高额返利</el-radio>
                    <el-radio :label="3" border class="width126">企业急招</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="岗位来源">
                  <el-input v-model="formMember.source" class="width406" placeholder="请输入岗位来源"></el-input>
                </el-form-item>
                <el-form-item label="合作商务姓名">
                  <el-input v-model="formMember.work_man" class="width406" placeholder="请输入合作商务姓名"></el-input>
                </el-form-item>
                <el-form-item label="合作商务电话">
                  <el-input v-model="formMember.work_tel" class="width406" placeholder="请输入合作商务电话"></el-input>
                </el-form-item>
                <el-form-item label="面试时间">
                  <el-date-picker class="width406" format="yyyy-MM-dd" value-format="timestamp" v-model="meeting_time" type="date" placeholder="选择面试时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="面试地址" prop="user_name">
                  <el-input v-model="formMember.meeting_addr" class="width406" placeholder="请输入面试地址"></el-input>
                </el-form-item>
                <el-form-item label="发单负责人" prop="user_name">
                  <el-input v-model="formMember.link_man" class="width406" placeholder="请输入发单负责人"></el-input>
                </el-form-item>
                <el-form-item label="负责人电话" prop="user_name">
                  <el-input v-model="formMember.link_tel" class="width406" placeholder="请输入负责人电话"></el-input>
                </el-form-item>
                <el-form-item label="指定招聘人" v-if="!id">
                  <el-radio-group v-model="formMember.is_assign">
                    <el-radio :label="1" border>是</el-radio>
                    <el-radio :label="2" border>否</el-radio>
                  </el-radio-group>
                  <div class="x-flex-between select-people-box" v-if="formMember.is_assign==1" @click="selectPerson">
                    <p class="select-people-text" v-if="!list.length">请选择指定招聘者</p>
                    <p v-else class="select-people-text">
                      <span v-for="(item,index) in list" :key="index">{{item.user_name}}</span>
                    </p>
                    <img src="../../assets/img/receipt/people.png" alt />
                  </div>
                </el-form-item>
              </div>
            </div>
          </section>
        </el-form>
      </section>
    </div>
    <div class="resume-footer-btn">
      <el-button type="primary" @click="submitForm">保存</el-button>
    </div>
    <personalModal :dialogTableVisible="dialogTableVisible" title="指定招聘人" @handleClose="dialogTableVisible=false" @handleOk="handleOk" :personalList="personalList"></personalModal>
  </div>
</template>
<script>
import { getTeamManage, getassignlist } from '@/api/internalInvoice'
import personalModal from '../common/personalModal'
import { thistle } from 'color-name'
export default {
  components: {
    personalModal
  },
  props: ['formJob', 'tabIndex'],
  data() {
    return {
      dialogTableVisible: false,
      formMember: {
        job_type: 0,
        is_assign: 1,
        meeting_time: ''
      },
      assignUids: '',
      meeting_time: '',
      personalList: [],
      list: [],
      index: 2,
      id: ''
    }
  },
  created() {
    if (this.formJob && this.formJob.setinfo) {
      this.formMember = this.formJob.setinfo
      this.id = this.formMember.id
    }
  },
  methods: {
    selectPerson() {
      let uid = localStorage.getItem('uid')
      getTeamManage({ uid })
        .then(res => {
          this.personalList = res.data
          this.dialogTableVisible = true
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    changeType(e) {
      e === this.formMember.job_type
        ? (this.formMember.job_type = '')
        : (this.formMember.job_type = e)
    },
    handleOk(val) {
      this.list = val
      let arr = val.map(item => {
        return item.uid
      })
      this.formMember.assign_uids = arr.join(',')
      this.dialogTableVisible = false
    },
    submitForm() {
      if (this.formMember.is_assign == 1 && !this.list.length) {
        return this.$message.warning('请选择指定人')
      }
      if (this.meeting_time) {
        let meetingTime = this.meeting_time + ''
        this.formMember.meeting_time = meetingTime.slice(0, 10)
      }
      this.$emit('submitForm', this.formMember)
    }
  }
}
</script>
<style lang="scss">
.job-detail-view {
  border-radius: 10px;
  background: #fff;
  &.reward-rule-row {
    .job-detail-row {
      width: 100%;
      margin: 0 auto;
      text-align: center;
      color: #333333;
      padding: 40px 0 10px;
      .el-form-item {
        display: block;
      }
      .width406 {
        width: 406px;
      }
      .width180 {
        width: 180px;
      }
      .line {
        margin: 0 10px;
        color: #bebebe;
      }
      .resume-col3 {
        width: 100%;
        padding-top: 10px;
        margin: 0 auto;
        .demo-form-inline {
          width: 95%;
          margin: 10px auto;
          .el-form-item {
            margin-bottom: 20px;
          }
        }
      }
    }
    .resume-card {
      .resume-card-row {
        margin: 0;
        .resume-card-item {
          width: 100%;
          text-align: left;
          &:nth-child(2) {
            .el-form-item {
              margin-right: 0;
            }
          }
          .el-radio.is-bordered {
            height: 38px;
            width: 198.5px;
            border-radius: 3px;
            line-height: 38px;
            padding: 0;
            border: 1px solid #eee;
            margin-right: 0;
            & + .el-radio.is-bordered {
              margin-left: 10px;
            }
            &.width126 {
              width: 128.5px;
            }
          }
          .el-radio__input {
            float: right;
            margin-top: 12px;
            margin-right: 10px;
          }
        }
      }
    }
    .select-people-box {
      border: 1px solid #eee;
      padding: 0 10px;
      margin: 10px 0;
      width: 385px;
      border-radius: 3px;
      .select-people-text {
        color: #999999;
        span {
          margin-right: 5px;
        }
      }
    }
    .resume-footer-btn {
      margin-left: 126px;
      padding-bottom: 32px;
    }
  }
}
</style>