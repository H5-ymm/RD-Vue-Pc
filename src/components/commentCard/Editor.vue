<template>
  <div id="editor" class="editor"></div>
</template>
<script>
import VEmojiPicker from 'v-emoji-picker';
import packData from 'v-emoji-picker/data/emojis.json';
import E from 'wangeditor'
export default {
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
    console.log(packData.data)
    let arr = packData.data.map(item => { return item.emoji })
    console.log(arr)
    editor.customConfig.menus = this.menus
    editor.customConfig.emotions = [
      // {
      //   // tab 的标题
      //   title: '默认',
      //   // type -> 'emoji' / 'image'
      //   type: 'image',
      //   // content -> 数组
      //   content: [
      //     {
      //       alt: '[坏笑]',
      //       src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
      //     },
      //     {
      //       alt: '[舔屏]',
      //       src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
      //     }
      //   ]
      // },
      {
        // tab 的标题
        title: 'emoji',
        type: 'emoji',
        content: arr
      }]
    editor.create()
    editor.txt.html('请在此处开始您的创作')
  },
}
</script>

<style>

</style>