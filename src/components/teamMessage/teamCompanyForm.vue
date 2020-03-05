
<style lang="scss">
@import "@/assets/css/formMessage.scss";
</style>
<template>
  <div class="teamMessage">
    <div class="title">基本信息</div>
    <div class="teamMessage-form-row">
      <el-form
        :model="companyForm"
        :rules="rules"
        ref="companyForm"
        label-width="100px"
        label-position="right"
        class="teamMessage-form"
      >
        <el-form-item label="团队名称" prop="team_name">
          <el-input v-model="companyForm.team_name" class="width408" placeholder="请输入团队名称"></el-input>
        </el-form-item>
        <el-form-item label="团队logo" required>
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
            <p>上传logo</p>
          </el-upload>
        </el-form-item>
        <el-form-item label="从事行业" prop="industry">
          <el-select
            v-model="companyForm.industry"
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
            v-model="companyForm.enterprise"
            value-key="label"
            class="width408"
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
          <el-select v-model="companyForm.scale" class="width408" placeholder="请选择企业规模">
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
        <el-form-item label="申请人姓名" prop="user_name">
          <el-input v-model="companyForm.user_name" class="width408" placeholder="请输入申请人姓名"></el-input>
        </el-form-item>
        <el-form-item label="团队简介" prop="introduction">
          <el-input
            type="textarea"
            class="width408"
            :autosize="{minRows: 5}"
            v-model="companyForm.introduction"
            placeholder="请输入团队介绍"
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
import { getTeamInfo } from "@/api/team";
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
        id: ""
      },
      imageUrl: "",
      license_img: "",
      landlineStart: "",
      landlineEnd: "",
      rules: {
        team_name: [
          { required: true, message: "请输入团队名称", trigger: "blur" }
        ],
        industry: [
          { required: true, message: "请选择从事行业", trigger: "change" }
        ],
        user_name: [
          { required: true, message: "请输入申请人姓名", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "请输入团队介绍", trigger: "blur" }
        ]
      },
      comScaleList: [],
      comTypeList: [],
      jobList: [],
      userType: localStorage.getItem("userType"),
      address: []
    };
  },
  computed: {
    label() {
      return this.userType == 1 ? "企业" : "团队";
    }
  },
  created() {
    if (this.$route.query && this.$route.query.type) {
      this.companyForm.id = this.$route.query.teamId;
      this.companyForm.type = this.$route.query.type;
    }
    if (this.companyForm.id) {
      this.getInfo(this.companyForm.id);
    }
    let params = "com_type,com_scale,job_array";
    this.getList(params);
  },
  methods: {
    getImgUrl,
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
    getInfo(uid) {
      getTeamInfo({ uid }).then(res => {
        if (res.data) {
          this.companyForm = res.data || {};
          if (this.companyForm.log) {
            this.imageUrl = this.companyForm.log;
            this.license_img = this.companyForm.license_img;
          }
          if (this.companyForm.landline) {
            let landline = this.companyForm.landline.split("-");
            this.landlineStart = landline[0];
            this.landlineEnd = landline[1];
          }
          this.address.push(
            this.companyForm.provinceid,
            this.companyForm.cityid,
            this.companyForm.three_cityid
          );
        }
      });
    },
    upload(params) {
      const _file = params.file;
      const isLt2M = _file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("请上传2M以下的.xlsx文件");
        return false;
      }
      uploadFile(_file).then(res => {
        if (res.data && res.data.url) {
          this.imageUrl = this.getImgUrl(res.data.url);
        }
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
        if (res.data && res.data.url) {
          this.license_img = this.getImgUrl(res.data.url);
        }
      });
    },
    change(val) {
      this.companyForm.provinceid = val[0];
      this.companyForm.cityid = val[1];
      this.companyForm.three_cityid = val[2];
    },
    submitForm(companyForm) {
      if (this.landlineStart && this.landlineEnd) {
        this.companyForm.landline = this.landlineStart + "-" + this.landlineEnd;
      }
      this.$refs[companyForm].validate(valid => {
        if (valid) {
          this.updateTeamCompanyInfo();
        } else {
          return false;
        }
      });
    },
    updateTeamCompanyInfo() {
      this.companyForm.log = this.imageUrl;
      this.companyForm.license_img = this.license_img;
      this.$store
        .dispatch('editTeamInfo', this.companyForm)
        .then(res => {
          if (res.data) {
            localStorage.setItem("teamType", 1);
            this.$message.success("保存成功");
            this.$router.push("/userlist");
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch(error => {
          this.$message.error(error.status.remind);
        });
    },
    resetForm(companyForm) {
      this.$router.push("/userlist");
    }
  }
};
</script>
