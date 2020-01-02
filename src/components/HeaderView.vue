<style lang="scss">
.orderTaking-header {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.home .header-left{
  display: inline-block;
}
.home .bg-purple .welcome {
  font-size:14px;
  margin-left:8px;
}
.home-aside{
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
<template>
  <div class="orderTaking-header">
    <div class="x-flex-between">
      <span class="header-left">人事达</span>
      <ul class="nav">
        <li
          v-for="(item, index) in menus"
          class="nav-item"
          :key="index"
          @click="switchNav(item, index)"
          :class="{'active': activeIndex==index}"
        >
          {{item.title}}
          <span
            class="line"
            v-if="activeIndex==index"
          ></span>
        </li>
      </ul>
    </div>
    <div class="bg-purple-light x-flex-between">
      <span
        class="home-purple-left"
        v-if="!userInfo"
      >
        <i class="el-icon-user-solid"></i>
        <a
          class="welcome"
          href="login"
        >登录</a>
        <a class="divider">|</a>
        <a
          class="welcome"
          href="register"
        >注册</a>
      </span>
      <P
        class="home-purple-left"
        v-else
      >
        <img
          :src="userInfo.head_img"
          alt
          v-if="userInfo.head_img"
        />
        <i
          class="el-icon-user-solid"
          v-else
        ></i>&nbsp;
        <span>{{userInfo.user_name?userInfo.user_name:userInfo.mobile}}</span>
      </P>
      <a class="el-icon-phone-outline">&nbsp;021-51991869</a>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: ['activeIndex'],
  data () {
    return {
      // activeIndex: 1,
      menus: [
        {
          title: '首页',
          url: 'home'
        },
        {
          title: '接单',
          url: 'orderTaking'
        },
        {
          title: '资讯',
          url: 'Information'
        }
      ],
      userInfo: null,
    }
  },
  created () {
    if (sessionStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }
  },
  methods: {
    switchNav (item, index) {
      // this.activeIndex = index
      this.$router.push(item.url)
    }
  }
}
</script>
