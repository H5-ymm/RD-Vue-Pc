<template>
  <div class="tables-box billingManagement">
    <div class="table-list">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
        </el-form-item>
        <el-form-item label="状态筛选：">
          <el-button :type="activeIndex==index ?'primary':''" v-for="(item,index) in statusList" :key="index" plain @click="selectStatus(item,index)" class="select-status">{{item.label}}</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <div class="table-query">
          <el-button @click="handleUser(1,id)">已入职</el-button>
          <el-button @click="handleUser(2,id)">未入职</el-button>
          <span class="select-text">
            已选择
            <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
          </span>
          <el-button type="text" @click="multipleSelection=[]">清空</el-button>
        </div>
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="viewJob(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="薪资类型" align="center" width="100">
            <template slot-scope="props">
              <el-button type="text">{{props.row.money_type | moneyType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="岗位薪资" prop="depart_name" align="center" width="150"></el-table-column>
          <el-table-column label="返利类型" align="center" width="100">
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
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status==0">
                <el-button @click="handleUser(1,scope.row.id)" type="text" size="small">已入职</el-button>
                <el-button @click="handleUser(2,scope.row.id)" type="text" size="small">未入职</el-button>
              </div>
              <span v-if="scope.row.status==2">未入职</span>
              <span v-if="scope.row.status==1">已入职</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 20, 30, 40]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <modal :dialogTableVisible="dialogTableVisible" @handleOk="handleOk" isShow="true" :modalObj="modalObj" @handleClose="visible=false,jobId=''"></modal>
    <viewJob :dialogTableVisible="dialogJobVisible" @handleClose="dialogJobVisible=fasle"></viewJob>
  </div>
</template>

<script>
// 入职审核
import { entryUserResumeList, updateEntryUser } from '../../api/receipt'
import { moneyTypeList, rewardTypeList, payTypeList } from '../../base/base'
import modal from '../common/modal'
import viewJob from '../common/viewJob'
export default {
  components: {
    modal,
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
      form: {},
      statusList: [
        { label: '全部', value: -1 },
        { label: '待审核', value: 0 },
        { label: '已入职', value: 1 },
        { label: '未入职', value: 2 }
      ],
      activeIndex: -1,
      id: '',
      modalObj: {
        content: '你确定要批量操作？',
        okText: '确定',
        closeText: '取消'
      },
      status: ''
    }
  },
  created () {
    let jobId = this.$route.query.id
    this.formMember.jobId = jobId
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      entryUserResumeList(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
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
    viewJob (val) {
      this.dialogJobVisible = true
    },
    handleUser (status, id) {
      if (!id) {
        return this.$message.warning('请选择成员')
      }
      if (id && this.multipleSelection.length) {
        this.dialogTableVisible = true
        this.status = status
        this.id = id
        return false
      }
      this.status = status
      this.id = id
      this.handleUserResume()
    },
    handleUserResume () {
      this.dialogTableVisible = false
      let params = {
        status: this.status,
        id: this.id,
        uid: localStorage.getItem('uid')
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
    handleSelectionChange (val) {
      let arr = val.map(item => {
        return item.id
      })
      this.id = arr.join(',')
    },
    handleOk () {
      this.handleUserResume()
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
