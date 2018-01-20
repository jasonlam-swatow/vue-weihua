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

        <!-- 上传身分证 -->
        <el-tabs v-model="activeTab" type="card" class="customized denser" v-loading="loading">
          <el-tab-pane name="first">
            <span slot="label" class="span-with-svg">
              <svg-icon icon-class="id-card"></svg-icon>
              车辆道路运输证
            </span>
            <el-form :inline="true" label-width="130px" class="prevent-uneven strange-input">
              <el-form-item label="有效期" class="full-width">
                <el-date-picker
                  v-model="tabData.content.certifications.find(_ => _.title === '身分证' && _.type === 'A').expireDate"
                  type="date"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item label="上传身分证" class="full-width">
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUploadIdA">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '身分证' && _.type === 'A').path"
                    :src="tabData.content.certifications.find(_ => _.title === '身分证' && _.type === 'A').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>正面</p>
                  </div>
                </el-upload>
                <el-upload
                  action="/v1/files/upload"
                  class="license-uploader"
                  :on-success="onUploadIdB">
                  <img
                    v-if="tabData.content.certifications.find(_ => _.title === '身分证' && _.type === 'B').path"
                    :src="tabData.content.certifications.find(_ => _.title === '身分证' && _.type === 'B').path"
                    class="license">
                  <i v-else class="el-icon-plus license-uploader-icon"></i>
                  <div
                    slot="tip"
                    class="el-upload__tip">
                    <p>反面</p>
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
          certifications: [{}]
        }
      }
    }
  },
  computed: {
    ...mapGetters(['vehicleTypes']),
    isAdd() {
      return this.$route.path.indexOf('add') >= 0
    }
  },
  created() {
    if (!this.isAdd) this.fetchData()
  },
  methods: {
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
