<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>添加组员</p>
      </section>
      <section class="member-col3 bind-col3">
        <slot :name="slotName"></slot>
      </section>
    </div>
    <div slot="footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">绑定</el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  props: ['dialogTableVisible', 'isShowFooter', 'slotName'],
  data () {
    var validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号码'));
      } else {
        if (!validateIdCard(value)) {
          callback(new Error('请输入正确的身份证号码'));
        }
        callback()
      }
    };
    return {
      formMember: {
        region: '',
        status: 1,
        user_name: '',
        id_card: '',
        mobile: '',
        education: '',
        grade_id: '',
        provinceid: '',
        cityid: '',
        three_cityid: '',
        uid: localStorage.getItem('uid'),
      }
    }
  },
  created () {

  },
  methods: {
    handleClose () {
      this.$parent.visible = false
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
          margin-left: -80px!important;
          .el-input,.el-select {    
            width: 400px;
            margin-left: 0;
            border-radius:3px;
          }
          .el-input__suffix {
            right: 60px;
          }
        }
      }
    }
  }
}
</style>