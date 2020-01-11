<template>
  <div class="team-view">
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
        <person-card :list="list" v-if="list.length!=0" @selectComment="selectComment"></person-card>
        <div class="no-data" v-else>
          <img src="../assets/img/nodata.png" class="nodata-bg" alt="">
          <p class="no-data-title">暂无数据</p>
          <el-button type="primary" class="add-data" @click="handleCommand(0)">立即新增</el-button>
        </div>
        <!-- 列表 -->
      </div>
      <div class="team-box-content team-box-right">
        <!-- <edit-card></edit-card> -->
        <detail-card
          :cardType="type"
          @refurbish="refurbish"
          @saveDiscuss="saveDiscuss"
          :commentInfo="commentInfo"
        ></detail-card>
      </div>
    </div>
  </div>
</template>

<script>
import PersonCard from './commentCard/PersonCard'
import DetailCard from './commentCard/DetailCard'
import { getDiscussList, getDiscussInfo, addDiscuss } from '../api/comment'
export default {
  components: {
    PersonCard,
    DetailCard
  },
  data () {
    return {
      tableData: [],  //初始化数据
      Number: 10,  //每页条数
      num: 1,  //页码
      numA: 10,  //页码
      AllNum: 0,  //全部条数
      type: 2,
      list: [],
      activeIndex: 0,
      commentInfo: {},
      params: {
        uid: localStorage.getItem('uid'),
        title: ''
      },
      commentId: '',
      refurbishStatus: ''
    }
  },
  mounted () {
    this.getList()
    // localStorage.setItem('uid', 6)
    // localStorage.setItem('username', '测试一号哦')
  },
  methods: {
    getList () {
      getDiscussList(this.params).then(res => {
        if (res.data.data) {
          this.list = res.data.data || []
          this.commentId = this.list[0].id
          if(this.refurbishStatus!=3) {
            this.getDetail(this.commentId)
          }     
        }
        else {
          this.list = []
          this.commentInfo = null
        }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    getDetail (id) {
      getDiscussInfo({ id }).then(res => {
        this.commentInfo = res.data || {}
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    selectComment (id) {
      this.type = 2
      this.getDetail(id)
    },
    saveDiscuss (val) {
      addDiscuss(val).then(res => {
        console.log(res)
        if (res.data) {
          this.$message.success('添加成功')
          this.refurbishStatus = 3
          this.getList()
        }
        else {
          this.$message.error('添加失败')
        }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    refurbish () {
      this.getList()
    },
    handleCommand (command) {
      this.refurbishStatus = command
      if (command == 3) {
        this.getList()
      } else {
        this.commentId = ''
        this.type = command
        this.commentInfo = {}
      }
    },
    handleCurrentChange (val) {
      this.num = val
      this.reverseUser()
    }
  }
}
</script>

<style lang="scss">
.team-view {
  .team-box {
    height: 100%;
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
}

.team-box .team-box-left {
  width:540px;
}
.team-box-left .el-input__inner {
  height: 44px;
  line-height: 44px;
}
.team-box-left .el-input__icon {
  line-height: 44px;
}
.team-box-left .team-input .el-input__inner{
  height:44px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(238,238,238,1);
  box-shadow:0px 4px 4px 0px rgba(106,106,106,0.1);
  border-radius:5px 0px 0px 5px
}
.team-box-content {
  width: 80%;
  background: #fff;
  /* height: 818px; */
  margin-left: 44px;
  border-radius: 10px;
}
.dropdown-menu {
  width: 100px!important;
  color: #999;
  margin-right: 0!important;
}
.el-dropdown-menu {
  overflow: hidden;
}
.el-dropdown-menu__item {
  width: 80px!important;
  
}
.foots{
  margin-top: 30px;
}
.tables-box{
  height: 100%;
  margin-bottom: 50px;
}
.foots{
  margin-top: 30px;
}
.team-view {
  /* height: 100%; */
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
