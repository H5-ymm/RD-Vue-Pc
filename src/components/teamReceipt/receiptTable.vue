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
              v-for="(item,index) in entryStatusList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="薪资模式：">
          <el-select v-model="formMember.industry" class="width300" placeholder="请选择薪资模式">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in moneyTypeList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="onSubmit" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%">
          <el-table-column label="职位名称" prop="name" align="center" width="150"></el-table-column>
          <el-table-column label="团队名称" align="center" prop="name" width="150"></el-table-column>
          <el-table-column label="需求人数" prop="depart_name" align="center" width="100"></el-table-column>
          <el-table-column label="岗位薪资" prop="reward_money" align="center" width="120"></el-table-column>
          <el-table-column label="返利模式" prop="entry_num" align="center" width="100"></el-table-column>
          <el-table-column label="接单日期" prop="entry_num" sortable align="center" width="150"></el-table-column>
          <el-table-column label="申请人" align="center" width="180" v-if="userPosition==3"></el-table-column>
          <el-table-column label="分配接单" align="center" width="180" v-if="userPosition==3">
            <template slot-scope="scope">
              <div
                class="text-line"
                @click="handleRecepit(2,scope.row)"
                v-if="(scope.row&&scope.row.uid==uid)||userPosition==3"
              >
                <el-button
                  v-for="(item,index) in scope.row.tolist"
                  :key="index"
                  type="text"
                  size="small"
                >{{item.name}}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="申请状态" align="center" width="100">
            <template slot-scope="props">
              <span
                class="status"
                :class="{'active-status':props.row.status==1}"
              >{{props.row.status==1?"正常":'锁定'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="120">
            <template slot-scope="scope">
              <div v-if="userPosition==2">
                <el-button @click="handleDel(scope.row)" type="text" size="small">申请推荐</el-button>
                <el-button @click="viewJob(scope.row)" type="text" size="small">查看职位</el-button>
                <el-button @click="dialogTableVisible=true" type="text" size="small">分配组员</el-button>
                <el-button @click="dialogVisible=true" type="text" size="small">删除职位</el-button>
              </div>
              <div v-if="userPosition==3">
                <el-button @click="viewJob(scope.row)" type="text" size="small">查看职位</el-button>
                <el-button @click="dialogTableVisible=true" type="text" size="small">分配接单</el-button>
                <el-button @click="$router.push('/commonTableList')" type="text" size="small">取消申请</el-button>
                <el-button @click="$router.push('/commonTableList')" type="text" size="small">同意</el-button>
                <el-button @click="$router.push('/commonTableList')" type="text" size="small">拒绝</el-button>
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="formMember.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <viewJob :dialogTableVisible="dialogJobVisible" @handleClose="dialogJobVisible=fasle"></viewJob>
    <personalModal
      :dialogTableVisible="dialogTableVisible"
      :personalList="personalList"
      @handleOk="handleOk"
      :title="userPosition==2?'分配组员':userPosition==3?'分配接单':''"
      @handleClose="dialogTableVisible=false"
    ></personalModal>
    <havePersonModal
      :dialogTableVisible="personVisible"
      @handleClose="personVisible=false"
      @handleOk="handleOk"
    ></havePersonModal>
    <modal
      :dialogTableVisible="dialogVisible"
      @handleOk="handleOk"
      :modalObj="modalObj"
      @handleClose="dialogVisible=false"
    ></modal>
  </div>
</template>

<script>
import { loginOutTeam, addTeamUser, updateTeamUser } from '../../api/team'
import { getReceiptList } from '../../api/receipt'
import { moneyTypeList, rewardTypeList, payTypeList, weekList, entryStatusList } from '../../base/base'
import viewJob from '../common/viewJob'
import modal from '../common/modal'
import personalModal from '../common/personalModal'
import havePersonModal from '../internalInvoice/havePersonModal'
export default {
  components: {
    viewJob,
    personalModal,
    havePersonModal,
    modal
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
      entryStatusList,
      dialogTableVisible: false,
      dialogJobVisible: false,
      personVisible: false,
      dialogVisible: false,
      tableData: [],
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
        { label: '等待入职', value: 1 },
        { label: '等待入职名单', value: 2 },
        { label: '完成入职名单', value: 3 }
      ],
      activeIndex: 0,
      personalList: [],
      userPosition: 1, // 1 成员，2经理，3 总经理
      handleStatus: 0,
      modalObj: {
        content: '你确定要删除职位吗？',
        okText: '确定',
        closeText: '取消'
      },
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
    viewJob (val) {
      this.dialogJobVisible = true
    },
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    // 分配操作
    handleRecepit (status, val) {
      this.handleStatus = status
      this.jobId = val.id
      if (status == 1) {
        this.getPersonList()
      }
      else {
        this.personalModal = true
      }
    },
    handleEdit (val) {
      this.dialogTableVisible = true
      this.userId = val
      console.log(this.userId)
    },
    handleDel (uid) {
      loginOutTeam({ uid }).then(res => {
        this.$message.success('退出成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleOk () {

    },
    submitMember (val) {
      updateTeamUser(val).then(res => {
        this.dialogTableVisible = false
        this.getList(this.params)
      })
    },
    onSubmit () {
      this.getList(this.formMember)
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
    width: 84%;
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
      &.resume-table {
        margin-top: 0;
        .select-text {
          margin-left: 10px;
        }
      }
    }
    .table-query {
      margin-bottom:20px;
    }
  }
  .width300 {
    width: 300px;
  }
  .select-status {
    margin-right: 10px;
  }
  .resume-number {
    font-size:14px;
    color:#FF1818;
  }
}
</style>
