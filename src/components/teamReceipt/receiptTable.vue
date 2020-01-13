<style lang="scss">
@import '@/assets/css/resume';
</style>
<template>
  <div class="tables-box billingManagement receipt-manage">
    <div class="table-list">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline">
        <el-form-item label="职位名称：">
          <el-input v-model="formMember.job_name" class="width300" placeholder="请输入职位名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model="formMember.com_name" class="width300" placeholder="请输入企业名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="返利模式：">
          <el-select v-model="formMember.reward_type" class="width300" placeholder="请选择返利模式">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in rewardTypeList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="申请状态：">
          <el-select v-model="formMember.status" class="width300" placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in entryStatusList" :key="index"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="薪资模式：">
          <el-select v-model="formMember.money_type" class="width300" placeholder="请选择薪资模式">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in moneyTypeList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="reset" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%">
          <el-table-column label="职位名称" prop="job_name" align="center" width="150"></el-table-column>
          <el-table-column label="企业名称" align="center" prop="com_name" width="150"></el-table-column>
          <el-table-column label="需求人数" prop="required_number" align="center" width="100"></el-table-column>
          <el-table-column label="岗位薪资" prop="money" align="center" width="120">
            <template slot-scope="scope">
              <div>
                {{scope.row.money}}元/{{scope.row.money==1?'月':scope.row.money?'日':'时'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="返利模式" align="center" width="100">
            <template slot-scope="scope">
              <div>
                {{scope.row.reward_type | rewardType}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="接单日期" prop="addtime" sortable="custom" align="center" width="180"></el-table-column>
          <el-table-column label="申请人" align="center" prop="dsh" width="180" v-if="userPosition==1">
            <template slot-scope="scope">
              <div class="text-line" v-if="scope.row.dsh">
                <span>{{scope.row.dsh}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="已分配接单" align="center" width="180" v-if="userPosition==1">
            <template slot-scope="scope">
              <div @click="handleRecepit(3,scope.row)">
                <el-button type="text" class="text-line width150" size="small">{{scope.row.ylq}}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="申请状态" align="center" width="110" v-if="userPosition==2">
            <template slot-scope="scope">
              <span v-if="scope.row.apportion_status&&scope.row.apportion_status!=3&&!scope.row.apportion_action" class="status" :class="`status${scope.row.apportion_status}`">{{scope.row.apportion_status | applyStatus}}</span>
              <span class="status status2" v-if="!scope.row.apportion_status">未申请</span>
              <span class="status status2" v-if="scope.row.apportion_status==3&&scope.row.apportion_action">已取消申请</span>
              <span class="status status2" v-if="scope.row.apportion_status==1&&!scope.row.apportion_status">已申请</span>
              <span class="status status4" v-if="scope.row.apportion_action==1&&scope.row.apportion_status==1">分配接单</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="100" v-if="userPosition==1">
            <template slot-scope="scope">
              <span class="status" :class="`status${scope.row.status}`" v-if="scope.row.dsh&&!scope.row.ylq">待审核</span>
              <span class="status status2" v-if="!scope.row.dsh&&!scope.row.ylq" :class="`active-status${scope.row.status}`">未分配</span>
              <span class="status status3" v-if="!scope.row.dsh&&scope.row.ylq" :class="`active-status${scope.row.status}`">已分配</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="160">
            <template slot-scope="scope">
              <div v-if="userPosition==2">
                <el-button @click="handleApply(scope.row)" type="text" v-if="!scope.row.apportion_status" size="small">申请推荐</el-button>
                <el-button @click="handleRecepit(2,scope.row)" type="text" size="small" v-if="scope.row.apportion_status==1&&scope.row.apportion_action==1">分配组员</el-button>
                <el-button @click="handleRecepitManagers(0,scope.row)" type="text" size="small" v-if="scope.row.apportion_status==2">重新申请</el-button>
                <el-button @click="handleRecepitManagers(3,scope.row)" type="text" size="small" v-if="scope.row.apportion_status==1&&!scope.row.apportion_action">取消申请</el-button>
                <el-button @click="viewJob(scope.row)" type="text" size="small">查看职位</el-button>
                <!-- <el-button @click="dialogVisible=true" type="text" size="small">删除职位</el-button> -->
              </div>
              <div v-if="userPosition==1">
                <el-button @click="handleRecepit(1,scope.row)" v-if="!scope.row.dsh" type="text" size="small">分配接单</el-button>
                <el-button @click="viewJob(scope.row)" type="text" v-if="!scope.row.dsh" size="small">查看职位</el-button>
                <el-button @click="handleEdit(1,scope.row)" type="text" v-if="scope.row.dsh" size="small">同意</el-button>
                <el-button @click="handleEdit(2,scope.row)" type="text" v-if="scope.row.dsh" size="small">拒绝</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <viewJob :dialogTableVisible="dialogJobVisible" @handleClose="dialogJobVisible=false" :id="jobId"></viewJob>
    <personalModal :dialogTableVisible="dialogTableVisible" :personalList="personalList" @handleOk="handleOk" :title="userPosition==2?'分配组员':userPosition==1?'分配接单':''" @handleClose="dialogTableVisible=false"></personalModal>
    <havePersonModal :dialogTableVisible="personVisible" :hasPersonList="hasPersonList" @handleClose="personVisible=false" @handleOk="handleOkPerson"></havePersonModal>
    <modal :dialogTableVisible="dialogVisible" @handleOk="handleOk" :modalObj="modalObj" @handleClose="dialogVisible=false"></modal>
  </div>
</template>

<script>
import { getcurapply, apportionJob, auditRecv, getpartMember, curapportionList, addApportion, changeApportion, getTeamManage } from '@/api/teamReceipt'
import { moneyTypeList, rewardTypeList, payTypeList, entryStatusList, applyStatusList1 } from '@/base/base'
import viewJob from '../common/viewJob'
import modal from '../common/modal'
import personalModal from '../common/personalModal'
import havePersonModal from '../internalInvoice/havePersonModal'
export default {
  components: {
    viewJob,
    personalModal,
    havePersonModal,
    modal
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
    applyStatus (val) {
      let obj = applyStatusList1.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    }
  },
  data () {
    return {
      applyStatusList1,
      moneyTypeList,
      rewardTypeList,
      entryStatusList,
      dialogTableVisible: false,
      dialogJobVisible: false,
      personVisible: false,
      dialogVisible: false,
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      statusList: [
        { label: '全部', value: 0 },
        { label: '等待入职', value: 1 },
        { label: '等待入职名单', value: 2 },
        { label: '完成入职名单', value: 3 }
      ],
      userPosition: sessionStorage.getItem('userPosition'), // 1 总经理，2经理，3 成员
      handleStatus: 0,
      modalObj: {
        content: '你确定要删除职位吗？',
        okText: '确定',
        closeText: '取消'
      },
      personalList: [],
      hasPersonList: [],
      uids: '',
      jobId: ''
    }
  },
  created () {
    // 初始化查询标签数据
    this.getList(this.formMember)
  },
  methods: {
    getList (params) {
      getcurapply(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      })
    },
    viewJob (val) {
      this.jobId = val.job_id
      this.dialogJobVisible = true
    },
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    // 分配操作
    handleRecepit (status, val) {
      this.handleStatus = status
      this.jobId = val.job_id
      if (status == 1) {
        if (this.userPosition == 2) {
          this.getPersonList()
        }
        else {
          this.getManagerList()
        }
      }
      else {
        this.getCurapportionList()
      }
    },
    // 团长获取所有列表
    getManagerList () {
      let params = {
        job_id: this.jobId,
        uid: localStorage.getItem('uid')
      }
      getTeamManage(params).then(res => {
        console.log(res.data)
        this.personalList = this.getArray1(res.data)
        console.log(this.personalList)
        this.dialogTableVisible = true
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    // 经理操作
    handleRecepitManagers (status, val) {
      let params = {
        job_id: val.job_id,
        uid: localStorage.getItem('uid')
      }
      changeApportion(params).then(res => {
        this.hasPersonList = res.data || []
        this.personVisible = true
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    getPersonList () {
      let params = {
        job_id: this.jobId,
        uid: localStorage.getItem('uid')
      }
      getpartMember(params).then(res => {
        this.personalList = this.getArray(res.data)
        this.dialogTableVisible = true
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    getArray (arr) {
      let arr1 = []
      arr.forEach(item => {
        let obj = {
          user_name: item.user_name,
          uid: item.uid,
          status: item.isget
        }
        arr1.push(obj)
      })
      return arr1
    },
    getArray1 (arr) {
      let arr1 = []
      arr.forEach(item => {
        let obj = {
          user_name: item.user_name,
          uid: item.uid,
          status: item.isset ? item.isset : 0
        }
        arr1.push(obj)
      })
      return arr1
    },
    getCurapportionList () {
      let params = {
        job_id: this.jobId,
        uid: localStorage.getItem('uid')
      }
      curapportionList(params).then(res => {
        this.hasPersonList = res.data || []
        this.personVisible = true
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleEdit (status, val) {
      let params = {
        uid: localStorage.getItem('uid'),
        status: status,
        job_id: val.job_id,
        uids: val.dsh_uid
      }
      auditRecv(params).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleApply (val) {
      let params = {
        uid: localStorage.getItem('uid'),
        job_id: val.job_id,
      }
      addApportion(params).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleOk (val) {
      let arr = val.map(val => {
        return val.uid
      })
      this.dialogTableVisible = false
      let params = {
        uid: localStorage.getItem('uid'),
        job_id: this.jobId,
        uids: arr.join(',')
      }
      apportionJob(params).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    // 取消分配
    handleOkPerson (val) {
      let params = {
        job_id: this.jobId,
        dsh_uid: val
      }
      this.personVisible = false
      this.handleEdit(3, params)
    },
    submitMember (val) {
      updateTeamUser(val).then(res => {
        this.dialogTableVisible = false
        this.getList(this.params)
      })
    },
    onSubmit () {
      this.getList(this.formMember)
    },
    submitForm (val) {
      this.visible = false
      addTeamUser(val).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    reset () {
      this.formMember = {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      }
      this.getList(this.formMember)
    },
  }
}
</script>
