<style lang="scss" scoped>
@import '@/assets/css/dialog.scss';
</style>
<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt="" class="cancel-icon" @click="handleClose">
      <section class="member-col1">
        <p>{{id?'修改组员':'添加组员'}}</p>
      </section>
      <section class="member-col3 member-add-col3">
        <el-form
          :model="formMember"
          :rules="rules"
          ref="formMember"
          class="demo-form-inline"
          label-position="right"
          label-width="100px"
        >
          <el-form-item label="姓名" prop="user_name">
            <el-input v-model="formMember.user_name" :readonly="id!=''" placeholder="请输入组员姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="id_card" v-if="!id">
            <el-input v-model="formMember.id_card" :readonly="id!=''" placeholder="请输入组员身份证号"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="mobile">
            <el-input v-model="formMember.mobile" :readonly="id!=''" placeholder="请输入该组员联系电话"></el-input>
          </el-form-item>
          <!-- <el-form-item label="户籍所在地">
            <el-input v-model="formMember.mobile" placeholder="请输入户籍所在地"></el-input>
          </el-form-item>-->
          <el-form-item label="户籍所在地">
            <districtSelet @change="change" :address="address"></districtSelet>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="formMember.education" placeholder="请选择学历">
              <el-option :label="item" :value="index" v-for="(item,index) in edu_type" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-select
              placeholder="请选择"
              value-key="depart_name"
              :disabled="userPosition==2&&id!=''"
              v-model="depId"
              @change="selectDep"
            >
              <el-option
                :label="item.depart_name"
                :value="item.id"
                v-for="item in currentDepList"
                :key="item.depart_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前职称">
            <el-select
              v-model="formMember.grade_id"
              :disabled="userPosition==2&&id!=''"
              value-key="grade_name"
              placeholder="请选择"
            >
              <el-option
                :label="item.grade_name"
                :value="item.id"
                v-for="item in jobList"
                :key="item.grade_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前状态">
            <el-radio-group v-model="formMember.status">
              <el-radio :label="1" border="">正常</el-radio>
              <el-radio :label="2" border="">锁定</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" v-if="formMember.status==2">
            <el-input type="textarea" v-model="formMember.remark" placeholder="请输入锁定说明（必填）"></el-input>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <div slot="footer" class="member-footer">
      <el-button @click="handleClose">取消</el-button>
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
import { departmentRoleList } from '../../api/team'
import { validateIdCard } from '../../util/util'
export default {
  components: {
    districtSelet
  },
  props: ['dialogTableVisible', 'id'],
  data() {
    var validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号码'))
      } else {
        if (!validateIdCard(value)) {
          callback(new Error('请输入正确的身份证号码'))
        }
        callback()
      }
    }
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
        uid: localStorage.getItem('uid')
      },
      depId: '',
      depList: [],
      rules: {
        user_name: [
          { required: true, message: '请输入组员姓名', trigger: 'blur' }
        ],
        id_card: [
          { required: true, message: '请输入组员身份证', trigger: 'blur' },
          { validator: validate, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入组员手机号', trigger: 'blur' }
        ],
        grade_id: [
          { required: true, message: '请选择组员所在部门', trigger: 'blur' }
        ]
      },
      edu_type: [],
      jobList: [],
      address: [],
      userPosition: sessionStorage.getItem('userPosition'),
      currentDepList: []
    }
  },
  created() {
    let params = 'edu_type'
    if (this.userPosition == 2) {
      let teamSys = localStorage.getItem('teamSys') ? JSON
        .parse(localStorage.getItem('teamSys')) : {}
      this.depId = Number(teamSys.departId)
    }
    else {
      this.depId = ''
      this.formMember.grade_id = ''
    }
    this.getList(params)
    this.getJobList()
  },
  methods: {
    getJob(arr, id) {
      let depId
      arr.forEach(item => {
        if (item.child) {
          item.child.forEach(val => {
            if (val.id == id) {
              depId = val.depart_id
            }
          })
        }
      })
      return depId
    },
    getList(filed) {
      getConstant({ filed }).then(res => {
        this.edu_type = res.data.edu_type
      })
    },
    getJobList() {
      let uid = this.formMember.uid
      departmentRoleList({ uid })
        .then(res => {
          // this.depList = res.data
          if (this.userPosition == 1) {
            this.currentDepList = res.data.splice(0)
          } else {
            this.currentDepList = this.getCurrentDepList(res.data)
            this.jobList = this.getArr(this.currentDepList, this.depId)
          }
        })
        .catch(error => {
          if (error) {
            this.$message.error(error.status.remind)
          }
        })
    },
    getCurrentDepList(array) {
      let arr = []
      array.filter(item => {
        if (item.id == this.depId) {
          arr.push(item)
        }
      })
      return arr
    },
    getArr(arr, id) {
      let newArr = []
      arr.forEach(item => {
        if (item.id == id) {
          newArr = item.child
        }
      })
      return newArr
    },
    selectDep(val) {
      this.jobList = this.getArr(this.currentDepList, val)
      this.formMember.grade_id = ''
    },
    change(val) {
      this.formMember.provinceid = val[0]
      this.formMember.cityid = val[1]
      this.formMember.three_cityid = val[2]
    },
    handleClose() {
      this.clearData()
      this.$emit('handleClose')
    },
    clearData() {
      this.formMember = {
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
      }
      this.address = []
    },
    submitForm() {
      this.$refs['formMember'].validate(valid => {
        if (valid) {
          this.$emit('submitForm', this.formMember)
          if (!this.dialogTableVisible) {
            this.clearData()
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
