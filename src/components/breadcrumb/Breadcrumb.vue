<template>
  <div class="breadcrumb">
    <el-row>
      <el-col :span="24" class="breadcrumb-bre">
        <div class="bg-purple-dark">
          <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-bre-li">
            <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['breadcrumbs'],
  created: function () {

  }
}
</script>
<style scoped>
.breadcrumb{
  overflow: hidden;
  background: #fff;
  width: 100%;
  height: 43px;
}
.breadcrumb-bre{
  height: 43px;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 10px;
}
.breadcrumb-bre-li{
  line-height: 43px;
}

</style>
