<template>
  <div class="app-container">
    <el-row>
      <el-col :md="20" :sm="24">
        <el-alert
          title="你正在修改企业信息，保存后将会更新内容并等待重新审核"
          type="warning"
          show-icon
          class="mgb12"></el-alert>
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane
            v-for="tab in basicTabList"
            :key="tab.name"
            :name="tab.name">
            <span slot="label" class="span-with-svg">
              <svg-icon :icon-class="tab.icon"></svg-icon>
              {{tab.label}}
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven">
              <el-form-item label="企业名称" class="full-width">
                <el-input v-model="companyName" disabled></el-input>
                <span class="sub-text input-warning"><i class="el-icon-info"></i> 不可修改，如需修改，请联系平台客服人员！</span>
              </el-form-item>
              <el-form-item
                v-for="(item, key) in tab.content"
                :key="key"
                :label="item.label"
                :class="[{ 'full-width': ['business_range', 'lisence'].includes(key) },
                         { 'with-control': ['business_range', 'lisence'].includes(key) }]">
                <el-select
                  v-if="['status', 'company_type', 'business_type'].includes(key)"
                  v-model="item.value">
                  <template v-if="key === 'status'">
                    <el-option label="存续" value="存续"></el-option>
                    <el-option label="注销" value="注销"></el-option>
                    <el-option label="迁出" value="迁出"></el-option>
                  </template>
                  <template v-else-if="key === 'company_type'">
                    <el-option label="一人有限责任公司（自然人投资）" value="一人有限责任公司（自然人投资）"></el-option>
                    <el-option label="有限公司" value="有限公司"></el-option>
                  </template>
                  <template v-else="key === 'business_type'">
                    <el-option label="运输企业" value="运输企业"></el-option>
                    <el-option label="仓储企业" value="仓储企业"></el-option>
                    <el-option label="生产企业" value="生产企业"></el-option>
                  </template>
                </el-select>
                <el-date-picker
                  v-else-if="['found_date', 'end_date'].includes(key)"
                  v-model="item.value"
                  type="date"
                  value-format="yyyy-MM-dd"></el-date-picker>
                <el-input
                  v-else-if="key === 'business_range'"
                  v-model="item.value"
                  type="textarea"></el-input>
                <el-upload
                  v-else-if="key === 'lisence'"
                  action="https://up.uploadfiles.io/upload"
                  list-type="picture-card"
                  :file-list="lisenceFileList">
                  <i class="el-icon-plus"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                    style="line-height: 14px; margin: 0;">
                    <i class="el-icon-info"> 彩色扫描件或彩色照片，内容清晰可见。如非三证合一，请另行上传企业组织机构代码证、企业税务登记证</i>
                  </div>
                </el-upload>
                <el-input
                  v-else
                  v-model="item.value"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane
            v-for="tab in certTabList"
            :key="tab.name"
            :name="tab.name">
            <span slot="label" class="span-with-svg">
              <svg-icon :icon-class="tab.icon"></svg-icon>
              {{tab.label}}
            </span>
            <el-card
              v-for="(item, key) in tab.content"
              :key="key"
              class="box-card mgb12">
              <div slot="header" class="clearfix">
                <span>{{item.name}}</span>
              </div>
              <div>
                <el-row type="flex" justify="space-around">
                  <el-col :span="16">
                    <el-form class="readonly-form">
                      <template v-if="key === 'business_permit'">
                        <el-form-item label="道路运输经营许可证">
                          <el-input v-model="item.permit_num"></el-input>
                        </el-form-item>
                        <el-form-item label="有效期">
                          <el-date-picker
                            v-model="item.validity"
                            type="date"
                            value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                      </template>
                      <template v-if="key === 'safety_commitment'">
                        <el-form-item label="要求">
                          <span class="sub-text">下载→填写→盖公章→彩色件扫描上传</span>
                        </el-form-item>
                        <el-form-item label="下载证件">
                          <el-button type="text" icon="el-icon-tickets">{{item.file_name}}</el-button>
                        </el-form-item>
                      </template>
                    </el-form>
                  </el-col>
                  <el-col :span="8">
                    <div style="width: 200px; height: 180px; border: 1px solid red"></div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'first'
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