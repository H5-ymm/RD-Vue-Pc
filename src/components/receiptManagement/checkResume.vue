<style lang="scss">
@import '@/assets/css/resume';
</style>
<template>
  <div class="tables-box billingManagement receipt-manage">
    <div class="table-list">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline form-item-wrap">
        <el-form-item label="职位名称：">
          <el-input v-model="formMember.where" class="width300" placeholder="请输入职位名称关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
        </el-form-item>
        <el-form-item label="状态筛选：">
          <el-button :type="activeIndex==index ?'primary':''" v-for="(item,index) in statusList" :key="index" plain @click="selectStatus(item,index)" class="select-status">{{item.label}}</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <div class="table-query">
          <el-button @click="handlResume(1,id)">通过</el-button>
          <el-button @click="handlResume(2,id)">未通过</el-button>
          <span class="select-text">
            已选择
            <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
          </span>
          <el-button type="text" @click="multipleSelection=[]">清空</el-button>
        </div>
        <el-table border @sort-change="sortChange" :data="tableData" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column label="姓名" align="center" width="110">
            <template slot-scope="props">
              <el-button type="text">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="年龄" prop="age" align="center" width="110">
          </el-table-column>
          <el-table-column label="性别" align="center" width="110">
            <template slot-scope="props">
              <span>
                {{props.row.sex==1?'男': '女'}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="学历" prop="education" align="center" width="110">
          </el-table-column>
          <el-table-column label="住址" prop="citys" align="center" width="110"></el-table-column>
          <el-table-column label="推荐时间" prop="desc" sortable="custom" align="center" width="180">
            <template slot-scope="props">
              <span type="text">{{props.row.addtime?$moment.unix(props.row.addtime).format('YYYY-MM-DD'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="entry_num" align="center" width="180">
            <template slot-scope="props">
              <div v-if="viewType==3">
                <span class="status" :class="`status${props.row.status}`">
                  {{props.row.status|status}}
                </span>
              </div>
              <div v-if="viewType==4">
                <span class="status" :class="`status${props.row.interview_status}`">
                  {{props.row.interview_status|status}}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="label" align="center" min-width="150">
            <template slot-scope="scope">
              <div v-if="viewType==4">
                <el-button @click="handlResume(1,scope.row.id)" type="text" size="small" v-if="!scope.row.interview_status">通过</el-button>
                <span v-if="scope.row.interview_status==1">通过</span>
                <span v-if="scope.row.interview_status==2">{{scope.row.scope.row.interview_status|status}}</span>
                <el-button @click="handlResume(2,scope.row.id)" type="text" size="small" v-if="!scope.row.interview_status">未通过</el-button>
              </div>
              <div v-else>
                <el-button @click="handlResume(1,scope.row.id)" type="text" size="small" v-if="!scope.row.status">通过</el-button>
                <span v-if="scope.row.status==1">通过</span>
                <span v-if="scope.row.status==2">{{scope.row.status|status}}</span>
                <el-button @click="handlResume(2,scope.row.id)" type="text" size="small" v-if="!scope.row.status">未通过</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <modal :dialogTableVisible="dialogTableVisible" @handleOk="handleOk" :modalObj="modalObj" @handleClose="dialogTableVisible=false,id=''"></modal>
  </div>
</template>

<script>
import { getTeamList, loginOutTeam, addTeamUser, updateTeamUser } from '../../api/team'
import { auditResumeList, auditResumeRecommend, entryResumeList, auditEntryResume } from '../../api/receipt'
import { moneyTypeList, rewardTypeList, checkStatusList1 } from '../../base/base'
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
      return obj ? obj.label : '--'
    },
    rewardType (val) {
      let obj = rewardTypeList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    },
    status (val) {
      let obj = checkStatusList1.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    }
  },
  data () {
    return {
      checkStatusList1,
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
      userId: '',
      multipleSelection: [],
      form: {},
      statusList: [
        { label: '全部', value: 0 },
        { label: '待审核', value: 1 },
        { label: '已通过', value: 2 },
        { label: '未通过', value: 3 }
      ],
      activeIndex: 0,
      viewType: 1,
      jobId: '',
      id: '',
      modalObj: {
        content: '你确定要批量操作？',
        okText: '确定',
        closeText: '取消'
      },
      status: ''
    }
  },
  watch: {
    $route (to, from) {
      if (this.viewType == 3) {
        this.formMember.job_id = this.$route.query.id
      }
      else {
        this.formMember.jobId = this.$route.query.id

      }
      this.getList(this.formMember)
    }
  },
  computed: {
    label () {
      return this.viewType == 3 ? '审核简历' : '审核面试'
    }
  },
  created () {
    // 初始化查询标签数据
    this.viewType = this.$route.query.view
    if (this.viewType == 3) {
      let arr = JSON.parse(sessionStorage.getItem('menus'))
      arr[1] = '审核结果'
      this.formMember.job_id = this.$route.query.id
      sessionStorage.setItem('menus', JSON.stringify(arr))
    }
    if (this.viewType == 4) {
      this.formMember.jobId = this.$route.query.id
      this.jobId = this.$route.query.id
    }
    if (this.$route.query.id) {
      this.getList(this.formMember)
    }
  },
  methods: {
    getList (params) {
      if (this.viewType == 3) {
        auditResumeList(params).then(res => {
          const { data } = res
          this.tableData = data.data
          this.total = data.count
        })
      }
      else {
        entryResumeList(params).then(res => {
          const { data } = res
          this.tableData = data.data
          this.total = data.count
        })
      }

    },
    sortChange (column) {
      if (column.order == 'ascending') {
        this.formMember[column.prop] = 'asc'
      }
      else {
        this.formMember[column.prop] = 'desc'
      }
      this.getList(this.formMember)
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
    handlResume (status, id) {
      if (!id) {
        return this.$message.warning('请选择简历')
      }
      if (id && this.multipleSelection.length) {
        this.dialogTableVisible = true
        this.status = status
        this.id = id
        return false
      }
      this.status = status
      this.id = id
      this.checkResume()
    },
    handleOk () {
      this.checkResume()
    },
    checkResume () {
      let params = {
        uid: localStorage.getItem('uid'),
        id: this.id,
        status: this.status
      }
      if (this.viewType == 3) {
        auditResumeRecommend(params).then(res => {
          this.$message.success('操作成功')
          this.dialogTableVisible = false
          this.getList(this.formMember)
        }).catch(error => {
          this.$message.error(error.status.remind)
        })
      }
      else {
        auditEntryResume(params).then(res => {
          this.$message.success('操作成功')
          this.getList(this.formMember)
        }).catch(error => {
          this.$message.error(error.status.remind)
        })
      }
    },
    submitMember (val) {
      updateTeamUser(val).then(res => {
        this.dialogTableVisible = false
        this.getList(this.formMember)
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      let arr = val.map(item => {
        return item.id
      })
      this.id = arr.join(',')
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

