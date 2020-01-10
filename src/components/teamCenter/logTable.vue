<template>
  <el-table border :data="tableData" ref="multipleTable" style="width: 100%">
    <el-table-column label="日志时间" sortable align="center">
      <template slot-scope="props">
        <span>{{ props.row.ctime ? props.row.ctime: '--'}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作人" prop="actor" align="center"></el-table-column>
    <el-table-column label="所属部门" prop="content" align="center"></el-table-column>
    <el-table-column label="组员/简历/职位" prop="name" align="center"></el-table-column>
  </el-table>
</template>
<script>
export default {
  props: ['tableData']
}
</script>