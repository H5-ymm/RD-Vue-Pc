<style lang="scss">
.member-dialog {
  &.table-dialog {
    .el-dialog {
      height: 700px;
      overflow: hidden;
      .el-table--scrollable-x .el-table__body-wrapper {
        height: 100%;
      }
    }
  }
  .member-row {
    &.turnover-row {
      text-align: left;
      .member-col1 {
        text-align: center;
      }
      .team-pagination {
        margin-top: 15px;
      }
      .memberForm {
        .action-btn {
          margin-bottom: 0;
        }
        .el-form-item {
          margin-bottom: 12px;
        }
      }
    }
  }
  .table-edit {
    .el-input__inner {
      border: none;
      outline: none;
    }
    .el-input__inner:hover {
      border: none;
      outline: none;
    }
  }
}
.member-table {
  &.turnover-box {
    font-size: 14px;
    padding: 20px 15px;
    .width300 {
      width: 300px;
    }
  }
  .action-btn {
    color: #333333;
    margin-bottom: 15px;
    .el-button {
      height: 38px;
    }
    .select-text {
      font-size: 14px;
      margin: 0 5px;
      color: #6a6a6a;
    }
    .width100 {
      width: 100px;
    }
  }
  .table {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    height: 430px;
    overflow: auto;
  }
}
</style>
<template>
  <el-dialog
    width="75%"
    :visible="dialogTableVisible"
    top="10vh"
    class="member-dialog table-dialog"
    :show-close="false"
  >
    <div class="member-row turnover-row">
      <img src="../../assets/img/member/cancel.png" alt="" class="cancel-icon" @click="handleClose">
      <section class="member-col1">
        <p>人员调整</p>
      </section>
      <div class="member-table turnover-box">
        <div class="memberForm">
          <el-form :inline="true" :model="formMember" class="demo-form-inline">
            <el-form-item label="姓名/联系电话：">
              <el-input v-model="formMember.where" placeholder="请输入你要搜索的关键字" class="width300"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="querySearch" class="select-btn">搜索</el-button>
            </el-form-item>
            <div class="action-btn x-flex-between">
              <div>
                <el-form-item>
                  <el-select
                    v-model="formMember.departId"
                    placeholder="所属部门"
                    @change="selectDep"
                    value-key="depart_name"
                    class="width100"
                  >
                    <el-option
                      :label="item.depart_name"
                      :value="item.id"
                      v-for="(item,index) in depList"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select
                    v-model="formMember.gradeId"
                    value-key="grade_name"
                    placeholder="等级"
                    class="width100"
                  >
                    <el-option
                      :label="item.grade_name"
                      :value="item.id"
                      v-for="(item,index) in jobListAll"
                      :key="item.grade_name"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <span class="select-text">已选择
                  <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
                </span>
                <el-button type="text">清空</el-button>
              </div>
            </div>
          </el-form>
        </div>
        <div class="table">
          <el-table
            border=""
            :data="tableData"
            ref="multipleTable"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="序号" type="selection" align="center" width="60"></el-table-column>
            <el-table-column label="姓名" align="center" prop="user_name" width="150"></el-table-column>
            <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
            <el-table-column label="最近登录时间" align="center" width="150">
              <template slot-scope="props">
                <span>{{ props.row.loginTime ? $moment.unix(props.row.loginTime).format('YYYY-MM-DD HH:mm'): '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="直属上级" prop="superiorName" align="center" width="150"></el-table-column>
            <el-table-column label="所属部门" align="center" width="150">
              <template slot-scope="props">
                <el-select
                  v-model="depart_id"
                  :placeholder="props.row.depart_name"
                  v-if="activeIndex==props.$index&&isEdit"
                  @change="selectDepName"
                  class="width100 table-edit"
                >
                  <el-option
                    :label="item.depart_name"
                    :value="item.id"
                    v-for="(item,index) in depList"
                    :key="index"
                  ></el-option>
                </el-select>
                <span v-else>{{ props.row.depart_name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="等级" align="center" width="150">
              <template slot-scope="props">
                <el-select
                  v-model="grade_id"
                  value-key="grade_name"
                  v-if="activeIndex==props.$index&&isEdit"
                  :placeholder="props.row.grade_name"
                  @change="selectDepGrade"
                  class="width100 table-edit"
                >
                  <el-option
                    :label="item.grade_name"
                    :value="item.id"
                    v-for="item in jobList"
                    :key="item.grade_name"
                  ></el-option>
                </el-select>
                <span v-else>{{ props.row.grade_name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="160">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.row,scope.$index)"
                  v-if="!isEdit&&uid!=scope.row.uid&&activeIndex!=scope.$index&&scope.row.grade_num==3"
                  type="text"
                  size="small"
                >调整人员</el-button>
                <span v-if="uid==scope.row.uid">总经理</span>
                <span v-if="scope.row.grade_num==2">经理</span>
                <div v-if="isEdit&&activeIndex==scope.$index">
                  <el-button @click="handleSubmit" type="text" size="small">确认</el-button>
                  <el-button @click="handleCloseEdit" type="text" size="small">取消</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
    </div>
  </el-dialog>
</template>
<script>
import { adjustmentList, getDepartmentRoleList } from '@/api/department'
import { editTeamUserRole } from '@/api/team'
export default {
  props: ['dialogTableVisible', 'departId'],
  data() {
    return {
      teamId: '',
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      tableData: [],
      multipleSelection: [],
      total: 0,
      isEdit: false,
      depList: [],
      jobList: [],
      activeIndex: -1,
      isEdit: false,
      depInfo: {},
      depart_id: '',
      grade_id: '',
      uid: localStorage.getItem('uid'),
      depActiveIndex: -1,
      id: ''
    }
  },
  created() {
    this.getJobList()
    this.getList(this.formMember)
  },
  computed: {
    jobListAll() {
      return this.getArr(this.depList, this.depart_id)
    }
  },
  watch: {
    departId(val) {
      if (val) {
        this.getList(this.formMember)
      }
    }
  },
  methods: {
    getJobList() {
      let uid = localStorage.getItem('uid')
      getDepartmentRoleList({ uid }).then(res => {
        this.depList = res.data
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    selectDep(val) {
      this.getList(this.formMember)
    },
    selectDepName(val) {
      this.jobList = this.getArr(this.depList, val)
      console.log(this.jobList)
    },
    selectDepGrade(val) {
      // this.activeIndex = index
      console.log(val)
    },
    getArr(arr, id) {
      let newArr = []
      arr.forEach(item => {
        if (item.id == id) {
          newArr = item.child
        }
      })
      return newArr
    },
    getList(params) {
      adjustmentList(params).then(res => {
        this.tableData = res.data.data
        this.total = res.data.count
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleSizeChange(val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange(val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleEdit(row, index) {
      this.activeIndex = index
      this.isEdit = true
      this.depInfo = row
    },
    handleCloseEdit() {
      this.activeIndex = -1
      this.isEdit = false
      this.departId = ''
      this.gradeId = ''
    },
    handleSubmit() {
      console.log(this.grade_id)
      let params = {
        userId: this.depInfo.uid,
        gradeId: this.grade_id,
        uid: localStorage.getItem('uid')
      }
      editTeamUserRole(params).then(res => {
        if (res.data) {
          this.isEdit = false
          this.depart_id = ''
          this.grade_id = ''
          this.activeIndex = -1
          this.$message.success('操作成功')
          this.getList(this.formMember)
          this.$emit('handleClose', 1)
        }
        else {
          this.$message.error('操作失败')
        }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleClose() {
      this.$emit('handleClose')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('handleSelectionChange', this.multipleSelection.length)
    },
    dismissTeam() {
      this.$emit('dismissTeam')
    },
    querySearch() {
      this.getList(this.formMember)
    }
  }
}
</script>
