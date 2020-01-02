<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="account-row">
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
  box-shadow:0px 1px 43px 0px rgba(51,51,51,0.3);
  border-radius:5px;
  .el-dialog__body,.el-dialog__header {
    padding: 0;
  }
  .account-row {
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
      background: #EBF4FB;
      padding: 18px 0 17px;
    }
    .member-col3 {
      &.bind-col3 {
        width: 82%;
        border-top: 1px solid #eee;
        padding-top: 10px;
        margin: 0 auto;
     }
    }
  }
  .code-btn {
    &.el-button--primary.is-plain {
      background: #fff;
      border: 1px solid #1890ff;
    }
    padding: 10px 18px;
    border-radius:3px;
    margin-left: 10px;
  }
  .account-btn-box {
    padding: 10px 0;
    .el-button {
      border-radius: 3px;
      margin-right: 12px;
      &.el-button--primary.is-plain {
        &:hover{
          color: #1890ff;
        }
      }
    }
  }
}
</style>