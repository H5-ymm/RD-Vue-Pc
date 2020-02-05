<template>
  <section class="edit-card-comment-section" v-if="isShow">
    <div class="edit-card-textarea border-bottom">
      <div class="textarea x-flex-start">
        <span>{{reName?'回复':'评论'}}{{createdName}}:</span>
        <div class="contenteditable" contenteditable v-html="content" @click="onfocus($event)" @input="onDivInput($event)" ref="replyContent"></div>
      </div>
      <div class="x-flex-between edit-card-emoji">
        <img src="../../assets/img/emjo.png" alt @click="showEmoji=!showEmoji" />
        <VEmojiPicker :pack="pack.data" v-show="showEmoji" @select="selectEmoji" class="emoji-item" />
        <div>
          <el-button size="mini" @click="cancleComment()">取消</el-button>
          <el-button size="mini" type="primary" @click="submitComment()">{{reName?'回复':'评论'}}</el-button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import VEmojiPicker from 'v-emoji-picker'
import packData from 'v-emoji-picker/data/emojis.json'
export default {
  props: ['createdName', 'isShow', 'reName'],
  name: 'reply',
  components: {
    VEmojiPicker
  },
  data() {
    return {
      pack: packData,
      emoji: '',
      showEmoji: false,
      uid: localStorage.getItem('uid'),
      content: '',
      type: 0,
      id: '',
      username: localStorage.getItem('username'),
      comment: '',
      conmentEmoji: ''
    }
  },
  created() {
    this.username = this.reName ? this.reName : localStorage.getItem('username')
  },
  watch: {
    showEmoji(val) {
      if (val) {
        document.getElementById('InputSearch').style.display = 'none'
      }
    },
    emoji(val) {
      if (!val) {
        this.content = ''
        this.conmentEmoji = ''
        this.comment = ''
      }
    },
    comment(val) {
      if (!val) {
        this.content = ''
        this.conmentEmoji = ''
        this.emoji = ''
      }
    }
  },
  methods: {
    onfocus() {
      if (window.getSelection) {
        let sel = window.getSelection()
        if (sel.getRangeAt && sel.rangeCount) {
          return sel.getRangeAt(0)
        }
      } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange()
      }
      return null
    },
    restoreSelection(range) {
      if (range) {
        if (window.getSelection) {
          let sel = window.getSelection()
          sel.removeAllRanges()
          sel.addRange(range)
        } else if (document.selection && range.select) {
          range.select()
        }
      }
    },
    selectEmoji(info) {
      this.emoji = info.emoji
      this.conmentEmoji += this.emoji
      this.content = this.comment + this.conmentEmoji
      this.showEmoji = false
    },
    onDivInput(e) {
      this.comment = e.target.innerText
    },
    submitComment() {
      let content = !this.content ? this.comment : this.content
      this.$emit('submitComment', content)
      this.content = ''
      this.conmentEmoji = ''
      this.emoji = ''
      this.comment = ''
    },
    cancleComment() {
      this.content = ''
      this.conmentEmoji = ''
      this.emoji = ''
      this.comment = ''
      this.$emit('cancleComment')
    }
  }
}
</script>
<style lang="scss">
.edit-card-textarea {
  background: #fff;
  padding: 5px 10px 10px;
}
.edit-card-emoji {
  position: relative;
}
.edit-card-emoji .emoji-item {
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 222;
  height: 256px;
}
.edit-card-textarea .textarea {
  margin: 10px 0;
  /* width: 100%; */
  min-height: 44px;
  font-size: 14px;
  border: 1px solid #eee;
  padding: 10px 12px;
}
.contenteditable {
  min-height: 44px;
  outline: none;
  flex: 1;
  padding-left: 5px;
  display: inline-block;
  -webkit-user-select: text;
  line-height: normal;
  &:focus {
    padding: 2px 10px;
  }
}
.edit-card-textarea .textarea {
  border: 1px solid #1890ff;
}
textarea {
  resize: none !important;
}
</style>
