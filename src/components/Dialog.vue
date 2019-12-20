<template>
  <el-dialog
    title
    :visible.sync="centerDialogVisible"
    top="35vh"
    width="340px"
    center
    class="dialog"
  >
    <div class="dialog-centent">
      <img :src="modalInfo.imgBg" alt />
      <p class="dialog-title">{{modalInfo.title}}</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" type="primary" plain>{{modalInfo.closeText}}</el-button>
      <el-button type="primary" @click="handleCloseOk">{{modalInfo.okText}}</el-button>
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
<style>
.dialog {
  box-shadow:0px 6px 14px 1px rgba(134,133,133,0.3);
  border-radius:5px;
}
.dialog-centent {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.dialog-centent .dialog-title {
  font-size: 18px;
  color:#333;
  font-weight: bold;
  padding-top: 25px;
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
