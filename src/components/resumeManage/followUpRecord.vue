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
      height: 40px;
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
    .el-timeline-item__timestamp {
       text-align: left;
    }
    .record-content {
        line-height: 30px;
        text-align: left;
        margin: 12px 10px;
      p { 
        color: #999;
       }
      .record-title {
        color: #333;
      }
    }
  }
  .el-dialog__body,.el-dialog__header {
    padding: 0;
  }
  .member-col1 {
    background:#EBF4FB;
    padding: 21px 0 20px;
  }
  .member-row {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #333333;
    padding: 0 0 10px;
    position: relative;
    &.record-box {
      height:540px;
      overflow: auto;
    }
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 0;
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
<template>
  <el-dialog width="500px" :visible="dialogTableVisible" center class="member-dialog record-dialog" :show-close="false">
    <div class="member-row record-box" id="topContent" ref="topContent">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>跟进记录</p>
      </section>
      <section class="record-col3">
        <el-timeline v-if="list.length">
          <el-timeline-item v-for="(item, index) in list" :type="item.type" :size="item.size" :key="index" :timestamp="$moment.unix(item.addtime).format('YYYY-MM-DD')" placement="top">
            <div class="record-content">
              <P class="record-title">
                [{{item.title}}] {{item.username}} {{item.remark?item.remark:''}}
              </P>
              <P v-if="item.com_name">企业名称 : {{item.com_name}}</P>
              <P v-if="item.job_name">企业名称 : {{item.job_name}}</P>
              <P>操作人 : {{item.operator}}</P>
              <P>跟进时间: {{$moment.unix(item.addtime).format('YYYY-MM-DD HH:mm:ss')}}</P>
            </div>
          </el-timeline-item>
        </el-timeline>
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
          <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入跟进记录" v-model="reason"></el-input>
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
import { addTrackingInfo, getTrackList } from '@/api/resume'
export default {
  props: ['dialogTableVisible', 'id'],
  data () {
    return {
      reason: '',
      show: false,
      resumeId: '',
      trackList: []
    }
  },
  watch: {
    id (val) {
      if (val) {
        console.log(val)
        this.resumeId = val
        this.getTrackData()
      }
    }
  },
  created () {
    if (this.resumeId) {
      this.getTrackData()
    }
  },
  computed: {
    list () {
      return this.getArr(this.trackList)
    }
  },
  methods: {
    getArr (val) {
      let obj = {}
      let newObj = {}
      let arr = []
      val.forEach((item, index) => {
        obj = {
          size: 'large',
          type: 'primary',
        }
        if (index == 0) {
          newObj = Object.assign(item, obj)
        }
        else {
          newObj = Object.assign(item, {
            size: 'normal ',
            type: 'info',
          })
        }
        arr.push(newObj)
      })
      console.log(arr)
      return arr
    },
    // 获取跟进记录
    getTrackData () {
      let params = {
        uid: localStorage.getItem('uid'),
        resumeId: this.resumeId
      }
      getTrackList(params).then(res => {
        this.trackList = res.data
      })
    },
    handleClose () {
      this.$emit('submitRecord', this.reason)
    },
    // 添加跟进记录
    submitForm () {
      this.$emit('submitRecord', this.reason)
    },
    save () {
      this.show = false
      let params = {
        uid: localStorage.getItem('uid'),
        resumeId: this.resumeId,
        title: this.reason
      }
      addTrackingInfo(params).then(res => {
        this.getTrackData()
        this.reason = ''
      })
    }
  }
}
</script>

