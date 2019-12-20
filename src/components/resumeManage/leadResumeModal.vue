<template>
  <el-dialog
    width="500px"
    :visible="dialogTableVisible"
    class="member-dialog record-dialog"
    :show-close="false"
  >
    <div class="member-row">
      <img src="../../assets/img/member/cancel.png" alt class="cancel-icon" @click="handleClose" />
      <section class="member-col1">
        <p>导入简历</p>
      </section>
      <section class="record-col3">
        <p class="import-record-title">仅支持下载模板上传的简历，其他格式可能识别失败</p>
        <ul class="import-resume-box">
          <p class="import-record-thead">表格名称</p>
          <li v-for="(item,index) in list" :key="index" class="record-item">
            <div class="record-content x-flex-start-justify">
              <img src="../../assets/img/xlsx.png" alt />
              <p>{{item}}</p>
            </div>
          </li>
        </ul>
        <div class="x-flex-between">
          <el-button size="small" class="handle-btn" @click="download">
            <img src="../../assets/img/upload.png" class="download-icon" alt />
            <span>下载模板</span>
          </el-button>
          <el-upload
            class="avatar-uploader"
            action="customize"
            ref="upload"
            :show-file-list="false"
            :file-list="fileList"
            :http-request="upload"
            @on-success="changeList"
          >
            <el-button size="small" class="handle-btn">
              <img src="../../assets/img/upload.png" alt />
              <span>导入简历</span>
            </el-button>
          </el-upload>
        </div>
        <div class="import-resume-btn">
          <el-button @click="show=false,reason=''">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </section>
    </div>
  </el-dialog>
</template>
<script>
import { uploadFile } from '../../api/upload'
import { importUserResume, downloadTestTable } from '@/api/resume'
export default {
  props: ['dialogTableVisible', 'trackList'],
  data () {
    return {
      reason: '',
      list: [],
      show: false,
      fileList: []
    }
  },
  created () {

  },
  methods: {
    upload (params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("请上传2M以下的.xlsx文件");
        return false;
      }
      console.log(_file)
      importUserResume(_file).then(res => {
        console.log(res)
        this.list.push(_file.name)
      })
      console.log(this.fileList)
    },
    download () {
      downloadTestTable().then(res => {
        console.log(res)
      })
    },
    getImg (file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(_file)
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
      }
      return url;
    },
    changeList (val) {
      console.log(val)
    },
    handleClose () {
      this.$emit('handleClose')
    },
    submitForm () {
      this.$emit('submitRecord', this.reason)
    },
    save () {
      this.show = false
    }
  }
}
</script>
<style lang="scss">
.member-dialog {
  box-shadow:0px 1px 43px 0px rgba(51,51,51,0.3);
  border-radius:5px;
  &.record-dialog {
    .resume-footer-btn {
      border-top:1px solid #E8E8E8;
      box-shadow:1px -2px 5px 0px rgba(106,106,106,0.1);
      border-radius:0px 0px 5px 5px;
      width: 100%;
      height: 30px;
    }
  }
  .el-dialog__body,.el-dialog__header {
    padding: 0;
  }
  .member-row {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    color: #333333;
    padding: 0 0 10px;
    position: relative;
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .record-col3 {
      width: 82%;
      border-top: 1px solid #eee;
      padding-top: 20px;
      margin: 0 auto;
      .import-resume-box {
        border:1px solid #eee;
        min-height: 140px;
        width: 100%;
        margin: 20px 0;
      }
      .handle-btn {
        span {
          margin-left: 6px;
        }
        > span {
          display: flex;
          justify-content: center;
          align-items: center; 
        }
        .download-icon {
          transform: rotate(-180deg);
        }
      }
      .record-item {
        margin-bottom: 10px;
      }
      .record-time {
        color: #333;
      }
      .import-record-title {
        color: #333;
        font-size:16px;
      }
      .import-record-thead {
        color: #6A6A6A;
        height: 36px;
        line-height: 36px;
        border-bottom: 1px solid #eee;
      }
      .record-content {
        margin: 12px 10px;
        text-align: left;
        color: #333333;
        > img {
          margin-right: 10px;
        }
      }
    }
  }
  .import-resume-btn {
    text-align: right;
    margin:20px 0 ;
    .el-button {
      border-radius: 3px;
      margin-left: 20px;
    }
  }
}
</style>