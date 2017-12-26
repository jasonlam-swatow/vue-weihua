<template>
  <div class="app-container">
    <el-row>
      <el-col :md="20" :sm="24">
        <div class="button-area">
          <el-button round icon="el-icon-edit" @click="onEditBusiness">修改企业信息</el-button>
          <el-button round icon="el-icon-edit">仅修改紧急联系人信息</el-button>
        </div>

        <business-info :business-info="businessInfo" :loading="dataLoading"></business-info>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { getInfo } from '@/api/business/info'
import businessInfo from '@/components/businessInfo'

export default {
  data() {
    return {
      dataLoading: true,
      companyName: '',
      businessInfo: null
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.dataLoading = true
      this.$store.dispatch('GetBusinessInfo').then(res => {
        this.companyName = res.data.name
        this.businessInfo = res.data.info
        this.dataLoading = false
      })
    },

    onEditBusiness() {
      this.$confirm('修改后需要重新审核，确定需要修改吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '放弃修改',
        type: 'warning'
      }).then(() => {
        this.$router.push({ path: '/business/info/edit' })
      }).catch(() => {
        this.$message.info('已放弃修改')
      })
    }
  },

  components: { businessInfo }
}
</script>