<style lang="scss">
@import '@/assets/css/resume';
.error {
  color: #fe2a00;
  font-size: 12px;
  margin: 20px 0 -15px;
  display: block;
}
</style>
<template>
  <div class="tables-box billingManagement receipt-manage">
    <div class="table-list">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="formMember.where" class="width300" placeholder="请输入姓名关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
        </el-form-item>
        <el-form-item label="发单状态：">
          <el-select v-model="formMember.job_status" value-key="label" @change="selectStatus" class="width160" placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="item in receiptStatusList" :key="item.value"></el-option>
          </el-select>
          <span class="error el-icon-warning">更改发单状态之后可以操作其他发单状态下的简历</span>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <div class="table-query">
          <el-button @click="handlResume(1,this.params)">{{formMember.job_status!=3?'通过':'入职'}}</el-button>
          <el-button @click="handlResume(2,this.params)">{{formMember.job_status!=3?'未通过':'未入职'}}</el-button>
          <span class="select-text">
            已选择
            <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
          </span>
          <el-button type="text" @click="multipleSelection=[],jobId='',resumeId=''">清空</el-button>
        </div>
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column label="姓名" align="center" prop="name" width="110">
          </el-table-column>
          <el-table-column label="年龄" align="center" prop="age" width="110">
          </el-table-column>
          <el-table-column label="性别" align="center" width="110">
            <template slot-scope="props">
              <span>{{props.row.sex==1?'男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="学历" align="center" width="110" prop="education">
          </el-table-column>
          <el-table-column label="住址" prop="reward_money" align="center" width="110">
            <template slot-scope="props">
              <span>{{props.row.province}}{{props.row.city}}{{props.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column label="推荐时间" prop="addtime" align="center" width="180"></el-table-column>
          <el-table-column :label="lable" align="center" width="110">
            <template slot-scope="props" v-if="job_status==1">
              <span class="status" :class="`status${props.row.status}`">{{ props.row.status==0 ? '待审核': props.row.status==1?'已通过':'未通过'}}</span>>
            </template>
            <template slot-scope="props" v-if="job_status==2">
              {{props.row.interview_status}}
              <span class="status" :class="`status${props.row.interview_status}`">{{props.row.interview_status==0?'待审核':props.row.interview_status==1?'已通过':'未通过'}}</span>
            </template>
            <template slot-scope="props" v-if="job_status==3">
              <span class="status" :class="`status${props.row.entry_status}`">{{props.row.entry_status==0?'待审核':props.row.entry_status==1?'已通过':'未通过'}}</span>
            </template>

          </el-table-column>
          <el-table-column label="操作" align="center" min-width="160">
            <template slot-scope="scope">
              <div v-if="job_status==1">
                <el-button @click="handlResume(1,scope.row)" type="text" v-if="!scope.row.status" size="small">通过</el-button>
                <el-button @click="handlResume(2,scope.row)" type="text" v-if="!scope.row.status" size="small">未通过</el-button>
                <span v-if="scope.row.status">{{scope.row.status==1?'已通过':'未通过'}}</span>
              </div>
              <div v-else-if="job_status==2">
                <el-button @click="handlResume(1,scope.row)" type="text" v-if="!scope.row.interview_status" size="small">通过</el-button>
                <el-button @click="handlResume(2,scope.row)" type="text" v-if="!scope.row.interview_status" size="small">未通过</el-button>
                <span v-if="scope.row.interview_status">{{scope.row.interview_status==1?'已通过':'未通过'}}</span>
              </div>
              <div v-else>
                <el-button @click="handlResume(1,scope.row)" type="text" size="small" v-if="!scope.row.entry_status">已入职</el-button>
                <el-button @click="handlResume(2,scope.row)" type="text" size="small" v-if="!scope.row.entry_status">未入职</el-button>
                <span v-if="scope.row.entry_status">{{scope.row.entry_status==1?'已通过':'未通过'}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <modal :dialogTableVisible="dialogTableVisible" @handleOk="handleOk" :modalObj="modalObj" @handleClose="dialogTableVisible=false,jobId=''"></modal>
  </div>
</template>

<script>
import {
  getPutresume,
  auditRemuse,
  entrantResult,
  checkPutresume,
  viewResult
} from '@/api/internalInvoice'
import { entryStatusList1 } from '@/base/base'
import modal from '../common/modal'
export default {
  components: {
    modal
  },
  data() {
    return {
      entryStatusList1,
      dialogTableVisible: false,
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        job_status: 1
      },
      total: 0,
      multipleSelection: [],
      receiptStatusList: [
        { label: '审核简历', value: 1 },
        { label: '面试结果', value: 2 },
        { label: '入职结果', value: 3 }
      ],
      viewType: 1,
      jobId: '',
      modalObj: {
        content: '你确定要批量操作？',
        okText: '确定',
        closeText: '取消'
      },
      status: 1,
      params: null,
      resumeId: '',
      id: '',
      job_status: ''
    }
  },
  computed: {
    lable() {
      return this.formMember.job_status == 1
        ? '审核状态'
        : this.formMember.job_status == 2
          ? '面试状态'
          : '入职状态'
    }
  },
  created() {
    // 初始化查询标签数据
    if (this.$route.query.jobId) {
      this.jobId = this.$route.query.jobId
      this.formMember.job_id = this.jobId
    }
    this.job_status = this.$route.query.jobStatus
    this.formMember.job_status = Number(this.$route.query.jobStatus)
    this.getList(this.formMember)
  },
  methods: {
    getList(params) {
      getPutresume(params)
        .then(res => {
          const { data } = res
          this.tableData = data.data
          this.total = data.count
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    selectStatus(val) {
      this.formMember.job_status = val
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
    handlResume(status, val) {
      if (!val) {
        return this.$message.warning('请选择简历')
      }
      this.status = status
      this.resumeId = val.resume_id
      this.id = val.id
      if (val && this.multipleSelection.length) {
        this.dialogTableVisible = true
        return false
      }
      this.handleOk()
    },
    handleOk() {
      this.dialogTableVisible = false
      let params = {
        uid: localStorage.getItem('uid'),
        job_id: this.jobId,
        status: this.status,
        ids: this.id
      }
      if (this.formMember.job_status == 1) {
        this.resumeResult(params)
      } else if (this.formMember.job_status == 2) {
        this.checkResume(params)
      } else {
        this.handleEntrant(params)
      }
    },
    // 审核简历
    checkResume(params) {
      viewResult(params)
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
    // 入职结果
    handleEntrant(params) {
      entrantResult(params)
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
    // 面试结果
    resumeResult(params) {
      auditRemuse(params)
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
    handleSelectionChange(val) {
      this.multipleSelection = val
      let arr = val.map(item => {
        return item.id
      })
      this.id = arr.join(',')
    },
    onSubmit() {
      this.getList(this.formMember)
    }
  }
}
</script>

