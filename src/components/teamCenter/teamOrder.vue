<style lang="scss">
  .team-center-section {
    background: #fff;
    padding: 20px 15px 0;
    height:90%;
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
  <div class="team-center-section">
    <orderQuery></orderQuery>
    <allOrder></allOrder>
  </div>
</template>
<script>
import allOrder from './allOrder'
import orderQuery from './orderQuery'
export default {
  components: {
    orderQuery,
    allOrder
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