<template>
  <div
    class="breadcrumb"
    :class="{'ComBreadcrumb':type==1,'ComBreadcrumb1':$store.getters.breadcrumb.length==2}"
  >
    <el-row>
      <el-col :span="24" class="breadcrumb-bre">
        <div class="bg-purple-dark">
          <el-breadcrumb class="breadcrumb-bre-li">
            <el-breadcrumb-item v-for="(item,index) in $store.getters.breadcrumb" :key="index">
              <el-tag
                closable
                @close="closeView(item,index)"
                :class="type==1?'com-tag':'team-tag'"
              >{{item}}</el-tag>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [],
      type: ""
    };
  },
  created() {
    this.type = localStorage.getItem("userType");
    if (this.type == 1) {
      this.breadcrumbs = sessionStorage.getItem("menus")
        ? JSON.parse(sessionStorage.getItem("menus"))
        : ["新建接单"];
    } else {
      this.breadcrumbs = sessionStorage.getItem("menus")
        ? JSON.parse(sessionStorage.getItem("menus"))
        : ["团队中心"];
    }
    this.$store.commit("setMenus", this.breadcrumbs);
  },
  methods: {
    closeView(item, index) {
      if (this.$store.getters.breadcrumb.length == 2 && index) {
        let arr = this.$store.getters.breadcrumb;
        this.$store.commit("setMenus", [arr[0]]);
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="scss">
.breadcrumb {
  overflow: hidden;
  background: #f0f2f5;
  width: 100%;
  height: 36px;
  border: 1px solid #eee;
  .el-breadcrumb__separator {
    position: absolute;
    z-index: -22;
  }
  .breadcrumb-bre {
    height: 36px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .breadcrumb-bre-li {
    line-height: 36px;
    .el-breadcrumb__item {
      height: 36px;
      overflow: hidden;
    }
    .el-tag {
      height: 36px;
      border: none;
      border-top: 1px solid #1890ff;
      line-height: 36px;
      border-radius: 0;
      margin-right: 5px;
      background: #dceefe;
      color: #333333;
    }
  }
  &.ComBreadcrumb {
    .breadcrumb-bre-li {
      .com-tag {
        border-top: none;
        border-bottom: 2px solid #1890ff;
        padding: 0;
        margin-left: 20px;
        background: #f0f2f5;
        color: #1890ff;
      }
      .el-icon-close {
        z-index: -1;
        width: 0;
      }
    }
  }
  &.ComBreadcrumb1 {
    .breadcrumb-bre-li {
      .el-breadcrumb__item {
        &:nth-of-type(1) {
          .team-tag {
            color: #999999;
            background: #fff;
            border: none;
            .el-icon-close {
              color: #999999;
            }
          }
          .com-tag {
            color: #999999;
            border-bottom: none;
          }
        }
        &:nth-of-type(2) {
          .com-tag {
            .el-icon-close {
              z-index: 1;
              width: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
