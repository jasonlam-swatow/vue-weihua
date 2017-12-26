<template>
  <el-tabs v-model="activeTab" type="card" v-loading.body="loading">
    <el-tab-pane
      v-for="tab in tabList"
      :key="tab.name"
      :label="tab.label"
      :name="tab.name">
      <el-form
        :inline="true"
        class="readonly-form"
        label-width="130px">
        <el-form-item
          v-for="(item, index) in tabList[0].content"
          :key="index"
          :label="item.label"
          :class="{ 'full-width': ['营业执照经营范围', '上传企业营业执照'].includes(item.label) }">
          <div v-if="item.label === '上传企业营业执照'">
            <img :src="item.value">
          </div>
          <div v-else>{{item.value}}</div>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    businessInfo: Array
  },
  data() {
    return {
      activeTab: 'first',
      tabList: [{
        label: '基本信息',
        name: 'first',
        content: null
      }]
    }
  },
  watch: {
    businessInfo(val) {
      console.log(val)
      this.tabList[0].content = val
    }
  }
}
</script>