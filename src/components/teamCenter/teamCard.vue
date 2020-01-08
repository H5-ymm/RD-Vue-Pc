<style lang="scss">
  .team-center-card{
    background:rgba(255,255,255,1);
    border:1px solid rgba(238,238,238,1);
    box-shadow:2px 3px 10px 0px rgba(106,106,106,0.1);
    border-radius:5px;
    height: 80px;
    padding: 20px;
    &.active {
      border:1px solid #1890FF;
    }
    .team-card-icon {
      width:42px;
      height:22px;
      padding: 10px 0;
      border-radius:5px;
      box-shadow:2px 3px 10px 0px rgba(222,31,75,0.3);
      margin-right: 20px;
      color: #333;
      text-align: center;
      &.activeImg1 {
        background:linear-gradient(90deg,#DB1445,#FBA48B);
      }
      &.activeImg2 {
        background:linear-gradient(90deg,#037CDC,#24BAF7);
        box-shadow:2px 3px 10px 0px rgba(76,110,194,0.3);
      }
      &.activeImg3 {
        background:linear-gradient(90deg,#6F02FE,#C971D9);
        box-shadow:2px 3px 10px 0px rgba(118,10,253,0.3);
      }
      &.activeImg4 {
        background:linear-gradient(90deg,#F87220,#FAD761);
        box-shadow:2px 3px 10px 0px rgba(245,119,35,0.3);
      }
      &.activeImg5 {
        background:linear-gradient(90deg,#459522,#AFE84E);
        box-shadow:2px 3px 10px 0px rgba(70,150,35,0.3);
      }
    }
    .team-count {
      color: #000;
      font-size: 26px;
      margin-top: 5px;
    }
    .team-card-col2 {
      font-size: 14px;
      color: #6A6A6A;
      line-height: 25px;
      text-align: center;
      .num-color {
        color: #58B44E;
      }
      .num-color-red {
       color: #FE2A00;
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
          <p class="num-color">{{item.rate>=1?'+': '-'}}{{item.rate}}%</p>
          <p class="el-icon-top num-color" v-if="item.rate>1"></p>
          <p class="el-icon-bottom num-color-red" v-else></p>
          <p>周同比</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>


export default {
  props: ['teamCenterInfo'],
  data () {
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
        }, {
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
      ]
    }
  },
  created () {

    // this.teamCenterCount[0].num = this.teamCenterInfo.total_num
  },
  watch: {
    teamCenterInfo (val) {
      if (val) {
        this.teamCenterCount[1].rate = this.teamCenterInfo.total
        this.teamCenterCount[2].rate = this.teamCenterInfo.put
        this.teamCenterCount[3].rate = this.teamCenterInfo.view
        this.teamCenterCount[4].rate = this.teamCenterInfo.entry
        this.teamCenterCount[1].num = this.teamCenterInfo.total_num
        this.teamCenterCount[2].num = this.teamCenterInfo.put_num
        this.teamCenterCount[3].num = this.teamCenterInfo.view_num
        this.teamCenterCount[4].num = this.teamCenterInfo.entry_num
        this.teamCenterCount[0].num = this.teamCenterInfo.put_num + this.teamCenterInfo.entry_num + this.teamCenterInfo.entry_num + this.teamCenterInfo.total_num
      }
    }
  },
  methods: {
    select (item, index) {
      this.activeIndex = index
      this.$emit('select', index)
    }
  },
}
</script>