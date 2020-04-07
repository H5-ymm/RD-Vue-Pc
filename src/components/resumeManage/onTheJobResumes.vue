
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
          <el-input v-model="formMember.job_name" class="width300" placeholder="请输入意向岗位关键字"></el-input>
        </el-form-item>
        <el-form-item label="录入人：">
          <el-input v-model="formMember.inputName" class="width300" placeholder="请输入录入人关键字"></el-input>
        </el-form-item>
        <el-form-item label="意向地区：">
          <div class="width300">
            <districtSelet @change="change" :placeholder="'请选择意向地区'" :address="address" :disabled="true"></districtSelet>
          </div>
        </el-form-item>
        <el-form-item label="跟进人：">
          <el-input v-model="formMember.track_name" class="width300" placeholder="请输入跟进人关键字"></el-input>
        </el-form-item>
        <el-form-item label="意向工资：">
          <el-select v-model="formMember.money" class="width300" placeholder="请选择意向工资">
            <el-option :label="item" :value="key" v-for="(item,key) in moneyArray" :key="key"></el-option>
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
          <el-table-column label="企业名称" align="center" width="150">
            <template slot-scope="props">
              <span class="text-line" type="text">{{props.row.com_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位名称" prop="job_name" align="center" width="150"></el-table-column>
          <el-table-column label="报名时间" prop="jddesc" sortable="custom" align="center" width="150">
            <template slot-scope="props">
              <span type="text">{{props.row.addtime?$moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="入职时间" prop="msdesc" sortable="custom" align="center" width="150">
            <template slot-scope="props">
              <span type="text">{{props.row.addtime?$moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="跟进记录" align="center" width="100">
            <template slot-scope="props">
              <el-button class="text-line" v-if="props.row.trackList" type="text" @click="viewRecord(props.row)">{{props.row.trackList.title}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="跟进时间" align="center" width="150">
            <template slot-scope="props">
              <span type="text" v-if="props.row.trackList">{{props.row.trackList.addtime?$moment.unix(props.row.trackList.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="录入人" prop="input_username" align="center" width="100"></el-table-column>
          <el-table-column label="跟进人" prop="track_name" align="center" width="100"></el-table-column>
          <el-table-column label="操作" align="center" min-width="200">
            <template slot-scope="scope">
              <el-button @click="viewResume(scope.row)" type="text" size="small">查看简历</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <viewResume :dialogTableVisible="dialogTableVisible" :resumeId="resumeId" @handleClose="dialogTableVisible=false" :resumeInfo="resumeInfo"></viewResume>
    <followUpRecord :dialogTableVisible="followUpRecordVisible" @submitRecord="submitRecord" @handleClose="followUpRecordVisible=false,resumeId=''" :id="resumeId"></followUpRecord>
  </div>
</template>
<script>
import {
  incumbencyResumeList,
  quitUser,
  exportIncumbencyResume,
  delResume
} from '@/api/resume'
import { moneyTypeList, rewardTypeList, followStatusList } from '@/base/base'
import followUpRecord from './followUpRecord'
import viewResume from './viewResume'
import confirmDialog from '../common/confirmDialog'
import districtSelet from '../districtSelet'
import { getConstant } from '@/api/dictionary'
export default {
  components: {
    districtSelet,
    followUpRecord,
    viewResume
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
      followStatusList,
      followUpRecordVisible: false,
      dialogTableVisible: false,
      tableData: [],
      dialogObj: {
        title: '离职',
        subTitle: '离职理由',
        okText: '确认离职',
        placeholder: '请输入离职理由'
      },
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      resumeId: '',
      trackList: [],
      timeList: [],
      address: [],
      resumeInfo: {},
      moneyArray: {},
      address: []
    }
  },
  mounted() {
    // 初始化查询标签数据
    this.getList(this.formMember)
    let params = 'resume_intention_salary'
    this.getData(params)
  },
  methods: {
    getList(params) {
      incumbencyResumeList(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      })
    },
    getData(filed) {
      getConstant({ filed })
        .then(res => {
          this.moneyArray = res.data.resume_intention_salary
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    changeDate(val) {
      this.formMember.beginTime = val ? val[0] : ''
      this.formMember.endTime = val ? val[1] : ''
    },
    exportResume() {
      let uid = localStorage.getItem('uid')
      exportIncumbencyResume(uid)
    },
    sortChange(column) {
      if (column.order == 'ascending') {
        this.formMember[column.prop] = 'asc'
      } else {
        this.formMember[column.prop] = 'desc'
      }
      this.getList(this.formMember)
    },
    viewResume(val) {
      this.dialogTableVisible = true
      this.resumeInfo = val
      this.resumeId = val.resume_id
    },
    change(val) {
      this.formMember.provinceid = val[0]
      this.formMember.cityid = val[1]
    },
    viewRecord(val) {
      this.resumeId = val.resume_id
      this.followUpRecordVisible = true
    },
    submitRecord(val) {
      this.followUpRecordVisible = false
      this.getList(this.formMember)
    },
    onSubmit() {
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
    onReset() {
      this.formMember = {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      }
      this.timeList = []
      this.address =[]
      this.getList(this.formMember)
    }
  }
}
</script>

