<style lang="scss">
  .team-panel-section {
    padding: 0 15px 20px;
    background: #fff;
    margin-bottom: 20px;
    .team-panel-title  {
      padding: 20px 0;
      border-bottom: 1px solid #eee;
      color: 333333;
      font-size: 16px;
      .view-more {
        color: #1890FF;
        font-size: 12px;
      }
    }
  }
</style>
<template>
  <section class="team-panel-section">
    <div class="team-panel-title x-flex-between">
      <p>{{title}}</p>
      <p v-if="moreShow" class="view-more" @click="viewMore">
        <span>查看更多</span>
        <i class="el-icon-d-arrow-right"></i>
      </p>
    </div>
    <slot name="content"></slot>
  </section>
</template>
<script>
export default {
  props: {
    moreShow: { type: Boolean, default: true },
    title: { type: String, default: '' }
  },
  methods: {
    viewMore () {
      this.$emit('viewMore')
    }
  },
}
</script>