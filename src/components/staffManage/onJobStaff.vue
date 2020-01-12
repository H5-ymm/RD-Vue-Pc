<template>
  <div class="tables-box billingManagement">
    <div class="table-list">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入姓名关键字"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称：">
          <el-input v-model="formMember.post" class="width300" placeholder="请输入岗位名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="年龄：">
          <el-input v-model="formMember.age" class="width300" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="学历：">
          <el-select v-model="formMember.edu" class="width300" placeholder="请选择学历">
            <el-option :label="item" :value="item" v-for="item in edu_type" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select v-model="formMember.sex" value-key="label" class="width300" placeholder="请选择性别">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in sexList" :key="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间：">
          <el-date-picker class="width300" @change="changeDate" v-model="timeList" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="formMember.mobile" class="width300" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="reset" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <div class="table-query x-flex-start">
          <div v-if="viewType==1">
            <el-button @click="staffVisible=true">添加员工</el-button>
            <el-button @click="handleUser(1,this.staffId)">离职</el-button>
            <el-button @click="leadResumeVisible=true">导入简历</el-button>
            <el-button @click="exportResume">导出简历</el-button>
          </div>
          <div v-if="viewType==2">
            <el-button @click="handleUser(2,this.staffId)">删除</el-button>
          </div>
          <span class="select-text">
            已选择
            <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
          </span>
          <el-button type="text" @click="multipleSelection=[],staffId=''">清空</el-button>
        </div>
        <el-table border :data="tableData" @sort-change="sortChange" ref="multipleTable" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column label="姓名" align="center" width="110">
            <template slot-scope="props">
              <el-button type="text" @click="staffId=props.row.id,viewStaffVisible=true">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" prop="mobile" align="center" width="120"></el-table-column>
          <el-table-column label="岗位名称" prop="post" align="center" width="110"></el-table-column>
          <el-table-column label="入职时间" sortable="custom" align="center" width="110">
            <template slot-scope="props">
              <span>{{props.row.addtime? $moment.unix(props.row.addtime).format('YYYY-MM-DD'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="年龄" prop="age" align="center" width="110"></el-table-column>
          <el-table-column label="性别" prop="age" align="center" width="110">
            <template slot-scope="props">
              <span>{{props.row.sex==1?'男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="学历" prop="education" align="center" width="110"></el-table-column>
          <el-table-column label="住址" align="center" width="190">
            <template slot-scope="props">
              <span class="text-line">{{props.row.provindeName}}{{props.row.cityName}}{{props.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="190">
            <template slot-scope="scope">
              <div v-if="viewType==1">
                <el-button @click="handleUser(0,scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="handleUser(1,scope.row)" type="text" size="small">离职</el-button>
              </div>
              <div v-if="viewType==2">
                <el-button @click="handleUser(2,scope.row)" type="text" size="small">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <modal :dialogTableVisible="dialogTableVisible" @handleOk="handleOk" :modalObj="modalObj" :isShow="isShow" @handleClose="dialogTableVisible=false"></modal>
    <leadResumeModal :dialogTableVisible="leadResumeVisible" @download="download" @exportResume="exportResumeData" @handleClose="leadResumeVisible=false"></leadResumeModal>
    <staffModal :dialogTableVisible="staffVisible" @handleClose="staffVisible=false" @submitForm="submitForm" :staffId="staffId"></staffModal>
    <viewStaff :staffId="staffId" :dialogTableVisible="viewStaffVisible" @handleClose="viewStaffVisible=false,staffId=''"></viewStaff>
  </div>
</template>

<script>
import {  getStaffResumeList, quitCompanyResumeList,
  addCompanyResume, delCompanyResumeInfo, editCompanyResumeInfo,
  exportCompanyResume, doQuitCompanyResume, importCompanyResume, uploadsCompanyList} from '@/api/staff'
import { getConstant } from '@/api/dictionary'
import modal from '../common/modal'
import leadResumeModal from '../resumeManage/leadResumeModal'
import staffModal from './staffModal'
import viewStaff from './viewStaff'
export default {
  components: {
    modal,
    leadResumeModal,
    staffModal,
    viewStaff
  },
  data () {
    return {
      dialogTableVisible: false,
      leadResumeVisible: false,
      staffVisible: false,
      viewStaffVisible: false,
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0,
      edu_type: [],
      modalObj: {
        content: '你确定该操作员工离职吗？',
        okText: '确定',
        closeText: '取消'
      },
      isShow: true,
      overType: 0,
      multipleSelection: [],
      viewType: 1,
      sexList: [
        { label: '全部', value: 0 },
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
      staffId: '',
      timeList: []
    }
  },
  created () {
    // 初始化查询标签数据
    this.viewType = this.$route.query.view
    this.getList(this.formMember)
    console.log(this.viewType)
    let params = 'edu_type'
    this.getData(params)
  },
  watch: {
    $route (to, from) {
      console.log(to)
      this.viewType = to.query.view
      this.getList(this.formMember)
    }
  },
  mounted () {

  },
  methods: {
    getData (filed) {
      getConstant({ filed }).then(res => {
        const { edu_type } = res.data
        this.edu_type = edu_type
      })
    },
    getList (params) {
      if (this.viewType == 1) {
        getStaffResumeList(params).then(res => {
          const { data } = res
          this.tableData = data.data
          console.log(this.tableData)
          this.total = data.count
        })
      } else {
        quitCompanyResumeList(params).then(res => {
          const { data } = res
          this.tableData = data.data
          this.total = data.count
        })
      }
    },
    changeDate (val) {
      this.formMember.beginTime = val ? val[0] : ''
      this.formMember.endTime = val ? val[1] : ''
    },
    handleSelectionChange (val) {
      let arr = val.map(item => {
        return item.id
      })
      this.staffId = arr.join(',')
      console.log(this.staffId)
    },
    download () {
      uploadsCompanyList()
    },
    exportResumeData (file) {
      console.log(file)

      importCompanyResume(file).then(res => {
        this.leadResumeVisible = false
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    exportResume () {
      if (!this.staffId) {
        return this.$message.warning('请选择简历')
      }
      else {
        let params = {
          uid: localStorage.getItem('uid'),
          listId: this.staffId
        }
        console.log(params)
        exportCompanyResume(params)
      }
    },
    sortChange (column) {
      if (column.order == 'ascending') {
        this.formMember.desc = 'asc'
      }
      else {
        this.formMember.desc = 'desc'
      }
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
    handleUser (index, val) {
      this.overType = index
      if (index == 1) {
        this.dialogTableVisible = true
        this.modalObj.content = '你确定该操作员工离职吗？'
      }
      else if (index == 2) {
        this.dialogTableVisible = true
        this.modalObj.content = '您确定要删除选中的员工吗？</br>一经操作不可恢复！'
      }
      else {
        this.staffVisible = true
      }
      this.staffId = val.id
    },
    submitForm (params) {
      this.staffVisible = false
      if (this.staffId) {
        this.updateStaff(params)
      }
      else {
        this.addStaff(params)
      }
    },
    addStaff (params) {
      addCompanyResume(params).then(res => {
        this.getList(this.formMember)
        this.$message.success('保存成功')
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    updateStaff (params) {
      editCompanyResumeInfo(params).then(res => {
        this.getList(this.formMember)
        this.$message.success('保存成功')
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleOk () {
      this.dialogTableVisible = false
      let params = {
        uid: localStorage.getItem('uid'),
        id: this.staffId
      }
      if (this.overType == 1) {
        this.handleQuit(params)
      }
      else {
        this.handelDel(params)
      }
    },
    // 离职
    handleQuit (params) {
      doQuitCompanyResume(params).then(res => {
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    // 结束面试
    handelDel (params) {
      delCompanyResumeInfo(params).then(res => {
        this.$message.success('操作成功')
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    onSubmit () {
      this.getList(this.formMember)
    },
    reset () {
      this.formMember = {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      }
      this.timeList = []
      this.getList(this.formMember)
    }
  }
}
</script>

<style lang="scss">
 @import '@/assets/css/resume';
</style>
