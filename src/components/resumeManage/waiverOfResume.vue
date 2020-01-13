

<style lang="scss">
@import '@/assets/css/resume';
</style>
<template>
  <div class="tables-box billingManagement">
    <div class="table-list add-resum">
      <el-form :inline="true" label-width="100px" label-position="right" :model="formMember" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="formMember.mobile" class="width300" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="意向岗位：">
          <el-input v-model="formMember.job" class="width300" placeholder="请输入意向岗位关键字"></el-input>
        </el-form-item>
        <el-form-item label="录入人：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入录入人关键字"></el-input>
        </el-form-item>
        <el-form-item label="意向地区：">
          <div class="width300">
            <districtSelet @change="change" :placeholder="'请选择意向地区'" :disabled="true"></districtSelet>
          </div>
        </el-form-item>
        <el-form-item label="跟进人：">
          <el-input v-model="formMember.name" class="width300" placeholder="请输入跟进人关键字"></el-input>
        </el-form-item>
        <el-form-item label="意向工资：">
          <el-select v-model="formMember.industry" class="width300" placeholder="请选择意向工资">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in moneyTypeList" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进时间：">
          <el-date-picker class="width300" v-model="timeList" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changeDate" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="select-btn">查询</el-button>
          <el-button type="primary" @click="onReset" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table resume-table">
        <div class="table-query">
          <el-button @click="exportResume" type="primary">导出简历</el-button>
        </div>
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%" @sort-change="sortChange">
          <el-table-column label="序号" align="center" prop="id" width="50"></el-table-column>
          <el-table-column label="姓名" align="center" width="100">
            <template slot-scope="props">
              <el-button class="text-line" type="text" @click="viewResume(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
          <el-table-column label="意向岗位" prop="desired_position" align="center" width="150"></el-table-column>
          <el-table-column label="意向工资" prop="models" align="center" width="150"></el-table-column>
          <el-table-column label="意向城市" align="center" width="150">
            <template slot-scope="props">
              <span type="text">{{props.row.citys}}</span>
            </template>
          </el-table-column>
          <el-table-column label="放弃时间" prop="timeDesc" sortable="custom" align="center" width="150" v-if="viewType==1">
            <template slot-scope="props">
              <span type="text">{{props.row.givetime?$moment.unix(props.row.givetime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="viewType==1?'放弃原因':'删除原因'" align="center" width="150">
            <template slot-scope="props">
              <el-button type="text" class="text-line" @click="viewReason(props.row)">{{props.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="跟进记录" align="center" width="100">
            <template slot-scope="props">
              <el-button class="text-line" v-if="props.row.trackList" type="text" @click="viewRecord(props.row)">{{props.row.trackList.title}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="跟进时间" align="center" width="150">
            <template slot-scope="props">
              <span type="text" v-if="props.row.trackList">{{props.row.trackList.addtime?$moment.unix(props.row.trackList.addtime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="录入人" prop="input_username" align="center" width="100"></el-table-column>
          <el-table-column label="跟进人" prop="track_name" align="center" width="100"></el-table-column>
          <el-table-column label="操作" align="center" min-width="200">
            <template slot-scope="props">
              <div v-if="viewType==1">
                <el-button @click="handleResume(1,props.row)" type="text" size="small">领取</el-button>
                <el-button @click="handleResume(2,props.row)" type="text" size="small">删除</el-button>
              </div>
              <div v-else>
                <el-button @click="handleResume(3,props.row)" type="text" size="small">还原</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination class="team-pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 30, 50, 100]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <confirmDialog :dialogTableVisible="visible" @submit="submit" @handleClose="handleClose" :reason="reason" :dialogObj="dialogObj" isShow="true"></confirmDialog>
    <followUpRecord :dialogTableVisible="followUpRecordVisible" @submitRecord="submitRecord" @handleClose="followUpRecordVisible=false,resumeId=''" :id="resumeId"></followUpRecord>
    <modal :dialogTableVisible="dialogTableVisible" @handleOk="handleOk" :modalObj="modalObj" :isShow="isShow" @handleClose="dialogTableVisible=false"></modal>
  </div>
</template>
<script>
import { giveupResumeList, exportGiveUpResume, delResumeList, exportDelResume, delResum, receiveResume, reductionDelResume, delResume } from '@/api/resume'
import { moneyTypeList, rewardTypeList, followStatusList } from '../../base/base'
import followUpRecord from './followUpRecord'
import confirmDialog from '../common/confirmDialog'
import modal from '../common/modal'
import districtSelet from '../districtSelet'
export default {
  components: {
    districtSelet,
    confirmDialog,
    followUpRecord,
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
  },
  data () {
    return {
      moneyTypeList,
      rewardTypeList,
      followStatusList,
      visible: false,
      dialogTableVisible: false,
      followUpRecordVisible: false,
      dialogObj: {
        title: '删除',
        subTitle: '删除简历理由',
        okText: '关闭',
        placeholder: '请输入删除简历理由'
      },
      modalObj: {
        content: '简历领取成功，</br> 已添加到新增简历，现在就去推荐新的岗位吗？',
        okText: '推荐岗位',
        closeText: '继续浏览'
      },
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
      resumeId: '',
      trackList: [],
      timeList: [],
      isShow: true,
      reason: '',
      viewType: 1
    }
  },
  mounted () {
    // 初始化查询标签数据
    this.viewType = this.$route.query.view
    console.log(this.viewType)
    this.getList(this.formMember)
  },
  watch: {
    $route (to, from) {
      console.log(to)
      if (to) {
        this.viewType = to.query.view
        this.getList(this.formMember)
      }
    }
  },
  methods: {
    getList (params) {
      if (this.viewType == 1) {
        giveupResumeList(params).then(res => {
          const { data } = res
          this.tableData = data.data
          this.total = data.count
        }).catch(error => {
          this.$message.waring(error.status.remind)
        })
      }
      else {
        console.log(this.viewType)
        delResumeList(params).then(res => {
          const { data } = res
          this.tableData = data.data
          this.total = data.count
        }).catch(error => {
          this.$message.waring(error.status.remind)
        })
      }
    },
    changeDate (val) {
      this.formMember.beginTime = val ? val[0] : ''
      this.formMember.endTime = val ? val[1] : ''
    },
    exportResume () {
      let uid = localStorage.getItem('uid')
      if (this.viewType == 1) {
        exportGiveUpResume(uid)
      }
      else {
        exportDelResume(uid)
      }
    },
    sortChange (column) {
      if (column.order == 'ascending') {
        this.formMember[column.prop] = 'asc'
      }
      else {
        this.formMember[column.prop] = 'desc'
      }
      this.getList(this.formMember)
    },
    change (val) {
      this.formMember.provinceid = val[0]
      this.formMember.cityid = val[1]
    },
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    viewReason (val) {
      this.visible = true
      this.reason = val.name
    },
    viewRecord (val) {
      this.followUpRecordVisible = true
      // this.trackList = val.trackList
      this.resumeId = val.resume_id
    },
    submitRecord (val) {
      this.followUpRecordVisible = false
    },
    handleOk () {
      let params = {
        uid: localStorage.getItem('uid'),
        resumeId: this.resumeId
      }
      if (this.viewType == 1) {
        this.dialogTableVisible = false
        this.getList(this.formMember)
        // receiveResume(params).then(res => {
        //   this.resumeId = ''
        //   this.getList(this.formMember)
        // }).catch(error => {
        //   this.$message.waring(error.status.remind)
        // })
      }
      else {
        reductionDelResume(params).then(res => {
          this.resumeId = ''
          this.dialogTableVisible = false
          this.getList(this.formMember)
        }).catch(error => {
          this.$message.waring(error.status.remind)
        })
      }
    },
    handleResume (index, val) {
      if (index == 1) {
        let params = {
          uid: localStorage.getItem('uid'),
          resumeId: val.id
        }
        receiveResume(params).then(res => {
          if (res.data) {
            this.isShow = true
            this.dialogTableVisible = true
          }
          else {
            this.$message.waring('领取失败')
          }
          // this.getList(this.formMember)
        }).catch(error => {
          this.$message.waring(error.status.remind)
        })
      }
      else if (index == 3) {
        this.modalObj = {
          content: ' 你确定要还原简历到（放弃简历列表）吗？',
          okText: '确认',
          closeText: '取消'
        }
        this.isShow = false
        this.dialogTableVisible = true
      }
      else {
        this.isShow = false
        this.visible = true
      }
      this.resumeId = val.id
    },
    handleClose () {
      this.visible = false
      this.resumeId = ''
      this.reason = ''
    },
    submit (val) {
      this.visible = false
      let params = {
        uid: localStorage.getItem('uid'),
        resumeId: this.resumeId,
        reason: val.reason
      }
      delResume(params).then(res => {
        this.resumeId = ''
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.waring(error.status.remind)
      })
    },
    onSubmit (value) {
      let params = Object.assign(this.formMember, value)
      this.getList(params)
    },
    onReset () {
      this.formMember = {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      }
      this.getList(this.formMember)
    }
  }
}
</script>
