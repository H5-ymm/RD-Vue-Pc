
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
    <el-date-picker v-model="date" class="daterange" @change="changeDate" type="daterange" value-format="timestamp" value="yyyy-mm-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
    <div class="team-center-table">
      <component :is="componentId" :tableData="tableData"></component>
    </div>
    <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10, 20, 30, 40]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
  </div>
</template>
<script>
import logTable from './logTable'
import receiptLogTable from './receiptLogTable'

import { getapplyLog } from '@/api/teamCenter'
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
      total: 0,
      tableData: []
    }
  },
  created () {
    this.getList(this.params)
  },
  watch: {
    $route (to, from) {
      console.log(to)
      this.componentId = to.query.view
      this.getList(this.params)
    }
  },
  methods: {
    getList (params) {
      getapplyLog(params).then(res => {
        this.tableData = res.data.data || []
        this.total = res.data.count
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    changeDate (val) {
      this.params.starttime = val[0]
      this.params.endtime = val[1]
      this.getList(this.params)
    },
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