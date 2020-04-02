<style lang="scss">
@import '@/assets/css/resume';
.tip-icon {
  color: #1890FF;
}
</style>
<template>
  <div class="tables-box billingManagement receipt-manage">
    <div class="table-list">
      <el-form
        :inline="true"
        label-width="100px"
        label-position="right"
        :model="formMember"
        class="demo-form-inline form-item-wrap"
      >
        <el-form-item label="职位名称：">
          <el-input v-model="formMember.where" class="width300" placeholder="请输入职位名称关键字"></el-input>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
        </el-form-item>
        <el-form-item label="状态筛选：" v-if="viewType!=3">
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
      <div class="member-table">
        <div class="table-query x-flex-between">
           <div>
             <el-button @click="handlResume(1,{id: id,resume_id:resume_id})">通过</el-button>
            <el-button @click="handlResume(2,{id: id,resume_id:resume_id})">未通过</el-button>
            <span class="select-text">已选择
              <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
            </span>
            <el-button type="text" @click="multipleSelection=[]">清空</el-button>
           </div>
           <div class="x-flex-between">
              <el-button  v-if="resumeViewType==2" @click="viewNotice">通知记录</el-button>
              <el-button  v-if="resumeViewType==1&&tableData&&tableData.length&&viewType==3" @click="updateNotice(1)">{{viewTime?'修改面试通知':''}}</el-button>
              <el-button  v-if="resumeViewType==1&&tableData&&tableData.length&&viewType==4" @click="updateNotice(2)">{{viewTime?'修改入职通知':''}}</el-button>
              <el-button type="primary" class="select-btn" @click="switchView(resumeViewType)">{{resumeViewType==2?'切换正常面试':'切换视频面试'}}</el-button>
              <el-tooltip placement="top" v-if="resumeViewType==2">
                <div slot="content">当前页面通过简历均为视频面试，<br/>如果线下面试点击切换正常面试即可</div>
                <i class="el-icon-info tip-icon"></i>
              </el-tooltip>
           </div>
        </div>
        <el-table
          border=""
          @sort-change="sortChange"
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column label="姓名" align="center" width="110">
            <template slot-scope="props">
              <el-button type="text">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="年龄" prop="age" align="center" width="110"></el-table-column>
          <el-table-column label="性别" align="center" width="110">
            <template slot-scope="props">
              <span>{{props.row.sex==1?'男': '女'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="学历" prop="education" align="center" width="110"></el-table-column>
          <el-table-column label="住址" prop="citys" align="center" width="110"></el-table-column>
          <el-table-column label="推荐时间" prop="desc" sortable="custom" align="center" min-width="180">
            <template slot-scope="props">
              <span
                type="text"
              >{{props.row.addtime?$moment.unix(props.row.addtime).format('YYYY-MM-DD'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="entry_num" align="center" width="180">
            <template slot-scope="props">
              <div v-if="viewType==3">
                <span
                  class="status"
                  :class="`status${props.row.status}`"
                >{{getStatus(props.row.status)}}</span>
              </div>
              <div v-if="viewType==4">
                <span
                  class="status"
                  :class="`status${props.row.interview_status}`"
                >{{getStatus(props.row.interview_status)}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="label" align="center" min-width="150" v-if="resumeViewType.view_type !=2">
            <template slot-scope="scope">
              <div v-if="viewType==4">
                <el-button
                  @click="handlResume(1,scope.row)"
                  type="text"
                  size="small"
                  v-if="!scope.row.interview_status"
                >通过</el-button>
                <span v-if="scope.row.interview_status==1">通过</span>
                <span
                  v-if="scope.row.interview_status==2"
                >{{scope.row.scope.row.interview_status|status}}</span>
                <el-button
                  @click="handlResume(2,scope.row)"
                  type="text"
                  size="small"
                  v-if="!scope.row.interview_status"
                >未通过</el-button>
              </div>
              <div v-else>
                <el-button
                  @click="handlResume(1,scope.row)"
                  type="text"
                  size="small"
                  v-if="!scope.row.status"
                >通过</el-button>
                <span v-if="scope.row.status==1">通过</span>
                <span v-if="scope.row.status==2">{{scope.row.status|status}}</span>
                <el-button
                  @click="handlResume(2,scope.row)"
                  type="text"
                  size="small"
                  v-if="!scope.row.status"
                >未通过</el-button>
              </div>
            </template>
          </el-table-column>
            <el-table-column :label="label" align="center" min-width="150" v-if="resumeViewType.view_type == 2">
            <template slot-scope="scope">
              <div v-if="viewType==4">
                <el-button
                  @click="handlResume(1,scope.row)"
                  type="text"
                  size="small"
                  v-if="scope.row.interview_status==5"
                >通过</el-button>
                <span v-if="scope.row.interview_status==1">通过</span>
                <span
                  v-if="scope.row.interview_status==2"
                >{{scope.row.scope.row.interview_status|status}}</span>
                <el-button
                  @click="handlResume(2,scope.row)"
                  type="text"
                  size="small"
                  v-if="scope.row.interview_status==5"
                >未通过</el-button>
              </div>
              <div v-else>
                <el-button
                  @click="handlResume(1,scope.row)"
                  type="text"
                  size="small"
                  v-if="scope.row.interview_status==5"
                >通过</el-button>
                <span v-if="scope.row.interview_status==1">通过</span>
                <span
                  v-if="scope.row.interview_status==2"
                >{{scope.row.scope.row.interview_status|status}}</span>
                <el-button
                  @click="handlResume(2,scope.row)"
                  type="text"
                  size="small"
                  v-if="scope.row.interview_status==5"
                >未通过</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="team-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formMember.page"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="formMember.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <modal
      :dialogTableVisible="dialogTableVisible"
      @handleOk="handleOk"
      :modalObj="modalObj"
      @handleClose="dialogTableVisible=false,id=''"
    ></modal>
    <viewTypeModal
      :dialogTableVisible="dialogViewVisible"
      @setVideoTime="setVideoTime"
      @handleClose="dialogViewVisible=false"
    ></viewTypeModal>
     <noticeRecord
      :id="jobId"
      :dialogTableVisible="dialogVisible"
      @handleClose="dialogVisible=false,id=''"
    ></noticeRecord>
     <noticeModal :dialogTableVisible="visible" @submitForm="submitForm"  @handleClose="visible=false" :id="jobId" :noticeType="noticeType"></noticeModal>
  </div>
</template>

<script>
import {
  getTeamList,
  loginOutTeam,
  addTeamUser,
  updateTeamUser
} from '../../api/team'
import {
  auditResumeList,
  auditResumeRecommend,
  entryResumeList,
  auditEntryResume,
  setVideoInterviewTime,
  editInterviewTime,
  editEntryTime
} from '../../api/receipt'
import {
  moneyTypeList,
  rewardTypeList,
  checkStatusList1
} from '../../base/base'
import modal from '../common/modal'
import viewTypeModal from '../common/viewTypeModal'
import noticeRecord from './noticeRecord'
import noticeModal from './noticeModal'
export default {
  components: {
    modal,
    viewTypeModal,
    noticeRecord,
    noticeModal
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
    },
    status(val) {
      let obj = checkStatusList1.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    }
  },
  data() {
    return {
      checkStatusList1,
      moneyTypeList,
      rewardTypeList,
      dialogTableVisible: false,
      visible: false,
      dialogViewVisible: false,
      dialogVisible: false,
      tableData: [],
      currentPage: 1,
      userType: 1,
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        type:1
      },
      total: 0,
      userId: '',
      multipleSelection: [],
      form: {},
      statusList: [
        { label: '全部', value: 0 },
        { label: '待审核', value: 1 },
        { label: '已通过', value: 2 },
        { label: '未通过', value: 3 }
      ],
      statusList1: [
        { label: '待审核', value: 0 },
        { label: '已通过', value: 1 },
        { label: '未通过', value: 2 },
        { label: '待定', value: 5 }
      ],
      activeIndex: 0,
      viewType: 1,
      jobId: '',
      id: '',
      modalObj: {
        content: '你确定要批量操作？',
        okText: '确定',
        closeText: '取消'
      },
      status: '',
      resumeViewType: 1,
      resume_id: '',
      viewTime: '',
      noticeType: ''
    }
  },
  computed: {
    label() {
      return this.viewType == 3 ? '审核简历' : '审核面试'
    },
    urlApi() {
      return this.resumeViewType == 1 ? '' : ''
    }
  },
  created() {
    // 初始化查询标签数据
    this.viewType = this.$route.query.view
    this.resumeViewType = localStorage.getItem('rendaViewType') || 1
    this.formMember.type = this.resumeViewType 
    if (this.viewType == 3) {
      let arr = ['人才简历', '审核列表']
      this.$store.commit("setMenus", arr);
      this.formMember.job_id = this.$route.query.id
      sessionStorage.setItem('menus', JSON.stringify(arr))
    }
    if (this.viewType == 4) {
      let arr = ['人才简历', '审核结果']
      this.$store.commit("setMenus", arr);
      this.formMember.jobId = this.$route.query.id
    }
    if (this.$route.query.id) {
      this.jobId = this.$route.query.id
      this.getList(this.formMember)
    }
    this.viewTime = sessionStorage.getItem('viewTime')
    console.log(this.viewTime)
  },
  methods: {
    updateNotice(index) {
      this.noticeType = index == 1 ? '面试':'入职'
      this.visible = true
    },
    // 面试时间
    submitForm(val) {
      let params = Object.assign(val, {
        job_id: this.jobId,
        uid: this.formMember.uid
      })
      if (this.viewType==3) {
        editInterviewTime(params)
        .then(res => {
          if (res.data) {
            this.getList(this.formMember)
            this.visible = false
            this.noticeType = ''
          } else {
            this.$message.error('设置失败')
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
      } else {
        editEntryTime(params)
        .then(res => {
          if (res.data) {
            this.getList(this.formMember)
            this.visible = false
            this.noticeType = ''
          } else {
            this.$message.error('设置失败')
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
      }
    },
    viewNotice() {
      this.dialogVisible = true
    },
    switchView(index) {
      this.tableData = []
      this.resumeViewType = index == 1 ? 2 : 1
      this.formMember.type = this.resumeViewType
      this.getList(this.formMember)
      localStorage.setItem('rendaViewType', index)
    },
    getList(params) {
      if (this.viewType == 3) {
        auditResumeList(params)
          .then(res => {
            this.tableData = res.data.data
            this.total = res.data.count
          })
          .catch(error => {
            if (error) {
              this.$message.warning(error.status.remind)
            }
          })
      } else {
        entryResumeList(params)
          .then(res => {
            this.tableData = res.data.data
            this.total = res.data.count
          })
          .catch(error => {
            if (error) {
              this.$message.warning(error.status.remind)
            }
          })
      }
    },
    getStatus(val) {
      let obj = this.statusList1.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    },
    sortChange(column) {
      if (column.order == 'ascending') {
        this.formMember[column.prop] = 'asc'
      } else {
        this.formMember[column.prop] = 'desc'
      }
      this.getList(this.formMember)
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
    handlResume(status, row) {
      if (!row.id) {
        return this.$message.warning('请选择简历')
      }
      this.status = status
      this.id = row.id
      this.resume_id = row.resume_id
      if (row.id && this.multipleSelection.length) {
        if ( this.multipleSelection.length>8&&this.resumeViewType==2) {
          return this.$message.warning('视频面试简历最多8份')
        }
        if (this.resumeViewType==1) {
          this.dialogTableVisible = true
          return false
        } else {
          this.dialogViewVisible= true
        }
      }
      if (this.resumeViewType==1) {
        this.checkResume()
      } else {
        this.dialogViewVisible= true
      }
    },
    handleOk() {
      this.checkResume()
    },
    setVideoTime(data) {
      console.log(data)
      let params = Object.assign(data, {resume_list: this.resume_id, job_id: this.jobId} )
      setVideoInterviewTime(params).then(res => {
        if(res.data) {
          this.dialogViewVisible = false
          this.checkResume()
        } else {
          this.$message.error('操作失败')
        }
      })
    },
    checkResume() {
      let params = {
        uid: localStorage.getItem('uid'),
        id: this.id,
        status: this.status,
        type: this.resumeViewType
      }
      if (this.viewType == 3) {
        auditResumeRecommend(params)
          .then(res => {
            this.$message.success('操作成功')
            this.dialogTableVisible = false
            this.getList(this.formMember)
          })
          .catch(error => {
            if (error) {
              this.$message.warning(error.status.remind)
            }
          })
      } else {
        auditEntryResume(params)
          .then(res => {
            this.$message.success('操作成功')
            this.getList(this.formMember)
          })
          .catch(error => {
            if (error) {
              this.$message.warning(error.status.remind)
            }
          })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      let arr = val.map(item => {
        return item.id
      })
      let arr1 = val.map(item => {
        return item.resume_id
      })
      this.id = arr.join(',')
      this.resume_id = arr1.join(',')
    },
    onSubmit() {
      this.getList(this.formMember)
    }
  }
}
</script>

