
<style lang="scss">
.table-list {
  background: #fff;
  border-radius:10px;
  padding: 15px;
  .team-pagination {
    margin-top: 20px;
  }
 .member-table {
    .action-btn {
      color: #333333;
      margin-bottom: 15px;
      .el-button {
        height: 38px;
      }
      .select-text {
        font-size: 14px;
        margin: 0 5px;
        color: #6A6A6A;
      }
    }
  }
}
.tables-box{
  overflow: hidden;
  margin-bottom: 60px;
}
.team-info-row {
  margin: 20px 0;
}
.box-card p {
  font-size:16px;
}
.box-card p:nth-of-type(2) {
  font-size:32px;
  margin-top: 10px;
}
</style>

<template>
  <div class="tables-box">
    <memberCard :userType="userType" @refurbish="refurbish" :teamInfo="teamInfo"></memberCard>
    <div class="table-list">
      <memberQuery @onSubmit="onSubmit"></memberQuery>
      <memberTable :total="total" :tableData="tableData" @handleEdit="handleEdit" @dismissTeam="dismissTeam" @handleView="handleView" @addMember="addMember" @handleDel="handleDel" @handleSelectionChange="handleSelectionChange"></memberTable>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <memberAdd :dialogTableVisible="visible" @handleClose="visible=false,userId='',teamInfo={}" :id="userId" @submitForm="submitForm"></memberAdd>
    <memberInfo :dialogTableVisible="dialogTableVisible" :isView="isView" :userId="userId" @submitMember="submitMember"></memberInfo>
    <infoTip :centerDialogVisible="dialogVisible" :modalInfo="modalInfo" @handleClose="dialogVisible=false"></infoTip>
  </div>
</template>

<script>
import memberCard from './membership/memberCard'
import memberQuery from './membership/memberQuery'
import memberTable from './membership/memberTable'
import memberInfo from './membership/memberInfo'
import memberAdd from './membership/memberAdd'
import infoTip from './common/infoTip'
import { getTeamList, loginOutTeam, addTeamUser, updateTeamUser } from '../api/team'
import memberInfoVue from './membership/memberInfo.vue';
export default {
  components: {
    memberCard,
    memberQuery,
    memberTable,
    memberInfo,
    memberAdd,
    infoTip
  },
  data () {
    return {
      dialogTableVisible: false,
      visible: false,
      dialogVisible: false,
      modalInfo: {
        title: '您的信息未完善！',
        okText: '前去完善',
        closeText: '',
        imgBg: require('../assets/img/info.png')
      },
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      len: 0,
      userId: '',
      teamInfo: {},
      userType: localStorage.getItem('userType'),
      isView: false
    }
  },
  created () {
    // 初始化查询标签数据
    // this.reverseUser()
    this.getList(this.formMember)
  },
  methods: {
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    refurbish () {
      this.getList(this.formMember)
    },
    getList (params) {
      getTeamList(params).then(res => {
        this.tableData = res.data.data
        this.total = res.data.count
        this.teamInfo = res.data.teamInfo
      })
    },
    handleView (val) {
      this.userId = val
      this.dialogTableVisible = true
      this.isView = true
    },
    handleEdit (val) {
      if (localStorage.getItem('teamType') == 0) {
        this.dialogVisible = true
        return false
      }
      this.userId = val
      this.isView = false
      this.dialogTableVisible = true
    },
    // 退出团队
    dismissTeam () {
      let uid = localStorage.getItem('uid')
      loginOutTeam({ uid }).then(res => {
        if (res.data) {
          this.$message.success('退出成功')
          this.getList(this.formMember)
        }
        else {
          this.$message.error('退出成功')
        }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleDel (uid) {
      if (localStorage.getItem('teamType') == 0) {
        this.dialogVisible = true
        return false
      }
      loginOutTeam({ uid }).then(res => {
        this.$message.success('删除成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleSelectionChange (val) {
      this.len = val
    },
    addMember () {
      // 如果没有认证 团队性质
      if (localStorage.getItem('teamType') == 0) {
        this.dialogVisible = true
      }
      else {
        this.userId = ''
        // this.teamInfo = {}
        this.visible = true
      }
    },
    onSubmit (value) {
      let params = Object.assign(this.formMember, value)
      this.getList(params)
    },
    submitMember (val) {
      if (!this.isView) {
        // val.id = this.userId
        let params = Object.assign(val, { id: this.userId })
        updateTeamUser(val).then(res => {
          if (res.data) {
            this.dialogTableVisible = false
            this.$message.success('保存成功')
            this.getList(this.formMember)
          }
          else {
            this.$message.error('保存失败')
          }
        }).catch(error => {
          this.$message.error(error.status.remind)
        })
      }
    },
    submitForm (val) {
      addTeamUser(val).then(res => {
        if (res.data) {
          this.$message.success('保存成功')
          this.visible = false
          this.getList(this.formMember)
        }
        else {
          this.$message.success('保存失败')
        }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    }
  }
}
</script>
