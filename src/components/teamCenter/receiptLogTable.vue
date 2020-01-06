<template>
  <el-table border :data="tableData" ref="multipleTable" style="width: 100%">
    <el-table-column label="日志时间" sortable align="center">
      <template slot-scope="props">
        <span>{{ props.row.addtime ? $moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'): '--'}}</span>
      </template>
    </el-table-column>
    <el-table-column label="简历" prop="username" align="center"></el-table-column>
    <el-table-column label="企业名称" prop="com_name" align="center"></el-table-column>
    <el-table-column label="操作内容" prop="title" align="center"></el-table-column>
    <el-table-column label="跟进人" prop="operator" align="center"></el-table-column>
  </el-table>
</template>
<script>
export default {
  props: ['tableData']
}
</script>