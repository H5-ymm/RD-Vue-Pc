<style lang="scss">
@import '@/assets/css/dialog.scss';
</style>
<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt="" class="cancel-icon" @click="handleClose">
      <section class="member-col1">
        <p>添加部门</p>
      </section>
      <section class="member-col3 department-add-col">
        <el-form
          :model="formMember"
          :rules="rules"
          :inline="true"
          label-position="left"
          ref="formMember"
          class="demo-form-inline"
        >
          <el-form-item label="部门名称" prop="depart_name">
            <el-input v-model="formMember.depart_name" placeholder="请输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="部门经理" prop="user_id">
            <el-select v-model="formMember.user_id" filterable placeholder="请选择部门经理">
              <el-option
                :label="item.user_name"
                :value="item.uid"
                v-for="(item,index) in userList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <div slot="footer" class="member-footer">
      <el-button type="primary" @click="submitForm">确定添加</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 部门经理只能编辑状态
// 成员只能查看
// 总经理可以编辑部门 职称 状态
import { getTeamListUser } from '@/api/department'
import { validateIdCard } from '@/util/util'
export default {
  props: ['dialogTableVisible'],
  data() {
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
  created() {
    this.getList(this.uid)
  },
  methods: {
    getList(uid) {
      getTeamListUser({ uid }).then(res => {
        this.userList = res.data
      })
    },
    handleClose() {
      this.$parent.visible = false
    },
    submitForm() {
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
