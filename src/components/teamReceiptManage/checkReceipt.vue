<style lang="scss">
@import "@/assets/css/resume.scss";
</style>
<template>
  <div class="tables-box billingManagement">
    <div class="table-list">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline">
        <el-form-item label="职位名称：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
        </el-form-item>
        <el-form-item label="状态筛选：">
          <el-button :type="activeIndex==index ?'primary':''" v-for="(item,index) in statusList" :key="index" plain @click="selectStatus(item,index)" class="select-status">{{item.label}}</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="handleEdit(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="薪资类型" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.money_type | moneyType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="岗位薪资" prop="depart_name" align="center" width="150"></el-table-column>
          <el-table-column label="返利类型" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.reward_type | rewardType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="返利金额" prop="reward_money" align="center" width="150"></el-table-column>
          <el-table-column label="发布日期" prop="entry_num" sortable align="center" width="150"></el-table-column>
          <el-table-column label="状态" align="center" width="150">
            <template slot-scope="props">
              <span class="status" :class="{'active-status':props.row.status==1}">{{props.row.status==1?"正常":'锁定'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getTeamList,
  loginOutTeam,
  addTeamUser,
  updateTeamUser
} from '@/api/team'
import { getReceiptList } from '@/api/receipt'
import { moneyTypeList, rewardTypeList } from '@/base/base'
export default {
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
    }
  },
  data() {
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
      activeIndex: 0
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
    selectStatus(item, index) {
      this.activeIndex = index
      this.formMember.status = item.value
    },
    handleSizeChange(val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange(val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleEdit(val) {
      this.dialogTableVisible = true
      this.userId = val
    },
    handleDel(uid) {
      loginOutTeam({ uid })
        .then(res => {
          this.$message.success('退出成功')
          this.getList(this.formMember)
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    submitMember(val) {
      updateTeamUser(val).then(res => {
        this.dialogTableVisible = false
        this.getList(this.params)
      })
    },
    handleSelectionChange(val) {
      this.len = val
    },
    onSubmit(value) {
      let params = Object.assign(this.formMember, value)
      this.getList(params)
    },
    submitForm(val) {
      this.visible = false
      addTeamUser(val)
        .then(res => {
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

