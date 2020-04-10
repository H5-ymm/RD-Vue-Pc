<style lang="scss">
@import '@/assets/css/modal.scss';
</style>
<template>
  <el-dialog width="500px" top="8vh" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>查看员工</p>
      </section>
      <div class="staff-detail-row">
        <section class="resume-col3">
          <el-form :model="formMember" ref="formMember" class="demo-form-inline" label-position="right" label-width="80px">
            <section class="resume-card">
              <p class="resume-main-title x-flex-start-justify">
                <img src="../../assets/img/icon7.png" />
                <span>基本信息</span>
              </p>
              <div class="resume-card-row">
                <div class="resume-card-item">
                  <div class="x-flex-around">
                    <p>姓名</p>
                    <p>{{formMember.name}}</p>
                  </div>
                  <div class="x-flex-around">
                    <p>手机号码</p>
                    <p>{{formMember.mobile}}</p>
                  </div>
                  <div class="x-flex-around">
                    <p>身份证号</p>
                    <p>{{formMember.idcard}}</p>
                  </div>
                  <div class="x-flex-around">
                    <p>性别</p>
                    <p>{{formMember.sex==1?'男':'女'}}</p>
                  </div>
                  <div class="x-flex-around">
                    <p>学历</p>
                    <p>{{formMember.edu}}</p>
                  </div>
                  <div class="x-flex-around">
                    <p>详细地址</p>
                    <p>
                      {{formMember.provinceName}}{{formMember.cityName}}
                      <br />{{formMember.address}}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section class="resume-card">
              <p class="resume-main-title x-flex-start-justify">
                <img src="../../assets/img/receipt/icon3.png" />
                <span>岗位信息</span>
              </p>
              <div class="resume-card-row">
                <div class="resume-card-item">
                  <div class="x-flex-around">
                    <p>岗位</p>
                    <p class="x-flex-start">服务员</p>
                  </div>
                </div>
              </div>
            </section>
          </el-form>
        </section>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { selectCompanyResumeInfo } from '@/api/staff'
export default {
  props: ['dialogTableVisible', 'staffId'],
  data() {
    return {
      formMember: {}
    }
  },
  watch: {
    staffId(val) {
      if (val) {
        this.getInfo()
      }
    }
  },
  methods: {
    getInfo() {
      let params = {
        uid: localStorage.getItem('uid'),
        id: this.staffId
      }
      selectCompanyResumeInfo(params)
        .then(res => {
          this.formMember = res.data
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    handleClose() {
      this.$emit('handleClose')
    }
  }
}
</script>
