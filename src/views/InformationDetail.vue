<style lang="scss">
 @import '@/assets/css/information.scss';
</style>
<template>
  <el-container class="orderTaking">
    <el-header class="header x-flex-around home" height="50px" id="header">
      <headerView :activeIndex="2"></headerView>
    </el-header>
    <el-main class="orderTaking-main-content">
      <div class="orderTaking-main-list">
        <div class="orderTaking-main-row information-content">
          <div class="orderTaking-main-col1 information-main-col1">
            <section class="home-main-section info-detail-box">
              <div class="info-detail-header">
                <p class="info-title">{{info.title}}</p>
                <div class="x-flex-between">
                  <span>发布时间：{{$moment.unix(info.addtime).format('YYYY-MM-DD')}}</span>
                  <span>来源：{{info.source}}</span>
                  <span>作者：{{info.author}}</span>
                  <span>浏览量：{{info.number}}</span>
                </div>
              </div>
              <div class="info-detail-content">
                <p v-html="info.content"></p>
                <img :src="info.image" alt="">
              </div>
            </section>
          </div>
          <div class="orderTaking-main-col2">
            <section class="home-main-section panel-content">
              <p class="home-main-title x-flex-start-justify">最新资讯</p>
              <div class="info-center-order">
                <ul class="info-center-content">
                  <li class="x-flex-start-justify info-center-item" v-for="(item,index) in hortInquiryList" :key="index">
                    <div class="info-center-name">
                      <p class="text-line" :class="{'active':index<3}">{{item.title}}</p>
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
              <p @click="getInfo(id,1)" v-if="lastTitle">上一篇：{{lastTitle}}</p>
              <p @click="getInfo(id,1)" v-if="nextTitle">下一篇：{{nextTitle}}</p>
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
import { inquiryInfo, hortInquiryList } from '@/api/information'
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
      isShow: false,
      info: {},
      ids: [],
      id: '',
      hortInquiryList: [],
      lastTitle: '',
      nextTitle: '',
      page: 0,
      isShow: false
    }
  },
  created () {
    if (sessionStorage.getItem('id')) {
      this.id = sessionStorage.getItem('id')
    } else {
      this.id = this.$route.query.id
    }
    this.ids = this.$route.query.ids.split(',')
    this.getInfo(this.id)
    this.switchPage(-1)
    this.switchNextPage(1)
    this.getHortInquiryList()
  },
  mounted () {
    document.scrollingElement.scrollTop = 0
    window.addEventListener('scroll', this.windowScroll)
  },
  methods: {
    getInfo (id, page) {
      if (page) {
        this.id = this.getId(page)
        this.switchPage(page)
      }
      inquiryInfo({ id }).then(res => {
        this.info = res.data
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    getHortInquiryList () {
      hortInquiryList().then(res => {
        console.log(res.data)
        this.hortInquiryList = res.data
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    windowScroll () {

      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 100) {
        this.isShow = true
      }
      else {
        this.isShow = false
      }
    },
    getId (page) {
      let id
      this.ids.forEach((item, index) => {
        if (item == this.id) {
          if ((index == 0 && page == -1) || (index == this.ids.length && page == 1)) {
            id = ''
          }
          else {
            id = this.ids[index + page]
          }
        }
      })
      return id
    },
    switchPage (page) {
      let id = this.getId(page)
      if (id) {
        inquiryInfo({ id }).then(res => {
          this.lastTitle = res.data.title
        }).catch(error => {
          this.$message.error(error.status.remind)
        })
      }
      // sessionStorage.setItem('id', this.id)
    },
    switchNextPage (page) {
      let id = this.getId(page)
      if (id) {
        inquiryInfo({ id }).then(res => {
          this.nextTitle = res.data.title
        }).catch(error => {
          this.$message.error(error.status.remind)
        })
      }
      // sessionStorage.setItem('id', this.id)
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.windowScroll)
  }
}
</script>