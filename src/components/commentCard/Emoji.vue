<template>
  <div class="emoji">
    <el-tabs v-model="activeFace">
      <el-tab-pane label="表情" name="face"></el-tab-pane>
    </el-tabs>
    <div class="emotion-box-line" v-for="(line, i) in list" :key="i">
      <emotion
        class="emotion-item"
        v-for="(item, i) in line"
        :key="i"
        @click.native="clickHandler(item)"
      >{{item}}</emotion>
    </div>
    <!-- <ul class="emoji-container">
      <li v-for="(item, index) in faceList" :key="index" @click="shoseEmoji(item)">
        <img
          :src="'https://emojipedia-us.s3.amazonaws.com/thumbs/60/apple/76/'+ item.url"
          alt
          style="width :30px;height: 30px;display: block"
        />
        <a href="javaScript:;"></a>
      </li>
    </ul>-->
  </div>
</template>
<script>
export default {
  name: 'emoji',
  data () {
    return {
      activeFace: 'face',
      faceList: [
        { value: '\ud83d\ude00', url: 'grinning-face_1f600.png' }
      ],
      list: []
    }
  },
  mounted () {
    // const name = this.$el.innerHTML
    this.list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
    // let index = list.indexOf(name)
    // let imgHTML = `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`
    // this.$nextTick(() => {
    //   this.$el.innerHTML = imgHTML
    // })
  },
  methods: {
    shoseEmoji (emoji) {
      this.$emit('select', emoji)
    }
  }
}
</script>
<style>
  .emoji {
    width: 480px;
    height: 186px;
    bottom: 50px;
    background: #fff;
    z-index: 10;
    padding: 10px;
    margin-right: 10px;
    background: white;
    overflow-y: scroll;
    border-radius: 10px;
  }
  .emoji-container {
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
  }
  .emoji-container li {
    float: left;
    width:30px;
    height: 30px;
    margin: 5px
  }
  .emoji-container li a {
    display: block;
    float: left;
    overflow: hidden;
    width: 35px;
    height: 35px;
    display:flex;
    justify-content:center;
    align-items:center;
    transition: all ease-out .2s;
    border-radius: 4px;
  }
  .emoji-container li a img {
    display: block;
    width: 30px;
    height: 30px;
  }
  .emoji-container li a:hover {
    background-color: #d8d8d8;
    border-color: #d8d8d8;
  }

</style>