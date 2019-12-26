<style lang="scss">
  .team-center-view {
    .team-center-form {
      padding-top: 20px;
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
  }
</style>
<template>
  <div class="team-center-view">
    <teamPanel title="部门数据" :moreShow="false">
      <div slot="content">
        <el-form :inline="true" class="team-center-form" :model="formMember">
          <el-form-item label="搜索类型：">
            <div class="x-flex-center">
              <el-select
                v-model="formMember.industry"
                class="width120"
                placeholder="部门"
                v-if="userPosition==3"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item,index) in depList"
                  :key="index"
                ></el-option>
              </el-select>
              <el-input v-model="formMember.name" class="width300" placeholder="请输入职位名称关键字"></el-input>
              <el-button type="primary" class="select-btn">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
        <teamCard></teamCard>
        <orderQuery></orderQuery>
        <teamEchart></teamEchart>
      </div>
    </teamPanel>
    <el-row :gutter="20">
      <el-col :span="12">
        <teamPanel title="部门日志" @viewMore="$router.push('logList?view=logTable')">
          <div slot="content">
            <logTable></logTable>
          </div>
        </teamPanel>
      </el-col>
      <el-col :span="12">
        <teamPanel title="接单简历日志" @viewMore="$router.push('logList?view=receiptLogTable')">
          <div slot="content">
            <receiptLogTable></receiptLogTable>
          </div>
        </teamPanel>
      </el-col>
    </el-row>
    <teamPanel title="团队排名" @viewMore="$router.push('teamOrder')">
      <div slot="content">
        <orderQuery></orderQuery>
        <allOrder></allOrder>
      </div>
    </teamPanel>
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
export default {
  components: {
    teamPanel,
    teamCard,
    teamEchart,
    logTable,
    receiptLogTable,
    orderQuery,
    allOrder
  },
  data () {
    return {
      formMember: {},
      list: [{
        name: '杨萌萌',
        total: 203
      }, {
        name: '杨萌萌',
        total: 203
      }, {
        name: '杨萌萌',
        total: 203
      }, {
        name: '杨萌萌',
        total: 203
      }],
      depList: [],
      userPosition: 1 // 1 成员，2经理，3 总经理
    }
  }

}
</script>