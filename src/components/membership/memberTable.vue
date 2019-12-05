<template>
  <div class="member-table">
    <div class="action-btn x-flex-between">
      <div>
        <el-button type="primary" icon="el-icon-plus">添加</el-button>
        <el-button>删除</el-button>
        <el-button>锁定</el-button>
        <span class="select-text">
          已选择
          <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
        </span>
        <el-button type="text">清空</el-button>
      </div>
      <div>
        <el-button>解散团队</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        border
        :data="tableData"
        ref="multipleTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="序号" type="selection" align="center" width="60"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center" width="100"></el-table-column>
        <el-table-column label="联系电话" prop="mobile" align="center" width="160"></el-table-column>
        <el-table-column label="所属部门" prop="name" align="center" width="100"></el-table-column>
        <el-table-column label="等级" prop="mobile" sortable align="center" width="160"></el-table-column>
        <el-table-column label="直属上级" prop="name" align="center" width="100"></el-table-column>
        <el-table-column label="简历数量" prop="number" align="center" width="80"></el-table-column>
        <el-table-column label="入职人数" prop="number" align="center" width="80"></el-table-column>
        <el-table-column label="最近登录时间" prop="loginTime" align="center" width="260"></el-table-column>
        <el-table-column label="状态" prop="status" align="center" width="80"></el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClickB(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClickB(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="handleClickB(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="team-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        name: '杨萌萌',
        mobile: '18337806536',
        number: 23,
        status: '锁定',
        loginTime: '2019-11-30 18:35:50'
      }, {
        name: '杨萌萌',
        mobile: '18337806536',
        number: 23,
        status: '锁定',
        loginTime: '2019-11-30 18:35:50'
      }, {
        name: '杨萌萌',
        mobile: '18337806536',
        number: 23,
        status: '锁定',
        loginTime: '2019-11-30 18:35:50'
      }],
      currentPage: 1,
      multipleSelection: []
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val;
    }
  },
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
  .team-pagination {
      margin: 20px 0;
    }
}
</style>