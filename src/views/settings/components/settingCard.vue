<template>
  <el-card class="box-card mgb12" style="min-height: 408px" v-loading="loading">
    <div slot="header" class="clearfix">
       <span class="span-with-svg"><!--<svg-icon :icon-class="iconMap[title]"></svg-icon> --> {{settingData.title}}</span>
    </div>
    <div>
      <el-form label-width="240px" label-position="left" class="strange-input">
        <el-form-item
          v-for="item in settingData"
          :key="item.id"
          :label="item.title">
            <el-input-number
              v-model="item.value"
              controls-position="right"
              :min="1"
              :debounce="800"
              @change="onChange(item)"></el-input-number>
            <span class="validity-append">天</span>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { saveSystemSettings } from '@/api/settings/system'
export default {
  name: 'settingCard',

  props: {
    settingData: Array
  },

  data() {
    return {
      iconMap: {},
      loading: false
    }
  },

  methods: {
    onChange(item) {
      this.loading = true
      saveSystemSettings(item, item.id).then(res => {
        this.loading = false
        this.$message.success('已修改！')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/variables.scss';
  .validity-append {
    position: absolute;
    left: 88px;
    color: map-get($palette, primary);
  }
</style>