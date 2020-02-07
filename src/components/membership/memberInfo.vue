<style lang="scss">
@import '@/assets/css/dialog.scss';
</style>
<template>
  <el-dialog width="500px" :visible="dialogTableVisible" class="member-dialog" :show-close="false">
    <div class="member-row" v-if="formMember">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <div class="head-box">
          <img src="../../assets/img/headIcon3.png" class="head" alt v-if="!formMember.log" />
          <img :src="getImgUrl(formMember.log)" alt="" v-else>
        </div>
        <p>{{formMember.user_name}}</p>
      </section>
      <section class="member-col2">
        <div class="x-flex-center">
          <p>联系电话</p>
          <p>{{formMember.mobile}}</p>
        </div>
        <div class="x-flex-center">
          <p>户籍所在地</p>
          <p>河南省</p>
        </div>
        <div class="x-flex-center">
          <p>学历</p>
          <p>{{formMember.educationName}}</p>
        </div>
        <div class="x-flex-center" v-if="userPosition!=1||isView||uid==formMember.uid">
          <p>当前职称</p>
          <p>{{formMember.grade_name}}</p>
        </div>
        <div class="x-flex-center" v-if="userPosition!=1||isView||uid==formMember.uid">
          <p>部门</p>
          <p>{{formMember.depart_name}}</p>
        </div>
        <div class="x-flex-center">
          <p>拥有简历</p>
          <p>{{formMember.export_num}}</p>
        </div>
        <div class="x-flex-center">
          <p>入职人数</p>
          <p>{{formMember.entry_num}}</p>
        </div>
        <div class="x-flex-center">
          <p>最后登录时间</p>
          <p>{{formMember.logout_time?$moment.unix(formMember.logout_time).format('YYYY-MM-DD HH:mm'):'-'}}</p>
        </div>
        <div class="x-flex-center" v-if="userPosition==3||isView">
          <p>当前状态</p>
          <p>{{formMember.status == 1 ? '正常': '锁定'}}</p>
        </div>
        <div class="x-flex-center" v-if="userPosition!=3&&isView">
          <p>认证信息</p>
          <p>
            <memberTooltip :formMember="formMember"></memberTooltip>
          </p>
        </div>
      </section>
      <section class="member-col3" :class="{'member-col4':isView}" v-if="!isView">
        <el-form :model="formMember" class="demo-form-inline" label-width="120px">    
          <div v-if=" uid!=formMember.uid">
            <el-form-item label="部门" v-if="userPosition==1">
              <el-select placeholder="请选择" :disabled="isView&&user!=1" v-model="depId" @change="selectDep">
                <el-option :label="item.depart_name" :value="item.id" v-for="(item,index) in depList" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="当前职称" v-if="userPosition==1">
              <el-select v-model="formMember.grade_id" :disabled="isView" value-key="grade_name" placeholder="请选择">
                <el-option :label="item.grade_name" :value="item.id" v-for="item in jobList" :key="item.grade_name"></el-option>
              </el-select>
            </el-form-item>   
          </div>
           <el-form-item label="当前状态">
              <el-radio-group v-model="formMember.status" :disabled="isView">
                <el-radio :label="1" border>正常</el-radio>
                <el-radio :label="2" border>锁定</el-radio>
              </el-radio-group>
            </el-form-item>
          <el-form-item label="活动形式" v-if="formMember.status==2">
            <el-input type="textarea" :autosize="{ minRows: 3}" :readonly="isView" v-model="formMember.remark" placeholder="请输入锁定说明（必填）"></el-input>
          </el-form-item>
          <el-form-item label="认证信息">
            <memberTooltip :formMember="formMember"></memberTooltip>
          </el-form-item>
        </el-form>
      </section>
    </div>
    <div slot="footer" class="member-footer">
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" v-if="!isView" @click="submitMember">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 部门经理只能编辑状态
// 成员只能查看
// 总经理可以编辑部门 职称 状态
import { seeTeamUserInfo, departmentRoleList } from '@/api/team'
import { getConstant } from '@/api/dictionary'
import memberTooltip from './memberTooltip'
import { getImgUrl } from '@/util/util'
export default {
  props: ['dialogTableVisible', 'memberInfo', 'memberType', 'userId', 'isView'],
  components: {
    memberTooltip
  },
  data() {
    return {
      formMember: {},
      jobList: [],
      depList: [],
      depId: '',
      userPosition: sessionStorage.getItem('userPosition'),
      user: '',
      uid: localStorage.getItem('uid')
    }
  },
  created() {
    this.getJobList()
  },
  watch: {
    userId(val) {
      if (val) {
        this.getInfo(val)
      } else {
        this.formMember = {
          user_name: ''
        }
      }
    }
  },
  methods: {
    getImgUrl,
    getInfo(id) {
      let params = {
        userId: id,
        uid: localStorage.getItem('uid')
      }
      seeTeamUserInfo(params).then(res => {
        this.formMember = res.data.data
        this.user = res.data.user
        if (!this.formMember.grade_id) {
          this.formMember.grade_id = ''
        }
        if (this.formMember.grade_id && this.depList.length) {
          this.depId = this.getJob(this.depList, this.formMember.grade_id)
          if (!this.depId) {
            this.formMember.grade_id = ''
          }
          this.jobList = this.getArr(this.depList, this.depId)
        } else {
          this.formMember.grade_id = ''
        }
        if (res.data.provinceid && res.data.cityid) {
          this.address = [
            res.data.provinceid,
            res.data.cityid,
            res.data.three_cityid
          ]
        }
      })
    },
    // 获取职位
    getJob(arr, id) {
      let depId
      arr.forEach(item => {
        if (item.child) {
          item.child.forEach(val => {
            if (val.id == id) {
              depId = val.depart_id
            }
          })
        }
      })
      return depId
    },
    getArr(arr, id) {
      let newArr = []
      arr.forEach(item => {
        if (item.id == id) {
          newArr = item.child
        }
      })
      return newArr
    },

    getJobList() {
      let uid = this.uid
      departmentRoleList({ uid }).then(res => {
        this.depList = res.data
      })
    },
    selectDep(val) {
      this.jobList = this.getArr(this.depList, val)
    },
    handleClose() {
      this.$parent.dialogTableVisible = false
    },
    submitMember() {
      let params = {
        uid: this.formMember.uid,
        grade_id: this.formMember.grade_id,
        status: this.formMember.status,
        provinceid: this.formMember.provinceid,
        cityid: this.formMember.cityid,
        three_cityid: this.formMember.three_cityid,
        remark: this.formMember.remark
      }
      this.$emit('submitMember', params)
    }
  }
}
</script>
