<style lang="scss">
.job-detail-view {
  border-radius: 10px;
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
        color: #6a6a6a;
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
      > img {
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
      > img {
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
                  <p>{{formMember.job_name}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">用工企业名称</p>
                  <p>{{formMember.company_name}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">招聘人数</p>
                  <p>{{formMember.number}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.offtime">
                  <p class="resume-col1">招工截止日期</p>
                  <p>{{formMember.offtime}}</p>
                </div>
              </div>
              <div class="company-info-box" v-if="formMember.company_logo">
                <img src="../../assets/img/headIcon2.png" v-if="!formMember.company_logo" alt />
                <p>{{formMember.company_name}}</p>
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
                  <p v-if="formMember.offermoney_type==1">{{formMember.money_min}} ~ {{formMember.money_max}} / {{formMember.offermoney_type==1?'月':formMember.offermoney_type==2?'日':'时'}}</p>
                  <p v-else>{{formMember.offermoney?formMember.offermoney:0}}/{{formMember.offermoney_type==1?'月':formMember.offermoney_type==2?'日':'时'}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.welfare_statement">
                  <p class="resume-col1">薪资说明</p>
                  <p class="x-flex-start">{{formMember.welfare_statement}}</p>
                </div>
              </div>
            </div>
          </section>
          <section class="resume-card" v-if="!jobStatus">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/receipt/icon3.png" />
              <span>岗位说明</span>
            </p>
            <div class="resume-card-row">
              <div class="resume-card-item">
                <div class="x-flex-start" v-if="formMember.address">
                  <p class="resume-col1">工作地址</p>
                  <p>{{formMember.address}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.working_hours">
                  <p class="resume-col1">工作时长</p>
                  <p>{{formMember.working_hours}}</p>
                </div>
                <div class="x-flex-start">
                  <p class="resume-col1">入职条件</p>
                  <p>{{formMember.entry_requirements}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.job_description">
                  <p class="resume-col1">工作内容</p>
                  <p>{{formMember.job_description}}</p>
                </div>
              </div>
            </div>
          </section>
          <section class="resume-card" v-if="!otherInfoStatus">
            <p class="resume-main-title x-flex-start-justify">
              <img src="../../assets/img/receipt/icon4.png" />
              <span>其他说明</span>
            </p>
            <div class="resume-card-row">
              <div class="resume-card-item">
                <div class="x-flex-start" v-if="formMember.sex">
                  <p class="resume-col1">性别要求</p>
                  <p>{{formMember.sex==1?'男':formMember.sex==2?'女':'男女不限'}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.age_min">
                  <p class="resume-col1">年龄要求</p>
                  <p>{{formMember.age_min}}~{{formMember.age_max}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.five_risks">
                  <p class=" resume-col1">缴纳五险</p>
                  <p>{{formMember.five_risks==1?'是':formMember.sex==2?'否 ':'试用期后'}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.reserve_fund">
                  <p class="resume-col1">缴纳公积金</p>
                  <p>{{formMember.reserve_fund==1?'是':formMember.sex==2?'否 ':'试用期后'}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.com_introduction">
                  <p class="resume-col1">企业介绍</p>
                  <p>{{formMember.com_introduction}}</p>
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
                  <p>{{formMember.type==1?'返利招聘':'普通招聘'}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.type==1">
                  <p class="resume-col1">返利模式</p>
                  <p v-if="formMember.reward_type==1">
                    <span>{{formMember.reward_money}}元/人/{{rewardType}}</span>
                    -
                    <span>次月{{formMember.settlement_time}}号结算</span>
                    -
                    <span v-if="formMember.reward_money_type==1">长期返利</span>
                    <span v-if="formMember.reward_money_type==2&&formMember.duration_time">持续返利{{jobInfo.duration_time}}个月</span>
                    <span v-if="formMember.reward_money_type==2&&!formMember.duration_time">一{{jobInfo.reward_money_type==1?'天':jobInfo.reward_money_type==2?'周': '个月'}}</span>
                  </p>
                  <p v-if="formMember.reward_type!=1&&formMember.reward_type!=4">
                    <span>{{formMember.reward_money}}元/人/{{rewardType}}</span>
                    -
                    <span v-if="formMember.reward_money_type!=1">{{formMember.settlement_type==1?'本':'次'}}{{rewaryMoneType}}{{formMember.settlement_time?formMember.settlement_time:'第一天'}}结算</span>
                    <span v-else>{{formMember.settlement_type==1?'当日':'次日'}}结算</span>
                    -
                    <span v-if="formMember.duration_time">{{formMember.duration_time}}{{rewaryMoneType}}</span>
                    <span v-else>一{{rewaryMoneType}}</span>
                    <span v-if="formMember.reward_needtime">需入职满 {{formMember.reward_needtime}}{{rewaryMoneType}}</span>
                    <span v-else>需入职满 一天</span></span>
                  </p>
                  <p v-if="formMember.reward_type==4">
                    <span>{{formMember.reward_money}}元/人/一次性</span>
                    -
                    <span v-if="formMember.reward_money_type==2&&!formMember.duration_time">需入职满 {{formMember.reward_needtime}}</span>
                  </p>
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
                  <p v-if="formMember.setinfo&&formMember.setinfo.job_type">{{formMember.setinfo.job_type|positionStatus}}</p>
                  <p v-else>普通岗位</p>
                </div>
                <div class="x-flex-start" v-if="formMember.setinfo&&formMember.setinfo.source">
                  <p class="resume-col1">岗位来源</p>
                  <p>{{formMember.setinfo.source}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.setinfo&&formMember.setinfo.work_man">
                  <p class="resume-col1">合作商务姓名</p>
                  <p>{{formMember.setinfo.work_man}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.setinfo&&formMember.setinfo.work_tel">
                  <p class="resume-col1">合作商务电话</p>
                  <p>{{formMember.setinfo.work_tel}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.setinfo&&formMember.setinfo.meeting_time">
                  <p class="resume-col1">面试时间</p>
                  <p>{{formMember.setinfo.meeting_time}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.setinfo&&formMember.setinfo.meeting_addr">
                  <p class="resume-col1">面试地址</p>
                  <p>{{formMember.setinfo.meeting_addr}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.setinfo&&formMember.setinfo.link_man">
                  <p class="resume-col1">发单负责人</p>
                  <p>{{formMember.setinfo.link_man}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.setinfo&&formMember.setinfo.link_tel">
                  <p class="resume-col1">负责人电话</p>
                  <p>{{formMember.setinfo.link_tel}}</p>
                </div>
                <div class="x-flex-start" v-if="formMember.setinfo&&formMember.setinfo.is_assign==1">
                  <p class="resume-col1">指定招聘人</p>
                  <p>{{formMember.setinfo.assign_uids}}</p>
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
import { getJobinfo } from '@/api/internalInvoice'
import { positionStatusList } from '@/base/base'
export default {
  filters: {
    positionStatus(val) {
      let obj = positionStatusList.find(item => {
        return val == item.value
      })
      return obj ? obj.label : '--'
    }
  },
  data() {
    return {
      formMember: {},
      id: '',
      positionStatusList
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getInfo(this.id)
  },
  computed: {
    jobStatus() {
      return (
        !this.formMember.address &&
        !this.formMember.working_hours &&
        !this.formMember.entry_requirements &&
        !this.formMember.job_description
      )
    },
    otherInfoStatus() {
      return (
        !this.formMember.sex &&
        !this.formMember.age_min &&
        !this.formMember.five_risks &&
        !this.formMember.reserve_fund &&
        !this.formMember.com_introduction
      )
    },
    rewardType() {
      let text
      if (this.formMember.reward_type == 1) {
        text = '月'
      }
      if (this.formMember.reward_type == 1) {
        text = '日'
      }
      if (this.formMember.reward_type == 1) {
        text = '时'
      }
      return text
    },
    rewaryMoneType() {
      let text
      if (this.formMember.reward_money_type == 1) {
        text = '天'
      }
      if (this.formMember.reward_money_type == 1) {
        text = '周'
      }
      if (this.formMember.reward_money_type == 1) {
        text = '个月'
      }
      return text
    }
  },
  methods: {
    getInfo(id) {
      getJobinfo({ id })
        .then(res => {
          this.formMember = res.data
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    }
  }
}
</script>

