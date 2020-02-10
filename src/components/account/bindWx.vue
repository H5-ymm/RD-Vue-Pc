<template>
  <div class="bind-wx-box">
    <img src="../../assets/img/qrcode.jpg" class="qrcode" alt="">
    <p class="wx-text">用微信扫描上方二维码进行微信绑定</p>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.bind-wx-box {
  width: 100%;
  margin: 10px auto;
  text-align: center;
  > img {
    width: 200px;
    height: 200px;
    margin: 30px 0 20px;
  }
  .wx-text {
    color: #333;
    font-size: 14px;
    margin-bottom: 40px;
  }
}
</style>


