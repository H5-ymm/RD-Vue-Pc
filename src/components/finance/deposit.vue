<style lang="scss">
@import '@/assets/css/finance.scss';
.my-account-view {
  .dialog {
    .is-plain {
      border: 1px solid #eee;
      color: #333;
      background: #fff;
    }
  }
}
</style>
<template>
  <div class="my-account-view">
    <div class="my-account-deposit">
      <div class="my-account-info">
        <p>账户余额（元）</p>
        <p class="money">100.00</p>
      </div>
      <div class="my-account-pay my-account-info">
        <p>支付方式</p>
        <div class="team-setting-box">
          <ul :span="6" class="x-flex-start">
            <li
              v-for="(item,index) in payTypeList"
              :key="index"
              @click="selectType(index,item)"
              class="grid-content-select"
              :class="{'grid-content-active':activIndex==index}"
            >
              <img :src="activIndex==index?item.imgUrl:item.imgUrl1" alt />
              <img
                src="../../assets/img/team/selected.png"
                alt
                class="select-tag"
                v-if="activIndex==index"
              />
            </li>
          </ul>
        </div>
      </div>
      <el-form label-width="80px" label-position="left" :model="form" class="my-acount-form">
        <el-form-item label="充值金额">
          <el-input v-model="form.name" class="width300" placeholder="请输入充值金额"></el-input>
        </el-form-item>
        <el-form-item label="充值备注">
          <el-input v-model="form.type" type="textarea" class="width300" placeholder="请输入充值备注"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="my-acount-btn">
            <el-button>取消</el-button>
            <el-button type="primary">充值</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <modal
      :dialogTableVisible="dialogVisible"
      @handleOk="handleOk"
      :modalObj="modalObj"
      @handleClose="dialogVisible=false"
    ></modal>
    <Dialog
      :centerDialogVisible="payDialogVisible"
      :modalInfo="modalInfo"
      @handleClose="payDialogVisible=false"
      @handleOk="payDialogVisible=false"
    ></Dialog>
    <payModal
      :dialogTableVisible="visible"
      :payType="payType"
      :payInfo="payInfo"
      @handleClose="visible=false"
    ></payModal>
  </div>
</template>
<script>
import modal from '../common/modal'
import payModal from './payModal'
import Dialog from '@/components/Dialog'
export default {
  components: {
    modal,
    Dialog,
    payModal
  },
  data () {
    return {
      form: {
        name: '',
        region: '',
        type: ''
      },
      activIndex: 0,
      payTypeList: [{
        imgUrl: require('../../assets/img/myAccount/zfb.png'),
        imgUrl1: require('../../assets/img/myAccount/zfb1.png'),
        type: 2
      }, {
        imgUrl: require('../../assets/img/myAccount/wx.png'),
        imgUrl1: require('../../assets/img/myAccount/wx1.png'),
        type: 1
      }],
      dialogVisible: false,
      payDialogVisible: false,
      visible: false,
      modalObj: {
        content: '账户余额不足，现在去充值吗？',
        okText: '取消',
        closeText: '去充值'
      },
      modalInfo: {
        title: '转账成功！',
        okText: '再转一笔',
        closeText: '返回',
        imgBg: require('../../assets/img/myAccount/paySuccess.png')
      },
      payInfo: {
        qrcode: require('../../assets/img/qrcode.png'),
        title: '微信扫一扫即可支付',
        iconUrl: require('../../assets/img/myAccount/wxIcon.png')
      },
      payType: 1 // 支付类型
    };
  },
  methods: {
    selectType (index, item) {
      this.activIndex = index
    },
    handleOk () {
      this.dialogVisible = false
    }
  },
}
</script>