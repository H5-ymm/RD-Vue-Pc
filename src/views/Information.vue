<style lang="scss">
 @import '@/assets/css/orderTarking.scss';
 .orderTaking-main-content .orderTaking-detail {
    height: 200px;
    width: 100%;
    background-size: contain;
    &.info-detail {
      background: url('../assets/img/bg1.png') no-repeat top center;
    }
  }
.orderTaking-detail-content {
   .information-content{
    margin: 20px 0;
    .panel-content {
      padding: 20px 28px 20px;
    }
    .home-main-title {
      padding-bottom: 20px;
    }
    .information-main-col1 {
      border:none;
      width: 814px;
      background: #fff;
    }
    .orderTaking-main-col2 {
      background: #fff;
      width: 372px;
    }
    .grid-information-card{
      padding: 0;
      border-bottom: 1px solid #eee;
      .grid-information {
        line-height: 22px;
        width: 70%;  
      }
      .grid-information-img {
        border-radius:5px;
      }
      .grid-information-content {
        padding-top: 30px;
        color: #333;
      }
      .grid-information-title {
        font-weight: bold;
        color: #333;
          &:hover{
            color: #1890FF;
          }
       }
      .grid-information-btn {
        width:60%;
        float: right;
        .grid-information-time {
          color: #999999;
          font-size: 12px;
        }
      }
    }
    .info-center-content {
      padding-top: 10px;
      .info-center-item {
        line-height: 30px;
        .order-name {
          padding-left: 10px;
          width: 300px;
          &.active {
            font-weight: bold;
          }
        }
        .order-num {
          width:25px;
          height:25px;
          background:rgba(238,238,238,1);
          border-radius:50%;
          color: #333;
          line-height: 25px;
          text-align: center;
          margin: 5px;
        }
      }
    }
  }
}
</style>
<template>
  <el-container class="orderTaking">
    <el-header
      class="header x-flex-around home"
      height="50px"
      id="header"
    >
      <headerView :activeIndex="2"></headerView>
    </el-header>
    <el-main class="orderTaking-main-content">
      <div class="orderTaking-detail info-detail"></div>
      <div class="orderTaking-main-list orderTaking-detail-content">
        <div class="orderTaking-main-row information-content">
          <div class="orderTaking-main-col1 information-main-col1">
            <section class="home-main-section panel-content">
              <p class="home-main-title x-flex-start-justify">
                <img src="../assets/img/icon.png" />资讯
              </p>
              <el-row>
                <el-col
                  :span="24"
                  v-for="(item, index) in informationList"
                  :key="index"
                >
                  <div class="grid-information-card x-flex-start-justify">
                    <img
                      :src="item.image"
                      class="grid-information-img"
                    />
                    <div class="grid-information">
                      <el-link
                        :underline="false"
                        class="grid-information-title"
                      >{{item.title}}</el-link>
                      <p class="grid-information-content">
                        <span v-html="item.content"></span>
                        <span class="grid-information-btn">
                          <div class="x-flex-between">
                            <el-link
                              :underline="false"
                              type="primary"
                              :href="`informationDetail?id=${item.id}&ids=${ids}`"
                            >[查看详情]</el-link>
                            <span class="grid-information-time">{{$moment.unix(item.addtime).format('YYYY-MM-DD')}}</span>
                          </div>
                        </span>
                      </p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </section>
            <el-pagination
              background
              class="pagination"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="total"
            ></el-pagination>
          </div>
          <div class="orderTaking-main-col2">
            <section class="home-main-section panel-content">
              <p class="home-main-title x-flex-start-justify">热搜排行</p>
              <div class="info-center-order">
                <ul class="info-center-content">
                  <li
                    class="x-flex-start-justify info-center-item"
                    v-for="(item,index) in hortInquiryList"
                    :key="index"
                  >
                    <div>
                      <img
                        src="../assets/img/teamCenter/one.png"
                        alt
                        v-if="index==0"
                      />
                      <img
                        src="../assets/img/teamCenter/two.png"
                        alt
                        v-else-if="index==1"
                      />
                      <img
                        src="../assets/img/teamCenter/three.png"
                        alt
                        v-else-if="index==2"
                      />
                      <p
                        v-else
                        class="order-num"
                      >{{index+1}}</p>
                    </div>
                    <div>
                      <p
                        class="order-name text-line"
                        :class="{'active':index<3}"
                      >{{item.title}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
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
import { inquiryList, hortInquiryList } from '@/api/information'
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
      total: 0,
      activeIndex: 3,
      informationList: [],
      params: {
        limit: 5,
        page: 1
      },
      list: [{
        name: '杨萌萌',
      }, {
        name: '杨萌萌',
      }, {
        name: '杨萌萌',
      }, {
        name: '杨萌萌',
      }],
      isShow: false,
      hortInquiryList: [],
      ids: []
    }
  },
  created () {
    this.getInfoList(this.params)
    this.getHortInquiryList()
  },
  mounted () {
    document.scrollingElement.scrollTop = 0
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
    getInfoList (params) {
      inquiryList(params).then(res => {
        console.log(res.data.data)
        this.informationList = res.data.data
        // console.log(this.informationList)
        this.ids = this.informationList.map(item => {
          return item.id
        })
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
    currentChange (page) {
      this.params.page = page
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.windowScroll)
  }
}
</script>