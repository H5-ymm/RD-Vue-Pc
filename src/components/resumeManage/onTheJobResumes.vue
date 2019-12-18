
<style lang="scss">
@import '@/assets/css/resume';
</style>
<template>
  <div class="tables-box billingManagement">
    <div class="table-list add-resum">
      <el-form
        :inline="true"
        label-width="100px"
        label-position="right"
        :model="formMember"
        class="demo-form-inline"
      >
        <el-form-item label="姓名：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="意向岗位：">
          <el-select v-model="formMember.industry" class="width300" placeholder="请输入意向岗位关键字">
            <el-option :label="item" :value="key" v-for="(item,key) in jobList" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录入人：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入录入人关键字"></el-input>
        </el-form-item>
        <el-form-item label="意向地区：">
          <div class="width300">
            <districtSelet @change="change" :placeholder="'请选择意向地区'" :disabled="true"></districtSelet>
          </div>
        </el-form-item>
        <el-form-item label="跟进人：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入跟进人关键字"></el-input>
        </el-form-item>
        <el-form-item label="意向工资：">
          <el-select v-model="formMember.industry" class="width300" placeholder="请选择意向工资">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in moneyTypeList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进时间：">
          <el-date-picker
            class="width300"
            v-model="timeList"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="changeDate"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="onSubmit" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <div class="table-query">
          <el-button @click="exportResume">导出简历</el-button>
        </div>
        <el-table
          border
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @sort-change="sortChange"
        >
          <el-table-column label="序号" align="center" prop="id" width="40"></el-table-column>
          <el-table-column label="姓名" align="center" width="100">
            <template slot-scope="props">
              <el-button
                class="text-line"
                type="text"
                @click="viewResume(props.row)"
              >{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
          <el-table-column label="企业名称" align="center" width="150">
            <template slot-scope="props">
              <span class="text-line" type="text">{{props.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位名称" prop="desired_position" align="center" width="150"></el-table-column>
          <el-table-column
            label="报名时间"
            prop="entry_num"
            sortable="custom"
            align="center"
            width="150"
          >
            <template slot-scope="props">
              <span
                type="text"
              >{{props.row.uptime?$moment(props.row.uptime).format('YYYY-MM-DD'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="入职时间"
            prop="entry_num"
            sortable="custom"
            align="center"
            width="150"
          >
            <template slot-scope="props">
              <span
                type="text"
              >{{props.row.uptime?$moment(props.row.uptime).format('YYYY-MM-DD'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="跟进记录" align="center" width="100">
            <template slot-scope="props">
              <el-button
                class="text-line"
                type="text"
                @click="viewRecord(props.row)"
              >{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="跟进时间"
            prop="entry_num"
            sortable="custom"
            align="center"
            width="150"
          >
            <template slot-scope="props">
              <span
                type="text"
              >{{props.row.uptime?$moment(props.row.uptime).format('YYYY-MM-DD'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="录入人" prop="input_username" align="center" width="100"></el-table-column>
          <el-table-column label="跟进人" prop="track_name" align="center" width="100"></el-table-column>
          <el-table-column label="操作" align="center" min-width="200">
            <template slot-scope="scope">
              <el-button @click="leavingOffice(scope.row)" type="text" size="small">离职</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="team-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formMember.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="formMember.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <confirmDialog
      :dialogTableVisible="visible"
      @submit="submit"
      @handleClose="handleClose"
      :dialogObj="dialogObj"
      isShow="true"
    ></confirmDialog>
    <followUpRecord
      :dialogTableVisible="followUpRecordVisible"
      @submitRecord="submitRecord"
      @handleClose="followUpRecordVisible=false"
      :trackList="trackList"
    ></followUpRecord>
  </div>
</template>
<script>
import { incumbencyResumeList, quitUser, exportIncumbencyResume } from '@/api/resume'
import { moneyTypeList, rewardTypeList, followStatusList } from '../../base/base'
import followUpRecord from './followUpRecord'
import confirmDialog from '../common/confirmDialog'
import districtSelet from '../districtSelet'
import { getConstant } from '../../api/dictionary'
export default {
  components: {
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
      followUpRecordVisible: false,
      dialogObj: {
        title: '离职原因',
        subTitle: '离职详情',
        okText: '确认离职',
        placeholder: '请输入离职详情'
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
      jobList: {},
      resumeId: '',
      trackList: [],
      timeList: []
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
        const { job_array } = res.data
        this.jobList = job_array
      })
    },
    getList (params) {
      incumbencyResumeList(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      })
    },
    changeDate (val) {
      this.formMember.beginTime = val[0]
      this.formMember.endTime = val[1]
    },
    exportResume () {
      let uid = localStorage.getItem('uid')
      exportIncumbencyResume(uid)
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
    submitRecord (val) {
      this.followUpRecordVisible = false
    },
    leavingOffice (val) {
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
      quitUser(params).then(res => {
        this.resumeId = ''
        this.getList(this.formMember)
      })
    },
    onSubmit (value) {
      let params = Object.assign(this.formMember, value)
      this.getList(params)
    }
  }
}
</script>

