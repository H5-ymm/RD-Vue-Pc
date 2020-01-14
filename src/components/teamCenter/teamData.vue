<style lang="scss">
  .team-center-view {
    padding-bottom:50px;
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
        <teamEchart :activeIndex="activeIndex" :percentList="percentList" :list="list" :legendIndex="legendIndex"></teamEchart>
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
import { getrank, getCompare, getTeamLog, getnumLeader, getmemberList, getapplyLog } from '@/api/teamCenter'
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
      percentList: null,
      list: {},
      personList: [],
      tableData: [],
      tableTeamData: [],
      timeout: null,
      userName: '',
      depId: '',
      userPosition: sessionStorage.getItem('userPosition'), // 1 总经理，2经理，3 成员
    }
  },
  created () {
  },
  mounted () {
    if (localStorage.getItem('teamType') == 0) {
      this.dialogVisible = true
      return false
    }
    else {
      this.getList(this.params)
      this.getCompareInfo(this.paramsInfo)
      this.getData(this.paramsEchart)
      this.getTeamList(this.paramsLog)
      this.getLogList(this.paramsLog)
      if (this.userPosition == 1) {
        this.getDep()
      }
    }
  },
  computed: {
    titleLog () {
      return this.userPosition == 1 ? '团队' : this.userPosition == 2 ? '部门' : '个人'
    }
  },
  methods: {
    querySearchAsync (queryString, cb) {
      let params = {
        uid: localStorage.getItem('uid'),
        depart_id: this.depId,
        name: queryString
      }
      this.getPerson(params)
      var restaurants = this.personList;
      console.log(restaurants)
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      console.log(results)
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect (item) {
      console.log(item);
    },
    changeDep (val) {
      console.log(val)
      this.depId = val
    },
    getPerson (params) {
      getmemberList(params).then(res => {
        this.personList = res.data || []
        console.log(this.personList)
      }).catch(error => {
        console.log(error)
        this.$message.error(error.status.remind)
      })
    },
    getData (params, last) {
      if (last) {
        params.last = last
      }
      getnumLeader(params).then(res => {
        if (last) {
          this.list = res.data
        }
        else {
          this.percentList = res.data
        }

      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    getDep () {
      let uid = localStorage.getItem('uid')
      departmentRoleList({ uid }).then(res => {
        this.depList = res.data || []
      }).catch(error => {
        console.log(error)
        this.$message.error(error.status.remind)
      })
    },
    getCompareInfo (params) {
      getCompare(params).then(res => {
        this.teamCenterInfo = res.data
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    getLogList (params) {
      getapplyLog(params).then(res => {
        this.tableData = res.data.data || []
      }).catch(error => {
        console.log(error)
        this.$message.error(error.status.remind)
      })
    },
    getTeamList (params) {
      getTeamLog(params).then(res => {
        this.tableTeamData = res.data.data || []
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    select (index) {
      this.activeIndex = index
      this.getData(this.paramsEchart, 1)
    },
    getList (params) {
      getrank(params).then(res => {
        this.orderData = res.data
      }).catch(error => {
        this.$message.error(error.status.remind)
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
      this.getData(this.paramsEchart)
      this.legendIndex = val.type
    }
  },

}
</script>