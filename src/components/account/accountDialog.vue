<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>{{title}}</p>
      </section>
      <section class="member-col3 bind-col3">
        <slot :name="slotName"></slot>
      </section>
    </div>
    <div slot="footer" v-if="isShowFooter" class="account-btn-box">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">绑定</el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    slotName: {
      type: String, 
      default: ''
    },
    title:{
      type: String, 
      default: ''
    },
    isShowFooter: {
      type: Boolean,
      default: true
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
    .el-button {
      border-radius: 3px;
      margin-right: 32px;
    }
  }
}
</style>