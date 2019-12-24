<template>
  <div class="my-account-view tables-box billingManagement">
    <div class="my-account-header">
      <accountCard></accountCard>
    </div>
    <div class="account-table">
      <el-table border :data="tableData" ref="multipleTable" style="width: 100%">
        <el-table-column label="流水号" prop="depart_name" align="center" width="300"></el-table-column>
        <el-table-column label="日期" sortable align="center" width="300">
          <template slot-scope="props">
            <span>{{ props.row.addtime ? $moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'): '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付类型" prop="mobile" align="center" width="300"></el-table-column>
        <el-table-column label="待充值金额" prop="num" align="center" width="300"></el-table-column>
        <el-table-column label="操作" align="center" min-width="300">
          <template slot-scope="scope">
            <el-button @click="handleTurnover(scope.row)" type="text" size="small">继续充值</el-button>
            <el-button @click="handleDel(scope.row)" type="text" size="small">删除充值</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="account-explain">
        <ul class="account-explain-item">
          <p class="account-explain-title">说明</p>
          <li>
            <p>充值为什么没到账？</p>
            <p>可能有2-3分钟延迟，可以查看一下交易记录。</p>
          </li>
        </ul>
        <ul class="account-explain-item">
          <p class="account-explain-title">提现多久到账？</p>
          <li>
            <p>1.支付宝支持实时到账，</p>
            <p>2.银行卡支持次日到账。</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import accountCard from './accountCard'
export default {
  components: {
    accountCard
  },
  props: {
    tableData: {
      type: []
    }
  },
  props: ['tableData'],
  data () {
    return {
      memberInfo: {},
      teamId: ''
    }
  },
  methods: {
    handleTurnover (row) {
      this.memberInfo = row
      this.teamId = row.uid
      this.$emit('handleTurnover', row.id)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      this.$emit('handleSelectionChange', this.multipleSelection.length)
    },
    handleDel (row) {
      this.$emit('handleDel', row.id)
    }
  }
}
</script>
<style lang="scss">
  .my-account-view { 
    .my-account-header {
    }
    .account-table {
      background: #fff;
      padding: 30px 16px;
      margin: 20px 0;
    }
    .account-explain {
      color: #999999;
      font-size: 14px;
      margin-top: 80px;
      .account-explain-item {
        margin-top: 30px;
        li {
          line-height: 20px;
        }
        .account-explain-title {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>