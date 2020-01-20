<template>
  <el-dialog
    title="联系客服"
    :visible.sync="dialogTableVisible"
    width="340px"
    top="30vh"
    center
    class="customer-service"
    :before-close="handleClose"
  >
    <div class="customer-service-box">
      <div class="customer-service-centent">
        <img src="../../assets/img/kefuImg.png" alt />
      </div>
      <div v-if="info" slot="footer" class="customer-service-footer">
        <p>联系电话：{{info.customerTel}}</p>
        <p>QQ：{{info.customerQQ}}</p>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { getConfigInfo } from '@/api/home'
export default {
  props: ['dialogTableVisible', 'imgBg', 'title', 'okText', 'closeText'],
  data () {
    return {
      info: {}
    }
  },
  created(){
    this.getInfo()
  },
  methods: {
    getInfo(){
      getConfigInfo().then(res=>{
        this.info = res.data
      })
    },
    handleClose () {
      this.$parent.dialogTableVisible = false
    }
  },
};
</script>
<style lang="scss">
.customer-service {
  box-shadow:0px 6px 14px 1px rgba(134,133,133,0.3);
  border-radius:5px;
  z-index: 444;
  .el-dialog__title {
    color: #000;
  }
  .el-dialog__body {
    padding: 0;
  }
}
.customer-service-box {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.customer-service-centent {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  >img {
    width: 81px;
    height: 167px;
  }
}
.customer-service-centent .customer-service-title {
  font-size: 18px;
  color:#333;
  font-weight: bold;
  padding-top: 25px;
}
.customer-service .el-customer-service__body {
  padding: 25px
}
.customer-service-footer {
  padding: 0 20px 20px;
  color: #6A6A6A;
}
</style>
