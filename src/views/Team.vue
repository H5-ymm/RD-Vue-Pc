<template>
  <div class="team-main-view">
    <el-container>
      <el-aside width="210px" class="team-aside">
        <home-aside></home-aside>
      </el-aside>
      <el-container>
        <el-header height="75px">
          <div style="height:37px;" class="x-flex-between team-header">
            <i class="el-icon-refresh-right"></i>
            <div>
              <el-link :underline="false">首页</el-link>
              <i class="el-icon-bell"></i>
              <span>天天向上团队</span>
            </div>
          </div>
          <breadcrumb :breadcrumbs="breadcrumb"></breadcrumb>
        </el-header>
        <el-main class="team-main">
          <router-view class="team-box"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import homeAside from '@/components/Aside' //侧边栏
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
export default {
  name: 'team',
  data () {
    return {
      breadcrumb: [],
    }
  },
  components: {
    homeAside,
    Breadcrumb
  },
  computed: {

  },
  created () {
    this.breadcrumb = JSON.parse(sessionStorage.getItem('menus'))
  }
}
</script>

<style scoped>
.team-main-view{
  width: 100vw;
  height: 100vh;
  /* overflow-y: hidden; */
  /* overflow: auto; */
  overflow: hidden;
  position: relative;
}
.team .el-header {
  padding: 0;
}
.team .team-header {
  padding: 0 38px;
}
.team-aside{
  /* height: 100vh; */
  overflow: hidden;
}
.team-main{
  height: 100vh;
  /* overflow: hidden; */
  background: #F0F2F5;
  padding: 10px 30px;
  box-sizing: border-box;
}
.team-box{
  /* background: #ffffff; */
  /* height: calc(100% - 20px); */
  /* padding: 10px; */
}
</style>
