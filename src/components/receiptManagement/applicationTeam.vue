<style lang="scss">
@import '@/assets/css/resume';
</style>
<template>
  <div class="tables-box billingManagement">
    <div class="table-list">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline">
        <el-form-item label="职位名称：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="团队名称：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入团队名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="团队负责人：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入团队负责人姓名"></el-input>
        </el-form-item>
        <el-form-item label="团队性质：">
          <el-select v-model="formMember.industry" class="width300" placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in teamTypeList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="formMember.industry" class="width300" placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in applyStatusList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="onSubmit" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="viewJob(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="团队名称" prop="team_name" align="center" width="150">
          </el-table-column>
          <el-table-column label="团队负责人" align="center" prop="team_user" width="150">
          </el-table-column>
          <el-table-column label="团队性质" prop="reward_money" align="center" width="150">

            <template slot-scope="props">
              <span>{{props.row.team_type==1?'个人':'企业'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请日期" prop="jddesc" sortable align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.addtime?$moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="150">
            <template slot-scope="props">
              <span class="status" :class="`status${props.row.status}`">{{props.row.status|statusType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="180">
            <template slot-scope="scope">
              <el-button @click="viewTeam(scope.row)" type="text" v-if="scope.row.status<2" size="small">查看团队</el-button>
              <el-button @click="viewJob(scope.row)" type="text" size="small" v-if="scope.row.status>=2&&scope.row.status<5">查看职位</el-button>
              <el-button @click="handleDel(scope.row)" type="text" v-if="scope.row.status>1" size="small">删除</el-button>
              <el-button @click="dialogTableVisible=true" type="text" size="small" v-if="scope.row.status==1">联系客服</el-button>
              <el-button @click="handleShelf(1,scope.row)" type="text" size="small" v-if="scope.row.status==6">上架</el-button>
              <el-button @click="handleShelf(2,scope.row)" type="text" size="small" v-if="scope.row.status==5">下架</el-button>
              <el-button @click="handleAudit(1,scope.row)" type="text" size="small" v-if="scope.row.status==0">同意</el-button>
              <el-button @click="handleAudit(2,scope.row)" v-if="scope.row.status==0" type="text" size="small">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <customerService :dialogTableVisible="dialogTableVisible"></customerService>
    <viewJob :dialogTableVisible="dialogJobVisible" :id="id" @handleClose="dialogJobVisible=false"></viewJob>
    <viewTeam :dialogTableVisible="dialogTeamVisible" @handleClose="dialogTeamVisible=fasle" :teamId="teamId"></viewTeam>
  </div>
</template>

<script>
import { applyInvoiceList, auditInvoiceInfo, delCompanyTeamApply, companyReceiptShelf } from '../../api/receipt'
import customerService from '../common/customerService'
import viewJob from '../common/viewJob'
import viewTeam from '../common/viewTeam'
import { moneyTypeList, rewardTypeList, payTypeList, applyStatusList } from '../../base/base'
export default {
  components: {
    customerService,
    viewJob,
    viewTeam
  },
  filters: {
    moneyType (val) {
      let obj = moneyTypeList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    },
    rewardType (val) {
      let obj = rewardTypeList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    },
    statusType (val) {
      let obj = applyStatusList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    }

  },
  data () {
    return {
      moneyTypeList,
      rewardTypeList,
      applyStatusList,
      dialogTableVisible: false,
      dialogTeamVisible: false,
      dialogJobVisible: false,
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      teamTypeList: [
        { label: '全部', value: 0 },
        { label: '个人', value: 2 },
        { label: '企业', value: 1 },
      ],
      teamId: '',
      id: ''
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      applyInvoiceList(params).then(res => {
        const { data } = res
        console.log(res)
        this.tableData = data.data
        this.total = data.count
      })
    },
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    viewTeam (val) {
      this.teamId = val.team_id
      this.dialogTeamVisible = true
    },
    viewJob (val) {
      this.id = val.id
      this.dialogJobVisible = true
    },
    handleAudit (status, val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: val.id,
        status: status
      }
      auditInvoiceInfo(params).then(res => {
        this.$message.success('操作成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.warning(error.status.remind)
      })
    },
    handleShelf (status, val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: val.id,
        status: status
      }
      companyReceiptShelf(params).then(res => {
        this.$message.success('操作成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.warning(error.status.remind)
      })
    },
    handleDel (val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: val.id,
      }
      delCompanyTeamApply(params).then(res => {
        this.$message.success('删除成功')
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

