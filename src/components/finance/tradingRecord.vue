<template>
  <div class="my-account-view my-account-record">
    <div class="my-account-query">
      <el-form :inline="true" label-width="90px" label-position="right" :model="formMember" class="internal-invoice-form">
        <el-form-item label="时间：">
          <div class="x-flex-start select-time">
            <el-date-picker v-model="formMember.time" type="date" value="yyyy-MM-dd" value-format="timestamp" class="width140" placeholder="选择日期" @change="selectStatus($event,'time')"></el-date-picker>
            <span>-</span>
            <el-date-picker v-model="formMember.time1" type="date" value="yyyy-MM-dd" value-format="timestamp" class="width140" @change="selectStatus($event,'time1')" placeholder="选择日期"></el-date-picker>
            <el-date-picker class="month-btn" v-model="formMember.month" type="month" placeholder="按月选择"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="最近：">
          <el-button :type="formMember.time==item.value ?'primary':''" v-for="(item,index) in list" :key="index" plain @click="selectStatus('time',item)" class="select-status">{{item.label}}</el-button>
        </el-form-item>
        <el-form-item label="资金流向：">
          <el-button :type="formMember.moneyType==item.value ?'primary':''" v-for="(item,index) in list1" :key="index" plain @click="selectStatus('moneyType',item)" class="select-status">{{item.label}}</el-button>
        </el-form-item>
        <el-form-item label="类型：">
          <div class="x-flex-start">
            <el-button :type="formMember.type==item.value ?'primary':''" v-for="(item,index) in list2" :key="index" plain @click="selectStatus('type',item)" class="select-status">{{item.label}}</el-button>
            <p @click="show=!show" class="x-flex-center senior-search-btn">
              <el-link :type="show?'primary': ''" :underline="false">高级筛选</el-link>
              <i class="el-icon-arrow-down"></i>
            </p>
          </div>
        </el-form-item>
        <el-collapse-transition>
          <div v-show="show" class="senior-search-box x-flex-start">
            <el-form-item label="关键字：">
              <el-input v-model="formMember.keyword" class="width300" placeholder="请输入你要搜索的关键字"></el-input>
              <el-button type="primary" @click="handleSearch" class="select-btn">查询</el-button>
            </el-form-item>
            <div class="up-box">
              <p @click="show=!show" class="senior-search-btn">
                <span>收起</span>
                <i class="el-icon-arrow-up"></i>
              </p>
            </div>
          </div>
        </el-collapse-transition>
      </el-form>
    </div>
    <div class="record-box">
      <div class="record-title x-flex-center">
        <p class="x-flex-center">
          收入：
          <span class="get-money">120.00元</span>
        </p>
        <el-divider direction="vertical"></el-divider>
        <p class="x-flex-center">
          支出：
          <span class="give-money">120.00元</span>
        </p>
      </div>
      <el-table border :data="tableData" @sort-change="sortChange" ref="multipleTable" style="width: 100%">
        <el-table-column label="流水号" prop="depart_name" align="center" width="190"></el-table-column>
        <el-table-column label="日期" sortable="custom" align="center" width="190">
          <template slot-scope="props">
            <span>{{ props.row.addtime ? $moment.unix(props.row.addtime).format('YYYY-MM-DD HH:mm'): '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称/备注" prop="mobile" align="center" width="190"></el-table-column>
        <el-table-column label="收入（元）" prop="num" align="center" width="190"></el-table-column>
        <el-table-column label="支出（元）" align="center" prop="num" min-width="190"></el-table-column>
        <el-table-column label="账户余额（元）" prop="mobile" align="center" width="190"></el-table-column>
        <el-table-column label="支付方式" prop="num" align="center" width="190"></el-table-column>
      </el-table>
      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formMember.page" :page-sizes="[10, 20, 30, 40]" :page-size="formMember.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
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
      teamId: '',
      show: false,
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1,
        time: 1,
        type: 0,
        moneyType: 0
      },
      list: [
        { label: '1周', value: 1 },
        { label: '1个月', value: 2 },
        { label: '1年', value: 3 },
      ],
      list1: [
        { label: '全部', value: 0 },
        { label: '收入', value: 1 },
        { label: '支出', value: 2 },
      ],
      list2: [
        { label: '全部', value: 0 },
        { label: '充值', value: 1 },
        { label: '提现', value: 2 },
        { label: '转账', value: 3 },
      ],
      total: 0
    }
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
    sortChange (column) {
      if (column.order == 'ascending') {
        this.formMember.timeDesc = 'asc'
      }
      else {
        this.formMember.timeDesc = 'desc'
      }
      this.getList(this.formMember)
    },
    handleSearch () { },
    selectStatus (val, key) {
      this.formMember[key] = val
      this.getList(this.formMember)
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
    margin-right: 30px;
    &.my-account-record {
      background: #fff;
      padding: 20px;
      .el-form-item {
        display: block!important;
      }
      .select-time {
        span{
          margin: 0 6px;
        }
      }
      .width140 {
        width: 140px;
      }
      .month-btn {
        width: 120px;
        margin-left: 20px;
      }
      .senior-search-btn {
        margin-left: 15px;
        color: #999999;
      }
      .width300 {
        width: 300px;
        margin-right: 20px;
      }
      .senior-search-box {
        background:rgba(255,255,255,0.6);
        border:1px solid rgba(255,255,255,0.1);
        box-shadow:0px 2px 13px 0px rgba(0, 0, 0, 0.1);
        padding: 10px 10px 0;
        margin-bottom: 10px;
        position: relative;
        .senior-search-col2 {
          margin-left: 6%;
        }
        .up-box {
          position: absolute;
          right: 10px;
          bottom: 20px;
        }
      }
      .record-box {
        .record-title {
          color: #333;
          margin: 20px auto;
          p {
            margin: 0 5px;
          }
         span {
           font-size: 24px;
         }
         .get-money {
           color: #58B44E;
         }
         .give-money {
           color: #FE2A00;
         }
        }
        .pagination {
          margin-top: 30px;
          padding: 0;
        }
      }
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