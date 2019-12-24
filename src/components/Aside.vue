<template>
  <div class="hello">
    <!-- 侧边导航栏，需要给 具体 导航的 父级 加 class "acts" 则可以修改高亮状态 -->
    <!-- 关于 三级路由  不匹配侧边栏的问题，需要 对 返回的路由对象 进行重新改写,见 computed=> routerli -->
    <el-row class="tac">
      <el-col :span="24">
        <div class="names">人事达</div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#000"
          active-text-color="#1890FF"
          text-color="#fff"
          @open="handleOpen"
          :unique-opened="true"
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
export default {
  name: 'Aside',
  props: {

  },
  data () {
    return {
      menus: [
        {
          title: '团队论坛',
          icon: 'el-icon-collection',
          submenu: [
            {
              title: '论坛列表',
              url: '/commonts'
            }
          ]
        },
        {
          title: '团队管理',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '成员管理',
              url: '/userlist'
            }
          ]
        },
        {
          title: '接单管理',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '申请接单',
              url: '/teamApplication'
            },
            {
              title: '输送人才',
              url: '/teamInterviewPersonnel'
            },
            {
              title: '面试结果',
              url: '/resumeResult'
            },
            {
              title: '入职名单',
              url: '/teamEntryList'
            },
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
              title: '基本信息',
              url: '/accountSettings'
            }
          ]
        },
        {
          title: '账户安全',
          icon: 'el-icon-collection-tag',
          submenu: [
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
          title: '简历管理',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '新增简历',
              url: '/addResume'
            },
            {
              title: '报名简历',
              url: '/applyResume?view=1'
            },
            {
              title: '入职结果',
              url: '/applyResume?view=2'
            },
            {
              title: '在职简历',
              url: '/onTheJobResumes'
            },
            {
              title: '离职简历',
              url: '/dimissionResume'
            }
            ,
            {
              title: '放弃简历',
              url: '/waiverOfResume?view=1'
            },
            {
              title: '还原简历',
              url: '/waiverOfResume?view=2'
            },
          ]
        },
        {
          title: '我的收藏',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '收藏职位',
              url: '/collectJob'
            },
            {
              title: '成员推荐',
              url: '/userRecommend'
            },
          ]
        },
        {
          title: '内部发单',
          icon: 'el-icon-collection-tag',
          submenu: [

            {
              title: '管理内部职位',
              url: '/publishJobList?view=1'
            },
            {
              title: '已发布职位',
              url: '/publishJobList?view=2'
            },
            {
              title: '已推荐简历',
              url: '/applyResume?view=3'
            },
            {
              title: '领取发单',
              url: '/collectingInvoice'
            },
            {
              title: '内部审核简历',
              url: '/checkResume'
            }
          ]
        },
        {
          title: '财务管理',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '我的账户',
              url: '/myAccount'
            },
            {
              title: '充值',
              url: '/deposit'
            },
            {
              title: '提现',
              url: '/withdraw'
            },
            {
              title: '转账',
              url: '/transfer'
            },
            {
              title: '交易记录',
              url: '/tradingRecord'
            }
          ]
        }
      ],
      title: ''
    }
  },
  methods: {
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
<style>
.hello {
  height: 100%;
  background: #000;
}
.el-submenu {
  padding-right: 20px;
}
.el-menu-vertical-demo{
  border: 0px solid #ffffff;
  height: 100%;
}
.el-submenu .el-menu-item {
  min-width: 170px;
}
.el-menu-item {
  background-color: rgba(0, 0, 0, 0.1) !important;
  padding-left: 50px!important;
  box-sizing: border-box;
  margin-right: 30px;
}
.el-menu-item.is-active {
  background:#1890FF!important;
  border-right: 4px solid #1890FF;
  color: #fff!important;
}
.names{
  width: 100%;
  height: 60px;
  text-align: center;
  color: #fff;
  background:#20222A;
  height:46px;
  line-height: 46px;
}
</style>
