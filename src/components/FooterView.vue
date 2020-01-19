<template>
  <el-footer height="320px" class="footer">
    <section class="home-main-section home-main-section-footer">
      <el-row :gutter="20" class="footer-main" type="flex" justify="start">
        <el-col :span="4">
          <ul class="home-footer-box">
            <li class="home-footer-title">企业服务</li>
            <li>公司搜索</li>
            <li>职位搜索</li>
            <li>新闻咨讯</li>
          </ul>
        </el-col>
        <el-col :span="12">
          <ul class="home-footer-box">
            <li class="home-footer-title">联系方式</li>
            <li>{{info.webname}}</li>
            <li>公司地址：{{info.address}}</li>
            <li>服务热线：{{info.customerTel}}（{{info.workTime}})</li>
            <li>违法和不良信息举报邮箱：{{info.owenerEmail}}</li>
          </ul>
        </el-col>
        <el-col :span="6" :offset="8">
          <ul class="home-footer-box home-footer-box1">
            <li class="home-footer-title">微信公众号</li>
            <li>
              <img src="../assets/img/qrcode.png" class="home-footer-img" />
            </li>
          </ul>
        </el-col>
      </el-row>
    </section>
  </el-footer>
</template>
<script>
import { getConfigInfo } from '@/api/home'
export default {
  data() {
    return {
      info:{}
    }
  },
  created () {
    this.getInfo()
  },
  methods:{
    getInfo(){
      getConfigInfo().then(res=>{
        console.log(res.data)
        this.info = res.data
      })
    },
  }
}
</script>
