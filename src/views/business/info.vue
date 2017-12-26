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

        <business-info :business-info="businessInfo" :loading="dataLoading"></business-info>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getInfo } from '@/api/business/info'
import businessInfo from '@/components/businessInfo'

export default {
  data() {
    return {
      dataLoading: true,
      businessInfo: []
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.dataLoading = true
      getInfo().then(response => {
        this.businessInfo = response.data.list
        this.dataLoading = false
      })
    }
  },

  components: { businessInfo }
}
</script>