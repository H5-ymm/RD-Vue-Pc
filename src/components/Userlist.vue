<template>
  <div class="tables-box">
    <memberCard :userType="userType"></memberCard>
    <div class="table-list">
      <memberQuery></memberQuery>
      <memberTable></memberTable>
    </div>
    <memberInfo :dialogTableVisible="dialogTableVisible"></memberInfo>
  </div>
</template>

<script>
import Breadcrumb from './breadcrumb/Breadcrumb'
import memberCard from './membership/memberCard'
import memberQuery from './membership/memberQuery'
import memberTable from './membership/memberTable'
import memberInfo from './membership/memberInfo'

export default {
  components: {
    Breadcrumb,
    memberCard,
    memberQuery,
    memberTable,
    memberInfo
  },
  data () {
    return {
      breadcrumb: ['设置', '管理控制', '全部管理员'],
      dialogTableVisible: true,
      tableData: [{
        name: '杨萌萌',
        mobile: '18337806536',
        number: 23,
        status: '锁定',
        loginTime: '2019-11-30 18:35:50'
      }],
      currentPage: 1,
      userType: 1
    }
  },
  created () {
    // 初始化查询标签数据
    // this.reverseUser()

  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
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
      this.$confirm('此操作将永久删除该用户, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$http({
          url: 'removeNames',
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
    reverseUser: function () {
      this.$http({
        url: 'allNames',
        method: 'POST',
      })
        .then(res => {
          //  console.log(res)
          this.tableData = res.data.data
        })
    }
  },
}
</script>

<style>
.table-list {
  background: #fff;
  border-radius:10px;
  height: calc(100% - 460px);
  padding: 15px;
}
.tables-box{
  overflow: hidden;
}
.team-info-row {
  margin: 20px 0;
}
.box-card p {
  font-size:16px;
}
.box-card p:nth-of-type(2) {
  font-size:38px;
  margin-top: 10px;
}
</style>
