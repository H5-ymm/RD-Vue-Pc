<template>
  <div id="editor" class="editor"></div>
</template>
<script>
import VEmojiPicker from 'v-emoji-picker';
import packData from 'v-emoji-picker/data/emojis.json';
import E from 'wangeditor'
import { upload } from '../../axios'
import { getImg, getImgUrl } from '../../util/util'
export default {
  props: ['content'],
  data () {
    return {
      menus: [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        // 'foreColor',  // 文字颜色
        // 'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'undo',  // 撤销
        'redo'  // 重复
      ],
      packData,
      editor: {},
      contentHtml: ''
    }
  },
  mounted () {
    this.editor = new E('#editor')
    let arr = packData.data.map(item => { return item.emoji })
    this.editor.customConfig.onchange = html => {
      // html 即变化之后的内容
      // this.contentHtml = html
      this.$emit('saveConent', html)
    }
    this.editor.customConfig.onfocus = () => {
      this.contentHtml = '请在此处开始您的创作'
    }
    this.editor.customConfig.menus = this.menus
    this.editor.customConfig.emotions = [
      {
        title: 'emoji',
        type: 'emoji',
        content: arr
      }]

    this.editor.customConfig.customUploadImg = (files, insert) => {
      this.insert(files[0])
    }
    this.editor.customConfig.uploadImgShowBase64 = true
    this.editor.create()
    if (this.content) {
      this.editor.txt.html(this.content)
    }
    else {
      this.editor.txt.html('请在此处开始您的创作')
    }
  },
  watch: {
    contentHtml (val) {
      if (val) {
        this.editor.txt.html('')
      }
    },
  },
  methods: {
    insert (imgUrl) {
      upload(imgUrl).then(res => {
        // let src = getImg(imgUrl)
         let src = getImgUrl(res.data.url)
        let img = "<img class='imgBg' src=" + src + " />"
        this.editor.cmd.do('insertHTML', img)
      })
    }
  }
}
</script>

<style lang="scss">
 .editor {
   width:92%;
    .w-e-text-container,.w-e-toolbar {
      border: 1px solid #eee!important;
    }
   .imgBg {
     width: 120px;
     height: 80px;
   }
   .w-e-text {
     padding: 10px;
     overflow-y: auto;
   }
 }
</style>