<template>
  <div class="team-view">
    <!-- <breadcrumb :breadcrumbs="breadcrumb"></breadcrumb> -->
    <div class="team-box bg-purple-start">
      <div class="team-box-left">
        <div class="bg-purple-start">
          <el-input placeholder="搜索" class="team-input">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-dropdown>
            <el-button class="dropdown-button">
              <i class="el-icon-more"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu">
              <el-dropdown-item class="el-icon-plus" @click="handle(0)">&nbsp;新增</el-dropdown-item>
              <el-dropdown-item class="el-icon-refresh-right">&nbsp;刷新</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 列表 -->
        <person-card :list="list"></person-card>
        <!-- 列表 -->
      </div>
      <div class="team-box-content team-box-right">
        <!-- <edit-card></edit-card> -->
        <detail-card :cardType="type" :teamInfo="teamInfo"></detail-card>
      </div>
    </div>
  </div>
</template>

<script>
// import Breadcrumb from './breadcrumb/Breadcrumb'
import PersonCard from './commentCard/PersonCard'
import EditCard from './commentCard/EditCard'
import DetailCard from './commentCard/DetailCard'
export default {
  components: {
    PersonCard,
    EditCard,
    DetailCard
  },
  data () {
    return {
      breadcrumb: ['评论管理', '文章评论'],
      tableData: [],  //初始化数据
      Number: 10,  //每页条数
      num: 1,  //页码
      numA: 10,  //页码
      AllNum: 0,  //全部条数
      type: 2,
      list: [{
        title: '2019年12月1日晨会',
        time: '2019-12-20',
        name: '杨萌萌'
      },
      {
        title: '2019年12月10日晨会',
        time: '2019-12-10',
        name: '杨啦啦'
      }],
      activeIndex: 0,
      teamInfo: {
        title: '2019年12月1日晨会',
        name: '杨萌萌',
        sort: '晨会',
        content: '2019年12月1日晨会 汇报各位上周的工作情况',
        time: '2019-10-20'
      }
    }
  },
  created() {
  },
  methods: {
    handle (index) {
      this.type = index
      console.log(index)
    },
    handleCurrentChange(val) {
      this.num = val
      this.reverseUser()
    },
    handleClickB: function (row) {  //删除按钮
      if (this.$store.state.user.desc > 1) {
        this.$alert('此账号为测试账号,无法进行此操作', '温馨提示', {
          confirmButtonText: '确定',
          callback: () => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });
          }
        });
        return false;
      }
      this.$confirm('此操作将永久删除该评论, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$http({
          url: 'removesCommonts',
          method: "POST",
          data: {
            userid: row._id
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i]['_id'] == row._id) {
                this.tableData.splice(i, 1)
              }
            }
          }

        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '未知错误'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleClickAX: function (row) {  //删除按钮
      if (this.$store.state.user.desc > 1) {
        this.$alert('此账号为测试账号,无法进行此操作', '温馨提示', {
          confirmButtonText: '确定',
          callback: () => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });
          }
        });
        return false;
      }
      this.$confirm('此操作将永久同意该评论展示, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$http({
          url: 'updataCommonts',
          method: "POST",
          data: {
            userid: row._id
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i]['_id'] == row._id) {
                this.tableData[i].strs = '已同意'
              }
            }
          }

        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '未知错误'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    reverseUser: function () {
      this.$http({
        url: 'searchCommonts',
        method: 'POST',
        data: {
          num: this.num,
          Number: this.Number
        }
      })
        .then(res => {

          this.tableData = res.data.data
          if (res.data.data.length > 0) {

            for (let i = 0; i < res.data.data.length; i++) {

              this.tableData[i].strs = res.data.data[i].types == '1' ? '未同意' : '已同意'
            }

          }
        }).catch(() => {
          console.log('错了')
        })
    }
  }
}
</script>

<style>
.team-box {
  height: 100%;
  /* margin-bottom: -200px; */
}
.team-box .team-box-left {
  width:540px;
  /* margin: 10px 30px; */
}
.team-box-left .el-input__inner {
  height: 44px;
  line-height: 44px;
}
.team-box-left .el-input__icon {
  line-height: 44px;
}
.team-box-left .team-input .el-input__inner{
    /* width:441px; */
  height:44px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(238,238,238,1);
  box-shadow:0px 4px 4px 0px rgba(106,106,106,0.1);
  border-radius:5px 0px 0px 5px
}
.team-box-content {
  width: 80%;
  background: #fff;
  height: 818px;
  margin-left: 44px;
  border-radius: 10px;
}
.dropdown-menu {
  width: 100px!important;
  color: #999;
  margin-right: 0!important;
}
 .el-dropdown-menu__item {
  width: 60px!important;
}
.foots{
  margin-top: 30px;
}
.tables-box{
  height: 100%;
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
