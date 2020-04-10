<template>
  <div class="member-table">
    <div class="action-btn x-flex-between">
      <div v-if="userPosition!=3">
        <el-button type="primary" icon="el-icon-plus" @click="addMember">添加</el-button>
        <el-button @click="handleDel(userUid,1)">删除</el-button>
        <!-- <el-button>锁定</el-button> -->
        <span class="select-text">已选择
          <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
        </span>
        <el-button type="text" @click="multipleSelection=[]">清空</el-button>
      </div>
      <div v-if="userPosition==1">
        <el-button @click="dismissTeam()">解散团队</el-button>
      </div>
      <div v-else>
        <el-button :type="userPosition==2?'default':'primary'" @click="dismissTeam()">退出团队</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        border=""
        :data="tableData"
        ref="multipleTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="序号"
          type="selection"
          align="center"
          width="60"
          v-if="userPosition!=3"
        ></el-table-column>
        <el-table-column label="姓名" align="center" width="150">
          <template slot-scope="props">
            <el-button
              type="text"
              class="text-line width140"
              @click="handleView(props.row.id)"
            >{{props.row.user_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
        <el-table-column label="所属部门" prop="depart_name" align="center" width="150"></el-table-column>
        <el-table-column label="等级" prop="grade_name" sortable align="center" width="150"></el-table-column>
        <el-table-column label="直属上级" prop="superiorName" align="center" width="150"></el-table-column>
        <el-table-column label="简历数量" prop="export_num" align="center" width="150"></el-table-column>
        <el-table-column label="入职人数" prop="entry_num" align="center" width="150"></el-table-column>
        <el-table-column label="最近登录时间" align="center" width="260">
          <template slot-scope="props">
            <span>{{ props.row.logout_time ? $moment.unix(props.row.logout_time).format('YYYY-MM-DD HH:mm'): '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="150">
          <template slot-scope="props">
            <span
              class="status"
              :class="{'active-status':props.row.status==1}"
            >{{props.row.status==1?"正常":'锁定'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <div v-if="userPosition!=3">
              <el-button @click="handleEdit(scope.row.id)" type="text" size="small">编辑</el-button>
              <el-button
                @click="handleDel(scope.row.uid,1)"
                v-if="scope.row.uid!=uid&&scope.row.grade_num!=2"
                type="text"
                size="small"
              >删除</el-button>
              <el-button
                @click="handleView(scope.row.id)"
                v-if="scope.row.uid==uid"
                type="text"
                size="small"
              >查看</el-button>
            </div>
            <div v-if="userPosition==3">
              <el-button @click="handleView(scope.row.id)" type="text" size="small">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  props: ['tableData'],
  data() {
    return {
      memberInfo: {},
      teamId: '',
      multipleSelection: [],
      userPosition: sessionStorage.getItem('userPosition'),
      uid: localStorage.getItem('uid'),
      userUid: ''
    }
  },
  methods: {
    // 增加
    addMember() {
      this.$emit('addMember')
    },
    // 编辑
    handleEdit(val) {
      if (!val) {
        return this.$message.warning('请选择组员')
      }
      this.$emit('handleEdit', val)
    },
    // 查看
    handleView(val) {
      this.$emit('handleView', val)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      let arr = val.map(item => {
        return item.uid
      })
      this.userUid = arr.join(',')
    },
    // 删除成员
    handleDel(val) {
      if (!val) {
        return this.$message.warning('请选择组员')
      }
      this.$emit('handleDel', val)
    },
    // 解散 退出团队
    dismissTeam() {
      this.$emit('dismissTeam')
    }
  }
}
</script>
<style lang="scss">
.table {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  height: 76%;
  color: #333;
  .status {
    position: relative;
    margin-left: 10px;
    &::before {
      position: absolute;
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      top: 7px;
      left: -20px;
      background: #ff0000;
    }
    &.active-status {
      &::before {
        background: #71d875;
      }
    }
    &.active-status1 {
      &::before {
        background: #1890ff;
      }
    }
  }
}
</style>