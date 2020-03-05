<style lang="scss">
.dialog {
  box-shadow: 0px 6px 14px 1px rgba(134, 133, 133, 0.3);
  border-radius: 5px;
  .el-dialog__headerbtn {
    z-index: 222;
  }
}
.dialog-centent {
  width: 100%;
  margin: 0 auto;
  position: relative;
  text-align: center;
  .dialog-img {
    width: 100%;
    height: 203px;
    margin: -20px auto 20px;
  }
  .dialog-row {
    position: absolute;
    left: 8%;
    bottom: 0;
  }
  .dialog-title {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    padding-top: 0;
  }
  .dialog-subtitle {
    color: #333333;
    font-size: 14px;
    width: 80%;
    margin: 10px auto;
  }
}
.info-dialog {
  .el-dialog__body {
    padding: 0 25px;
  }
}
.dialog-footer {
  padding: 0 20px 20px;
}
.dialog-footer .el-button {
  width: 100px;
  padding: 8px 20px;
  margin: 0 15px;
}
</style>

<template>
  <el-dialog title :visible.sync="centerDialogVisible" top="35vh" width="340px" center :show-close="false" :before-close="handleClose" class="dialog info-dialog">
    <div class="dialog-centent">
      <img :src="modalInfo.imgBg" class="dialog-img" alt />
      <div class="dialog-row">
        <p class="dialog-title">{{modalInfo.title}}</p>
        <p class="dialog-subtitle">请先完善您的资料，才能进行下一步操作。</p>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" v-if="modalInfo.okText" @click="handleOk">{{modalInfo.okText}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['centerDialogVisible', 'modalInfo'],
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    handleOk() {
      let teamType = localStorage.getItem('teamType')
      let teamId = localStorage.getItem('uid')
      if (teamType == 1) {
        this.$router.push(`/teamCompanyForm?teamId=${teamId}&type=${teamType}`)
      } else if (teamType == 2) {
        this.$router.push(`/personalForm?teamId=${teamId}&type=${teamType}`)
      } else {
        this.$router.push('/teamSetting')
      }
      this.$emit('handleClose')
    }
  }
}
</script>
