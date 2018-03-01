<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane
            :key="tabData.name"
            :name="tabData.name">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="document"></svg-icon>
              {{tabData.label}}
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input" :rules="rulesCheck" ref="tabData.content" :model="tabData.content">
              <el-form-item v-if="isAdd" label="企业" class="full-width">
                <el-select v-model="tabData.content.enterpriseId">
                  <el-option
                    v-for="ent in enterpriseList"
                    :key="ent.id"
                    :value="ent.id"
                    :label="ent.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="tabData.content.name"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="tabData.content.gender">
                  <el-radio label="MALE">男</el-radio>
                  <el-radio label="FEMALE">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="主要岗位">
                <el-select v-model="tabData.content.position">
                  <el-option
                    v-for="position in positionTypes"
                    :key="position.code"
                    :label="position.value"
                    :value="position.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="入职时间">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.entryDate" type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="tabData.content.phone"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码" prop="idCard">
                <el-input v-model="tabData.content.idCard"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <!-- 上传身份证 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              身份证
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="有效期" class="full-width">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.certifications.find(_ => _.title === '身份证' && _.type === 'A').expireDate" type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="上传身份证" class="full-width">
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUploadIdA">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '身份证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '身份证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>正面</p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUploadIdB">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '身份证' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '身份证' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>反面</p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        
        <!-- 上传劳动合同 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="stamp"></svg-icon>
              劳动合同
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="有效期" class="full-width">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'A').expireDate" type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="上传劳动合同" class="full-width">
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUploadContractA">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>封面，含甲乙方名称</p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUploadContractB">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>内页，含劳动合约时间页</p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUploadContractC">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'C').path"
                    :src="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'C').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>内页，含甲乙方签字</p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        
        <!-- 上传驾驶证 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="driver"></svg-icon>
              驾驶证
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="有效期" class="full-width">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'A').expireDate" type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="上传驾驶证" class="full-width">
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader "
                  :headers="header" 
                  :on-success="onUploadLicenseA">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>正本正面</p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUploadLicenseB">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>正本反面</p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUploadLicenseC">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'C').path"
                    :src="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'C').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>副本正面</p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUploadLicenseD">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'D').path"
                    :src="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'D').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>副本反面</p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        
        <!-- 上传驾驶员从业资格证 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="qualification"></svg-icon>
              驾驶员从业资格证
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="有效期" class="full-width">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.certifications.find(_ => _.title === '驾驶员从业资格证').expireDate" type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="上传驾驶员从业资格证" class="full-width">
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUploadDriverPermit">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '驾驶员从业资格证').path"
                    :src="tabData.content.certifications.find(_ => _.title === '驾驶员从业资格证').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>基本信息页</p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        
        <!-- 上传押运员从业资格证 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="qualification"></svg-icon>
              押运员从业资格证
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="有效期" class="full-width">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.certifications.find(_ => _.title === '押运员从业资格证').expireDate" type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="上传押运员从业资格证" class="full-width">
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUploadEscortPermit">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '押运员从业资格证').path"
                    :src="tabData.content.certifications.find(_ => _.title === '押运员从业资格证').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>基本信息页</p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 上传安全责任状 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="security"></svg-icon>
              安全责任状
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="有效期" class="full-width">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.certifications.find(_ => _.title === '安全责任状' && _.type === 'A').expireDate" type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="上传安全责任状" class="full-width">
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUploadCommitmentA">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '安全责任状' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '安全责任状' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>含甲乙方名称页</p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUploadCommitmentB">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '安全责任状' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '安全责任状' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>含甲乙方签章页</p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <div class="button_area">
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
import {
  getEmployeeInfo,
  createEmployee,
  editEmployee
} from '@/api/business/employees'
import { getEnterpriseList } from '@/api/business/enterprises'
import datepickerOptions from '@/mixins/_datepickerOptions'
import { mapGetters } from 'vuex'

export default {
  mixins: [datepickerOptions],
  data() {
    var checkId = (rule, value, callback) => {
      console.log(value)
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!reg.test(value)) {
        return callback(new Error('身份证格式不正确'))
      } else { return callback() }
    }
    var checkPhone = (rule, value, callback) => {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!reg.test(value)) {
        return callback(new Error('手机格式不正确'))
      } else { return callback() }
    }
    return {
      rulesCheck: {
        idCard: [
          { validator: checkId, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      activeTab: 'first',
      loading: false,
      submitting: false,
      enterpriseList: [],
      tabData: {
        label: '基本信息',
        name: 'first',
        icon: 'id-card',
        content: {
          gender: '',
          idCard: '',
          position: '',
          entryDate: '',
          phone: '',
          enterpriseId: '',
          status: '',
          certifications: [{
            fkTable: 'EMP',
            title: '身份证',
            code: 'TERM_OF_ID_CARD',
            path: '',
            type: 'A',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '身份证',
            code: 'TERM_OF_ID_CARD',
            path: '',
            type: 'B',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '劳动合同',
            code: 'TERM_OF_LABOR_CONTRACT',
            path: '',
            type: 'A',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '劳动合同',
            code: 'TERM_OF_LABOR_CONTRACT',
            path: '',
            type: 'B',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '劳动合同',
            code: 'TERM_OF_LABOR_CONTRACT',
            path: '',
            type: 'C',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '驾驶证',
            code: 'TERM_OF_DRIVING_LICENSE_INSPECTION',
            path: '',
            type: 'A',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '驾驶证',
            code: 'TERM_OF_DRIVING_LICENSE_INSPECTION',
            path: '',
            type: 'B',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '驾驶证',
            code: 'TERM_OF_DRIVING_LICENSE_INSPECTION',
            path: '',
            type: 'C',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '驾驶证',
            code: 'TERM_OF_DRIVING_LICENSE_INSPECTION',
            path: '',
            type: 'D',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '驾驶员从业资格证',
            code: 'TERM_OF_DRIVER_QUALIFICATION_CERTIFICATE',
            path: '',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '押运员从业资格证',
            code: 'TERM_OF_ESCORT_QUALIFICATION_CERTIFICATE',
            path: '',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '安全责任状',
            code: 'TERM_OF_SAFETY_RESPONSIBILITY',
            path: '',
            type: 'A',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '安全责任状',
            code: 'TERM_OF_SAFETY_RESPONSIBILITY',
            path: '',
            type: 'B',
            expireDate: ''
          }]
        }
      }
    }
  },
  computed: {
    ...mapGetters(['token', 'positionTypes']),
    header() {
      return { 'Authorization': `Bearer ${this.token}` }
    },
    isAdd() {
      return this.$route.path.indexOf('add') >= 0
    }
  },
  created() {
    if (!this.isAdd) this.fetchData()
    getEnterpriseList({ pageNum: 1, pageSize: 250 }).then(res => {
      this.enterpriseList = res.data.list
    })
  },
  methods: {
    fetchData() {
      const { id } = this.$route.query
      this.loading = true
      getEmployeeInfo(id).then(res => {
        this.tabData.content = res.data
        this.loading = false
      })
    },
    onUploadIdA(res) {
      this.$_.find(this.tabData.content.certifications, { title: '身份证', type: 'A' }).path = res.data
    },
    onUploadIdB(res) {
      this.$_.find(this.tabData.content.certifications, { title: '身份证', type: 'B' }).path = res.data
    },
    onUploadContractA(res) {
      this.$_.find(this.tabData.content.certifications, { title: '劳动合同', type: 'A' }).path = res.data
    },
    onUploadContractB(res) {
      this.$_.find(this.tabData.content.certifications, { title: '劳动合同', type: 'B' }).path = res.data
    },
    onUploadContractC(res) {
      this.$_.find(this.tabData.content.certifications, { title: '劳动合同', type: 'C' }).path = res.data
    },
    onUploadLicenseA(res) {
      this.$_.find(this.tabData.content.certifications, { title: '驾驶证', type: 'A' }).path = res.data
    },
    onUploadLicenseB(res) {
      this.$_.find(this.tabData.content.certifications, { title: '驾驶证', type: 'B' }).path = res.data
    },
    onUploadLicenseC(res) {
      this.$_.find(this.tabData.content.certifications, { title: '驾驶证', type: 'C' }).path = res.data
    },
    onUploadLicenseD(res) {
      this.$_.find(this.tabData.content.certifications, { title: '驾驶证', type: 'D' }).path = res.data
    },
    onUploadDriverPermit(res) {
      this.$_.find(this.tabData.content.certifications, { title: '驾驶员从业资格证' }).path = res.data
    },
    onUploadEscortPermit(res) {
      this.$_.find(this.tabData.content.certifications, { title: '押运员从业资格证' }).path = res.data
    },
    onUploadCommitmentA(res) {
      this.$_.find(this.tabData.content.certifications, { title: '安全责任状', type: 'A' }).path = res.data
    },
    onUploadCommitmentB(res) {
      this.$_.find(this.tabData.content.certifications, { title: '安全责任状', type: 'B' }).path = res.data
    },
    onSubmit() {
      this.submitting = true
      const { content } = this.tabData
      this.$refs['tabData.content'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            createEmployee(content).then(res => {
              this.$message.success('已新增！')
              _afterSubmit()
            })
          } else {
            editEmployee(this.$route.query.id, { ...this.tabData.content }).then(res => {
              this.$message.success('已修改！')
              _afterSubmit()
            })
          }
        } else {
          alert('表单提交失败有错误项')
          return false
        }
      })
      const _this = this
      function _afterSubmit() {
        _this.submitting = false
        _this.$router.push('/business/employees')
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .title {
    color: #606266;
    margin-bottom:5px; 
  }
  .logContainer {
    color: #606266;
    background-color: #e9f6ff;
    height: 200px;
    overflow-y: scroll;
    .logInfo {
      padding: 5px 0px;
    }
  }
</style>