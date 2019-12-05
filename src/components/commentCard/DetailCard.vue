<template>
  <div class="edit-card" v-if="commentInfo">
    <p class="edit-card-title border-bottom bg-purple">
      <!-- 2019年12月1日晨会-查看详情 -->
      {{title}}
      <el-dropdown v-if="type==2" @command="handleCommand">
        <el-button class="dropdown-button">
          <i class="el-icon-more"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <el-dropdown-item class="el-icon-top" command="0" >&nbsp;{{commentInfo.is_top ? '置顶':'不置顶'}}</el-dropdown-item>
          <el-dropdown-item class="el-icon-edit-outline" command="1" v-if="commentInfo.uid==uid">&nbsp;编辑</el-dropdown-item>
          <el-dropdown-item class="el-icon-delete" command="2" v-if="commentInfo.uid==uid">&nbsp;删除</el-dropdown-item>
          <el-dropdown-item class="el-icon-refresh-right" command="3">&nbsp;刷新</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </p>
    <ul class="edit-card-content">
      <li class="edit-card-item x-flex-start border-bottom">
        <p>发布者：</p>
        <p class="edit-input">{{type==0 ? username : commentInfo.user_name}}</p>
      </li>
      <li class="edit-card-item x-flex-start border-bottom">
        <p>标题：</p>
        <p
          :class="{'add-title':type==0}"
          :contenteditable="contenteditable"
          @input="changeInput($event)"
          class="edit-input" 
        >{{type ? commentInfo.title: '请输入标题'}}</p>
      </li>
      <li class="edit-card-item x-flex-start border-bottom">
        <p>分类：</p>
        <p class="sort">
          <span v-for="(item,index) in commentSort" @click="selectSort(item.value)" :class="{'tag':item.value==sortType}" :key="index" v-show="type!=2">{{item.label}}</span>
          <span class="tag" v-if="commentInfo&&type==2">{{getSortType(commentInfo.type)}}</span>
        </p>
      </li>
      <li class="edit-card-item x-flex-start x-flex-wap border-bottom" v-if="type==2">
        <p>内容：</p>
        <p class="edit-card-item-content" v-html="commentInfo.content"></p>
        <p class="edit-card-comment bg-purple text-light">
          <span>{{commentInfo.addtime}}</span>
          <span class="el-icon-chat-dot-square" @click="isShow=!isShow">&nbsp;评论</span>
        </p>
      </li>
      <li class="edit-card-item" v-else>
        <div class=" bg-purple-start">
          <p>内容：</p>
          <Editor :content="commentInfo.content"></Editor>
        </div>
        <div class="edit-btn-box">
          <el-button type="primary" size="mini">提交</el-button>
          <el-button size="mini" @click="handleCancle">取消</el-button>
        </div>
      </li>
      <!-- 评论 -->
      <div v-if="type==2&&isShow">
        <ReplyCard :commentList="commentList" :username="commentInfo.user_name" @submitComment="submitComment"></ReplyCard>
      </div>    
    </ul>
  </div>
</template>
<script>
import { commentSort } from '../../base/base'
import ReplyCard from './ReplyCard'
import Editor from './Editor'
import { getReply, delReplyfirst, delReply, addReply, setTopComment, delDiscuss } from '../../api/comment'
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
      commentList: [], //评论列表
      params: {
        uid: '',
        discuss_id: ''
      },
      sortType: 0,
      isShow: false,
      uid: localStorage.getItem('uid'),
      username: localStorage.getItem('username'),
      comTitle: '',
      storeComment: {}
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
  },
  watch: {
    cardType (val) {
      this.type = val
      console.log(val)
      if (val != 2) {
        this.contenteditable = true
      } else {
        this.contenteditable = false
      }
    },
    commentInfo(val) {
      if (val) {
        this.storeComment = JSON.parse(JSON.stringify(val))
        this.comTitle = val.title
        this.sortType = val.type
        this.params.uid = val.uid
        this.params.discuss_id = val.id
        if (this.type == 2) {
          this.getCommentInfo(this.params)
        }
      } 
    }
  },
  methods: {
    // 获取文章详情
    getCommentInfo (params) {
      getReply(params).then(res => {
        const { data } = res.data
        this.commentList = data
        console.log(this.commentList)
      })
    },
    handleCommand(index){
      let params = {
        uid: this.commentInfo.uid
      }
      if (index==0) {
        let obj = {
          is_top : this.commentInfo.is_top  ? 0 : 1,
          discuss_id: this.commentInfo.id
        }
        params = Object.assign(obj,params)
        this.setTop(params)
      } else if (index ==1) {
        this.type = 1
        this.contenteditable = true
      }
      else if (index ==2) {
        params.id = this.commentInfo.id
        this.delComment(params)
      }
      else {
        params.discuss_id = this.commentInfo.id
        this.getCommentInfo(params)
      }
    },
    changeInput(e){
      console.log(e)
      this.comTitle = '请输入标题'
    },
    setTop(params){
      setTopComment(params).then(res=>{
        console.log(res)
        this.commentInfo.is_top = this.commentInfo.is_top ? 0 : 1
        this.$emit('refurbish')
      })
    },
    delComment(params) {
      delDiscuss(params).then(res=>{
        const { status } = res
        if (status.code == 200) {
          this.$emit('refurbish')
          this.$message.success('删除成功')
        }
        else {
          this.$message.error(res.status.remind)
        }
      })
    },
    handleCancle(){
      this.type = 2
      console.log(this.type)    
      if (this.type == 0 ) {
        this.$emit('refurbish')
      }
      else {
        this.getCommentInfo(this.params)
        this.contenteditable = false
      }
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
    selectSort(value) {
      this.sortType = value
      this.commentInfo.sort = value
    },
    // 提交评论
    submitComment (val) {
      console.log(val)
      addReply().then(res =>{
        console.log(res)
        this.getCommentInfo(this.params)
      })
    }
  }
}
</script>
<style lang="scss">
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
    border: none;
    width: 70%;
    text-align: left;
    outline: none;
    &.add-title {
      color: #999;
    }
  }
  .edit-card-title{
    font-weight:bold;
    padding-left:30px;
    height: 44px;;
  }
  .edit-card-item {
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
  .sort span{
    padding:0 22px;
  }
  .sort .tag {
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
</style>