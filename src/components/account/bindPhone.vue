<template>
  <el-form
    :model="formMember"
    :rules="rules"
    :inline="true"
    label-position="left"
    ref="formMember"
    class="demo-form-inline account-bind"
  >
    <el-form-item label="原手机号码" required prop="depart_name">
      <el-input v-model="formMember.depart_name" placeholder="请输入部门名称"></el-input>
    </el-form-item>
    <el-form-item label="新手机号码" required prop="user_id">
      <el-select v-model="formMember.user_id" placeholder="请选择部门经理">
        <el-option
          :label="item.user_name"
          :value="item.uid"
          v-for="(item,index) in userList"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
import { getTeamListUser } from '../../api/department'
import { validateIdCard } from '../../util/util'
export default {
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
      uid: localStorage.getItem('uid')
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
</style>