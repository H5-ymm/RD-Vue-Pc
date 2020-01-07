
<style lang="scss">
@import '@/assets/css/resume.scss';
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
        <p class="desired-position">仁达网络科技（上海）有限公司</p>
      </div>
      <div class="x-flex-around recomment-card-col2">
        <div class="recomment-card-info">
          <p>需求人数：</p>
          <p>33</p>
        </div>
        <div class="recomment-card-info">
          <p>已推荐人数：</p>
          <p>33</p>
        </div>
        <div class="recomment-card-info">
          <p>已通过人数：</p>
          <p>3</p>
        </div>
      </div>
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
          <el-button>批量推荐</el-button>
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
          <el-table-column label="年龄" prop="age" align="center" width="90"></el-table-column>
          <el-table-column label="意向岗位" prop="desired_position" align="center" width="150"></el-table-column>
          <el-table-column label="意向工资" align="center" width="120">
            <template slot-scope="props">
              <span>{{props.row.min_expect_money }}~{{props.row.max_expect_money }}</span>
            </template>
          </el-table-column>
          <el-table-column label="意向城市" align="center" width="120">
            <template slot-scope="props">
              <span>{{props.row.province}}{{props.row.city}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位匹配度" prop="reward_money" align="center" width="150">
            <template slot-scope="props">
              <el-rate v-model="props.row.reward_type"></el-rate>
            </template>
          </el-table-column>
          <el-table-column label="岗位匹配项" align="center" min-width="160">
            <template slot-scope="props">
              <jobMate :statusObj="props.row"></jobMate>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="120">
            <template slot-scope="scope">
              <el-button @click="handleJob(scope.row)" type="text" size="small">推荐岗位</el-button>
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
import { gettalent, addPut } from '../../api/teamReceipt'
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
      visible: false,
      tableData: [],
      currentPage: 1,
      userType: 1,
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        id: ''
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
      jobId: ''
    }
  },
  created () {
    // 初始化查询标签数据
    this.formMember.id = this.$route.query.id
    this.jobId = this.$route.query.jobId
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      gettalent(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
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
    handleJob (val) {
      let param = {
        resume_id: val.id,
        uid: localStorage.getItem('uid'),
        apply_id: this.formMember.id
      }
      addPut(param).then(res => {
        this.$message.success('推荐成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleSelectionChange (val) {
      this.len = val
    },
    onSubmit () {
      this.getList(this.formMember)
    }
  }
}
</script>
