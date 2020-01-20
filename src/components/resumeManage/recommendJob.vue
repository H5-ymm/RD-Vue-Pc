<style lang="scss">
@import '@/assets/css/resume';
</style>
<template>
  <div class="tables-box billingManagement ">
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
    <div class="table-list">
      <el-form :inline="true" label-width="120px" label-position="right" :model="formMember" class="demo-form-inline form-item-wrap">
        <el-form-item label="企业/岗位名称：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
        </el-form-item>
        <!-- <el-form-item label="状态筛选：">
          <el-button :type="activeIndex==index ?'primary':''" v-for="(item,index) in statusList" :key="index" plain @click="selectStatus(item,index)" class="select-status">{{item.label}}</el-button>
        </el-form-item> -->
      </el-form>
      <div class="member-table resume-table resume-table1">
        <div class="table-query">
          <el-button @click="handleApply()">批量推荐</el-button>
          <span class="select-text">
            已选择
            <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
          </span>
          <el-button type="text" @click="multipleSelection=[]">清空</el-button>
        </div>
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" width="60"></el-table-column>
          <el-table-column label="企业名称" align="center" width="150">
            <template slot-scope="props">
              <span class="text-line width140">{{props.row.com_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位名称" align="center" width="150">
            <template slot-scope="props">
              <span class="text-line width140">{{props.row.name}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="返利模式" prop="offermoney_type" align="center" width="120"></el-table-column> -->
          <el-table-column label="返利模式" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.reward_type | moneyType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位城市" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.citysName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="工资" align="center" width="150">
            <template slot-scope="props">
              <span v-if="props.row.reward_type==1">{{props.row.money_min}} ~ {{props.row.money_max}}</span>
              <span v-else>{{props.row.money}}</span>
            </template>
          </el-table-column>
          <el-table-column label="接单状态" align="center" width="150">
            <template slot-scope="props">
              <span class="status">{{props.row.job_status ==1 ? '进行中': '已下架'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位匹配度" align="center" width="150">
            <template slot-scope="props">
              <el-rate :value="Number(props.row.sumNumber)"></el-rate>
            </template>
          </el-table-column>
          <el-table-column label="岗位匹配项" align="center" min-width="170">
            <template slot-scope="props">
              <jobMate :statusObj="props.row"></jobMate>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="120">
            <template slot-scope="scope">
              <el-button @click="handleApply(scope.row.id)" type="text" size="small">推荐岗位</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getMatchingResume,
  getInternalInvoiceList,
  getMatchingJobList,
  getInternalMatchingList
} from '@/api/resume'
import { addPut } from '@/api/teamReceipt'
import { moneyTypeList, rewardTypeList } from '@/base/base'
import jobMate from './jobMate'
export default {
  components: {
    jobMate
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
      statusList: [
        { label: '全部', value: 0 },
        { label: '进行中', value: 1 },
        { label: '已下架', value: 2 }
      ],
      activeIndex: 0,
      tabIndex: 0,
      value1: 5,
      resumeId: '',
      viewType: '',
      apply_id: ''
    }
  },
  created() {
    this.resumeId = this.$route.query.id
    if (this.$route.query.index) {
      this.tabIndex = this.$route.query.index
    } else {
      this.tabIndex = 0
    }
    // 职位匹配简历
    this.formMember.resumeId = this.$route.query.id
    this.getList(this.formMember)
  },
  watch: {
    tabIndex(val) {
      if (this.viewType) {
        this.byJobMatchingList(this.formMember)
      } else {
        this.getList(this.formMember)
      }
    }
  },
  methods: {
    getList(params) {
      if (this.tabIndex == 0) {
        getMatchingJobList(params)
          .then(res => {
            this.tableData = res.data.data
            this.total = res.data.count
          })
          .catch(error => {
            this.$message.error(error.status.remind)
          })
      } else {
        getInternalMatchingList(params)
          .then(res => {
            this.tableData = res.data.data
            this.total = res.data.count
          })
          .catch(error => {
            this.$message.error(error.status.remind)
          })
      }
    },
    byJobMatchingList() {
      if (this.tabIndex == 0) {
        getMatchingResume(params)
          .then(res => {
            this.tableData = res.data.data
            this.total = res.data.count
          })
          .catch(error => {
            this.$message.error(error.status.remind)
          })
      } else {
        getInternalInvoiceList(params)
          .then(res => {
            const { data } = res
            this.tableData = data.data
            this.total = res.data.count
          })
          .catch(error => {
            this.$message.error(error.status.remind)
          })
      }
    },
    selectStatus(item, index) {
      this.activeIndex = index
      this.formMember.status = item.value
      this.getList(this.formMember)
    },
    handleSizeChange(val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange(val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleApply(apply_id) {
      if (!this.multipleSelection.length && !apply_id) {
        return this.$message.warning('请选择职位')
      }
      let params = {
        apply_id: apply_id,
        uid: localStorage.getItem('uid'),
        resume_id: this.resumeId
      }
      addPut(params)
        .then(res => {
          if (res.data) {
            this.dialogTableVisible = true
            this.$message.success('推荐成功')
            this.getList(this.formMember)
          } else {
            this.$message.error('推荐失败')
          }
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      let arr = val.map(item => {
        return item.uid
      })
      this.resumeId = arr.join(',')
    },
    onSubmit() {
      this.getList(this.formMember)
    }
  }
}
</script>

<style lang="scss">
.billingManagement {
  .tab-box {
    margin: 10px 0 25px;
    > li {
      width: 200px;
      height: 40px;
      background: #fff;
      box-shadow: 2px 5px 17px 0px rgba(51, 51, 51, 0.2);
      border-radius: 5px;
      color: #333333;
      margin-right: 40px;
      text-align: center;
      line-height: 40px;
      img {
        width: 34px;
        height: 14px;
      }
      &.tab-active {
        background: #1890ff;
        color: #fff;
      }
    }
  }
}
</style>
