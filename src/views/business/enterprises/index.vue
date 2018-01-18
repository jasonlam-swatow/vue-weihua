<template>
  <div class="app-container">
    <el-tabs type="card" class="customized denser mgb0">
      <el-tab-pane v-for="(item, index) in tabPaneTitles" :label="item" :key="index">
        <el-row type="flex" class="mgb12 strange-input">
          <el-col :span="20">
            <el-input  style="width:200px" placeholder="企业名称" v-model="name"></el-input>
            <el-input  style="width:200px" placeholder="信用代码" v-model="registrationNo"></el-input>
            <el-date-picker v-model="gmtCreateBegin" type="date" size="medium" style="width:200px;height:36px" placeholder="创建开始时间"></el-date-picker>
            <el-date-picker v-model="gmtCreateEnd" type="date" size="medium" style="width:200px;height:36px" placeholder="创建结束时间"></el-date-picker>
            <el-button  type="primary" plain round icon="el-icon-search" @click="onSearch"></el-button>
          </el-col>
        </el-row>
        <el-table :data="enterprisesList" border>
          <el-table-column prop="name" label="企业名称"></el-table-column>
          <el-table-column prop="plateType" label="统一社会信用代码" width="140"></el-table-column>
          <el-table-column prop="licenseNo" label="相关运单"></el-table-column>
          <el-table-column prop="registrationAuthority" label="企业注册地址"></el-table-column>
          <el-table-column prop="contactName" label="紧急联系人"></el-table-column>
          <el-table-column prop="contactMobile" label="联系电话"></el-table-column>
          <el-table-column  label="企业资质" width="100">
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
      gmtCreateBegin: '',
      gmtCreateEnd: '',
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
    onSearch() {
      this.fetchData()
    },
    onViewEnterprise(info) {
      console.log(info)
    },
    onPaginate(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.fetchData()
    },
    fetchData(pageNum = 1) {
      const pageSize = 10
      const name = this.name
      const gmtCreateBegin = this.gmtCreateBegin
      const gmtCreateEnd = this.gmtCreateEnd
      this.loading = true
      this.currentPage = pageNum
      getEnterpriseInfo({ pageNum, name, gmtCreateBegin, gmtCreateEnd, pageSize }).then(res => {
        console.log(res)
        this.enterprisesList = res.data.list
        this.loading = false
        this.total = res.data.list.length
      })
    }
  }
}
</script>