<template>
  <div class="app-container">
    <el-row>
      <el-col :md="20" :sm="24">
        <el-alert
          title="你正在修改企业信息，保存后将会更新内容并等待重新审核"
          type="warning"
          show-icon
          class="mgb12"></el-alert>
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane
            v-for="tab in basicTabList"
            :key="tab.name"
            :label="tab.label"
            :name="tab.name">
            <el-form :inline="true" label-width="130px">
              <el-form-item
                v-for="(item, key) in tab.content"
                :key="key"
                :label="item.label">
                <el-select
                  v-if="['status', 'company_type', 'business_type'].includes(key)"
                  v-model="item.value">
                  <template v-if="key === 'status'">
                    <el-option label="存续" value="存续"></el-option>
                    <el-option label="注销" value="注销"></el-option>
                    <el-option label="迁出" value="迁出"></el-option>
                  </template>
                  <template v-else-if="key === 'company_type'">
                    <el-option label="一人有限责任公司（自然人投资）" value="一人有限责任公司（自然人投资）"></el-option>
                    <el-option label="有限公司" value="有限公司"></el-option>
                  </template>
                  <template v-else="key === 'business_type'">
                    <el-option label="运输企业" value="运输企业"></el-option>
                    <el-option label="仓储企业" value="仓储企业"></el-option>
                    <el-option label="生产企业" value="生产企业"></el-option>
                  </template>
                </el-select>
                <el-date-picker
                  v-else-if="['found_date', 'end_date'].includes(key)"
                  v-model="item.value"
                  type="date"
                  value-format="yyyy-MM-dd"></el-date-picker>
                <el-input
                  v-else
                  v-model="item.value"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'first'
    }
  },

  created() {
    if (this.$store.getters.businessInfo === null) {
      this.$store.dispatch('GetBusinessInfo')
    }
  },

  computed: {
    basicTabList() {
      const { info } = this.$store.getters.businessInfo
      return [{
        label: '基本信息',
        name: 'first',
        content: info
      }]
    }
  }
}
</script>