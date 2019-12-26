<template>
  <el-table border :data="tableData" ref="multipleTable" style="width: 100%">
    <el-table-column label="日志时间" sortable align="center">
      <template slot-scope="props">
        <span>{{ props.row.addtime ? $moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'): '--'}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作人" prop="mobile" align="center"></el-table-column>
    <el-table-column label="操作内容" prop="content" align="center"></el-table-column>
    <el-table-column label="组员/简历/职位" prop="num" align="center"></el-table-column>
  </el-table>
</template>
<script>
export default {
  props: ['tableData']
}
</script>