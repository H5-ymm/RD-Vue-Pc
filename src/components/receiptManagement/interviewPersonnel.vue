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
        <el-form-item label="职位类别：">
          <el-select v-model="formMember.job_type" class="width300" placeholder="选择相应的职位类别">
            <el-option :label="item" :value="key" v-for="(item,key) in jobList" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="团队名称：">
          <el-input v-model="formMember.team_name" class="width300" placeholder="请输入团队名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="薪资模式：">
          <el-select v-model="formMember.money_type" class="width300" placeholder="请选择薪资模式">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in moneyTypeList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返利模式：">
          <el-select v-model="formMember.money_type" class="width300" placeholder="请选择返利模式">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in rewardTypeList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发单状态：">
          <el-select v-model="formMember.status" class="width300" placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in statusList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面试时间：">
          <el-date-picker class="width300" v-model="timeList" type="daterange" range-separator="-" start-placeholder="开始日期区间" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="onSubmit" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <div class="table-query">
          <el-button @click="exportResume">导出简历</el-button>
          <span class="select-text">
            已选择
            <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
          </span>
          <el-button type="text" @click="multipleSelection=[]">清空</el-button>
        </div>
        <el-table border :data="tableData" @sort-change="sortChange" @selection-change="handleSelectionChange" ref="multipleTable" style="width: 100%">
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.jobName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="团队名称" align="center" prop="team_name" width="150">
          </el-table-column>
          <el-table-column label="需求人数" prop="required_number" align="center" width="100"></el-table-column>
          <el-table-column label="面试通过" prop="recommendResume" align="center" width="110">
          </el-table-column>
          <el-table-column label="岗位薪资" align="center" width="120">
            <template slot-scope="props">
              <span v-if="props.row.money_type==1">{{props.row.money_min}}~{{props.row.money_max}}</span>
              <span v-else>{{props.row.money}}</span>
            </template>
          </el-table-column>
          <el-table-column label="薪资模式" align="center" width="100">
            <template slot-scope="props">
              <span>{{props.row.money_type|moneyType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="发单状态" align="center" width="110">
            <template slot-scope="props">
              <span class="status" :class="`status${props.row.interview_status-1}`">{{props.row.interview_status==4?'面试结束':'面试开始'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位城市" prop="citys" align="center" width="150"></el-table-column>
          <el-table-column label="接单时间" sortable="custom" prop="jddesc" align="center" width="160">
            <template slot-scope="props">
              <span>{{props.row.addtime?$moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="返利模式" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.reward_money}}元/{{props.row.reward_type==1?'月':props.row.reward_type==2?'日': props.row.reward_type==3?'时':'一次性'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="面试时间" prop="msdesc" sortable="custom" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.view_time?$moment.unix(props.row.view_time).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" align="center" width="110">
            <template slot-scope="props">
              <span>{{props.row.link_name?props.row.link_name:'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="195px">
            <template slot-scope="props">
              <el-button @click="setEntryTime(props.row)" v-if="props.row.interview_status!=4" type="text" size="small">查看面试</el-button>
              <el-button @click="setEntryTime(props.row)" v-if="props.row.interview_status!=4" type="text" size="small">审核结果</el-button>
              <el-button @click="viewEntrytList(props.row)" v-if="props.row.interview_status==4" type="text" size="small">面试名单</el-button>
              <!-- <el-button @click="setEntryTime(props.row)" type="text" size="small" v-if="props.row.interview_status==4">通知入职</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <receiptModal :dialogTableVisible="dialogTableVisible" noticeType="入职" :id="jobId" :isEdit="entry_time" @submitForm="submitForm"></receiptModal>
    <modal :dialogTableVisible="visible" @handleOk="handleOk" isShow="true" :modalObj="modalObj" @handleClose="visible=false,jobId=''"></modal>
  </div>
</template>
<script>
import {
  invoiceInterviewList,
  auditEntryResume,
  endInterview,
  exportInterviewResume,
  editEntryTime
} from '@/api/receipt'
import { moneyTypeList, rewardTypeList, entryStatusList3 } from '@/base/base'
import receiptModal from './receiptModal'
import modal from '../common/modal'
import { getConstant } from '@/api/dictionary'
export default {
  components: {
    receiptModal,
    modal
  },
  filters: {
    moneyType(val) {
      let obj = moneyTypeList.find(item => {
        return val == item.value
      })
      return obj?obj.label:'-'
    },
    rewardType(val) {
      let obj = rewardTypeList.find(item => {
        return val == item.value
      })
      return obj?obj.label:'-'
    },
    statusType(val) {
      let obj = entryStatusList3.find(item => {
        return val == item.value
      })
      return obj?obj.label:'-'
    }
  },
  data() {
    return {
      moneyTypeList,
      rewardTypeList,
      entryStatusList3,
      dialogTableVisible: false,
      visible: false,
      resumeVisible: false,
      tableData: [],
      currentPage: 1,
      userType: 1,
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        msdesc: 'asc'
      },
      total: 0,
      len: 0,
      userId: '',
      multipleSelection: [],
      form: {},
      statusList: [
        { label: '全部', value: 0 },
        { label: '面试开始', value: 1 },
        { label: '面试结束', value: 2 },
        { label: '入职开始', value: 3 },
        { label: '入职结束', value: 4 }
      ],
      activeIndex: 0,
      jobList: {},
      timeList: [],
      modalObj: {
        content: '你确定要批量操作？',
        okText: '确定',
        closeText: '取消'
      },
      resumeId: '',
      jobId: '',
      entry_time: 0
    }
  },
  created() {
    // 初始化查询标签数据
    if (this.$route.query.id) {
      this.formMember.jobId = this.$route.query.id
    }
    this.getList(this.formMember)
    let params = 'job_array'
    this.getData(params)
  },
  methods: {
    getData(filed) {
      getConstant({ filed })
        .then(res => {
          const { job_array } = res.data
          this.jobList = job_array
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    getList(params) {
      invoiceInterviewList(params)
        .then(res => {
          const { data } = res
          this.tableData = data.data
          this.total = data.count
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      let arr = val.map(item => {
        return item.id
      })
      this.jobId = arr.join(',')
    },
    exportResume() {
      if (!this.jobId) {
        return this.$message.warning('请选择简历')
      } else {
        this.visible = true
      }
    },
    handleOk() {
      this.visible = false
      let params = {
        uid: localStorage.getItem('uid'),
        jobId: this.jobId
      }
      exportInterviewResume(params)
    },
    viewEntrytList(val) {
      this.jobId = val.id
      if (!val.entry_time) {
        this.dialogTableVisible = true
        this.entry_time = ''
      } else {
        this.$router.push({
          path: '/commonTable',
          query: { id: val.id, view: 6 }
        })
      }
    },
    setEntryTime(val) {
      this.jobId = val.id
      if (!val.entry_time) {
        this.dialogTableVisible = true
      } else {
        // this.dialogTableVisible = true
        // this.entry_time = val.entry_time
        this.$router.push({path:'/checkResume',query:{id:val.id,view:4}})
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
    handleSizeChange(val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange(val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleOver(val) {
      let params = {
        uid: localStorage.getItem('uid'),
        jobId: val.id
      }
      endInterview(params)
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
    handleSelectionChange(val) {
      this.len = val
    },
    // 入职时间
    submitForm(val) {
      let params = Object.assign(val, {
        job_id: this.jobId,
        uid: this.formMember.uid
      })
      editEntryTime(params)
        .then(res => {
          this.dialogTableVisible = false
          sessionStorage.setItem('time', JSON.stringify(val))
          this.getList(this.formMember)
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
