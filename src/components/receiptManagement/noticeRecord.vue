<template>
  <el-dialog width="380px" :visible="dialogTableVisible"  class="receipt-dialog" :show-close="false">
    <div class="receipt-row record-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>
          通知记录
          <span class="subTitle">不要忘了面试人员哦~~</span>
        </p>
      </section>
      <section class="member-col3">
        <div v-for="(item, index) in list" :key="index" class="member-col3-box">
          <div class="member-col3-title">
            <p>
              面试时间：{{$moment.unix(item.time).format('HH:ss')}}        
              <span>{{$moment.unix(item.time).format('YYYY-MM-DD')}} </span>
            </p>
            <p class="notice-content">通知内容：{{item.content}}</p>
          </div>
          <div v-for="(val, ind) in item.data" :key="ind" class="x-flex-start-justify member-col3-content">
            <p class="name">{{val.name}}</p>
            <p class="info">
              <span>{{val.age}}岁</span>
              <span>{{val.sex==2?'男':'女'}} </span>
              {{val.eduName}}</p>
          </div>
        </div>
      </section>
    </div>
  </el-dialog>
</template>
<script>
import { noticeRecord } from '@/api/receipt'
export default {
  props: ['dialogTableVisible', 'id'],
  data() {
    return {   
      uid: localStorage.getItem('uid'),
      list: []
    }
  },
  created() {
    this.getTimeInfo(this.id)
  },
  methods: {
    getTimeInfo(id) {
      let params = {
        uid: this.uid,
        jobId: id
      }
      noticeRecord(params)
        .then(res => {
          this.list = res.data.data || []
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    handleClose() {
      this.$emit('handleClose')
    }
  }
}
</script>
<style lang="scss">
.receipt-dialog {
  box-shadow: 0px 1px 43px 0px rgba(51, 51, 51, 0.3);
  border-radius: 5px;
  .el-dialog__body,
  .el-dialog__header {
    padding: 0;
  }
  .switch-box {
    margin: 20px auto;
    width: 80%;
    .el-button{
      padding: 11px 50px;
      border-radius: 5px;
    }
  }
  .qrcode {
    width:300px;
    height:297px;
  }
  .record-row {
    width: 100%;
    text-align: center;
    color: #333333;
    position: relative;
    height: 500px;
    border-radius: 10px;
    overflow: hidden;
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .member-col1 {
      background: #ebf4fb;
      padding: 18px 0 17px;
      .subTitle {
        font-size: 14px;
        margin-left: 20px;
      }
    }
    .member-col3 {
      width: 100%;
      height: 400px;
      overflow: auto;
      border-top: 1px solid #eee;
      padding: 10px 0 20px;
      .member-col3-box{
        text-align: left;
        .member-col3-title {
          padding: 10px 18px;
          position: relative;
          &::before {
            position: absolute;
            height: 12px;
            width: 3px;
            content:'';
            background: #1890FF;
            top: 22%;
            left: 10px;
            border-radius: 2px;
          }
          span {
            font-size: 13px;
          }
          .notice-content {
            color: #6a6a6a;
            margin-top: 5px;
          }
        }
        .member-col3-content {
          margin: 0 20px;
          p {
            padding: 8px 0;
          }
          .name {
            font-size: 16px;
          }
          border-bottom:1px dotted rgba(204,204,204,.2);
          &:nth-last-of-type(1) {
            border-bottom: none;
          }
          .info {
            margin-left: 30px;
            font-size: 13px;
            color: #6a6a6a;
            span {
              // color: #1890FF;
              position: relative;
              display: inline-block;
              margin-right: 16px;
              // &::after {
              //   content: '';
              //   width:4px;
              //   height: 4px;
              //   border-radius: 50%;
              //   background: #1890FF;
              //   position: absolute;
              //   top: 42%;
              //   right: -6px;
              // }
            }
          }
        }
        border-bottom:1px solid #eee;
        &:nth-last-of-type(1) {
          border-bottom: none;
        }
      }
    }
  }
  .notice-footer-btn {
    margin-right: 10px;
    .el-button {
      margin-right: 20px;
    }
  }
}
</style>