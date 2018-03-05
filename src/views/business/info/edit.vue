<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-alert
          v-if="!isAdd"
          title="你正在修改企业信息，保存后将会更新内容并等待重新审核"
          type="warning"
          show-icon
          class="mgb12"></el-alert>
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane
            :key="tabData.name"
            :name="tabData.name">
            <span slot="label" class="span-with-svg">
              <svg-icon :icon-class="tabData.icon"></svg-icon>
              {{tabData.label}}
            </span>
            <el-form
              :inline="true" :rules="formRules"
              ref="tabData.content"
              :model="tabData.content"
              label-width="140px"
              class="prevent-uneven strange-input">
              <el-form-item label="企业名称" class="full-width" prop="name">
                <el-input v-model="tabData.content.name" :disabled="!isAdd"></el-input>
                <span class="sub-text input-warning" v-if="!isAdd"><i class="el-icon-info"></i> 不可修改，如需修改，请联系平台客服人员！</span>
              </el-form-item>
              <el-form-item label="统一社会信用代码" prop="registrationNo">
                <el-input v-model="tabData.content.registrationNo"></el-input>
              </el-form-item>
              <!-- <el-form-item label="状态">
                <el-select v-model="tabData.content.status">
                  <el-option
                    v-for="status in statusTypes"
                    :key="status.code"
                    :label="status.value"
                    :value="status.code">
                  </el-option>
                </el-select>
              </el-form-item> -->
               <el-form-item label="公司类型" prop="enterpriseType">
                <el-select  v-model="tabData.content.enterpriseType">
                  <el-option
                    v-for="etype in enterpriseTypes"
                    :key="etype.code"
                    :label="etype.value"
                    :value="etype.code">
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="成立日期" prop="fundationDate">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.fundationDate"
                  type="date"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item label="法定代表人" prop="legalPerson">
                <el-input v-model="tabData.content.legalPerson"></el-input>
              </el-form-item>
              <el-form-item label="注册资本" prop="registeredCapital">
                <el-input v-model="tabData.content.registeredCapital">
                  <template slot="append">万</template>
                </el-input>
                <!-- <el-input v-model="tabData.content.registeredCapital"></el-input> -->
              </el-form-item>
              <el-form-item label="登记机关" prop="registrationAuthority">
                <el-input v-model="tabData.content.registrationAuthority"></el-input>
              </el-form-item>
              <el-form-item label="经营状态">
                <el-select v-model="tabData.content.registrationStatus">
                  <el-option
                    v-for="status in enterpriseStatusTypes"
                    :key="status.code"
                    :label="status.value"
                    :value="status.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="操作范围" >
                <el-input v-model="tabData.content.operationScope" ></el-input>
              </el-form-item> -->
              <el-form-item label="企业业务类型">
                <el-select v-model="tabData.content.businessType">
                  <el-option
                    v-for="btype in businessTypes"
                    :key="btype.code"
                    :label="btype.value"
                    :value="btype.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="紧急联系人" prop="contactName">
                <el-input v-model="tabData.content.contactName"></el-input>
              </el-form-item>
              <el-form-item label="企业地址" prop="address">
                <el-input v-model="tabData.content.address"></el-input>
              </el-form-item>
              <el-form-item label="紧急联系电话" prop="contactMobile">
                <el-input v-model="tabData.content.contactMobile"></el-input>
              </el-form-item>
              <el-form-item label="经营类型" class="full-width" prop="businessTerm">
                <div style="max-height: 280px; overflow: scroll; border: 1px solid #eee; padding-top: 12px;">
                  <el-tree
                    ref="tree"
                    :data="vehicleBusinessTypes"
                    show-checkbox
                    node-key="id"
                    @check-change="onTreeCheck"
                    :default-expand-all="true"
                    :default-checked-keys="tabData.content.businessTerm"></el-tree>
                </div>
              </el-form-item>
              <el-form-item label="上传企业营业执照" class="full-width">
                <el-upload
                  :headers="header"                
                  action="/v1/files/upload/"
                  class="license-uploader"
                  :on-success="onUpload('企业营业执照', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '企业营业执照' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '企业营业执照' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p style="width:150px">企业营业执照</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('企业营业执照', 'B')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '企业营业执照' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '企业营业执照' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>企业组织机构代码证</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('企业营业执照', 'C')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '企业营业执照' && _.type === 'C').path"
                    :src="tabData.content.certifications.find(_ => _.title === '企业营业执照' && _.type === 'C').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>企业税务登记证</p>
                  </div>
                </el-upload>
              </el-form-item>
              <el-alert
                title="彩色扫描件或彩色照片，内容清晰可见"
                description="若为三证合一企业，此三个文件应上传统一社会信用代码证"
                type="info"
                show-icon
                style="margin-left: 140px"></el-alert>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              企业道路运输经营许可证
            </span>
             <el-form :inline="true" label-width="160px" class="prevent-uneven strange-input">
              <el-form-item label="道路运输经营许可证号">
                <el-input
                  v-model="tabData.content.certifications.find(_ => _.title === '企业道路运输经营许可证' && _.type === 'A').licenseNo"></el-input>
              </el-form-item>
              <el-form-item label="有效期">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.certifications.find(_ => _.title === '企业道路运输经营许可证' && _.type === 'A').expireDate"
                  type="date"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item label="上传报告" class="full-width">
                <el-upload
                  :headers="header"                
                  action="/v1/files/upload/"
                  class="license-uploader"
                  :on-success="onUpload('企业道路运输经营许可证', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '企业道路运输经营许可证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '企业道路运输经营许可证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p></p>
                  </div>
                </el-upload>
              </el-form-item>
              <el-alert
                title="彩色扫描件或彩色照片，内容清晰可见"
                type="info"
                show-icon
                style="margin-left: 160px"></el-alert>
             </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="approve"></svg-icon>
              企业安全责任承诺书
            </span>
             <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="上传报告" class="full-width">
                <el-upload
                  :headers="header"                
                  action="/v1/files/upload/"
                  class="license-uploader"
                  :on-success="onUpload('企业安全责任承诺书', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '企业安全责任承诺书' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '企业安全责任承诺书' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>要求：下载→填写→盖公章→彩色件扫描上传</p>
                    <div><a class="download-link" target="_blank" href="/static/samples/safety_commitment.pdf">下载 <i class="el-icon-document"></i>道路危险货物运输企业安全承诺书.pdf</a></div>
                  </div>
                </el-upload>
              </el-form-item>
              <el-alert
                title="彩色扫描件或彩色照片，内容清晰可见"
                type="info"
                show-icon
                style="margin-left: 130px"></el-alert>
             </el-form>
          </el-tab-pane>
        </el-tabs>
        <div class="button_area">
          <el-button @click="$router.go(-1)" icon="el-icon-back">取消</el-button>
          <el-button type="primary" @click="onSubmit" v-loading="submitting" icon="el-icon-check">
            确认{{ isAdd ? '新增' : '修改' }}
          </el-button>
          <!-- <el-button type="primary" @click="handleFailed">审核不通过</el-button>          -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getEnterpriseInfo, createEnterprise, editEnterprise } from '@/api/business/enterprises'
import datepickerOptions from '@/mixins/_datepickerOptions'

import remove from 'lodash/remove'
export default {
  mixins: [datepickerOptions],
  data() {
    const contactMobileNoValidator = (rule, value, callback) => {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!reg.test(value)) {
        return callback(new Error('手机格式不正确'))
      } else { return callback() }
    }
    const contactNameValidator = (rule, value, callback) => {
      if (!(value && value.length < 20)) {
        return callback(new Error('不能为空，且不超过 20 个字符'))
      } else {
        return callback()
      }
    }
    const registrationAuthorityValidator = (rule, value, callback) => {
      if (!(value && value.length < 30)) {
        return callback(new Error('不能为空，且不超过 30 个字符'))
      } else {
        return callback()
      }
    }
    const legalPersonValidator = (rule, value, callback) => {
      if (!(value && value.length < 10)) {
        return callback(new Error('不能为空，且不超过 10 个字符'))
      } else {
        return callback()
      }
    }
    const fundationDateValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      } else {
        return callback()
      }
    }
    const enterpriseTypeValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      } else {
        return callback()
      }
    }
    const registrationNoValidator = (rule, value, callback) => {
      if (!(value && value.length < 20)) {
        return callback(new Error('不能为空，且不超过 20 个字符'))
      } else {
        return callback()
      }
    }
    const nameValidator = (rule, value, callback) => {
      if (!(value && value.length < 30)) {
        return callback(new Error('不能为空，且不超过 30 个字符'))
      } else {
        return callback()
      }
    }
    const floatValidator = (rule, value, callback) => {
      const reg = /^(-)?(([1-9]{1}\d{0,8})|([0]{1}))(\.(\d){1,2})?$/
      if (!reg.test(value)) {
        return callback(new Error('请输入整数、或精确到小数点后两位的数字'))
      } else {
        return callback()
      }
    }
    return {
      activeTab: 'first',
      loading: false,
      submitting: false,
      formRules: {
        address: [
          { required: true, message: '请填写企业地址', trigger: 'blur' },
          { max: 50, message: '不超过 50 个字符', trigger: 'blur' }
        ],
        contactMobile: [
          { required: true, message: '请填写手机号码', trigger: 'blur' },
          { validator: contactMobileNoValidator, trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请填写联系人姓名', trigger: 'blur' },
          { validator: contactNameValidator, trigger: 'blur' }
        ],
        registrationAuthority: [
          { required: true, message: '请填写登记机关', trigger: 'blur' },
          { validator: registrationAuthorityValidator, trigger: 'blur' }
        ],
        legalPerson: [
          { required: true, message: '请填写法人', trigger: 'blur' },
          { validator: legalPersonValidator, trigger: 'blur' }
        ],
        fundationDate: [
          { required: true, message: '请填写成立日期', trigger: 'blur' },
          { validator: fundationDateValidator, trigger: 'blur' }
        ],
        enterpriseType: [
          { required: true, message: '请勾选公司类型', trigger: 'blur' },
          { validator: enterpriseTypeValidator, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写企业名称', trigger: 'blur' },
          { validator: nameValidator, trigger: 'blur' }
        ],
        registrationNo: [
          { required: true, message: '请填写统一社会信用代码', trigger: 'blur' },
          { validator: registrationNoValidator, trigger: 'blur' }
        ],
        registeredCapital: [{
          validator: floatValidator,
          trigger: 'change'
        }],
        businessTerm: [{ required: true, message: '请勾选经营类型', trigger: 'blur' }]
      },
      tabData: {
        label: '基本信息',
        name: 'first',
        icon: 'cubes',
        content: {
          abbrName: '',
          address: '',
          businessTerm: [],
          businessType: '',
          comment: '',
          contactMobile: '',
          contactName: '',
          // createUser: '',
          enterpriseType: '',
          fundationDate: '',
          // id: 0,
          // isDeleted: true,
          legalPerson: '',
          // modifiedUser: '',
          name: '',
          // operationScope: '',
          registeredCapital: 0,
          registrationAuthority: '',
          registrationNo: '',
          registrationStatus: '',
          status: '',
          certifications: [{
            fkTable: 'INF',
            title: '企业营业执照',
            code: 'TERM_OF_BUSINESS',
            path: '',
            type: 'A',
            restsDate: '',
            licenseNo: '',
            expireDate: ''
          }, {
            fkTable: 'INF',
            title: '企业营业执照',
            code: 'TERM_OF_BUSINESS',
            path: '',
            type: 'B',
            restsDate: ''
          }, {
            fkTable: 'INF',
            title: '企业营业执照',
            code: 'TERM_OF_BUSINESS',
            path: '',
            type: 'C',
            restsDate: ''
          }, {
            fkTable: 'INF',
            title: '企业道路运输经营许可证',
            code: 'TERM_OF_TRANSPORT_LICENSE',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: ''
          }, {
            fkTable: 'INF',
            title: '企业安全责任承诺书',
            code: 'TERM_OF_SAFETY_PRODUCTION_PERMIT',
            path: '',
            type: 'A',
            restsDate: '',
            licenseNo: ''
          }]
        }
      }
    }
  },
  created() {
    if (!this.isAdd) this.fetchData()
  },
  mounted() {
    this.$ref('mo').$forceUpdate()
  },
  computed: {
    ...mapGetters([
      'vehicleBusinessTypes',
      'enterpriseStatusTypes',
      'enterpriseTypes',
      'statusTypes',
      'businessTypes',
      'token'
    ]),
    isAdd() {
      return this.$route.path.indexOf('add') >= 0
    },
    header() {
      return { 'Authorization': `Bearer ${this.token}` }
    }
  },
  methods: {
    onUpload(title, type) {
      const that = this
      return function(res) {
        that.$_.find(that.tabData.content.certifications, { 'title': title, 'type': type }).path = res.data
      }
    },
    onTreeCheck(data, checked, interminate) {
      console.log(data, checked, interminate)
      if (!checked) {
        remove(this.tabData.content.businessTerm, (t) => t === data.id)
      } else {
        this.tabData.content.businessTerm.push(data.id)
      }
    },
    fetchData() {
      const { id } = this.$route.query
      this.loading = true
      getEnterpriseInfo(id).then(res => {
        this.tabData.content = res.data
        this.loading = false
        // this.$forceUpdate()
        this.$refs.tree.setCheckedKeys(this.tabData.content.businessTerm)
      })
    },
    onSubmit() {
      this.submitting = true
      const { content } = this.tabData
      if (!this.tabData.content.businessTerm.length) {
        this.$message.warning('请勾选经营范围')
        this.submitting = false
        return false
      }
      this.$refs['tabData.content'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            createEnterprise(content).then(res => {
              this.$message.success('已新增！')
              _afterSubmit()
            })
          } else {
            editEnterprise(this.$route.query.id, { ...this.tabData.content }).then(res => {
              this.$message.success('已修改！')
              _afterSubmit()
            })
          }
        } else {
          this.$message.warning('表单提交失败有错误项')
          this.submitting = false
          return false
        }
      })
      const _this = this
      this.submitting = false
      function _afterSubmit() {
        // _this.submitting = false
        _this.$router.push('/business/enterprises')
      }
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
  .input-warning {
    line-height: 14px;
    font-size: 13px;
    position: absolute;
    top: 14px;
    right: -286px;
  }
  .download-link {
    margin-top: 12px;
    display: block;
    color: map-get($palette, primary);
  }
</style>