<template>
  <div class="company-aside">
    <!-- 侧边导航栏，需要给 具体 导航的 父级 加 class "acts" 则可以修改高亮状态 -->
    <!-- 关于 三级路由  不匹配侧边栏的问题，需要 对 返回的路由对象 进行重新改写,见 computed=> routerli -->
    <el-row class="tac">
      <el-col :span="24">
        <div class="names company-names">人事达</div>
        <div class="company-info">
          <img src="../assets/img/img1.png" alt class="company-logo" v-if="baseInfo&&!baseInfo.logo_url" />
          <img src="../assets/img/headIcon2.png" alt class="company-logo" v-else />
          <p class="company-name" v-if="baseInfo">{{baseInfo.com_name}}</p>
        </div>
        <el-menu class="el-menu-vertical-demo" background-color="#262626" active-text-color="#1890FF" text-color="#fff" @open="handleOpen" :unique-opened="true" @close="handleClose" @select="selectMenus" router :default-active="routerli">
          <el-submenu :index="item.title" class="acts" v-for="(item,index) in menus" :key="index">
            <template slot="title">
              <!-- <i class="el-icon-collection"></i> -->
              <img :src="require(`../assets/img/companyIcon/icon${index+1}.png`)" alt="" v-if="title!=item.title" class="aside-icon">
              <img :src="require(`../assets/img/companyIcon/icon${index+1}_active.png`)" v-if="title==item.title" alt="" class="aside-icon">
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
import { getCompanyDetail } from '@/api/company'
import { getImgUrl } from '@/util/util'
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
              url: '/createOrderTaking'
            }
          ]
        },
        {
          title: '发单管理',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '审核发单',
              url: '/checkReceipt'
            },
            {
              title: '申请团队',
              url: '/applicationTeam'
            },
            {
              title: '人才简历',
              url: '/talentResume'
            },
            {
              title: '面试人才',
              url: '/interviewPersonnel'
            },
            {
              title: '入职名单',
              url: '/entryList'
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
        //       title: '交易记录',
        //       url: '/tradingRecord'
        //     },
        //   ]
        // },
        {
          title: '员工管理',
          icon: 'el-icon-collection-tag',
          submenu: [
            {
              title: '在职员工',
              url: '/onJobStaff?view=1'
            },
            {
              title: '离职员工',
              url: '/onJobStaff?view=2'
            }
          ]
        }
      ],
      title: '发单招聘',
      url: '',
      uid: localStorage.getItem('uid'),
      baseInfo: {}
    }
  },
  created () {
    let uid = localStorage.getItem('uid')
    this.getCompanyInfo(uid)
  },
  methods: {
    getImgUrl,
    getCompanyInfo (uid) {
      getCompanyDetail({ uid }).then(res => {
        this.baseInfo = res.data
        if (res.data && res.data.logo_url) {
          this.baseInfo.logo_url = this.getImgUrl(res.data.logo_url)
        }
        sessionStorage.setItem('baseInfo', JSON.stringify(this.baseInfo))
        let userInfo = {
          user_name: res.data.com_name,
          mobile: res.data.link_phone,
          head_img: this.getImgUrl(res.data.logo_url)
        }
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
      this.title = key
    },
    handleClose (key, keyPath) {
      //console.log(key, keyPath);
    },
    selectMenus (key, keyPath) {
      this.url = key
      let arr = this.getMenusTitle(key, this.menus)
      sessionStorage.setItem('menusUrl', this.url)
      sessionStorage.setItem('menus', JSON.stringify(arr))
    },
    getMenusTitle (url, arr) {
      let title = ''
      let list = []
      arr.forEach(item => {
        item.submenu.forEach(val => {
          if (val.url == url) {
            title = val.title
            list.push(item.title, title)
          }
        })
      })
      return list
    }
  },
  watch: {
    $route (to, from) {
      if (to.path == '/interviewPersonnel' && from.path == '/talentResume') {
        this.selectMenus(to.path, this.menus)
      }
      if (to.path == '/entryList' && from.path == '/interviewPersonnel') {
        this.selectMenus(to.path, this.menus)
      }
    }
  },
  computed: {
    routerli () {
      // 对应路由
      // let pathStr = this.$route.path.split('/')
      return this.$route.path

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
  span {
    font-size: 16px;
  }
}
.el-submenu  .aside-icon {
  width: 17px;
  margin-right: 10px;
}
.el-menu-vertical-demo{
  border: 0px solid #ffffff;
  height: 100vh;
  overflow: auto;
}
.el-submenu .el-menu-item {
  min-width: 170px;
  font-size: 16px;
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
