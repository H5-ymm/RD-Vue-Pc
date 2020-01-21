<style lang="scss">
@import '@/assets/css/modal.scss';
</style>
<template>
  <el-dialog width="500px" top="5vh" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>{{staffId?'修改员工':'添加员工'}}</p>
      </section>
      <div class="staff-detail-row">
        <section class="resume-col3">
          <el-form :model="formMember" :rules="rules" ref="formMember" class="demo-form-inline" label-position="right" label-width="80px">
            <section class="resume-card">
              <p class="resume-main-title x-flex-start-justify">
                <img src="../../assets/img/icon7.png" />
                <span>基本信息</span>
              </p>
              <div class="resume-card-row">
                <div class="resume-card-item">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="formMember.name" placeholder="请输入姓名" class="width300"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="formMember.mobile" placeholder="请输入手机号码" class="width300"></el-input>
                  </el-form-item>
                  <el-form-item label="年龄">
                    <el-select v-model="formMember.age" placeholder="请选择年龄" class="width300">
                      <el-option :label="item" :value="item" v-for="item in ageList" :key="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="身份证号">
                    <el-input v-model="formMember.idcard" placeholder="请输入身份证号" class="width300"></el-input>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-radio-group v-model="formMember.sex" class="width300">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="学历">
                    <el-select v-model="formMember.education" placeholder="请选择学历" class="width300">
                      <el-option :label="item" :value="index" v-for="(item,index) in edu_type" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="详细地址">
                    <div class="width300 select-city">
                      <districtSelet @change="change" :address="address" :disabled="true" :placeholder="'请选择省市'"></districtSelet>
                    </div>
                    <el-input v-model="formMember.address" placeholder="请输入详细地址" class="width300"></el-input>
                  </el-form-item>
                </div>
              </div>
            </section>
            <section class="resume-card">
              <p class="resume-main-title x-flex-start-justify">
                <img src="../../assets/img/receipt/icon3.png" />
                <span>岗位信息</span>
              </p>
              <div class="resume-card-row">
                <div class="resume-card-item">
                  <el-form-item label="岗位" required>
                    <el-input v-model="formMember.post" placeholder="请输入岗位" class="width300"></el-input>
                  </el-form-item>
                </div>
              </div>
            </section>
          </el-form>
        </section>
      </div>
      <div slot="footer" class="resume-footer-btn">
        <el-button @click="handleClose">关闭</el-button>
        <el-button type="primary" @click="submitForm">{{staffId?'确定修改':'确定添加'}}</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { getConstant } from '@/api/dictionary'
import districtSelet from '../districtSelet'
import { selectCompanyResumeInfo } from '@/api/staff'
export default {
  props: ['dialogTableVisible', 'staffId'],
  components: {
    districtSelet
  },
  data() {
    return {
      formMember: {
        sex: 0,
        name: '',
        mobile: '',
        education: '',
        address: '',
        provinceid: '',
        cityid: '',
        uid: localStorage.getItem('uid')
      },
      rules: {
        name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      edu_type: [],
      ageList: [],
      address: []
    }
  },
  created() {
    let params = 'edu_type'
    for (let i = 16; i < 46; i++) {
      this.ageList.push(i)
    }
    this.getList(params)
  },
  watch: {
    staffId(val) {
      if (val) {
        this.getInfo()
      } else {
        this.formMember = {
          sex: 0,
          education: '',
          uid: localStorage.getItem('uid')
        }
        this.address = []
      }
    },
    dialogTableVisible(val) {
      if (!val) {
        this.formMember = {
          sex: 0,
          education: '',
          uid: localStorage.getItem('uid')
        }
        this.address = []
      }
    }
  },
  methods: {
    getInfo() {
      let params = {
        uid: localStorage.getItem('uid'),
        id: this.staffId
      }
      selectCompanyResumeInfo(params)
        .then(res => {
          this.formMember = res.data
          this.formMember.education = Number(this.formMember.education)
          if (res.data.provinceid && res.data.cityid) {
            this.address = [res.data.provinceid, res.data.cityid]
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    getList(filed) {
      getConstant({ filed }).then(res => {
        this.edu_type = res.data.edu_type
      })
    },
    change(val) {
      this.formMember.provinceid = val[0]
      this.formMember.cityid = val[1]
    },
    handleClose() {
      this.$emit('handleClose')
    },
    submitForm() {
      this.$refs['formMember'].validate(valid => {
        if (valid) {
          this.formMember.uid = localStorage.getItem('uid')
          this.$emit('submitForm', this.formMember)
        } else {
          return false
        }
      })
    }
  }
}
</script>