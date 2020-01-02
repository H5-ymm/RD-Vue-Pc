<style lang="scss">
  .team-center-view {
    padding-bottom:50px;
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
    <teamPanel
      title="部门数据"
      :moreShow="false"
    >
      <div slot="content">
        <el-form
          :inline="true"
          class="team-center-form"
          :model="formMember"
        >
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
              <el-input
                v-model="formMember.name"
                class="width300"
                placeholder="请输入职位名称关键字"
              ></el-input>
              <el-button
                type="primary"
                class="select-btn"
              >查询</el-button>
            </div>
          </el-form-item>
        </el-form>
        <teamCard @select="select"></teamCard>
        <orderQuery
          @selectQuery="selectQuery"
          :timeList="timeList"
        ></orderQuery>
        <teamEchart
          :activeIndex="activeIndex"
          :legendIndex="legendIndex"
        ></teamEchart>
      </div>
    </teamPanel>
    <el-row :gutter="20">
      <el-col :span="12">
        <teamPanel
          title="部门日志"
          @viewMore="$router.push('logList?view=logTable')"
        >
          <div slot="content">
            <logTable></logTable>
          </div>
        </teamPanel>
      </el-col>
      <el-col :span="12">
        <teamPanel
          title="接单简历日志"
          @viewMore="$router.push('logList?view=receiptLogTable')"
        >
          <div slot="content">
            <receiptLogTable></receiptLogTable>
          </div>
        </teamPanel>
      </el-col>
    </el-row>
    <teamPanel
      title="团队排名"
      @viewMore="$router.push('teamOrder')"
    >
      <div slot="content">
        <orderQuery
          :timeList="timeList1"
          @selectQuery="selectQueryOrder"
        ></orderQuery>
        <allOrder :orderData="orderData"></allOrder>
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
import { getrank } from '@/api/teamCenter'
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
      parasm: {
        type: 1,
        uid: localStorage.getItem('uid'),
        limit: 10
      },
      orderData: {},
      depList: [],
      activeIndex: 0,
      legendIndex: 1,
      limit: 10,
      userPosition: 1 // 1 成员，2经理，3 总经理
    }
  },
  created () {
    this.getList(this.parasm)
  },
  methods: {
    select (index) {
      this.activeIndex = index
    },
    getList (parasm) {
      getrank(parasm).then(res => {
        this.orderData = res.data
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    selectQueryOrder (val) {
      this.parasm = Object.assign(this.parasm, val)
      this.getList(this.parasm)
    },
    selectQuery (val) {
      console.log(val)
      this.legendIndex = val.type
    }
  },

}
</script>