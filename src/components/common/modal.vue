<style lang="scss">
.member-dialog {
  box-shadow: 0px 1px 43px 0px rgba(51, 51, 51, 0.3);
  border-radius: 5px;
  .el-dialog__body,
  .el-dialog__header {
    padding: 0;
  }
  .member-row {
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
      &.dep-col1 {
        background: #5a5a5a;
        padding: 18px 0 17px;
      }
    }
    .member-col3 {
      width: 100%;
      border-top: 1px solid #eee;
      padding-top: 10px;
      &.department-add-col3 {
        > p {
          color: #000000;
          font-size: 14px;
          margin: 20px 0;
        }
      }
    }
  }
  .dep-footer {
    display: flex;
    justify-content: space-between;
    margin: 10px 15px;
    .el-button {
      padding: 10px 20px;
    }
  }
}
</style>
<template>
  <el-dialog
    width="380px"
    top="30vh"
    :visible="dialogTableVisible"
    class="member-dialog dep-dialog"
    :show-close="false"
    center
  >
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt="" class="cancel-icon" @click="handleClose">
      <section class="member-col1 dep-col1"></section>
      <section class="member-col3 department-add-col3">
        <p v-html="modalObj.content"></p>
        <el-radio v-model="radio" label="1" v-if="isShow">本次登录不在提示</el-radio>
      </section>
    </div>
    <div slot="footer" class="dep-footer">
      <el-button @click="handleClose" v-if="modalObj.closeText">{{modalObj.closeText}}</el-button>
      <el-button type="primary" @click="handleOk" v-if="modalObj.okText">{{modalObj.okText}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTableVisible: false,
    modalObj: { type: Object, default: {} },
    isShow: false
  },
  data() {
    return {
      radio: true
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    handleOk() {
      this.$emit('handleOk')
    }
  }
}
</script>
