<style lang="scss">
.member-dialog {
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
    .member-col1 {
      background: #ebf4fb;
      padding: 18px 0 17px;
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
    margin-right: 6px;
    padding: 0;
    .el-button {
      margin-right: 20px;
      border-radius: 3px;
    }
  }
}
</style>


<template>
  <el-dialog width="500px" :visible.sync="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>{{dialogObj.title}}</p>
      </section>
      <section class="member-col3 member-add-col3">
        <el-form :model="form" class="lock-form" :rules="rules" ref="form">
          <el-form-item :label="`${dialogObj.subTitle}`" required prop="reason">
            <el-input type="textarea" :disabled="reason!=''" :autosize="{ minRows: 4}" :placeholder="dialogObj.placeholder" v-model="form.reason"></el-input>
          </el-form-item>
          <el-form-item v-if="isShow&&!reason" class="check-box">
            <el-checkbox v-model="checked">放弃后推荐新岗位</el-checkbox>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" v-if="!reason">取消</el-button>
      <el-button type="primary" @click="submit">{{dialogObj.okText}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTableVisible: { type: Boolean, default: false },
    dialogObj: { type: Object, default: {} },
    isShow: false,
    reason: { type: String, default: '' }
  },
  data() {
    return {
      form: {
        reason: ''
      },
      checked: false,
      rules: {
        reason: [{ message: '请输入理由', trigger: 'blur' }]
      }
    }
  },
  watch: {
    reason(val) {
      if (val) {
        this.form.reason = val
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    submit() {
      if (this.reason) {
        this.$emit('handleClose')
        return false
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('submit', this.form)
          // this.form.reason = ''
        } else {
          return false
        }
      })
    }
  }
}
</script>

