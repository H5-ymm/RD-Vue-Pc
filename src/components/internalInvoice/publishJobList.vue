<style lang="scss">
  @import '@/assets/css/resume.scss';
  .internal-invoice {
    .table-list {
      padding-top: 10px;
      .member-table {
        padding-left: 10px;
      }
    }
    .internal-invoice-form {
      .el-button {
        padding: 10px;
      }
    }
    .select-status {
      margin-right: 2px;
    }
    .success-color {
      color: #71D875;
    }
    .fail-color{
      color: #FF0000;
    }
    .outline-color {
      color: #999999;
    }
  }
  .width120 {
    width: 120px;
    margin-right: 20px;
  }
  .senior-search-btn{
    color: #999999;
    display: inline-block;
    margin-left: 20px;
  }
  .senior-search-box {
    background:rgba(255,255,255,0.6);
    border:1px solid rgba(255,255,255,0.1);
    box-shadow:0px 2px 13px 0px rgba(0, 0, 0, 0.1);
    padding: 10px 10px 0;
    margin-bottom: 10px;
    position: relative;
    margin-left: -10px;
    .senior-search-col2 {
      margin-left: 6%;
    }
    .up-box {
      position: absolute;
      right: 10px;
      bottom: 20px;
    }
  }
</style>
<template>
  <div class="tables-box billingManagement receipt-manage internal-invoice">
    <div class="table-list">
      <el-form :inline="true" label-width="96px" label-position="right" :model="formMember" class="internal-invoice-form form-item-wrap">
        <el-form-item label="搜索类型：">
          <el-select v-model="type" class="width120" placeholder="请选择">
            <el-option label="职位名称" value="job_name"></el-option>
            <el-option label="企业名称" value="com_name"></el-option>
            <el-option label="工作地址" value="address"></el-option>
          </el-select>
          <el-input v-model="keyword" class="width300" @change="changeInput" placeholder="请输入你要搜索的关键字"></el-input>
          <el-button type="primary" @click="handleSearch" class="select-btn">查询</el-button>
          <p @click="show=!show" class="x-flex-center senior-search-btn">
            <el-link :type="show?'primary': ''" :underline="false">高级筛选</el-link>
            <i class="el-icon-arrow-down"></i>
          </p>
        </el-form-item>
        <el-collapse-transition>
          <div v-show="show" class="senior-search-box x-flex-start">
            <div>
              <el-form-item label="发布时间：">
                <el-button :type="formMember.ctime==item.value ?'primary':''" v-for="(item,index) in timeStatusList" :key="index" plain @click="selectStatus('ctime',item)" class="select-status">{{item.label}}</el-button>
              </el-form-item>
              <el-form-item label="缴纳公积金：">
                <el-button :type="formMember.reserve_fund==item.value ?'primary':''" v-for="(item,index) in statusList" :key="index" plain class="select-status" @click="selectStatus('reserve_fund',item)">{{item.label}}</el-button>
              </el-form-item>
              <el-form-item label="返利模式：">
                <el-button :type="formMember.reward_type==item.value ?'primary':''" v-for="(item,index) in rewardTypeList" :key="index" plain @click="selectStatus('reward_type',item)" class="select-status">{{item.label}}</el-button>
              </el-form-item>
            </div>
            <div class="senior-search-col2">
              <el-form-item label="缴纳五险：">
                <el-button :type="formMember.five_risks==item.value ?'primary':''" v-for="(item,index) in statusList" :key="index" plain @click="selectStatus('five_risks',item)" class="select-status">{{item.label}}</el-button>
              </el-form-item>
              <el-form-item label="上架状态：">
                <el-button :type="formMember.is_up==item.value ?'primary':''" v-for="(item,index) in statusList" :key="index" plain @click="selectStatus('is_up',item)" class="select-status">{{item.label}}</el-button>
              </el-form-item>
              <el-form-item label="岗位类型：">
                <el-button :type="formMember.job_type==item.value ?'primary':''" v-for="(item,index) in positionStatusList" :key="index" plain @click="selectStatus('job_type',item)" class="select-status">{{item.label}}</el-button>
              </el-form-item>
            </div>
            <div class="up-box">
              <p @click="show=!show" class="senior-search-btn">
                <span>收起</span>
                <i class="el-icon-arrow-up"></i>
              </p>
            </div>
          </div>
        </el-collapse-transition>

        <el-form-item label="薪资类型：">
          <el-button :type="formMember.offermoney_type==item.value ?'primary':''" v-for="(item,index) in moneyTypeList" :key="index" plain @click="selectStatus('offermoney_type',item)" class="select-status">{{item.label}}</el-button>
        </el-form-item>
        <el-form-item label="招聘类型：">
          <el-button :type="formMember.type==item.value ?'primary':''" v-for="(item,index) in advertisesList" :key="index" plain @click="selectStatus('moneyType',item)" class="select-status">{{item.label}}</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <div class="table-query">
          <el-button @click="$router.push('postJob')">发布岗位</el-button>
        </div>
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%">
          <el-table-column label="企业名称" prop="company_name" align="center" width="150"></el-table-column>
          <el-table-column label="岗位名称" prop="job_name" align="center" width="150"></el-table-column>
          <el-table-column label="岗位类型" align="center" width="110">
            <template slot-scope="props">
              <span>{{props.row.jobType | jobType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="工作地址" prop="address" align="center" width="110"></el-table-column>
          <el-table-column label="员工薪资" align="center" width="110">
            <template slot-scope="props">
              <span>{{props.row.offermoney}}元/{{props.row.offermoney_type==1?'月':props.row.offermoney_type==2?'日':'时'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="招聘类型" prop="type" align="center" width="110"></el-table-column>
          <el-table-column label="薪资类型" align="center" width="110">
            <template slot-scope="props">
              <span>{{props.row.offermoney_type | moneyType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="招聘人数" prop="put_num" align="center" width="110"></el-table-column>
          <el-table-column label="报名人数" prop="view_dcl" align="center" width="110">
            <template slot-scope="props">
              <span>{{props.row.view_dcl}}</span>
            </template>
          </el-table-column>
          <el-table-column label="面试人数" align="center" width="110">
            <template slot-scope="props">
              <div>
                {{props.row.view_num}}
                <span class="fail-color">
                  (待处理{{
                  props.row.view_dcl}})</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="面试情况" prop="depart_name" align="center" width="200">
            <template slot-scope="props">
              <div>
                <span class="el-icon-circle-check success-color">&nbsp;{{props.row.view_yes}}</span>
                <el-divider direction="vertical"></el-divider>
                <span class="el-icon-circle-close fail-color">&nbsp;{{ props.row.view_nopass}}</span>
                <el-divider direction="vertical"></el-divider>
                <span class="el-icon-remove-outline outline-color">&nbsp;{{props.row.view_no}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="上架状态" align="center" width="110" v-if="userPosition!=1">
            <template slot-scope="props">
              <span class="status" :class="`status${props.row.status}`">{{props.row.status|recommendStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" prop="ctime" align="center" width="180"></el-table-column>
          <el-table-column label="已领取人" align="center" width="180" v-if="viewType==2">
            <template slot-scope="scope">
              <div class="text-line" @click="handleRecepit(2,scope.row)" v-if="(scope.row&&scope.row.uid==uid)||userPosition==3">
                <el-button v-for="(item,index) in scope.row.tolist" :key="index" type="text" size="small">{{item.name}}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="200">
            <template slot-scope="scope">
              <div v-if="viewType==1">
                <el-button @click="$router.push('jobDetail')" type="text" size="small">详情</el-button>
                <el-button @click="handleRecepit(1,scope.row)" type="text" v-if="scope.row.is_up==1" size="small">分配跟进人</el-button>
                <el-button @click="changeJobstatus(0,scope.row)" type="text" size="small" v-if="((scope.row&&scope.row.uid==uid)||userPosition==1)&&scope.row.is_up==1">下架</el-button>
                <el-button @click="changeJobstatus(1,scope.row)" type="text" size="small" v-if="((scope.row&&scope.row.uid==uid)||userPosition==1)&&scope.row.is_up==0">上架</el-button>
                <el-button @click="delJob(scope.row)" type="text" size="small" v-if="(scope.row&&scope.row.uid==uid)||userPosition==1">删除</el-button>
                <el-button @click="$router.push('jobDetail?id='+scope.row.id)" type="text" size="small" v-if="(scope.row&&scope.row.uid==uid)||userPosition==1">编辑</el-button>
              </div>
              <div v-if="viewType!=1">
                <el-button @click="$router.push('jobDetail')" type="text" size="small">详情</el-button>
                <el-button @click="putResume(scope.row)" v-if="scope.row.is_up==1" type="text" size="small">推荐简历</el-button>
                <el-button @click="$router.push('applyResume?view=3')" type="text" size="small">已推荐简历</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <personalModal :dialogTableVisible="dialogTableVisible" :personalList="personalList" @handleOk="handleOk" @handleClose="dialogTableVisible=false"></personalModal>
    <havePersonModal :dialogTableVisible="personVisible" @handleClose="personVisible=false" @handleOk="handleOk"></havePersonModal>
  </div>
</template>

<script>
import { getJoblist, addPut, cancelrecv, setjobtouser, getTomember, deleteJob, changestatus } from '@/api/internalInvoice'
import { moneyTypeList, rewardTypeList, payTypeList, weekList, recommendStatusList, timeStatusList, positionStatusList } from '@/base/base'
import personalModal from '../common/personalModal'
import havePersonModal from './havePersonModal'
export default {
  components: {
    personalModal,
    havePersonModal
  },
  filters: {
    moneyType (val) {
      let obj = moneyTypeList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : ''
    },
    rewardType (val) {
      let obj = rewardTypeList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : ''
    },
    recommendStatus (val) {
      let obj = recommendStatusList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : ''
    },
    jobType (val) {
      let obj = positionStatusList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '-'
    }
  },
  data () {
    return {
      moneyTypeList,
      rewardTypeList,
      recommendStatusList,
      positionStatusList,
      timeStatusList,
      dialogTableVisible: false,
      personVisible: false,
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        reward_type: 0,
        offermoney_type: 0,
        five_risks: 0,
        reserve_fund: 0,
        is_up: 0,
        job_type: 0,
        ctime: 0
      },
      type: '',
      total: 0,
      jobStatusList: [
        { label: '全部', value: 0 },
        { label: '上架', value: 1 },
        { label: '下架', value: 2 }
      ],
      statusList: [
        { label: '全部', value: 0 },
        { label: '缴纳', value: 1 },
        { label: '不缴纳', value: 2 }
      ],
      advertisesList: [
        { label: '全部', value: 0 },
        { label: '返利招聘', value: 1 },
        { label: '普通招聘', value: 2 }
      ],
      userPosition: sessionStorage.getItem('userPosition'), // 1 总经理，2经理，3 成员
      keyword: '',
      viewType: '',
      show: false,
      jobId: '',
      handleStatus: 1,
      personalList: [],
      uid: localStorage.getItem('uid')
    }
  },
  created () {
    // 初始化查询标签数据
    // viewType 1 管理内部发单
    // 2.已发布职位

    // 内部发单成员无法看到该模块
    // 内部发单1：是我自己发布的页面。可以进行编辑删除下架分配跟进人操作
    // 内部发单2：我是部门经理，领取到的内部发单可以进行分配跟进人操作。
    // 跟进人：3级成员。
    // 分配跟进人弹窗：可以进行批量分配，可以进行姓名模糊搜索
    // 管理领取人：取消分配只能由总经理与发布人可以进行操作。
    this.viewType = this.$route.query.view
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      getJoblist(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    changeInput (val) {
      this.formMember[this.type] = val
    },
    selectStatus (key, item) {
      this.formMember[key] = item.value
    },
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    // 推荐简历
    putResume (val) {
      let params = {
        job_id: val.id,
        resume_id: val.resume_id,
        uid: this.uid
      }
      addPut(params).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        if (!error.status.remind) {
          this.$message.error('')
        }
        else {
          this.$message.error(error.status.remind)
        }
      })
    },
    getPersonList () {
      let params = {
        job_id: this.jobId,
        uid: this.uid
      }
      getTomember(params).then(res => {
        this.personalList = res.data || []
        this.dialogTableVisible = true
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    // 删除
    delJob (val) {
      let params = {
        job_id: val.id,
        uid: this.uid
      }
      deleteJob(params).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    // 上下架
    changeJobstatus (status, val) {
      let params = {
        job_id: val.id,
        uid: this.uid,
        status
      }
      changestatus(params).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    // 发单操作
    handleRecepit (status, val) {
      this.handleStatus = status
      this.jobId = val.id
      if (status == 1) {
        this.getPersonList()
      }
      else {
        this.personalModal = true
      }
    },
    // 取消分配
    cancleAssigned (params) {
      cancelrecv(params).then(res => {
        this.personalModal = false
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    // 分配跟进人
    setAssigned (params) {
      (params).then(res => {
        this.dialogTableVisible = true
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleOk (val) {
      let params = {
        jobId: this.jobId,
        id: val.id,
        uid: this.uid
      }
      if (handleStatus == 1) {
        this.setAssigned(params)
      }
      else {
        this.cancleAssigned(params)
      }
    },
    handleSearch () {
      this.getList(this.formMember)
    }
  }
}
</script>