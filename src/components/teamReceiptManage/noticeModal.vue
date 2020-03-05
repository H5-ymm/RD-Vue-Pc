<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="receipt-dialog" :show-close="false">
    <div class="receipt-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>通知面试</p>
      </section>
      <section class="member-col3 bind-col3">
        <el-form :model="formMember" :inline="true" label-position="left" ref="formMember" class="demo-form-inline">
          <el-form-item label="面试时间">
            <div class="x-flex-start">
              <span>{{viewTimeInfo.view_time}}</span>
            </div>
          </el-form-item>
          <el-form-item label="面试地点">
            <div class="x-flex-start">
              <span>{{viewTimeInfo.view_time}}</span>
            </div>
          </el-form-item>
          <el-form-item label="通知内容">
            <div class="x-flex-start">
              <span>{{content}}</span>
            </div>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </el-dialog>
</template>
<script>
// 部门经理只能编辑状态
// 成员只能查看
// 总经理可以编辑部门 职称 状态
import { validateIdCard } from '../../util/util'
import districtSelet from '../districtSelet'
export default {
  components: {
    districtSelet
  },
  props: {
    viewTimeInfo: {
      type: Object,
      default: {}
    },
    dialogTableVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formMember: {
        depart_name: '',
        user_id: '',
        uid: localStorage.getItem('uid')
      },
      userList: [],
      uid: localStorage.getItem('uid'),
      address: '',
      content: ''
    }
  },
  watch: {
    viewTimeInfo(val) {
      if (val) {
        let arr = val.content.split('&')
        this.address = arr[0]
        this.content = arr[3]
      }
    }
  },
  created() {},
  methods: {
    handleClose() {
      this.$parent.visible = false
    },
    changeAddress(val) {
      this.address = val.join(',')
    },
    submitForm() {
      let date = this.formMember.date + this.formMember.time
      let date1 = this.$moment(date, 'YYYY-MM-DD HH:mm').valueOf()
      let address = this.address.join('/')
      date1 = date1 + ''
      let params = {
        time: date1.substring(0, 10),
        content: address + '/' + this.formMember.content
      }
      this.$refs['formMember'].validate(valid => {
        if (valid) {
          this.$emit('submitForm', params)
        } else {
          return false
        }
      })
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
  }
  .notice-footer-btn {
    // padding-right: 20px;
    .el-button {
      margin-right: 20px;
    }
  }
}
</style>