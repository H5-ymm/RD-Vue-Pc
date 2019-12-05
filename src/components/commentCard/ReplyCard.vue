<template>
  <div class="edit-card-item x-flex-start">
    <div class="edit-card-comment-col1">
      <img src="../../assets/img/img1.png" alt />
    </div>
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
            <img src="../../assets/img/emjo.png" alt @click="showEmoji=!showEmoji" />
            <VEmojiPicker
              :pack="pack.data"
              v-show="showEmoji"
              @select="selectEmoji"
              class="emoji-item"
            />
            <div>
              <el-button size="mini">取消</el-button>
              <el-button size="mini" type="primary" @click="submitCommit">回复</el-button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import VEmojiPicker from 'v-emoji-picker';
import packData from 'v-emoji-picker/data/emojis.json';
export default {
  props: ['commentList'],
  name: 'reply',
  components: {
    VEmojiPicker
  },
  data () {
    return {
      pack: packData,
      emoji: '请输入内容',
      showEmoji: false,
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
    selectEmoji (info) {
      this.emoji = info.emoji
      this.showEmoji = false
    },
    submitComment () {
      this.$emit('submitComment', this.emoji)
    }
  }
}
</script>