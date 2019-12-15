<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="receipt-dialog" :show-close="false">
    <div class="receipt-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>通知入职</p>
      </section>
      <section class="member-col3 bind-col3">
        <el-form
          :model="formMember"
          :rules="rules"
          :inline="true"
          label-position="left"
          ref="formMember"
          class="demo-form-inline"
        >
          <el-form-item label="入职时间" required prop="depart_name">
            <div class="x-flex-between">
              <el-date-picker
                v-model="formMember.date"
                type="date"
                class="width195"
                placeholder="请选择入职日期">
              </el-date-picker>
              <el-time-select
                class="width195"
                v-model="formMember.value"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
                placeholder="请选择入职时间">
              </el-time-select>
             </div>
          </el-form-item>
          <el-form-item label="通知内容" required prop="user_id">
            <el-input v-model="formMember.depart_name"  
             type="textarea"
             class="width400"
             :autosize="{maxRows: 4}" placeholder="请输入通知内容"></el-input>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <div slot="footer" class="notice-footer-btn">
      <el-button @click="submitForm">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 部门经理只能编辑状态
// 成员只能查看
// 总经理可以编辑部门 职称 状态
import { getTeamListUser } from '../../api/department'
import { validateIdCard } from '../../util/util'
import districtSelet from '../districtSelet'
export default {
  components: {
    districtSelet
  },
  props: ['dialogTableVisible'],
  data () {
    return {
      formMember: {
        depart_name: '',
        user_id: '',
        uid: localStorage.getItem('uid'),
      },
      rules: {
        depart_name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
        ],
        user_id: [
          { required: true, message: '请选择部门经理', trigger: 'blur' }
        ]
      },
      userList: [],
      uid: localStorage.getItem('uid'),
      address: []
    }
  },
  created () {
    this.getList(this.uid)
  },
  methods: {
    getList (uid) {
      getTeamListUser({ uid }).then(res => {
        this.userList = res.data
      })
    },
    handleClose () {
      this.$parent.visible = false
    },
    submitForm () {
      this.$refs['formMember'].validate((valid) => {
        if (valid) {
          this.$emit('submitForm', this.formMember)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.receipt-dialog {
  box-shadow:0px 1px 43px 0px rgba(51,51,51,0.3);
  border-radius:5px;
  .el-dialog__body,.el-dialog__header {
    padding: 0;
  }
 .receipt-row {
    width: 100%;
    // margin: 0 auto;
    text-align: center;
    color: #333333;
    position: relative;
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .member-col1 {
      background: #EBF4FB;
      padding: 18px 0 17px;
    }
    .el-form-item {
      width: 100%;
      .width400,.el-form-item__content {
        width: 400px;
      }
    }
    .address {
      margin-top: 6px;
    }
    .el-textarea__inner {
      height: 160px!important;
    }
    .member-col3 {
      width: 100%;
      border-top: 1px solid #eee;
      padding-top: 10px;
      .demo-form-inline {
        width: 100%;
        margin: 0 auto;
        .el-form-item {
          margin-bottom: 10px;
        }
        .el-form-item__label {
          width: 100%;
          margin-left: 48px;
        }
        .width195 {
          width: 195px!important;
          .el-input__inner{ 
            width: 195px!important;     
          }
        }
        .el-input__inner{
          border-radius: 3px;
        }
      }
    }
  }
  .notice-footer-btn {
    // padding-right: 20px;
    .el-button {
      margin-right: 20px;
    }
  }
}
</style>