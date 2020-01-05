<style lang="scss">
  @import '@/assets/css/resume.scss';
  .internal-invoice {
    .error {
      color: #FE2A00;
      font-size: 12px;
      margin: 20px 0 -15px;
      display: block;
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
</style>
<template>
  <div class="tables-box billingManagement receipt-manage internal-invoice">
    <div class="table-list">
      <el-form
        :inline="true"
        label-width="96px"
        label-position="right"
        :model="formMember"
        class="internal-invoice-form"
      >
        <el-form-item label="岗位名称：">
          <el-input v-model="formMember.job_name" class="width300" placeholder="请输入岗位名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="岗位类型：">
          <el-select v-model="formMember.job_type" class="width300" placeholder="选择相应的岗位类型">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in positionStatusList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model="formMember.com_name" class="width300" placeholder="请输入企业名称关键字"></el-input>
        </el-form-item>
        <el-form-item label="薪资类型：">
          <el-select v-model="formMember.offermoney_type" class="width300" placeholder="请选择薪资模式">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in moneyTypeList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="招聘类型：">
          <el-select v-model="formMember.job_type" class="width300" placeholder="请选择返利模式">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in advertisesList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发单状态：">
          <el-select v-model="formMember.is_up" class="width300" placeholder="请选择">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in receiptStatusList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间：">
          <el-date-picker
            class="width300"
            v-model="timeList"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期区间"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" class="select-btn">查询</el-button>
          <el-button type="primary" @click="reset" class="select-btn">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="member-table">
        <div class="table-query">
          <el-button>导出简历</el-button>
          <span class="select-text">
            已选择
            <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
          </span>
          <el-button type="text" @click="multipleSelection=[]">清空</el-button>
          <p class="error el-icon-warning">更改发单状态之后可以操作其他发单状态下的简历</p>
        </div>
        <el-table border :data="tableData" ref="multipleTable" style="width: 100%">
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column label="发单状态" align="center" min-width="160">
            <template slot-scope="props">
              <el-select v-model="formMember.status" class="width150" placeholder="请选择">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item,index) in receiptStatusList"
                  :key="index"
                  v-show="index"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" prop="company_name" align="center" width="150"> </el-table-column>
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
          <el-table-column label="招聘人数" prop="number" align="center" width="110"></el-table-column>
          <el-table-column label="报名人数" prop="view_dcl" align="center" width="110">
          </el-table-column>
          <el-table-column label="面试人数" align="center" min-width="110">
            <template slot-scope="props">
              <div>
                {{
                props.row.view_num}}
                <span class="fail-color">
                 (待处理{{
                  props.row.view_dcl}})
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="面试情况" prop="depart_name" align="center" min-width="150">
            <template slot-scope="props">
              <div>
                <span class="el-icon-circle-check success-color">
                  {{
                  props.row.view_yes}}
                </span>
                <el-divider direction="vertical"></el-divider>
                <span class="el-icon-circle-close fail-color">
                  {{
                  props.row.view_nopass}}
                </span>
                <el-divider direction="vertical"></el-divider>
                <span class="el-icon-remove-outline outline-color">
                  {{
                  props.row.view_no}}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="上架状态" align="center" width="110" v-if="userPosition!=1">
            <template slot-scope="props">
              <span
                class="status"
                :class="`status${props.row.is_up}`"
              >{{props.row.is_up==1?'招聘中':'已下架'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" prop="ctime" align="center" width="170"></el-table-column>
          <el-table-column label="操作" align="center" min-width="150">
            <template slot-scope="scope">
              <el-button
                @click="$router.push({path:'resumeList',query:{jobId:scope.row.id}})"
                type="text"
                size="small"
              >简历列表</el-button>
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
    <modal
      :dialogTableVisible="dialogTableVisible"
      @handleOk="handleOk"
      isShow="true"
      :modalObj="modalObj"
      @handleClose="dialogTableVisible=false"
    ></modal>
  </div>
</template>

<script>
import { getJoblist, addPut } from '@/api/internalInvoice'
import { moneyTypeList, rewardTypeList, payTypeList, weekList, recommendStatusList, positionStatusList } from '@/base/base'
import modal from '../common/modal'
export default {
  components: {
    modal
  },
  filters: {
    moneyType (val) {
      let obj = moneyTypeList.find(item => {
        return val == item.value
      })
      return  obj?obj.label:'--'
    },
    rewardType (val) {
      let obj = rewardTypeList.find(item => {
        return val == item.value
      })
      return  obj?obj.label:'--'
    },
    recommendStatus () {
      let obj = recommendStatusList.find(item => {
        return val == item.value
      })
      return obj?obj.label:'--'
    },
    jobType(val){
      let obj = positionStatusList.find(item => {
        return val == item.value
      })
      return obj? obj.label: '-'    
    }
  },
  data () {
    return {
      moneyTypeList,
      rewardTypeList,
      recommendStatusList,
      positionStatusList,
      dialogTableVisible: false,
      visible: true,
      tableData: [],
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
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
      modalObj: {
        content: '申请成功！</br>已申请的接单请到申请接单查看进度',
        okText: '查看申请',
        closeText: '继续浏览'
      },
      userPosition: sessionStorage.getItem('userPosition'), // 1 总经理，2经理，3 成员
      show: false,
      keyword: '',
      multipleSelection: [],
      receiptStatusList: [
        { label: '全部', value: 0 },
        { label: '审核简历', value: 1 },
        { label: '面试结果', value: 2 },
        { label: '面试结果', value: 3 }
      ],
      timeList: []
    }
  },
  created () {
    // 初始化查询标签数据
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
    changeDate (val) {
      this.formMember.beginTime = val[0]
      this.formMember.endTime = val[1]
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
    handleRecommend (val) {
      let params = {
        jobId: val.jobId,
        id: val.id,
        uid: localStorage.getItem('uid')
      }
      recommendTeamUserJob(params).then(res => {
        this.dialogTableVisible = true
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleApply (val) {
      let params = {
        jobId: val.jobId,
        id: val.id,
        uid: localStorage.getItem('uid'),
        collectId: val.id
      }
      teamcollection(params).then(res => {
        this.dialogTableVisible = true
        this.getList(this.formMember)
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    handleOk () {
      this.$router.push('teamApplication')
    },
    handleSearch () {
      this.getList(this.formMember)
    },
    reset () {
      this.formMember = {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
      }
    }
  }
}
</script>