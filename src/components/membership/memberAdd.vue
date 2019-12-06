<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>添加组员</p>
      </section>
      <section class="member-col3">
        <el-form :model="formMember" class="demo-form-inline" label-width="100px">
          <el-form-item label="姓名" required>
            <el-input v-model="formMember.user_name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" required>
            <el-input v-model="formMember.id_card"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" required>
            <el-input v-model="formMember.mobile"></el-input>
          </el-form-item>
          <el-form-item label="户籍所在地" required>
            <el-input v-model="formMember.mobile"></el-input>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="formMember.region" placeholder="请选择">
              <el-option label="姓名" value="shanghai"></el-option>
              <el-option label="联系电话" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="formMember.grade_id" placeholder="请选择">
              <el-option label="姓名" value="shanghai"></el-option>
              <el-option label="联系电话" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前状态">
            <el-radio-group v-model="formMember.status">
              <el-radio label="1" border>正常</el-radio>
              <el-radio label="2" border>锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="handleClose">确定</el-button>
      <!-- <el-button type="primary" @click="handleClose">关闭</el-button> -->
    </div>
  </el-dialog>
</template>
<script>
// 部门经理只能编辑状态
// 成员只能查看
// 总经理可以编辑部门 职称 状态
import { getTeamInfo } from '../../api/team'
export default {
  props: ['dialogTableVisible'],
  data () {
    return {
      formMember: {
        user: '',
        region: '',
        status: 1,
        user_name: '',
        id_card: '',
        mobile: '',
        education: '',
        grade_id: '',
        provinceid: '',
        cityid: '',
        three_cityid: '',
        uid: localStorage.getItem('uid')
      },
    }
  },
  created () {
    console.log(this.memberInfo)
    if (this.teamId) {
      this.getInfo(this.teamId)
    }
  },
  methods: {
    getInfo (uid) {
      getTeamInfo({ uid }).then(res => {
        console.log(res)
        this.formMember = res.data
        console.log(this.formMember)
      })
    },
    handleClose () {
      this.$parent.dialogTableVisible = false
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
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .member-col2 {
      line-height: 30px;
      margin: 10px auto;
      width: 65%;
      p {
        &:nth-of-type(1) {
          width: 100px;
          text-align: right;
          color: #6A6A6A;
        }
        &:nth-of-type(2) {
          flex: 1;
          text-align: left;
          margin-left: 30px;
        }
      }
      
    }
    .member-col3 {
      width: 100%;
      border-top: 1px solid #eee;
      padding-top: 10px;
      .demo-form-inline {
        width: 90%;
        margin: 10px auto;
        .el-form-item {
          margin-bottom: 10px;
        }
        .el-input__inner{
          width:300px!important;
          height:38px;
          border-radius: 0;
        }
        .el-textarea {
          width:300px!important;
          border-radius: 0;
          height: 80px;
        }
        .el-form-item__content {
          margin-left: 20px!important;
        }
        .el-select,.el-radio-group{
          margin-left: -30px;
        }
        .el-radio.is-bordered {
          height: 38px;
          width: 145px;
          border-radius: 0;
          line-height: 38px;
          padding:0;
          margin-right: 0;
          &+.el-radio.is-bordered {
            margin-left: 10px;
          }
        }
        .el-radio__input {
          float: right;
          margin-top: 12px;
          margin-right: 10px;
        }
        .member-status {
          margin-top: 12px;
          padding-left:14px;
        }
      }
    }
  }
}
 
</style>