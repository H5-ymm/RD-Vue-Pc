<template>
  <el-dialog width="500px" title :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row personal-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>已领取人</p>
      </section>
      <section class="member-col3">
        <ul class="personal-box">
          <li v-for="(item,index) in hasPersonList" :key="index" class="x-flex-around">
            <span class="item-name">{{index+1}}.{{item.user_name}}</span>
            <span class="item-time">领取时间：{{item.ctime?$moment(item.ctime).format('YYYY-MM-DD HH:mm'):''}}</span>
            <el-button type="primary" size="mini" class="cancle-btn" plain @click="handleCancle(item.touid,index)">{{checkHas(item.touid,currentId)?'分配接单':'取消分配'}}</el-button>
          </li>
        </ul>
      </section>
    </div>
    <div slot="footer" class="dialog-footer person-btn">
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    hasPersonList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      form: {
        reason: ''
      },
      ids: [],
      type: 'primary',
      currentId: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    checkHas(id, arr) {
      let flag = arr.indexOf(id)
      if (flag == -1) {
        return false
      } else {
        return true
      }
    },
    handleCancle(id, index) {
      let flag = this.currentId.indexOf(id)
      if (flag == -1) {
        this.currentId.push(id)
      } else {
        let ret = this.currentId.findIndex(v => {
          return v == id
        })
        this.currentId.splice(ret, 1)
      }
      this.ids = [...new Set(this.currentId)]
    },
    submit() {
      this.$emit('handleOk', this.ids.join(','))
    }
  }
}
</script>

<style lang="scss">
.member-dialog {
  box-shadow: 0px 1px 43px 0px rgba(51, 51, 51, 0.3);
  border-radius: 5px;
  .el-dialog__body,
  .el-dialog__header {
    padding: 0;
  }
  .member-row {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #333333;
    padding: 0 0 10px;
    position: relative;
    &.personal-row {
      padding: 0 0 10px;
      .width210 {
        width: 210px;
      }
      .el-checkbox {
        display: block;
        text-align: left;
        margin: 15px 0;
      }
      .el-button {
        border-radius: 3px;
      }
      .personal-box {
        padding: 10px 0;
        height: 300px;
        overflow: auto;
        > li {
          margin-bottom: 15px;
        }
        .item-name {
          color: #333;
          width: 80px;
          text-align: left;
        }
        .item-time {
          color: #6a6a6a;
        }
        .cancle-btn {
          &.el-button {
            background: #fff;
            padding: 8px 10px;
            color: #1890ff;
          }
          &.el-button--primary {
            &:hover {
              background: #1890ff;
              color: #fff;
            }
          }
        }
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
      .check-box {
        text-align: left;
      }
    }
  }
  .dialog-footer {
    margin-right: 0;
    width: 92%;
    margin: 0 auto;
    &.person-btn {
      width: 84%;
    }
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

