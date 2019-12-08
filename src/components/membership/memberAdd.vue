<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>添加组员</p>
      </section>
      <section class="member-col3 member-add-col3">
        <el-form :model="formMember" :rules="rules" ref="formMember" class="demo-form-inline" label-position="right" label-width="100px">
          <el-form-item label="姓名" required prop="user_name">
            <el-input v-model="formMember.user_name" placeholder="请输入组员姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" required prop="id_card">
            <el-input v-model="formMember.id_card" placeholder="请输入组员身份证号"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="formMember.mobile" placeholder="请输入该组员联系电话"></el-input>
          </el-form-item>
          <el-form-item label="户籍所在地">
            <el-input v-model="formMember.mobile" placeholder="请输入户籍所在地"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <districtSelet @change="change"> </districtSelet>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="formMember.education" placeholder="请选择学历">
              <el-option :label="item" :value="index" v-for="(item,index) in edu_type" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" required prop="grade_id">
            <el-select v-model="formMember.grade_id" placeholder="请选择该成员当前部门">
              <el-option :label="item" :value="key" v-for="(item,key) in jobList" :key="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前状态">
            <el-radio-group v-model="formMember.status">
              <el-radio :label="1" border>正常</el-radio>
              <el-radio :label="2" border>锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <div slot="footer">
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 部门经理只能编辑状态
// 成员只能查看
// 总经理可以编辑部门 职称 状态
import { getConstant } from '../../api/dictionary'
import districtSelet from '../districtSelet'
import { validateIdCard } from '../../util/util'
export default {
  components:{
    districtSelet
  },
  props: ['dialogTableVisible'],
  data () {
     var validate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号码'));
        } else {
          if (!validateIdCard(value)) {
            callback(new Error('请输入正确的身份证号码'));
          }
          callback()
        }
      };
    return {
      formMember: {
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
        uid: localStorage.getItem('uid'),
      },
      rules: {
        user_name: [
          { required: true, message: '请输入组员姓名', trigger: 'blur' },
        ],
        id_card: [
          { required: true, message: '请输入组员身份证', trigger: 'blur' },
          { validator: validate, trigger: 'blur' }
        ],
        grade_id: [
          { required: true, message: '请选择组员所在部门', trigger: 'blur' }
        ]
      },
      edu_type: [
        "高中以下", 
        "高中", 
        "中专", 
        "大专", 
        "本科", 
        "硕士"
      ],
      jobList: {
          "1": "贸易/百货", 
          "2": "机械/设备/技工", 
          "3": "公务员/翻译", 
          "4": "化工/能源", 
          "5": "销售/客服/技术支持", 
          "6": "会计/金融/银行/保险", 
          "7": "生产/营运/采购/物流", 
          "8": "生产/制药/医疗/护理", 
          "9": "广告/时长/媒体/艺术", 
          "10": "建筑/房地产", 
          "11": "人事/行政/高级管理", 
          "12": "咨询/法律/教育/科研", 
          "13": "服务业", 
          "14": "通信/电子"
        }
    }
  },
  created () {
    let params = 'edu_type,job_array'
    this.getList(params)
  },
  methods: {
    getList (filed) {
      getConstant({ filed }).then(res => {
        console.log(res)
      })
    },
    change(val) {
      this.formMember.provinceid = val[0]
      this.formMember.cityid = val[1]
      this.formMember.three_cityid = val[2]
    },
    handleClose () {
      this.$parent.visible = false
    },
    submitForm() {
      this.$refs['formMember'].validate((valid) => {
        if (valid) {
          this.$emit('submitForm',this.formMember)
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
          line-height:38px;
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
       &.member-add-col3{
        .el-select,.el-radio-group{
          margin-left: 0;
        }
        .el-form-item__content {
          margin-left: 0!important;
        }
        .el-input {
          width: 300px;
        }
      }
    }
  }
}
 
</style>