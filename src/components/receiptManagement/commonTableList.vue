<style lang="scss">
@import '@/assets/css/resume';
</style>
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
        <el-form-item label="姓名：">
          <el-input v-model="formMember.where" class="width300" placeholder="请输入职位名称关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
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
          <el-table-column label="姓名" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="handleEdit(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="年龄" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.money_type | moneyType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="性别" prop="depart_name" align="center" width="150"></el-table-column>
          <el-table-column label="学历" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.reward_type | rewardType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="住址" prop="reward_money" align="center" width="150"></el-table-column>
          <el-table-column label="推荐时间" prop="entry_num" sortable align="center" width="150"></el-table-column>
          <el-table-column label="状态" prop="status" sortable align="center" width="150"></el-table-column>
          <el-table-column label="操作" align="center" v-if="viewType==5">
            <template slot-scope="props">
              <el-button type="text" @click="handleUser(props.row)" size="small">离职</el-button>
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
  </div>
</template>

<script>
import { incumbencyUserResumeList, entryUserResumeList, entryResumeList, updateEntryUser } from '../../api/receipt'
import { moneyTypeList, rewardTypeList, payTypeList } from '../../base/base'
export default {
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
      dialogTableVisible: false,
      visible: false,
      tableData: [],
      currentPage: 1,
      userType: 1,
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      len: 0,
      userId: '',
      multipleSelection: [],
      form: {},
      statusList: [
        { label: '全部', value: 0 },
        { label: '待审核', value: 1 },
        { label: '已通过', value: 2 },
        { label: '未通过', value: 3 },
        { label: '已下架', value: -1 }
      ],
      activeIndex: 0,
      viewType: '',
      jobId: ''
    }
  },
  created () {
    // 初始化查询标签数据
    // viewType
    // 3.面试结果
    // 4.在职名单
    // 5.入职名单
    this.viewType = this.$route.query.view
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      if (this.viewType == 4) {
        incumbencyUserResumeList(params).then(res => {
          this.getData(res)
        })
      }
      else if (this.viewType == 3) {
        entryResumeList(params).then(res => {
          this.getData(res)
        })
      }
      else {
        entryUserResumeList(params).then(res => {
          this.getData(res)
        })
      }
    },
    getData (res) {
      const { data } = res
      this.tableData = data.data
      this.total = data.count
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
    handleUser (val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: val.id,
        status: 4
      }
      updateEntryUser(params).then(res => {
        this.$message.success('操作成功')
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
