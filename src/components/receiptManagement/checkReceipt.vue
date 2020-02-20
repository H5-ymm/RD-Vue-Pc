
<style lang="scss">
@import "@/assets/css/resume";
</style>
<template>
  <div class="tables-box billingManagement receipt-manage">
    <div class="table-list">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline form-item-wrap">
        <el-form-item label="职位名称：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
        </el-form-item>
        <el-form-item label="状态筛选：">
          <el-button :type="activeIndex==index ?'primary':''" v-for="(item,index) in checkStatusList" :key="index" plain @click="selectStatus(item,index)" class="select-status">{{item.label}}</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%" @sort-change="sortChange">
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
          <el-table-column label="岗位薪资" align="center" width="150">
            <template slot-scope="props">
              <span v-if="props.row.money_type==1">{{props.row.money_min}}~{{props.row.money_max}}</span>
              <span v-else>{{props.row.money || 0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="返利类型" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.reward_type | rewardType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="返利金额" prop="reward_money" align="center" width="150"></el-table-column>
          <el-table-column label="发布日期" prop="desc" sortable="custom" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.ctime?$moment.unix(props.row.ctime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="150">
            <template slot-scope="props">
              <span class="status status2" v-if="props.row.status==1&&props.row.job_status==1">待审核</span>
              <span class="status status2" v-if="props.row.status==1&&props.row.job_status==2">已下架</span>
              <span class="status" :class="`status${props.row.status-1}`" v-if="props.row.status!=1&&props.row.job_status==1">{{props.row.status==2?'已通过':'未通过'}}</span>
              <span class="status" :class="`status${Number(props.row.job_status)+1}`" v-if="!props.row.job_status&&props.row.status==2">{{props.row.job_status==1?'已上架':'已下架'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="150">
            <template slot-scope="scope">
              <!-- <el-button
                @click="handleEdit(scope.row)"
                type="text"
                v-if="scope.row.status==1"
                size="small"
              >修改</el-button> -->
              <el-button type="text" size="small" v-if="scope.row.status==1" @click="editJob(scope.row)">修改</el-button>
              <el-button @click="handleDel(scope.row)" type="text" v-if="scope.row.status!=2" size="small">删除</el-button>
              <el-button @click="viewJob(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="handleRecceipt(2,scope.row)" v-if="scope.row.status==2&&scope.row.job_status==1" type="text" size="small">下架</el-button>
              <el-button @click="handleRecceipt(1,scope.row)" type="text" v-if="scope.row.status==2&&(scope.row.job_status==2||scope.row.job_status==1)" size="small">上架</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <viewJob :dialogTableVisible="dialogJobVisible" :id="id" @handleClose="dialogJobVisible=false"></viewJob>
  </div>
</template>

<script>
import {
  getReceiptList,
  companyReceiptShelf,
  delReceiptShelf
} from '@/api/receipt'
import {
  moneyTypeList,
  rewardTypeList,
  payTypeList,
  checkStatusList
} from '@/base/base'
import viewJob from '../common/viewJob'
export default {
  components: {
    viewJob
  },
  filters: {
    moneyType(val) {
      let obj = moneyTypeList.find(item => {
        return val == item.value
      })
      return obj.label
    },
    rewardType(val) {
      let obj = rewardTypeList.find(item => {
        return val == item.value
      })
      return obj.label
    },
    statusType(val) {
      let obj = checkStatusList.find(item => {
        return val == item.value
      })
      return obj.label
    }
  },
  data() {
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
        page: 1,
        desc: 'desc'
      },
      total: 0,
      len: 0,
      userId: '',
      multipleSelection: [],
      activeIndex: 0,
      id: ''
    }
  },
  created() {
    // 初始化查询标签数据
    this.getList(this.formMember)
  },
  methods: {
    getList(params) {
      getReceiptList(params)
        .then(res => {
          this.tableData = res.data.data
          this.total = res.data.count
        })
        .catch(error => {
          if (error && error.status) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    sortChange(column) {
      if (column.order == 'ascending') {
        this.formMember[column.prop] = 'asc'
      } else {
        this.formMember[column.prop] = 'desc'
      }
      this.getList(this.formMember)
    },
    editJob(val) {
      this.$router.push('createOrderTaking?id=' + val.id)
    },
    statusType(val) {
      let obj = this.statusList.find(item => {
        return val == item.value
      })
      return obj.label
    },
    selectStatus(item, index) {
      this.activeIndex = index
      this.formMember.status = item.value
      this.getList(this.formMember)
    },
    handleSizeChange(val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange(val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleRecceipt(status, val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: val.id,
        job_status: status
      }
      companyReceiptShelf(params)
        .then(res => {
          this.$message.success('操作成功')
          this.getList(this.formMember)
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    viewJob(val) {
      this.id = val.id
      this.dialogJobVisible = true
    },
    handleDel(val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: val.id
      }
      delReceiptShelf(params)
        .then(res => {
          if (res.data) {
            this.$message.success('删除成功')
            this.getList(this.formMember)
          } else {
            this.$message.error('删除失败')
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    onSubmit() {
      this.getList(this.formMember)
    }
  }
}
</script>

