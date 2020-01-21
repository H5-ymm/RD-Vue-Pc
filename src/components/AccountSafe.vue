<template>
  <div class="account-save-view">
    <div class="account-save-box">
      <ul v-for="(item,index) in list" :key="index" class="account-save-list">
        <li class="x-flex-start-justify account-save-item">
          <div class="account-save-col1">
            <img :src="item.img1" v-if="!item.status" />
            <img :src="item.img" v-else />
          </div>
          <div class="account-save-col2">
            <p class="account-title">{{item.title}}</p>
            <p class="account-tip">{{item.status ? item.text: item.text1}}</p>
          </div>
          <div class="account-save-col3 x-flex-end">
            <span class="account-btn" v-if="index==0&&item.status" @click="editMobile(item)">修改</span>
            <span class="account-btn" v-if="index==1" @click="$router.push('accountBank')">管理</span>
            <span class="account-btn" v-if="!item.status&&index!=3" @click="hanbleBind(item,index)">绑定</span>
            <span v-if="item.status">已绑定</span>
          </div>
        </li>
      </ul>
    </div>
    <accountDialog :title="title" :dialogTableVisible="dialogTableVisible" :slotName="slotName" :mobile="mobile" @submitForm="submitForm"></accountDialog>
  </div>
</template>

<script>
import accountDialog from './account/accountDialog'
import { getUserBinkInfo } from '@/api/user'
import {
  companyBinkInfo,
  bindEmail,
  userBinkBank,
  userBinkAlipay
} from '@/api/bind'
export default {
  components: {
    accountDialog
  },
  data() {
    return {
      personalForm: {},
      dialogTableVisible: false,
      uid: localStorage.getItem('uid'),
      isEdit: false,
      list: [
        {
          type: '',
          status: 0,
          img: require('../assets/img/account/phone.png'),
          img1: require('../assets/img/account/phone1.png'),
          text1: '当前尚未绑定手机号',
          text: '当前已绑定手机号',
          title: '绑定手机号'
        },
        {
          type: '',
          status: 0,
          img: require('../assets/img/account/bank.png'),
          img1: require('../assets/img/account/bank1.png'),
          text1: '当前尚未绑定银行卡账号',
          text: '当前已绑定银行卡账号',
          title: '绑定银行卡'
        },
        {
          type: '',
          status: 0,
          img: require('../assets/img/account/zfb.png'),
          img1: require('../assets/img/account/zfb1.png'),
          text1: '当前尚未绑定支付宝账号',
          text: '当前已绑定支付宝账号',
          title: '绑定支付宝'
        },
        {
          type: '',
          status: 0,
          img: require('../assets/img/account/card.png'),
          img1: require('../assets/img/account/card1.png'),
          text1: '绑定银行卡或者支付宝后自动绑定身份证',
          text: '当前已绑定身份证',
          title: '绑定身份证'
        },
        {
          type: '',
          status: 0,
          img: require('../assets/img/account/wx.png'),
          img1: require('../assets/img/account/wx1.png'),
          text1: '当前尚未绑定微信账号',
          text: '当前已绑定微信账号',
          title: '绑定微信'
        },
        {
          type: '',
          status: 0,
          img: require('../assets/img/account/email.png'),
          img1: require('../assets/img/account/email1.png'),
          text1: '当前尚未绑定邮箱账号',
          text: '当前已绑定邮箱账号',
          title: '绑定邮箱'
        }
      ],
      slotName: '',
      title: '',
      mobile: '',
      activeIndex: -1,
      type: localStorage.getItem('userType')
    }
  },
  created() {
    this.getInfo(this.uid)
  },
  methods: {
    getInfo(uid) {
      getUserBinkInfo({ uid })
        .then(res => {
          if (res.data) {
            const {
              uid,
              mobile,
              alipay_status,
              bank_status,
              email_status,
              wx_status,
              idcard_status
            } = res.data
            this.list[0].status = mobile ? 1 : 0
            this.list[1].status = bank_status
            this.list[2].status = alipay_status
            this.list[3].status = idcard_status
            this.list[4].status = wx_status
            this.list[5].status = email_status
            this.mobile = mobile
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    editMobile(val) {
      this.title = '修改绑定手机号'
      this.slotName = 'bindPhone'
      this.dialogTableVisible = true
    },
    hanbleBind(val, index) {
      this.dialogTableVisible = true
      this.activeIndex = index
      if (index == 4) {
        this.title = '绑定微信'
        this.slotName = 'bindWx'
      } else if (index == 1) {
        this.title = '绑定银行卡'
        this.slotName = 'bindBank'
      } else if (index == 2) {
        this.title = '绑定支付宝'
        this.slotName = 'bindZfb'
      } else if (index == 5) {
        this.title = '绑定邮箱'
        this.slotName = 'bindEmail'
      }
    },
    submitForm(val) {
      let activeIndex = this.activeIndex
      switch (activeIndex) {
        case 1:
          this.bindBank(val)
          break
        case 2:
          this.bindAlipay(val)
          break
        case 5:
          this.bindEm(val)
          break
        default:
          console.log('val')
      }
      this.dialogTableVisible = false
    },
    bindBank(val) {
      userBinkBank(val)
        .then(res => {
          this.getInfo(this.uid)
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    bindEm(val) {
      bindEmail(val)
        .then(res => {
          this.getInfo(this.uid)
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    bindAlipay(val) {
      userBinkAlipay(val)
        .then(res => {
          this.getInfo(this.uid)
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    }
  }
}
</script>
<style lang="scss">
.account-save-view.team-box {
  // height: 100%;
  // overflow: hidden;
  background: #fff;
  margin-bottom: 100px;
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
    width: 280px;
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
.x-flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
