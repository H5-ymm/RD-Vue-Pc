<style lang="scss">
.member-dialog {
  box-shadow: 0px 1px 43px 0px rgba(51, 51, 51, 0.3);
  border-radius: 5px;
  .el-dialog__body,
  .el-dialog__header {
    padding: 0;
  }
  .member-col1 {
    background: #ebf4fb;
    padding: 21px 0 20px;
  }
  .member-row {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #333333;
    padding: 0 0 10px;
    position: relative;
    .member-col1-box {
      width: 82%;
      margin: 0 auto;
    }
    &.job-info-box {
      .member-col1-jobName {
        color: #333;
        font-size: 24px;
        margin: 10px 0;
        text-align: left;
      }
      .member-col1-text {
        color: #6a6a6a;
        font-size: 12px;
      }
      .member-col1-status {
        background: #61bc74;
        color: #fff;
        font-size: 12px;
        padding: 4px 14px;
        border-radius: 11px;
      }
    }
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .member-col3 {
      width: 82%;
      border-top: 1px solid #eee;
      padding-top: 10px;
      margin: 0 auto;
      .member-col3-box {
        margin-bottom: 20px;
        .team-info-card-row {
          .team-info-card-item {
            span {
              width: 85px;
            }
          }
        }
        .member-col3-detail {
          margin: 15px;
          text-align: left;
        }
      }
      .team-info-card-row {
        width: 50%;
        text-align: left;
        margin-top: 10px;
        .team-info-card-item {
          line-height: 36px;
          span {
            display: inline-block;
            width: 100px;
            text-align: right;
            margin-right: 30px;
            font-size: 14px;
            color: #6a6a6a;
            &:nth-of-type(2) {
              text-align: left;
              color: #333;
              width: auto;
              margin-right: 0;
            }
          }
        }
      }
      .member-col3-title {
        color: #333;
        font-weight: bold;
        font-size: 18px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        padding-left: 15px;
        text-align: left;
      }
    }
  }
  .dialog-footer {
    margin-right: 0;
    width: 92%;
    margin: 0 auto;
    .select-text {
      font-size: 14px;
      color: #6a6a6a;
      .select-num {
        color: #1890ff;
      }
    }
  }
}
</style>


<template>
  <el-dialog width="830px" title :visible.sync="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row job-info-box">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <div class="member-col1-box x-flex-between">
          <div>
            <P class="member-col1-jobName">{{jobInfo.name}}</P>
            <p class="member-col1-text">
              <span class="member-col1-status" v-if="jobInfo.status==2">{{jobInfo.job_status==1?'招聘中':'已下架'}}</span>
              <span class="member-col1-status" v-else>{{jobInfo.status==1?'审核中':'未通过'}}</span>
              <span> {{jobInfo.job_type}}</span>
            </p>
          </div>
          <div class="member-col1-text">发布时间：{{jobInfo.ctime?$moment.unix(jobInfo.ctime).format('YYYY-MM-DD HH:mm'):'--'}}</div>
        </div>
      </section>
      <section class="member-col3">
        <div class="member-col3-box">
          <p class="member-col3-title">接单详情</p>
          <ul class="x-flex-start-between">
            <li class="team-info-card-row">
              <div class="team-info-card-item">
                <span>需求人数</span>
                <span>{{jobInfo.required_number}}人</span>
              </div>
              <div class="team-info-card-item">
                <span>年龄</span>
                <span>{{jobInfo.min_age}}-{{jobInfo.max_age}}</span>
              </div>
              <div class="team-info-card-item">
                <span>性别</span>
                <span>{{jobInfo.sex==1?'男':jobInfo.sex==2?'女':'男女不限'}}</span>
              </div>
              <div class="team-info-card-item x-flex-start">
                <span>工作地址</span>
                <span>{{jobInfo.provinceName}}{{jobInfo.cityName}}{{jobInfo.aresName}}{{jobInfo.address}}</span>
              </div>
            </li>
            <li class="team-info-card-row">
              <div class="team-info-card-item">
                <span>{{jobInfo.money_type==1?'月薪':jobInfo.money_type==2?'日薪':'时薪'}}</span>
                <span v-if="jobInfo.money_type==1">{{jobInfo.money_min}} ~ {{jobInfo.money_max}}</span>
                <span v-else>{{jobInfo.money}}</span>
              </div>
              <div class="team-info-card-item">
                <span>缴纳五险</span>
                <span>{{jobInfo.is_five_risks==1?'是':jobInfo.is_five_risks==2?'否':'试用期后'}}</span>
              </div>
              <div class="team-info-card-item">
                <span>缴纳公积金</span>
                <span>{{jobInfo.is_fund==1?'是':jobInfo.is_fund==2?'否':'试用期后'}}</span>
              </div>
              <div class="team-info-card-item">
                <span>要求学历</span>
                <span>{{jobInfo.educationName}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="member-col3-box">
          <p class="member-col3-title">返利详情</p>
          <ul class="x-flex-start">
            <li class="team-info-card-row">
              <div class="team-info-card-item">
                <span>返利方式</span>
                <span>{{getRewardType(jobInfo.reward_type)}}</span>
              </div>
              <div class="team-info-card-item" v-if="jobInfo.reward_type==1">
                <span>结算时间</span>
                <span v-if="jobInfo.settlement_time">次月{{jobInfo.settlement_time}}号结算</span>
                <span v-else>次月第一天结算</span>
              </div>
              <div class="team-info-card-item" v-else>
                <span>结算时间</span>
                <span v-if="jobInfo.reward_money_type!=1">{{jobInfo.settlement_type==1?'本':'次'}}{{jobInfo.reward_money_type==1?'天':jobInfo.reward_money_type==2?'周': '月'}}{{jobInfo.settlement_time?jobInfo.settlement_time:'第一天'}}结算</span>
                <span v-else>{{jobInfo.settlement_type==1?'当日':'次日'}}结算</span>
              </div>
              <div class="team-info-card-item" v-if="jobInfo.reward_type==2||jobInfo.reward_type==3">
                <span>持续时长</span>
                <span v-if="jobInfo.duration_time">{{jobInfo.duration_time}}{{jobInfo.reward_money_type==1?'天':jobInfo.reward_money_type==2?'周': '月'}}</span>
                <span v-else>一{{jobInfo.reward_money_type==1?'天':jobInfo.reward_money_type==2?'周': '个月'}}</span>
              </div>
              <div class="team-info-card-item" v-if="jobInfo.reward_type==4">
                <span>需入职满</span>
                <span v-if="jobInfo.reward_needtime">{{jobInfo.reward_needtime}}{{jobInfo.reward_money_type==1?'天':jobInfo.reward_money_type==2?'周': '月'}}</span>
                <span v-else>一天</span>
              </div>
            </li>
            <li class="team-info-card-row">
              <div class="team-info-card-item">
                <span>返利金额</span>
                <span>{{jobInfo.reward_money}}元/人/{{rewardMoney}}</span>
              </div>
              <div class="team-info-card-item" v-if="jobInfo.reward_type==1">
                <span>返利时长</span>
                <span v-if="jobInfo.reward_money_type==1">长期返利</span>
                <span v-if="jobInfo.reward_money_type==2&&jobInfo.duration_time">持续返利{{jobInfo.duration_time}}个月</span>
                <span v-if="jobInfo.reward_money_type==2&&!jobInfo.duration_time">一{{jobInfo.reward_money_type==1?'天':jobInfo.reward_money_type==2?'周': '个月'}}</span>
                <span v-if="jobInfo.reward_money_type==3&&!jobInfo.duration_time">一{{jobInfo.reward_money_type==1?'天':jobInfo.reward_money_type==2?'周': '个月'}}</span>
              </div>
              <div class="team-info-card-item" v-if="jobInfo.reward_type==2||jobInfo.reward_type==3||jobInfo.reward_type==4">
                <span>需入职满</span>
                <span v-if="jobInfo.reward_needtime">{{jobInfo.reward_needtime}}{{jobInfo.reward_money_type==1?'天':jobInfo.reward_money_type==2?'周': '个月'}}</span>
                <span v-else>一天</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="member-col3-box">
          <p class="member-col3-title">职位描述</p>
          <div class="member-col3-detail" v-html="jobInfo.job_content"></div>
        </div>
      </section>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { invoiceInfo } from '@/api/orderTarking'
export default {
  props: ['dialogTableVisible', 'id'],
  data() {
    return {
      jobInfo: {}
    }
  },
  created() {},
  computed: {
    rewardMoney() {
      if (this.id) {
        return this.jobInfo.money_type == 1
          ? '月'
          : this.jobInfo.money_type == 2
            ? '日'
            : '时'
      }
    }
  },
  watch: {
    id(val) {
      if (val) {
        let params = {
          id: val,
          uid: localStorage.getItem('uid')
        }
        invoiceInfo(params).then(res => {
          this.jobInfo = res.data
        })
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    getRewardType (type) {
      let text = ''
      if (type == 1) {
        text = '月返'
      } else if (type == 2) {
        text = '日返'
      } else if (type == 3) {
        text = '时返'
      } else {
        text = '一次性返利'
      }
      return text
    }
  }
}
</script>

