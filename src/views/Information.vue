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
    <el-header class="header x-flex-around home" height="50px" id="header">
      <headerView :activeIndex="3"></headerView>
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
                <el-col :span="24" v-for="(item, index) in informationList" :key="index">
                  <div class="grid-information-card x-flex-start-justify">
                    <img :src="item.imgUrl" class="grid-information-img" />
                    <div class="grid-information">
                      <el-link :underline="false" class="grid-information-title">{{item.title}}</el-link>
                      <p class="grid-information-content">
                        {{item.content}}
                        <span class="grid-information-btn">
                          <div class="x-flex-between">
                            <el-link
                              :underline="false"
                              type="primary"
                              href="informationDetail"
                            >[查看详情]</el-link>
                            <span class="grid-information-time">{{item.time}}</span>
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
                    v-for="(item,index) in list"
                    :key="index"
                  >
                    <div>
                      <img src="../assets/img/teamCenter/one.png" alt v-if="index==0" />
                      <img src="../assets/img/teamCenter/two.png" alt v-else-if="index==1" />
                      <img src="../assets/img/teamCenter/three.png" alt v-else-if="index==2" />
                      <p v-else class="order-num">{{index+1}}</p>
                    </div>
                    <div>
                      <p class="order-name text-line" :class="{'active':index<3}">{{item.name}}</p>
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
      informationList: [{
        imgUrl: require('../assets/img/img1.png'),
        title: '当代职场人：7成人入职不满3年就跳槽',
        time: '2019-20-10',
        content: '近日，前程无忧最新发布的“2019年第四季度求职者跳槽意愿度调查”结果显示：2019年第四季度有明确跳槽意愿的受访者占35.2%，和上个季度比没有太大变化。进入2019年的尾声，大部分职场人本着“拿完年'
      },
      {
        imgUrl: require('../assets/img/img2.png'),
        title: '大多数90后离职和薪资有关，面试能说吗？',
        time: '2019-20-10',
        content: '你是不是也听到过这样的言论，比如“90后太难管了，说两句就要离职”、“现在的90后离职率比80后高多了”……所以，这些宁愿折损“名声”也要离职的90后到底都经历了什么？'
      }],
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
        name: '杨萌萌',
      }, {
        name: '杨萌萌',
      }],
      isShow: false,
    }
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
    currentChange (page) {
      this.params.page = page
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.windowScroll)
  }
}
</script>