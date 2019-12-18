
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
        <p>推荐岗位：</p>
        <p class="desired-position">仁达网络科技（上海）有限公司</p>
      </div>
      <div class="x-flex-around recomment-card-col2">
        <div class="recomment-card-info">
          <p>需求人数：</p>
          <p>33</p>
        </div>
        <div class="recomment-card-info">
          <p>需求人数：</p>
          <p>33</p>
        </div>
        <div class="recomment-card-info">
          <p>需求人数：</p>
          <p>3</p>
        </div>
      </div>
    </div>
    <div class="table-list recommend-table">
      <el-form
        :inline="true"
        label-width="75px"
        label-position="right"
        :model="formMember"
        class="demo-form-inline"
      >
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
        <el-table
          border
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column label="姓名" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="handleEdit(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
          <el-table-column label="性别" align="center" width="90">
            <template slot-scope="props">
              <el-button type="text">{{props.row.sex==2?'男':'女'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="年龄" prop="age" align="center" width="90"></el-table-column>
          <el-table-column label="意向岗位" prop="depart_name" align="center" width="150"></el-table-column>
          <el-table-column label="意向工资" prop="depart_name" align="center" width="120"></el-table-column>
          <el-table-column label="意向城市" align="center" width="100">
            <template slot-scope="props">
              <el-button type="text">{{props.row.reward_type | rewardType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="岗位匹配度" prop="reward_money" align="center" width="150">
            <template slot-scope="props">
              <el-rate v-model="props.row.reward_type"></el-rate>
            </template>
          </el-table-column>
          <el-table-column label="岗位匹配项" prop="entry_num" align="center" width="150"></el-table-column>
          <el-table-column label="操作" align="center" min-width="120">
            <template slot-scope="scope">
              <el-button @click="$router.push('recommendJob')" type="text" size="small">推荐岗位</el-button>
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
  </div>
</template>

<script>
import { getTeamList, loginOutTeam, addTeamUser, updateTeamUser } from '../../api/team'
import { getReceiptList } from '../../api/receipt'
import { moneyTypeList, rewardTypeList, payTypeList, weekList } from '../../base/base'
export default {
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
      activeIndex: 0
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      getReceiptList(params).then(res => {
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
    handleEdit (val) {
      this.dialogTableVisible = true
      this.userId = val
      console.log(this.userId)
    },
    handleDel (uid) {
      loginOutTeam({ uid }).then(res => {
        this.$message.success('退出成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    submitMember (val) {
      updateTeamUser(val).then(res => {
        this.dialogTableVisible = false
        this.getList(this.params)
      })
    },
    handleSelectionChange (val) {
      this.len = val
    },
    addMember () {
      this.visible = true
    },
    onSubmit (value) {
      let params = Object.assign(this.formMember, value)
      this.getList(params)
    },
    submitForm (val) {
      this.visible = false
      addTeamUser(val).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    }
  }
}
</script>
