
<style lang="scss">
@import '@/assets/css/resume.scss';
.billingManagement {
  .el-rate__icon {
    font-size: 20px;
  }
}
.recomment-card  {
  background: #fff;
  border-radius: 5px;
  height: 100px;
  box-shadow:2px 5px 17px 0px rgba(51,51,51,0.2);
  padding: 0 60px;
  line-height: 30px;
  color: #999;
  font-size: 16px;
  margin-bottom: 10px;
  .desired-position {
    font-size: 18px;
    color: #333333;
    font-weight: bold;
  }
  .recomment-card-col1 {
    width: 40%;
  }
  .recomment-card-col2 {
    width: 50%;
  }
  .recomment-card-info {
    text-align: center;
    p {
      &:nth-of-type(2) {
        margin-left: -10px;
      }
    }
  }
  .recomment-card-col3 {
    width: 50%;
    .progress {
      width:100%;
      height: 4px;
      border-radius: 2px;
      background: #eee;
      position: relative;
      margin-right: 10px;
      .progress-item {
        background: #1890FF;
        height: 4px;
        border-radius: 2px;
        position: absolute;
        top: 0;
        left:0;  
      }
    }
  }
}
</style>

<template>
  <div class="tables-box billingManagement">
    <div class="recomment-card x-flex-start-justify" v-if="!activeIndex">
      <div class="recomment-card-col1">
        <p>推荐公司：</p>
        <p class="desired-position">{{resumeInfo.com_name?resumeInfo.com_name:'--'}}</p>
      </div>
      <div class="x-flex-around recomment-card-col2">
        <div class="recomment-card-info">
          <p>需求人数：</p>
          <p>{{resumeInfo.need_num?resumeInfo.need_num:'--'}}</p>
        </div>
        <div class="recomment-card-info">
          <p>已推荐人数：</p>
          <p>{{resumeInfo.put?resumeInfo.put:'--'}}</p>
        </div>
        <div class="recomment-card-info">
          <p>已通过人数：</p>
          <p>{{resumeInfo.pass?resumeInfo.pass:'--'}}</p>
        </div>
      </div>
      <!-- <div class="recomment-card-col3 x-flex-start-justify">
        <div class="progress">
          <p class="progress-item" :style="{width:percentageNum}"></p>
        </div>
        <p>{{percentageNum}}</p>
      </div> -->
      <!-- <el-progress :percentage="percentageNum"></el-progress> -->
    </div>
    <div class="table-list recommend-table">
      <el-form :inline="true" label-width="75px" label-position="right" :model="formMember" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <div class="table-query">
          <el-button @click="handleJob(resume_id)">批量推荐</el-button>
          <span class="select-text">
            已选择
            <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
          </span>
          <el-button type="text" @click="multipleSelection=[]">清空</el-button>
        </div>
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column label="姓名" align="center" width="150" prop="name">

          </el-table-column>
          <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
          <el-table-column label="性别" align="center" width="90">
            <template slot-scope="props">
              <span>{{props.row.sex==2?'男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="年龄" prop="age" align="center" width="100"></el-table-column>
          <el-table-column label="意向岗位" prop="desired_position" align="center" width="150"></el-table-column>
          <el-table-column label="意向工资" align="center" width="150">
            <template slot-scope="props">
              <span v-if="props.row.min_expect_money&&props.row.max_expect_money">{{props.row.min_expect_money }}~{{props.row.max_expect_money }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="意向城市" prop="address" align="center" width="150">
            <!-- <template slot-scope="props">
              <span>{{props.row.province}}{{props.row.city}}</span>
            </template> -->
          </el-table-column>
          <el-table-column label="岗位匹配度" prop="reward_money" align="center" width="220">
            <template slot-scope="props">
              <el-rate disabled :value="Number(props.row.sumNumber)"></el-rate>
            </template>
          </el-table-column>
          <el-table-column label="岗位匹配项" align="center" min-width="280">
            <template slot-scope="props">
              <jobMate :statusObj="props.row"></jobMate>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="120">
            <template slot-scope="scope">
              <el-button @click="handleJob(scope.row.resume_id)" type="text" size="small">推荐岗位</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
// import { getTeamList, loginOutTeam, addTeamUser, updateTeamUser } from '../../api/team'
import { gettalent, addPut, getapplyInfo } from '@/api/teamReceipt'
import { addPutSelf } from '@/api/internalInvoice'
import { addUserResume, getMatchingResume, getInternalInvoiceList, getMatchingJobList, getInternalMatchingList } from '@/api/resume'
import { moneyTypeList, rewardTypeList, payTypeList, weekList } from '@/base/base'
import jobMate from '../resumeManage/jobMate'
export default {
  components: {
    jobMate
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
      tabIndex: 0,
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
      len: 0,
      userId: '',
      multipleSelection: [],
      form: {},
      statusList: [
        { label: '全部', value: 0 },
        { label: '待审核', value: 1 },
        { label: '已入职', value: 2 },
        { label: '未入职', value: 3 }
      ],
      activeIndex: 0,
      jobId: '',
      resumeInfo: {},
      apply_id: '',
      resume_id: ''
    }
  },
  created () {
    // 初始化查询标签数据
    this.formMember.jobId = this.$route.query.jobId
    if (this.$route.query.index) {
      this.activeIndex = this.$route.query.index
    }
    else {
      this.activeIndex = 0
    }
    if (this.$route.query.jobId) {
      this.jobId = this.$route.query.jobId
    }
    if (this.$route.query.id && !this.activeIndex) {
      this.apply_id = this.$route.query.id
      this.getInfo()
    }
    this.byJobMatchingList(this.formMember)
  },
  methods: {
    byJobMatchingList (params) {
      if (this.tabIndex == 0) {
        getMatchingResume(params).then(res => {
          const { data } = res
          this.tableData = data.data
          this.total = res.data.count
        })
      }
      else {
        getInternalInvoiceList(params).then(res => {
          const { data } = res
          this.tableData = data.data
          console.log(res)
          this.total = res.data.count
        })
      }
    },
    getList (params) {
      gettalent(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    getInfo () {
      let params = {
        apply_id: this.apply_id,
        uid: localStorage.getItem('uid')
      }
      getapplyInfo(params).then(res => {
        this.resumeInfo = res.data
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
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
    handleJob (resume_id) {
      if (!resume_id) {
        return this.$message.success('请选择简历')
      }
      if (!this.tabIndex) {
        let param = {
          resume_id: resume_id,
          uid: localStorage.getItem('uid'),
          apply_id: this.apply_id
        }
        addPut(param).then(res => {
          if (res.data) {
            this.$message.success('推荐成功')
            this.byJobMatchingList(this.formMember)
          }
          else {
            this.$message.error('推荐失败')
          }
        }).catch(error => {
          this.$message.error(error.status.remind)
        })
      }
      else {
        let param = {
          resume_id: resume_id,
          uid: localStorage.getItem('uid'),
          job_id: this.formMember.jobId
        }
        addPutSelf(param).then(res => {
          if (res.data) {
            this.$message.success('推荐成功')
            this.byJobMatchingList(this.formMember)
          }
          else {
            this.$message.error('推荐失败')
          }
        }).catch(error => {
          this.$message.error(error.status.remind)
        })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      var arr = val.map(item => {
        return item.resume_id
      })
      this.resume_id = arr.join(',')
    },
    onSubmit () {
      this.byJobMatchingList(this.formMember)
    }
  }
}
</script>
