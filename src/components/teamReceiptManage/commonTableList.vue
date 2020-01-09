<style lang="scss">
  @import '@/assets/css/resume.scss';
</style>
<template>
  <div class="tables-box billingManagement">
    <div class="table-list">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline form-item-wrap">
        <el-form-item label="姓名：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
        </el-form-item>
        <el-form-item label="状态筛选：">
          <el-button :type="activeIndex==index ?'primary':''" v-for="(item,index) in statusList" :key="index" plain @click="selectStatus(item,index)" class="select-status">{{item.label}}</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%">
          <el-table-column label="姓名" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="年龄" prop="age" align="center" width="150">
          </el-table-column>
          <el-table-column label="性别" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.sex==1?'男':props.row.sex==2?'女':'男女不限'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="学历" prop="education" align="center" width="150"></el-table-column>
          <el-table-column label="住址" align="center" width="150">
            <template slot-scope="props">
              <span>{{props.row.province}}{{props.row.city}}</span>
            </template>
          </el-table-column>
          <el-table-column label="推荐时间" prop="addtime" sortable align="center" width="160"></el-table-column>
          <el-table-column label="状态" align="center" width="150">
            <template slot-scope="props">
              <span class="status" :class="`status${props.row.status}`" v-if="!props.row.interview_status">{{props.row.status==0?"待审核":props.row.status==1?'通过':'未通过'}}</span>
              <span class="status" v-if="props.row.status==1&&props.row.interview_status!=3">{{props.row.interview_status==1?'通过':'未通过'}}</span>
              <span class="status status2" v-if="props.row.status==1&&props.row.interview_status==3">未参加</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button @click="handleResume(1,scope.row)" type="text" v-if="scope.row.status==0" size="small">放弃报名</el-button>
              <el-button @click="handleResume(2,scope.row)" v-if="scope.row.status==1&&scope.row.interview_status==1" type="text" size="small">放弃面试</el-button>
              <el-button @click="routerResume(scope.row)" v-if="scope.row.entry_status==3||scope.row.status==2||scope.row.interview_status>=2" type="text" size="small">推荐岗位</el-button>
              <!-- <el-button @click="handleResume(3,scope.row)" v-if="scope.row.status==2" type="text" size="small">放弃入职</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <!-- <confirmDialog :dialogTableVisible="visible" @submit="submit" @handleClose="handleClose" :dialogObj="dialogObj" :isShow="isShow"></confirmDialog> -->
  </div>
</template>

<script>
import { getListPut, giveupView, giveupEntry, delPut, addApply } from '../../api/teamReceipt'
import { moneyTypeList, rewardTypeList, payTypeList, weekList } from '../../base/base'
import confirmDialog from '../common/confirmDialog'
export default {
  components: {
    confirmDialog
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
        apply_id: ''
      },
      total: 0,
      len: 0,
      userId: '',
      multipleSelection: [],
      form: {},
      statusList: [
        { label: '全部', value: 0 },
        { label: '待审核', value: 1 },
        { label: '已通过', value: 2 },
        { label: '未通过', value: 3 }
      ],
      activeIndex: 0,
      apply_id: '',
      dialogObj: {
        title: '放弃报名',
        subTitle: '放弃理由',
        okText: '确认放弃',
        placeholder: '请输入放弃理由'
      },
      resumeId: '',
      jobId: ''
    }
  },
  created () {
    // 初始化查询标签数据
    this.apply_id = this.$route.query.id
    this.formMember.apply_id = this.apply_id
    this.jobId = this.$route.query.jobId
    if (this.$route.query.view == 5) {
      this.formMember.type = 2
    }
    else {
      this.formMember.type = ''
    }
    this.getList(this.formMember)
  },
  watch: {
    $route (to, from) {
      if (from.query.view == 5) {
        this.formMember.type = 2
      }
      else {
        this.formMember.type = ''
      }
      this.getList(this.formMember)
    }
  },
  methods: {
    getList (params) {
      getListPut(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      })
    },
    routerResume (val) {
      let arr = JSON.parse(sessionStorage.getItem('menus'))
      arr[1] = '推荐岗位'
      sessionStorage.setItem('menus', JSON.stringify(arr))
      this.$router.push('/recommendJob?id=' + val.id)
    },
    selectStatus (item, index) {
      this.activeIndex = index
      this.formMember.type = item.value
      this.getList(this.formMember)
    },
    handleAppay () {
      let params = {
        uid: localStorage.getItem('uid'),
        job_id: this.jobId
      }
      addApply(params).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    submit (index, val) {
      if (index == 1) {
        this.dialogObj.title = '放弃报名'
        this.isShow = true
      }
      else if (index == 1) {
        this.dialogObj.title = '放弃面试'
        this.isShow = true
      }
      else {
        this.dialogObj.title = '放弃用户'
        this.isShow = false
      }
      this.visible = true
      this.resumeId = val.id
    },
    handleResume (status, val) {
      let params = {
        uid: localStorage.getItem('uid'),
        ids: val.id
      }
      if (status == 1) {
        this.handleResumeApi(params)
      }
      else if (status == 2) {
        this.handleResumeApi1(params)
      }
      else {
        this.handleResumeApi2(params)
      }
    },
    handleResumeApi1 (params) {
      giveupView(params).then(res => {
        if (res.data) {
          this.$message.success('操作成功')
          this.getList(this.formMember)
        } else {
          this.$message.error('操作失败')
        }

      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleResumeApi2 (params) {
      giveupEntry(params).then(res => {
        if (res.data) {
          this.$message.success('操作成功')
          this.getList(this.formMember)
        } else {
          this.$message.error('操作失败')
        }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleResumeApi (params) {
      delPut(params).then(res => {
        if (res.data) {
          this.getList(this.formMember)
        } else {
          this.$message.error('操作失败')
        }
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    onSubmit (val) {
      this.getList(this.formMember)
    }
  }
}
</script>
