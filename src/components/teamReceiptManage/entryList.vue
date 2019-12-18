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
          <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="职位类别：">
          <el-select v-model="formMember.industry" class="width300" placeholder="选择相应的职位类别">
            <el-option :label="item" :value="key" v-for="(item,key) in jobList" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="团队名称：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入团队名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="薪资模式：">
          <el-select v-model="formMember.industry" class="width300" placeholder="请选择薪资模式">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in moneyTypeList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返利模式：">
          <el-select v-model="formMember.industry" class="width300" placeholder="请选择返利模式">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in rewardTypeList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="formMember.industry" class="width300" placeholder="请选择">
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
            v-model="formMember.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期区间"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="onSubmit" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
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
              <el-button type="text" @click="handleEdit(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="团队名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.money_type | moneyType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="需求人数" prop="depart_name" align="center" width="100"></el-table-column>
          <el-table-column label="已入职" align="center" width="100">
            <template slot-scope="props">
              <el-button type="text">{{props.row.reward_type | rewardType}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="岗位薪资" prop="reward_money" align="center" width="120"></el-table-column>
          <el-table-column label="薪资模式" prop="reward_money" align="center" width="100"></el-table-column>
          <el-table-column label="状态" align="center" width="100">
            <template slot-scope="props">
              <span
                class="status"
                :class="{'active-status':props.row.status==1}"
              >{{props.row.status==1?"正常":'锁定'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位城市" prop="entry_num" align="center" width="150"></el-table-column>
          <el-table-column label="接单时间" prop="entry_num" sortable align="center" width="150"></el-table-column>
          <el-table-column label="返利模式" prop="entry_num" align="center" width="100"></el-table-column>
          <el-table-column label="入职时间" prop="entry_num" sortable align="center" width="150"></el-table-column>
          <el-table-column label="操作" align="center" min-width="120">
            <template slot-scope="scope">
              <el-button @click="handleDel(scope.row)" type="text" size="small">
                联系客服
                <el-button @click="$router.push('/commonTableList')" type="text" size="small">
                  入职名单
                  <span class="resume-number">(+150)</span>
                </el-button>
              </el-button>
              <el-button @click="handleEdit(scope.row)" type="text" size="small">在职名单</el-button>
              <el-button @click="$router.push('/commonTableList')" type="text" size="small">入职审核</el-button>
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
import { moneyTypeList, rewardTypeList, payTypeList, weekList, entryStatusList } from '../../base/base'
import { getConstant } from '../../api/dictionary'
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
      len: 0,
      userId: '',
      multipleSelection: [],
      form: {},
      statusList: [
        { label: '全部', value: 0 },
        { label: '等待入职', value: 1 },
        { label: '等待入职名单', value: 2 },
        { label: '完成入职名单', value: 3 }
      ],
      activeIndex: 0,
      jobList: {}
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

<style lang="scss">
.billingManagement {
  .demo-form-inline {
    width: 84%;
  }
  .table-list {
    padding-top: 70px;
    padding-left: 10px;
    .select-btn {
      margin-left: 20px;
    }
    .member-table {
      margin-top: 40px;
      padding-left: 20px;
      &.resume-table {
        margin-top: 0;
        .select-text {
          margin-left: 10px;
        }
      }
    }
    .table-query {
      margin-bottom:20px;
    }
  }
  .width300 {
    width: 300px;
  }
  .select-status {
    margin-right: 10px;
  }
  .resume-number {
    font-size:14px;
    color:#FF1818;
  }
}

</style>
