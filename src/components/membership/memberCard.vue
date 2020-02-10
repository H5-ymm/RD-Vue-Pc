<style lang="scss">
.team-info-row {
  margin: 20px 0;
  .cardBg {
    position: absolute;
    bottom: 0;
    right: 0;
    max-width: 126px;
  }
  .box-card {
    box-shadow: 2px 5px 17px 0px rgba(51, 51, 51, 0.2);
    border-radius: 5px;
    height: 126px;
    padding-left: 20px;
    padding-top: 10px;
    position: relative;
    p {
      font-size: 16px;
      &:nth-of-type(2) {
        font-size: 32px;
        margin-top: 10px;
      }
    }
    &.box-card1 {
      padding-right: 20px;
      border: none;
    }
    &.el-card {
      color: #fff;
    }
    &.name {
      background: linear-gradient(150deg, #7f80fe, #729efe);
    }
    &.num {
      background: linear-gradient(
        117deg,
        rgba(255, 110, 115, 1),
        rgba(255, 116, 145, 1)
      );
    }
    &.resumeNum {
      background: linear-gradient(
        117deg,
        rgba(255, 146, 100, 1),
        rgba(255, 176, 100, 1)
      );
    }
    &.entryNum {
      background: linear-gradient(
        117deg,
        rgba(166, 91, 251, 1),
        rgba(189, 94, 255, 1)
      );
    }
  }
}
</style>
<template>
  <el-row :gutter="20" class="team-info-row">
    <el-col :span="6" v-for="(item,key) in userLabel" :key="key">
      <el-card class="box-card box-card1" :class="key">
        <p>{{item}}</p>
        <p>{{teamInfo[key]}}</p>
        <img src="../../assets/img/cardBg1.png" alt="" class="cardBg" v-if="key=='name'">
        <img src="../../assets/img/cardBg2.png" alt="" class="cardBg" v-if="key=='num'">
        <img
          src="../../assets/img/cardBg3.png"
          alt=""
          class="cardBg"
          v-if="key=='resumeNum'&&userPosition==1"
        >
        <img
          src="../../assets/img/cardBg4.png"
          alt=""
          class="cardBg"
          v-if="key=='entryNum'&&userPosition==1"
        >
        <img
          src="../../assets/img/cardBg5.png"
          alt=""
          class="cardBg"
          v-if="key=='resumeNum'&&userPosition!=1"
        >
        <img
          src="../../assets/img/cardBg6.png"
          alt=""
          class="cardBg"
          v-if="key=='entryNum'&&userPosition!=1"
        >
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: ['teamInfo'],
  data() {
    return {
      userPosition: sessionStorage.getItem('userPosition')
    }
  },
  computed: {
    userLabel() {
      let obj = {}
      if (this.userPosition == 1) {
        obj = {
          name: '团队名称',
          num: '团队成员',
          resumeNum: '简历总数',
          entryNum: '已入职'
        }
      } else {
        obj = {
          name: '团队名称',
          num:
            localStorage.getItem('departName') != 'null'
              ? localStorage.getItem('departName')
              : '--',
          resumeNum: '简历总数',
          entryNum: '已入职'
        }
      }
      return obj
    }
  }
}
</script>
