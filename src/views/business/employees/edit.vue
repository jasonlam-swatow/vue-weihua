<template>
  <div class="app-container">
    <el-row>
      <el-col :md="20" :sm="24">
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane
            :key="basicTabList.name"
            :name="basicTabList.name">
            <span slot="label" class="span-with-svg">
              <svg-icon :icon-class="basicTabList.icon"></svg-icon>
              {{basicTabList.label}}
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item
                label="姓名"
                >
                <el-input
                  v-model="basicTabList.content.name"
                  ></el-input>
              </el-form-item>
              <el-form-item
                label="性别"
                >
                <el-radio-group
                  v-model="basicTabList.content.gender"
                  >
                  <el-radio label="male">男</el-radio>
                  <el-radio label="female">女</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item
                label="主要岗位"
                >
                <el-select
                  v-model="basicTabList.content.position">
                    <el-option label="驾驶员" value="driver"></el-option>
                    <el-option label="押运员" value="guard"></el-option>
                    <el-option label="驾驶员/押运员" value="both"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="联系电话"
                >
                <el-input
                  v-model="basicTabList.content.phone"
                  ></el-input>
              </el-form-item>
              <el-form-item
                label="身份证号码"
                >
                <el-input
                  v-model="basicTabList.content.idCard"
                  ></el-input>
              </el-form-item>
              <!-- <el-form-item
                label="身份证有效期"
                >
                <el-date-picker
                  v-model="tab.content.id_validity"
                  type="date"
                  value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item> -->
              <!-- <el-form-item
                label="身份证上传"
                >
                <el-upload
                  action="/v1/files/upload"
                  list-type="picture-card"
                  :limit="num"
                  :on-success="check"
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
              </el-form-item> -->
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div v-for="(tab, index) in basicTabList.content.certifications">
          <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
            <el-tab-pane
              :key="tab.title"
              name="first">
              <span slot="label" class="span-with-svg">
                <svg-icon icon-class="id-card"></svg-icon>
                {{tab.title}}
              </span>
              <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
                <el-form-item label="有效期" class="full-width">
                  <el-date-picker
                    v-model="tab.expireDate"
                    type="date"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item
                  >
                  <el-upload
                    action="/v1/files/upload"
                    list-type="picture-card"
                    :limit="num"
                    :on-success="check"
                    >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                      style="line-height: 14px; margin: 0;">
                      <i class="el-icon-info">劳动合同封面</i>
                    </div>
                  </el-upload>
                  <!-- <el-upload
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
                  </el-upload> -->
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- <el-tabs type="card" class="customized denser" v-loading="loading">
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
        </el-tabs> -->
        <div class="button_area">
          <el-button type="primary" @click="handleSuccess">审核通过</el-button>
          <!-- <el-button type="primary" @click="handleFailed">审核不通过</el-button>          -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getEmployeeInfo, createEmployee, editEmployee } from '@/api/business/employees'

export default {
  data() {
    return {
      activeTab: 'first',
      lisenceFileList: '',
      operationLog: '',
      loading: false,
      num: 1,
      basicTabList: {
        label: '基本信息',
        name: 'first',
        icon: 'id-card',
        content: {
          gender: '',
          idCard: '',
          position: '',
          phone: '',
          certifications: [{
            title: '运输许可证',
            path: '',
            expireDate: ''
          }]
        }
      }
    }
  },
  created() {
    this.fetchData(this.$route.query.id)
  },
  methods: {
    check(res) {
      console.log(res.data)
      this.basicTabList.certifications[0].path = res.deta
    },
    fetchData(id) {
      if (this.$route.query.id) {
        this.loading = true
        getEmployeeInfo(id).then(res => {
          console.log(res.data)
          this.basicTabList.content = res.data
          this.loading = false
        })
      }
    },
    handleSuccess() {
      const content = this.basicTabList.content
      console.log(content)
      if (this.$route.query.id) {
        editEmployee(this.$route.query.id, { ...this.basicTabList.content }).then(res => {})
      } else {
        console.log('1')
        createEmployee({ ...this.basicTabList.content }).then(res => {
          console.log(res)
        })
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
 .button_area {
   display: flex;
   justify-content: flex-end;
 }
</style>