<style lang="scss">
  .help-dialog {
    .el-dialog__body {
      padding: 0 25px;
    }
    .el-dialog__header {
      padding: 20px;
    }
    .member-col3 {
      width: 86%;
      margin: 0 auto;
      .check-box {
        text-align: left;
        color: #6A6A6A;
        margin-top: 15px;
      }
      .el-form-item__content {
        line-height: 20px;
      }
    }
    .el-dialog__footer {
      text-align: right;
    }
    .dialog-footer {
      margin-right: 20px;
      padding: 0;  
      .el-button {
        margin-right: 20px;
      }
    }
  }
</style>


<template>
  <el-dialog width="530px" title="帮助反馈" center :visible.sync="dialogTableVisible" class="help-dialog" :before-close="handleClose">
    <section class="member-col3">
      <el-form :model="form" class="lock-form" :rules="rules" ref="form">
        <el-form-item prop="reason">
          <el-input type="textarea" :autosize="{ minRows: 5}" placeholder="告诉我们您的建议或遇到的问题。" v-model="form.reason"></el-input>
        </el-form-item>
        <el-form-item class="check-box">
            <p>客服电话：{{info.customerTel}}</p>
            <p>客服QQ：{{info.customerQQ}}</p>
        </el-form-item>
      </el-form>
    </section>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getConfigInfo } from '@/api/home'
export default {
  props: {
    dialogTableVisible: { type: Boolean, default: false },
  },
  data () {
    return {
      form: {
        reason: ''
      },
      info: {},
      rules: {
        reason: [
          { required:true, message: '您的建议或遇到的问题', trigger: 'blur' },
        ]
      }
    }
  },
  created(){
    this.getInfo()
  },
  watch: {
    reason (val) {
      if (val) {
        this.form.reason = val
      }
    }
  },
  methods: {
    getInfo(){
      getConfigInfo().then(res=>{
        this.info = res.data
      })
    },
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

