<template>
  <div class="view-box-list">
    <div
      class="view-box-card"
      :class="{'view-box-card-active': index==activeIndex}"
      v-for="(item,index) in list"
      :key="index"
    >
      <section class="view-card-row bg-purple-start">
        <div class="view-card-col1">
          <img src="../../assets/img/img1.png" alt />
        </div>
        <div class="view-card-col2">
          <p>{{item.title}}</p>
          <p>
            发布者：
            <span class="nick-name">{{item.name}}</span>
          </p>
          <p class="time">更新时间：{{item.time}}</p>
        </div>
        <div class="view-card-col3">
          <el-button round size="mini">通知</el-button>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: 'card',
  props: ['list'],
  data () {
    return {
      activeIndex: 0
    }
  }
}
</script>
<style>
  .view-box-list {
    background: #fff;
    width: 540px;
    height: 774px;
    margin-top: 10px;
  }
  .view-box-list .view-box-card {
    padding: 0 24px;
  }
  .view-box-list .view-box-card-active {
    background: #DCEEFE;
  }
  .view-card-row {
    width: 100%;
    height: 130px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
  }
  .view-card-col1 {
    width: 20%;
  }
  .view-card-col1 img {
    width: 88px;
    height: 88px;
    border-radius: 100%;
  }
  .view-card-col2 {
    width: 60%;
    line-height: 32px;
    font-size:14px;
  }
  .view-card-col3 {
    flex: 1;
    text-align: right;
  }
  .view-card-col2 .time {
    font-size:12px;
    color: #999999;
  }
  .view-card-col2 .nick-name{
    color: #1890FF;
  }
  .view-card-col1 {
    width: 20%;
  }
</style>