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
          <el-input v-model="formMember.team_name" class="width300" placeholder="请输入企业名称关键字"></el-input>
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
        <el-form-item label="面试时间：">
          <el-date-picker class="width300" @change="changeDate" v-model="timeList" type="daterange" range-separator="-" start-placeholder="开始日期区间" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="reset" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="handleViewJob(props.row)">{{props.row.job_name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" prop="com_name" align="center" width="150">
          </el-table-column>
          <el-table-column label="需求人数" prop="required_number" align="center" width="100"></el-table-column>
          <el-table-column label="面试通过" align="center" prop="put_num" width="150">
          </el-table-column>
          <el-table-column label="岗位薪资" prop="money" align="center" width="150"></el-table-column>
          <el-table-column label="薪资模式" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.money_type|moneyType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="150">
            <template slot-scope="props">
              <span class="status" :class="`status${props.row.interview_status}`" v-if="!props.row.entry_status&&props.row.interview_status!=4">{{props.row.interview_status==1?"面试开始":props.row.interview_status==2?'面试审核简历':'面试结束'}}</span>
              <span class="status" :class="`status${props.row.entry_status}`" v-if="props.row.interview_status==4">{{props.row.entry_status==1?"入职开始":'入职结束'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位城市" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.province}}{{props.row.city}}</span>
            </template>
          </el-table-column>
          <el-table-column label="返利模式" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.reward_type|rewardType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="面试时间" prop="jddesc" sortable="custom" align="center" width="170">
            <template slot-scope="props">
              <el-button type="text" @click="viewTime(props.row)">{{props.row.view_time?props.row.view_time:'--'}}</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column label="联系人" prop="entry_num" align="center" width="150"></el-table-column> -->
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="props">
              <!-- <el-button @click="" type="text" size="small" v-if="props.row.interview_status==1&&(props.row.entry_status==0||props.row.entry_status==1)">入职名单</el-button> -->
              <el-button @click="$router.push('/teamEntryList?id='+ props.row.id+ '&jobId='+props.row.job_id)" type="text" size="small" v-if="props.row.interview_status==4&&props.row.entry_status>=1">入职名单</el-button>
              <el-button @click="$router.push('/commonTableList?id='+ props.row.id+ '&job_id='+props.row.job_id+'&view=4')" v-if="!props.row.entry_status&&props.row.interview_status<=3" type="text" size="small">面试名单</el-button>
              <el-button @click="dialogTableVisible=true" type="text" size="small" v-if="props.row.interview_status!=1">联系客服</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <noticeModal :dialogTableVisible="visible" :viewTimeInfo="viewTimeInfo"></noticeModal>
    <customerService :dialogTableVisible="dialogTableVisible"></customerService>
    <viewJob :dialogTableVisible="dialogJobVisible" :id="jobId" @handleClose="dialogJobVisible=false"></viewJob>
  </div>
</template>

<script>
import { applyList, getViewtime } from '../../api/teamReceipt'
import { moneyTypeList, rewardTypeList, payTypeList, weekList, entryStatusList2 } from '../../base/base'
import noticeModal from './noticeModal'
import customerService from '../common/customerService'
import { getConstant } from '../../api/dictionary'
import viewJob from '../common/viewJob'
export default {
  components: {
    noticeModal,
    customerService,
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
      entryStatusList2,
      dialogTableVisible: false,
      visible: false,
      tableData: [],
      currentPage: 1,
      userType: 1,
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        type: 2
      },
      total: 0,
      len: 0,
      userId: '',
      multipleSelection: [],
      form: {},
      statusList: [
        { label: '全部', value: 0 },
        { label: '待审核', value: 1 },
        { label: '已同意', value: 2 },
        { label: '已拒绝', value: 3 },
        { label: '已下架', value: -1 },
        { label: '已取消申请', value: -1 },
        { label: '其他团队已接', value: -1 }
      ],
      activeIndex: 0,
      jobList: {},
      timeList: [],
      apply_id: '',
      viewTimeInfo: {},
      jobId: '',
      dialogJobVisible: false
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formMember)
    let params = 'job_array'
    this.getData(params)
  },
  mounted () {
    this.getList(this.formMember)
    let params = 'job_array'
    this.getData(params)
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
        this.tableData = res.data.data
        this.total = res.data.count
      })
    },
    changeDate (val) {
      this.formMember.beginTime = val ? val[0] : ''
      this.formMember.endTime = val ? val[1] : ''
    },
    selectStatus (item, index) {
      this.activeIndex = index
      this.formMember.status = item.value
    },
    routerEntry () {
      // let arr = JSON.parse(sessionStorage.getItem('menus'))
      // arr[1] = '入职名单'
      // sessionStorage.setItem('menus', JSON.stringify(arr))
      this.$router.push('/teamEntryList')
    },
    viewTime (val) {
      this.visible = true
      this.apply_id = val.id
      getViewtime({ apply_id: val.id }).then(res => {
        this.viewTimeInfo = res.data
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleViewJob (val) {
      this.dialogJobVisible = true
      this.jobId = val.job_id
    },
    handleDel (uid) {
      loginOutTeam({ uid }).then(res => {
        this.$message.success('退出成功')
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
      this.len = val
    },
    addMember () {
      this.visible = true
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
    },
    reset () {
      this.formMember = {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        type: 2
      }
      this.timeList = []
      this.getList(this.formMember)
    }
  }
}
</script>

