<template>
  <div class="app-container">
    <el-row>
      <el-col :md="20" :sm="24">
        <el-alert
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
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="企业名称" class="full-width">
                <el-input v-model="companyName" disabled></el-input>
                <span class="sub-text input-warning"><i class="el-icon-info"></i> 不可修改，如需修改，请联系平台客服人员！</span>
              </el-form-item>
              <el-form-item label="统一社会信用代码">
                <el-input v-model="tabData.content.tankerNo"></el-input>
              </el-form-item>
              <el-form-item label="经营状态">
                <el-select  v-model="tabData.content.type">
                  <el-option
                    v-for="tank in tankerTypes"
                    :key="tank.seq"
                    :label="tank.value"
                    :value="tank.code">
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="公司类型">
                <el-select  v-model="tabData.content.type">
                  <el-option
                    v-for="tank in tankerTypes"
                    :key="tank.seq"
                    :label="tank.value"
                    :value="tank.code">
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="成立日期">
                <el-date-picker
                  v-model="tabData.content.startDate"
                  type="date"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item label="法定代表人">
                <el-input v-model="tabData.content.tankerNo"></el-input>
              </el-form-item>
              <el-form-item label="注册资本">
                <el-input v-model="tabData.content.tankerNo"></el-input>
              </el-form-item>
              <el-form-item label="营业期限">
                <el-date-picker
                  v-model="tabData.content.startDate"
                  type="date"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item label="企业业务类型">
                <el-select  v-model="tabData.content.type">
                  <el-option
                    v-for="tank in tankerTypes"
                    :key="tank.seq"
                    :label="tank.value"
                    :value="tank.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="登记机关">
                <el-input
                  v-model="tabData.content.tankerNo"
                  ></el-input>
              </el-form-item>
              <el-form-item label="紧急联系人">
                <el-input
                  v-model="tabData.content.tankerNo"
                  ></el-input>
              </el-form-item>
              <el-form-item label="企业地址">
                <el-input
                  v-model="tabData.content.tankerNo"
                  ></el-input>
              </el-form-item>
              <el-form-item label="紧急联系电话">
                <el-input
                  v-model="tabData.content.tankerNo"
                  ></el-input>
              </el-form-item>
              <el-form-item label="营业执照经营范围" class="full-width">
                <el-input
                  type="textarea"
                  :rows="8"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
              </el-form-item>
              <el-form-item label="上传企业营业执照" class="full-width">
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
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              企业道路运输经营许可证
            </span>
             <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item
                label="道路运输经营许可证号"
                >
                <el-input
                  v-model="tabData.content.certifications.find(_ => _.title === '压力罐容器登记证' && _.type === 'A').licenseNo"
                  ></el-input>
              </el-form-item>
              <el-form-item
                label="有效期"
                >
                <el-date-picker
                  v-model="tabData.content.startDate"
                  type="date"
                  ></el-date-picker>
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
              </el-form-item>
             </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              企业安全责任承诺书
            </span>
             <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
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
                    <p>要求：下载->填写->盖公章->彩色件扫描上传</p>
                    <div><a href="">点击此处下载</a> 道路危险货物运输企业安全承诺书.pdf</div>
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
          abbrName: '',
          address: '',
          businessType: '',
          businessTerm: '',
          comment: '',
          contactMobile: '',
          contactName: '',
          createUser: '',
          enterpriseType: '',
          fundationDate: '',
          id: 0,
          isDeleted: true,
          legalPerson: '',
          modifiedUser: '',
          name: '',
          operationScope: '',
          registeredCapital: 0,
          registrationAuthority: '',
          registrationNo: '',
          registrationStatus: 0,
          status: '',
          certifications: [{
            fkTable: 'TAN',
            title: '罐体检验报告',
            path: '',
            type: 'A',
            restsDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TAN',
            title: '罐体检验报告',
            path: '',
            type: 'B',
            restsDate: ''
          }, {
            fkTable: 'TAN',
            title: '压力罐容器登记证',
            path: '',
            type: 'A',
            restsDate: ''
          }, {
            fkTable: 'TAN',
            title: '压力罐容器登记证',
            path: '',
            type: 'B',
            restsDate: ''
          }, {
            fkTable: 'TAN',
            title: '压力罐容器登记证',
            path: '',
            type: 'C',
            restsDate: ''
          }]
        }
      }
    }
  },

  created() {
    if (this.$store.getters.basicInfo === null) {
      this.$store.dispatch('GetBasicInfo')
    }
    if (this.$store.getters.certInfo === null) {
      this.$store.dispatch('GetCertInfo')
    }
  },

  computed: {
    companyName() {
      return this.$store.getters.basicInfo
        ? this.$store.getters.basicInfo.name
        : ''
    },
    basicTabList() {
      const info = this.$store.getters.basicInfo
        ? this.$store.getters.basicInfo.info : null
      return [{
        label: '基本信息',
        name: 'first',
        icon: 'id-card',
        content: info
      }]
    },
    lisenceFileList() {
      return this.$store.getters.basicInfo
        ? this.$store.getters.basicInfo.info.lisence.value : []
    },
    certTabList() {
      const { certInfo } = this.$store.getters
      return [{
        name: 'first',
        label: '其他认证信息',
        icon: 'approve',
        content: certInfo
      }]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .input-warning {
    line-height: 14px;
    font-size: 13px;
    position: absolute;
    top: 14px;
    right: -286px;
  }
</style>