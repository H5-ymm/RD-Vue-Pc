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
    .member-col1 {
      background:#EBF4FB;
      padding: 21px 0 20px;
    }
    .member-col3 {
      &.personal-col3 {
        width: 82%;
        border-top: 1px solid #eee;
        padding-top: 10px;
        margin: 0 auto;
        .check-box {
          text-align: left;
        }
      }
    }
  }
  .dialog-footer {
    margin-right: 0;
    width: 92%;
    margin: 0 auto;
    .el-button {
      padding: 11px 0;
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


<template>
  <el-dialog width="400px" title :visible.sync="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row personal-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>{{title}}</p>
      </section>
      <section class="member-col3 personal-col3">
        <div class="x-flex-between">
          <el-input type="text" class="width210" v-model="name"></el-input>
          <el-button type="primary" @click="query">查询</el-button>
        </div>
        <div class="personal-box">
          <el-checkbox-group v-model="checkList" @change="changeCheck">
            <el-checkbox :label="item" :disabled="item.status==1" v-for="(item,index) in list" :key="index">{{item.user_name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </section>
    </div>
    <div slot="footer" class="dialog-footer x-flex-between">
      <span class="select-text">
        已选择
        <span class="select-num">{{checkList.length}}</span> 项
      </span>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTableVisible: { type: Boolean, default: false },
    title: { type: String, default: '分配跟进人' },
    personalList: { type: Array, default: [] },
  },
  data () {
    return {
      list: [],
      checkList: [],
      name: ''
    }
  },
  created () {
    this.list = this.personalList
  },
  watch: {
    personalList (val) {
      if (val && val.length) {
        this.list = val
        let arr = val.filter(item => {
          if (item.status) {
            return item
          }
        })
        this.checkList = arr
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    changeCheck (val) {
      console.log(val)
    },
    submit () {
      console.log(this.checkList)
      this.$emit('handleOk', this.checkList)
      this.checkList = []
    },
    getList (name, arr) {
      let newArr = arr.filter((item) => {
        // 查找newArr中所有name包含c的数据，然后返回
        console.log(item.user_name.indexOf(name))
        if (item.user_name.indexOf(name) >= 0) {
          return item
        }
      })
      return newArr
    },
    query () {
      this.list = this.getList(this.name, this.list)
      console.log(this.list)
    }
  }
}
</script>

