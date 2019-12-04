<template>
  <div class="about">
    <el-container>
      <el-aside width="210px" class="about-aside">
        <home-aside></home-aside>
      </el-aside>
      <el-container>
        <el-header height="90px">
          <div style="height:37px;">header</div>
          <breadcrumb :breadcrumbs="breadcrumb"></breadcrumb>
        </el-header>
        <el-main class="about-main">
          <router-view class="about-box"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import homeAside from '@/components/Aside' //侧边栏
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
export default {
  name: 'team',
  data () {
    return {
      breadcrumb: ['评论管理', '文章评论'],
    }
  },
  components: {
    homeAside,
    Breadcrumb
  },
  computed: {

  },
  created: function () {  //验证Token
    //         let token=null
    //         if(window.localStorage.getItem('token')){
    //           token=window.localStorage.getItem('token')
    //         }else if(window.sessionStorage.getItem('token')){
    //           token=window.sessionStorage.getItem('token')
    //         }else{
    //           token=null
    //         }
    //      // console.log(token)

    // if(token){
    //      this.$http({
    //           url:'rulesToken',
    //           methos: 'POST',
    //           headers:{
    //             'Authorization':token
    //           }
    //         }).then(res=>{

    //           if(res.data.code==0){

    //               this.$store.commit('adduser',res.data.msg)
    //           }else{
    //              //console.log(res.data.msg)
    //           }
    //         }).catch(error=>{
    //           console.log('error')
    //         })
    // }

  }
}
</script>

<style scoped>
.about{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.about-aside{
  height: 100vh;
  overflow: hidden;
}
.about-main{
  height: 100vh;
  overflow: hidden;
  background: #F0F2F5;
  padding: 10px 30px;
  box-sizing: border-box;
}
.about-box{
  /* background: #ffffff; */
  height: calc(100% - 20px);
  /* padding: 10px; */
}
</style>
