<style lang="scss">
.job-detail-view{
  border-radius:10px;
  background: #fff;
 .member-row {
    width: 100%;
    margin: 0 auto 75px;
    text-align: center;
    color: #333333;
    padding-bottom: 20px;
    .resume-col3 {
      width: 100%;
      border-top: 1px solid #eee;
      padding-top: 10px;
      margin: 0 auto;
      .demo-form-inline {
        width: 96%;
        margin: 15px auto;
      }
    }
  }
  .resume-info-card {
    line-height: 25px;
    .resume-card {
      margin-bottom: 20px;
      .resume-col1 {
        color: #6A6A6A;
        width: 100px;
        text-align: right;
        margin-right: 20px;
      }
      p {
        &:nth-of-type(2) {
          width: 378px;
          line-height: 28px;
        }
      }
      .resume-card-row {
        margin: 10px 0;
      }
    }
  }
  .resume-card {
    .resume-main-title {
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      >img {
        width: 20px;
        margin-right: 12px;
      }
    }
    .resume-card-row {
      margin: 20px 0 0 -15px;
       .resume-card-item {
        width: 50%;
        text-align: left;
        font-size: 14px;
        &.view-resume-item {
          width: 100%;
        }
      }
    }
    .company-info-box {
      text-align: center;
      >img {
        width: 80px;
        height: 80px;
        border-radius: 100%;
        margin: 0 auto 10px;
      }
      p {
        color: #333;
        font-size: 18px;
      }
    }
  }
  .resume-footer-btn {
    margin-left: 130px;
    text-align: left;
    .el-button {
      border-radius: 3px;
      margin-right: 20px;
    }
  }
}
</style>

<template>
  <div class="job-detail-view">
    <div class="member-row">
      <section class="resume-col3">
        <div class="demo-form-inline resume-info-card">
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/receipt/icon1.png" />
              <span>岗位信息</span>
            </p>
            <div class="resume-card-row x-flex-start">
              <div class="resume-card-item">
                <div class="x-flex-start">
                  <p class="resume-col1">岗位名称</p>
                  <p>{{formMember.name}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">用工企业名称</p>
                  <p>{{formMember.age}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">招聘人数</p>
                  <p>{{formMember.sex==1?'男':'女'}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">招工截止日期</p>
                  <p>{{formMember.mobile}}</p>
                </div>
              </div>
              <div class="company-info-box">
                <img src="../../assets/img/icon8.png" alt />
                <p>仁达网络科技（上海）有限公司</p>
              </div>
            </div>
          </section>
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/receipt/icon2.png" />
              <span>薪资说明</span>
            </p>
            <div class="resume-card-row">
              <div class="resume-card-item">
                <div class="x-flex-start">
                  <p class="resume-col1">综合薪资</p>
                  <p>{{formMember.name}}仁达网络科技（上海）有限公司仁达网络科技（上海</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">薪资说明</p>
                  <p class="x-flex-start">{{formMember.name}}</p>
                </div>
              </div>
            </div>
          </section>
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/receipt/icon3.png" />
              <span>岗位说明</span>
            </p>
            <div class="resume-card-row">
              <div class="resume-card-item">
                <div class="x-flex-start">
                  <p class="resume-col1">工作地址</p>
                  <p>{{formMember.name}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">工作时长</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">入职条件</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">工作内容</p>
                  <p>{{formMember.remark}}</p>
                </div>
              </div>
            </div>
          </section>
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/receipt/icon4.png" />
              <span>其他说明</span>
            </p>
            <div class="resume-card-row">
              <div class="resume-card-item">
                <div class="x-flex-start">
                  <p class="resume-col1">性别要求</p>
                  <p>{{formMember.name}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">年龄要求</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">缴纳五险</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">缴纳公积金</p>
                  <p>{{formMember.money}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">企业介绍</p>
                  <p>1012-12-01</p>
                </div>
              </div>
            </div>
          </section>
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/receipt/icon5.png" />
              <span>返利规则</span>
            </p>
            <div class="resume-card-row">
              <div class="resume-card-item view-resume-item">
                <div class="x-flex-start">
                  <p class="resume-col1">招聘类型</p>
                  <p>{{formMember.name}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">返利模式</p>
                  <p>{{formMember.address}}</p>
                </div>
              </div>
            </div>
          </section>
          <section class="resume-card">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/receipt/icon6.png" />
              <span>运营信息</span>
            </p>
            <div class="resume-card-row">
              <div class="resume-card-item">
                <div class="x-flex-start">
                  <p class="resume-col1">岗位类型</p>
                  <p>{{formMember.name}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">岗位来源</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">合作商务姓名</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">期望岗位</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">合作商务电话</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">面试时间</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">面试地址</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">发单负责人</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">负责人电话</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">指定招聘人</p>
                  <p>{{formMember.address}}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <div class="resume-footer-btn">
        <el-button type="primary" @click="$router.go(-1)">关闭</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formMember: {},
      id: ''
    }
  },
  created () {
    this.id = this.$route.query.id
  }
}
</script>

