<template>
  <div class="app-container">
    <el-row>
      <el-col :md="20" :sm="24">
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane
            v-for="tab in basicTabList"
            :key="tab.name"
            :name="tab.name">
            <span slot="label" class="span-with-svg">
              <svg-icon :icon-class="tab.icon"></svg-icon>
              {{tab.label}}
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item
                label="姓名"
                >
                <el-input
                  v-model="tab.content.name"
                  ></el-input>
              </el-form-item>
              <el-form-item
                label="性别"
                >
                <el-radio-group
                  v-model="tab.content.gender"
                  >
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item
                label="主要岗位"
                >
                <el-select
                  v-model="tab.content.position">
                    <el-option label="驾驶员" value="驾驶员"></el-option>
                    <el-option label="押运员" value="押运员"></el-option>
                    <el-option label="驾驶员/押运员" value="驾驶员/押运员"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="联系电话"
                >
                <el-input
                  v-model="tab.content.tel"
                  ></el-input>
              </el-form-item>
              <el-form-item
                label="身份证号码"
                >
                <el-input
                  v-model="tab.content.id_card"
                  ></el-input>
              </el-form-item>
              <el-form-item
                label="身份证有效期"
                >
                <el-date-picker
                  v-model="tab.content.id_validity"
                  type="date"
                  value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item
                label="身份证上传"
                >
                <el-upload
                style="display:inline-block"
                  action="https://up.uploadfiles.io/upload"
                  list-type="picture-card"
                  :limit="num"
                  >
                  <i class="el-icon-plus"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                    style="line-height: 14px; margin: 0;">
                    <i class="el-icon-info">身份证正面</i>
                  </div>
                </el-upload>
                <el-upload
                  style="display:inline-block"
                  action="https://up.uploadfiles.io/upload"
                  list-type="picture-card"
                  :limit="num">
                  <i class="el-icon-plus"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                    style="line-height: 14px; margin: 0;"
                    limit="">
                    <i class="el-icon-info">身份证反面</i>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane
            v-for="tab in contractList"
            :key="tab.name"
            :name="tab.name">
            <span slot="label" class="span-with-svg">
              <svg-icon :icon-class="tab.icon"></svg-icon>
              {{tab.label}}
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="劳动合同有效期" class="full-width">
                <el-date-picker
                  v-model="tab.content.validity"
                  type="date"
                  value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item
                >
                <el-upload
                style="display:inline-block"
                  action="https://up.uploadfiles.io/upload"
                  list-type="picture-card"
                  :limit="num"
                  >
                  <i class="el-icon-plus"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                    style="line-height: 14px; margin: 0;">
                    <i class="el-icon-info">劳动合同封面</i>
                  </div>
                </el-upload>
                <el-upload
                style="display:inline-block"
                  action="https://up.uploadfiles.io/upload"
                  list-type="picture-card"
                  :limit="num">
                  <i class="el-icon-plus"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip"
                    style="line-height: 14px; margin: 0;"
                    limit="">
                    <i class="el-icon-info">劳动合同内页</i>
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-tabs type="card" class="customized denser" v-loading="loading">
          <el-tab-pane>
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="file"></svg-icon>
              修改审核操作日志
            </span>
            <div class="title">操作日志</div>
            <div class="logContainer">
              <div v-for="item in operationLog" class="logInfo">
                <span>{{item.date}} {{item.event}}</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="button_area">
          <el-button type="primary" onClick="handleSuccess">审核通过</el-button>
          <el-button type="primary" onClick="handleFailed">审核不通过</el-button>          
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getEmployeeInfo } from '@/api/business/employees'

export default {
  data() {
    return {
      activeTab: 'first',
      basicTabList: '',
      lisenceFileList: '',
      operationLog: '',
      loading: true,
      num: 1,
      contractList: ''
    }
  },
  watch: {
    '$route.query.id': 'fetchData'
  },
  // created() {
  //   this.fetchData(this.$route.query.id)
  // },
  // mounted() {
  // },
  methods: {
    fetchData(id) {
      this.loading = true
      getEmployeeInfo(id).then(res => {
        const id_validity = res.data.basic_list.certifications.id_card.validity
        this.basicTabList = [{
          label: '基本信息',
          name: 'first',
          icon: 'id-card',
          content: { ...res.data.basic_list, id_validity }
        }]
        this.contractList = [{
          label: '劳动合同',
          name: 'first',
          icon: 'id-card',
          content: res.data.basic_list.certifications.contract
        }]
        this.operationLog = res.data.basic_list.operation_log
        // lisenceFileList = res.data.data.lisences
        // operationLog = res.data.data.operations
        this.loading = false
      })
    }
  },
  computed: {
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
 .button_area {
   display: flex;
   justify-content: flex-end;
 }
</style>