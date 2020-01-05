
<style lang="scss">
@import '@/assets/css/resume';
</style>
<template>
  <div class="tables-box billingManagement receipt-manage">
    <div class="table-list">
      <el-form
        :inline="true"
        label-width="100px"
        label-position="right"
        :model="formMember"
        class="demo-form-inline form-item-wrap"
      >
        <el-form-item label="职位名称：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
        </el-form-item>
        <el-form-item label="状态筛选：">
          <el-button
            :type="activeIndex==index ?'primary':''"
            v-for="(item,index) in checkStatusList"
            :key="index"
            plain
            @click="selectStatus(item,index)"
            class="select-status"
          >{{item.label}}</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <el-table
          border
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @sort-change="sortChange"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="viewJob(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="薪资类型" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.money_type | moneyType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位薪资" prop="money" align="center" width="150"></el-table-column>
          <el-table-column label="返利类型" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.reward_type | rewardType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="返利金额" prop="reward_money" align="center" width="150"></el-table-column>
          <el-table-column label="发布日期" prop="desc"  sortable="custom" align="center" width="150">
             <template slot-scope="props">
              <span>{{props.row.ctime?$moment.unix(props.row.ctime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="150">
            <template slot-scope="props">
              <span
                class="status"
                :class="`{active-status${props.row.status}}`"
              >{{props.row.status | statusType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <!-- <el-button
                @click="handleEdit(scope.row)"
                type="text"
                v-if="scope.row.status==1"
                size="small"
              >修改</el-button> -->
              <el-button
                @click="handleRecceipt(scope.row)"
                type="text"
                v-if="scope.row.status==1||scope.row.status==3"
                size="small"
              >删除</el-button>
              <el-button
                @click="viewJob(scope.row)"
                type="text"
                v-if="scope.row.status==4"
                size="small"
              >查看</el-button>
              <el-button
                @click="handleDel(scope.row)"
                v-if="scope.row.status==3"
                type="text"
                size="small"
              >下架</el-button>
              <el-button
                @click="handleDel(scope.row)"
                type="text"
                v-if="scope.row.status==4"
                size="small"
              >上架</el-button>
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
    <viewJob :dialogTableVisible="dialogJobVisible" :id="id" @handleClose="dialogJobVisible=fasle"></viewJob>
  </div>
</template>

<script>
import { getTeamList, loginOutTeam, addTeamUser, updateTeamUser } from '../../api/team'
import { getReceiptList, companyReceiptShelf } from '../../api/receipt'
import { moneyTypeList, rewardTypeList, payTypeList, checkStatusList } from '../../base/base'
import viewJob from '../common/viewJob'
export default {
  components: {
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
    statusType (val) {
      let obj = checkStatusList.find(item => {
        return val == item.value
      })
      return obj.label
    }
  },
  data () {
    return {
      moneyTypeList,
      rewardTypeList,
      checkStatusList,
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
      len: 0,
      userId: '',
      multipleSelection: [],
      activeIndex: 0,
      id:''
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      getReceiptList(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      })
    },
    sortChange (column) {
      if (column.order == 'ascending') {
        this.formMember[column.prop] = 'asc'
      }
      else {
        this.formMember[column.prop]= 'desc'
      }
      this.getList(this.formMember)
    },
    statusType (val) {
      let obj = this.statusList.find(item => {
        return val == item.value
      })
      return obj.label
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
    handleRecceipt () {

    },
    viewJob (val) {
      this.id = val.id
      this.dialogJobVisible = true
    },
    handleDel (uid) {
      loginOutTeam({ uid }).then(res => {
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

