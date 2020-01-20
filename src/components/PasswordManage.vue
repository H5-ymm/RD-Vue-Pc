<style lang="scss">
.account-save-view.team-box {
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
        font-size: 16px;
      }
      .account-tip {
        color: #999999;
        font-size: 12px;
      }
    }
  }
  .account-save-col3 {
    padding-right: 110px;
    span {
      padding: 6px 0;
      margin-left: 30px;
      font-size: 16px;
      width: 66px;
      text-align: center;
      display: inline-block;
      color: #333333;
    }
    .account-btn {
      border-radius: 4px;
      border: 1px solid #3699ff;
      color: #3699ff;
    }
  }
}
</style>
<template>
  <div class="account-save-view account-password">
    <div class="account-save-box">
      <ul>
        <li class="x-flex-start-justify account-save-item">
          <div class="account-save-col1">
            <img src="../assets/img/account/password1.png" />
          </div>
          <div class="account-save-col2">
            <p class="account-title">账户密码</p>
            <!-- <p class="account-tip">{{item.text}}</p> -->
          </div>
          <div class="account-save-col3 x-flex-end">
            <span class="account-btn" @click="setPassword(phone,0)" v-if="!password">设置</span>
            <span class="account-btn" @click="editPassword(phone,0)" v-else>修改</span>
          </div>
        </li>
      </ul>
      <ul>
        <li class="x-flex-start-justify account-save-item">
          <div class="account-save-col1">
            <img src="../assets/img/account/password2.png" />
          </div>
          <div class="account-save-col2">
            <p class="account-title">支付密码</p>
            <!-- <p class="account-tip">{{item.text}}</p> -->
          </div>
          <div class="account-save-col3 x-flex-end">
            <span class="account-btn" @click="setPassword(phone,1)" v-if="!alipay_status">设置</span>
            <span class="account-btn" @click="editPassword(phone,1)" v-else>修改</span>
          </div>
        </li>
      </ul>
    </div>
    <accountDialog :title="title" :dialogTableVisible="dialogTableVisible" :slotName="slotName" @submitForm="submitForm" :isUpdate="isUpdate"></accountDialog>
    <noBindZfb :dialogTableVisible="visible" @submitForm="submitFormZfb"></noBindZfb>
  </div>
</template>

<script>
import {
  getUserBinkInfo,
  getUserMobile,
  setLoginPassword,
  editPayPassword,
  setPayPassword,
  editUserPassword
} from '@/api/user'
import accountDialog from './account/accountDialog'
import setUserPas from './account/setUserPas'
import setZfbPas from './account/setZfbPas'
import noBindZfb from './account/noBindZfb'
export default {
  components: {
    accountDialog,
    noBindZfb
  },
  data() {
    return {
      personalForm: {},
      dialogTableVisible: false,
      visible: false,
      uid: localStorage.getItem('uid'),
      isEdit: false,
      list: [
        {
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
        }
      ],
      slotName: '',
      title: '',
      isShowFooter: true,
      alipay_status: '',
      isUpdate: false,
      password: '',
      phone: '',
      activeIndex: -1
    }
  },
  created() {
    this.getInfo(this.uid)
    this.getMobilePas(this.uid)
  },
  methods: {
    getInfo(uid) {
      getUserBinkInfo({ uid }).then(res => {
        if (res.data) {
          const { uid, mobile, alipay_status, bank_status } = res.data
          this.personalForm = res.data
          this.alipay_status = alipay_status || bank_status
        }
      })
    },
    submitFormZfb() {
      ;(this.visible = false), this.$router.push('accountSafe')
    },
    getMobilePas(uid) {
      getUserMobile({ uid }).then(res => {
        if (res.data) {
          const { uid, phone, password } = res.data
          this.password = password
          this.phone = phone
        }
      })
    },
    setPassword(val, index) {
      this.activeIndex = index
      this.isUpdate = !this.isUpdate
      if (index == 0) {
        this.title = '设置账户密码'
        this.slotName = 'setUserPas'
        this.dialogTableVisible = true
      }
      if (index == 1) {
        if (this.alipay_status) {
          this.title = '设置支付密码'
          this.slotName = 'setZfbPas'
          this.dialogTableVisible = false
          this.visible = false
        } else {
          this.dialogTableVisible = false
          this.visible = true
        }
      }
    },
    editPassword(val, index) {
      this.isUpdate = true
      this.activeIndex = index
      if (index == 0) {
        this.title = '修改账户密码'
        this.slotName = 'setUserPas'
        this.dialogTableVisible = true
      }
      if (index == 1) {
        if (this.alipay_status) {
          this.title = '修改支付密码'
          this.dialogTableVisible = true
          this.slotName = 'setZfbPas'
        } else {
          this.visible = true
          this.dialogTableVisible = false
        }
      }
    },
    hanbleBind(val, index) {
      if (index == 0) {
        this.title = '设置账户密码'
        this.slotName = 'userPas'
        this.dialogTableVisible = true
      }
      if (index == 1) {
        this.title = '设置支付宝'
        if (this.alipay_status) {
          this.dialogTableVisible = false
          this.slotName = 'zfbPas'
        } else {
          this.visible = true
          this.dialogTableVisible = false
        }
      }
    },
    submitForm(val) {
      if (this.activeIndex == 0) {
        if (this.isUpdate) {
          this.updatePas(val)
        } else {
          this.setPas(val)
        }
      } else {
        if (this.isUpdate) {
          this.setPayPas(val)
        } else {
          this.updatePayPas(val)
        }
      }
    },
    setPas(val) {
      setLoginPassword(val)
        .then(res => {
          if (res.status.code == 200) {
            this.dialogTableVisible = false
            this.getUserMobile(this.uid)
          }
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    updatePas(val) {
      editUserPassword(val)
        .then(res => {
          if (res.status.code == 200) {
            this.dialogTableVisible = false
          }
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    setPayPas(val) {
      setPayPassword(val)
        .then(res => {
          if (res.status.code == 200) {
            this.dialogTableVisible = false
          }
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    updatePayPas(val) {
      editPayPassword(val)
        .then(res => {
          if (res.status.code == 200) {
            this.dialogTableVisible = false
          }
        })
        .catch(error => {
          this.$message.error(error.status.remind)
        })
    },
    resetForm(personalForm) {
      this.$refs[personalForm].resetFields()
    }
  }
}
</script>
