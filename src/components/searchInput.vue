<style lang="scss">
  .customize-search-box { 
    box-shadow:0px 1px 6px 0px rgba(88,88,90,0.1);
    width: 100%;
    .el-input__inner {
      border: none;
      outline: none;
      height: 48px;
    }
    .el-input__inner {
      &:focus,&:hover{
        border: none;
      }     
    }
    .search-btn {
      padding: 17px 48px;
      border-radius:0 5px 5px 0;
    }
    .select-input-box {
      border: 1px solid #eee;
      width: 100%;
      box-sizing: border-box;
      &:hover {
        border: 1px solid #1890ff;
      }
    }
  }
</style>
<template>
  <div class="customize-search-box x-flex-start-justify">
    <div class="x-flex-start-justify select-input-box">
      <el-select v-model="params.type" slot="prepend" style="width:140px" placeholder="请选择">
        <el-option label="职位搜索" :value="1"></el-option>
        <el-option label="企业搜索" :value="2"></el-option>
      </el-select>
      <el-input v-model="params.kew_name" placeholder="请输入内容"></el-input>
    </div>
    <el-button type="primary" @click="searchQuery" class="search-btn">搜索</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      params: {
        type: 1
      }
    }
  },
  methods: {
    searchQuery () {
      this.$emit('searchQuery', this.params)
    }
  },
}
</script>
