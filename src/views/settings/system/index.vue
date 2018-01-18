<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col
        v-for="(setting, key) in settings"
        :key="key"
        :sm="24"
        :md="12"
        :xl="8">
        <setting-card :setting-data="setting"></setting-card>
      </el-col>
    </el-row>
    <!-- <div class="mgb24">
      <el-button
        type="primary"
        class="fr"
        :loading="submitting"
        @click="submit">保存配置</el-button>
    </div> -->
  </div>
</template>

<script>
import settingCard from './../components/settingCard'
import { getSystemSettingList } from '@/api/settings/system'
// import values from 'lodash/values'
// import flatten from 'lodash/flatten'

export default {
  data() {
    return {
      settings: {}
      // titleMap: {},
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getSystemSettingList().then(res => {
        const { list } = res.data
        this.settings = this.$_.groupBy(list, 'type')
      })
    }
  },
  components: { settingCard }
}
</script>