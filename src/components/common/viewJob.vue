<template>
  <el-dialog
    width="830px"
    title
    :visible.sync="dialogTableVisible"
    class="member-dialog"
    :show-close="false"
  >
    <div class="member-row job-info-box">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <div class="member-col1-box x-flex-between">
          <div>
            <P class="member-col1-jobName">仁达网络科技团队</P>
            <p class="member-col1-text">
              <span class="member-col1-status">招聘中</span>
              职位类别
            </p>
          </div>
          <div class="member-col1-text">发布时间：2019-12-01 15:32</div>
        </div>
      </section>
      <section class="member-col3">
        <div class="member-col3-box">
          <p class="member-col3-title">接单详情</p>
          <ul class="x-flex-between">
            <li class="team-info-card-row">
              <div class="team-info-card-item">
                <span>需求人数</span>
                <span>100人</span>
              </div>
              <div class="team-info-card-item">
                <span>年龄</span>
                <span>2333</span>
              </div>
              <div class="team-info-card-item">
                <span>性别</span>
                <span>16-56周岁</span>
              </div>
              <div class="team-info-card-item x-flex-start">
                <span>工作地址</span>
                <span>河南-郑州市-金水区</span>
              </div>
            </li>
            <li class="team-info-card-row">
              <div class="team-info-card-item">
                <span>月薪</span>
                <span>5-6k</span>
              </div>
              <div class="team-info-card-item">
                <span>缴纳五险</span>
                <span>试用期后</span>
              </div>
              <div class="team-info-card-item">
                <span>缴纳公积金</span>
                <span>是</span>
              </div>
              <div class="team-info-card-item">
                <span>要求学历</span>
                <span>高中以下</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="member-col3-box">
          <p class="member-col3-title">返利详情</p>
          <ul class="x-flex-between">
            <li class="team-info-card-row">
              <div class="team-info-card-item">
                <span>返利方式</span>
                <span>月返</span>
              </div>
              <div class="team-info-card-item">
                <span>结算时间</span>
                <span>次月22号结算</span>
              </div>
            </li>
            <li class="team-info-card-row">
              <div class="team-info-card-item">
                <span>返利金额</span>
                <span>500元/人/月</span>
              </div>
              <div class="team-info-card-item">
                <span>返利时长</span>
                <span>持续返利2个月</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="member-col3-box">
          <p class="member-col3-title">职位描述</p>
          <div class="member-col3-detail">团队上到几点水电费暗色调发大师傅暗色调发了发放暗色调发阿道夫阿斯顿发是打发斯蒂芬阿斯顿发斯蒂芬阿斯顿发水电费。</div>
        </div>
      </section>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTableVisible: false
  },
  data () {
    return {

    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="scss">
.member-dialog {
  box-shadow:0px 1px 43px 0px rgba(51,51,51,0.3);
  border-radius:5px;
  .el-dialog__body,.el-dialog__header {
    padding: 0;
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
        font-size:24px;
        margin: 10px 0;
      }
      .member-col1-text{
        color: #6A6A6A;
        font-size: 12px;
      }
      .member-col1-status {
        background: #61BC74;
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
        .team-info-card-item {
          line-height: 36px;
          span {
            display: inline-block;
            width: 100px;
            text-align: right;
            margin-right: 30px;
            font-size: 14px;
            color: #6A6A6A;
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
      font-size:14px;
      color: #6A6A6A;
      .select-num {
        color: #1890FF;
      }
    }
  }
}
</style>

