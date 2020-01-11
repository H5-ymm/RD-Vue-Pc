
<style lang="scss">
@import '@/assets/css/resume.scss';
.billingManagement {
  .tab-box {
    margin: 10px 0 25px;
    >li {
      width:200px;
      height:40px;
      background:#fff;
      box-shadow:2px 5px 17px 0px rgba(51,51,51,0.2);
      border-radius:5px;
      color: #333333;
      margin-right: 40px;
      text-align: center;
      line-height: 40px;
      img {
        width: 34px;
        height: 14px;
      }
      &.tab-active {
        background:#1890FF;
        color: #fff;
      }
    }
  }
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
}
</style>

<template>
  <div class="tables-box billingManagement">
    <div class="recomment-card x-flex-start-justify">
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
      <div>
        <div class="progress">
          <p class="progress-item"></p>
        </div>
      </div>
      <!-- <el-progress :percentage="percentageNum"></el-progress> -->
    </div>
    <div>
      <ul class="x-flex-start tab-box">
        <li :class="{'tab-active':tabIndex==0}" @click="tabIndex=0">
          <p>团队接单</p>
          <img src="../../assets/img/icon6.png" v-if="tabIndex==0" alt />
        </li>
        <li :class="{'tab-active':tabIndex==1}" @click="tabIndex=1">
          <p>内部发单</p>
          <img src="../../assets/img/icon6.png" v-if="tabIndex==1" alt />
        </li>
      </ul>
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
import { gettalent, addPut, getapplyInfo } from '../../api/teamReceipt'
import { getResumeList, addUserResume, getMatchingResume, getInternalInvoiceList, getMatchingJobList, getInternalMatchingList } from '@/api/resume'
import { moneyTypeList, rewardTypeList, payTypeList, weekList } from '../../base/base'
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
      percentageNum: 0,
      apply_id: '',
      resume_id: ''
    }
  },
  created () {
    // 初始化查询标签数据
    this.formMember.jobId = this.$route.query.jobId
    this.apply_id = this.$route.query.id
    if (this.$route.query.jobId) {
      this.jobId = this.$route.query.jobId
    }
    this.getInfo()
    this.byJobMatchingList(this.formMember)

  },
  watch: {
    $route (to, from) {
      if (from.query.jobId) {
        this.formMember.jobId = from.query.jobId
        this.getInfo()
        this.byJobMatchingList(this.formMember)
      }
    },
    tabIndex (val) {
      this.byJobMatchingList(this.formMember)
    },
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
        let need_num = !res.data.need_num ? 0 : res.data.need_num
        let put = !res.data.put ? 0 : res.data.put
        if (!put && !need_num) {
          this.percentageNum = 0
        }
        else {
          this.percentageNum = parseInt((put / Number(need_num) * 100))
        }
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
      let param = {
        resume_id: resume_id,
        uid: localStorage.getItem('uid'),
        apply_id: this.apply_id
      }
      addPut(param).then(res => {
        this.$message.success('推荐成功')
        this.byJobMatchingList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
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
