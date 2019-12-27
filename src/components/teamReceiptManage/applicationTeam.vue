<template>
  <div class="tables-box billingManagement">
    <div class="table-list">
      <el-form
        :inline="true"
        label-width="100px"
        label-position="right"
        :model="formMember"
        class="demo-form-inline"
      >
        <el-form-item label="职位名称：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="团队名称：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入团队名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="返利模式：">
          <el-select v-model="formMember.industry" class="width300" placeholder="请选择返利模式">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in rewardTypeList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请状态：">
          <el-select v-model="formMember.industry" class="width300" placeholder="请选择">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in applyStatusList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="onSubmit" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <el-table
          border
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="handleEdit(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="团队名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.money_type | moneyType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="需求人数" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.reward_type | rewardType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="岗位薪资" prop="depart_name" align="center" width="150"></el-table-column>
          <el-table-column label="返利模式" prop="reward_money" align="center" width="150"></el-table-column>
          <el-table-column label="申请日期" prop="entry_num" sortable align="center" width="150"></el-table-column>
          <el-table-column label="状态" align="center" width="150">
            <template slot-scope="props">
              <span
                class="status"
                :class="{'active-status':props.row.status==1}"
              >{{props.row.status==1?"正常":'锁定'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button @click="viewJob(scope.row)" type="text" size="small">查看职位</el-button>
              <el-button @click="handleCancle(scope.row)" type="text" size="small">取消申请</el-button>
              <el-button @click="dialogTableVisible=true" type="text" size="small">联系客服</el-button>
              <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="team-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formMember.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="formMember.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <viewJob :dialogTableVisible="dialogJobVisible" @handleClose="dialogJobVisible=fasle"></viewJob>
  </div>
</template>

<script>
import { getTeamReceiptList, addApply, cancelApply, delApply } from '../../api/teamReceipt'
import customerService from '../common/customerService'
import viewJob from '../common/viewJob'
import { moneyTypeList, rewardTypeList, payTypeList, weekList, applyStatusList } from '../../base/base'
export default {
  components: {
    customerService,
    viewJob
  },
  filters: {
    moneyType (val) {
      let obj = moneyTypeList.find(item => {
        return val == item.value
      })
      return obj.label
    },
    rewardType (val) {
      let obj = rewardTypeList.find(item => {
        return val == item.value
      })
      return obj.label
    },
  },
  data () {
    return {
      moneyTypeList,
      rewardTypeList,
      applyStatusList,
      dialogTableVisible: false,
      dialogJobVisible: false,
      tableData: [],
      currentPage: 1,
      userType: 1,
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      userId: '',
      form: {},
      jobId: ''
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      getTeamReceiptList(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    selectStatus (item, index) {
      this.activeIndex = index
      this.formMember.status = item.value
    },
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    // 查看职位
    viewJob (val) {
      this.dialogJobVisible = true
    },
    handleCancle (val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: val.id
      }
      cancelApply(params).then(res => {
        this.$message.success('退出成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleDel (val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: val.id
      }
      delApply(params).then(res => {
        this.$message.success('退出成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    submitMember (val) {
      updateTeamUser(val).then(res => {
        this.dialogTableVisible = false
        this.getList(this.params)
      })
    },
    handleSelectionChange (val) {
      this.len = val
    },
    addMember () {
      this.visible = true
    },
    onSubmit (value) {
      let params = Object.assign(this.formMember, value)
      this.getList(params)
    },
    submitForm (val) {
      this.visible = false
      addTeamUser(val).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    }
  }
}
</script>

<style lang="scss">
.billingManagement {
  .demo-form-inline {
    width: 80%;
  }
  .table-list {
    padding-top: 70px;
    padding-left: 10px;
    .select-btn {
      margin-left: 20px;
    }
    .member-table {
      margin-top: 40px;
      padding-left: 20px;
    }
  }
  .width300 {
    width: 300px;
  }
  .select-status {
    margin-right: 10px;
  }
}

</style>
