<style lang="scss">
.dialog {
  box-shadow:0px 6px 14px 1px rgba(134,133,133,0.3);
  border-radius:5px;
}
.dialog-centent {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.dialog-centent .dialog-title {
  font-size: 18px;
  color:#333;
  font-weight: bold;
  padding-top: 25px;
}
.dialog .el-dialog__body {
  padding: 25px
}
.tipDialog .el-dialog__body {
  padding: 25px 25px 6px;
}
.tipDialog .dialog-footer {
  padding: 0 20px 20px;
  margin-left: 40px;
}
.dialog-footer .el-button {
  width: 100px;
  padding: 8px 20px;
  margin: 0 15px;
}
.prompt {
  color: #999;
  font-size:14px;
}
.el-form {
  .el-upload-card,.el-upload {
    width: 100%;
     .el-upload-list__item {
      width: 90px;
      height: 90px;
      margin: 0 8px 5px 0;
    }
  }
  .el-upload-list__item-thumbnail {
    width: 90px;
    height: 90px;
    line-height: 88px;
  }
}
.dialog .el-form-item {
  margin-bottom: 15px;
}
input,button,select,textarea{outline:none};
textarea{resize:none};
</style>

<template>
  <el-dialog
    title=""
    :visible.sync="tipDialogVisible"
    width="530px"
    top="20vh"
    :before-close="handleClose"
    center
    class="dialog tipDialog"
  >
    <el-form
      :model="form"
      label-width="100px"
    >
      <el-form-item label="举报理由:">
        <el-select
          v-model="form.reason"
          placeholder="请选择举报原因"
          style="width:300px"
        >
          <el-option
            :label="item"
            :value="key"
            v-for="(item,key) in reason_type"
            :key="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="举报说明:">
        <el-input
          type="textarea"
          style="width:300px"
          :autosize="row"
          placeholder="请输入举报原因（必填）"
          v-model="form.explain"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片上传:">
        <p class="prompt">最多5张,支持JPG、JPEG、PNG.大小不超过5MB</p>
        <el-upload
          :limit="5"
          action="customize"
          ref="upload"
          :show-file-list="false"
          :http-request="upload"
          @on-exceed="onExceed"
        >
          <div class="x-flex-start x-flex-wap el-upload-card">
            <div class="x-flex-start x-flex-wap">
              <img
                v-if="fileList.length"
                v-for="item in fileList"
                class="el-upload-list__item"
                :src="item"
                :key="item"
                alt=""
              >
              <div class="el-upload--picture-card el-upload-list__item-thumbnail">
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="handleClose"
        type="primary"
        plain
      >关闭</el-button>
      <el-button
        type="primary"
        @click="submit"
      >提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getConstant } from '@/api/dictionary'
import { uploadFile } from '@/api/upload'
import { getImg, getImgUrl } from '@/util/util'
export default {
  props: ['tipDialogVisible'],
  data () {
    return {
      form: {
        reason: '',
        image: '',
        explain: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      row: { minRows: 4, maxRows: 1 },
      reason_type: {},
      fileList: []
    };
  },
  created () {
    let params = 'reason_type'
    this.getList(params)
  },
  methods: {
    upload (params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("请上传2M以下的.xlsx文件");
        return false;
      }
      uploadFile(_file).then(res => {
        // this.dialogImageUrl = getImg(_file)
        this.fileList.push(getImgUrl(res.data.url))
      })
    },
    getList (filed) {
      getConstant({ filed }).then(res => {
        this.reason_type = res.data.reason_type
      })
    },
    onExceed () {
      this.$message.error("最多上传5张")
    },
    submit () {
      this.form.image = this.fileList.join(',')
      console.log(this.fileList)
      this.$emit('submit', this.form)
    },
    handleClose () {
      this.$emit('handleClose')
    }
  }
};
</script>
