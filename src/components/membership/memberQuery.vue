<template>
  <div class="memberForm">
    <!-- 添加标签 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="搜索类型：">
        <el-select v-model="formInline.region" placeholder="请选择" class="width120">
          <el-option label="姓名" value="shanghai"></el-option>
          <el-option label="联系电话" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="请输入你要搜索的关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="select-btn">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      formTabs: {
        name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入标签描述信息', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      if (this.$store.state.user.desc > 1) {
        this.$alert('此账号为测试账号,无法进行此操作', '温馨提示', {
          confirmButtonText: '确定',
          callback: () => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });
          }
        });
        return false;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: 'POST',
            url: 'addtables',
            data: this.formTab
          }).then((res) => {
            // console.log(res)
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              });
              // console.log(res.data.date)
              this.$store.commit('arrTableList', res.data.date)
              this.formTab.name = ''
              this.formTab.desc = ''
            } else {
              this.$message({
                showClose: true,
                message: '未知错误',
                type: 'warning'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
 .memberForm {
   .width120 {
     width: 120px;
   }
   .el-input {
     border-radius:3px;
   }
   .select-btn {
     border-radius:3px;
   }
 }
</style>
