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
          <el-select v-model="formMember.job_type" class="width300" placeholder="选择相应的职位类别">
            <el-option :label="item" :value="key" v-for="(item,key) in jobList" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="团队名称：">
          <el-input v-model="formMember.team_name" class="width300" placeholder="请输入团队名称关键字"></el-input>
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
          <el-select v-model="formMember.money_type" class="width300" placeholder="请选择返利模式">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in rewardTypeList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发单状态：">
          <el-select v-model="formMember.status" class="width300" placeholder="请选择">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in userResumeStatusList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面试时间：">
          <el-date-picker
            class="width300"
            v-model="timeList"
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
      <div class="member-table resume-table">
        <div class="table-query">
          <el-button @click="exportResume">导出简历</el-button>
          <span class="select-text">
            已选择
            <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
          </span>
          <el-button type="text" @click="multipleSelection=[]">清空</el-button>
        </div>
        <el-table
          border
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="60"></el-table-column>
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="团队名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.money_type | moneyType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="需求人数" prop="depart_name" align="center" width="150"></el-table-column>
          <el-table-column label="面试通过" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.reward_type | rewardType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="岗位薪资" prop="reward_money" align="center" width="150"></el-table-column>
          <el-table-column label="薪资模式" prop="reward_money" align="center" width="150"></el-table-column>
          <el-table-column label="发单状态" align="center" width="150">
            <template slot-scope="props">
              <span
                class="status"
                :class="{'active-status':props.row.status==1}"
              >{{props.row.status|statusType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位城市" prop="entry_num" sortable align="center" width="150"></el-table-column>
          <el-table-column label="返利模式" prop="entry_num" sortable align="center" width="150"></el-table-column>
          <el-table-column label="接单时间" prop="entry_num" sortable align="center" width="150"></el-table-column>
          <el-table-column label="联系人" prop="entry_num" sortable align="center" width="150"></el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="props">
              <div v-if="props.row.status==0||props.row.status==1">
                <el-button
                  @click="$router.push({path:'checkResume',query:{id:props.row.id,view:1}})"
                  type="text"
                  size="small"
                >审核简历</el-button>
                <el-button @click="dialogTableVisible=true" type="text" size="small">面试通知</el-button>
              </div>
              <div v-if="props.row.status==2||props.row.status==-1">
                <el-button
                  @click="$router.push({path:'checkResume',query:{id:props.row.id,view:2}})"
                  type="text"
                  size="small"
                >查看面试</el-button>
                <el-button
                  @click="$router.push('/checkResume?view=2')"
                  type="text"
                  size="small"
                >审核结果</el-button>
              </div>
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
    <noticeModal :dialogTableVisible="dialogTableVisible" noticeType="面试" @submitForm="submitForm"></noticeModal>
    <modal
      :dialogTableVisible="visible"
      @handleOk="handleOk"
      isShow="true"
      :modalObj="modalObj"
      @handleClose="visible=false,jobId=''"
    ></modal>
  </div>
</template>

<script>
import { getResumeList, exportRecommendResume, editInterviewTime } from '../../api/receipt'
import { moneyTypeList, rewardTypeList, payTypeList, userResumeStatusList } from '../../base/base'
import noticeModal from './noticeModal'
import { getConstant } from '../../api/dictionary'
import modal from '../common/modal'
export default {
  components: {
    noticeModal,
    modal
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
    statusType (val) {
      let obj = userResumeStatusList.find(item => {
        return val == item.value
      })
      return obj.label
    }
  },
  data () {
    return {
      moneyTypeList,
      rewardTypeList,
      userResumeStatusList,
      dialogTableVisible: false,
      visible: false,
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      multipleSelection: [],
      activeIndex: 0,
      jobList: {},
      jobId: '',
      modalObj: {
        content: '你确定要批量操作？',
        okText: '确定',
        closeText: '取消'
      },
      timeList: [],
      noticeModalInfo: {
        title: '',
        type: '面试'
      }
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
      getResumeList(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      })
    },
    exportResume () {
      if (!this.jobId) {
        return this.$message.warning('请选择简历')
      }
      else {
        this.visible = true
      }
    },
    handleOk () {
      this.visible = false
      let params = {
        uid: localStorage.getItem('uid'),
        jodId: this.jobId
      }
      exportRecommendResume(params)
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
    handleSelectionChange (val) {
      let arr = val.map(item => {
        return item.ud
      })
      this.jobId = arr.join(',')
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
      this.getList(this.formMember)
    },
    // 面试时间
    submitForm (val) {
      let params = Object.assign(val, { job_id: this.jobId, uid: this.formMemberuid })
      editInterviewTime(params).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    }
  }
}
</script>