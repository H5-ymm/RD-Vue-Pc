
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
          <el-input v-model="formMember.mobile" class="width300" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称：">
          <el-input v-model="formMember.job" class="width300" placeholder="请输入意向岗位关键字"></el-input>
        </el-form-item>
        <el-form-item label="录入人：">
          <el-input v-model="formMember.inputName" class="width300" placeholder="请输入录入人关键字"></el-input>
        </el-form-item>
        <el-form-item label="跟进人：">
          <el-input v-model="formMember.track_name" class="width300" placeholder="请输入跟进人关键字"></el-input>
        </el-form-item>
        <el-form-item :label="labelTime+'：'">
          <el-date-picker
            class="width300"
            v-model="timeList"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="timestamp"
            @change="changeDate"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item :label="label+':'" v-if="viewType!=3">
          <el-select v-model="formMember.status" class="width300" placeholder="请选择报名状态">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in followStatusList" :key="index"></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="onReset" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <div class="table-query">
          <el-button @click="exportResume" type="primary">导出简历</el-button>
        </div>
        <el-table
          border=""
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @sort-change="sortChange"
        >
          <el-table-column label="序号" align="center" prop="id" width="50"></el-table-column>
          <el-table-column label="姓名" align="center" width="150">
            <template slot-scope="props">
              <el-button class="text-line width140" type="text">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
          <el-table-column label="企业名称" align="center" prop="company_name" width="150"></el-table-column>
          <el-table-column label="报名时间" sortable="custom" prop="msdesc" align="center" width="160">
            <template slot-scope="props">
              <span>{{props.row.addtime?$moment(props.row.addtime).format('YYYY-MM-DD HH:mm'):''}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位名称" prop="job_name" align="center" width="150"></el-table-column>
          <el-table-column label="报名状态" align="center" width="170">
            <template slot-scope="props">
              <span
                class="status"
                :class="`status${props.row.status}`"
                v-if="!props.row.interview_status"
              >{{props.row.status|checkStatus}}</span>
              <span
                v-if="props.row.status==1&&props.row.interview_status"
                class="status"
                :class="`status${props.row.interview_status}`"
              >{{props.row.interview_status|viewStatus}}</span>
              <span
                v-if="props.row.interview_status==1&&props.row.entry_status"
                class="status"
                :class="`status${props.row.entry_status}`"
              >{{props.row.entry_status|entryStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="跟进记录" align="center" width="100">
            <template slot-scope="props">
              <el-button
                class="text-line"
                type="text"
                @click="viewRecord(props.row)"
              >{{props.row.trackList&&props.row.trackList.title?props.row.trackList.title:'--'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="跟进时间" align="center" width="160">
            <template slot-scope="props">
              <span
                type="text"
                v-if="props.row.trackList"
              >{{props.row.trackList.addtime?$moment.unix(props.row.trackList.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="意向岗位" prop="desired_position" align="center" width="150"></el-table-column>
          <el-table-column label="意向工资" align="center" width="150">
            <template slot-scope="props">
              <span
                type="text"
                v-if="props.row.min_expect_money&&props.row.max_expect_money"
              >{{props.row.min_expect_money}}~{{props.row.max_expect_money}}</span>
              <span type="text" v-else>{{props.row.min_expect_money ||props.row.max_expect_money}}</span>
            </template>
          </el-table-column>
          <el-table-column label="意向城市" align="center" width="150">
            <template slot-scope="props">
              <span type="text">{{props.row.expect_province}}{{props.row.city}}</span>
            </template>
          </el-table-column>
          <el-table-column label="录入人" prop="input_username" align="center" width="100"></el-table-column>
          <el-table-column label="跟进人" prop="track_name" align="center" width="100"></el-table-column>
          <el-table-column label="操作" align="center" min-width="200">
            <template slot-scope="scope">
              <el-button
                @click="abandoned (4,scope.row)"
                type="text"
                size="small"
                v-if="scope.row.interview_status==1&&!scope.row.entry_status"
              >放弃入职</el-button>
              <el-button
                @click="abandoned (1,scope.row)"
                type="text"
                size="small"
                v-if="!scope.row.status"
              >放弃报名</el-button>
              <el-button
                @click="abandoned(2,scope.row)"
                type="text"
                size="small"
                v-if="!scope.row.interview_status&&scope.row.status==1"
              >放弃面试</el-button>
              <el-button
                @click="routerResume(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.status>=2 || scope.row.interview_status==2 || scope.row.entry_status==2"
              >推荐岗位</el-button>
              <el-button @click="abandoned(3,scope.row)" type="text" size="small">放弃用户</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="team-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formMember.page"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="formMember.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- <viewResume :dialogTableVisible="dialogTableVisible" :resumeId="resumeId" @handleClose="dialogTableVisible=false" @submitForm="submitForm" :resumeInfo="resumeInfo"></viewResume> -->
    <confirmDialog
      :dialogTableVisible="visible"
      @submit="submit"
      @handleClose="handleClose"
      :dialogObj="dialogObj"
      :isShow="isShow"
    ></confirmDialog>
    <followUpRecord
      :dialogTableVisible="followUpRecordVisible"
      :id="resumeId"
      @submitRecord="submitRecord"
      @handleClose="followUpRecordVisible=false"
      :trackList="trackList"
    ></followUpRecord>
    <!-- <leadResumeModal :dialogTableVisible="leadResumeVisible" @handleClose="leadResumeVisible=false"></leadResumeModal> -->
  </div>
</template>
<script>
import {
  getPutresume,
  giveupPut,
  giveupView,
  giveEntry
} from '@/api/internalInvoice'
import {
  moneyTypeList,
  rewardTypeList,
  followStatusList,
  viewStatusList1,
  checkStatusList1,
  entryStatusList4
} from '@/base/base'
// import viewResume from './viewResume'
import followUpRecord from '../resumeManage/followUpRecord'
// import leadResumeModal from './leadResumeModal'
import { editRecommendResumeStatus } from '@/api/resume'
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
    },
    checkStatus(val) {
      let obj = checkStatusList1.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    },
    viewStatus(val) {
      let obj = viewStatusList1.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    },
    entryStatus(val) {
      let obj = entryStatusList4.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    }
  },
  data() {
    return {
      entryStatusList4,
      checkStatusList1,
      viewStatusList1,
      moneyTypeList,
      rewardTypeList,
      followStatusList,
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
        job_id: '',
        job_status: 1
      },
      total: 0,
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
      timeList: [],
      isShow: true,
      viewType: 1,
      status: 0,
      id: ''
    }
  },
  created() {
    let arr = ['已发布职位', '已推荐简历']
    this.$store.commit('setMenus', arr)
    this.formMember.job_id = this.$route.query.id
    this.getList(this.formMember)
  },
  computed: {
    label() {
      return '报名状态'
    },
    labelTime() {
      return '报名时间'
    }
  },
  methods: {
    getList(params) {
      getPutresume(params).then(res => {
        const { data } = res
        this.tableData = data.data || []
        this.total = data.count
      })
    },
    changeDate(val) {
      this.formMember.beginTime = val ? val[0] : ''
      this.formMember.endTime = val ? val[1] : ''
    },
    routerResume(val) {
      this.$router.push('/recommendResume??jobId=' + val.id + 'index=1')
    },
    exportResume() {
      if (!this.tableData.length) {
        return this.$message.warning('没有数据导出')
      }
      let uid = localStorage.getItem('uid')
      exportUserResume(uid)
    },
    sortChange(column) {
      if (column.order == 'ascending') {
        this.formMember[column.prop] = 'asc'
      } else {
        this.formMember[column.prop] = 'desc'
      }
      this.getList(this.formMember)
    },
    change(val) {
      this.formMember.provinceid = val[0]
      this.formMember.cityid = val[1]
    },
    selectStatus(item, index) {
      this.activeIndex = index
      this.formMember.status = item.value
    },
    handleSizeChange(val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange(val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    viewRecord(val) {
      this.resumeId = val.resume_id
      this.followUpRecordVisible = true
    },
    viewResume(val) {
      this.dialogTableVisible = true
      this.resumeInfo = val
      this.resumeId = val.resume_id
    },
    submitRecord(val) {
      this.followUpRecordVisible = false
    },
    abandoned(index, val) {
      let params = {
        ids: val.id,
        uid: localStorage.getItem('uid')
      }
      if (index == 1) {
        this.giveupPutResumme(params)
      } else if (index == 2) {
        this.giveupViewResume(params)
      } else if (index == 4) {
        this.giveEntryResume(params)
      } else {
        this.resumeId = val.resume_id
        this.id = val.id
        this.visible = true
      }
    },
    // 放弃面试
    giveupViewResume(params) {
      giveupView(params)
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
    // 放弃报名
    giveupPutResumme(params) {
      giveupPut(params)
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
    handleClose() {
      this.visible = false
      this.resumeId = ''
    },
    giveEntryResume(params) {
      giveEntry(params)
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
    onSubmit() {
      this.getList(this.formMember)
    },
    submit(val) {
      let params = {
        uid: localStorage.getItem('uid'),
        id: this.id,
        resumeId: this.resumeId,
        remark: val.reason,
        type: 3
      }
      editRecommendResumeStatus(params)
        .then(res => {
          if (res.data) {
            this.resumeId = ''
            this.id = ''
            this.visible = false
            this.$message.success('放弃成功')
            this.getList(this.formMember)
          } else {
            this.$message.error('放弃失败')
          }
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    onReset() {
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

