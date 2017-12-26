<template>
  <el-card class="box-card mgb12" style="min-height: 408px">
    <div slot="header" class="clearfix card-header-with-svg">
      <svg-icon :icon-class="iconMap[title]"></svg-icon> <span>{{title}}</span>
    </div>
    <div>
      <el-form label-width="240px" label-position="left">
        <el-form-item
          v-for="(item, key) in lisenceForm"
          :key="key"
          :label="item.name">
            <el-input-number
              v-model="item.value"
              controls-position="right"
              @change="onChangeValidity(item)"
              :min="1"></el-input-number>
            <span class="validity-append">天</span>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { getLisence } from '@/api/settings/system'

export default {
  name: 'settingCard',

  props: {
    title: String
  },

  data() {
    return {
      iconMap: {
        '企业证照': 'enterprise',
        '员工证照': 'group',
        '车辆证照': 'vehicle',
        '罐体证照': 'tank'
      },
      lisenceForm: null
    }
  },

  created() {
    this.fetchData(this.title)
  },

  methods: {
    fetchData(lisenceType) {
      getLisence(lisenceType).then(res => this.lisenceForm = res.data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .validity-append {
    position: absolute;
    right: 136px;
  }
</style>