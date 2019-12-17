<template>
  <el-dialog
    width="500px"
    :visible="dialogTableVisible"
    center
    class="member-dialog record-dialog"
    :show-close="false"
  >
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>跟进记录</p>
      </section>
      <section class="resume-col3">
        <ul>
          <li v-for="(item,index) in list" :key="index" class="record-item">
            <p class="record-time">{{$moment(item.addtime).format('YYYY-MM-DD')}}</p>
            <el-divider>
              <img src="../../assets/img/icon9.png" class="line-icon" alt />
            </el-divider>
            <p class="record-title">{{item.title}}</p>
            <div class="record-content">{{item.title}}</div>
            <p class="record-footer">{{$moment(item.addtime).format('HH:mm:ss')}}</p>
          </li>
        </ul>
        <div class="resume-btn">
          <el-button @click="handleClose">返回顶部</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </section>
    </div>
    <div slot="footer" class="resume-footer-btn x-flex-center">
      <el-button type="text" @click="show=true">添加跟进记录</el-button>
      <img src="../../assets/img/icon10.png" alt />
    </div>
    <transition name="el-zoom-in-bottom">
      <div v-show="show" class="transition-box">
        <el-button @click="show=false" type="text" class="transition-close">收起</el-button>
        <div class="record-submit">
          <p>添加跟进记录</p>
          <el-input
            type="textarea"
            :autosize="{ minRows: 4}"
            placeholder="请输入跟进记录"
            v-model="reason"
          ></el-input>
          <div class="resume-btn">
            <el-button @click="show=false,reason=''">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </div>
      </div>
    </transition>
  </el-dialog>
</template>
<script>
// 部门经理只能编辑状态
// 成员只能查看
// 总经理可以编辑部门 职称 状态

export default {
  props: ['dialogTableVisible', 'trackList'],
  data () {
    return {
      reason: '',
      list: [
        {
          title: '跟进记录',
          addtime: 1576569206,
          id: 7,
          operator: "人才推荐",
          reason: "",
          remark: "内部推送职位",
          resume_id: 2,
          uid: 6,
        },
        {
          title: '跟进记录',
          addtime: 1576569206,
          id: 7,
          operator: "人才推荐",
          reason: "",
          remark: "内部推送职位",
          resume_id: 2,
          uid: 6,
        }
      ],
      show: false
    }
  },
  created () {

  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    submitForm () {
      this.$emit('submitRecord', this.reason)
    },
    save () {
      this.show = false
    }
  }
}
</script>
<style lang="scss">
.member-dialog {
  box-shadow:0px 1px 43px 0px rgba(51,51,51,0.3);
  border-radius:5px;
  &.record-dialog {
    .el-dialog__footer {
      padding: 0;
    }
    .resume-footer-btn {
      border-top:1px solid #E8E8E8;
      box-shadow:1px -2px 5px 0px rgba(106,106,106,0.1);
      border-radius:0px 0px 5px 5px;
      width: 100%;
      height: 30px;
    }
    .transition-box {
      height: 225px;
      width: 100%;
      border-top:1px solid #E8E8E8;
      box-shadow:1px -2px 5px 0px rgba(106,106,106,0.1);
      border-radius:0px 0px 5px 5px;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 22;
      background: #fff;
      overflow: hidden;
      .transition-close {
        float: right;
        margin: 6px 0;
      }
      .record-submit {
        width: 82%;
        margin: 20px auto;
      }
    }
  }
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
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .resume-col3 {
      width: 82%;
      border-top: 1px solid #eee;
      padding-top: 20px;
      margin: 0 auto;
      .record-item {
        margin-bottom: 10px;
      }
      .record-time {
        color: #333;
      }
      .record-title {
        color: #333;
        font-weight: bold;
        font-size:16px;
        text-align: left;
      }
      .el-divider--horizontal {
        margin: 20px 0;
      }
      .el-divider {
        background-color: #1890FF;
      }
      .el-divider__text {
        padding: 0;
      }
      .record-content {
        margin: 20px 0;
        text-align: left;
        color: #333333;
      }
      .record-footer {
        text-align: right;
        color: #999999;
        font-size: 12px;
      }
    }
  }
  .resume-card {   
    .resume-main-title {
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      >img {
        width: 20px;
        margin-right: 10px;
      }
    }
    .resume-card-row {
      margin: 20px 0 0 -15px;
       .resume-card-item {
        width: 50%;

        text-align: left;
        &:nth-child(2) {
          .el-form-item {
            padding-left: 55px;
            margin-right:0;
          }
        } 
      }
      .resume-address {
        position: absolute;
        top: 0;
        right: -310px;
      }
      .el-form-item__error{
        top:-50%;
      }
    }  
  }
  .resume-btn {
    text-align: right;
    margin: 20px 0;
    .el-button {
      border-radius: 3px;
      margin-left: 20px;
    }
  }
}
</style>