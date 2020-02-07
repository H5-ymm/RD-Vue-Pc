
<style lang="scss">
@import "@/assets/css/formMessage.scss";
</style>
<template>
  <div class="teamMessage">
    <div class="teamMessage-form-row">
      <el-form
        :model="companyForm"
        :rules="rules"
        ref="companyForm"
        label-width="140px"
        label-position="right"
        class="teamMessage-form"
      >
        <el-form-item :label="`企业名称`" prop="companyName">
          <el-input v-model="companyForm.companyName" class="width408" :placeholder="`请输入企业名称`"></el-input>
        </el-form-item>
        <el-form-item :label="`企业logo`" required>
          <el-upload
            class="avatar-uploader"
            action="customize"
            ref="upload"
            :show-file-list="false"
            :http-request="upload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-circle-plus avatar-uploader-icon"></i>
            <p>上传logo</p>
          </el-upload>
        </el-form-item>
        <el-form-item label="营业执照" required>
          <el-upload
            class="uploader-card avatar-uploader"
            action="customize"
            :show-file-list="false"
            :http-request="uploadLicense"
          >
            <img v-if="license_img" :src="license_img" class="avatar">
            <i v-else class="el-icon-circle-plus avatar-uploader-icon"></i>
            <p>上传营业执照</p>
          </el-upload>
        </el-form-item>
        <el-form-item label="营业执照号">
          <el-input v-model="companyForm.business_licence" class="width408" placeholder="请输入营业执照号"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码">
          <el-input
            v-model="companyForm.unified_social_credit_code"
            class="width408"
            placeholder="请输入统一社会信用代码"
          ></el-input>
        </el-form-item>
        <el-form-item label="从事行业">
          <el-select
            v-model="companyForm.com_sort"
            value-key="label"
            class="width408"
            placeholder="请选择企业从事行业"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,key) in jobList"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业性质" required>
          <el-select
            v-model="companyForm.com_type"
            class="width408"
            value-key="label"
            placeholder="请选择企业性质"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in comTypeList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业规模" required>
          <el-select v-model="companyForm.com_scale" class="width408" placeholder="请选择企业规模">
            <el-option
              :label="item"
              :value="index"
              v-for="(item,index) in comScaleList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司地址" required>
          <div class="width408">
            <districtSelet @change="change" :address="address"></districtSelet>
          </div>
          <el-input
            v-model="companyForm.address"
            class="width408 team-address"
            placeholder="请填写详细地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司座机">
          <div class="x-flex-start-justify width408 company-tel">
            <el-input type="text" class="width60" v-model="landlineStart" placeholder="区号"></el-input>
            <span class="landline"></span>
            <el-input type="text" class="width150" v-model="landlineEnd" placeholder="座机号码"></el-input>
            <span class="landline-tip">如：021-66041618</span>
          </div>
        </el-form-item>
        <el-form-item label="联系人" required>
          <el-input v-model="companyForm.link_man" class="width408" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" required>
          <el-input v-model="companyForm.link_phone" class="width408" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" required>
          <el-input
            type="textarea"
            class="width408"
            :autosize="{minRows: 5}"
            v-model="companyForm.content"
            placeholder="请输入企业介绍"
          ></el-input>
        </el-form-item>
        <el-form-item class="teamMessage-btn">
          <el-button type="primary" @click="submitForm('companyForm')">保存</el-button>
          <el-button @click="resetForm('companyForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 团队 团队性质选择跳转
// 企业从账户资料跳转
import { getConstant } from "@/api/dictionary";
import districtSelet from "../districtSelet";
import { getCompanyDetail } from "@/api/company";
import { uploadFile } from "@/api/upload";
import { getImgUrl } from "@/util/util";
export default {
  components: {
    districtSelet
  },
  data() {
    return {
      companyForm: {
        uid: localStorage.getItem("uid"),
        companyName: "",
        id: "",
        provinceid: "",
        cityid: "",
        three_cityid: ""
      },
      imageUrl: "",
      license_img: "",
      landlineStart: "",
      landlineEnd: "",
      rules: {
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        // com_sort: [
        //   { required: true, message: "请选择从事行业", trigger: "change" }
        // ]
      },
      comScaleList: [],
      comTypeList: [],
      jobList: [],
      userType: localStorage.getItem("userType"),
      address: [],
      compnayInfo: {},
      uid: localStorage.getItem("uid")
    };
  },
  created() {
    let params = "com_type,com_scale,job_array";
    this.getList(params);
    this.getCompanyInfo(this.uid);
  },
  methods: {
    getCompanyInfo(uid) {
      getCompanyDetail({ uid }).then(res => {
        let companyForm = res.data;
        this.companyForm.companyName = res.data.com_name;
        this.companyForm = Object.assign(this.companyForm,companyForm)
        if (this.companyForm.link_tel) {
          let link_tel = this.companyForm.link_tel.split("-");
          this.landlineStart = link_tel[0];
          this.landlineEnd = link_tel[1];
        }
        this.imageUrl = this.companyForm.logo_url;
        this.license_img = this.companyForm.license_url;
        if (this.companyForm.provinceid) {
          this.address = [
            this.companyForm.provinceid,
            this.companyForm.cityid,
            this.companyForm.three_cityid
          ];
        }
      });
    },
    getList(filed) {
      getConstant({ filed }).then(res => {
        const { com_scale, com_type, job_array } = res.data;
        this.comScaleList = com_scale;
        this.comTypeList = this.getArray(com_type);
        this.jobList = this.getArray(job_array);
      });
    },
    getArray(obj) {
      let arr = [];
      for (let key in obj) {
        arr.push({
          label: obj[key],
          value: Number(key)
        });
      }
      return arr;
    },
    upload(params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("请上传2M以下的.xlsx文件");
        return false;
      }
      uploadFile(_file).then(res => {
        this.imageUrl = getImgUrl(res.data.url);
      });
    },
    uploadLicense(params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("请上传2M以下的.xlsx文件");
        return false;
      }
      uploadFile(_file).then(res => {
        this.license_img = getImgUrl(res.data.url);
      });
    },
    change(val) {
      this.companyForm.provinceid = val[0];
      this.companyForm.cityid = val[1];
      this.companyForm.three_cityid = val[2];
    },
    submitForm(companyForm) {
      if (this.landlineStart && this.landlineEnd) {
        this.companyForm.link_tel = this.landlineStart + "-" + this.landlineEnd;
      }
      this.$refs[companyForm].validate(valid => {
        if (valid) {
          this.createCompanyInfo();
        } else {
          return false;
        }
      });
    },
    createCompanyInfo() {
      this.companyForm.license_url = this.license_img;
      this.companyForm.logo_url = this.imageUrl;
      this.$store
        .dispatch('updateCompanyInfo', this.companyForm)
        .then(res => {
          if (res.data) {
            localStorage.setItem("teamType", 1);
            this.$message.success("保存成功");
            sessionStorage.setItem(
              "baseInfo",
              JSON.stringify(this.companyForm)
            );
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch(error => {
          this.$message.error(error.status.remind);
        });
    },
    resetForm(companyForm) {
      this.getCompanyInfo(this.uid)
    }
  }
};
</script>
