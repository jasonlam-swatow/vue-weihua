<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col
        v-for="title in titles"
        :key="title"
        :sm="24"
        :md="12"
        :xl="8">
        <setting-card :title="title"></setting-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import settingCard from './../components/settingCard'

export default {
  data() {
    return {
      titles: [
        '企业证照',
        '员工证照',
        '车辆证照',
        '罐体证照'
      ]
    }
  },

  components: { settingCard }
}
</script>