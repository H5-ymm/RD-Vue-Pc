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
        <el-form-item label="状态筛选：">
          <el-button
            :type="activeIndex==index ?'primary':''"
            v-for="(item,index) in statusList"
            :key="index"
            plain
            @click="selectStatus(item,index)"
            class="select-status"
          >{{item.label}}</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <div class="table-query">
          <el-button @click="handleUser(1,scope.row)">通过</el-button>
          <el-button @click="handleUser(2,scope.row)">未通过</el-button>
          <span class="select-text">
            已选择
            <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
          </span>
          <el-button type="text" @click="multipleSelection=[]">清空</el-button>
        </div>
        <el-table
          border
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column label="姓名" align="center" width="150">
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
              <span
                class="status"
                :class="{'active-status':props.row.status==1}"
              >{{props.row.status==1?"正常":'锁定'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="面试结果" align="center" width="150">
            <template slot-scope="scope">
              <el-button @click="handleUser(1,scope.row)" type="text" size="small">通过</el-button>
              <el-button @click="handleUser(2,scope.row)" type="text" size="small">未通过</el-button>
              <el-button @click="handleUser(3,scope.row)" type="text" size="small">未参加</el-button>
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
    <modal
      :dialogTableVisible="dialogTableVisible"
      @handleOk="handleOk"
      isShow="true"
      :modalObj="modalObj"
      @handleClose="dialogTableVisible=false,jobId=''"
    ></modal>
  </div>
</template>

<script>
import { entryResumeList, auditEntryResume } from '../../api/receipt'
import { moneyTypeList, rewardTypeList, payTypeList, weekList } from '../../base/base'
import modal from '../common/modal'
export default {
  components: {
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
        { label: '未参加', value: 4 }
      ],
      activeIndex: 0,
      status: 0,
      id: '',
      modalObj: {
        content: '你确定要批量操作？',
        okText: '确定',
        closeText: '取消'
      },
    }
  },
  created () {
    // 初始化查询标签数据
    // 面试名单
    this.formMember.jobId = this.$route.query.id
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      entryResumeList(params).then(res => {
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
    handleUser (status, uid) {
      if (!id) {
        return this.$message.warning('请选择成员')
      }
      if (id && this.multipleSelection.length) {
        this.dialogTableVisible = true
        this.status = status
        this.id = id
        this.handleResume()
      }
    },
    handleOk () {
      this.handleResume()
    },
    handleResume () {
      let params = {
        status: this.status,
        id: this.id,
        uid: localStorage.getItem('uid')
      }
      this.dialogTableVisible = false
      auditEntryResume(params).then(res => {
        this.$message.success('操作成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleSelectionChange (val) {
      let arr = val.map(item => {
        return item.id
      })
      this.id = arr.join(',')
    }
  }
}
</script>

