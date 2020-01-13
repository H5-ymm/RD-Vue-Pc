<template>
  <el-dialog width="600px" title :visible.sync="dialogTableVisible" class="member-dialog register-rule" :show-close="false">
    <div class="member-row job-info-box">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">人事达《用户协议及隐私政策》</section>
      <section class="rule-content-box">
        <div class="rule-content">
          请您仔细阅读。 人事达公司在此特别提醒用户认真阅读、充分理解最新的人事达
          《用户协议及隐私政策》的全部条款，特别是其中所涉及的免除、减轻人事达公司责任的条款、对用户权利限制条款、争议解决和法律适用等。其中，限制、免责条款可能以黑体加粗形式提示您重点注意。未阅读或拒绝接受本协议的所有条款的，您应立即停止使用人事达；若您继续使用人事达，即视为您已同意接受本协议。 尊敬的用户： 在您成为人事达注册用户，使用人事达提供的服务之前，请您认真阅读本《用户协议及隐私政策》，更好的了解我们所提供的服务以及您享有的权利和承担的义务。您开始使用人事达提供的服务，
          即表示您已经确认并接受了本文件中的全部条款
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
      if (val) {
        let params = {
          id: val,
          uid: localStorage.getItem('uid')
        }
        invoiceInfo(params).then(res => {
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

