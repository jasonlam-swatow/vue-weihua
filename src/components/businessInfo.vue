<template>
  <el-tabs v-model="activeTab" type="card" v-loading.body="loading">
    <el-tab-pane
      v-for="tab in tabList"
      :key="tab.name"
      :label="tab.label"
      :name="tab.name">
      <span slot="label" class="span-with-svg"><svg-icon :icon-class="tab.icon"></svg-icon>{{tab.label}}</span>
      <el-form
        :inline="true"
        class="readonly-form"
        label-width="130px">
        <el-form-item
          v-for="(item, key) in tabList[0].content"
          :key="key"
          :label="item.label"
          :class="[{ 'full-width': ['business_range', 'lisence'].includes(key) },
                   { 'with-control': ['business_range', 'lisence'].includes(key) }]">
          <div v-if="key === 'lisence'">
            <img v-for="file in item.value" :src="file.url">
          </div>
          <div v-else>{{item.value}}</div>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'businessInfo',
  props: {
    loading: Boolean,
    businessInfo: Object
  },
  data() {
    return {
      activeTab: 'first'
    }
  },
  computed: {
    tabList() {
      return [{
        label: '基本信息',
        icon: 'id-card',
        name: 'first',
        content: this.businessInfo
      }]
    }
  }
}
</script>