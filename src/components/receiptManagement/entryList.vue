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
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%">
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.jobName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="团队名称" prop="team_name" align="center" width="150">
          </el-table-column>
          <el-table-column label="需求人数" prop="required_number" align="center" width="100"></el-table-column>
          <el-table-column label="已入职" align="center" width="100" prop="recommendResume"></el-table-column>
          <el-table-column label="岗位薪资" prop="money" align="center" width="120"></el-table-column>
          <el-table-column label="薪资模式" align="center" width="100">
            <template slot-scope="props">
              <span>{{props.row.money_type|moneyType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="100">
            <template slot-scope="props">
              <span class="status" :class="`status${props.row.entry_status}`">{{props.row.entry_status|status}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位城市" prop="citys" align="center" width="150"></el-table-column>
          <el-table-column label="返利模式" align="center" width="100">
            <template slot-scope="props">
              <span>{{props.row.reward_type|rewardType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="入职时间" prop="addtime" sortable align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.addtime?$moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" prop="link_name" align="center" width="100"></el-table-column>
          <el-table-column label="操作" align="center" min-width="160">
            <template slot-scope="scope">
              <el-button @click="handleUser(1,scope.row)" type="text" size="small" v-if="scope.row.entry_status==1">入职结束</el-button>
              <el-button v-if="scope.row.entry_status==2||scope.row.entry_status==3" @click="$router.push({path:'/entryDetailTable',query:{id:scope.row.id}})" type="text" size="small">
                入职审核
                <!-- <span class="resume-number">(+150)</span> -->
              </el-button>
              <el-button @click="$router.push({path:'commonTable',query:{id:props.row.id,view:5}})" type="text" v-if="scope.row.entry_status==1" size="small">面试结果</el-button>
              <el-button @click="$router.push({path:'commonTable',query:{id:props.row.id,view:4}})" type="text" size="small" v-if="scope.row.entry_status==4">在职名单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <modal :dialogTableVisible="dialogTableVisible" @handleOk="handleOk" :modalObj="modalObj" :isShow="isShow" @handleClose="dialogTableVisible=false"></modal>
  </div>
</template>

<script>
import { entryInvoiceList, endEntry } from '../../api/receipt'
import { moneyTypeList, rewardTypeList, entryStatusList } from '../../base/base'
import { getConstant } from '../../api/dictionary'
import modal from '../common/modal'
export default {
  components: {
    modal
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
    status (val) {
      let obj = entryStatusList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    }
  },
  data () {
    return {
      moneyTypeList,
      rewardTypeList,
      entryStatusList,
      dialogTableVisible: false,
      visible: false,
      tableData: [],
      currentPage: 1,
      userType: 1,
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      jobId: '',
      form: {},
      statusList: [
        { label: '全部', value: 0 },
        { label: '入职开始', value: 1 },
        { label: '等待入职名单', value: 2 },
        { label: '完成入职名单', value: 3 }
      ],
      activeIndex: 0,
      jobList: {},
      modalObj: {
        content: '你确定要提前结束入职吗？',
        okText: '确定',
        closeText: '取消'
      },
      jobId: '',
      isShow: true,
      overType: 0,
      timeList: []
    }
  },
  created () {
    // 初始化查询标签数据
    if (this.$route.query.id) {
      this.jobId = this.$route.query.id
      this.formMember.jobId = this.$route.query.id
    }
    let params = 'job_array'
    this.getList(this.formMember)
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
      entryInvoiceList(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    selectStatus (item, index) {
      this.activeIndex = index
      this.formMember.status = item.value
    },
    changeDate (val) {
      this.formMember.begintime = val[0]
      this.formMember.endtime = val[1]
    },
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleUser (index, val) {
      this.dialogTableVisible = true
      this.overType = index
      if (index == 1) {
        this.modalObj.content = '你确定要提前结束入职吗？'
      }
      else {
        this.modalObj.content = '你确定要提前结束面试吗？'
      }
      this.jobId = val.id
    },
    handleOk () {
      this.dialogTableVisible = false
      let params = {
        uid: localStorage.getItem('uid'),
        jodId: val.id
      }
      if (this.overType == 1) {
        this.handleOverEntry(params)
      }
      else {
        this.handelOverAudition(params)
      }
    },
    // 结束入职
    handleOverEntry (params) {
      endEntry(params).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    // 结束面试
    handelOverAudition (params) {
      endInterview(params).then(res => {
        this.$message.success('操作成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
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
      this.timeList = []
      this.getList(this.formMember)
    }
  }
}
</script>