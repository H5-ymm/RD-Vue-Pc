<template>
  <div v-if="isShow">
    <ul class="fixed">
      <li>
        <a href="#header">
          <el-tooltip class="item" effect="dark" content="一键置顶" placement="left">
            <img src="../assets/img/top.png" alt="">
          </el-tooltip>
        </a>
      </li>
      <li @click="concat">
        <el-tooltip class="item" effect="dark" content="联系客服" placement="left">
          <img src="../assets/img/kefu.png" alt="">
        </el-tooltip>
      </li>
      <li class="help" @click="helpmodalVisible=true">
        <el-tooltip class="item" effect="dark" content="帮助反馈" placement="left">
          <img src="../assets/img/help.png" alt="">
        </el-tooltip>
      </li>
    </ul>
    <customerService :dialogTableVisible="dialogTableVisible"></customerService>
    <helpmodal
      :dialogTableVisible="helpmodalVisible"
      @submit="helpmodalVisible=false"
      @handleClose="helpmodalVisible=false"
    ></helpmodal>
  </div>
</template>
<script>
import customerService from './common/customerService'
import helpmodal from './common/helpmodal'
export default {
  components: {
    customerService,
    helpmodal
  },
  props: ['isShow'],
  data() {
    return {
      dialogTableVisible: false,
      helpmodalVisible: false
    }
  },
  methods: {
    concat() {
      this.dialogTableVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.fixed {
  position: fixed;
  right: 50px;
  bottom: 36%;
  z-index: 333;
  li {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    box-shadow: 0px 2px 10px 0px rgba(70, 70, 70, 0.1);
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.help {
      background: #1890ff;
    }
  }
}
</style>


