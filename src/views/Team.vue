<template>
  <div class="team-main-view">
    <el-container>
      <el-aside width="210px" class="team-aside">
        <component :is="aside"></component>
      </el-aside>
      <el-container>
        <el-header height="75px">
          <div style="height:37px;" class="x-flex-between team-header">
            <i class="el-icon-refresh-right"></i>
            <div class="x-flex-center">
              <el-link :underline="false" href="home">首页</el-link>
              <i class="el-icon-bell unRead"></i>
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
import companyAside from '@/components/companyAside'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
export default {
  name: 'team',
  data () {
    return {
      breadcrumb: [],
      type: 1,
      aside: ''
    }
  },
  components: {
    homeAside,
    Breadcrumb,
    companyAside
  },
  computed: {

  },
  created () {
    if (this.type == 1) {
      this.aside = 'homeAside'
    }
    else {
      this.aside = 'companyAside'
    }
    this.breadcrumb = JSON.parse(sessionStorage.getItem('menus'))
  }
}
</script>

<style scoped lang="scss">
.team-main-view{
  width: 100vw;
  height: 100vh;
  /* overflow-y: hidden; */
  /* overflow: auto; */
  overflow: hidden;
  position: relative;
  .unRead {
    margin: 0 10px;
  }
  .el-header {
    padding: 0;
  }
  .team-header {
    padding: 0 20px;
  }
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
