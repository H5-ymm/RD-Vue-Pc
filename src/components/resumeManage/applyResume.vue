
<style lang="scss">
@import '@/assets/css/resume';
</style>
<template>
  <div class="tables-box billingManagement">
    <div class="table-list add-resum">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="formMember.mobile" class="width300" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="企业名称：" v-if="viewType==3">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称：" v-if="viewType==3">
          <el-input v-model="formMember.job" class="width300" placeholder="请输入岗位名称"></el-input>
        </el-form-item>
        <el-form-item label="意向岗位：" v-if="viewType!=3">
          <el-input v-model="formMember.job" class="width300" placeholder="请输入意向岗位关键字"></el-input>
        </el-form-item>
        <el-form-item label="录入人：">
          <el-input v-model="formMember.inputName" class="width300" placeholder="请输入录入人关键字"></el-input>
        </el-form-item>
        <el-form-item label="意向地区：" v-if="viewType!=3">
          <div class="width300">
            <districtSelet @change="change" :placeholder="'请选择意向地区'" :disabled="true"></districtSelet>
          </div>
        </el-form-item>
        <el-form-item label="跟进人：">
          <el-input v-model="formMember.inputName" class="width300" placeholder="请输入跟进人关键字"></el-input>
        </el-form-item>
        <el-form-item label="意向工资：" v-if="viewType!=3">
          <el-select v-model="formMember.money" class="width300" placeholder="请选择意向工资">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in moneyTypeList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="labelTime+':'">
          <el-date-picker class="width300" v-model="timeList" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeDate" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item :label="label+':'" v-if="viewType!=3">
          <el-select v-model="formMember.status" class="width300" placeholder="请选择报名状态">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in followStatusList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="onReset" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <div class="table-query">
          <el-button @click="exportResume">导出简历</el-button>
        </div>
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%" @sort-change="sortChange" @selection-change="handleSelectionChange">
          <el-table-column label="序号" align="center" fixed="left" prop="id" width="50"></el-table-column>
          <el-table-column label="姓名" fixed="left" align="center" width="100">
            <template slot-scope="props">
              <el-button class="text-line" type="text" @click="viewResume(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
          <el-table-column label="企业名称" align="center" width="150">
            <template slot-scope="props">
              <span class="text-line" type="text">{{props.row.com_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位名称" prop="job_name" align="center" width="150"></el-table-column>
          <el-table-column :label="labelTime" sortable="custom" prop="jddesc" align="center" width="150">
            <template slot-scope="props">
              <span type="text">{{props.row.addtime?$moment.unix(props.row.addtime).format('YYYY-MM-DD'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="label" prop="money_m" align="center" width="150"></el-table-column>
          <el-table-column label="跟进记录" align="center" width="100">
            <template slot-scope="props">
              <el-button class="text-line" type="text" @click="viewRecord(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="跟进时间" prop="msdesc" sortable="custom" align="center" width="150">
            <template slot-scope="props">
              <span type="text">{{props.row.uptime?$moment.unix(props.row.uptime).format('YYYY-MM-DD'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="意向岗位" prop="desired_position" align="center" width="150"></el-table-column>
          <el-table-column label="意向工资" prop="money_m" align="center" width="150"></el-table-column>
          <el-table-column label="意向城市" align="center" width="150">
            <template slot-scope="props">
              <span type="text">{{props.row.expect_provindeid}}{{props.row.expect_cityid}}</span>
            </template>
          </el-table-column>
          <el-table-column label="录入人" prop="input_username" align="center" width="100"></el-table-column>
          <el-table-column label="跟进人" prop="track_name" align="center" width="100"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" min-width="200">
            <template slot-scope="scope">
              <el-button @click="abandoned (1,scope.row)" type="text" size="small" v-if="scope.row.status==1">放弃报名</el-button>
              <el-button @click="abandoned(2,scope.row)" type="text" size="small" v-if="scope.row.status==2">放弃面试</el-button>
              <el-button @click="abandoned(4,scope.row)" type="text" size="small" v-if="scope.row.status==3">推荐岗位</el-button>
              <el-button @click="abandoned(3,scope.row)" type="text" size="small">放弃用户</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <viewResume :dialogTableVisible="dialogTableVisible" :resumeId="resumeId" @submitForm="submitForm" :resumeInfo="resumeInfo"></viewResume>
    <confirmDialog :dialogTableVisible="visible" @submit="submit" @handleClose="handleClose" :dialogObj="dialogObj" :isShow="isShow"></confirmDialog>
    <followUpRecord :dialogTableVisible="followUpRecordVisible" @submitRecord="submitRecord" @handleClose="followUpRecordVisible=false" :trackList="trackList"></followUpRecord>
    <leadResumeModal :dialogTableVisible="leadResumeVisible" @handleClose="leadResumeVisible=false"></leadResumeModal>
  </div>
</template>
<script>
import { teamRecommendResumeList, entryResumeList, addUserResume, selectUserResumeInfo, giveUpResume, exportUserResume } from '@/api/resume'
import { moneyTypeList, rewardTypeList, followStatusList } from '../../base/base'
import viewResume from './viewResume'
import followUpRecord from './followUpRecord'
import leadResumeModal from './leadResumeModal'
import confirmDialog from '../common/confirmDialog'
import districtSelet from '../districtSelet'
import { getConstant } from '../../api/dictionary'
export default {
  components: {
    viewResume,
    districtSelet,
    confirmDialog,
    followUpRecord,
    leadResumeModal
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
  },
  data () {
    return {
      moneyTypeList,
      rewardTypeList,
      followStatusList,
      dialogTableVisible: false,
      visible: false,
      followUpRecordVisible: false,
      leadResumeVisible: false,
      dialogObj: {
        title: '放弃报名',
        subTitle: '放弃理由',
        okText: '确认放弃',
        placeholder: '请输入放弃理由'
      },
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
        { label: '等待面试', value: 1 },
        { label: '面试开始', value: 2 },
        { label: '面试结束', value: 3 },
        { label: '等待面试结果', value: 4 },
        { label: '完成面试结果', value: 5 }
      ],
      activeIndex: 0,
      jobList: {},
      resumeId: '',
      resumeInfo: {},
      trackList: [],
      timeList: [],
      isShow: true,
      viewType: 1
    }
  },
  created () {
    // 初始化查询标签数据
    this.viewType = this.$route.query.view
    this.getList(this.formMember)
    let params = 'job_array'
    this.getData(params)
  },
  watch:{
    $route(to,from){
      console.log(to)
      console.log(from)
      this.viewType = this.$route.query.view
      this.getList(this.formMember)
    }
  },
  computed: {
    label () {
      return this.viewType == 1 ? '报名状态' : '入职状态'
    },
    labelTime () {
      return this.viewType == 1 ? '报名时间' : '入职时间'
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
      if (this.viewType == 1) {
        teamRecommendResumeList(params).then(res => {
          const { data } = res
          this.tableData = data.data || []
          this.total = data.count
        })
      }
      else {
        entryResumeList(params).then(res => {
          const { data } = res
          this.tableData = data.data || []
          this.total = data.count
        })
      }
    },
    changeDate (val) {
      this.formMember.beginTime = val[0]
      this.formMember.endTime = val[1]
      // this.getList(this.formMember)
    },
    exportResume () {
      if (!this.tableData.length) {
        return this.$message.warning('没有数据导出')
      }
      let uid = localStorage.getItem('uid')
      // let query = new FormData()
      // query.append('uid', uid)
      exportUserResume(uid)
    },
    sortChange (column) {
      console.log(column)
      if (column.order == 'ascending') {
        this.formMember[column.prop] = 'asc'
      }
      else {
        this.formMember[column.prop] = 'desc'
      }
      this.getList(this.formMember)
    },
    change (val) {
      this.formMember.provinceid = val[0]
      this.formMember.cityid = val[1]
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
    viewRecord (val) {
      this.followUpRecordVisible = true
      this.trackList = val.trackList
    },
    viewResume (val) {
      this.dialogTableVisible = true
      this.resumeInfo = val
    },
    submitRecord (val) {
      this.followUpRecordVisible = false
    },
    abandoned (index, val) {
      if (index == 1) {
        this.dialogObj.title = '放弃报名'
        this.isShow = true
      }
      else if (index == 1) {
        this.dialogObj.title = '放弃面试'
        this.isShow = true
      }
      else {
        this.dialogObj.title = '放弃用户'
        this.isShow = false
      }
      this.visible = true
      this.resumeId = val.id
    },
    handleClose () {
      this.visible = false
      this.resumeId = ''
    },
    submit (val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: this.resumeId,
        reason: val.reason
      }
      this.visible = false
      giveUpResume(params).then(res => {
        this.resumeId = ''
        this.getList(this.formMember)
      })
    },
    handleSelectionChange (val) {
      this.len = val
    },
    onSubmit (value) {
      let params = Object.assign(this.formMember, value)
      this.getList(params)
    },
    updateResume (val) {
      updateTeamUser(val).then(res => {
        this.getList(this.params)
      })
    },
    submitForm (val) {
      this.dialogTableVisible = false
      if (this.resumeId) {
        this.updateResume(val)
      }
      else {
        addUserResume(val).then(res => {
          this.getList(this.formMember)
          this.$message.success('保存成功')
        }).catch(error => {
          this.$message.error(error.status.remind)
        })
      }
    },
    onReset () {
      this.formMember = {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      }
      this.getList(this.formMember)
    }
  }
}
</script>

