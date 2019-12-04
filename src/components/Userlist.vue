<template>
  <div class="tables-box">
    <div>
      <el-row :gutter="20" class="team-info-row">
        <el-col :span="6"> 
          <el-card  class="box-card" >
            <p>团队名称</p>
            <p>天天向上</p>
          </el-card>
        </el-col>
        <el-col :span="6"> 
          <el-card  class="box-card" >
            <p>团队成员</p>
            <p>88</p>
          </el-card>
        </el-col>
         <el-col :span="6"> 
          <el-card  class="box-card" >
            <p>简历总数</p>
            <p>100份</p>
          </el-card>
        </el-col>
        <el-col :span="6"> 
          <el-card  class="box-card" >
            <p>已入职</p>
            <p>33人</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="table-list">
      <el-table
      class="table"
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column label="序号" type="selection" align="center" width="60"></el-table-column>
      <el-table-column label="姓名" prop="name"  align="center" width="100"></el-table-column>
      <el-table-column label="联系电话" prop="mobile"  align="center"  width="160"></el-table-column>
      <el-table-column label="所属部门" prop="name"  align="center" width="100"></el-table-column>
      <el-table-column label="等级" prop="mobile" sortable align="center"  width="160"></el-table-column>
      <el-table-column label="直属上级" prop="name"  align="center" width="100"></el-table-column>
      <el-table-column label="简历数量" prop="number"  align="center"  width="80"></el-table-column>
      <el-table-column label="入职人数" prop="number"  align="center" width="80"></el-table-column>
      <el-table-column label="最近登录时间" prop="loginTime"  align="center"  width="260"></el-table-column>
      <el-table-column label="状态" prop="status"  align="center"  width="80"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClickB(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleClickB(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="team-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
   </div>
  </div>
</template>

<script>
import Breadcrumb from './breadcrumb/Breadcrumb'
export default {
    data() {
      return {
        breadcrumb:['设置','管理控制','全部管理员'],
        tableData: [{
          name:'杨萌萌',
          mobile:'18337806536',
          number:23,
          status: '锁定',
          loginTime:'2019-11-30 18:35:50'
        }],
        currentPage:1
      }
    },
    created(){
        // 初始化查询标签数据
        // this.reverseUser()
       
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClickB:function(row){  //删除按钮
        if(this.$store.state.user.desc>1){
                 this.$alert('此账号为测试账号,无法进行此操作', '温馨提示', {
                    confirmButtonText: '确定',
                        callback: ()=> {
                            this.$message({
                            type: 'info',
                            message: '取消操作'
                            });
                        }
                    });
                return false;
            }
            this.$confirm('此操作将永久删除该用户, 是否继续?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    
                    this.$http({
                        url:'removeNames',
                        method:"POST",
                        data:{
                            userid:row._id
                        }
                    }).then(res=>{
                        if(res.data.code==0){
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });  
                            for(let i=0;i<this.tableData.length;i++){
                                    if(this.tableData[i]['_id']==row._id){
                                        this.tableData.splice(i,1) 
                                    }
                                }
                        }

                    }).catch(()=>{
                         this.$message({
                                type: 'warning',
                                message: '未知错误'
                            });  
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        reverseUser:function(){
            this.$http({
                url:'allNames',
                method:'POST',
            })
            .then(res=>{
              //  console.log(res)
                this.tableData=res.data.data
            })
        }
    },
    components:{
        Breadcrumb
    }
}
</script>

<style>
.table {
  /* height: calc(100% - 600px); */
  /* padding: 10px; */
}
.table .el-table__body-wrapper {
  /* min-height: calc(100% - 700px); */
}
.table .el-table--scrollable-x .el-table__body-wrapper {
  /* height: calc(100% - 90px); */
}
.team-pagination {
  padding: 20px 0;
}
.table-list {
  background: #fff;
  border-radius:10px;
  height: calc(100% - 500px);
}
.tables-box{
  /* margin: 20px; */
  overflow: hidden;
}
.team-info-row {
  margin: 20px 0;
}
.box-card {
  height: 126px;
  background: #7F80FE;
  color: #fff;
  padding-left: 20px;
  padding-top: 10px;
  /* padding: 20px 10px; */
}
.box-card p {
  font-size:16px;
}
.box-card p:nth-of-type(2) {
  font-size:38px;
  margin-top: 10px;
}
</style>
