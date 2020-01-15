
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
        <el-form-item label="意向岗位：">
          <el-input v-model="formMember.job" class="width300" placeholder="请输入意向岗位关键字"></el-input>
        </el-form-item>
        <el-form-item label="录入人：">
          <el-input v-model="formMember.inputName" class="width300" placeholder="请输入录入人关键字"></el-input>
        </el-form-item>
        <el-form-item label="意向地区：">
          <div class="width300">
            <districtSelet @change="change" :placeholder="'请选择意向地区'" :disabled="true"></districtSelet>
          </div>
        </el-form-item>
        <el-form-item label="跟进人：">
          <el-input v-model="formMember.track_name" class="width300" placeholder="请输入跟进人关键字"></el-input>
        </el-form-item>
        <el-form-item label="意向工资：">
          <el-select v-model="formMember.money" class="width300" placeholder="请选择意向工资">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in moneyTypeList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进时间：">
          <el-date-picker class="width300" v-model="timeList" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeDate" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="onReset" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <div class="table-query">
          <el-button @click="exportResume" type="primary">导出简历</el-button>
        </div>
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%" @sort-change="sortChange">
          <el-table-column label="序号" align="center" prop="id" width="50"></el-table-column>
          <el-table-column label="姓名" align="center" width="100">
            <template slot-scope="props">
              <el-button class="text-line" type="text" @click="viewResume(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
          <el-table-column label="企业名称" align="center" prop="com_name" width="150">
          </el-table-column>
          <el-table-column label="岗位名称" prop="job_name" align="center" width="150"></el-table-column>
          <el-table-column label="离职时间" sortable="custom" align="center" width="160">
            <template slot-scope="props">
              <span type="text">{{props.row.removetime?props.row.removetime:'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="离职次数" prop="resume_num" align="center" width="150"></el-table-column>
          <el-table-column label="跟进记录" align="center" width="100">
            <template slot-scope="props">
              <el-button class="text-line" type="text" @click="viewRecord(props.row)">{{props.row.trackList&&props.row.trackList.title?props.row.trackList.title:'--'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="跟进时间" align="center" width="160">
            <template slot-scope="props">
              <span type="text" v-if="props.row.trackList">{{props.row.trackList.addtime?$moment.unix(props.row.trackList.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="意向岗位" prop="desired_position" align="center" width="150"></el-table-column>
          <el-table-column label="意向工资" prop="models" align="center" width="150"></el-table-column>
          <el-table-column label="意向城市" align="center" width="150">
            <template slot-scope="props">
              <span type="text">{{props.row.citys}}</span>
            </template>
          </el-table-column>
          <el-table-column label="录入人" prop="input_username" align="center" width="100"></el-table-column>
          <el-table-column label="跟进人" prop="track_name" align="center" width="100"></el-table-column>
          <el-table-column label="操作" align="center" min-width="200">
            <template slot-scope="scope">
              <el-button @click="$router.push('/recommendJob?id='+scope.row.id)" type="text" size="small">推荐岗位</el-button>
              <el-button @click="abandoned(scope.row)" type="text" size="small">放弃用户</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <viewResume :dialogTableVisible="dialogTableVisible" :resumeId="resumeId" @handleClose="dialogTableVisible=false" :resumeInfo="{}"></viewResume>
    <confirmDialog :dialogTableVisible="visible" @submit="submit" @handleClose="handleClose" :dialogObj="dialogObj" isShow="true"></confirmDialog>
    <followUpRecord :dialogTableVisible="followUpRecordVisible" @submitRecord="submitRecord" @handleClose="followUpRecordVisible=false" :id="resumeId"></followUpRecord>
  </div>
</template>
<script>
import { quitResumeList, quitUser, exportDelResumeList } from '@/api/resume'
import { moneyTypeList, rewardTypeList, followStatusList } from '../../base/base'
import followUpRecord from './followUpRecord'
import confirmDialog from '../common/confirmDialog'
import districtSelet from '../districtSelet'
import viewResume from './viewResume'
import { getConstant } from '../../api/dictionary'
export default {
  components: {
    viewResume,
    districtSelet,
    confirmDialog,
    followUpRecord
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
      visible: false,
      dialogTableVisible: false,
      followUpRecordVisible: false,
      dialogObj: {
        title: '放弃用户原因',
        subTitle: '放弃详情',
        okText: '确认放弃',
        placeholder: '请输入放弃详情'
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
      form: {},
      activeIndex: 0,
      resumeId: '',
      trackList: [],
      timeList: []
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      quitResumeList(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      })
    },
    changeDate (val) {
      this.formMember.beginTime = val ? val[0] : ''
      this.formMember.endTime = val ? val[1] : ''
    },
    exportResume () {
      let uid = localStorage.getItem('uid')
      exportDelResumeList(uid)
    },
    sortChange (column) {
      if (column.order == 'ascending') {
        this.formMember.timeDesc = 'asc'
      }
      else {
        this.formMember.timeDesc = 'desc'
      }
      this.getList(this.formMember)
    },
    viewResume (val) {
      this.dialogTableVisible = true
      this.resumeId = val.resume_id
    },
    change (val) {
      this.formMember.provinceid = val ? val[0] : ''
      this.formMember.cityid = val ? val[1] : ''
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
      this.resumeId = val.id
      // this.trackList = val.trackList
    },
    submitRecord (val) {
      this.followUpRecordVisible = false
      this.getList(this.formMember)
    },
    abandoned (val) {
      this.visible = true
      this.resumeId = val.resume_id
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
      quitUser(params).then(res => {
        this.resumeId = ''
        this.getList(this.formMember)
      })
    },
    onSubmit (value) {
      let params = Object.assign(this.formMember, value)
      this.getList(params)
    },
    onReset () {
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
