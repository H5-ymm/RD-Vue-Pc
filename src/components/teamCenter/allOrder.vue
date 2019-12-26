<style lang="scss">
.team-center-row{
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
      <orderTemplate :list="list" orderType="1"></orderTemplate>
    </el-col>
    <el-col :span="6">
      <orderTemplate :list="list" orderType="2"></orderTemplate>
    </el-col>
    <el-col :span="6">
      <orderTemplate :list="list" orderType="3"></orderTemplate>
    </el-col>
    <el-col :span="6">
      <orderTemplate :list="list" orderType="4"></orderTemplate>
    </el-col>
  </el-row>
</template>
<script>
import orderTemplate from './orderTemplate'
export default {
  components: {
    orderTemplate
  },
  data () {
    return {
      list: [{
        name: '杨萌萌',
        total: 203
      }, {
        name: '杨萌萌',
        total: 203
      }, {
        name: '杨萌萌',
        total: 203
      }, {
        name: '杨萌萌',
        total: 203
      }]
    }
  }
}
</script>