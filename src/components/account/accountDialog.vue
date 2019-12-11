<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>{{title}}</p>
      </section>
      <section class="member-col3 bind-col3">
        <!-- <keep-alive> -->
        <component
          :is="slotName"
          :mobile="mobile"
          @submitForm="submitForm"
          @handleClose="handleClose"
          :isUpdate="isUpdate"
        ></component>
        <!-- </keep-alive> -->
      </section>
    </div>
  </el-dialog>
</template>
<script>
import bindPhone from './bindPhone'
import bindWx from './bindWx'
import bindBank from './bindBank'
import bindEmail from './bindEmail'
import bindZfb from './bindZfb'
import setUserPas from './setUserPas'
import setZfbPas from './setZfbPas'
export default {
  components: {
    bindPhone,
    bindWx,
    bindBank,
    bindEmail,
    bindZfb,
    setZfbPas,
    setUserPas
  },
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    slotName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    isShowFooter: {
      type: Boolean,
      default: true
    },
    mobile: {
      type: String,
      default: ''
    },
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formMember: {
        uid: localStorage.getItem('uid'),
      }
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$parent.dialogTableVisible = false
    },
    submitForm (val) {
      console.log(val)
      this.$emit('submitForm', val)
      // this.$refs['formMember'].validate((valid) => {
      //   if (valid) {
      //     this.$emit('submitForm', this.formMember)
      //   } else {
      //     return false
      //   }
      // })
    }
  }
}
</script>
<style lang="scss">
.member-dialog{
  .member-row {
    .bind-col3 {
      .account-bind.demo-form-inline {
        .el-form-item__content {
          margin-left: 0!important;
          .bind-input-code {
            display: inline-block;
            &.el-input {
              width: 280px;
            }
            .el-input__inner {
              width: 280px!important;
            }
          }
          .el-radio-group {
            margin-left: 0;
          }
          .el-input__inner {
            width: 400px!important;
            border-radius: 3px;
          }
          .el-radio__label {
            float: left;
            margin-left: 10px;
          }
          .el-radio.is-bordered {
            width: 195px;
            height: 42px;
            line-height: 42px;
          }
          .el-input,.el-select {     
            margin-left: 0;
            border-radius:3px;
          }
          .el-input__suffix {
            right: 10px;
          }
        }
      }
    }
  }
  .code-btn {
    &.el-button--primary.is-plain {
      background: #fff;
      border: 1px solid #1890ff;
    }
    padding: 10px 20px;
    border-radius:3px;
    margin-left: 10px;
  }
  .account-btn-box {
    padding: 10px 0;
    .el-button {
      border-radius: 3px;
      margin-right: 30px;
      &.el-button--primary.is-plain {
        &:hover{
          color: #1890ff;
        }
      }
    }
  }
}
</style>