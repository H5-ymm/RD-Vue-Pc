<template>
  <div class="account-save-view account-password">
    <div class="account-save-box">
      <ul v-for="(item,index) in list" :key="index" class="account-save-list">
        <li class="x-flex-start-justify account-save-item">
          <div class="account-save-col1">
            <img :src="item.img"/>
          </div>
          <div class="account-save-col2">
            <p class="account-title">{{item.title}}</p>
            <p class="account-tip">{{item.text}}</p>
          </div>
          <div class="account-save-col3 x-flex-end">
            <span class="account-btn" @click="setPassword(item,index)">设置</span>
            <span class="account-btn" @click="editPassword(item,index)">修改</span>
          </div>
        </li>
      </ul>
    </div>
     <accountDialog :title="title" :dialogTableVisible="dialogTableVisible" :isShowFooter="isShowFooter" :slotName="slotName">
      <div slot="userPas">
        <setUserPas :isUpdate="isUpdate"></setUserPas>
      </div>
      <div slot="zfbPas">
         <setZfbPas :isUpdate="isUpdate"></setZfbPas>
      </div>
    </accountDialog>
    <noBindZfb :dialogTableVisible="visible" @submitForm="$router.push('accountSafe')"></noBindZfb>
  </div>
</template>

<script>
import districtSelet from '@/components/districtSelet'
import { getImg, getImgUrl } from '@/util/util'
import { updateTeamInfo, getTeamInfo } from '@/api/team'
import { uploadFile } from '@/api/upload'
import { getUserInfo, getUserBinkInfo } from '@/api/user'
import accountDialog from './account/accountDialog'
import setUserPas from './account/setUserPas'
import setZfbPas from './account/setZfbPas'
import noBindZfb from './account/noBindZfb'
export default {
  components: {
    districtSelet,
    accountDialog,
    setZfbPas,
    setUserPas,
    noBindZfb
  },
  data () {
    return {
      personalForm: {},
      dialogTableVisible:false,
      visible:false,
      imageUrl: '',
      uid: localStorage.getItem('uid'),
      address: [],
      isEdit: false,
      logo: '',
      list: [{
        type: '',
        status: 0,
        img: require('../assets/img/account/password1.png'),
        text: '当前密码强度：',
        title: '账户密码'
      },
      {
        type: '',
        status: 0,
        img: require('../assets/img/account/password2.png'),
        text: '',
        title: '支付密码'
      }],
      slotName: '',
      title: '',
      isShowFooter: true,
      alipay_status: '',
      isUpdate: false
    }
  },
  created () {
    this.getInfo(this.uid)
  },
  methods: {
    getInfo (uid) {
      getUserBinkInfo({ uid }).then(res => {
        if (res.data) {
          const { uid, mobile, alipay_status } = res.data
          this.personalForm = res.data
          this.alipay_status = alipay_status
        }
      })
    },
    setPassword(val,index){
      this.isUpdate = false
      if (index == 0) {
        this.title='设置账户密码'
        this.slotName = 'userPas'
      }
      if (index == 1) {
        if (this.alipay_status) {
          this.title='设置支付密码'
          this.slotName = 'zfbPas'
          this.dialogTableVisible = false
        }
        else {
          this.dialogTableVisible = true
          this.visible = true
        }
      }
    },
    editPassword(val,index) {
      this.isUpdate = true
      if (index == 0) {
        this.title='修改账户密码'
        this.slotName = 'userPas'
        this.dialogTableVisible = true
      }
      if (index == 1) {
        if (this.alipay_status) {
          this.title='修改支付密码' 
          this.dialogTableVisible = false
          this.slotName = 'zfbPas'
        }
        else {
          this.visible = true
          this.dialogTableVisible = false
        }
      }
    },
    hanbleBind(val,index){
      if (index == 0) {
        this.title='设置账户密码'
        this.slotName = 'userPas'
        this.dialogTableVisible = true
      }
      if (index == 1) {
        this.title='设置支付宝'
        if (this.alipay_status) {
          this.dialogTableVisible = false
          this.slotName = 'zfbPas'
        }
        else {
          this.visible = true
          this.dialogTableVisible = false
        }
      }
    },
    upload (params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("请上传2M以下的.xlsx文件");
        return false;
      }
      uploadFile(_file).then(res => {
        this.imageUrl = getImg(_file)
        this.personalForm.log = res.data.url
      })
    },
    change (val) {
      this.personalForm.provinceid = val[0]
      this.personalForm.cityid = val[1]
      this.personalForm.three_cityid = val[2]
    },
    submitForm (personalForm) {
      this.$refs[personalForm].validate((valid) => {
        if (valid) {
          updateTeamInfo(this.personalForm).then(res => {
            if (res.status.code == 200) {
              this.$router.push('userlist')
            }
          }).catch(error => {
            this.$message.error(error.status.remind)
          })
        } else {
          return false
        }
      });
    },
    resetForm (personalForm) {
      this.$refs[personalForm].resetFields();
    },
    handleAvatarSuccess () { }
  }
}
</script>
<style lang="scss">
  .account-save-view.team-box {
    height: 100%;
    overflow: hidden;
    background: #fff;
    margin-bottom: 100px;
    &.account-password {
      height: calc(100% - 100px);
      margin-bottom: 50px;
    }
    .account-save-box {
      padding: 0 10px;
    }
    .account-save-col1 {
      padding-left: 100px;
      text-align: center;
      width: 90px;
      img {
        height: 100%;
      }
    }
    .account-save-item {
      padding: 30px 0;
      border-bottom: 1px solid #eee;
      .account-save-col2 {
        line-height: 25px;
        width: 76%;
        text-align: left;
        .account-title {
          color: #000;
          font-size:16px;
        }
        .account-tip {
          color: #999999;
          font-size:12px;
        }
      }
    }
    .account-save-col3 {
      padding-right:110px;
      span {
        padding: 6px 0;
        margin-left: 30px;
        font-size:16px;
        width: 66px;
        text-align: center;
        display: inline-block;
        color: #333333;
      }
      .account-btn {
        border-radius:4px;
        border: 1px solid #3699FF;
        color: #3699FF;
      }
    }
}
  .x-flex-end {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
