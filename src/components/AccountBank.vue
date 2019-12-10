<template>
  <div class="account-bank-view">
    <div class="account-bank-box">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in list" :key="index">
          <ul class="account-bank-list account-bank-add" v-if="index==0">
            <li class="box-card-add x-flex-center">
              <i class="el-icon-plus"></i>
              <p>新增银行卡</p>
            </li>
          </ul>
          <ul class="account-bank-list" v-else>
            <li class="box-card-bank">
              <div class="account-bank-item">
                <div class="x-flex-start-justify bank-base-info">
                  <img src="../assets/img/account/wx.png" class="account-bank-col1" />
                  <!-- <span class="account-bank-col1"></span> -->
                  <div class="account-bank-col2">
                    <p class="account-title">{{item.bank_name}}</p>
                    <p class="account-tip">{{item.bank_id}}</p>
                  </div>
                  <div class="account-bank-col3">
                    <span>{{item.account_name}}</span>
                  </div>
                </div>
                <p class="bank-number x-flex-start-num">
                  <span v-for="i in 3" :key="i" class="hide-icon">***</span>
                  <span>{{item.bank_account_no | bankNo}}</span>
                </p>
              </div>
              <div class="box-card-footer x-flex-between">
                <div>
                  <p>预留手机：{{$moment(item.addtime).format('YYYY-MM-DD')}}</p>
                  <p>绑定时间：{{$moment(item.addtime).format('YYYY-MM-DD')}}</p>
                </div>
                <p class="bank-del-btn">删除</p>
              </div>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <accountDialog :dialogTableVisible="dialogTableVisible" slotName="phone">
      <div slot="phone">
        <bindPhone></bindPhone>
      </div>
    </accountDialog>
  </div>
</template>
<script>
import accountDialog from './account/accountDialog'
import bindPhone from './account/bindPhone'
import { getUserInfo, getBindBankList, getUserBinkInfo } from '@/api/user'
export default {
  components: {
    accountDialog,
    bindPhone
  },
  filters: {
    bankNo (val) {
      if (val) {
        return val.substr(val.length - 4, 4)
      }
    }
  },
  data () {
    return {
      personalForm: {},
      dialogTableVisible: false,
      imageUrl: '',
      uid: localStorage.getItem('uid'),
      address: [],
      isEdit: false,
      logo: '',
      list: []
    };
  },
  created () {
    this.getInfo(this.uid)
  },
  methods: {
    getInfo (uid) {
      getBindBankList({ uid }).then(res => {
        if (res.data) {
          this.list = res.data
          this.list.unshift({})
          console.log(this.list)
        }
      })
    },
    submitForm (personalForm) {
      this.$refs[personalForm].validate((valid) => {
        if (valid) {
          
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
  .account-bank-view.team-box {
    height: calc(100% - 80px);
    overflow: hidden;
    background: #fff;
    .account-bank-box {
      padding: 0 10px;
    }
    .account-bank-list {
      height: 169px;
      width: 260px;
      // background:#eee;
      border:2px solid rgba(238,238,238,1);
      border-radius:5px;
      margin: 30px 10px 30px 30px;
      &.account-bank-add {
        background:#eee;
        border:2px dotted rgba(238,238,238,1);
        height: 169px;
        .box-card-add {
          height: 100%;
          flex-wrap: wrap;
          > i {
            font-size: 26px;
            color: #999999;
            margin: 20px 0 -20px;
          }
          > p {
            width: 100%;
            color: #999999;
            text-align: center;
            margin-top: -20px;
          }
       } 
      }
    }
   
    .account-bank-item {
      padding: 10px 0;
      margin-left: 10px;
      height:90px;
      background: #fff;
      .bank-base-info {
        height:70px;
        line-height: 20px;
      }
      .account-bank-col1 {
        padding-left: 10px;
      }
      .account-bank-col2 {
        width: 70%;
        padding: 0 10px;
        .account-title {
          color: #000;
          font-size:16px;
        }
        .account-tip {
          color: #999999;
          font-size:12px;
        }
      }
      .x-flex-start-num {
        align-content: center;
        display: flex;
        justify-content: flex-start;
      }
      .bank-number {
        padding-left: 10px; 
        .hide-icon{
          margin-right: 10px;
          font-size: 26px;
        }
      }
    }
    .box-card-footer {
      height:40px;
      background:#F9F9F9;
      border-radius:0px 0px 5px 5px;
      padding: 10px 20px;
      font-size:12px;
      color: #333333;
      border:1px solid #EEEEEE;
      line-height: 20px;
      .bank-del-btn {
        border-radius:5px;
        height: 28px;
        font-size: 14px;
        border:1px solid #EEEEEE;
        width: 60px;
        line-height: 28px;
        text-align: right;
      }
    }
    .account-bank-col3 {
      width: 100px;
      text-align: right;
      padding-right:10px;
      font-size: 14px;
    }
   }
  .x-flex-end {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
