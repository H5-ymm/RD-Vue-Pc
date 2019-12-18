<template>
  <div class="breadcrumb" :class="{'ComBreadcrumb':type==1}">
    <el-row>
      <el-col :span="24" class="breadcrumb-bre">
        <div class="bg-purple-dark">
          <el-breadcrumb class="breadcrumb-bre-li">
            <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index">
              <el-tag closable>{{item}}</el-tag>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: [],
      type: localStorage.getItem('userType')
    }
  },
  created () {
    if (this.type == 1) {
      this.breadcrumbs = sessionStorage.getItem('menus') ? JSON.parse(sessionStorage.getItem('menus')) : ['新建接单']
    } else {
      this.breadcrumbs = sessionStorage.getItem('menus') ? JSON.parse(sessionStorage.getItem('menus')) : ['论坛列表']
    }
  },
  watch: {
    $route (to, from) {
      this.breadcrumbs = JSON.parse(sessionStorage.getItem('menus'))
    }
  }
}
</script>
<style lang="scss">
.breadcrumb{
  overflow: hidden;
  background:#F0F2F5;
  width: 100%;
  height: 36px;
  border:1px solid #eee;
   .el-breadcrumb__separator {
    position: absolute;
    z-index: -22;
  }
  .breadcrumb-bre{
    height: 36px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .breadcrumb-bre-li {
     line-height: 36px;
      .el-tag {
        height: 36px;
        border:none;
        border-top: 1px solid #1890FF;
        line-height: 36px;
        border-radius: 0;
        margin-right: 5px;
        background: #DCEEFE;
        color: #333333;
      }
  }
  &.ComBreadcrumb {
    .breadcrumb-bre-li {
       line-height: 36px;
      .el-tag {
        height: 36px;
        border:none;
        border-top: none;
        border-bottom: 2px solid #1890FF;
        line-height: 36px;
        border-radius: 0;
        padding:0;
        margin-left: 20px;
        background: #F0F2F5;
        color: #1890FF;
        .el-icon-close {
          display: none;
        }
      }
  }
  }
}
</style>
