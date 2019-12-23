<template>
  <el-dialog
    width="830px"
    title
    :visible.sync="dialogTableVisible"
    class="member-dialog"
    :show-close="false"
  >
    <div class="member-row team-info-box">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <img src="../../assets/img/member/cancel.png" class="member-col1-comLogo" alt />
        <P class="member-col1-comName">仁达网络科技团队</P>
        <p class="member-col1-time">申请日期：20192-20-202</p>
      </section>
      <section class="member-col3">
        <ul class="x-flex-between">
          <li class="team-info-card-row">
            <div class="team-info-card-item">
              <span>团队负责人</span>
              <span>杨萌萌</span>
            </div>
            <div class="team-info-card-item">
              <span>团队规模</span>
              <span>企业</span>
            </div>
            <div class="team-info-card-item">
              <span>成功接单</span>
              <span>2333</span>
            </div>
            <div class="team-info-card-item">
              <span>已推荐简历</span>
              <span>1222</span>
            </div>

            <div class="team-info-card-item x-flex-start">
              <span>团队地址</span>
              <span>上海市浦东新区金海路2588号</span>
            </div>
          </li>
          <li class="team-info-card-row">
            <div class="team-info-card-item">
              <span>团队性质</span>
              <span>团队负责人</span>
            </div>
            <div class="team-info-card-item">
              <span>注册日期</span>
              <span>2019-12-01 10:35</span>
            </div>
            <div class="team-info-card-item">
              <span>完成接单</span>
              <span>10单</span>
            </div>
            <div class="team-info-card-item">
              <span>已入职简历</span>
              <span>2000份</span>
            </div>
            <div class="team-info-card-item">
              <span>从事行业</span>
              <span>制造业</span>
            </div>
          </li>
        </ul>
        <ul class="x-flex-start">
          <li class="team-info-card-row team-info-card-row1">
            <div class="team-info-card-item x-flex-start">
              <span>团队介绍</span>
              <span>团队上到几点水电费暗色调发大师傅暗色调发了发放暗色调发阿道夫阿斯顿发是打发斯蒂芬阿斯顿发斯蒂芬阿斯顿发水电费。</span>
            </div>
          </li>
        </ul>
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
    &.team-info-box {
      .member-col1-comName {
        color: #333;
        font-size:18px;
        margin: 5px 0;
      }
      .member-col1-comLogo {
        width: 68px;
        height: 68px;
        border-radius: 50%;
      }
      .member-col1-time{
        color: #6A6A6A;
        font-size: 12px;
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
      .team-info-card-row {
        width: 50%;
        text-align: left;
        &.team-info-card-row1 {
          width: 100%;
          .team-info-card-item {
            span {
              margin-left: 30px;
              &:nth-of-type(2) {
                margin-left:0;
              }
            }
          }
        }
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

