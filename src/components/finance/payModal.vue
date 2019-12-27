<template>
  <el-dialog
    width="400px"
    title
    :visible.sync="dialogTableVisible"
    class="member-dialog"
    :show-close="false"
  >
    <div class="member-row pay-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>支付</p>
      </section>
      <section class="member-col3">
        <div class="x-flex-center">
          <p class="calc-time x-flex-center">
            <i class="el-icon-time"></i>
            <span class="pay-text">剩余支付时间</span>
            <span class="pay-time">29:53</span>
          </p>
        </div>
        <div class="personal-box">
          <div v-if="payInfo" class="qrcode-img">
            <p>￥50</p>
            <img :src="payInfo.qrcode" v-if="payInfo&&payInfo.qrcode" alt />
          </div>
          <p class="x-flex-center">
            <img :src="payInfo.iconUrl" v-if="payInfo&&payInfo.iconUrl" alt />
            <span class="pay-title">{{payInfo.title}}</span>
          </p>
          <p>订单编号：5770884354350913</p>
          <p>
            完成扫描支付后，若没有自动跳转
            <el-link type="primary" :underline="false">请点这里</el-link>
          </p>
        </div>
      </section>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTableVisible: false,
    payType: { type: Number, default: 1 },
    payInfo: { type: Object, default: {} },
  },
  data () {
    return {
      list: [
        'yyy', 'kkkk'
      ],
      checkList: [],
      name: ''
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    submit () {
      this.$emit('handleOk', this.checkList)
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
  .member-row {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #333333;
    padding: 0 0 10px;
    position: relative;
    &.pay-row {
      width: 100%;
      margin: 0 auto;
      padding-bottom: 20px;
      text-align: center;
      .member-col3 {
        line-height: 30px;
        font-size: 16px;
        .calc-time {
          .pay-text {
            margin: 0 6px;
          }
          .pay-time {
            color: #FE2A00;
            font-size: 22px;
          }
        }
        .pay-title {
          font-size: 20px;
          margin-left: 10px;
        }
        .qrcode-img {
          width: 180px;
          height: 170px;
          border-radius: 4px;
          border: 20px solid #22AB38;
          margin: 10px auto;
          padding: 20px 0;
          >img {
            width: 146px;
          }
        }
      }
    }
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .member-col3 {
      width: 82%;
      border-top: 1px solid #eee;
      padding-top: 10px;
      margin: 0 auto;
    }
  }
}
</style>

