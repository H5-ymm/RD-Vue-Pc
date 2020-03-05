<style lang="scss">
.team-view {
  &.commonts-box {
    height: 100%;
    overflow: hidden;
  }
  .team-box {
    height: 100%;
    overflow: hidden;
    .no-data {
      width: 100%;
      margin: 0 auto;
      text-align: center;
      background: #fff;
      width: 540px;
      min-height: 544px;
    }
    .nodata-bg {
      width: 303px;
      height: 168px;
      margin: 20% auto 20px;
    }
    .no-data-title {
      color: #999;
      font-size: 18px;
      margin-bottom: 20px;
    }
  }
  .view-card-row-more {
    width: 100%;
    background: #fff;
    height: 40px;
    line-height: 40px;
    color: #999;
    font-size: 14px;
  }
}

.team-box .team-box-left {
  width: 540px;
  .team-box-left-box {
    // height: 500px;
    webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .el-input__inner {
    padding: 22px 10px;
  }
  .el-input__icon {
    height: auto;
    line-height: 44px;
  }
  .team-input {
    .el-input__inner {
      padding: 21px 10px 21px 30px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(238, 238, 238, 1);
      box-shadow: 0px 4px 4px 0px rgba(106, 106, 106, 0.1);
      border-radius: 5px 0px 0px 5px;
    }
  }
}
.team-box-content {
  width: 80%;
  background: #fff;
  margin-left: 44px;
  border-radius: 10px;
  height: 545px;
  overflow: auto;
  webkit-overflow-scrolling: touch;
}
.dropdown-menu {
  width: 100px !important;
  color: #999;
  margin-right: 0 !important;
}
.el-dropdown-menu {
  overflow: hidden;
}
.el-dropdown-menu__item {
  width: 80px !important;
}
.foots {
  margin-top: 30px;
}
// .tables-box {
//   height: 100%;
//   margin-bottom: 50px;
// }
</style>

<template>
  <div class="team-view commonts-box">
    <!-- <breadcrumb :breadcrumbs="breadcrumb"></breadcrumb> -->
    <div class="team-box x-flex-start">
      <div class="team-box-left">
        <div class="x-flex-start-justify">
          <el-input
            placeholder="搜索"
            class="team-input"
            v-model="params.title"
            @input="handleCommand(3)"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-dropdown @command="handleCommand">
            <el-button class="dropdown-button">
              <i class="el-icon-more"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu">
              <el-dropdown-item class="el-icon-plus" command="0">&nbsp;新增</el-dropdown-item>
              <el-dropdown-item class="el-icon-refresh-right" command="3">&nbsp;刷新</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 列表 -->
        <div v-show="list.length!=0" class="team-box-left-box" ref="commont">
          <person-card :list="list" :total="total" @selectComment="selectComment"></person-card>
          <section class="view-card-row-more x-flex-center" v-show="isLoad" @click="loadMore">加载更多</section>
        </div>
        <div class="no-data" v-if="list.length==0">
          <img src="../assets/img/nodata.png" class="nodata-bg" alt="">
          <p class="no-data-title">暂无数据</p>
          <el-button type="primary" class="add-data" @click="handleCommand(0)">立即新增</el-button>
        </div>
        <!-- 列表 -->
      </div>
      <div class="team-box-content team-box-right" ref="commontLeft">
        <!-- <edit-card></edit-card> -->
        <detail-card
          :cardType="type"
          @refurbish="refurbish"
          @updateDiscuss="updDiscuss"
          @saveDiscuss="saveDiscuss"
          :commentInfo="commentInfo"
        ></detail-card>
      </div>
    </div>
    <infoTip
      :centerDialogVisible="dialogVisible"
      :modalInfo="modalInfo"
      @handleClose="dialogVisible=false"
    ></infoTip>
  </div>
</template>

<script>
import PersonCard from './commentCard/PersonCard'
import DetailCard from './commentCard/DetailCard'
import infoTip from './common/infoTip'
import {
  getDiscussList,
  getDiscussInfo,
  addDiscuss,
  updateDiscuss
} from '../api/comment'
export default {
  components: {
    PersonCard,
    DetailCard,
    infoTip
  },
  data() {
    return {
      type: 2,
      list: [],
      total: 0,
      activeIndex: 0,
      commentInfo: {},
      params: {
        uid: localStorage.getItem('uid'),
        title: '',
        limit: 6,
        page: 1
      },
      commentId: '',
      refurbishStatus: '',
      dialogVisible: false,
      modalInfo: {
        title: '您的信息未完善！',
        okText: '前去完善',
        closeText: '',
        imgBg: require('../assets/img/info.png')
      },
      isLoad: false,
      userPosition: localStorage.getItem('userPosition')
    }
  },
  created() {
    let userType = localStorage.getItem('userType')
    if (userType == 2) {
      this.getList()
    }
  },
  mounted() {
    let heigth = document.body.clientHeight - 140
    let heigth1 = document.body.clientHeight - 100
    let dom = this.$refs.commont
    let dom1 = this.$refs.commontLeft
    dom.style.height = heigth + 'px'
    dom1.style.height = heigth1 + 'px'
  },
  methods: {
    getList() {
      getDiscussList(this.params)
        .then(res => {
          if (res.data.data) {
            this.list = res.data.data || []
            this.total = res.data.count
            if (this.total - this.list.length > 0) {
              this.isLoad = true
            } else {
              this.isLoad = false
            }
            this.commentId = this.list[0].id
            if (!this.commentId) {
              this.commentInfo = null
            } else {
              if (this.refurbishStatus != 3) {
                this.getDetail(this.commentId)
              }
            }
          } else {
            this.list = []
            this.commentInfo = null
          }
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    loadMore() {
      this.params.limit = this.params.limit + 6
      this.refurbishStatus = 3
      this.getList()
    },
    getDetail(id) {
      getDiscussInfo({ id })
        .then(res => {
          this.commentInfo = res.data || {}
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    updDiscuss(val) {
      updateDiscuss(val)
        .then(res => {
          if (res.data) {
            this.type = 2
            this.refurbishStatus = 3
            this.getList()
            this.$message.success('修改成功')
          } else {
            this.$message.error('修改失败')
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    selectComment(id) {
      this.type = 2
      this.getDetail(id)
    },
    saveDiscuss(val) {
      this.commentInfo = val
      addDiscuss(val)
        .then(res => {
          if (res.data) {
            this.type = 2
            this.refurbishStatus = 0
            this.getList()
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败')
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    refurbish() {
      this.refurbishStatus = 3
      this.getList()
    },
    handleCommand(command) {
      this.refurbishStatus = command
      if (command == 3) {
        this.getList()
      } else {
        if (localStorage.getItem('teamType') == 0) {
          this.dialogVisible = true
          return false
        } else {
          this.commentId = ''
          this.type = command
          this.commentInfo = {}
        }
      }
    }
  }
}
</script>

