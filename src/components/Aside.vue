<template>
  <div class="hello">
    <!-- 侧边导航栏，需要给 具体 导航的 父级 加 class "acts" 则可以修改高亮状态 -->
    <!-- 关于 三级路由  不匹配侧边栏的问题，需要 对 返回的路由对象 进行重新改写,见 computed=> routerli -->
    <el-row class="tac">
      <el-col :span="24">
        <div class="names">人事达</div>
        <el-menu class="el-menu-vertical-demo" background-color="#000" active-text-color="#1890FF" text-color="#fff" @open="handleOpen" :unique-opened="true" @select="selectMenus" router :default-active="routerli">
          <el-submenu :index="item.title" class="acts" v-for="(item,index) in menus" :key="index">
            <template slot="title">
              <img :src="require(`../assets/img/teamIcon/icon${index+1}.png`)" alt="" class="aside-icon">
              <!-- <i class="el-icon-collection"></i> -->
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index="val.url" :class="{'is-active':url==val.url}" v-for="(val,ind) in item.submenu" :key="ind" :route="val.url">{{val.title}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Aside',
  props: ['userPosition'],
  data() {
    return {
      menus: [
        {
          title: '团队中心',
          icon: 'el-icon-collection',
          submenu: [
            {
              title: '团队中心',
              url: '/teamData'
            },
            {
              title: '团队排名',
              url: '/teamOrder'
            }
          ]
        },
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
          submenu: []
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
              title: '面试结果',
              url: '/applyResume?view=3'
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
            },
            {
              title: '放弃简历',
              url: '/waiverOfResume?view=1'
            },
            {
              title: '已删除简历',
              url: '/waiverOfResume?view=2'
            }
          ]
        },
        {
          title: '我的收藏',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '收藏职位',
              url: '/collectJob'
            }
          ]
        },
        {
          title: '内部发单',
          icon: 'el-icon-collection-tag',
          submenu: []
        }
        // {
        //   title: '财务管理',
        //   icon: 'el-icon-collection-tag',
        //   submenu: [
        //     {
        //       title: '我的账户',
        //       url: '/myAccount'
        //     },
        //     {
        //       title: '充值',
        //       url: '/deposit'
        //     },
        //     {
        //       title: '提现',
        //       url: '/withdraw'
        //     },
        //     {
        //       title: '转账',
        //       url: '/transfer'
        //     },
        //     {
        //       title: '交易记录',
        //       url: '/tradingRecord'
        //     }
        //   ]
        // }
      ],
      root: {
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
      collect: {
        title: '成员推荐',
        url: '/userRecommend'
      },
      job: [
        {
          title: '已发布职位',
          url: '/publishJobList?view=2'
        },
        {
          title: '已推荐简历',
          url: '/putList'
        }
      ],
      internalInvoiceRoot: [
        {
          title: '领取发单',
          url: '/collectingInvoice'
        },
        {
          title: '已发布职位',
          url: '/publishJobList?view=2'
        },
        {
          title: '管理内部职位',
          url: '/publishJobList?view=1'
        },
        {
          title: '内部审核简历',
          url: '/checkResumeInvoice'
        },
        {
          title: '已推荐简历',
          url: '/putList'
        }
      ],
      receiptRoot: [
        {
          title: '申请接单',
          url: '/teamApplication'
        },
        {
          title: '接单分配',
          url: '/receiptTable'
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
        }
      ],
      receiptRoot2: [
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
        }
      ],
      receiptRoot1: [
        {
          title: '接单分配',
          url: '/receiptTable'
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
        }
      ],
      title: '',
      url: '',
      userP: 0
    }
  },
  created() {
    this.userP = this.userPosition
    let teamType = localStorage.getItem('teamType')
    let teamId = localStorage.getItem('uid')
    if (this.userP == 1) {
      if (teamType == 1) {
        this.root.submenu[0].url = `/teamCompanyForm?teamId=${teamId}&type=${teamType}`
      } else if (teamType == 2) {
        this.root.submenu[0].url = `/personalForm?teamId=${teamId}&type=${teamType}`
      } else {
        this.root.submenu[0].url = `/teamSetting`
      }
      this.menus.splice(4, 0, this.root)
      this.menus.forEach((item, index) => {
        if (item.title == '接单管理') {
          this.menus[index].submenu = [...this.receiptRoot]
        }
        if (item.title == '内部发单') {
          this.menus[index].submenu = [...this.internalInvoiceRoot]
        }
      })
    }
    if (this.userP == 2) {
      this.menus.forEach((item, index) => {
        if (item.title == '团队设置') {
          this.menus.splice(index, 1)
        }
        if (item.title == '接单管理') {
          this.menus[index].submenu = [...this.receiptRoot1]
        }
        if (item.title == '内部发单') {
          this.menus[index].submenu = [...this.internalInvoiceRoot]
        }
      })
    }
    if (this.userP == 3) {
      this.menus.forEach((item, index) => {
        if (item.title == '团队设置') {
          this.menus.splice(index, 1)
        }
        if (item.title == '接单管理') {
          this.menus[index].submenu = [...this.receiptRoot2]
        }
        if (item.title == '内部发单') {
          this.menus[index].submenu = [...this.job]
        }
      })
    }
  },
  watch: {
    userPosition(val) {
      this.userP = val
      let teamType = localStorage.getItem('teamType')
      let teamId = localStorage.getItem('uid')
      if (val == 1) {
        if (teamType == 1) {
          this.root.submenu[0].url = `/teamCompanyForm?teamId=${teamId}&type=${teamType}`
        } else if (teamType == 2) {
          this.root.submenu[0].url = `/personalForm?teamId=${teamId}&type=${teamType}`
        } else {
          this.root.submenu[0].url = `/teamSetting`
        }
        this.menus.splice(4, 0, this.root)
        this.menus.forEach((item, index) => {
          if (item.title == '接单管理') {
            this.menus[index].submenu = [...this.receiptRoot]
          }
          if (item.title == '内部发单') {
            this.menus[index].submenu = [...this.internalInvoiceRoot]
          }
        })
      }
      if (val == 2) {
        this.menus.forEach((item, index) => {
          if (item.title == '团队设置') {
            this.menus.splice(index, 1)
          }
          if (item.title == '接单管理') {
            this.menus[index].submenu = [...this.receiptRoot1]
          }
          if (item.title == '内部发单') {
            this.menus[index].submenu = [...this.internalInvoiceRoot]
          }
        })
      }
      if (val == 3) {
        this.menus.forEach((item, index) => {
          if (item.title == '团队设置') {
            this.menus.splice(index, 1)
          }
          if (item.title == '接单管理') {
            this.menus[index].submenu = [...this.receiptRoot2]
          }
          if (item.title == '内部发单') {
            this.menus[index].submenu = [...this.job]
          }
        })
      }
    },
    $route(to, from) {
      if (to.path == '/commonTableList' && from.path == '/teamEntryList') {
        this.selectMenus(to.fullPath, this.menus)
      }
      if (to.path == '/teamEntryList' && from.path == '/resumeResult') {
        this.selectMenus(to.fullPath, this.menus)
      }
      if (
        to.path == '/resumeResult' &&
        from.path == '/teamInterviewPersonnel'
      ) {
        this.selectMenus(to.fullPath, this.menus)
      }
      if (to.path == '/putList' && from.path == '/publishJobList') {
        console.log(to.fullPath)
        this.selectMenus(to.fullPath, this.menus)
      }
      if (to.path == '/accountSafe' && from.path == '/passwordManage') {
        this.selectMenus(to.fullPath, this.menus)
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    selectMenus(key, keyPath) {
      this.url = key
      let arr = this.getMenusTitle(key.split('?')[0], this.menus)
      sessionStorage.setItem('menusUrl', this.url)
      sessionStorage.setItem('menus', JSON.stringify(arr))
    },
    getMenusTitle(url, arr) {
      let title = ''
      let list = []
      arr.forEach(item => {
        item.submenu.forEach(val => {
          if (val.url == url) {
            title = val.title
            list.push(title)
          }
        })
      })
      return list
    }
  },
  computed: {
    routerli() {
      // 对应路由
      console.log(this.$route)
      // let pathStr = this.$route.path.split('/')
      return this.$route.fullPath
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
  font-size: 16px;
}
.el-submenu .aside-icon {
  width: 18px;
  margin-right: 10px;
}
.el-menu-vertical-demo {
  border: 0px solid #ffffff;
  height: 100vh;
  overflow: auto;
}
.el-submenu .el-menu-item {
  min-width: 170px;
  font-size: 16px;
}
.el-menu-item {
  background-color: rgba(0, 0, 0, 0.1) !important;
  padding-left: 50px !important;
  box-sizing: border-box;
  margin-right: 30px;
}
.el-menu-item.is-active {
  background: #1890ff !important;
  border-right: 4px solid #1890ff;
  color: #fff !important;
}
.names {
  width: 100%;
  height: 60px;
  text-align: center;
  color: #fff;
  background: #20222a;
  height: 46px;
  line-height: 46px;
}
</style>
