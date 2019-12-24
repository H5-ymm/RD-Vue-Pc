<template>
  <div class="x-flex-between">
    <div class="my-account-card">
      <ul class="x-flex-between">
        <li class="x-flex-start-justify my-account-item">
          <div>
            <img src="../../assets/img/img1.png" class="my-account-head" alt />
          </div>
          <div class="my-account-user">
            <p>王易木</p>
            <p>等级：总经理</p>
          </div>
        </li>
        <li class="my-account-item">
          <div class="my-account-info">
            <span>账户安全等级</span>
            <span>中</span>
            <el-link :underline="false" class="text">提升</el-link>
          </div>
          <div class="x-flex-around">
            <div class="account-icon">
              <img src="../../assets/img/myAccount/icon1.png" alt />
            </div>
            <div class="account-icon">
              <img src="../../assets/img/myAccount/icon2.png" alt />
            </div>
            <div class="account-icon">
              <img src="../../assets/img/myAccount/icon3.png" alt />
            </div>
            <div class="account-icon">
              <img src="../../assets/img/myAccount/icon4.png" alt />
            </div>
            <div class="account-icon">
              <img src="../../assets/img/myAccount/icon5.png" alt />
            </div>
            <div class="account-icon">
              <img src="../../assets/img/myAccount/icon6.png" alt />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="my-account-card">
      <ul class="x-flex-between">
        <li class="my-account-item">
          <div class="my-account-money">
            <p>账户余额（元）</p>
            <p class="money">{{showMoney?'100.00':'******'}}</p>
            <p class="text" @click="showMoney=!showMoney">{{showMoney?'隐藏余额':'显示余额'}}</p>
          </div>
        </li>
        <li class="my-account-item">
          <div class="x-flex-around my-account-info">
            <p>充值</p>
            <p>提现</p>
            <p>查看</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showMoney: true
    }
  }
}
</script>
<style lang="scss">
  .my-account-card {
    width:39%;
    height:90px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 14px 0px rgba(0, 0, 0, 0.1);
    border-radius:4px;
    padding: 25px 70px;
    .my-account-head {
      width: 88px;
      height: 88px;
      border-radius:50%;
    }
    .my-account-user {
      margin-left: 20px;
      width: 120px;
    }
    >ul {
      height: 100%;
    }
    .my-account-item {
      line-height: 30px;
      color: #333;
      .my-account-info {
        font-size: 16px;
        > span {
          margin-right: 15px;
          margin-left: 5px;
        }
        > p {
          width:68px;
          height:34px;
          text-align: center;
          line-height: 34px;
          background:#fff;
          border:1px solid #3699FF;
          color: #3699FF;
          border-radius:4px;
          margin-left: 30px;
        }
      }
      .text {
        font-size: 12px;
        color: #999999;
      }
      .money {
        color: #FE2A00;
        font-size:28px;
      }
      .account-icon {
        width: 30px;
        height: 30px;
        background: #ccc;
        border-radius: 50%;
        text-align: center;
        margin: 0 5px;
       >img {
         margin-top: 6px;
       }
      }
    }
  }
</style>