<template>
  <div>
     <div class="action-btn x-flex-between">
      <div>
        <el-button type="primary" icon="el-icon-plus" @click="addMember">添加</el-button>
        <el-button>删除</el-button>
        <el-button>锁定</el-button>
        <span class="select-text">
          已选择
          <el-button type="text">{{len}}&nbsp;</el-button>项
        </span>
        <el-button type="text">清空</el-button>
      </div>
      <div>
        <el-button @click="dismissTeam()">解散团队</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['len'],
  data () {
    return {
    }
  },
  methods: {
    addMember () {
      this.$emit('addMember')
    },
    dismissTeam () {
      this.$emit('dismissTeam')
    }
  }
}
</script>
<style lang="scss">
.member-table {
  .action-btn {
      color: #333333;
      margin-bottom: 15px;
      .el-button {
        border-radius: 0;
        height: 38px;
      }
      .select-text {
        font-size: 14px;
        margin: 0 5px;
        color: #6A6A6A;
      }
    }
    .table {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 10px 0;
    }
    .status {
      position: relative;
      margin-left: 10px;
      &::before{
        position: absolute;
        content: "";
        width:6px;
        height: 6px;
        border-radius: 50%;
        top: 7px;
        left: -20px;
        background: #FF0000;
      }
    }
}
</style>