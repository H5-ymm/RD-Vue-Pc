<template>
  <div class="table dep-table">
    <el-table border="" :data="tableData" ref="multipleTable" style="width: 100%">
      <el-table-column label="部门名称" prop="depart_name" align="center" width="150"></el-table-column>
      <el-table-column label="部门经理" prop="user_name" align="center" width="150"></el-table-column>
      <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
      <el-table-column label="部门人数" prop="num" align="center" width="150"></el-table-column>
      <el-table-column label="添加日期" align="center" width="200">
        <template slot-scope="props">
          <span>{{ props.row.addtime ? $moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'): '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <div>
            <el-button @click="handleTurnover(scope.row)" type="text" size="small">人员调整</el-button>
            <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: ['tableData'],
  data() {
    return {
      memberInfo: {},
      teamId: '',
      uid: localStorage.getItem('uid')
    }
  },
  methods: {
    handleTurnover(row) {
      this.memberInfo = row
      this.teamId = row.uid
      sessionStorage.setItem('depId', row.id)
      this.$emit('handleTurnover', row.id)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('handleSelectionChange', this.multipleSelection.length)
    },
    handleDel(row) {
      this.$emit('handleDel', row.id)
    }
  }
}
</script>
<style lang="scss">
.table {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  &.dep-table {
    height: 60%;
    .table-list {
      height: 100%;
    }
    .el-table {
      height: 100%;
      .el-table__body-wrapper {
        height: 100%;
      }
    }
  }
}
</style>