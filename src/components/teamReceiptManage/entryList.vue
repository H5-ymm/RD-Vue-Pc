<style lang="scss">
@import '@/assets/css/resume.scss';
</style>
<template>
  <div class="tables-box billingManagement">
    <div class="table-list">
      <el-form
        :inline="true"
        label-width="100px"
        label-position="right"
        :model="formMember"
        class="demo-form-inline"
      >
        <el-form-item label="职位名称：">
          <el-input v-model="formMember.job_name" class="width300" placeholder="请输入职位名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="职位类别：">
          <el-select v-model="formMember.jobsort" class="width300" placeholder="选择相应的职位类别">
            <el-option :label="item" :value="key" v-for="(item,key) in jobList" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model="formMember.com_name" class="width300" placeholder="请输入企业名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="薪资模式：">
          <el-select v-model="formMember.money_type" class="width300" placeholder="请选择薪资模式">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in moneyTypeList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返利模式：">
          <el-select v-model="formMember.reward_type" class="width300" placeholder="请选择返利模式">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in rewardTypeList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="formMember.status" class="width300" placeholder="请选择">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in entryStatusList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接单时间：">
          <el-date-picker
            class="width300"
            v-model="timeList"
            @change="changeDate"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期区间"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="reset" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <el-table border="" :data="tableData" ref="multipleTable" style="width: 100%">
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="handleViewJob(props.row)">{{props.row.job_name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" prop="com_name" align="center" width="150"></el-table-column>
          <el-table-column label="需求人数" prop="required_number" align="center" width="100"></el-table-column>
          <el-table-column label="已入职" align="center" prop="entry_num" width="100"></el-table-column>
          <el-table-column label="岗位薪资" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.money ?props.row.money:0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="薪资模式" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.money_type|moneyType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="150">
            <template slot-scope="props">
              <span
                class="status"
                v-if="!props.row.entry_status"
                :class="`status${props.row.entry_status}`"
              >入职开始</span>
              <span
                class="status"
                v-if="props.row.entry_status&&props.row.entry_status!=4"
                :class="`status${props.row.entry_status}`"
              >{{props.row.entry_status==1?"入职开始":props.row.entry_status==2?'入职结束':'审核入职'}}</span>
              <span class="status status4" v-if="props.row.entry_status==4">审核结束</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位城市" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.province}}{{props.row.city}}</span>
            </template>
          </el-table-column>
          <el-table-column label="接单时间" sortable align="center" width="160">
            <template slot-scope="props">
              <span>{{props.row.addtime?$moment(props.row.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="返利模式" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.reward_type|rewardType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="入职时间" sortable align="center" width="160">
            <template slot-scope="props">
              <el-button
                type="text"
                @click="viewTime(props.row)"
              >{{props.row.entry_time?$moment.unix(props.row.entry_time).format('YYYY-MM-DD HH:mm'):'--'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="160">
            <template slot-scope="scope">
              <el-button
                @click="$router.push('/commonTableList?view=6&job_id='+scope.row.job_id)"
                v-if="scope.row.entry_status>=2&&scope.row.entry_status!=4"
                type="text"
                size="small"
              >入职审核</el-button>
              <el-button
                @click="$router.push('/commonTableList?view=3&job_id='+scope.row.job_id)"
                type="text"
                size="small"
                v-if="scope.row.entry_status<=1"
              >面试名单
                <!-- <span class="resume-number">(+150)</span> -->
              </el-button>
              <el-button
                @click="$router.push('/commonTableList?view=7&job_id='+scope.row.job_id)"
                type="text"
                size="small"
                v-if="scope.row.entry_status==4"
              >在职名单</el-button>
              <el-button @click="dialogTableVisible=true" type="text" size="small">联系客服</el-button>
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
    <customerService :dialogTableVisible="dialogTableVisible"></customerService>
    <viewJob
      :dialogTableVisible="dialogJobVisible"
      :id="jobId"
      @handleClose="dialogJobVisible=false"
    ></viewJob>
    <receiptModal
      :dialogTableVisible="visible"
      @handleClose="visible=false"
      :viewTimeInfo="viewTimeInfo"
    ></receiptModal>
  </div>
</template>

<script>
import { applyList, getOffermsg } from '@/api/teamReceipt'
import { moneyTypeList, rewardTypeList, entryStatusList } from '@/base/base'
import { getConstant } from '@/api/dictionary'
import viewJob from '../common/viewJob'
import customerService from '../common/customerService'
import receiptModal from './receiptModal'
export default {
  components: {
    viewJob,
    customerService,
    receiptModal
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
      entryStatusList,
      dialogTableVisible: false,
      dialogJobVisible: false,
      visible: false,
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        type: 3
      },
      total: 0,
      statusList: [
        { label: '全部', value: 0 },
        { label: '等待入职', value: 1 },
        { label: '等待入职名单', value: 2 },
        { label: '完成入职名单', value: 3 }
      ],
      jobList: {},
      timeList: [],
      jobId: '',
      viewTimeInfo: {}
    }
  },
  created() {
    // 初始化查询标签数据
    this.getList(this.formMember)
    let params = 'job_array'
    let arr = ['入职名单']
    this.$store.commit("setMenus", arr);
    this.getData(params)
  },
  methods: {
    getData(filed) {
      getConstant({ filed })
        .then(res => {
          this.jobList = res.data.job_array
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    viewTime(val) {
      if (val.entry_time == 0) return
      this.visible = true
      this.apply_id = val.id
      getOffermsg({ apply_id: val.id })
        .then(res => {
          this.viewTimeInfo = res.data
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    getList(params) {
      applyList(params)
        .then(res => {
          this.tableData = res.data.data
          this.total = res.data.count
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    changeDate(val) {
      this.formMember.timemin = val ? val[0] : ''
      this.formMember.timemax = val ? val[1] : ''
    },
    handleSizeChange(val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange(val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleViewJob(val) {
      this.dialogJobVisible = true
      this.jobId = val.job_id
    },
    onSubmit() {
      this.getList(this.formMember)
    },
    reset() {
      this.formMember = {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        type: 3
      }
      this.timeList = []
      this.getList(this.formMember)
    }
  }
}
</script>
