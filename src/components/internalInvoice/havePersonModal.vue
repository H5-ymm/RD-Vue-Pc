<template>
  <el-dialog
    width="500px"
    title
    :visible.sync="dialogTableVisible"
    class="member-dialog"
    :show-close="false"
  >
    <div class="member-row personal-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>已领取人</p>
      </section>
      <section class="member-col3">
        <ul class="personal-box">
          <li v-for="(item,index) in list" :key="index" class="x-flex-around">
            <span class="item-name">{{index+1}}.{{item.name}}</span>
            <span class="item-time">领取时间：{{item.time}}</span>
            <el-button type="primary" plain @click="handleCancle(item.id)">取消分配</el-button>
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
    dialogTableVisible: false
  },
  data () {
    return {
      form: {
        reason: ''
      },
      name: '',
      list: [
        {
          name: 'tttt',
          time: '2019-10-20 10:22',
          status: 0,
          id: ''
        }
      ],
      ids: []
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    handleCancle (id) {
      let arr = []
      arr.push(id)
      this.ids = [...new Set(arr)]
    },
    submit () {
      this.$emit('handleOk', this.ids.join(','))
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
        padding: 10px 0 ;
        height: 200px;
        overflow: auto;
        .item-name{
          color: #333;
        }
        .item-time{
          color: #6A6A6A;
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
      font-size:14px;
      color: #6A6A6A;
      .select-num {
        color: #1890FF;
      }
    }
  }
}
</style>

