<template>
  <div class="app-container">
    <el-tabs type="card" class="customized denser mgb0">
      <el-tab-pane v-for="(item, index) in tabPaneTitles" :label="item" :key="index">
        <el-row type="flex" class="mgb12 strange-input">
          <el-col :span="20">
            <el-input style="width:200px" placeholder="企业名称" v-model="searchQueries.name"></el-input>
            <el-input style="width:200px" placeholder="信用代码" v-model="searchQueries.registrationNo"></el-input>
            <el-date-picker v-model="searchQueries.gmtCreateBegin" type="date" size="medium" style="width:200px;height:36px" placeholder="创建开始时间"></el-date-picker>
            <el-date-picker v-model="searchQueries.gmtCreateEnd" type="date" size="medium" style="width:200px;height:36px" placeholder="创建结束时间"></el-date-picker>
            <el-button type="primary" plain round icon="el-icon-search" @click="onSearch"></el-button>
          </el-col>
          <el-col :span="4" class="fr">
            <div class="fr">
              <el-button size="medium" icon="el-icon-plus" type="primary" @click="addEnterprise">新增企业</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="enterpriseList" border>
          <el-table-column prop="name" label="企业名称"></el-table-column>
          <el-table-column prop="registrationNo" label="统一社会信用代码" width="140"></el-table-column>
          <el-table-column prop="licenseNo" label="相关运单"></el-table-column>
          <el-table-column prop="address" label="企业注册地址"></el-table-column>
          <el-table-column prop="contactName" label="紧急联系人" width="120"></el-table-column>
          <el-table-column prop="contactMobile" label="联系电话" width="180"></el-table-column>
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
import {
  getEnterpriseList,
  deleteEnterprise
} from '@/api/business/enterprises'

import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'

export default {
  data() {
    return {
      vehicleList: [],
      loading: true,
      currentPage: 1,
      total: 0,
      tabPaneTitles: ['全部企业'],
      enterpriseList: [],
      searchQueries: {
        gmtCreateBegin: '',
        gmtCreateEnd: '',
        name: '',
        registrationNo: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSearch() {
      this.fetchData()
    },
    addEnterprise() {
      this.$router.push('/business/enterprises/add')
    },
    onViewEnterprise(info) {
      console.log(info)
    },
    deleteEnterprise(id) {
      this.$confirm('此操作将永久删除该企业，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEnterprise(id).then(() => {
          this.$message.success('已删除企业！')
          this.fetchData(this.currentPage)
        })
      })
    },
    fetchData(pageNum = 1) {
      this.loading = true
      this.currentPage = pageNum
      const queries = {
        pageNum,
        pageSize: 10,
        ...omitBy(this.searchQueries, isEmpty)
      }
      getEnterpriseList(queries).then(res => {
        console.log(res)
        this.enterpriseList = res.data.list
        this.total = res.data.total
        this.loading = false
      })
    }
  }
}
</script>