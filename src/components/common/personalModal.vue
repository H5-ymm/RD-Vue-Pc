<template>
  <el-dialog
    width="400px"
    title=""
    :visible.sync="dialogTableVisible"
    class="member-dialog"
    :show-close="false"
  >
    <div class="member-row personal-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>指定招聘人</p>
      </section>
      <section class="member-col3">
        <div class="x-flex-between">
           <el-input
            type="text"
            class="width210"
            v-model="name"></el-input>
            <el-button type="primary">查询</el-button>
        </div>
        <div class="personal-box">
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="item" v-for="(item,index) in list" :key="index"></el-checkbox>
          </el-checkbox-group>
        </div>
      </section>
    </div>
    <div slot="footer" class="dialog-footer x-flex-between">
      <span class="select-text">已选择 <span class="select-num">{{checkList.length}} </span> 项</span>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTableVisible: false,

    isShow: false,
    reason: { type: String, default: '' }
  },
  data () {
    return {
      form: {
        reason: ''
      },
      name: '',
      list: [
        'yyy','kkkk'
      ],
      checkList: []
    }
  },
  watch: {
    reason (val) {
      if (val) {
        this.form.reason = val
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    submit () {
      if (this.reason) {
        this.$emit('handleClose')
        return false
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          return false
        }
      })
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

