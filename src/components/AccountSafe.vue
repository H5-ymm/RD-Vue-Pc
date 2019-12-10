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
            <span class="account-btn" v-if="index!=1">修改</span>
            <span class="account-btn" v-if="index==1">管理</span>
            <span class="account-btn" v-if="!item.status">绑定</span>
            <span v-if="item.status">已绑定</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import districtSelet from '@/components/districtSelet'
import { getImg, getImgUrl } from '@/util/util'
import { updateTeamInfo, getTeamInfo } from '@/api/team'
import { uploadFile } from '@/api/upload'
import { getUserInfo } from '@/api/user'
export default {
  components: {
    districtSelet
  },
  data () {
    return {
      personalForm: {},
      imageUrl: '',
      uid: localStorage.getItem('uid'),
      address: [],
      isEdit: false,
      logo: '',
      list: [{
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
      }, {
        type: '',
        status: 0,
        img: require('../assets/img/account/wx.png'),
        img1: require('../assets/img/account/wx1.png'),
        text1: '当前尚未绑定微信账号',
        text: '当前已绑定微信账号',
        title: '绑定微信'
      }, {
        type: '',
        status: 0,
        img: require('../assets/img/account/email.png'),
        img1: require('../assets/img/account/email1.png'),
        text1: '当前尚未绑定邮箱账号',
        text: '当前已绑定邮箱账号',
        title: '绑定邮箱'
      }]
    };
  },
  created () {
    this.getInfo(this.uid)
  },
  methods: {
    getInfo (uid) {
      getUserInfo({ uid }).then(res => {
        if (res.data) {
          const { uid, mobile, alipay_status, bank_status, email_status, wx_status, idcard_status } = res.data
          this.personalForm = res.data
          this.list[0].status = mobile ? 1 : 0
          this.list[1].status = bank_status
          this.list[2].status = alipay_status
          this.list[3].status = idcard_status
          this.list[4].status = wx_status
          this.list[5].status = email_status
          this.logo = getImgUrl(this.personalForm.log)
        }
      })
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
    height: calc(100% - 80px);
    overflow: hidden;
    background: #fff;
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
