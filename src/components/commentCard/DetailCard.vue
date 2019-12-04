<template>
  <div class="edit-card">
    <p class="edit-card-title border-bottom bg-purple">
      <!-- 2019年12月1日晨会-查看详情 -->
      {{title}}
      <el-dropdown v-if="cardType==2">
        <el-button class="dropdown-button">
          <i class="el-icon-more"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <el-dropdown-item class="el-icon-top">&nbsp;置顶</el-dropdown-item>
          <el-dropdown-item class="el-icon-edit-outline">&nbsp;编辑</el-dropdown-item>
          <el-dropdown-item class="el-icon-delete">&nbsp;删除</el-dropdown-item>
          <el-dropdown-item class="el-icon-refresh-right">&nbsp;刷新</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </p>
    <ul class="edit-card-content">
      <li class="edit-card-item x-flex-start border-bottom">
        <p>发布者：</p>
        <p class="edit-input">{{teamInfo.name}}</p>
      </li>
      <li class="edit-card-item x-flex-start border-bottom">
        <p>标题：</p>
        <p
          :contenteditable="contenteditable"
          class="edit-input"
        >{{ cardType?teamInfo.title:'请输入标题'}}</p>
      </li>
      <li class="edit-card-item x-flex-start border-bottom">
        <p>分类：</p>
        <p>
          <span class="tag">{{teamInfo.sort}}</span>
        </p>
      </li>
      <li class="edit-card-item x-flex-start x-flex-wap border-bottom">
        <p>内容：</p>
        <p class="edit-card-item-content" v-html="teamInfo.content"></p>
        <p class="edit-card-comment bg-purple text-light">
          <span>{{teamInfo.time}}</span>
          <span class="el-icon-chat-dot-square">&nbsp;评论</span>
        </p>
      </li>
      <li class="edit-card-item x-flex-start">
        <img src="../../assets/img/img1.png" alt class="edit-card-comment-col1" />
        <div class="edit-card-comment-col2">
          <p>
            <span class="user-name">喜马拉雅</span>
            <span>：上周工作总体已完成，有两个项目已收尾，有三个项目已经做好准备工作，下周开始</span>
          </p>
          <p class="bg-purple text-light reply-btn">
            <span>2019-12-01</span>
            <span>回复</span>
          </p>
          <section class="edit-card-comment-section">
            <div class="x-flex-start border-bottom">
              <div class="edit-card-comment-col2">
                <p>
                  <span class="user-name">喜马拉雅</span>
                  <span>：上周工作总体已完成，有两个项目已收尾，有三个项目已经做好准备工作，下周开始</span>
                </p>
                <p class="bg-purple text-light">
                  <span>2019-12-01</span>
                  <span>回复</span>
                </p>
              </div>
            </div>
            <div class="x-flex-start">
              <div class="edit-card-comment-col2">
                <p>
                  <span class="user-name">喜马拉雅</span>
                  <span class="reply">回复</span>
                  <span class="user-name">喜马拉雅</span>
                  <span>：上周工作总体已完成，有两个项目已收尾，有三个项目已经做好准备工作，下周开始</span>
                </p>
                <p class="bg-purple text-light">
                  <span>2019-12-01</span>
                  <span class="reply-active">回复</span>
                </p>
              </div>
            </div>
            <div class="edit-card-textarea border-bottom">
              <div contenteditable class="textarea" v-html="emoji" ref="replyContent"></div>
              <div class="bg-purple edit-card-emoji">
                <img src="../../assets/img/emjo.png" alt @click="showEmoji=!showEmoji"/>
                <VEmojiPicker :pack="pack.data" v-show="showEmoji"  @select="selectEmoji" class="emoji-item" />
                <div>
                  <el-button size="mini">取消</el-button>
                  <el-button size="mini" type="primary">回复</el-button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import VEmojiPicker from 'v-emoji-picker';
import packData from 'v-emoji-picker/data/emojis.json';
export default {
  components: {
    VEmojiPicker
  },
  props: ['cardType', 'teamInfo'],
  data () {
    return {
      autoSize: { minRows: 1, maxRows: 4 },
      pack: packData,
      type: 0,  // 0新建 1 编辑 2查看
      contenteditable: false,
      emoji: '请输入内容',
      showEmoji:false
    }
  },
  computed: {
    title () {
      return this.cardType == 0 ? '新增' : this.cardType == 0 ? `${this.teamInfo.title}-编辑` : `${this.teamInfo.title}-查看详情`
    }
  },
  created () {
    if (this.cardType != 2) {
      this.contenteditable = true
    }
    else {
      this.contenteditable = false
    }
  },
  watch:{
    showEmoji(val){
      if (val) {
        document.getElementById('InputSearch').style.display="none"
      }
    }
  },
  mounted () {
  },
  methods: {
    selectEmoji (info) {
      console.log(info)
      this.emoji = info.emoji
      this.showEmoji = false
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
  .edit-input {
    /* height: 44px; */
    border: none;
    width: 70%;
    text-align: left;
    outline: none;
  }
  .edit-card-title{
    font-weight:bold;
    padding-left:30px;
  }
  .edit-card-item {
    /* border-bottom: 1px solid #eee; */
    padding: 12px 30px;
  }
  .el-dropdown .dropdown-button {
    background:rgba(255,255,255,1);
    border:1px solid rgba(238,238,238,1);
    box-shadow:0px 4px 4px 0px rgba(106,106,106,0.1);
    border-radius: 0;
    color: #333333;
    border-radius:0px 5px 5px 0px;
    font-size: 18px;
    padding: 12px 40px 11px;
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
  .edit-card-textarea {
    background: #fff;
    padding: 5px 10px 10px;
    /* margin-bottom: 5px; */
  }
  /* .edit-card-emoji {
   position: relative;
  } */
  .edit-card-emoji .emoji-item {
    position: absolute;
    top:30px;
    left: 0;
    z-index: 222;
    height: 256px;
  }
  .edit-card-textarea .textarea {
    margin: 10px 0;
    /* width: 100%; */
    height: 44px;
    font-size: 14px;
    border:1px solid #eee;
    padding: 0 12px;
    line-height: 44px;
  }
  .edit-card-textarea .textarea {
    border:1px solid #1890FF;
    outline: none;
  }
  textarea{
    resize:none!important;
  }
</style>