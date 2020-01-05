<template>
    <div class="x-flex-start-justify member-status">
      <el-tooltip
        class="item"
        effect="light"
        :content="formMember.mobile?'已认证':'未认证'"
        placement="bottom-start"
      >
        <img src="../../assets/img/member/phone.png" v-if="formMember.mobile" alt />
        <img src="../../assets/img/member/phone1.png" v-else alt />
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="light"
        :content="formMember.idcard_status?'已认证':'未认证'"
        placement="bottom-start"
      >
        <img src="../../assets/img/member/IDCard.png" alt v-if="formMember.idcard_status" />
        <img src="../../assets/img/member/IDCard1.png" alt v-else />
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="light"
        :content="formMember.alipay_status?'已认证':'未认证'"
        placement="bottom-start"
      >
        <img src="../../assets/img/member/zfb.png" alt v-if="formMember.alipay_status" />
        <img src="../../assets/img/member/zfb1.png" alt v-else />
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="light"
        :content="formMember.wx_status?'已认证':'未认证'"
        placement="bottom-start"
      >
        <img src="../../assets/img/member/wx.png" alt v-if="formMember.wx_status" />
        <img src="../../assets/img/member/wx1.png" alt v-else />
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="light"
        :content="formMember.bank_status?'已认证':'未认证'"
        placement="bottom-start"
      >
        <img src="../../assets/img/member/card.png" alt v-if="formMember.bank_status" />
        <img src="../../assets/img/member/card1.png" alt v-else />
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="light"
        :content="formMember.email_status?'已认证':'未认证'"
        placement="bottom-start"
      >
        <img src="../../assets/img/member/email.png" alt v-if="formMember.email_status" />
        <img src="../../assets/img/member/email1.png" alt v-else />
      </el-tooltip>
    </div>
</template>
<script>
export default {
  props:['formMember']
}
</script>

