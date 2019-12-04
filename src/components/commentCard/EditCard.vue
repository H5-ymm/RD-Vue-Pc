<template>
  <div class="edit-card">
    <p class="edit-card-title border-bottom bg-purple">2019年12月1日晨会-编辑</p>
    <ul class="edit-card-content">
      <li class="edit-card-item x-flex-start border-bottom">
        <p>发布者：</p>
        <p>哎呀妈呀</p>
      </li>
      <li class="edit-card-item x-flex-start border-bottom">
        <p>标题：</p>
        <p>哎呀妈呀</p>
      </li>
      <li class="edit-card-item x-flex-start border-bottom">
        <p>分类：</p>
        <p class="sort">
          <span class="tag">晨会</span>
          <span>晨会</span>
          <span>晨会</span>
          <span>晨会</span>
        </p>
      </li>
      <li class="edit-card-item x-flex-start border-bottom">
        <p>置顶：</p>
        <p>
          <el-radio-group v-model="isTop">
            <el-radio label="1">置顶</el-radio>
            <el-radio label="2">不置顶</el-radio>
          </el-radio-group>
        </p>
      </li>
      <li class="edit-card-item x-flex-start x-flex-wap border-bottom">
        <p>内容：</p>
        <p class="edit-card-item-content">2019年12月1日晨会 汇报各位上周的工作情况</p>
        <p class="edit-card-comment bg-purple text-light">
          <span>2019-12-01</span>
          <span class="el-icon-chat-dot-square">&nbsp;评论</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
// import VueEmoji from 'emoji-vue'
import VEmojiPicker from 'v-emoji-picker';
import packData from 'v-emoji-picker/data/emojis.json';
export default {
  components: {
    VEmojiPicker
  },
  data () {
    return {
      autoSize: { minRows: 1, maxRows: 4 },
      pack: packData,
      isTop: 1
    }
  },
  mounted () {
    console.log(packData)
  },
  methods: {
    selectEmoji (emoji) {
      console.log(emoji)
    }
  }
}
</script>
<style>
  .border-bottom {
    border-bottom: 1px solid#eee;
  }
  .edit-card {
    font-size: 14px;
    color: #333;
    border-radius:10px 10px 0px 0px;
  }
  .edit-card-content {
    width: 100%
  }
  .edit-card-title{
    font-weight:bold;
    padding-left:30px;
    height: 44px;
  }
  .edit-card-item {
    /* border-bottom: 1px solid #eee; */
    padding: 12px 30px;
  }
  .sort span{
    margin: 0 20px;
  }
  .el-dropdown .dropdown-button {
    background:rgba(255,255,255,1);
    border:1px solid rgba(238,238,238,1);
    box-shadow:0px 4px 4px 0px rgba(106,106,106,0.1);
    border-radius: 0;
    color: #333333;
    border-radius:0px 5px 5px 0px;
    font-size: 18px;
    padding: 10px 40px;
  }
  .edit-card-item > p:nth-of-type(1) {
    margin-right: 10px;
    text-align: right;
    width: 60px;
  }
  .tag {
    padding:0 22px;
    height:26px;
    color: #1890FF;
    line-height: 26px;
    background:rgba(220,238,254,1);
    border-radius:13px;
    display: inline-block;
  }
  .edit-card-item-content {
    width: 200px;
    line-height: 20px;
  }
  .x-flex-wap {
    flex-wrap: wrap
  }
  .edit-card-comment {
    width: 100%;
    padding: 15px 15px 0 70px;
  }
  .text-light {
    color: #999999;
    font-size: 12px;
    margin: 5px 0 10px;
  }
  .edit-card-comment-col1 {
    width:50px;
    height:50px;
    border-radius:50%;
    margin: 0 10px;
  }
  .edit-card-comment-col2 {
    /* margin-left: 10px; */
    font-size:14px;
    padding-top: 5px;
  }
  .edit-card-comment-section {
    /* width:100%; */
    height:274px;
    background:#F4F4F4;
    border-radius:5px;
    padding: 5px 15px 5px 10px;
  }
  .reply-btn {
    padding-right: 15px;
  }
  .reply-active {
    color: #333;
  }
  .user-name {
    color: #1890FF;
  }
  .reply {
    margin: 0 4px;
    color: #333;
    font-weight:400;
  }
  /* .edit-card-textarea {
    background: #fff;
    padding: 5px 10px 10px;
  } */
  .edit-card-emoji {
   position: relative;
  }
  .edit-card-emoji .emoji-item {
    position: absolute;
    top:30px;
    left: 10px;
    z-index: 222;
    height: 180px;
  }
  .edit-card-textarea .textarea {
    margin: 10px 0;
  }
  textarea{
    resize:none!important;
  }
</style>