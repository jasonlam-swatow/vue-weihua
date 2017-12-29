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
                  class="fr"
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
                  class="fr"
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
                <!-- <el-select
                  v-model="item.value">
                    <el-option label="驾驶员" value="驾驶员"></el-option>
                    <el-option label="押运员" value="押运员"></el-option>
                    <el-option label="驾驶员/押运员" value="驾驶员/押运员"></el-option>
                </el-select>
                <el-date-picker
                  v-else-if="'id_validity' === key"
                  v-model="item.value"
                  type="date"
                  value-format="yyyy-MM-dd"></el-date-picker>
                <el-input
                  v-else-if="['name', 'id_card', 'tel'].includes(key)"
                  v-model="tab.content.item"
                  ></el-input>
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
                  v-model="item.value"></el-input> -->
              
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- <div v-for="(cer, key) in certifications" :key="key">
          <el-tabs v-model="activeTab" type="card"  v-loading="loading">
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
        </div> -->
        <el-tabs type="card" class="customized denser" v-loading="loading">
          <el-tab-pane>
          </el-tab-pane>
        </el-tabs>
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
      num: 1
    }
  },

  created() {
    this.fetchData(this.$route.query.userId)
  },
  mounted() {
  },
  methods: {
    fetchData(id) {
      this.loading = true
      getEmployeeInfo(id).then(res => {
        let id_validity = res.data.basic_list.certifications.id_card.validity
        this.basicTabList = [{
        label: '基本信息',
        name: 'first',
        icon: 'id-card',
        content: {...res.data.basic_list, id_validity}
      }]
        // lisenceFileList = res.data.data.lisences
        // operationLog = res.data.data.operations
        this.loading = false
      })
    },
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>