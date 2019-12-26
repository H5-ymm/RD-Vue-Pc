<style lang="scss">
  .team-center-order{
    color: #333;
    border-radius:10px;
    height: 100%;
    .team-center-title {
      margin: 20px 0;
    }
    .text-icon {
      margin: 0 10px;
    }
    .team-center-content {
      border-right: 1px solid #eee;
      padding-right: 40px;
      .team-center-item {
        margin-bottom: 10px;
      }
    }
    .order-num {
      width:25px;
      height:25px;
      background:rgba(238,238,238,1);
      border-radius:50%;
      color: #333;
      line-height: 25px;
      text-align: center;
      margin: 5px;
    }
    .order-name {
      margin-top: -2px;
      margin-left: 20px;
    }
  }
</style>
<template>
  <div class="team-center-order">
    <div class="x-flex-center team-center-title">
      <img :src="require(`../../assets/img/teamCenter/orderIcon${orderType}.png`)" alt />
      <img :src="require(`../../assets/img/teamCenter/text${orderType}.png`)" alt class="text-icon" />
    </div>
    <ul class="team-center-content">
      <li class="x-flex-between team-center-item" v-for="(item,index) in list" :key="index">
        <div class="x-flex-between">
          <div class="x-flex-between">
            <img src="../../assets/img/teamCenter/one.png" alt v-if="index==0" />
            <img src="../../assets/img/teamCenter/two.png" alt v-else-if="index==1" />
            <img src="../../assets/img/teamCenter/three.png" alt v-else-if="index==2" />
            <p v-else class="order-num">{{index+1}}</p>
            <p class="order-name">{{item.name}}</p>
          </div>
        </div>
        <div>{{item.total}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['list', 'orderType']
}
</script>