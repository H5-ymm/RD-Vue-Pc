
<style lang="scss">
.team-center-section {
  background: #fff;
  padding: 20px 15px;
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
    <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page" :page-sizes="[10, 30, 50, 100]" :page-size="params.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
  </div>
</template>
<script>
import logTable from './logTable'
import receiptLogTable from './receiptLogTable'
import { getapplyLog, getTeamLog } from '@/api/teamCenter'
export default {
  components: {
    logTable,
    receiptLogTable
  },
  data() {
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
  created() {
    this.componentId = this.$route.query.view
    this.getList(this.params)
  },
  methods: {
    getList(params) {
      if (this.componentId == 'logTable') {
        getTeamLog(params)
          .then(res => {
            this.tableData = res.data.data || []
            this.total = res.data.count
          })
          .catch(error => {
            if (error) {
              this.$message.warning(error.status.remind)
            }
          })
      } else {
        getapplyLog(params)
          .then(res => {
            this.tableData = res.data.data || []
            this.total = res.data.count
          })
          .catch(error => {
            if (error) {
              this.$message.warning(error.status.remind)
            }
          })
      }
    },
    changeDate(val) {
      this.params.starttime = val ? val[0] : ''
      this.params.endtime = val ? val[1] : ''
      this.getList(this.params)
    },
    handleSizeChange(val) {
      this.params.limit = val
      this.getList(this.params)
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getList(this.params)
    }
  }
}
</script>