<template>
  <div class="edit-card" v-if="commentInfo">
    <p class="edit-card-title border-bottom bg-purple">
      <!-- 2019年12月1日晨会-查看详情 -->
      {{title}}
      <el-dropdown v-if="type==2">
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
        <p class="edit-input">{{commentInfo.user_name}}</p>
      </li>
      <li class="edit-card-item x-flex-start border-bottom">
        <p>标题：</p>
        <p
          :contenteditable="contenteditable"
          class="edit-input"
        >{{ cardType?commentInfo.title:'请输入标题'}}</p>
      </li>
      <li class="edit-card-item x-flex-start border-bottom">
        <p>分类：</p>
        <p>
          <span class="tag" v-if="commentInfo">{{getSortType(commentInfo.type)}}</span>
        </p>
      </li>
      <li class="edit-card-item x-flex-start x-flex-wap border-bottom" v-if="type">
        <p>内容：</p>
        <p class="edit-card-item-content" v-html="commentInfo.content"></p>
        <p class="edit-card-comment bg-purple text-light">
          <span>{{commentInfo.addtime}}</span>
          <span class="el-icon-chat-dot-square">&nbsp;评论</span>
        </p>
      </li>
      <li class="edit-card-item bg-purple-start x-flex-wap" v-else>
        <p>内容：</p>
        <Editor></Editor>
        <div class="edit-btn-box">
          <el-button type="primary" size="mini">提交</el-button>
          <el-button size="mini">取消</el-button>
        </div>
      </li>
      <!-- 评论 -->
      <ReplyCard :commentList="commentList" @submitComment="submitComment"></ReplyCard>
    </ul>
  </div>
</template>
<script>
import { commentSort } from '../../base/base'
import ReplyCard from './ReplyCard'
import Editor from './Editor'
import { getReply, delReplyfirst, delReply } from '../../api/comment'
export default {
  components: {
    ReplyCard,
    Editor
  },
  props: ['cardType', 'commentInfo'],
  data () {
    return {
      commentSort,
      type: 2,  // 0新建 1 编辑 2查看
      contenteditable: false, // 可编辑
      commentList: [] //评论列表
    }
  },
  computed: {
    title () {
      if (this.commentInfo) {
        return this.cardType == 0 ? '新增' : this.cardType == 0 ? `${this.commentInfo.title}-编辑` : `${this.commentInfo.title}-查看详情`
      }
    }
  },
  created () {
    this.type = this.cardType
    if (this.type == 2) {
      this.getCommentInfo()
    }
  },
  watch: {
    cardType (val) {
      this.type = val
      if (val != 2) {
        this.contenteditable = true
      }
      else {
        this.contenteditable = false
      }
    }
  },
  methods: {
    // 获取文章详情
    getCommentInfo () {
      let params = {
        uid: this.commentInfo.uid,
        discuss_id: this.commentInfo.id
      }
      getReply(params).then(res => {
        const { data } = res.data
        this.commentList = data
      })
    },
    // 分类
    getSortType (val) {
      let obj = this.commentSort.find(item => {
        return val == item.value
      })
      if (obj) {
        return obj.label
      }
    },
    // 提交评论
    submitComment (val) {
      console.log(val)
    }
  }
}
</script>
<style>
  .border-bottom {
    border-bottom: 1px solid#eee;
  }
  .w-e-text-container,.w-e-toolbar {
    border: 1px solid #eee!important;
  }
  .w-e-text {
    overflow-y: auto;
    padding: 10px;
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
  .edit-btn-box {
    margin: 40px 70px;
  }
  .edit-btn-box .el-buton {
    border-radius: 0;
    margin-right: 30px;
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
    margin: 0 10px;
  }
  .edit-card-comment-col1 >img {
 width:50px;
    height:50px;
    border-radius:50%;
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