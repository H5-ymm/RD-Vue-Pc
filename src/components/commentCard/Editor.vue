<template>
  <div id="editor" class="editor"></div>
</template>
<script>
import VEmojiPicker from 'v-emoji-picker';
import packData from 'v-emoji-picker/data/emojis.json';
import E from 'wangeditor'
import { upload } from '../../axios'
export default {
  props:['content'],
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
      packData
    }
  },
  mounted () {
    var editor = new E('#editor')
    let arr = packData.data.map(item => { return item.emoji })
    editor.customConfig.menus = this.menus
    editor.customConfig.emotions = [
      {
        title: 'emoji',
        type: 'emoji',
        content: arr
      }]
    editor.customConfig.customUploadImg = (files, insert) => {
      console.log(files)
      this.insert(files[0])
    }
    editor.create()
    if (this.content) {
      editor.txt.html(this.content)
    }
    else {
      editor.txt.html('请在此处开始您的创作')
    }
  },
  methods:{
    insert(imgUrl){
      upload(imgUrl).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss">
 .editor {
   width:92%;
 }
</style>