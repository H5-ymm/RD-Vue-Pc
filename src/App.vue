<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isRouterAlive" />
    </keep-alive>
  </div>
</template>
<style scoped>

#app{
 width: 100%;
  
} 
</style>

<script>
export default {
  data () {
    return {
      token: '',
      isRouterAlive: true,
      transitionName: 'slide-left'//默认动画
    }
  },
  provide: function () {
    return {
      reload: this.reload
    }
  },
  created: function () {
   
  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      // 该方法会在dom更新后执行
      this.$nextTick(function () {
        this.isRouterAlive = true
        console.log('刷新成功')
      })
    }
  },
}
</script>

