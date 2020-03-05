<style lang="scss">
.tables-box {
  // overflow: hidden;
  .table-list {
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    .add-member {
      height: 38px;
      margin-bottom: 15px;
    }
    .team-pagination {
      margin-top: 20px;
      margin-left: 20px;
    }
  }
}
</style>
<template>
  <div class="tables-box">
    <div class="table-list">
      <el-button type="primary" class="add-member" @click="visible=true">添加部门</el-button>
      <tableList :tableData="tableData" @handleTurnover="handleEdit" @handleDel="handleDel"></tableList>
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
    <turnoverModal
      :dialogTableVisible="dialogTableVisible"
      :departId="departId"
      @handleClose="handleClose"
    ></turnoverModal>
    <addDepModal :dialogTableVisible="visible" @submitForm="submitForm"></addDepModal>
    <successModal :dialogTableVisible="visible1" @handleTurnover="handleEdit"></successModal>
    <outDep :dialogTableVisible="delVisible" @submitForm="handleUser"></outDep>
    <modal
      :dialogTableVisible="dialogModalVisible"
      @handleOk="handleOk"
      :modalObj="modalObj"
      @handleClose="dialogModalVisible=false"
    ></modal>
  </div>
</template>

<script>
import tableList from './department/tableList'
import addDepModal from './department/addDepModal'
import successModal from './department/successModal'
import outDep from './department/outDep'
import turnoverModal from './department/turnoverModal'
import modal from './common/modal'
import {
  getDepartmentList,
  addTeamDepartment,
  delDepartment
} from '@/api/department'
export default {
  components: {
    tableList,
    addDepModal,
    successModal,
    outDep,
    turnoverModal,
    modal
  },
  data() {
    return {
      dialogTableVisible: false,
      visible: false,
      visible1: false,
      delVisible: false,
      turnoverVisible: false,
      dialogModalVisible: false,
      modalObj: {
        content: '确定删除该部门吗？',
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
      departId: '',
      uid: localStorage.getItem('uid')
    }
  },
  created() {
    // 初始化查询标签数据
    this.getList(this.formMember)
  },
  methods: {
    handleSizeChange(val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange(val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    getList(params) {
      getDepartmentList(params)
        .then(res => {
          this.tableData = res.data.data
          this.total = res.data.count
          this.delVisible = this.tableData.some(item => {
            return !item.user_name
          })
        })
        .catch(error => {
          if (error && error.status) {
            this.$message.error(error.status.remind)
          }
        })
    },
    handleEdit(val) {
      this.visible1 = false
      this.departId = val || this.tableData[0].id
      this.dialogTableVisible = true
    },
    handleDel(val) {
      this.departId = val

      this.dialogModalVisible = true
    },
    handleOk() {
      this.deleteDep()
    },
    deleteDep() {
      let params = {
        departId: this.departId,
        uid: this.uid
      }
      delDepartment(params)
        .then(res => {
          if (res.data) {
            this.dialogModalVisible = false
            this.getList(this.formMember)
            this.$message.success('删除成功')
          }
          else {
            this.$message.error('删除失败')
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    handleClose(index) {
      this.dialogTableVisible = false
      if (index) {
        this.getList(this.formMember)
      }
    },
    handleUser() {
      this.delVisible = false
    },
    submitForm(val) {
      addTeamDepartment(val)
        .then(res => {
          this.visible1 = true
          this.visible = false
          this.getList(this.formMember)
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    }
  }
}
</script>

