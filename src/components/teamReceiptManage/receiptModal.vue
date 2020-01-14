<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="receipt-dialog" :show-close="false">
    <div class="receipt-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>入职通知</p>
      </section>
      <section class="member-col3 bind-col3">
        <el-form :model="formMember" :inline="true" label-position="left" ref="formMember" class="demo-form-inline">
          <el-form-item label="入职时间">
            <div class="x-flex-start">
              <span>{{viewTimeInfo.entry_time}}</span>
            </div>
          </el-form-item>
          <el-form-item label="入职地点">
            <div class="x-flex-start">
              <span>{{address}}</span>
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
    <div slot="footer" class="notice-footer-btn">
      <el-button @click="handleClose">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ['dialogTableVisible', 'viewTimeInfo'],
  data () {
    return {
      formMember: {
        uid: localStorage.getItem('uid'),
      },
      uid: localStorage.getItem('uid'),
      address: '',
      content: ''
    }
  },
  created () {
  },
  watch: {
    viewTimeInfo (val) {
      if (val) {
        console.log(val)
        let arr = val.entry_comtent.split('&')
        this.address = arr[0].replace('\/\g', ',')
        this.content = arr[1]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    submitForm () {
      this.$refs['formMember'].validate((valid) => {
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
<style lang="scss">
.receipt-dialog {
  box-shadow:0px 1px 43px 0px rgba(51,51,51,0.3);
  border-radius:5px;
  .el-dialog__body,.el-dialog__header {
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
      background: #EBF4FB;
      padding: 18px 0 17px;
    }
    .el-form-item {
      width: 100%;
      .width400,.el-form-item__content {
        width: 400px;
      }
    }
    .address {
      margin-top: 6px;
    }
    .el-textarea__inner {
      height: 160px!important;
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
          width: 195px!important;
          .el-input__inner{ 
            width: 195px!important;     
          }
        }
        .el-input__inner{
          border-radius: 3px;
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