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
                <el-input v-model="tabData.content.abbrName" disabled></el-input>
                <span class="sub-text input-warning"><i class="el-icon-info"></i> 不可修改，如需修改，请联系平台客服人员！</span>
              </el-form-item>
              <el-form-item label="统一社会信用代码">
                <el-input v-model="tabData.content.registrationNo"></el-input>
              </el-form-item>
              <el-form-item label="经营状态">
                <el-select  v-model="tabData.content.status">
                  <el-option
                    v-for="status in enterpriseStatusTypes"
                    :key="status.code"
                    :label="status.value"
                    :value="status.code">
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="公司类型">
                <el-select  v-model="tabData.content.enterpriseType">
                  <el-option
                    v-for="etype in enterpriseTypes"
                    :key="etype.code"
                    :label="etype.value"
                    :value="etype.code">
                  </el-option>
                </el-select>
              </el-form-item>
               <el-form-item label="成立日期">
                <el-date-picker
                  v-model="tabData.content.fundationDate"
                  type="date"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item label="法定代表人">
                <el-input v-model="tabData.content.legalPerson"></el-input>
              </el-form-item>
              <el-form-item label="注册资本">
                <el-input v-model="tabData.content.registeredCapital"></el-input>
              </el-form-item>
              <!-- <el-form-item label="营业期限">
                <el-date-picker
                  v-model="tabData.content.startDate"
                  type="date"
                  ></el-date-picker>
              </el-form-item> -->
              <el-form-item label="企业业务类型">
                <el-select  v-model="tabData.content.businessType">
                  <el-option
                    v-for="btype in businessTypes"
                    :key="btype.code"
                    :label="btype.value"
                    :value="btype.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="登记机关">
                <el-input
                  v-model="tabData.content.tankerNo"
                  ></el-input>
              </el-form-item> -->
              <el-form-item label="紧急联系人">
                <el-input
                  v-model="tabData.content.contactName"
                  ></el-input>
              </el-form-item>
              <el-form-item label="企业地址">
                <el-input
                  v-model="tabData.content.address"
                  ></el-input>
              </el-form-item>
              <el-form-item label="紧急联系电话">
                <el-input
                  v-model="tabData.content.contactMobile"
                  ></el-input>
              </el-form-item>
              <el-form-item label="经营类型" class="full-width">
                <div style="max-height: 280px; overflow: scroll; border: 1px solid #eee; padding-top: 12px;">
                  <el-tree
                    :data="vehicleBusinessTypes"
                    show-checkbox
                    node-key="id"
                    @check-change="onTreeCheck"
                    :default-expand-all="true"
                    :default-expanded-checked-keys="tabData.content.businessTerm"></el-tree>
                </div>
              </el-form-item>
              <!-- <el-form-item label="上传企业营业执照" class="full-width">
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
              </el-form-item> -->
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
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
        </el-tabs> -->
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
import { getEnterpriseInfo, createEnterprise, editEnterprise } from '@/api/business/enterprises'
import remove from 'lodash/remove'
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
          status: ''
          // certifications: [{
          //   fkTable: 'TAN',
          //   title: '罐体检验报告',
          //   path: '',
          //   type: 'A',
          //   restsDate: '',
          //   licenseNo: ''
          // }, {
          //   fkTable: 'TAN',
          //   title: '罐体检验报告',
          //   path: '',
          //   type: 'B',
          //   restsDate: ''
          // }, {
          //   fkTable: 'TAN',
          //   title: '压力罐容器登记证',
          //   path: '',
          //   type: 'A',
          //   restsDate: ''
          // }, {
          //   fkTable: 'TAN',
          //   title: '压力罐容器登记证',
          //   path: '',
          //   type: 'B',
          //   restsDate: ''
          // }, {
          //   fkTable: 'TAN',
          //   title: '压力罐容器登记证',
          //   path: '',
          //   type: 'C',
          //   restsDate: ''
          // }]
        }
      }
    }
  },
  created() {
    if (!this.isAdd) this.fetchData()
  },
  computed: {
    ...mapGetters([
      'vehicleBusinessTypes', 'enterpriseStatusTypes', 'enterpriseTypes', 'businessTypes'
    ]),
    isAdd() {
      return this.$route.path.indexOf('add') >= 0
    },
    header() {
      return { 'Authorization': `Bearer ${this.token}` }
    }
  },
  methods: {
    onTreeCheck(data, checked, interminate) {
      console.log(data, checked, interminate)
      if (!checked) {
        remove(this.tabData.content.businessType, (t) => t === data.id)
      } else {
        this.tabData.content.businessType.push(data.id)
      }
    },
    fetchData() {
      const { plateNo } = this.$route.query
      this.loading = true
      getEnterpriseInfo(plateNo).then(res => {
        this.tabData.content = res.data
        this.loading = false
      })
    },
    onSubmit() {
      this.submitting = true
      const { content } = this.tabData
      if (this.isAdd) {
        createEnterprise(content).then(res => {
          this.$message.success('已新增！')
          _afterSubmit()
        })
      } else {
        editEnterprise(this.$route.query.plateNo, { ...this.tabData.content }).then(res => {
          this.$message.success('已修改！')
          _afterSubmit()
        })
      }
      const _this = this
      function _afterSubmit() {
        _this.submitting = false
        _this.$router.push('/business/')
      }
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