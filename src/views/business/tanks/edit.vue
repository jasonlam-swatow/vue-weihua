<template>
  <div class="app-container">
    <el-row>
      <el-col :md="20" :sm="24">
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane
            :key="tabData.name"
            :name="tabData.name">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="document"></svg-icon>
              {{tabData.label}}
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="罐体编号">
                <el-input v-model="tabData.content.tankerNo"></el-input>
              </el-form-item>
              <el-form-item label="罐体类型">
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
                <el-input v-model="tabData.content.volume"></el-input>
              </el-form-item>
              <el-form-item label="投运日期">
                <el-date-picker
                  v-model="tabData.content.startDate"
                  type="date"></el-date-picker>
              </el-form-item>              
              <el-form-item label="关联挂车号">
                <el-input v-model="tabData.content.plateNo"></el-input>
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
                  v-model="tabData.content.certifications.find(_ => _.title === '罐体检验报告' && _.type === 'A').restsDate"
                  type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="上传报告" class="full-width">
                <el-upload
                  action="/v1/files/upload/"
                  :headers="header"
                  class="license-uploader"
                  :on-success="onUploadPaperA">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '罐体检验报告' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '罐体检验报告' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>检验报告封面页</p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload/"
                  class="license-uploader"
                  :headers="header"                  
                  :on-success="onUploadPaperB">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '罐体检验报告' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '罐体检验报告' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>检验报告细节液</p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 上传压力罐容器登记证-->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              压力罐容器登记证（压力罐容器必须）
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="使用登记证编号">
                <el-input v-model="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'A').licenseNo"></el-input>
              </el-form-item>
              <el-form-item label="下次检验日期">
                <el-date-picker
                  v-model="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'A').restsDate"
                  type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="上传报告" class="full-width">
                <el-upload
                  :headers="header"                
                  action="/v1/files/upload/"
                  class="license-uploader"
                  :on-success="onUploadLicenseA">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>管理页</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"                
                  action="/v1/files/upload/"
                  class="license-uploader"
                  :on-success="onUploadLicenseB">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>检验页</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"                
                  action="/v1/files/upload/"
                  class="license-uploader"
                  :on-success="onUploadLicenseC">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'C').path"
                    :src="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'C').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>特性页</p>
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
import { mapGetters } from 'vuex'
import { getTankInfo, createTank, editTank } from '@/api/business/tanks'
export default {
  data() {
    return {
      activeTab: 'first',
      loading: false,
      submitting: false,
      tabData: {
        label: '基本信息',
        name: 'first',
        icon: 'id-card',
        content: {
          startDate: '',
          tankerNo: '',
          type: '',
          plateNo: '',
          volume: '',
          enterpriseId: 1,
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
  },
  methods: {
    onUploadPaperA(res) {
      this.$_.find(this.tabData.content.certifications, { title: '罐体检验报告', type: 'A' }).path = res.data
    },
    onUploadPaperB(res) {
      this.$_.find(this.tabData.content.certifications, { title: '罐体检验报告', type: 'B' }).path = res.data
    },
    onUploadLicenseA(res) {
      this.$_.find(this.tabData.content.certifications, { title: '压力罐容器登记证', type: 'A' }).path = res.data
    },
    onUploadLicenseB(res) {
      this.$_.find(this.tabData.content.certifications, { title: '压力罐容器登记证', type: 'B' }).path = res.data
    },
    onUploadLicenseC(res) {
      this.$_.find(this.tabData.content.certifications, { title: '压力罐容器登记证', type: 'C' }).path = res.data
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
      const _this = this
      function _afterSubmit() {
        _this.submitting = false
        _this.$router.push('/business/tanks')
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
 .button_area {
   display: flex;
   justify-content: flex-end;
 }
</style>
