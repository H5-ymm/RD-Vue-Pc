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
          <el-select v-model="formMember.reward_type" class="width300" placeholder="请选择返利模式">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in rewardTypeList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发单状态：">
          <el-select v-model="formMember.status" class="width300" placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in userResumeStatusList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面试时间：">
          <el-date-picker class="width300" v-model="timeList" @change="changeDate" type="daterange" range-separator="-" start-placeholder="开始日期区间" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="reset" class="select-btn">重置</el-button>
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
        <el-table border @sort-change="sortChange" :data="tableData" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" width="60"></el-table-column>
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="viewJob(props.row)">{{props.row.jobName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="团队名称" prop="team_name" align="center" width="150"> </el-table-column>
          <el-table-column label="需求人数" prop="required_number" align="center" width="150"></el-table-column>
          <el-table-column label="已推荐简历" align="center" prop="recommendResume" width="150"> </el-table-column>
          <el-table-column label="审核通过简历" align="center" prop="auditPassResume" width="150"> </el-table-column>
          <el-table-column label="岗位薪资" align="center" width="150">
            <template slot-scope="props">
              <span v-if="props.row.money_type==1">{{props.row.money_min}}~{{props.row.money_max}}</span>
              <span v-else>{{props.row.money}}</span>
            </template>
          </el-table-column>
          <el-table-column label="薪资模式" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.money_type|moneyType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="发单状态" align="center" width="150">
            <template slot-scope="props">
              <span class="status" v-if="props.row.invoice_status==0" :class="`status${props.row.invoice_status}`">收集中</span>
              <span class="status" v-if="props.row.invoice_status&&!props.row.interview_status" :class="`status${props.row.invoice_status}`">{{props.row.invoice_status==1?'审核中':'面试开始'}}</span>
              <span class="status" v-if="props.row.invoice_status=2&&props.row.interview_status&&!props.row.entry_status" :class="`status${props.row.interview_status}`">{{props.row.invoice_status?'面试开始':'面试结束'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="接单时间" sortable="custom" prop="jddesc" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.addtime?$moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="返利模式" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.reward_money}}元/{{props.row.reward_type==1?'月':props.row.reward_type==2?'日': props.row.reward_type==3?'时':'一次性'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="面试时间" sortable="custom" prop="jddesc" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.view_time?$moment.unix(props.row.view_time).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" prop="link_name" align="center" width="150"></el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="props">
              <div v-if="props.row.interview_status==0&&props.row.invoice_status<=1">
                <el-button @click="checkResume(props.row)" v-if="!props.row.interview_status" type="text" size="small">审核简历</el-button>
                <el-button @click="handleNote(props.row)" v-if="!props.row.view_time||props.row.invoice_status<=1&&props.row.view_time" type="text" size="small">面试通知</el-button>
              </div>
              <div v-if="props.row.interview_status>=1">
                <el-button @click="$router.push({path:'/interviewPersonnel',query:{id:props.row.id,view:2}})" v-if="props.row.invoice_status=2" type="text" size="small">查看面试</el-button>
                <el-button @click="$router.push({path:'/checkResume',query:{id:props.row.id,view:3}})" type="text" size="small">审核结果</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <viewJob :dialogTableVisible="dialogJobVisible" :id="jobId" @handleClose="dialogJobVisible=false,jobId=''"></viewJob>
    <noticeModal :dialogTableVisible="dialogTableVisible" :isEdit="view_time" :id="jobId" noticeType="面试" @submitForm="submitForm"></noticeModal>
    <modal :dialogTableVisible="visible" @handleOk="handleOk" isShow="true" :modalObj="modalObj" @handleClose="visible=false,jobId=''"></modal>
  </div>
</template>

<script>
import { companyResumeList, exportRecommendResume, editInterviewTime } from '@/api/receipt'
import { moneyTypeList, rewardTypeList, userResumeStatusList } from '@/base/base'
import noticeModal from './noticeModal'
import { getConstant } from '@/api/dictionary'
import modal from '../common/modal'
import viewJob from '../common/viewJob'
export default {
  components: {
    noticeModal,
    modal,
    viewJob
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
    }
  },
  data () {
    return {
      moneyTypeList,
      rewardTypeList,
      userResumeStatusList,
      dialogTableVisible: false,
      dialogJobVisible: false,
      visible: false,
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        jddesc: 'asc',
        status: -1
      },
      total: 0,
      multipleSelection: [],
      jobList: {},
      jobId: '',
      modalObj: {
        content: '你确定要批量操作？',
        okText: '确定',
        closeText: '取消'
      },
      timeList: [],
      noticeModalInfo: {
        title: '',
        type: '面试'
      },
      view_time: 0
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formMember)
    let params = 'job_array'
    this.getData(params)
  },
  methods: {
    getData (filed) {
      getConstant({ filed }).then(res => {
        this.jobList = res.data.job_array
      })
    },
    getList (params) {
      companyResumeList(params).then(res => {
        this.tableData = res.data.data
        this.total = res.data.count
      })
    },
    checkResume (val) {
      if (!val.recommendResume) {
        return this.$message.warning('推荐简历为空，不能审核')
      }
      if (!val.view_time) {
        this.handleNote(val)
      }
      else {
        this.$router.push({ path: 'checkResume', query: { id: val.id, view: 3 } })
      }
    },
    viewJob (val) {
      this.jobId = val.id
      this.dialogJobVisible = true
    },
    handleNote (val) {
      this.view_time = val.view_time
      this.jobId = val.id
      this.dialogTableVisible = true
    },
    changeDate (val) {
      this.formMember.entry_begintime = val ? val[0] : ''
      this.formMember.entry_endtime = val ? val[1] : ''
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
    exportResume () {
      if (!this.jobId) {
        return this.$message.warning('请选择简历')
      }
      else {
        this.visible = true
      }
    },
    handleOk () {
      this.visible = false
      let params = {
        uid: localStorage.getItem('uid'),
        jobId: this.jobId
      }
      exportRecommendResume(params)
    },
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleSelectionChange (val) {
      let arr = val.map(item => {
        return item.ud
      })
      this.jobId = arr.join(',')
    },
    onSubmit () {
      this.getList(this.formMember)
    },
    reset () {
      this.formMember = {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      }
      this.getList(this.formMember)
    },
    // 面试时间
    submitForm (val) {
      let params = Object.assign(val, { job_id: this.jobId, uid: this.formMember.uid })
      editInterviewTime(params).then(res => {
        if (res.data) {
          this.getList(this.formMember)
          this.dialogTableVisible = false
        }
        else {
          this.$message.error('设置时间失败')
        }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    }
  }
}
</script>