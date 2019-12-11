<template>
  <div class="company-aside">
    <!-- 侧边导航栏，需要给 具体 导航的 父级 加 class "acts" 则可以修改高亮状态 -->
    <!-- 关于 三级路由  不匹配侧边栏的问题，需要 对 返回的路由对象 进行重新改写,见 computed=> routerli -->
    <el-row class="tac">
      <el-col :span="24">
        <div class="names company-names">仁事达</div>
        <div class="company-info">
          <img src="../assets/img/img1.png" alt class="company-logo" />
          <p class="company-name">仁达网络科技（上海） 有限公司</p>
        </div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#262626"
          active-text-color="#1890FF"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          @select="selectMenus"
          router
          :default-active="routerli"
        >
          <el-submenu :index="item.title" class="acts" v-for="(item,index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-collection"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              :index="val.title"
              :class="{'is-active':title==val.title}"
              v-for="(val,ind) in item.submenu"
              :key="ind"
              :route="val.url"
            >{{val.title}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { companyBinkInfo } from '../api/user'
export default {
  name: 'companyAside',
  props: {

  },
  data () {
    return {
      menus: [
        {
          title: '发单招聘',
          icon: 'el-icon-collection',
          submenu: [
            {
              title: '新建接单',
              url: '/commonts'
            }
          ]
        },
        {
          title: '发单管理',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '成员管理',
              url: '/userlist'
            }
          ]
        },
        {
          title: '团队设置',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '团队信息',
              url: '/teamSetting'
            },
            {
              title: '部门管理',
              url: '/department'
            }
          ]
        },
        {
          title: '账户设置',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '账户资料',
              url: '/companyForm'
            },
            {
              title: '密码管理',
              url: '/passwordManage'
            },
            {
              title: '账户绑定',
              url: '/accountSafe'
            }
          ]
        },
        {
          title: '财务',
          icon: 'el-icon-collection-tag',
          submenu: [

          ]
        }
      ],
      title: '',
      uid: localStorage.getItem('uid')
    }
  },
  created () {
    // this.getCompanyBind(this.uid)
  },
  methods: {
    getCompanyBind (uid) {
      companyBinkInfo({ uid }).then(res => {
        console.log(res)
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      //console.log(key, keyPath);
    },
    escUser () {
      window.localStorage.clear()
      window.sessionStorage.clear()
      this.$router.push('/load')
    },
    selectMenus (key, keyPath) {
      console.log(key, keyPath)
      this.title = key
      let arr = [key]
      sessionStorage.setItem('menus', JSON.stringify(arr))
    }
  },
  computed: {
    routerli () {
      // 对应路由
      let pathStr = this.$route.path.split('/')
      console.log(pathStr)
      return '/' + pathStr[1]

    },
    names () {
      return this.$store.state.user.users
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.company-aside {
   height: 100%;
   background: #32373E;
  .el-menu-item.is-active {
    background:#1890FF!important;
    border-right: 4px solid #06ADFB;
    box-sizing: border-box;
    color: #fff;
    padding-left: 50px!important;
    margin-right: 0;
  }
  .is-opened {
    .el-submenu__title {
      color: #1890FF!important;
    }
    i {
      color: #1890FF!important;
    }
  }
}
.el-submenu {
  padding-right:0;
}
.el-menu-vertical-demo{
  border: 0px solid #ffffff;
  height: 100%;
}
.el-submenu .el-menu-item {
  min-width: 170px;
}

.names {
  &.company-names {
    background: #1890FF;
    font-size:26px;
    font-weight: bold;
    color: #fff;
    height:50px;
    line-height: 50px;
  }
}
.company-info {
  text-align: center;
  height: 120px;
  width: 100%;
  margin: 20px auto 40px;
  .company-logo {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    margin: 10px auto;
  }
  .company-name {
    font-size:14px;
    color: #fff;
    width: 140px;
    margin-left: 35px;
  }
}
</style>
