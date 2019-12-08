<template>
 <el-dialog width="75%" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row turnover-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>人员调整</p>
      </section>
      <div class="member-table turnover-box">
        <div class="memberForm">
          <el-form :inline="true" :model="formMember" class="demo-form-inline">
            <el-form-item label="姓名/联系电话：">
              <el-input v-model="formMember.keyword" placeholder="请输入你要搜索的关键字" class="width300"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" class="select-btn">搜索</el-button>
            </el-form-item>
            <div class="action-btn x-flex-between">
              <div>
                <el-form-item>
                  <el-select v-model="formMember.type" placeholder="所属部门" class="width100">
                    <el-option label="姓名" value="1"></el-option>
                    <el-option label="联系电话" value="2"></el-option>
                    <el-option label="直属上级" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="formMember.type" placeholder="等级" class="width100">
                    <el-option label="姓名" value="1"></el-option>
                    <el-option label="联系电话" value="2"></el-option>
                    <el-option label="直属上级" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <span class="select-text">
                  已选择
                  <el-button type="text">{{multipleSelection.length}}&nbsp;</el-button>项
                </span>
                <el-button type="text">清空</el-button>
              </div>
            </div>
           </el-form>
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
            <el-table-column label="姓名" align="center" width="150">
              <template slot-scope="props">
                <el-button type="text" @click="handleEdit(props.row)">{{props.row.user_name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" prop="mobile" align="center" width="150"></el-table-column>
            <el-table-column label="最近登录时间" prop="depart_name" align="center" width="150"></el-table-column>
            <el-table-column label="直属上级" prop="grade_name" align="center" width="150"></el-table-column>
            <el-table-column label="所属部门" prop="grade_name" align="center" width="150"></el-table-column>
            <el-table-column label="等级" prop="grade_name" sortable align="center" width="150"></el-table-column>
            <el-table-column label="操作" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">调整人员</el-button>
                <el-button @click="handleEdit(scope.row)" type="text" size="small">确认</el-button>
                <el-button @click="handleClickB(scope.row)" type="text" size="取消">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          class="team-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formMember.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="formMember.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { adjustmentList } from '../../api/department'
export default {
  props: ['dialogTableVisible'],
  data () {
    return {
      memberInfo: {},
      teamId: '',
      formMember: {
        uid: localStorage.getItem('uid'),
        limit: 10,
        page: 1
      },
      tableData: [],
      multipleSelection: [],
      total: 0,
      isEdit: false
    }
  },
  created() {
    this.getList(this.formMember)
  },
  methods: {
    getList(params) {
      adjustmentList(params).then(res => {
        console.log(res)
      })
    },
     handleSizeChange (val) {
      this.formMember.limit = val
      this.getList(this.formMember)
    },
    handleCurrentChange (val) {
      this.formMember.page = val
      this.getList(this.formMember)
    },
    handleEdit (row) {
      this.memberInfo = row
      this.teamId = row.uid
      this.$emit('handleEdit', row.uid)    
    },
    handleClose(){
      
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      this.$emit('handleSelectionChange', this.multipleSelection.length)
    },
    dismissTeam () {
      this.$emit('dismissTeam')
    },
    submitForm() {
    },
    onSubmit(){}
  }
}
</script>
<style lang="scss">
.member-dialog {
  .member-row  {
    &.turnover-row {
      text-align: left;
      .member-col1 {
        text-align: center;
      }
      .team-pagination {
        margin-top: 15px;
      }
      .memberForm {
        .el-input__inner {
          height: 38px;
          line-height: 38px;
        }
        .action-btn {
          margin-bottom:  0;
        }
        .el-form-item {
          margin-bottom: 12px;
        }
      }  
    }
  } 
}
.member-table {
  &.turnover-box {
    font-size:14px;
    padding: 20px 15px;
    .width300 {
      width: 300px;
    }
  }
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
      .width100 {
        width: 100px;
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