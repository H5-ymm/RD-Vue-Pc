<style lang="scss">
  .team-center-query {
    padding-top: 15px;
    .order-time {
      margin-left: 20px;
      color: #333333;
      padding:0 15px;
      height: 24px;
      line-height: 24px;
      &.active {
        background:#1890FF;
        border-radius:12px;
        color: #fff;
      }
    }
    .daterange {
      width: 300px;
      margin-left: 10px;
    }
  }
</style>
<template>
  <div class="team-center-query">
    <div class="x-flex-start-justify">
      <p
        v-for="(item,index) in timeList"
        :key="index"
        class="order-time"
        @click="selectQuery(item.value,'time')"
        :class="{'active':orderParams.time==item.value}"
      >{{item.label}}</p>
      <el-date-picker
        v-model="date"
        class="daterange"
        type="daterange"
        value-format="timestamp"
        value="yyyy-mm-dd"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      timeList: [
        { label: '今日', value: 1 },
        { label: '本周', value: 2 },
        { label: '本月', value: 3 },
        { label: '全年', value: 4 }
      ],
      orderParams: {
        time: 1
      },
      date: []
    }
  },
  methods: {
    selectQuery (val, key) {
      this.orderParams[key] = val
    }
  },
}
</script>