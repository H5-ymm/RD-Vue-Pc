
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
        <el-form-item label="企业名称：">
          <el-input v-model="formMember.com_name" class="width300" placeholder="请输入团队名称关键字"></el-input>
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
        <el-form-item label="状态：">
          <el-select v-model="formMember.status" class="width300" placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in statusList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接单时间：">
          <el-date-picker class="width300" @change="changeDate" v-model="timeList" type="daterange" range-separator="-" start-placeholder="开始日期区间" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="reset" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <el-table border :data="tableData" @sort-change="sortChange" ref="multipleTable" style="width: 100%">
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="handleEdit(props.row)">{{props.row.job_name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" prop="com_name" align="center" width="150">
          </el-table-column>
          <el-table-column label="需求人数" prop="required_number" align="center" width="100"></el-table-column>
          <el-table-column label="已推荐简历" align="center" prop="put_num" width="100">
          </el-table-column>
          <el-table-column label="审核通过简历" prop="pass_num" align="center" width="120"></el-table-column>
          <el-table-column label="岗位薪资" prop="money" align="center" width="150"></el-table-column>
          <el-table-column label="薪资模式" align="center" width="100">
            <template slot-scope="props">
              <span>{{props.row.money_type|moneyType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="150">
            <template slot-scope="props">
              <span class="status" :class="`status${props.row.invoice_status}`" v-if="!props.row.interview_status&&!props.row.entry_status">{{props.row.invoice_status==0?'收集中':props.row.invoice_status==1?'面试开始':props.row.invoice_status==2?'面试结束':'审核简历'}}</span>
              <!-- <span class="status" v-if="props.row.entry_status&&props.row.entry_status<3" :class="`status${props.row.entry_status}`">{{props.row.entry_status==1?'面试开始':props.row.entry_status==2?'面试结束':''}}</span> -->
              <!-- <span class="status" v-if="props.row.status==1" :class="`status${props.row.status}`">面试开始</span> -->
              <span class="status status4" v-else>面试结束</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位城市" prop="entry_num" align="center" width="120">
            <template slot-scope="props">
              <span>{{props.row.province}}{{props.row.city}}</span>
            </template>
          </el-table-column>
          <el-table-column label="接单时间" prop="jddesc" sortable="custom" align="center" width="160">
            <template slot-scope="props">
              <span>{{props.row.addtime?props.row.addtime:'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="返利模式" align="center" width="100">
            <template slot-scope="props">
              <span>{{props.row.reward_type|rewardType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="面试时间" prop="msdesc" sortable="custom" align="center" width="160">
            <template slot-scope="props">
              <span>{{props.row.view_time!=0?$moment(props.row.view_time).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="180">
            <template slot-scope="scope">
              <div v-if="!scope.row.interview_status&&!scope.row.entry_status">
                <el-button v-if="scope.row.interview_status>=3||!scope.row.interview_status" @click="$router.push('/recommendResume?id='+ scope.row.id + '&jobId='+scope.row.job_id)" type="text" size="small">推荐简历</el-button>
                <el-button v-if="!scope.row.interview_status||scope.row.interview_status==4" @click="$router.push('/commonTableList?id='+ scope.row.id+ '&jobId='+scope.row.job_id)" type="text" size="small">
                  推荐名单
                  <!-- <span class="resume-number">(+150)</span> -->
                </el-button>
              </div>
              <div v-if="scope.row.interview_status||scope.row.entry_status">
                <el-button @click="$router.push('/resumeResult?id='+ scope.row.id)" type="text" size="small">
                  面试名单
                  <!-- <span class="resume-number">(+150)</span> -->
                </el-button>
                <el-button @click="$router.push('/viewResume')" type="text" size="small">联系客服</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <receiptModal :dialogTableVisible="dialogTableVisible"></receiptModal>
    <viewJob :dialogTableVisible="dialogJobVisible" :id="jobId" @handleClose="dialogJobVisible=false"></viewJob>
  </div>
</template>
<script>
import { applyList, gettalent } from '../../api/teamReceipt'
import { moneyTypeList, rewardTypeList, payTypeList, weekList } from '../../base/base'
import receiptModal from './receiptModal'
import { getConstant } from '../../api/dictionary'
import viewJob from '../common/viewJob'
export default {
  components: {
    receiptModal,
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
      visible: false,
      tableData: [],
      currentPage: 1,
      userType: 1,
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        type: 1
      },
      total: 0,
      jobId: '',
      statusList: [
        { label: '全部', value: 0 },
        { label: '收集中', value: 1 },
        { label: '审核简历', value: 2 },
        { label: '面试开始', value: 3 },
        { label: '面试结束', value: 4 }
      ],
      activeIndex: 0,
      jobList: {},
      timeList: []
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formMember)
    let params = 'job_array'
    this.getData(params)
  },
  watch: {
    $route (to, from) {
      this.getList(this.formMember)
    }
  },
  methods: {
    getData (filed) {
      getConstant({ filed }).then(res => {
        const { job_array } = res.data
        this.jobList = job_array
      })
    },
    getList (params) {
      applyList(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      })
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
    changeDate (val) {
      this.formMember.beginTime = val ? val[0] : ''
      this.formMember.endTime = val ? val[1] : ''
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
    handleEdit (val) {
      this.dialogJobVisible = true
      this.jobId = val
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
    },
    reset () {
      this.formMember = {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      }
      this.timeList = []
      this.getList(this.formMember)
    }
  }
}
</script>
