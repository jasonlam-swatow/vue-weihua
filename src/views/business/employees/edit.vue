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
            <el-form
              :inline="true"
              label-width="130px"
              class="prevent-uneven strange-input"
              :rules="formRules"
              ref="tabData.content" :model="tabData.content">
              <el-form-item v-if="isAdd" label="企业" class="full-width">
                <el-select v-model="tabData.content.enterpriseId">
                  <el-option
                    v-for="ent in enterpriseList"
                    :key="ent.id"
                    :value="ent.id"
                    :label="ent.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="tabData.content.name"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="tabData.content.gender">
                  <el-radio label="MALE">男</el-radio>
                  <el-radio label="FEMALE">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="主要岗位" prop="position">
                <el-select v-model="tabData.content.position">
                  <el-option
                    v-for="position in positionTypes"
                    :key="position.code"
                    :label="position.value"
                    :value="position.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="入职时间" prop="entryDate">
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
                  :on-success="onUpload('身份证', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '身份证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '身份证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>正面</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/id_card_1.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUpload('身份证', 'B')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '身份证' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '身份证' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>反面</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/id_card_2.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
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
                  :on-success="onUpload('劳动合同', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>封面，含甲乙方名称</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/labor_1.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUpload('劳动合同', 'B')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>内页，含劳动合约时间页</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/labor_2.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUpload('劳动合同', 'C')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'C').path"
                    :src="tabData.content.certifications.find(_ => _.title === '劳动合同' && _.type === 'C').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>内页，含甲乙方签字</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/labor_2.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
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
        
        <!-- 上传驾驶证 -->
        <el-tabs
          v-if="tabData.content.position !== 'ESCORT'"
          v-model="activeTab"
          type="card" class="customized denser"
          v-loading="loading">
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
                  :on-success="onUpload('驾驶证', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>正本正面</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/driver_1.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUpload('驾驶证', 'B')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>正本反面</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/driver_2.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUpload('驾驶证', 'C')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'C').path"
                    :src="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'C').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>副本正面</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/driver_3.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUpload('驾驶证', 'D')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'D').path"
                    :src="tabData.content.certifications.find(_ => _.title === '驾驶证' && _.type === 'D').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>副本反面</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/driver_4.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
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
        
        <!-- 上传驾驶员从业资格证 -->
        <el-tabs
          v-if="tabData.content.position !== 'ESCORT'"
          v-model="activeTab"
          type="card" class="customized denser"
          v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="qualification"></svg-icon>
              驾驶员从业资格证
            </span>
            <el-form :inline="true" label-width="160px" class="prevent-uneven strange-input">
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
                  :on-success="onUpload('驾驶员从业资格证', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '驾驶员从业资格证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '驾驶员从业资格证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>基本信息页</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/driver_quali.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
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
        
        <!-- 上传押运员从业资格证 -->
        <el-tabs
          v-if="tabData.content.position === 'ESCORT' || tabData.content.position === 'BOTH'"
          v-model="activeTab"
          type="card" class="customized denser"
          v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="qualification"></svg-icon>
              押运员从业资格证
            </span>
            <el-form :inline="true" label-width="160px" class="prevent-uneven strange-input">
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
                  :on-success="onUpload('押运员从业资格证', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '押运员从业资格证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '押运员从业资格证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>基本信息页</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/escort_quali.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
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
                  :on-success="onUpload('安全责任状', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '安全责任状' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '安全责任状' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>含甲乙方名称页</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/responsibility_1.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :headers="header"                
                  :on-success="onUpload('安全责任状', 'B')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '安全责任状' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '安全责任状' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p>含甲乙方签章页</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/responsibility_2.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
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
import {
  getEmployeeInfo,
  createEmployee,
  editEmployee
} from '@/api/business/employees'
import { getEnterpriseList } from '@/api/business/enterprises'
import datepickerOptions from '@/mixins/_datepickerOptions'
import { mapGetters } from 'vuex'
import isEmpty from 'lodash/isEmpty'

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
      formRules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' },
          { max: 10, message: '姓名不超过 10 个字符', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请填写性别', trigger: 'blur' },
          { max: 6, message: '性别不超过 6 个字符', trigger: 'change' }
        ],
        entryDate: [{ required: true, message: '请选择入职日期', trigger: 'blur' }],
        idCard: [
          { validator: checkId, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
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
            type: 'A',
            expireDate: ''
          }, {
            fkTable: 'EMP',
            title: '押运员从业资格证',
            code: 'TERM_OF_ESCORT_QUALIFICATION_CERTIFICATE',
            path: '',
            type: 'A',
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
    // 计算tabplane里集合长度
    countCertificationLength(type) {
      let collections = this.$_.filter(this.tabData.content.certifications, o => { return o.code === type })
      collections = this.$_.map(collections, o => o.path)
      const certificationsLength = collections.length - this.$_.filter(collections, isEmpty).length
      return certificationsLength
    },
    // 观察对应值生成对应条件
    generateCondition(type) {
      const collection = []
      // console.log(this.$_.filter(this.tabData.content.certifications, o => o.code === 'TERM_OF_DRIVING_LICENSE_INSPECTION'))
      if (this.tabData.content.position.includes('DRIVER')) {
        collection.push({ warning: '驾驶证必填', condition: this.countCertificationLength('TERM_OF_DRIVING_LICENSE_INSPECTION') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_DRIVING_LICENSE_INSPECTION' }).length })
        collection.push({ warning: '驾驶员从业资格证必填', condition: this.countCertificationLength('TERM_OF_DRIVER_QUALIFICATION_CERTIFICATE') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_DRIVER_QUALIFICATION_CERTIFICATE' }).length })
        collection.push({ warning: '身份证必填', condition: this.countCertificationLength('TERM_OF_ID_CARD') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_ID_CARD' }).length })
        collection.push({ warning: '劳动合同必填', condition: this.countCertificationLength('TERM_OF_LABOR_CONTRACT') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_LABOR_CONTRACT' }).length })
        collection.push({ warning: '安全责任状必填', condition: this.countCertificationLength('TERM_OF_SAFETY_RESPONSIBILITY') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_SAFETY_RESPONSIBILITY' }).length })
      }
      if (this.tabData.content.position.includes('ESCORT')) {
        collection.push({ warning: '押运员从业资格证必填', condition: this.countCertificationLength('TERM_OF_ESCORT_QUALIFICATION_CERTIFICATE') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_ESCORT_QUALIFICATION_CERTIFICATE' }).length })
        collection.push({ warning: '身份证必填', condition: this.countCertificationLength('TERM_OF_ID_CARD') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_ID_CARD' }).length })
        collection.push({ warning: '劳动合同必填', condition: this.countCertificationLength('TERM_OF_LABOR_CONTRACT') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_LABOR_CONTRACT' }).length })
        collection.push({ warning: '安全责任状必填', condition: this.countCertificationLength('TERM_OF_SAFETY_RESPONSIBILITY') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_SAFETY_RESPONSIBILITY' }).length })
      }
      if (this.tabData.content.position.includes('BOTH')) {
        collection.push({ warning: '押运员从业资格证必填', condition: this.countCertificationLength('TERM_OF_ESCORT_QUALIFICATION_CERTIFICATE') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_ESCORT_QUALIFICATION_CERTIFICATE' }).length })
        collection.push({ warning: '驾驶证必填', condition: this.countCertificationLength('TERM_OF_DRIVING_LICENSE_INSPECTION') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_DRIVING_LICENSE_INSPECTION' }).length })
        collection.push({ warning: '驾驶员从业资格证必填', condition: this.countCertificationLength('TERM_OF_DRIVER_QUALIFICATION_CERTIFICATE') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_DRIVER_QUALIFICATION_CERTIFICATE' }).length })
        collection.push({ warning: '身份证必填', condition: this.countCertificationLength('TERM_OF_ID_CARD') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_ID_CARD' }).length })
        collection.push({ warning: '劳动合同必填', condition: this.countCertificationLength('TERM_OF_LABOR_CONTRACT') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_LABOR_CONTRACT' }).length })
        collection.push({ warning: '安全责任状必填', condition: this.countCertificationLength('TERM_OF_SAFETY_RESPONSIBILITY') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_SAFETY_RESPONSIBILITY' }).length })
      }
      return collection
    },
    // 多类型
    extraCheck(checkNum) {
      let tag = 0
      console.log(checkNum)
      if (checkNum) {
        for (let i = 0; i < checkNum.length; i++) {
          for (let j = 0; j < checkNum[i].length; j++) {
            if (checkNum[i][j].condition) {
              console.log(checkNum[i][j].condition)
            } else {
              tag++
              console.log(checkNum[i][j])
              setTimeout(() => {
                this.$notify.error(checkNum[i][j].warning)
              }, 100)
            }
          }
        }
      }
      if (!tag) {
        return true
      } else { return false }
    },
    onUpload(title, type) {
      const that = this
      return function(res) {
        that.$_.find(that.tabData.content.certifications, { 'title': title, 'type': type }).path = res.data
      }
    },
    fetchData() {
      const { id } = this.$route.query
      this.loading = true
      getEmployeeInfo(id).then(res => {
        this.tabData.content = res.data
        this.loading = false
      })
    },
    onSubmit() {
      this.submitting = true
      const { content } = this.tabData
      this.$refs['tabData.content'].validate((valid) => {
        if (valid) {
          if (this.extraCheck([this.generateCondition(this.tabData.content.position)])) {
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