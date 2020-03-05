<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="receipt-dialog" :show-close="false">
    <div class="receipt-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>通知{{noticeType}}</p>
      </section>
      <section class="member-col3 bind-col3">
        <el-form :model="formMember" :inline="true" label-position="left" ref="formMember" class="demo-form-inline">
          <el-form-item :label="`${noticeType}时间`" required>
            <div class="x-flex-between">
              <el-date-picker v-model="formMember.date" type="date" :disabled="viewTime" :picker-options="pickerOptions" class="width195" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :placeholder="`请选择${noticeType}日期`"></el-date-picker>
              <el-time-select class="width195" type="date" :picker-options="
                ['09:30 - 12:00', '14:30 - 18:30']" :disabled="viewTime" value-format="HH:mm" format="HH:mm" v-model="formMember.time" :placeholder="`请选择${noticeType}时间`"></el-time-select>
            </div>
          </el-form-item>
          <el-form-item :label="`${noticeType}地点`" required>
            <districtSelet class="width400" v-if="!viewTime" @changeAddress="changeAddress" :placeholder="`请选择${noticeType}地点`"></districtSelet>
            <el-input v-model="formMember.address" :readonly="viewTime" class="address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="通知内容" required>
            <span class="error el-icon-warning">审核通过简历会直接发送{{noticeType}}通知，谨慎操作</span>
            <el-input v-model="formMember.content" :readonly="viewTime" type="textarea" class="width400" :autosize="{maxRows: 4}" :placeholder="`${!viewTime?'请输入通知内容':''}`"></el-input>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <div slot="footer" class="notice-footer-btn">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm" v-if="!viewTime">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import districtSelet from '../districtSelet'
import { selectInterviewEntryInfo } from '@/api/receipt'
export default {
  components: {
    districtSelet
  },
  props: ['dialogTableVisible', 'noticeType', 'isEdit', 'id'],
  data() {
    return {
      formMember: {
        date: '',
        time: '',
        address: '',
        content: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now()
        }
      },
      uid: localStorage.getItem('uid'),
      address: [],
      type: '',
      viewTime: false
    }
  },
  created() {
    this.formMember.date = this.$moment(new Date())
      .add(1, 'days')
      .format('YYYY-MM-DD HH:mm')
  },
  watch: {
    isEdit(val) {
      if (val) {
        this.viewTime = val ? true : false
        if (this.viewTime && this.id) {
          this.getTimeInfo(this.id)
        }
      }
    }
  },
  methods: {
    getTimeInfo(id) {
      selectInterviewEntryInfo({ id })
        .then(res => {
          this.formMember.date = this.$moment
            .unix(res.data.entry_time)
            .format('YYYY-MM-DD')
          this.formMember.time = this.$moment
            .unix(res.data.entry_time)
            .format('HH:mm')
          let content1 = res.data.entry_comtent.split('&')
          this.formMember.content = content1[1]
          this.formMember.address = content1[0].split('/').join(',')
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    handleClose() {
      this.$parent.dialogTableVisible = false
    },
    changeAddress(val) {
      this.address = val
    },
    submitForm() {
      if (this.interview_status == 3) return
      let date = this.formMember.date + this.formMember.time
      let date1 = this.$moment(date, 'YYYY-MM-DD HH:mm').valueOf()
      let address = this.address.join('/')
      date1 = date1 + ''
      let params = {
        time: date1.substring(0, 10),
        content:
          address +
          '/' +
          this.formMember.address +
          '&' +
          this.formMember.content
      }
      this.$emit('submitForm', params)
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
  .receipt-row {
    width: 100%;
    // margin: 0 auto;
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
    .member-col3 {
      width: 100%;
      border-top: 1px solid #eee;
      padding-top: 10px;
      .demo-form-inline {
        width: 100%;
        margin: 0 auto;
        .el-form-item {
          margin-bottom: 10px;
        }
        .el-form-item__label {
          width: 100%;
          margin-left: 48px;
        }
        .width195 {
          width: 195px !important;
          .el-input__inner {
            width: 195px !important;
          }
        }
      }
    }
    .error {
      position: absolute;
      top: -24px;
      right: 0;
      color: #fe2a00;
      font-size: 12px;
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