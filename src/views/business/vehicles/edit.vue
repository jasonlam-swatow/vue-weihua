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
              :model="tabData.content"
              class="prevent-uneven strange-input"
              :rules="formRules" ref="tabData.content" >
              <el-form-item v-if="isAdd" label="企业" class="full-width">
                <el-select v-model="tabData.content.enterpriseId">
                  <el-option
                    v-for="ent in enterpriseList"
                    :key="ent.id"
                    :value="ent.id"
                    :label="ent.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车牌号" prop="plateNo">
                <el-input v-model="tabData.content.plateNo"></el-input>
              </el-form-item>
              <el-form-item label="车辆类型" prop="type">
                <el-select v-model="tabData.content.type">
                <el-option-group
                  v-for="group in vehicleTypes"
                  v-if="group.code !== 'OTHER'"
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
              <el-form-item label="车牌类型" prop="plateType">
                <el-select v-model="tabData.content.plateType">
                  <el-option
                    v-for="item in licensePlateTypes"
                    :key="item.id"
                    :label="item.value"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="道路运输证号" prop="licenseNo">
                <el-input v-model="tabData.content.licenseNo"></el-input>
              </el-form-item>
              <el-form-item label="车架号" prop="vin">
                <el-input v-model="tabData.content.vin"></el-input>
              </el-form-item>              
              <el-form-item label="整备质量" prop="curbWeight">
                <el-input v-model="tabData.content.curbWeight">
                  <template slot="append">KG</template>
                </el-input>
                <!-- <el-input v-model="tabData.content.curbWeight"></el-input> -->
              </el-form-item>
              <el-form-item label="核载/准牵引质量" prop="tractionMass">
                <el-input v-model="tabData.content.tractionMass">
                  <template slot="append">KG</template>
                </el-input>
                <!-- <el-input v-model="tabData.content.tractionMass"></el-input> -->
              </el-form-item>
              <el-form-item label="经营类型" class="full-width" prop="businessType">
                <div style="max-height: 280px; overflow: scroll; border: 1px solid #eee; padding-top: 12px;">
                  <el-tree
                    ref="tree"
                    :data="vehicleBusinessTypes"
                    show-checkbox
                    node-key="id"
                    @check-change="onTreeCheck"
                    :default-expand-all="true"
                    :default-expanded-checked-keys="tabData.content.businessType"></el-tree>
                </div>
              </el-form-item>
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
              <el-form-item label="道路运输证号">
                <el-input v-model="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'A').licenseNo"></el-input>
              </el-form-item>
              <el-form-item label="车辆有效期">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'A').expireDate"
                  type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="等级评定有效期">
                <el-date-picker
                  :picker-options="pickerOptions"
                  v-model="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'A').restsDate"
                  type="date"></el-date-picker>
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
                    <p>
                      <a
                        target="_blank" href="/static/samples/road_transport_1.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
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
                    <p>
                      <a
                        target="_blank" href="/static/samples/road_transport_2.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('车辆道路运输证', 'C')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'C').path"
                    :src="tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'C').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>代理证反面</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/road_transport_3.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <!-- 挂车不需要等级评定卡 -->
                <el-upload
                  v-if="!(tabData.content.type.includes('TRAILER') && !tabData.content.type.includes('VEHICLE'))"
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
                    <p>等级评定卡</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/road_transport_4.jpg"
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
                    <p>
                      <a
                        target="_blank" href="/static/samples/mobile_reg_1.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
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
                    <p>
                      <a
                        target="_blank" href="/static/samples/mobile_reg_2.jpg"
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
                  :picker-options="pickerOptions"
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
                    <p>
                      <a
                        target="_blank" href="/static/samples/driver_1.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
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
                    <p>
                      <a
                        target="_blank" href="/static/samples/driver_2.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
                <el-upload
                  :headers="header"
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUpload('车辆行驶证', 'C')">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '车辆行驶证' && _.type === 'C').path"
                    :src="tabData.content.certifications.find(_ => _.title === '车辆行驶证' && _.type === 'C').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>行驶证副本正面</p>
                    <p>
                      <a
                        target="_blank" href="/static/samples/driver_3.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
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
        <!-- 上传卫星定位终端安装证书 -->
        <el-tabs
          v-if="tabData.content.type.includes('TOWING_VEHICLE')"
          v-model="activeTab"
          type="card" class="customized denser"
          v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              卫星定位终端安装证书
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
                  :picker-options="pickerOptions"
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
                    <p>
                      <a
                        target="_blank" href="/static/samples/satellite_cert.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
                  </div>
                </el-upload>
              </el-form-item>
              <el-alert
                title="彩色扫描件或彩色照片，内容清晰可见"
                description="牵引车必填"
                type="info"
                show-icon
                style="margin-left: 130px"></el-alert>
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
                  :picker-options="pickerOptions"
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
                    <p>
                      <a
                        target="_blank" href="/static/samples/safety_permit_1.jpg"
                        class="sample-link">点此查看示例</a>
                    </p>
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
                    <p>道路危险货物承运人责任保险单（附加页）</p>
                    <p style="width: 150px">
                      <a
                        target="_blank" href="/static/samples/safety_permit_2.jpg"
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
        <!-- 车辆安全设备配备照 -->
        <el-tabs
          v-if="tabData.content.type.includes('TOWING_VEHICLE')"
          v-model="activeTab"
          type="card" class="customized denser"
          v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              车辆安全设备配备照片
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
              <el-alert
                title="彩色扫描件或彩色照片，内容清晰可见"
                description="牵引车必填，至少上传一张"
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
import {
  getTrailerInfo,
  createTrailer,
  editTrailer } from '@/api/business/vehicles'
import { getEnterpriseList } from '@/api/business/enterprises'
import datepickerOptions from '@/mixins/_datepickerOptions'
import remove from 'lodash/remove'
import isEmpty from 'lodash/isEmpty'

export default {
  mixins: [datepickerOptions],
  data() {
    var checkPlateNo = (rule, value, callback) => {
      console.log(value)
      var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9学警港澳]{1}$/
      if (!reg.test(value)) {
        return callback(new Error('车牌号格式不正确'))
      } else { return callback() }
    }
    var checkLicenseNo = (rule, value, callback) => {
      if (this.tabData.content.type.includes('TRAILER') && !this.tabData.content.type.includes('VEHICLE')) {
        if (!(Number.isInteger(value) || value.length === 12)) {
          return callback(new Error('挂车道路运输证号应为 12 位数字'))
        } else { return callback() }
      } else {
        if (!(Number.isInteger(value) || value.length === 11)) {
          return callback(new Error('非挂车道路运输证号应为 11 位数字'))
        } else { return callback() }
      }
    }
    var checkVin = (rule, value, callback) => {
      // console.log(value)
      if (!(value.length === 17)) {
        return callback(new Error('车架号应为 17 位字母+数字'))
      } else { return callback() }
    }
    var checkWeight = (rule, value, callback) => {
      var reg = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/
      if (!reg.test(value)) {
        return callback(new Error('质量应为数字或浮点数格式'))
      } else { return callback() }
    }
    return {
      formRules: {
        plateNo: [
          { required: true, message: '请填写车牌号', trigger: 'blur' },
          { validator: checkPlateNo, trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择车辆类型', trigger: 'blur' }],
        plateType: [{ required: true, message: '请填写车牌号', trigger: 'blur' }],
        licenseNo: [
          { required: true, message: '请填写道路运输证号', trigger: 'blur' },
          { validator: checkLicenseNo, trigger: 'blur' }
        ],
        vin: [
          { required: true, message: '请填写车架号', trigger: 'blur' },
          { validator: checkVin, trigger: 'blur' }
        ],
        curbWeight: [
          { required: true, message: '请填写整备质量', trigger: 'blur' },
          { validator: checkWeight, trigger: 'change' }
        ],
        tractionMass: [
          { required: true, message: '请填写核载/准牵引质量', trigger: 'blur' },
          { validator: checkWeight, trigger: 'change' }
        ],
        businessType: [{ required: true, message: '请选择经营类型', trigger: 'blur' }]
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
          curbWeight: 0,
          plateNo: '',
          type: '',
          plateType: '',
          tractionMass: 0,
          vin: '',
          licenseNo: '',
          enterpriseId: '',
          businessType: [],
          certifications: [{
            fkTable: 'TRA',
            title: '车辆道路运输证',
            code: 'TERM_OF_VEHICLE_ROAD_TRANSPORT_CARD',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆道路运输证',
            code: 'TERM_OF_VEHICLE_ROAD_TRANSPORT_CARD',
            path: '',
            type: 'B',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆道路运输证',
            code: 'TERM_OF_VEHICLE_ROAD_TRANSPORT_CARD',
            path: '',
            type: 'C',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆道路运输证',
            code: 'TERM_OF_VEHICLE_ROAD_TRANSPORT_CARD',
            path: '',
            type: 'D',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '机动车登记证',
            code: 'TERM_OF_VEHICLE_REGISTRATION_CARD',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '机动车登记证',
            code: 'TERM_OF_VEHICLE_REGISTRATION_CARD',
            path: '',
            type: 'B',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆行驶证',
            code: 'TERM_OF_VEHICLE_DRIVING_LICENSE',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆行驶证',
            code: 'TERM_OF_VEHICLE_DRIVING_LICENSE',
            path: '',
            type: 'B',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆行驶证',
            code: 'TERM_OF_VEHICLE_DRIVING_LICENSE',
            path: '',
            type: 'C',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆行驶证',
            code: 'TERM_OF_VEHICLE_DRIVING_LICENSE',
            path: '',
            type: 'D',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '卫星定位终端安装证书',
            code: 'TERM_OF_SPT_INSTALLATION_CERTIFICATE',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '道路危险货物承运人责任保险单',
            code: 'TERM_OF_LIABILITY_INSURANCE',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '道路危险货物承运人责任保险单',
            code: 'TERM_OF_LIABILITY_INSURANCE',
            path: '',
            type: 'B',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆安全设备配备照',
            code: 'TERM_OF_VEHICLE_SAFETY_EQUIPMENT',
            path: '',
            type: 'A',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆安全设备配备照',
            code: 'TERM_OF_VEHICLE_SAFETY_EQUIPMENT',
            path: '',
            type: 'B',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆安全设备配备照',
            code: 'TERM_OF_VEHICLE_SAFETY_EQUIPMENT',
            path: '',
            type: 'C',
            restsDate: '',
            expireDate: '',
            licenseNo: ''
          }, {
            fkTable: 'TRA',
            title: '车辆安全设备配备照',
            code: 'TERM_OF_VEHICLE_SAFETY_EQUIPMENT',
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
  // watch: {
  // 'tabData.content.type': {
  //   handler(val) {
  //     this.generateCondition(val)
  //   }
  // }},
  computed: {
    ...mapGetters([
      'vehicleTypes',
      'licensePlateTypes',
      'vehicleBusinessTypes',
      'token'
    ]),
    isAdd() {
      return this.$route.path.indexOf('add') >= 0
    },
    header() {
      return { 'Authorization': `Bearer ${this.token}` }
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
      let collections = this.$_.filter(this.tabData.content.certifications, o => { o.code === type })
      collections = this.$_.map(collections, o => o.path)
      const certificationsLength = collections.length - this.$_.filter(collections, isEmpty).length
      return certificationsLength
    },
    // 观察对应值生成对应条件
    generateCondition(type) {
      console.log(type)
      const collection = []
      if (!(this.tabData.content.type.includes('TRAILER') && !this.tabData.content.type.includes('VEHICLE'))) {
        collection.push({ warning: '等级评定卡不能为空', condition: this.tabData.content.certifications.find(_ => _.title === '车辆道路运输证' && _.type === 'D').path })
      }
      if (type.includes('TOWING_VEHICLE')) {
        collection.push({ warning: '车辆安全设备配备照片至少有一张', condition: this.countCertificationLength('TERM_OF_VEHICLE_SAFETY_EQUIPMENT') })
        collection.push({ warning: '卫星定位终端安装证书不能为空', condition: this.tabData.content.certifications.find(_ => _.title === '卫星定位终端安装证书' && _.type === 'A').path })
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
    onTreeCheck(data, checked, interminate) {
      console.log(data, checked, interminate)
      if (!checked) {
        remove(this.tabData.content.businessType, (t) => t === data.id)
      } else {
        this.tabData.content.businessType.push(data.id)
      }
    },
    fetchData() {
      const { id } = this.$route.query
      this.loading = true
      getTrailerInfo(id).then(res => {
        this.tabData.content = res.data
        this.loading = false
        this.$refs.tree.setCheckedKeys(this.tabData.content.businessType)
      })
    },
    onSubmit() {
      this.submitting = true
      const { content } = this.tabData
      if (!this.tabData.content.businessType.length) {
        this.$notify.error('请勾选经营范围')
        this.submitting = false
        return
      }
      this.$refs['tabData.content'].validate((valid) => {
        if (valid) {
          if (this.extraCheck([this.generateCondition(this.tabData.content.type)])) {
            if (this.isAdd) {
              createTrailer(content).then(res => {
                this.$message.success('已新增！')
                _afterSubmit()
              })
            } else {
              editTrailer(this.$route.query.id, { ...this.tabData.content }).then(res => {
                this.$message.success('已修改！')
                _afterSubmit()
              })
            }
          }
        } else {
          this.$notify({
            title: '表单提交有错误项',
            message: '请根据表单字段提示信息，补充必要字段'
          })
          this.submitting = false
          return false
        }
      })
      const _this = this
      this.submitting = false
      function _afterSubmit() {
        // _this.submitting = false
        _this.$router.push('/business/vehicles')
      }
    }
  }
}
</script>
