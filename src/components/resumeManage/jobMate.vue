<template>
  <div class="x-flex-center">
    <el-tooltip class="item" effect="dark" content="城市" placement="bottom-start">
      <img src="../../assets/img/resume/city1.png" alt v-if="status.city" />
      <img src="../../assets/img/resume/city.png" alt v-else />
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="岗位" placement="bottom-start">
      <img src="../../assets/img/resume/job1.png" alt v-if="status.job" />
      <img src="../../assets/img/resume/job.png" alt v-else />
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="薪资" placement="bottom-start">
      <img src="../../assets/img/resume/money1.png" alt v-if="status.money" />
      <img src="../../assets/img/resume/money.png" alt v-else />
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="年龄" placement="bottom-start">
      <img src="../../assets/img/resume/age1.png" alt v-if="status.age" />
      <img src="../../assets/img/resume/age.png" alt v-else />
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="性别" placement="bottom-start">
      <img src="../../assets/img/resume/sex1.png" alt v-if="status.sex" />
      <img src="../../assets/img/resume/sex.png" alt v-else />
    </el-tooltip>
  </div>
</template>
<script>
export default {
  props: ['statusObj']
}
</script>