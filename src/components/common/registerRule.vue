<template>
  <el-dialog width="600px" title :visible.sync="dialogTableVisible" class="member-dialog register-rule" :show-close="false">
    <div class="member-row job-info-box">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">人事达《用户协议及隐私政策》</section>
      <section class="rule-content-box">
        <div class="rule-content">
          为了保障您的合法权益，更好地向您提供人事达平台服务，根据我国法律法规及监管部门的要求，我们对人事达《用户协议及隐私政策》的部分条款进行了修订，
        </div>
      </section>
    </div>
  </el-dialog>
</template>
<script>
import { invoiceInfo } from '@/api/orderTarking'
export default {
  props: ['dialogTableVisible', 'id'],
  data () {
    return {
      jobInfo: {}
    }
  },
  created () {

  },
  computed: {
    rewardMoney () {
      if (this.id) {
        return this.jobInfo.money_type == 1 ? '月' : this.jobInfo.money_type == 2 ? '日' : '时'
      }
    }
  },
  watch: {
    id (val) {
      console.log(val)
      if (val) {
        let params = {
          id: val,
          uid: localStorage.getItem('uid')
        }
        invoiceInfo(params).then(res => {
          console.log(res)
          this.jobInfo = res.data
        })
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="scss">
.member-dialog {
  box-shadow:0px 1px 43px 0px rgba(51,51,51,0.3);
  border-radius:5px;
  .el-dialog__body,.el-dialog__header {
    padding: 0;
  }
  .member-col1 {
    background:#EBF4FB;
    padding: 21px 0 20px;
  }
  .rule-content-box {
    width: 82%;
    margin: 20px auto;
    color: #333333;
    font-size: 14px;
  }
  .rule-content {
    text-align: left;
  }
}
</style>

