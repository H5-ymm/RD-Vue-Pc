
<style lang="scss">
  .team-center-section {
    background: #fff;
    padding: 20px 15px 0;
    height:90%;
    .team-center-table {
      margin: 20px 0;
    }
  }
</style>
<template>
  <div class="team-center-section">
    <el-date-picker
      v-model="date"
      class="daterange"
      type="daterange"
      value-format="timestamp"
      value="yyyy-mm-dd"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
    <div class="team-center-table">
      <component :is="componentId"></component>
    </div>
    <el-pagination
      class="team-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="params.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import logTable from './logTable'
import receiptLogTable from './receiptLogTable'
export default {
  components: {
    logTable,
    receiptLogTable
  },
  data () {
    return {
      date: [],
      componentId: 'logTable',
      params: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0
    }
  },
  watch: {
    $route (to, from) {
      this.componentId = to.query.view
    }
  },
  methods: {
    handleSizeChange (val) {
      this.params.limit = val
      this.getList(this.params)
    },
    handleCurrentChange (val) {
      this.params.page = val
      this.getList(this.params)
    },
  }
}
</script>