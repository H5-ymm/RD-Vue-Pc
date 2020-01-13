<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
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
      transitionName: 'slide-left'//默认动画
    }
  },
  created: function () {

  }
}
</script>

