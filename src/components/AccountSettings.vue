<style lang="scss">
@import '@/assets/css/formMessage.scss';
.teamMessage {
  &.account-settings {
    height: calc(100% - 20px);
    overflow: hidden;
  }
  .teamMessage-form-row {
    &.account-settings-row {
      padding: 40px;
      width: 90%;
      margin: 0;
      .teamMessage-form {
        width: 60%;
        margin: 0;
      }
      .input-readonly {
        .el-input__inner {
          border: 1px solid #fff;
          outline: none;
        }
      }
      .el-input__inner {
        border: 1px solid #eee;
        outline: none;
      }
      .user-avatar-box {
        width: 100px;
        margin: 0 30px;
        .avatar-uploader {
          .el-upload {
            width: 160px;
            height: 160px;
            background: #fff;
          }
        }
        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .avatar-btn {
          margin-top: 20px;
          margin-left: -60px;
        }
      }
      .el-form-item {
        margin-bottom: 40px;
      }
    }
    .member-status {
      margin-top: 12px;
      padding-left: 14px;
      img {
        margin-right: 20px;
      }
    }
  }
  .account-settings-btn {
    .el-button {
      margin-right: 35px;
      border-radius: 4px;
      padding: 8px 25px;
      &:nth-of-type(1) {
        padding: 8px 35px;
      }
    }
  }
}
</style>
<template>
  <div class="teamMessage account-settings">
    <div class="teamMessage-form-row account-settings-row">
      <el-form :model="personalForm" ref="personalForm" label-width="110px" class="teamMessage-form x-flex-start">
        <div>
          <el-form-item label="姓名 :" prop="user_name">
            <el-input v-model="personalForm.user_name" class="width408" :readonly="!isEdit" :class="{'input-readonly':!isEdit}" :placeholder="!isEdit?'--':'请输入姓名'"></el-input>
          </el-form-item>
          <el-form-item label="所在省市 :">
            <div class="width408">
              <districtSelet v-if="isEdit" @change="change" :placeholder="!isEdit?'--':'请选择省市区'" :class="{'input-readonly':!isEdit}" :address="address"></districtSelet>
              <el-input v-else v-model="place" :readonly="!isEdit" :class="{'input-readonly':!isEdit}" class="width408" :placeholder="!isEdit?'--':'请选择省市区'"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="街道地址 :">
            <el-input v-model="personalForm.address" :readonly="!isEdit" :class="{'input-readonly':!isEdit}" class="width408" :placeholder="!isEdit?'--':'请输入详细地址'"></el-input>
          </el-form-item>
          <el-form-item label="联系电话 :">
            <el-input v-model="personalForm.mobile" :readonly="!isEdit" :class="{'input-readonly':!isEdit}" class="width408" placeholder="--"></el-input>
          </el-form-item>
          <el-form-item label="邮箱 :">
            <el-input v-model="personalForm.email" :readonly="!isEdit" :class="{'input-readonly':!isEdit}" class="width408" :placeholder="!isEdit?'--':'请输入邮箱'"></el-input>
          </el-form-item>
          <el-form-item label="认证信息 :" v-if="!isEdit">
            <div class="x-flex-start-justify member-status">
              <el-tooltip class="item" effect="light" :content="personalForm.mobile?'已认证':'未认证'" placement="bottom-start">
                <img src="../assets/img/member/phone.png" v-if="personalForm.mobile" alt />
                <img src="../assets/img/member/phone1.png" v-else alt />
              </el-tooltip>
              <el-tooltip class="item" effect="light" :content="personalForm.idcard_status?'已认证':'未认证'" placement="bottom-start">
                <img src="../assets/img/member/IDCard.png" alt v-if="personalForm.idcard_status" />
                <img src="../assets/img/member/IDCard1.png" alt v-else />
              </el-tooltip>
              <el-tooltip class="item" effect="light" :content="personalForm.alipay_status?'已认证':'未认证'" placement="bottom-start">
                <img src="../assets/img/member/zfb.png" alt v-if="personalForm.alipay_status" />
                <img src="../assets/img/member/zfb1.png" alt v-else />
              </el-tooltip>
              <el-tooltip class="item" effect="light" :content="personalForm.wx_status?'已认证':'未认证'" placement="bottom-start">
                <img src="../assets/img/member/wx.png" alt v-if="personalForm.wx_status" />
                <img src="../assets/img/member/wx1.png" alt v-else />
              </el-tooltip>
              <el-tooltip class="item" effect="light" :content="personalForm.bank_status?'已认证':'未认证'" placement="bottom-start">
                <img src="../assets/img/member/card.png" alt v-if="personalForm.bank_status" />
                <img src="../assets/img/member/card1.png" alt v-else />
              </el-tooltip>
              <el-tooltip class="item" effect="light" :content="personalForm.email_status?'已认证':'未认证'" placement="bottom-start">
                <img src="../assets/img/member/email.png" alt v-if="personalForm.email_status" />
                <img src="../assets/img/member/email1.png" alt v-else />
              </el-tooltip>
            </div>
          </el-form-item>
          <el-form-item class="account-settings-btn">
            <el-button type="primary" v-if="!isEdit" @click="isEdit=true">修改</el-button>
            <el-button type="primary" v-if="isEdit" @click="submitForm('personalForm')">保存</el-button>
            <el-button @click="isEdit=false" v-if="isEdit">取消</el-button>
          </el-form-item>
        </div>
        <div class="user-avatar-box" v-if="isEdit||imageUrl">
          <el-upload class="avatar-uploader" action="customize" ref="upload" :disabled="!isEdit" :show-file-list="false" :http-request="upload">
            <el-avatar size="large" class="avatar" :src="imageUrl"></el-avatar>
            <el-button class="avatar-btn" v-if="isEdit">更换头像</el-button>
          </el-upload>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import districtSelet from '@/components/districtSelet'
import { getImg, getImgUrl } from '@/util/util'
import { uploadFile } from '@/api/upload'
import { getUserInfo, editUserInfo } from '@/api/user'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    districtSelet
  },
  data() {
    return {
      personalForm: {
        user_name: '',
        mobile: '',
        provinceid: '',
        cityid: '',
        three_cityid: '',
        address: '',
        email: '',
        head_img: '',
        uid: localStorage.getItem('uid'),
        id: ''
      },
      imageUrl: '',
      uid: localStorage.getItem('uid'),
      address: [],
      isEdit: false,
      place: ''
    }
  },
  created() {
    this.getInfo(this.uid)
    console.log(this.userInfo)
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  methods: {
    getInfo(uid) {
      getUserInfo({ uid })
        .then(res => {
          if (res.data) {
            let form = res.data || {}
            for (let key in this.personalForm) {
              this.personalForm[key] = form[key]
            }
            if (this.personalForm.head_img) {
              this.imageUrl = getImgUrl(this.personalForm.head_img)
            }
            if (form.provinceid) {
              this.place =
                form.provinceName + form.cityName + form.three_cityName
              this.address = [
                this.personalForm.provinceid,
                this.personalForm.cityid,
                this.personalForm.three_cityid
              ]
            }
          }
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    upload(params) {
      const _file = params.file
      const isLt2M = _file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('请上传2M以下的.xlsx文件')
        return false
      }
      uploadFile(_file)
        .then(res => {
          this.imageUrl = getImg(_file)
          this.personalForm.head_img = res.data.url
        })
        .catch(error => {
          if (error) {
            this.$message.warning(error.status.remind)
          }
        })
    },
    change(val) {
      this.personalForm.provinceid = val[0]
      this.personalForm.cityid = val[1]
      this.personalForm.three_cityid = val[2]
    },
    submitForm(personalForm) {
      this.$refs[personalForm].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('updateUserInfo', this.personalForm)
            .then(res => {
              if (res.status.code == 200) {
                this.isEdit = false
              }
            })
            .catch(error => {
              if (error) {
                this.$message.warning(error.status.remind)
              }
            })
        } else {
          return false
        }
      })
    },
    resetForm(personalForm) {
      this.$refs[personalForm].resetFields()
    }
  }
}
</script>

