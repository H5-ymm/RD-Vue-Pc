
<style lang="scss">
@import '@/assets/css/resume';
</style>
<template>
  <div class="tables-box billingManagement">
    <div class="table-list add-resum">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="formMember.username" class="width300" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="formMember.mobile" class="width300" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="意向岗位：">
          <el-input v-model="formMember.desired_position" class="width300" placeholder="请输入意向岗位关键字"></el-input>
        </el-form-item>
        <el-form-item label="录入人：">
          <el-input v-model="formMember.input_username" class="width300" placeholder="请输入录入人关键字"></el-input>
        </el-form-item>
        <el-form-item label="意向地区：">
          <div class="width300">
            <districtSelet @change="change" :placeholder="'请选择意向地区'"></districtSelet>
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
          <el-date-picker class="width300" v-model="timeList" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeDate" range-separator="-" start-placeholder="开始日期区间" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="resetForm" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <div class="table-query">
          <el-button @click="addResume" type="primary">添加简历</el-button>
          <el-button @click="leadResumeVisible=true">导入简历</el-button>
          <el-button @click="exportResume">导出简历</el-button>
          <span class="select-text">
            已选择
            <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
          </span>
          <el-button type="text" @click="multipleSelection=[]">清空</el-button>
        </div>
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%" @sort-change="sortChange" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column label="姓名" align="center" width="150">
            <template slot-scope="props">
              <el-button class="text-line width140" type="text">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
          <el-table-column label="意向岗位" prop="desired_position" align="center" width="150"></el-table-column>
          <el-table-column label="意向工资" prop="money_m" align="center" width="150"></el-table-column>
          <el-table-column label="意向城市" align="center" width="150">
            <template slot-scope="props">
              <span type="text">{{props.row.expect_provindeName}}{{props.row.expect_cityName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="跟进记录" align="center" width="100">
            <template slot-scope="props">
              <el-button class="text-line" type="text" @click="viewRecord(props.row)">{{props.row.trackList?props.row.trackList.title:'-'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="跟进时间" sortable="custom" align="center" width="160">
            <template slot-scope="props">
              <span type="text">{{props.row.trackList?$moment.unix(props.row.trackList.addtime).format('YYYY-MM-DD HH:mm'):'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="录入人" prop="input_username" align="center" width="100"></el-table-column>
          <el-table-column label="跟进人" prop="track_name" align="center" width="100"></el-table-column>
          <el-table-column label="操作" align="center" min-width="200">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑简历</el-button>
              <el-button @click="routerResume(scope.row)" v-if="!scope.row.push_status" type="text" size="small">推荐岗位</el-button>
              <span style="margin:0 8px;fontSize:12px;" v-if="scope.row.push_status">已推荐</span>
              <el-button @click="abandoned(scope.row)" type="text" size="small">放弃用户</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <resumeModal :dialogTableVisible="dialogTableVisible" @handleClose="dialogTableVisible=false,remind=''" :resumeId="resumeId" @submitForm="submitForm" :resumeInfo="resumeInfo"></resumeModal>
    <confirmDialog :dialogTableVisible="visible" @submit="submit" @handleClose="visible=false" :dialogObj="dialogObj"></confirmDialog>
    <followUpRecord :dialogTableVisible="followUpRecordVisible" @submitRecord="submitRecord" @handleClose="followUpRecordVisible=false,resumeId= ''" :id="resumeId"></followUpRecord>
    <leadResumeModal @exportResume="exportResumeData" @download="download" :dialogTableVisible="leadResumeVisible" @handleClose="leadResumeVisible=false"></leadResumeModal>
  </div>
</template>
<script>
import {  getResumeList2, addUserResume, selectUserResumeInfo, giveUpResume, exportUserResume,
  importUserResume, downloadTestTable, updateUserResume} from '@/api/resume'

import { addPut } from '@/api/internalInvoice'
import { moneyTypeList, rewardTypeList } from '../../base/base'
import resumeModal from './resumeModal'
import followUpRecord from './followUpRecord'
import leadResumeModal from './leadResumeModal'
import confirmDialog from '../common/confirmDialog'
import districtSelet from '../districtSelet'
import { getConstant } from '../../api/dictionary'
export default {
  components: {
    resumeModal,
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
      dialogTableVisible: false,
      visible: false,
      followUpRecordVisible: false,
      leadResumeVisible: false,
      dialogObj: {
        title: '放弃用户',
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
        page: 1,
        timeDesc: 'desc'
      },
      total: 0,
      len: 0,
      userId: '',
      multipleSelection: [],
      statusList: [
        { label: '全部', value: 0 },
        { label: '等待面试', value: 1 },
        { label: '面试开始', value: 2 },
        { label: '面试结束', value: 3 },
        { label: '等待面试结果', value: 4 },
        { label: '完成面试结果', value: 5 }
      ],
      resumeId: '',
      resumeInfo: {},
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
      getResumeList2(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      })
    },
    // 下载模板
    download () {
      downloadTestTable()
    },
    // 导入
    exportResumeData (file) {
      this.leadResumeVisible = false
      importUserResume(file).then(res => {
        this.getList(this.formMember)
      })
    },
    // 导出
    exportResume () {
      let uid = localStorage.getItem('uid')
      exportUserResume(uid)
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
    changeDate (val) {
      this.formMember.beginTime = val ? val[0] : ''
      this.formMember.endTime = val ? val[1] : ''
    },
    routerResume (val) {
      let arr = JSON.parse(sessionStorage.getItem('menus'))
      arr[1] = '推荐岗位'
      sessionStorage.setItem('menus', JSON.stringify(arr))
      this.$router.push('/recommendJob?id=' + val.id)
    },
    change (val) {
      this.formMember.provinceid = val ? val[0] : ''
      this.formMember.cityid = val ? val[1] : ''
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
      // this.trackList = val.trackList
      this.resumeId = val.id
    },
    submitRecord (val) {
      this.followUpRecordVisible = false
      this.getList(this.formMember)
    },
    handleEdit (val) {
      this.dialogTableVisible = true
      this.resumeId = val.id
    },
    abandoned (val) {
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
      giveUpResume(params).then(res => {
        this.resumeId = ''
        this.visible = false
        this.$message.success('操作成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    addResume () {
      this.resumeId = ''
      this.dialogTableVisible = true
    },
    onSubmit (value) {
      let params = Object.assign(this.formMember, value)
      this.getList(params)
    },
    updateResume (val) {
      val.uid = localStorage.getItem('uid')
      delete val.eduName
      updateUserResume(val).then(res => {
        if (res.data) {
          this.dialogTableVisible = false
          this.$message.success('保存成功')
          this.getList(this.formMember)
        }
        else {
          this.$message.error('保存失败')
        }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    submitForm (val) {
      if (this.resumeId) {
        this.updateResume(val)
      }
      else {
        addUserResume(val).then(res => {
          if (res.data) {
            this.dialogTableVisible = false
            this.resumeId = ''
            this.getList(this.formMember)
            this.$message.success('保存成功')
          }
          else {
            this.$message.error('保存失败')
          }
        }).catch(error => {
          this.$message.error(error.status.remind)
        })
      }
    },
    resetForm () {
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

