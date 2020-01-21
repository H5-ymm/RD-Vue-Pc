<style lang="scss">
@import '@/assets/css/resume';
</style>
<template>
  <div class="tables-box billingManagement">
    <div class="table-list">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="formMember.where" class="width300" placeholder="请输入职位名称关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <div class="table-query" v-if="viewType!=5&&viewType!=4&&viewType!=3&&viewType!=2">
          <el-button @click="handleResume(1,id)">通过</el-button>
          <el-button @click="handleResume(2,id)">未通过</el-button>
        </div>
        <div class="table-query" v-if="viewType==4">
          <el-button @click="handleUser(1,id)">已入职</el-button>
          <el-button @click="handleUser(2,id)">未入职</el-button>
        </div>
        <el-table border :data="tableData" ref="multipleTable" @sort-change="sortChange" @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" align="center" width="50" v-if="viewType!=5"></el-table-column>
          <el-table-column label="姓名" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="年龄" prop="age" align="center" width="150">
          </el-table-column>
          <el-table-column label="性别" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.sex==1?'男':props.row.sex==2?'女':'男女不限'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="学历" prop="education" align="center" width="150"></el-table-column>
          <el-table-column label="住址" align="center" prop="citys" width="150">
          </el-table-column>
          <el-table-column label="推荐时间" prop="entry_num" sortable align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.addtime?$moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" min-width="150">
            <template slot-scope="props">
              <div v-if="viewType==2||viewType==4">
                <span class="status" v-if="!props.row.entry_status">待审核</span>
                <span class="status" v-else :class="`status${props.row.entry_status}`">{{props.row.entry_status==1?'通过':props.row.entry_status==2?'未通过':'未参加'}}</span>
              </div>
              <div v-if="viewType==3||viewType==6">
                <span class="status" v-if="!props.row.interview_status">待审核</span>
                <span class="status" :class="`status${props.row.interview_status}`" v-else>{{props.row.interview_status==1?'通过':props.row.interview_status==2?'未通过':'未参加'}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="150" v-if="viewType==2">
            <template slot-scope="props">
              <el-button type="text" @click="handleUserQuit(props.row)" size="small">离职</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="150" v-if="viewType==4">
            <template slot-scope="props">
              <div v-if="!props.row.entry_status">
                <el-button type="text" @click="handleUser(1,props.row.id)" size="small">已入职</el-button>
                <el-button type="text" @click="handleUser(2,props.row.id)" size="small">未入职</el-button>
              </div>
              <span v-else>{{props.row.entry_status==1?'已入职':'未入职'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="150" v-if="viewType==3||viewType==6">
            <template slot-scope="props">
              <div v-if="props.row.interview_status==0">
                <el-button type="text" @click="handleResume(1,props.row.id)" size="small">通过</el-button>
                <el-button type="text" @click="handleResume(2,props.row.id)" size="small">未通过</el-button>
                <el-button type="text" @click="handleResume(3,props.row.id)" size="small">未参加</el-button>
              </div>
              <div v-else>
                <span v-if="!props.row.entry_status&&props.row.interview_status">{{props.row.interview_status==1?'通过':props.row.interview_status==2?'未通过':'未参加'}}</span>
              </div>
              <span v-if="props.row.entry_status&&props.row.entry_status!=4">{{props.row.entry_status==1?'通过':props.row.entry_status==2?'未通过':'未参加'}}</span>
              <span v-if="props.row.interview_status==4">放弃面试</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="150" v-if="viewType==5">
            <template slot-scope="props">
              <div v-if="props.row.entry_status==0">
                <el-button type="text" @click="handleResume(1,props.row.id)" size="small">通过</el-button>
                <el-button type="text" @click="handleResume(2,props.row.id)" size="small">未通过</el-button>
                <el-button type="text" @click="handleResume(3,props.row.id)" size="small">未参加</el-button>
              </div>
              <span v-if="!props.row.entry_status&&props.row.entry_status!=4">{{props.row.entry_status==1?'通过':props.row.entry_status==2?'未通过':'未参加'}}</span>
              <span v-if="props.row.entry_status==4">放弃面试</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <confirmDialog :dialogTableVisible="visible" @submit="submitQuit" @handleClose="visible=false" :dialogObj="dialogObj"></confirmDialog>
  </div>
</template>

<script>
import {
  incumbencyUserResumeList,
  entryUserResumeList,
  entryResumeList,
  updateEntryUser,
  auditEntryResume,
  quitResumeRecommend
} from '../../api/receipt'
import { moneyTypeList, rewardTypeList, payTypeList } from '../../base/base'
import confirmDialog from '../common/confirmDialog'
export default {
  components: {
    confirmDialog
  },
  filters: {
    moneyType(val) {
      let obj = moneyTypeList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    },
    rewardType(val) {
      let obj = rewardTypeList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
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
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      len: 0,
      userId: '',
      multipleSelection: [],
      statusList: [
        { label: '全部', value: 0 },
        { label: '待审核', value: 1 },
        { label: '已通过', value: 2 },
        { label: '未通过', value: 3 },
        { label: '已下架', value: -1 }
      ],
      activeIndex: 0,
      viewType: '',
      resumeId: '',
      id: '',
      dialogObj: {
        title: '离职',
        subTitle: '离职理由',
        okText: '确认离职',
        placeholder: '请输入离职理由'
      }
    }
  },
  created() {
    // 初始化查询标签数据
    // viewType
    // 4.面试结果
    // 5.入职审核
    // 2.在职名单
    this.viewType = this.$route.query.view
    this.jobId = this.$route.query.id
    this.formMember.jobId = this.jobId
    this.getList(this.formMember)
  },
  methods: {
    getList(params) {
      if (this.viewType == 4) {
        entryUserResumeList(params)
          .then(res => {
            this.getData(res)
          })
          .catch(error => {
            if (error) {
              this.$message.warning(error.status.remind)
            }
          })
      } else if (this.viewType == 3 || this.viewType == 6) {
        entryResumeList(params)
          .then(res => {
            this.getData(res)
          })
          .catch(error => {
            if (error) {
              this.$message.warning(error.status.remind)
            }
          })
      } else {
        incumbencyUserResumeList(params)
          .then(res => {
            this.getData(res)
          })
          .catch(error => {
            if (error) {
              this.$message.warning(error.status.remind)
            }
          })
      }
    },
    sortChange(column) {
      if (column.order == 'ascending') {
        this.formMember[column.prop] = 'asc'
      } else {
        this.formMember[column.prop] = 'desc'
      }
      this.getList(this.formMember)
    },
    handleSelectionChange(val) {
      let arr = val.map(item => {
        return item.id
      })
      this.id = arr.join(',')
    },
    handleUserQuit(val) {
      this.id = val.id
      this.resumeId = val.resume_id
      this.visible = true
    },
    submitQuit(val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: this.id,
        resumeId: this.resumeId,
        content: val
      }
      quitResumeRecommend(params)
        .then(res => {
          this.$message.success('操作成功')
          this.visible = false
          this.getList(this.formMember)
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    getData(res) {
      this.tableData = res.data.data
      this.total = res.itemdata.count
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
    handleUser(status, val) {
      if (!val) {
        return this.$message.warning('请选择简历')
      }
      let params = {
        uid: localStorage.getItem('uid'),
        id: val,
        status: status
      }
      if (this.viewType != 3) {
        updateEntryUser(params)
          .then(res => {
            if (res.data) {
              this.$message.success('操作成功')
              this.getList(this.formMember)
            } else {
              this.$message.error('操作失败')
            }
          })
          .catch(error => {
            if (error) {
              this.$message.warning(error.status.remind)
            }
          })
      } else {
      }
    },
    handleResume(status, val) {
      if (!val) {
        return this.$message.warning('请选择简历')
      }
      let params = {
        uid: localStorage.getItem('uid'),
        id: val,
        status: status
      }
      auditEntryResume(params)
        .then(res => {
          if (res.data) {
            this.$message.success('操作成功')
            this.getList(this.formMember)
          } else {
            this.$message.error('操作失败')
          }
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    onSubmit() {
      this.getList(this.formMember)
    }
  }
}
</script>
