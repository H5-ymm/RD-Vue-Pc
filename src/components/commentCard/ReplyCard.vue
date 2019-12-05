<template>
  <div>
    <div class="edit-card-item x-flex-start" v-for="(item,index) in commentList" :key="index">
      <div class="edit-card-comment-col1">
        <img src="../../assets/img/img1.png" alt />
      </div>
      <div class="edit-card-comment-col2">
        <p>
          <span class="user-name">{{item.username}}</span>
          <span>：{{item.content}}</span>
        </p>
        <p class="bg-purple text-light reply-btn">
          <span>{{$moment(item.addTime).format('YYYY-MM-DD')}}</span>
          <span @click="handleComment(index,item,1)">{{uid==item.user_id?'删除':'回复'}}</span>
        </p>
       <section class="edit-card-comment-section" v-if="currentIndex == index">
        <div class="edit-card-textarea border-bottom">
          <div class="textarea x-flex-start">
            <span>{{username}}回复{{item.username}}:</span>
            <div class="contenteditable" contenteditable v-html="content" @focus="onfocus" @input="onDivInput($event)" ref="replyContent"></div>
          </div>
           <div class="bg-purple edit-card-emoji">
            <img src="../../assets/img/emjo.png" alt @click="showEmoji=!showEmoji" />
            <VEmojiPicker
              :pack="pack.data"
              v-show="showEmoji"
              @select="selectEmoji"
              class="emoji-item"
            />
            <div>
              <el-button size="mini" @click="cancleComment(1)">取消</el-button>
              <el-button size="mini" type="primary" @click="submitComment()">回复</el-button>
            </div>
          </div>
        </div>
      </section>
      <section class="edit-card-comment-section" v-if="item.replyList.length">
        <div class="x-flex-start border-bottom">
          <div class="edit-card-comment-col2">
            <p>
              <span class="user-name">喜马拉雅</span>
              <span>：上周工作总体已完成，有两个项目已收尾，有三个项目已经做好准备工作，下周开始</span>
            </p>
            <p class="bg-purple text-light">
              <span>2019-12-01</span>
              <span>{{uid==item.user_id?'删除':'回复'}}</span>
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
            <img src="../../assets/img/emjo.png" alt @click="showEmoji=!showEmoji" />
            <VEmojiPicker
              :pack="pack.data"
              v-show="showEmoji"
              @select="selectEmoji"
              class="emoji-item"
            />
            <div>
              <el-button size="mini">取消</el-button>
              <el-button size="mini" type="primary" @click="submitComment">回复</el-button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
 </div>
</template>
<script>
import VEmojiPicker from 'v-emoji-picker';
import packData from 'v-emoji-picker/data/emojis.json';
export default {
  props: ['commentList','username'],
  name: 'reply',
  components: {
    VEmojiPicker
  },
  data () {
    return {
      pack: packData,
      emoji: '',
      showEmoji: false,
      uid: localStorage.getItem('uid'),
      currentIndex: -1,
      currentChildIndex:-1,
      // paramsComment:{},
      content:'',
      type:0,
      id: ''
    }
  },
  watch: {
    showEmoji (val) {
      if (val) {
        document.getElementById('InputSearch').style.display = "none"
      }
    }
  },
  methods: {
    onfocus(){
      window.setTimeout(() => {
        var sel, range;
        if (window.getSelection && document.createRange) {
          range = document.createRange()
          range.selectNodeContents(edit)
          range.collapse(true)
          range.setEnd(edit, edit.childNodes.length)
          range.setStart(edit, edit.childNodes.length)
          sel = window.getSelection()
          sel.removeAllRanges()
          sel.addRange(range)
        } else if (document.body.createTextRange) {
          range = document.body.createTextRange()
          range.moveToElementText(edit)
          range.collapse(true)
          range.select()
        }
      }, 1)
    },
    handleComment(index,item,type){
      this.currentIndex = index
      // this.paramsComment = item
      this.id = item.id
      this.type = type
    },
    selectEmoji (info) {
      this.emoji = info.emoji
      this.comment += this.emoji
      this.showEmoji = false
    },
    onDivInput(e) {
      this.content = e.target.innerHTML
    },
    submitComment () {
      let params = {
        uid : localStorage.getItem('uid'),
        type: this.type,
        content: this.content,
        p_id: this.type - 1,
        discuss_id: this.id,
        comment_id:this.type - 1
      }
      this.$emit('submitComment', params)
    },
    cancleComment(index) {
      this.currentIndex = -1
      this.content = ''
      this.emoji = ''
    }
  }
}
</script>
<style lang="scss">
 .edit-card-comment-col1 {
    margin: 0 10px;
  }
  .edit-card-comment-col1 >img {
    width:50px;
    height:50px;
    border-radius:50%;
  }
  .edit-card-comment-col2 {
    font-size:14px;
    padding-top: 5px;
    width: 100%;
  }
  .edit-card-comment-section {
    /* width:100%; */
    width:100%;
    /* height:274px; */
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
  }
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
    min-height: 44px;
    font-size: 14px;
    border:1px solid #eee;
    padding: 10px 12px;
  }
  .contenteditable {
    min-height: 44px;
    outline: none;
    flex: 1;
    padding-left: 5px;
  }
  .edit-card-textarea .textarea {
    border:1px solid #1890FF;
  }
  textarea{
    resize:none!important;
  }
</style>
