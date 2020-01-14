<style lang="scss">
  .team-center-section {
    background: #fff;
    padding: 20px 15px 0;
    height:90%;
  }
</style>
<template>
  <div class="team-center-section">
    <orderQuery :timeList="timeList" @selectQuery="selectQuery"></orderQuery>
    <allOrder :orderData="orderData"></allOrder>
    <infoTip :centerDialogVisible="dialogVisible" :modalInfo="modalInfo" @handleClose="dialogVisible=false"></infoTip>
  </div>
</template>
<script>
import allOrder from './allOrder'
import orderQuery from './orderQuery'
import { getrank } from '@/api/teamCenter'
import infoTip from '../common/infoTip'
export default {
  components: {
    orderQuery,
    allOrder,
    infoTip
  },
  data () {
    return {
      timeList: [
        { label: '本周', value: 1 },
        { label: '本月', value: 2 },
        { label: '季度', value: 3 },
        { label: '本年', value: 4 }
      ],
      parasm: {
        type: 1,
        uid: localStorage.getItem('uid')
      },
      orderData: {},
      dialogVisible: false,
      modalInfo: {
        title: '您的信息未完善！',
        okText: '前去完善',
        closeText: '',
        imgBg: require('../../assets/img/info.png')
      }
    }
  },
  mounted () {
    if (localStorage.getItem('teamType') == 0) {
      console.log(localStorage.getItem('teamType'))
      this.dialogVisible = true
      return false
    }
    else {
      this.getList(this.parasm)
    }
  },
  methods: {
    getList (parasm) {
      getrank(parasm).then(res => {
        this.orderData = res.data
      }).catch(error => {
        this.$message.error(error.status.remind)
      })
    },
    selectQuery (val) {
      this.parasm = Object.assign(this.parasm, val)
      this.getList(this.parasm)
    }
  },
}
</script>