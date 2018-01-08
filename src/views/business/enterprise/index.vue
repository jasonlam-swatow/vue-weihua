<template>
  <div class="app-container">
    <el-tabs type="card" class="customized denser mgb0">
      <el-tab-pane v-for="(item, index) in tabPaneTitles" :label="item" :key="index">
        <el-row type="flex" class="mgb12">
          <el-col :span="16">
            <el-input size="medium" style="width:200px" placeholder="企业名称/信用代码">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-table :data="enterprisesList" border>
          <el-table-column prop="name" label="企业名称" width="100"></el-table-column>
          <el-table-column prop="plateType" label="统一社会信用代码" width="80"></el-table-column>
          <el-table-column prop="licenseNo" label="相关运单"></el-table-column>
          <el-table-column prop="registrationAuthority" label="企业注册地址"></el-table-column>
          <el-table-column prop="contactName" label="紧急联系人"></el-table-column>
          <el-table-column prop="contactMobile" label="联系电话"></el-table-column>
          <el-table-column  label="查看企业资质">
            <template>
              <el-button type="text" @click="onViewEnterprise(scope.row)">点击查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane> 
    </el-tabs>
    <div class="fr" style="margin-top:12px">
    <el-pagination
      @current-change="fetchData"
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
import { getEnterpriseInfo } from '@/api/business/enterprise'

export default {
  data() {
    return {
      vehicleList: [],
      currentPage: 1,
      total: 0,
      loading: true,
      tabPaneTitles: ['全部企业'],
      enterprisesList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onViewEnterprise(info) {
      console.log(info)
    },
    onPaginate(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.fetchData()
    },
    fetchData(page = 1) {
      this.loading = true
      this.currentPage = page
      getEnterpriseInfo(page).then(res => {
        console.log(res)
        this.enterprisesList = res.data.list
        this.loading = false
        this.total = res.data.list.length
      })
    }
  }
}
</script>