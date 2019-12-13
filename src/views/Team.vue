<template>
  <div class="team-main-view">
    <el-container>
      <el-aside width="210px" class="team-aside">
        <component :is="aside"></component>
      </el-aside>
      <el-container>
        <el-header :height="height">
          <div class="x-flex-between team-header" :class="{'comany-team-header': type==2}">
            <i class="el-icon-refresh-right" v-if="type==1"></i>
            <el-link :underline="false" v-else>首页</el-link>
            <div class="x-flex-center">
              <el-link :underline="false" href="home" v-if="type==2">首页</el-link>
              <el-badge :value="200" :max="99" class="item">
                <i class="el-icon-bell unRead"></i>
              </el-badge>
              <span>天天向上团队</span>
            </div>
          </div>
          <breadcrumb :breadcrumbs="breadcrumb"></breadcrumb>
        </el-header>
        <el-main class="team-main" :class="{'comany-main-page': type==2}">
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
      type: 2,
      aside: '',
      height: ''
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
      this.height = "75px"
    }
    else {
      this.aside = 'companyAside'
      this.height = "90px"
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
    margin: 0 20px;
  }
  .el-header {
    padding: 0;
  }
  .team-header {
    padding: 0 20px;
    height: 36px;
    &.comany-team-header{
       height: 50px;
    }
  }
}
.team .team-header {
  padding: 0 38px;
}
.team-aside{
  overflow: hidden;
}
.team-main{
  height: 100vh;
  /* overflow: hidden; */
  background: #F0F2F5;
  padding: 10px 30px;
  box-sizing: border-box;
  &.comany-main-page {
    padding: 0 ;
  }
}
</style>
