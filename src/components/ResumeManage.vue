<template>
  <div class="tables-box billingManagement">
    <div>
      <ul class="x-flex-start tab-box">
        <li :class="{'tab-active':tabIndex==0}" @click="tabIndex=0">
          <p>团队接单</p>
          <img src="../assets/img/icon6.png" v-if="tabIndex==0" alt />
        </li>
        <li :class="{'tab-active':tabIndex==1}" @click="tabIndex=1">
          <p>团队接单</p>
          <img src="../assets/img/icon6.png" v-if="tabIndex==1" alt />
        </li>
      </ul>
    </div>
    <div class="table-list resume-list">
      <el-form
        :inline="true"
        label-width="120px"
        label-position="right"
        :model="formMember"
        class="demo-form-inline"
      >
        <el-form-item label="企业/岗位名称：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
        </el-form-item>
        <el-form-item label="状态筛选：">
          <el-button
            :type="activeIndex==index ?'primary':''"
            v-for="(item,index) in statusList"
            :key="index"
            plain
            @click="selectStatus(item,index)"
            class="select-status"
          >{{item.label}}</el-button>
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
          <el-table-column type="selection" align="center" width="60"></el-table-column>
          <el-table-column label="企业名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="handleEdit(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="岗位名称" align="center" width="120">
            <template slot-scope="props">
              <el-button type="text">{{props.row.money_type | moneyType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="返利模式" prop="depart_name" align="center" width="120"></el-table-column>
          <el-table-column label="工资" align="center" width="100">
            <template slot-scope="props">
              <el-button type="text">{{props.row.reward_type | rewardType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="接单状态" prop="reward_money" align="center" width="120"></el-table-column>
          <el-table-column label="岗位匹配度" prop="entry_num" align="center" width="150"></el-table-column>
          <el-table-column label="岗位匹配项" align="center" width="150">
            <template slot-scope="props">
              <span
                class="status"
                :class="{'active-status':props.row.status==1}"
              >{{props.row.status==1?"正常":'锁定'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="120">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">推荐岗位</el-button>
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
import { getTeamList, loginOutTeam, addTeamUser, updateTeamUser } from '@/api/team'
import { getResumeList, addUserResume } from '@/api/resume'
import { moneyTypeList, rewardTypeList, payTypeList, weekList } from '@/base/base'
export default {
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
        { label: '进行中', value: 1 },
        { label: '已下架', value: 2 }
      ],
      activeIndex: 0,
      tabIndex: 0
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      getResumeList(params).then(res => {
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

<style lang="scss">
.billingManagement {
  .demo-form-inline {
    width: 80%;
  }
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
  .table-query {
    margin-bottom:20px;
    .select-text {
      margin-left: 10px;
    }
  }
  .table-list {
    padding-left: 10px;
    .select-btn {
      margin-left: 20px;
    }
  }
  .width300 {
    width: 300px;
  }
  .select-status {
    margin-right: 10px;
  }
}

</style>
