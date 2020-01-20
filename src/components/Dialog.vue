<style lang="scss">
.dialog {
  box-shadow:0px 6px 14px 1px rgba(134,133,133,0.3);
  border-radius:5px;
}
.dialog-centent {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  .dialog-title {
    font-size: 18px;
    color:#333;
    font-weight: bold;
    padding-top: 25px;
  }
  .dialog-subtitle {
    color: #333333;
    font-size: 14px;
    width: 80%;
    margin: 10px auto;
  }
}
.dialog .el-dialog__body {
  padding: 25px
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
  <el-dialog
    title
    :visible.sync="centerDialogVisible"
    top="35vh"
    width="340px"
    center
    :before-close="handleClose"
    class="dialog"
  >
    <div class="dialog-centent">
      <img :src="modalInfo.imgBg" class="dialog-img" alt />
      <p class="dialog-title">{{modalInfo.title}}</p>
      <p v-if="!modalInfo.closeText&&!modalInfo.okText" class="dialog-subtitle">账号已锁定，不能登录，请后台设置登录权限</p>
      <p v-if="modalInfo.okText=='前去完善'" class="dialog-subtitle">请先完善您的资料，才能进行下一步操作。</p>
    </div>
    <span slot="footer" class="dialog-footer" v-if="modalInfo.closeText&&modalInfo.okText">
      <el-button  @click="handleClose" type="primary" plain>{{modalInfo.closeText}}</el-button>
      <el-button type="primary" v-if="modalInfo.okText" @click="handleOk">{{modalInfo.okText}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['centerDialogVisible', 'modalInfo'],
  data () {
    return {

    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    handleOk () {
      this.$emit('handleOk')
    },
  },
};
</script>