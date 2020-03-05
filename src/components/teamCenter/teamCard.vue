<style lang="scss">
.team-center-card {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  box-shadow: 2px 3px 10px 0px rgba(106, 106, 106, 0.1);
  border-radius: 5px;
  height: 80px;
  padding: 20px;
  &.active {
    border: 1px solid #1890ff;
  }
  .team-card-icon {
    width: 42px;
    height: 22px;
    padding: 10px 0;
    border-radius: 5px;
    box-shadow: 2px 3px 10px 0px rgba(222, 31, 75, 0.3);
    margin-right: 20px;
    color: #333;
    text-align: center;
    &.activeImg1 {
      background: linear-gradient(90deg, #db1445, #fba48b);
    }
    &.activeImg2 {
      background: linear-gradient(90deg, #037cdc, #24baf7);
      box-shadow: 2px 3px 10px 0px rgba(76, 110, 194, 0.3);
    }
    &.activeImg3 {
      background: linear-gradient(90deg, #6f02fe, #c971d9);
      box-shadow: 2px 3px 10px 0px rgba(118, 10, 253, 0.3);
    }
    &.activeImg4 {
      background: linear-gradient(90deg, #f87220, #fad761);
      box-shadow: 2px 3px 10px 0px rgba(245, 119, 35, 0.3);
    }
    &.activeImg5 {
      background: linear-gradient(90deg, #459522, #afe84e);
      box-shadow: 2px 3px 10px 0px rgba(70, 150, 35, 0.3);
    }
  }
  .team-count {
    color: #000;
    font-size: 26px;
    margin-top: 5px;
  }
  .team-card-col2 {
    font-size: 14px;
    color: #6a6a6a;
    line-height: 25px;
    text-align: center;
    .num-color {
      color: #58b44e;
    }
    .num-color-red {
      color: #fe2a00;
    }
  }
}
</style>
<template>
  <el-row :gutter="20" type="flex" justify="space-between">
    <el-col :span="5" v-for="(item,index) in teamCenterCount" :key="index">
      <div class="team-center-card x-flex-start-between" @click="select(item, index)" :class="{'active':activeIndex==index}">
        <div class="x-flex-start">
          <div class="team-card-icon" :class="`activeImg${item.id}`">
            <img :src="require(`../../assets/img/teamCenter/icon${item.id}.png`)" alt />
          </div>
          <div>
            <p>{{cardInfo[item.label]}}</p>
            <p class="team-count">{{item.num?item.num:'--'}}</p>
          </div>
        </div>
        <div v-if="index!=0" class="team-card-col2">
          <p class="num-color" v-if="Number(item.rate)>0">+{{item.rate}}%</p>
          <p class="num-color" v-if="Number(item.rate)<0">-{{item.rate}}%</p>
          <p class="num-color" v-if="Number(item.rate)==0">{{item.rate}}%</p>
          <p class="el-icon-top num-color" v-if="Number(item.rate)>0"></p>
          <p class="el-icon-bottom num-color-red" v-if="Number(item.rate)<0"></p>
          <p>周同比</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: ['teamCenterInfo'],
  data() {
    return {
      cardInfo: {
        depNum: '部门数据',
        reduseNum: '简历总数',
        nameNum: '报名总数',
        aduitNum: '面试总数',
        entryNum: '入职总数'
      },
      activeIndex: 0,
      teamCenterCount: [
        {
          id: 1,
          num: 0,
          label: 'depNum',
          rate: 0
        },
        {
          id: 2,
          num: 0,
          label: 'reduseNum',
          rate: 0
        },
        {
          id: 3,
          num: 0,
          label: 'nameNum',
          rate: 0
        },
        {
          id: 4,
          num: 0,
          label: 'aduitNum',
          rate: 0
        },
        {
          id: 5,
          num: 0,
          label: 'entryNum',
          rate: 0
        }
      ],
      userPosition: sessionStorage.getItem('userPosition') // 1 总经理，2经理，3 成员
    }
  },
  created() {
    if (this.userPosition == 1) {
      this.cardInfo.depNum = '团队数据'
    } else if (this.userPosition == 2) {
      this.cardInfo.depNum = '部门数据'
    } else {
      this.cardInfo.depNum = '个人数据'
    }
  },
  watch: {
    teamCenterInfo(val) {
      if (val) {
        this.teamCenterCount[1].rate = this.teamCenterInfo.total
          ? this.teamCenterInfo.total
          : 0
        this.teamCenterCount[2].rate = this.teamCenterInfo.put
          ? this.teamCenterInfo.put
          : 0
        this.teamCenterCount[3].rate = this.teamCenterInfo.view
          ? this.teamCenterInfo.view
          : 0
        this.teamCenterCount[4].rate = this.teamCenterInfo.entry
          ? this.teamCenterInfo.entry
          : 0
        this.teamCenterCount[1].num = this.teamCenterInfo.total_num
          ? this.teamCenterInfo.total_num
          : 0
        this.teamCenterCount[2].num = this.teamCenterInfo.put_num
          ? this.teamCenterInfo.put_num
          : 0
        this.teamCenterCount[3].num = this.teamCenterInfo.view_num
          ? this.teamCenterInfo.view_num
          : 0
        this.teamCenterCount[4].num = this.teamCenterInfo.entry_num
          ? this.teamCenterInfo.entry_num
          : 0

        this.teamCenterCount[0].num =
          Number(this.teamCenterInfo.put_num) +
          Number(this.teamCenterInfo.view_num) +
          Number(this.teamCenterInfo.entry_num) +
          Number(this.teamCenterInfo.total_num)
      }
    }
  },
  methods: {
    select(item, index) {
      this.activeIndex = index
      this.$emit('select', index)
    }
  }
}
</script>