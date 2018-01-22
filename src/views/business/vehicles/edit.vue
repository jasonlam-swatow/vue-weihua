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
              <el-form-item
                label="车牌号"
                >
                <el-input
                  v-model="tabData.content.plateNo"
                  ></el-input>
              </el-form-item>
              <el-form-item
                label="车辆类型"
                >
                <el-select  v-model="tabData.content.plateType">
                <el-option-group
                  v-for="group in vehicleTypes"
                  :key="group.id"
                  :label="group.value">
                  <el-option
                    v-for="child in group.children"
                    :key="child.id"
                    :label="child.value"
                    :value="child.code">
                  </el-option>
                </el-option-group>
                </el-select>
              </el-form-item>
              <el-form-item
                label="道路运输证号"
                >
                <el-input
                  v-model="tabData.content.licenseNo"
                  ></el-input>
              </el-form-item>
              <el-form-item
                label="车架号"
                >
                <el-input
                  v-model="tabData.content.vin"
                  ></el-input>
              </el-form-item>              
              <el-form-item
                label="整备质量"
                >
                <el-input
                  v-model="tabData.content.curbWeight"
                  ></el-input>
              </el-form-item>
              <el-form-item
                label="核载/准牵引质量"
                >
                <el-input
                  v-model="tabData.content.tractionMass"
                  ></el-input>
              </el-form-item>
              <!-- <el-form-item
                label="车牌类型"
                >
                <el-select
                  v-model="tabData.content.position">
                    <el-option label="黄牌" value="yellow"></el-option>
                    <el-option label="蓝牌" value="blue"></el-option>
                </el-select>
              </el-form-item> -->
              <!-- <el-form-item 
               label="经营类型" class="full-width">
                <el-tree
                :props="props"
                :load="loadNode"
                lazy
                show-checkbox
                @check-change="handleCheckChange">
              </el-tree>
              </el-form-item> -->
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <!-- 上传车辆道路运输证 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              车辆道路运输证
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item
                label="道路运输证号"
                >
                <el-input
                  v-model="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'A').licenseNo"
                  ></el-input>
              </el-form-item>
              <el-form-item label="车辆有效期">
                <el-date-picker
                  v-model="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'A').expireDate"
                  type="date"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item label="等级评定有效期">
                <el-date-picker
                  v-model="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'A').restsDate"
                  type="date"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item label="上传" class="full-width">
                <el-upload
                  :headers="header"
                  action="/v1/files/upload/"
                  class="license-uploader"
                  :on-success="onUpload('车辆道路运输证', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>营运证正本正本正面</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('车辆道路运输证', 'B')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>代理证正面</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('车辆道路运输证', 'C')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'C').path"
                    :src="taCData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'C').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>代理证反面</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('车辆道路运输证', 'D')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'D').path"
                    :src="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'D').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>等级评定卡（挂车不需要）</p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 上传机动车登记证 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              机动车登记证
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="上传" class="full-width">
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('机动车登记证', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '机动车登记证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '机动车登记证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>机动车登记信息证</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('机动车登记证', 'B')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '机动车登记证' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '机动车登记证' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>机动车登记证登记栏（最近一次登记）</p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 上传车辆行驶证 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              车辆行驶证
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="检测有效期" class="full-width">
                <el-date-picker
                  v-model="tabData.content.certifications.find(_ => _.title === '车辆行驶证' && _.type === 'A').expireDate"
                  type="date"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item label="上传" class="full-width">
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('车辆行驶证', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆行驶证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '车辆行驶证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>行驶证正本正面</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('车辆行驶证', 'B')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆行驶证' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '车辆行驶证' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>行驶证正本反面</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('车辆行驶证', 'C')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆行驶证' && _.type === 'C').path"
                    :src="taCData.content.certifications.find(_ => _.title === '车辆行驶证' && _.type === 'C').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>行驶证正本反面</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                 :on-success="onUpload('车辆行驶证', 'D')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆行驶证' && _.type === 'D').path"
                    :src="tabData.content.certifications.find(_ => _.title === '车辆行驶证' && _.type === 'D').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>行驶证副本反面</p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 上传卫星定位终端安装证书 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              卫星定位终端安装证书（牵引车必填）
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item
                label="从业资格证号"
                >
                <el-input
                  v-model="tabData.content.certifications.find(_ => _.title === '卫星定位终端安装证书' && _.type === 'A').licenseNo"
                  ></el-input>
              </el-form-item>
              <el-form-item label="有效期截止日期">
                <el-date-picker
                  v-model="tabData.content.certifications.find(_ => _.title === '卫星定位终端安装证书' && _.type === 'A').restsDate"
                  type="date"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item label="上传" class="full-width">
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('卫星定位终端安装证书', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '卫星定位终端安装证书' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '卫星定位终端安装证书' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>卫星定位终端安装证书</p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 道路危险货物承运人责任保险单 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              道路危险货物承运人责任保险单
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="保险有效期">
                <el-date-picker
                  v-model="tabData.content.certifications.find(_ => _.title === '道路危险货物承运人责任保险单' && _.type === 'A').expireDate"
                  type="date"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item label="上传" class="full-width">
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('道路危险货物承运人责任保险单', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '道路危险货物承运人责任保险单' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '道路危险货物承运人责任保险单' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>道路危险货物承运人责任保险单</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('道路危险货物承运人责任保险单', 'B')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '道路危险货物承运人责任保险单' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '道路危险货物承运人责任保险单' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>道路危险货物承运人责任保险单（附</p>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 车辆安全设备配备照 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              车辆安全设备配备照片（牵引车必填，至少一张）
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="上传" class="full-width">
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('车辆安全设备配备照', 'A')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆安全设备配备照' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '车辆安全设备配备照' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>车辆安全设备配备照片</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('车辆安全设备配备照', 'B')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆安全设备配备照' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '车辆安全设备配备照' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>车辆安全设备配备照片</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('车辆安全设备配备照', 'C')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆安全设备配备照' && _.type === 'C').path"
                    :src="tabData.content.certifications.find(_ => _.title === '车辆安全设备配备照' && _.type === 'C').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>车辆安全设备配备照片</p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('车辆安全设备配备照', 'D')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆安全设备配备照' && _.type === 'D').path"
                    :src="tabData.content.certifications.find(_ => _.title === '车辆安全设备配备照' && _.type === 'D').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>车辆安全设备配备照片</p>
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
import { getTrailerInfo, createTrailer, editTrailer } from '@/api/business/vehicles'
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
          curbWeight: 0,
          plateNo: '',
          plateType: '',
          tractionMass: 0,
          vin: '',
          licenseNo: '',
          enterpriseId: 1,
          certifications: [{
            fkTable: 'TRA',
            title: '车辆道路运输证',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆道路运输证',
            path: '',
            type: 'B',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆道路运输证',
            path: '',
            type: 'C',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆道路运输证',
            path: '',
            type: 'D',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '机动车登记证',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '机动车登记证',
            path: '',
            type: 'B',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆行驶证',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆行驶证',
            path: '',
            type: 'B',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆行驶证',
            path: '',
            type: 'C',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆行驶证',
            path: '',
            type: 'D',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '卫星定位终端安装证书',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '道路危险货物承运人责任保险单',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '道路危险货物承运人责任保险单',
            path: '',
            type: 'B',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆安全设备配备照',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆安全设备配备照',
            path: '',
            type: 'B',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆安全设备配备照',
            path: '',
            type: 'C',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆安全设备配备照',
            path: '',
            type: 'D',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }]
        }
      }
    }
  },
  computed: {
    ...mapGetters(['vehicleTypes', 'token']),
    isAdd() {
      return this.$route.path.indexOf('add') >= 0
    },
    header() {
      return { 'Authorization': `Bearer ${this.token}` }
    }
  },
  created() {
    if (!this.isAdd) this.fetchData()
  },
  methods: {
    onUpload(title, type) {
      const that = this
      return function(res) {
        that.$_.find(that.tabData.content.certifications, { 'title': title, 'type': type }).path = res.data
      }
    },
    fetchData() {
      const { plateNo } = this.$route.query
      this.loading = true
      getTrailerInfo(plateNo).then(res => {
        this.tabData.content = res.data
        this.loading = false
      })
    },
    onSubmit() {
      this.submitting = true
      const { content } = this.tabData
      if (this.isAdd) {
        createTrailer(content).then(res => {
          this.$message.success('已新增！')
          _afterSubmit()
        })
      } else {
        editTrailer(this.$route.query.plateNo, { ...this.tabData.content }).then(res => {
          this.$message.success('已修改！')
          _afterSubmit()
        })
      }
      const _this = this
      function _afterSubmit() {
        _this.submitting = false
        _this.$router.push('/business/vehicles')
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
