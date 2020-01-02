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
        @click="selectQuery(item.value,'type')"
        :class="{'active':orderParams.type==item.value}"
      >{{item.label}}</p>
      <el-date-picker
        v-model="date"
        class="daterange"
        type="daterange"
        @change="changeTime"
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
  props: ['timeList'],
  data () {
    return {
      orderParams: {
        type: 1
      },
      date: []
    }
  },
  methods: {
    selectQuery (val, key) {
      this.orderParams[key] = val
      this.$emit('selectQuery', this.orderParams)
    },
    changeTime (val) {
      this.orderParams.starttime = val[0]
      this.orderParams.endtime = val[1]
      this.$emit('selectQuery', this.orderParams)
    }
  },
}
</script>