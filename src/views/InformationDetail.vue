<style lang="scss">
 @import '@/assets/css/information.scss';
</style>
<template>
  <el-container class="orderTaking">
    <el-header class="header x-flex-around home" height="50px" id="header">
      <headerView></headerView>
    </el-header>
    <el-main class="orderTaking-main-content">
      <div class="orderTaking-main-list">
        <div class="orderTaking-main-row information-content">
          <div class="orderTaking-main-col1 information-main-col1">
            <section class="home-main-section info-detail-box">
              <div class="info-detail-header">
                <p class="info-title">{{info.title}}</p>
                <div class="x-flex-between">
                  <span>发布时间：{{info.time}}</span>
                  <span>来源：{{info.text}}</span>
                  <span>作者：{{info.user}}</span>
                  <span>浏览量：{{info.num}}</span>
                </div>
              </div>
              <div v-html="info.content" class="info-detail-content"></div>
            </section>
          </div>
          <div class="orderTaking-main-col2">
            <section class="home-main-section panel-content">
              <p class="home-main-title x-flex-start-justify">最新资讯</p>
              <div class="info-center-order">
                <ul class="info-center-content">
                  <li
                    class="x-flex-start-justify info-center-item"
                    v-for="(item,index) in list"
                    :key="index"
                  >
                    <div class="info-center-name">
                      <p class="text-line" :class="{'active':index<3}">{{item.name}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
        <section class="orderTaking-main-row information-content">
          <div class="orderTaking-main-col1 information-main-col1 information-main-col">
            <div class="home-main-section panel-content">
              <p>上一篇：当代职场人：7成人入职不满3年就跳槽</p>
              <p>下一篇：当代职场人：7成人入职不满3年就跳槽</p>
            </div>
          </div>
        </section>
      </div>
    </el-main>
    <FooterView></FooterView>
    <AsideBox :isShow="isShow"></AsideBox>
  </el-container>
</template>
<script>
// @ is an alias to /src
import homeAside from '@/components/Aside' //侧边栏
import Panel from '@/components/Panel'
import AsideBox from '@/components/AsideBox'
import HeaderView from '@/components/HeaderView'
import FooterView from '@/components/FooterView'
export default {
  name: 'home',
  components: {
    homeAside,
    Panel,
    FooterView,
    HeaderView,
    AsideBox
  },
  data () {
    return {
      params: {
        type: '',
        kew_name: '',
        limit: 20,
        page: 1
      },
      list: [{
        name: '杨萌萌',
      }, {
        name: '杨萌萌',
      }, {
        name: '当代职场人：7成人入职不满3年就跳槽',
      }, {
        name: '大多数90后离职和薪资有关，面试能说吗？',
      }],
      isShow: false,
      info: {
        title: '当代职场人：7成人入职不满3年就跳槽7成人入职不满3年就跳槽',
        user: 'yNAGM',
        time: '2019-12-20',
        num: 222,
        text: '任仕达',
        content: '江西一集团堆了一座5亿现金墙，为公司1万员工发放人均5万元的年终奖； 浙江温州一家汽车部件公司，奖励100名优秀员工一人一台价值11万元新车。 有种奖，叫做别人的年终奖。西湖的水，我的泪！ 辛辛苦苦搬砖一年，就盼着年终奖这块大饼，今年你吃到没？ 前不久，BOSS直聘与《疯狂的外星人》特别策划发起了“2018年终奖大调查”，收到1367位职场人的反馈，经过对样;<img src="https://www.baidu.com/img/bd_logo1.png?where=super" style="max-width:100%;"'
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.windowScroll)
  },
  methods: {
    windowScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop - document.documentElement.clientHeight + 400 >= 0) {
        this.isShow = true
      }
      else {
        this.isShow = false
      }
    },
    currentChange (page) {
      this.params.page = page
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.windowScroll)
  }
}
</script>