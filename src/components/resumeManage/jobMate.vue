<template>
  <div class="x-flex-center job-tooltip">
    <el-tooltip class="item" effect="dark" content="城市" placement="bottom-start">
      <img src="../../assets/img/resume/city1.png" alt v-if="statusObj.cityNum" />
      <img src="../../assets/img/resume/city.png" alt v-else />
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="岗位" placement="bottom-start">
      <img src="../../assets/img/resume/job1.png" alt v-if="statusObj.nameNum" />
      <img src="../../assets/img/resume/job.png" alt v-else />
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="薪资" placement="bottom-start">
      <img src="../../assets/img/resume/money1.png" alt v-if="statusObj.moneyNum" />
      <img src="../../assets/img/resume/money.png" alt v-else />
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="年龄" placement="bottom-start">
      <img src="../../assets/img/resume/age1.png" alt v-if="statusObj.ageNum" />
      <img src="../../assets/img/resume/age.png" alt v-else />
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="性别" placement="bottom-start">
      <img src="../../assets/img/resume/sex1.png" alt v-if="statusObj.sexNum" />
      <img src="../../assets/img/resume/sex.png" alt v-else />
    </el-tooltip>
  </div>
</template>
<script>
export default {
  props: ['statusObj']
}
</script>
<style lang="scss">
.job-tooltip {
  .item {
    margin: 0 8px;
    max-width: 19px; 
  }
}
</style>
