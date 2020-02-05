<style lang="scss">
@import '@/assets/css/resume.scss';
</style>
<template>
  <div class="tables-box billingManagement">
    <div class="table-list">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline">
        <el-form-item label="职位名称：">
          <el-input v-model="formMember.job_name" class="width300" placeholder="请输入职位名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="团队名称：">
          <el-input v-model="formMember.team_name" class="width300" placeholder="请输入团队名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="返利模式：">
          <el-select v-model="formMember.money_type" class="width300" placeholder="请选择返利模式">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in rewardTypeList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请状态：">
          <el-select v-model="formMember.status" class="width300" placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in applyStatusList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="reset" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <el-table border :data="tableData" @sort-change="sortChange" ref="multipleTable" style="width: 100%">
          <el-table-column label="职位名称" prop="job_name" align="center" width="150"></el-table-column>
          <el-table-column label="团队名称" align="center" width="150">
            <template slot-scope="props">
              <span class="text-line">{{props.row.com_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="需求人数" prop="required_number" align="center" width="150">
          </el-table-column>
          <el-table-column label="岗位薪资" prop="depart_name" align="center" width="150">
            <template slot-scope="props">
              <div>
                {{props.row.money}}元/{{props.row.money_type==1?'月':props.row.money_type?'日':'时'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="返利模式" align="center" width="150">
            <template slot-scope="props">
              <div>
                {{props.row.reward_type|rewardType}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="申请日期" prop="desc" sortable="custom" align="center" width="150">

            <template slot-scope="props">
              <div>
                {{props.row.addtime?$moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'): '--'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="150">
            <template slot-scope="props">
              <span class="status" :class="`status${props.row.status}`">{{props.row.status|status}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button @click="viewJob(scope.row)" type="text" size="small" v-if="scope.row.status!=3">查看职位</el-button>
              <el-button @click="handleCancle(scope.row)" type="text" size="small" v-if="scope.row.status==0">取消申请</el-button>
              <el-button @click="dialogTableVisible=true" type="text" size="small" v-if="scope.row.status==1">联系客服</el-button>
              <span v-if="scope.row.status==3" class="no-status">已取消申请</span>
              <el-button @click="handleDel(scope.row)" type="text" size="small" v-if="scope.row.status>1||scope.row.status==4&&scope.row.p_status==-1">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <customerService :dialogTableVisible="dialogTableVisible"></customerService>
    <viewJob :dialogTableVisible="dialogJobVisible" :id="jobId" @handleClose="dialogJobVisible=false"></viewJob>
  </div>
</template>

<script>
import { listApply, addApply, cancelApply, delApply } from '@/api/teamReceipt'
import customerService from '../common/customerService'
import viewJob from '../common/viewJob'
import {
  moneyTypeList,
  rewardTypeList,
  payTypeList,
  weekList,
  applyStatusList
} from '../../base/base'
export default {
  components: {
    customerService,
    viewJob
  },
  filters: {
    rewardType(val) {
      let obj = rewardTypeList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    },
    status(val) {
      let obj = applyStatusList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    }
  },
  data() {
    return {
      moneyTypeList,
      rewardTypeList,
      applyStatusList,
      dialogTableVisible: false,
      dialogJobVisible: false,
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      jobId: ''
    }
  },
  created() {
    // 初始化查询标签数据
    this.getList(this.formMember)
  },
  methods: {
    getList(params) {
      listApply(params)
        .then(res => {
          this.tableData = res.data.data
          this.total = res.data.count
        })
        .catch(error => {
          this.$message.error(error.status.remind)
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
    handleSizeChange(val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange(val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    // 查看职位
    viewJob(val) {
      this.jobId = val.job_id
      this.dialogJobVisible = true
    },
    handleCancle(val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: val.id
      }
      cancelApply(params)
        .then(res => {
          this.$message.success('取消成功')
          this.getList(this.formMember)
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    handleDel(val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: val.id
      }
      delApply(params)
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
    },
    submitForm(val) {
      this.visible = false
      addTeamUser(val)
        .then(res => {
          if (res.data.error == 1) {
            if (res.data.is_lock == 1) {
              return this.$message.error('团队账号已锁定，不能接单')
            } else if (res.data.status == 1) {
              return this.$message.error('团队账号未审核，不能接单')
            } else if (res.data.status == 3) {
              return this.$message.error('团队账号审核未通过，不能接单')
            } else {
              return this.$message.error('接单失败')
            }
          }
          if (res.data) {
            this.getList(this.formMember)
          } else {
            this.$message.error('接单失败')
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    reset() {
      this.formMember = {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      }
      this.getList(this.formMember)
    }
  }
}
</script>

