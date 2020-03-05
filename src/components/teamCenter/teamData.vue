<style lang="scss">
.team-center-view {
  padding-bottom: 50px;
  .team-center-form {
    padding-top: 20px;
    .el-select {
      margin-right: 10px;
    }
    .width300 {
      width: 300px;
    }
    .width120 {
      width: 120px;
    }
    .select-btn {
      padding: 11px 20px;
      margin-left: 20px;
    }
  }
  .team-panel-section1 {
    min-height: 306px;
  }
}
</style>
<template>
  <div class="team-center-view">
    <teamPanel :title="`${titleLog}数据`" :moreShow="false">
      <div slot="content">
        <el-form :inline="true" class="team-center-form" :model="formMember" v-if="userPosition!=3">
          <el-form-item label="搜索类型：">
            <div class="x-flex-center">
              <el-select v-model="formMember.depart_id" class="width120" placeholder="部门" @change="changeDep" v-if="userPosition==1">
                <el-option :label="item.depart_name" :value="item.id" v-for="(item,index) in depList" :key="index"></el-option>
              </el-select>
              <el-autocomplete v-if="userPosition==1" v-model="userName" class="width300" :fetch-suggestions="querySearchAsync" placeholder="请输入你要搜索的关键字" @select="handleSelect">
                <template slot-scope="{ item }">
                  <div class="name">{{ item.user_name }}</div>
                </template>
              </el-autocomplete>
              <!-- <el-input v-if="userPosition==1" v-model="formMember.search_uid" class="width300" placeholder="请输入职位名称关键字"></el-input> -->
              <el-input v-if="userPosition==2" v-model="formMember.name" class="width300" placeholder="请输入组员姓名"></el-input>
              <el-button type="primary" @click="querySearch" class="select-btn">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
        <teamCard @select="select" :teamCenterInfo="teamCenterInfo"></teamCard>
        <orderQuery @selectQuery="selectQuery" :timeList="timeList"></orderQuery>
        <teamEchart :activeIndex="activeIndex" :eachartData="eachartData" :percentList="percentList" :list="list" :legendIndex="legendIndex"></teamEchart>
      </div>
    </teamPanel>
    <el-row :gutter="20">
      <el-col :span="12">
        <teamPanel :title="`${titleLog}日志`" class="team-panel-section1" @viewMore="$router.push('/logList?view=logTable')">
          <div slot="content">
            <logTable :tableData="tableTeamData"></logTable>
          </div>
        </teamPanel>
      </el-col>
      <el-col :span="12">
        <teamPanel title="接单简历日志" class="team-panel-section1" @viewMore="$router.push('/logList?view=receiptLogTable')">
          <div slot="content">
            <receiptLogTable :tableData="tableData"></receiptLogTable>
          </div>
        </teamPanel>
      </el-col>
    </el-row>
    <teamPanel title="团队排名" @viewMore="$router.push('teamOrder')">
      <div slot="content">
        <orderQuery :timeList="timeList1" @selectQuery="selectQueryOrder"></orderQuery>
        <allOrder :orderData="orderData"></allOrder>
      </div>
    </teamPanel>
    <infoTip :centerDialogVisible="dialogVisible" :modalInfo="modalInfo" @handleClose="dialogVisible=false"></infoTip>
  </div>
</template>
<script>
import teamPanel from './teamPanel'
import teamCard from './teamCard'
import teamEchart from './teamEchart'
import logTable from './logTable'
import receiptLogTable from './receiptLogTable'
import orderQuery from './orderQuery'
import allOrder from './allOrder'
import {
  getrank,
  getCompare,
  getTeamLog,
  getnumLeader,
  getmemberList,
  getapplyLog
} from '@/api/teamCenter'
import { departmentRoleList } from '@/api/department'
import infoTip from '../common/infoTip'
export default {
  components: {
    teamPanel,
    teamCard,
    teamEchart,
    logTable,
    receiptLogTable,
    orderQuery,
    allOrder,
    infoTip
  },
  data () {
    return {
      formMember: {
        uid: localStorage.getItem('uid')
      },
      dialogVisible: false,
      modalInfo: {
        title: '您的信息未完善！',
        okText: '前去完善',
        closeText: '',
        imgBg: require('../../assets/img/info.png')
      },
      timeList: [
        { label: '一周', value: 1 },
        { label: '一个月', value: 2 },
        { label: '三个月', value: 3 },
        { label: '一年', value: 4 }
      ],
      timeList1: [
        { label: '本周', value: 1 },
        { label: '本月', value: 2 },
        { label: '季度', value: 3 },
        { label: '本年', value: 4 }
      ],
      params: {
        type: 1,
        uid: localStorage.getItem('uid'),
        limit: 10
      },
      paramsInfo: {
        type: 1,
        uid: localStorage.getItem('uid'),
        search_uid: ''
      },
      paramsEchart: {
        type: 1,
        uid: localStorage.getItem('uid'),
        search_uid: '',
        depart_id: '',
        last: ''
      },
      paramsLog: {
        uid: localStorage.getItem('uid'),
        limit: 5,
        page: 1
      },
      orderData: {},
      depList: [],
      activeIndex: 0,
      legendIndex: 1,
      limit: 10,
      teamCenterInfo: {},
      percentList: {},
      list: [],
      personList: [],
      tableData: [],
      tableTeamData: [],
      userName: '',
      depId: '',
      userPosition: sessionStorage.getItem('userPosition'), // 1 总经理，2经理，3 成员
      eachartData: [],
      allData: {}
    }
  },
  created () {
    if (localStorage.getItem('teamType') == 0) {
      this.dialogVisible = true
      return false
    } else {
      if (localStorage.getItem('userType') == 2) {
        this.getCompareInfo(this.paramsInfo)
        this.getData(this.paramsEchart)
        this.getList(this.params)
        this.getTeamList(this.paramsLog)
        this.getLogList(this.paramsLog)
        if (this.userPosition == 1) {
          this.getDep()
        }
      }
    }
  },
  computed: {
    titleLog () {
      return this.userPosition == 1
        ? '团队'
        : this.userPosition == 2
          ? '部门'
          : '个人'
    }
  },
  methods: {
    querySearchAsync (queryString, cb) {
      if(!queryString) return
      let params = {
        uid: localStorage.getItem('uid'),
        depart_id: this.depId,
        name: queryString
      }
      getmemberList(params)
        .then(res => {
          this.personList = res.data || []
           cb( this.personList)
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    handleSelect (item) { 
      this.userName = item.user_name
      this.paramsInfo.search_uid =  item.uid
      this.paramsEchart.search_uid = item.uid
    },
    changeDep (val) {
      this.depId = val
    },
    getKey (index) {
      let label = ''
      if (index) {
        if (index == 1) {
          label = 'total'
        } else if (index == 2) {
          label = 'put'
        } else if (index == 3) {
          label = 'view'
        } else {
          label = 'entry'
        }
      }
      return label
    },
    getData (params, last, index) {
      let obj = {}
      if (last) {
        obj = Object.assign(params, { last: 1 })
      } else {
        obj = Object.assign(params, { last: '' })
      }
      getnumLeader(obj)
        .then(res => {
          this.allData = res.data
          this.percentList = this.allData
          let key = this.getKey(index)
          if (last) {
            this.list = this.getArray(res.data[key])
            this.activeIndex = index
          } else {
            this.eachartData = this.getNewList(res.data)
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    getArray (obj) {
      let arr = []
      for (let i in obj) {
        arr.push(obj[i])
      }
      return arr
    },
    getNewList (val) {
      let arr = []
      let obj = {
        0: 'total',
        1: 'put',
        2: 'view',
        3: 'entry'
      }
      for (let key in obj) {
        arr[key] = this.getArray(val[obj[key]]).splice(0)
      }
      return arr
    },
    getDep () {
      let uid = localStorage.getItem('uid')
      departmentRoleList({ uid })
        .then(res => {
          this.depList = res.data || []
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    getCompareInfo (params) {
      getCompare(params)
        .then(res => {
          this.teamCenterInfo = res.data
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    getLogList (params) {
      getapplyLog(params)
        .then(res => {
          this.tableData = res.data.data || []
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    getTeamList (params) {
      getTeamLog(params)
        .then(res => {
          this.tableTeamData = res.data.data || []
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    select (index) {
      this.getData(this.paramsEchart, 1, index)
      this.getData(this.paramsEchart)
    },
    getList (params) {
      getrank(params)
        .then(res => {
          this.orderData = res.data
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    querySearch () {
      this.paramsInfo.depart_id = this.formMember.depart_id
      this.getCompareInfo(this.paramsInfo)
      this.paramsEchart.depart_id = this.formMember.depart_id
      this.paramsEchart.search_uid = this.formMember.name
      this.getData(this.paramsEchart)
    },
    selectQueryOrder (val) {
      this.params = Object.assign(this.params, val)
      this.getList(this.params)
    },
    selectQuery (val) {
      this.paramsEchart = Object.assign(this.paramsEchart, val)
      this.paramsEchart = Object.assign(this.paramsEchart, 0)
      this.getData(this.paramsEchart)
      this.legendIndex = val.type
    }
  }
}
</script>