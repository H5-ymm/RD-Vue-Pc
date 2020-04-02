<template>
  <el-dialog width="800px" :visible="dialogTableVisible"  class="receipt-dialog" :show-close="false">
    <div class="receipt-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>通知面试</p>
      </section>
      <div class=" x-flex-between view-box">
        <section class="member-col3">
          <el-form :model="formMember" :inline="true" label-position="left" ref="formMember" class="demo-form-inline">
            <el-form-item label="面试时间" required>
              <div class="x-flex-between">
                <el-date-picker v-model="formMember.date" type="date" :picker-options="pickerOptions" class="width195" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :placeholder="`请选择面试日期`"></el-date-picker>
                <el-time-select class="width195" type="date" :picker-options="
                  ['09:30 - 12:00', '14:30 - 18:30']" value-format="HH:mm" format="HH:mm" v-model="formMember.time" :placeholder="`请选择面试时间`"></el-time-select>
              </div>
            </el-form-item>
            <el-form-item label="通知内容" required>
              <el-input v-model="formMember.content" type="textarea" class="width400" :autosize="{maxRows: 4}" placeholder="请输入通知内容"></el-input>
            </el-form-item>
            <div class="view-tip x-flex-start">
              <span class="el-icon-warning"></span>
              <div>
                  <p>1.审核通过简历会直接发送面试通知，请谨慎操作</p>
                  <p>2.可批量操作简历，每次最多8个</p>
                  <p>3.可根据实际情况分批面试</p>
              </div>
            </div>
          </el-form>
        </section>
        <div class="member-col3">
          <img src="../../assets/img/qrcode.jpg" alt="" class="qrcode">
        </div>
      </div>
    </div>
    <div slot="footer" class="notice-footer-btn">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { selectInterviewEntryInfo } from '@/api/receipt'
export default {
  props: ['dialogTableVisible'],
  data() {
    return {
      formMember: {
        date: '',
        time: '',
        content: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now()
        }
      },
      uid: localStorage.getItem('uid'),
      type: 1
    }
  },
  created() {
    this.formMember.date = this.$moment(new Date()).format('YYYY-MM-DD HH:mm')
  },
  methods: {
    switchView(index) {
     this.type = index
    },
    handleClose() {
      this.$emit('handleClose')
    },
    submitForm() {
      let date = this.formMember.date + this.formMember.time
      let date1 = this.$moment(date, 'YYYY-MM-DD HH:mm').valueOf()
      date1 = date1 + ''
      date1 =  date1.substring(0, 10)
      let params = {
        view_time: date1,
        content: this.formMember.content,
        room_num: date1,
        room_name: JSON.parse(sessionStorage.getItem('baseInfo')).link_phone,
        type: 1,
        uid: this.uid
      }
      this.$emit('setVideoTime', params)
    }
  }
}
</script>
<style lang="scss">
.receipt-dialog {
  box-shadow: 0px 1px 43px 0px rgba(51, 51, 51, 0.3);
  border-radius: 5px;
  .el-dialog__body,
  .el-dialog__header {
    padding: 0;
  }
  .switch-box {
    margin: 20px auto;
    width: 80%;
    .el-button{
      padding: 11px 50px;
      border-radius: 5px;
    }
  }
  .qrcode {
    width:200px;
    height:197px;
  }
  .receipt-row {
    width: 100%;
    text-align: center;
    color: #333333;
    position: relative;
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .member-col1 {
      background: #ebf4fb;
      padding: 18px 0 17px;
    }
    .el-form-item {
      width: 100%;
      .width400,
      .el-form-item__content {
        width: 400px;
      }
    }
    .address {
      margin-top: 6px;
    }
    .el-textarea__inner {
      height: 160px !important;
    }
    .view-box {
      margin: 0 20px;
      .member-col3 {
        width: 100%;
        padding-top: 10px;
        border-top:none;
        .demo-form-inline {
          width: 100%;
          margin: 0 auto;
          .el-form-item {
            margin-bottom: 10px;
          }
          .el-form-item__label {
            width: 100%;
            margin-left: 0;
          }
          .width195 {
            width: 195px !important;
            .el-input__inner {
              width: 195px !important;
              &:focus {
                padding-left:30px;
              }
            }
          }
        }
      }
    }
    .view-tip {
      color: #fe2a00;
      margin: 10px 0;
      text-align: left
    }
  }
  .notice-footer-btn {
    margin-right: 10px;
    .el-button {
      margin-right: 20px;
    }
  }
}
</style>