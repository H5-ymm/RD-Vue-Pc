<style lang="scss">
  @import '../assets/css/resume.scss';
  .width120 {
    width: 120px;
    margin-right: 20px;
  }
</style>
<template>
  <div class="tables-box billingManagement receipt-manage">
    <div class="table-list">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline form-item-wrap">
        <el-form-item label="搜索类型：">
          <el-select v-model="formMember.type" class="width120" placeholder="请选择">
            <el-option label="职位名称" value="1"></el-option>
            <el-option label="企业名称" value="2"></el-option>
          </el-select>
          <el-input v-model="formMember.keyword" class="width300" placeholder="请输入你要搜索的关键字"></el-input>
          <el-button type="primary" @click="handleSearch" class="select-btn">查询</el-button>
        </el-form-item>
        <el-form-item label="返利模式：">
          <el-button :type="formMember.reward_type==item.value ?'primary':''" v-for="(item,index) in rewardTypeList" :key="index" plain @click="selectStatus('reward_type',item)" class="select-status">{{item.label}}</el-button>
        </el-form-item>
        <el-form-item label="职位状态：">
          <el-button :type="formMember.jobStatus==item.value ?'primary':''" v-for="(item,index) in jobStatusList" :key="index" plain class="select-status" @click="selectStatus('jobStatus',item)">{{item.label}}</el-button>
        </el-form-item>
        <el-form-item label="薪资模式：">
          <el-button :type="formMember.moneyType==item.value ?'primary':''" v-for="(item,index) in moneyTypeList" :key="index" plain @click="selectStatus('moneyType',item)" class="select-status">{{item.label}}</el-button>
        </el-form-item>
        <el-form-item label="推荐状态：" v-if="userPosition==2">
          <el-button :type="status==item.value ?'primary':''" v-for="(item,index) in recommendStatusList" :key="index" plain @click="selectStatus('status',item)" class="select-status">{{item.label}}</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%">
          <el-table-column label="职位名称" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="viewJob(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" prop="name" align="center" width="150"></el-table-column>
          <el-table-column label="企业性质" prop="name" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.com_type==1?'企业' : '团队'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="需求人数" prop="required_number" align="center" width="110"></el-table-column>
          <el-table-column label="岗位薪资" align="center" width="150">
            <template slot-scope="props">
              <span v-if="props.row.money_type==1">{{props.row.money_min}} ~ {{props.row.money_max}}元/{{props.row.money_type==1?'月':props.row.money_type==2?'日':'时'}}</span>
              <span v-else>{{props.row.money}}元/{{props.row.money_type==1?'月':props.row.money_type==2?'日':'时'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="返利模式" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.reward_money}}元/{{props.row.reward_type | rewardType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="职位状态" align="center" width="110">
            <template slot-scope="props">
              <span class="status" :class="`status${props.row.job_status}`">{{props.row.job_status==1?"招聘中":'已下架'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="推荐状态" align="center" width="110" v-if="userPosition!=1">
            <template slot-scope="props">
              <span class="status" :class="`status${props.row.t_status}`">{{props.row.t_status|recommendStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.job_status==1">
                <el-button @click="handleRecommend(scope.row)" v-if="scope.row.t_status==0&&userPosition!=1" type="text" size="small">推荐接单</el-button>
                <el-button @click="handleApply(scope.row)" v-if="scope.row.t_status==0&userPosition==1" type="text" size="small">申请接单</el-button>
                <span v-if="scope.row.t_status==1&userPosition==1">已申请</span>
                <el-button class="default-status" @click="handleCancle(scope.row)" type="text" v-if="scope.row.t_status==3&&scope.row.jobStatus==1&&userPosition!=1" size="small">取消收藏</el-button>
                <el-button @click="handleCancle(scope.row)" type="text" size="small">取消收藏</el-button>
              </div>
              <div v-else>
                <el-button @click="handleCancle(scope.row)" type="text" size="small">取消收藏</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <viewJob :dialogTableVisible="dialogJobVisible" :id="id" @handleClose="dialogJobVisible=false"></viewJob>
    <modal :dialogTableVisible="dialogTableVisible" @handleOk="handleOk" isShow="true" :modalObj="modalObj" @handleClose="dialogTableVisible=false"></modal>
  </div>
</template>

<script>
import { getCollectList, teamcollection, recommendList, recommendTeamUserJob, teamCollectionJob } from '@/api/collect'
import { moneyTypeList, rewardTypeList, recommendStatusList, rewardTypeList1 } from '@/base/base'
import modal from './common/modal'
import viewJob from './common/viewJob'
export default {
  components: {
    modal,
    viewJob
  },
  filters: {
    moneyType (val) {
      let obj = moneyTypeList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    },
    rewardType (val) {
      let obj = rewardTypeList1.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    },
    recommendStatus (val) {
      let obj = recommendStatusList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    }
  },
  data () {
    return {
      moneyTypeList,
      rewardTypeList1,
      rewardTypeList,
      recommendStatusList,
      dialogTableVisible: false,
      dialogJobVisible: false,
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        jobStatus: 0,
        moneyType: 0,
        reward_type: 0,
      },
      status: -1,
      total: 0,
      jobStatusList: [
        { label: '全部', value: 0 },
        { label: '招聘中', value: 1 },
        { label: '已下架', value: 2 }
      ],
      modalObj: {
        content: '申请成功！</br>已申请的接单请到申请接单查看进度',
        okText: '查看申请',
        closeText: '继续浏览'
      },
      id: '',
      userPosition: localStorage.getItem('userPosition')// 1 总经理，2经理，3 成员
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      getCollectList(params).then(res => {
        this.tableData = res.data.data
        this.total = res.data.count
      }).catch(error => {
        if (error) {
          this.$message.error(error.status.remind)
        }
      })
    },
    viewJob (val) {
      this.id = val.job_id
      this.dialogJobVisible = true
    },
    selectStatus (key, item) {
      if (key == 'status') {
        this.status = item.value
      }
      this.formMember[key] = item.value
      this.getList(this.formMember)
    },
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleRecommend (val) {
      let params = {
        jobId: val.job_id,
        id: val.id,
        uid: localStorage.getItem('uid')
      }
      recommendTeamUserJob(params).then(res => {
        if (res.data) {
          this.$message.success('推荐成功')
          this.getList(this.formMember)
        }
        else {
          this.$message.error('推荐失败')
        }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleCancle (val) {
      let params = {
        uid: localStorage.getItem('uid'),
        jobId: val.job_id
      }
      teamCollectionJob(params).then(res => {
        if (res.data) {
          this.$message.success('取消成功')
          this.getList(this.formMember)
        } else {
          this.$message.error('取消失败')
        }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleApply (val) {
      let params = {
        jobId: val.job_id,
        id: val.id,
        uid: localStorage.getItem('uid'),
        collectId: val.id
      }
      teamcollection(params).then(res => {
        this.$message.success('取消成功')
        // this.dialogTableVisible = true
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleOk () {
      this.$router.push('/teamApplication')
    },
    handleSearch () {
      this.getList(this.formMember)
    }
  }
}
</script>