<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-tabs id="firstTab" v-model="activeTab" type="card" class="customized denser" v-loading="loading">
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
              <el-form-item label="罐体编号" prop="tankerNo">
                <el-input v-model="tabData.content.tankerNo"></el-input>
              </el-form-item>
              <el-form-item label="罐体类型" prop="type">
                <el-select v-model="tabData.content.type">
                  <el-option
                    v-for="tank in tankerTypes"
                    :key="tank.seq"
                    :label="tank.value"
                    :value="tank.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="容积">
                <!-- <el-input v-model="tabData.content.volume"></el-input> -->
                <el-input-number v-model="tabData.content.volume" :step="0.1"></el-input-number>
              </el-form-item>
              <el-form-item label="投运日期">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.startDate"
                  type="date"></el-date-picker>
              </el-form-item>              
              <el-form-item label="关联挂车号" prop="plateNo">
                <el-select
                  v-model="tabData.content.plateNo"
                  filterable
                  remote
                  :loading="searching"
                  placeholder="请搜索挂车号"
                  :remote-method="searchAssociateVehicle"
                  @change="onSelectAssociateVehicle">
                  <el-option
                    v-for="vehicle in associateVehicles"
                    :key="vehicle.id"
                    :label="vehicle.plateNo"
                    :value="vehicle.plateNo"></el-option>
                </el-select>
                <!-- <el-input v-model="tabData.content.plateNo"></el-input> -->
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 上传罐体校验报告-->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              罐体检验报告
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="报告编号">
                <el-input v-model="tabData.content.certifications.find(_ => _.title === '罐体检验报告' && _.type === 'A').licenseNo"></el-input>
              </el-form-item>
              <el-form-item label="下次检验日期">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.certifications.find(_ => _.title === '罐体检验报告' && _.type === 'A').restsDate"
                  type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="上传报告" class="full-width">
                <el-upload
                  action="/v1/files/upload/"
                  :headers="header"
                  accept=".jpg, .jpeg, .png, .pdf"
                  class="license-uploader"
                  :on-success="onUpload('罐体检验报告', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '罐体检验报告' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '罐体检验报告' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>检验报告封面页</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/tank_report_1.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload/"
                  class="license-uploader"
                  :headers="header"
                  accept=".jpg, .jpeg, .png, .pdf"                  
                  :on-success="onUpload('罐体检验报告', 'B')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '罐体检验报告' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '罐体检验报告' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>检验报告细节页</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/tank_report_2.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
              </el-form-item>
              <el-alert
                title="彩色扫描件或彩色照片，内容清晰可见"
                type="info"
                show-icon
                style="margin-left: 130px; width: 80%;"></el-alert>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 上传压力罐容器登记证-->
        <el-tabs
          v-model="activeTab" v-if="tabData.content.type === 'OVERHEAD_TANK'"
          type="card" class="customized denser"
          v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              压力罐容器登记证
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="使用登记证编号">
                <el-input v-model="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'A').licenseNo"></el-input>
              </el-form-item>
              <el-form-item label="下次检验日期">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'A').restsDate"
                  type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="上传报告" class="full-width">
                <el-upload
                  :headers="header"
                  accept=".jpg, .jpeg, .png, .pdf"                
                  action="/v1/files/upload/"
                  class="license-uploader"
                  :on-success="onUpload('压力罐容器登记证', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>管理页</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/tank_reg_1.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  accept=".jpg, .jpeg, .png, .pdf"                
                  action="/v1/files/upload/"
                  class="license-uploader"
                  :on-success="onUpload('压力罐容器登记证', 'B')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>检验页</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/tank_reg_2.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  accept=".jpg, .jpeg, .png, .pdf"                
                  action="/v1/files/upload/"
                  class="license-uploader"
                  :on-success="onUpload('压力罐容器登记证', 'C')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'C').path"
                    :src="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'C').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>特性页</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/tank_reg_3.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
              </el-form-item>
              <el-alert
                title="彩色扫描件或彩色照片，内容清晰可见"
                description="压力罐容器必填"
                type="info"
                show-icon
                style="margin-left: 130px; width: 80%;"></el-alert>
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
import {
  getTankInfo,
  getAssociatedPlateNumbers,
  createTank,
  editTank
} from '@/api/business/tanks'
import { getEnterpriseList } from '@/api/business/enterprises'
import datepickerOptions from '@/mixins/_datepickerOptions'
import isEmpty from 'lodash/isEmpty'
import VueScrollTo from 'vue-scrollto'

export default {
  mixins: [datepickerOptions],
  data() {
    return {
      activeTab: 'first',
      loading: false,
      searching: false,
      submitting: false,
      enterpriseList: [],
      tabData: {
        label: '基本信息',
        name: 'first',
        icon: 'id-card',
        content: {
          startDate: '',
          tankerNo: '',
          type: '',
          plateNo: '',
          trailerId: null,
          volume: '1.0',
          enterpriseId: '',
          certifications: [{
            fkTable: 'TAN',
            title: '罐体检验报告',
            code: 'TERM_OF_TANKER_INSPECTION',
            path: '',
            type: 'A',
            restsDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TAN',
            title: '罐体检验报告',
            code: 'TERM_OF_TANKER_INSPECTION',
            path: '',
            type: 'B',
            restsDate: ''
          }, {
            fkTable: 'TAN',
            title: '压力罐容器登记证',
            code: 'TERM_OF_PTC_REGISTRATION_CERTIFICATE',
            path: '',
            type: 'A',
            restsDate: ''
          }, {
            fkTable: 'TAN',
            title: '压力罐容器登记证',
            code: 'TERM_OF_PTC_REGISTRATION_CERTIFICATE',
            path: '',
            type: 'B',
            restsDate: ''
          }, {
            fkTable: 'TAN',
            title: '压力罐容器登记证',
            code: 'TERM_OF',
            path: '',
            type: 'C',
            restsDate: ''
          }]
        }
      },
      associateVehicles: [],
      formRules: {
        tankerNo: [
          { required: true, message: '请填写罐体编号', trigger: 'blur' },
          { max: 17, message: '请填写不超过 17 个字符的字母+数字', trigger: 'change' }
        ],
        type: [{ required: true, message: '请选择罐体类型', trigger: 'blur' }],
        plateNo: [{ required: true, message: '请填写关联挂车号', trigger: 'blur' }]
      },
      scrollToOptions: {
        container: 'body',
        easing: 'ease-in',
        offset: -100,
        cancelable: true
      }
    }
  },
  computed: {
    ...mapGetters(['tankerTypes', 'token']),
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
      if (this.tabData.content.type.includes('ATMOSPHERIC_TANK')) {
        collection.push({ warning: '检验报告必填', condition: this.countCertificationLength('TERM_OF_TANKER_INSPECTION') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_TANKER_INSPECTION' }).length })
      }
      if (this.tabData.content.type.includes('OVERHEAD_TANK')) {
        collection.push({ warning: '检验报告必填', condition: this.countCertificationLength('TERM_OF_TANKER_INSPECTION') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_TANKER_INSPECTION' }).length })
        collection.push({ warning: '压力罐容器登记证必填', condition: this.countCertificationLength('TERM_OF_PTC_REGISTRATION_CERTIFICATE') === this.$_.filter(this.tabData.content.certifications, o => { return o.code === 'TERM_OF_PTC_REGISTRATION_CERTIFICATE' }).length })
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
    searchAssociateVehicle(query) {
      if (query !== '') {
        this.searching = true
        getAssociatedPlateNumbers(query).then(res => {
          this.associateVehicles = res.data
          this.searching = false
        })
      } else {
        this.associateVehicles = []
      }
    },
    onSelectAssociateVehicle(val) {
      this.tabData.content.trailerId = this.$_.find(this.associateVehicles, ['plateNo', val]).id
    },
    fetchData() {
      const { id } = this.$route.query
      this.loading = true
      getTankInfo(id).then(res => {
        this.tabData.content = res.data
        this.loading = false
      })
    },
    onSubmit() {
      this.submitting = true
      const { content } = this.tabData
      this.$refs['tabData.content'].validate((valid) => {
        if (valid) {
          if (this.extraCheck([this.generateCondition(this.tabData.content.type)])) {
            if (this.isAdd) {
              createTank(content).then(res => {
                this.$message.success('已新增！')
                _afterSubmit()
              })
            } else {
              editTank(this.$route.query.id, { ...this.tabData.content }).then(res => {
                this.$message.success('已修改！')
                _afterSubmit()
              })
            }
          }
        } else {
          this.$notify({
            title: '表单提交有错误项',
            message: '请根据表单字段提示信息，补充必要字段',
            type: 'error'
          })
          VueScrollTo.scrollTo('#firstTab', 500, this.scrollToOptions)
          this.submitting = false
          return false
        }
      })
      const _this = this
      this.submitting = false
      function _afterSubmit() {
        // _this.submitting = false
        _this.$router.push('/business/tanks')
      }
    }
  }
}
</script>
