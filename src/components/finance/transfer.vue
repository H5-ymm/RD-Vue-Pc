<style lang="scss">
@import '@/assets/css/finance.scss';
.person-tag {
  margin-right: 15px;
  margin-bottom: 10px;
  height: 38px;
  line-height: 36px;
  border-radius: 2px;
  padding: 0 15px;
  color: #333;
  font-size:16px;
}
.add-tag {
  padding: 10px 25px;
  font-size:16px;
}
.account-person-box {
  flex-wrap: wrap;
  width: 400px;
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
        <p>收款人姓名</p>
        <div class="team-setting-box">
          <div class="x-flex-start account-person-box">
            <el-tag v-for="tag in tags" :key="tag.name" closable class="person-tag">{{tag.name}}</el-tag>
            <el-button size="small" class="add-tag" @click="dialogVisible=true">+ 添加</el-button>
          </div>
        </div>
      </div>
      <el-form label-width="80px" label-position="left" :model="form" class="my-acount-form">
        <el-form-item label="转账金额">
          <el-input v-model="form.name" class="width300" placeholder="请输入转账金额"></el-input>
        </el-form-item>
        <el-form-item label="转账备注">
          <el-input v-model="form.type" type="textarea" class="width300" placeholder="请输入转账备注"></el-input>
        </el-form-item>
        <el-form-item label="到账时间">
          <el-radio :label="1" v-model="form.time">实时到账</el-radio>
        </el-form-item>
        <el-form-item class="my-acount-btn">
          <div class="my-acount-btn">
            <el-button>取消</el-button>
            <el-button type="primary">转账</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <personalModal
      :dialogTableVisible="dialogVisible"
      title="转账成员"
      @handleClose="dialogVisible=false"
      @handleOk="handleOk"
      :personalList="personalList"
    ></personalModal>
    <transferModal :dialogTableVisible="visible" title="转账确认" @handleClose="visible=false"></transferModal>
  </div>
</template>
<script>
import personalModal from '../common/personalModal'
import transferModal from './transferModal'


export default {
  components: {
    personalModal,
    transferModal
  },
  data () {
    return {
      form: {
        name: '',
        region: '',
        type: '',
        time: 1
      },
      dialogVisible: false,
      visible: false,
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ],
      personalList: []
    }
  },
  methods: {
    handleOk () { }
  },
}
</script>