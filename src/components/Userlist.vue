<template>
  <div class="tables-box">
    <memberCard :userType="userType"></memberCard>
    <div class="table-list">
      <memberQuery @onSubmit="onSubmit"></memberQuery>
      <memberTable :total="total" :tableData="tableData"></memberTable>
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
    <memberInfo :dialogTableVisible="dialogTableVisible"></memberInfo>
  </div>
</template>

<script>
import Breadcrumb from './breadcrumb/Breadcrumb'
import memberCard from './membership/memberCard'
import memberQuery from './membership/memberQuery'
import memberTable from './membership/memberTable'
import memberInfo from './membership/memberInfo'
import { getTeamList, loginOutTeam } from '../api/team'
export default {
  components: {
    Breadcrumb,
    memberCard,
    memberQuery,
    memberTable,
    memberInfo
  },
  data () {
    return {
      breadcrumb: ['设置', '管理控制', '全部管理员'],
      dialogTableVisible: false,
      tableData: [],
      currentPage: 1,
      userType: 1,
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      total: 0
    }
  },
  created () {
    // 初始化查询标签数据
    // this.reverseUser()
    this.getList(this.formMember)
  },
  methods: {
    handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    getList (params) {
      getTeamList(params).then(res => {
        const { data } = res
        this.tableData = data.data
        this.total = data.count
      })
    },
    onSubmit (value) {
      let params = Object.assign(this.formMember, value)
      this.getList(params)
    }
  }
}
</script>

<style lang="scss">
.table-list {
  background: #fff;
  border-radius:10px;
  height: calc(100% - 460px);
  padding: 15px;
  .team-pagination {
    margin: 20px 0;
  }
}
.tables-box{
  overflow: hidden;
}
.team-info-row {
  margin: 20px 0;
}
.box-card p {
  font-size:16px;
}
.box-card p:nth-of-type(2) {
  font-size:34px;
  margin-top: 10px;
}
</style>
