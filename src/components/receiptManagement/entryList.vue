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
        <el-form-item label="入职时间：">
          <el-date-picker class="width300" value-format="timestamp" @change="changeDate" v-model="timeList" type="daterange" range-separator="-" start-placeholder="开始日期区间" end-placeholder="结束日期"></el-date-picker>
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
          <el-table-column label="已入职" prop="recommendResume" align="center" width="100"></el-table-column>
          <el-table-column label="岗位薪资" prop="money" align="center" width="120"></el-table-column>
          <el-table-column label="薪资模式" align="center" width="100">
            <template slot-scope="props">
              <span>{{props.row.money_type|moneyType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="100">
            <template slot-scope="props">
              <span class="status" :class="`status${props.row.entry_status}`">{{props.row.entry_status==4?'入职结束':'入职开始'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位城市" prop="citys" align="center" width="150"></el-table-column>
          <el-table-column label="接单时间" sortable="custom" prop="jddesc" align="center" width="160">
            <template slot-scope="props">
              <span>{{props.row.addtime?$moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="返利模式" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.reward_money}}元/{{props.row.reward_type==1?'月':props.row.reward_type==2?'日': props.row.reward_type==3?'时':'一次性'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="入职时间" sortable align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.entry_time?$moment.unix(props.row.entry_time).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人" prop="link_name" align="center" width="100"></el-table-column>
          <el-table-column label="操作" align="center" min-width="160" fixed="right">
            <template slot-scope="scope">
              <el-button @click="$router.push({path:'/commonTable',query:{id:scope.row.id,view:4}})" type="text" size="small" v-if="scope.row.entry_status==1">查看入职</el-button>
              <el-button @click="$router.push({path:'/commonTable',query:{id:scope.row.id,view:4}})" type="text" v-if="scope.row.entry_status<=1" size="small">面试结果</el-button>
              <el-button v-if="scope.row.entry_status>1" @click="$router.push({path:'/commonTable',query:{id:scope.row.id,view:7}})" type="text" size="small">
                入职名单
              </el-button>
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
import { entryInvoiceList, endEntry } from '@/api/receipt'
import { moneyTypeList, rewardTypeList, entryStatusList } from '@/base/base'
import { getConstant } from '@/api/dictionary'
import modal from '../common/modal'
export default {
  components: {
    modal
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
    status(val) {
      let obj = entryStatusList.find(item => {
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
      visible: false,
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      statusList: [
        { label: '全部', value: 0 },
        { label: '入职开始', value: 1 },
        { label: '入职结束', value: 2 }
      ],
      activeIndex: 0,
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
  created() {
    // 初始化查询标签数据
    if (this.$route.query.id) {
      this.jobId = this.$route.query.id
      this.formMember.jobId = this.$route.query.id
    }
    this.getList(this.formMember)
  },
  methods: {
    getList(params) {
      entryInvoiceList(params)
        .then(res => {
          this.tableData = res.data.data
          this.total = res.data.count
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    selectStatus(item, index) {
      this.activeIndex = index
      this.formMember.status = item.value
    },
     changeDate(val) {
      let starttime = val? val[0] + '' : ''
      let endtime =  val?  val[1] + '' : ''
      this.formMember.begintime = starttime? starttime.substring(0, 10): ''
      this.formMember.endtime = endtime? endtime.substring(0, 10): ''
    },
    handleSizeChange(val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange(val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleUser(index, val) {
      this.dialogTableVisible = true
      this.overType = index
      if (index == 1) {
        this.modalObj.content = '你确定要提前结束入职吗？'
      } else {
        this.modalObj.content = '你确定要提前结束面试吗？'
      }
      this.jobId = val.id
    },
    handleOk() {
      this.dialogTableVisible = false
      let params = {
        uid: localStorage.getItem('uid'),
        jobId: this.jobId
      }
      if (this.overType == 1) {
        this.handleOverEntry(params)
      } else {
        this.handelOverAudition(params)
      }
    },
    // 结束入职
    handleOverEntry(params) {
      endEntry(params)
        .then(res => {
          this.getList(this.formMember)
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    // 结束面试
    handelOverAudition(params) {
      endInterview(params)
        .then(res => {
          this.$message.success('操作成功')
          this.getList(this.formMember)
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    onSubmit() {
      this.getList(this.formMember)
    },
    reset() {
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