<style lang="scss">
.team-center-row{
  padding-bottom: 20px;
  .el-col {
    &:nth-last-of-type(1) {
      .team-center-content {
        border-right: none;
      }
    }
  }
} 
</style>
<template>
  <el-row :gutter="40" class="team-center-row">
    <el-col :span="6">
      <orderTemplate :list="orderData.remuse_rank" orderType="1"></orderTemplate>
    </el-col>
    <el-col :span="6">
      <orderTemplate :list="orderData.put_rank" orderType="2"></orderTemplate>
    </el-col>
    <el-col :span="6">
      <orderTemplate :list="orderData.getrank_view" orderType="3"></orderTemplate>
    </el-col>
    <el-col :span="6">
      <orderTemplate :list="orderData.getrank_entry" orderType="4"></orderTemplate>
    </el-col>
  </el-row>
</template>
<script>
import orderTemplate from './orderTemplate'
export default {
  components: {
    orderTemplate
  },
  props: ['orderData'],
  data () {
    return {
    }
  },
  created () {
    console.log(this.orderData)
  }
}
</script>