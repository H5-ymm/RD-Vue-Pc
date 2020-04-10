
<style lang="scss">
.table-list {
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  .team-pagination {
    margin-top: 20px;
    margin-left: 0;
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
        margin: 0 5px 0 15px;
        color: #6a6a6a;
      }
    }
  }
}
</style>

<template>
  <div class="tables-box">
    <memberCard :teamInfo="teamInfo"></memberCard>
    <div class="table-list">
      <memberQuery @onSubmit="onSubmit"></memberQuery>
      <memberTable
        :total="total"
        :tableData="tableData"
        @handleEdit="handleEdit"
        @dismissTeam="dismissTeam"
        @handleView="handleView"
        @addMember="addMember"
        @handleDel="handleDel"
      ></memberTable>
      <el-pagination
        class="team-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formMember.page"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="formMember.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <memberAdd
      :dialogTableVisible="visible"
      @handleClose="visible=false,userId='',teamInfo={}"
      :id="userId"
      @submitForm="submitForm"
    ></memberAdd>
    <memberInfo
      :dialogTableVisible="dialogTableVisible"
      :isView="isView"
      :userId="userId"
      @submitMember="submitMember"
    ></memberInfo>
    <infoTip
      :centerDialogVisible="dialogVisible"
      :modalInfo="modalInfo"
      @handleClose="dialogVisible=false"
    ></infoTip>
    <modal
      :dialogTableVisible="dialogModalVisible"
      @handleOk="handleOk"
      :modalObj="modalObj"
      @handleClose="dialogModalVisible=false"
    ></modal>
  </div>
</template>

<script>
import memberCard from './membership/memberCard'
import memberQuery from './membership/memberQuery'
import memberTable from './membership/memberTable'
import memberInfo from './membership/memberInfo'
import memberAdd from './membership/memberAdd'
import infoTip from './common/infoTip'
import modal from './common/modal'
import {
  getTeamList,
  loginOutTeam,
  addTeamUser,
  updateTeamUser,
  deleteTeamUser
} from '@/api/team'
import memberInfoVue from './membership/memberInfo.vue'
export default {
  components: {
    memberCard,
    memberQuery,
    memberTable,
    memberInfo,
    memberAdd,
    infoTip,
    modal
  },
  data() {
    return {
      dialogTableVisible: false,
      visible: false,
      dialogVisible: false,
      dialogModalVisible: false,
      isView: false,
      modalInfo: {
        title: '您的信息未完善！',
        okText: '前去完善',
        closeText: '',
        imgBg: require('../assets/img/info.png')
      },
      modalObj: {
        content: '',
        okText: '确定',
        closeText: '取消'
      },
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      userId: '',
      teamInfo: {},
      userPosition: sessionStorage.getItem('userPosition'),
      uid: localStorage.getItem('uid'),
      modalType: 1,
      modalForm: {},
      id: ''
    }
  },
  created() {
    // 初始化查询标签数据
    this.getList(this.formMember)
  },
  methods: {
    getList(params) {
      getTeamList(params)
        .then(res => {
          this.tableData = res.data.data
          this.total = res.data.count
          this.teamInfo = res.data.teamInfo
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    handleView(val) {
      this.userId = val
      this.dialogTableVisible = true
      this.isView = true
    },
    handleEdit(val) {
      if (localStorage.getItem('teamType') == 0) {
        this.dialogVisible = true
        return false
      }
      this.userId = val
      this.isView = false
      this.dialogTableVisible = true
    },
    handleOk() {
      // 修改
      if (this.modalType == 1) {
        // 修改
        updateTeamUser(this.modalForm)
          .then(res => {
            if (res.data) {
              this.dialogTableVisible = false
              this.dialogModalVisible = false
              this.$message.success('保存成功')
              if (this.uid == this.modalForm.id) {
                this.outLogin()
              }
              else {
                this.getList(this.formMember)
              }
            } else {
              this.$message.error('保存失败')
            }
          })
          .catch(error => {
            if (error) {
              this.$message.error(error.status.remind)
            }
          })
      }
      else if (this.modalType == 2) {
        // 退出
        loginOutTeam({ uid: this.uid })
          .then(res => {
            if (res.data) {
              this.dialogModalVisible = false
              if (this.userPosition != 1) {
                this.outLogin()
              }
              else {
                this.getList(this.formMember)
              }
            } else {
              this.$message.error('操作失败')
            }
          })
          .catch(error => {
            if (error) {
              this.$message.error(error.status.remind)
            }
          })
      }
      else {
        // 删除
        deleteTeamUser({ uid: this.uid, userid: this.id })
          .then(res => {
            if (res.data) {
              this.dialogModalVisible = false
              this.$message.success('删除成功')
              this.getList(this.formMember)
            } else {
              this.$message.error('删除失败')
            }
          })
          .catch(error => {
            if (error) {
              this.$message.error(error.status.remind)
            }
          })
      }
    },
    // 退出团队
    dismissTeam() {
      if (localStorage.getItem('teamType') == 0) {
        this.dialogVisible = true
        return false
      }
      this.modalType = 2
      let text = this.userPosition == 1 ? '解散' : '退出'
      this.modalObj.content = `你确定${text}团队吗?</br>${text}后将无法登录账号!`
      this.dialogModalVisible = true
    },
    outLogin() {
      this.$store.dispatch("logoutUser").then(res => {
        this.$message.success('操作成功')
        this.$router.replace('/login');
      });
    },
    handleDel(uid) {
      if (localStorage.getItem('teamType') == 0) {
        this.dialogVisible = true
        return false
      }
      this.id = uid
      this.modalType = 3
      this.modalObj.content = '你确定删除该组员吗?</br>删除后该组员将无法登录!'
      this.dialogModalVisible = true
    },
    addMember() {
      // 如果没有认证 团队性质
      if (localStorage.getItem('teamType') == 0) {
        this.dialogVisible = true
      } else {
        this.userId = ''
        this.visible = true
      }
    },
    submitMember(val) {
      if (!this.isView) {
        this.modalType = 1
        if (val.status == 2) {
          if (val.id == this.uid) {
            this.modalObj.content = '你确定锁定当前账号吗？</br>锁定后将退出并无法登录!'
          }
          else {
            this.modalObj.content = '你确定锁定该组员账号吗？</br>锁定后该组员将无法登录!'
          }
          this.userId = val.id
          this.modalForm = val
          this.dialogModalVisible = true
        }
      }
    },
    submitForm(val) {
      addTeamUser(val)
        .then(res => {
          if (res.data) {
            this.$message.success('保存成功')
            this.visible = false
            this.getList(this.formMember)
          } else {
            this.$message.success('保存失败')
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    onSubmit(value) {
      let params = Object.assign(this.formMember, value)
      this.getList(params)
    },
    handleSizeChange(val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange(val) {
      this.formMember.page = val
      this.getList(this.formMember)
    }
  }
}
</script>
