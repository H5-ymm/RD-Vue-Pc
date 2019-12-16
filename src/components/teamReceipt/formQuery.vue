<template>
  <el-form
    :inline="true"
    label-width="100px"
    label-position="right"
    :model="formMember"
    class="demo-form-inline"
  >
    <el-form-item label="职位名称：">
      <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
      <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
    </el-form-item>
    <el-form-item label="状态筛选：">
      <el-button
        :type="activeIndex==index ?'primary':''"
        v-for="(item,index) in statusList"
        :key="index"
        plain
        @click="selectStatus(item,index)"
        class="select-status"
      >{{item.label}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      formMember: {}
    }
  },
  methods: {
    onSubmit () { }
  },
}
</script>