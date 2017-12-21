<template>
  <div class="app-container">
    <el-row>
      <el-col :md="20" :sm="24">
        <div class="button-area">
          <el-button round icon="el-icon-edit">
            <router-link to="/business/info/edit">修改企业信息</router-link>
          </el-button>
          <el-button round icon="el-icon-edit">仅修改紧急联系人信息</el-button>
        </div>
        <el-tabs v-model="activeTab" type="card" v-loading.body="dataLoading">
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
                v-for="(item, key) in tabList[0].content"
                :key="key"
                :label="item.label"
                :class="{ 'full-width': ['business_range', 'license_src'].includes(key) }">
                <div v-if="key === 'license_src'">
                  <img :src="item.value">
                </div>
                <div v-else>{{item.value}}</div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getInfo } from '@/api/business/info'

export default {
  data() {
    return {
      dataLoading: true,
      activeTab: 'first',
      tabList: [{
        label: '基本信息',
        name: 'first',
        content: null
      }]
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.dataLoading = true
      getInfo().then(response => {
        this.tabList[0].content = response.data
        this.dataLoading = false
      })
    }
  }
}
</script>