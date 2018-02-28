<template>
  <div class="app-container">
    <el-tabs type="card" class="customized denser mgb0">
      <el-tab-pane v-for="(item, index) in tabPaneTitles" :label="item" :key="index">
        <el-row type="flex" class="mgb12 strange-input">
          <el-col :span="20">
            <el-input style="width:200px" placeholder="企业名称" v-model="searchQueries.name"></el-input>
            <el-input style="width:200px" placeholder="信用代码" v-model="searchQueries.registrationNo"></el-input>
            <el-date-picker
              :picker-options="pickerOptions"
              v-model="searchQueries.gmtCreateBegin" type="date" size="medium" style="width:200px;height:36px" placeholder="创建开始时间"></el-date-picker>
            <el-date-picker
              :picker-options="pickerOptions"
              v-model="searchQueries.gmtCreateEnd" type="date" size="medium" style="width:200px;height:36px" placeholder="创建结束时间"></el-date-picker>
            <el-button type="primary" plain round icon="el-icon-search" @click="fetchData"></el-button>
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
          <!-- <el-table-column label="企业资质" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="onViewEnterprise(scope.row)">点击查看</el-button>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip content="查看" placement="top">
                <el-button type="text" icon="el-icon-view" @click="viewEnterprise(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
                <el-button type="text" icon="el-icon-edit-outline" @click="editEnterprise(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="text" icon="el-icon-delete"  @click="deleteEnterprise(scope.row.id)"></el-button>
              </el-tooltip>
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

    <!-- <el-dialog
      :title="tempEnterpriseInfo.name"
      width="70%" top="4vh"
      :visible.sync="dialogVisible">
      <el-form
        :model="tempEnterpriseInfo"
        class="view-form"
        label-width="120px"
        :inline="true">
        <el-form-item label="企业名称">{{tempEnterpriseInfo.name}}</el-form-item>
        <el-form-item label="统一社会信用代码">{{tempEnterpriseInfo.registrationNo}}</el-form-item>
        <el-form-item label="状态">
          {{$_.find(statusTypes, ['code', tempEnterpriseInfo.enterpriseType]) &&
            $_.find(statusTypes, ['code', tempEnterpriseInfo.enterpriseType]).value}}
        </el-form-item>
        <el-form-item label="公司类型">
          {{$_.find(enterpriseTypes, ['code', tempEnterpriseInfo.status]) &&
            $_.find(enterpriseTypes, ['code', tempEnterpriseInfo.status]).value}}
        </el-form-item>
        <el-form-item label="成立日期">{{tempEnterpriseInfo.fundationDate/1000 | moment('YYYY/MM/DD')}}</el-form-item>
        <el-form-item label="法定代表人">{{tempEnterpriseInfo.legalPerson}}</el-form-item>
        <el-form-item label="注册资本">{{tempEnterpriseInfo.registeredCapital}}</el-form-item>
        <el-form-item label="注册地">{{tempEnterpriseInfo.registrationAuthority}}</el-form-item>
        <el-form-item label="经营状态">
          {{$_.find(enterpriseStatusTypes, ['code', tempEnterpriseInfo.registrationStatus]) &&
            $_.find(enterpriseStatusTypes, ['code', tempEnterpriseInfo.registrationStatus]).value}}
        </el-form-item>
        <el-form-item label="操作范围">{{tempEnterpriseInfo.operationScope}}</el-form-item>
        <el-form-item label="企业业务类型">
          {{$_.find(businessTypes, ['code', tempEnterpriseInfo.businessType]) &&
            $_.find(businessTypes, ['code', tempEnterpriseInfo.businessType]).value}}
        </el-form-item>
        <el-form-item label="紧急联系人">{{tempEnterpriseInfo.contactName}}</el-form-item>
        <el-form-item label="企业地址">{{tempEnterpriseInfo.address}}</el-form-item>
        <el-form-item label="紧急联系电话">{{tempEnterpriseInfo.contactMobile}}</el-form-item>
        <el-form-item label="经营类型">
          <div style="max-height: 280px; overflow: scroll; border: 1px solid #eee; padding-top: 12px;">
            <el-tree
              :data="tempVehicleBusinessTypes"></el-tree>
          </div>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempEnterpriseInfo.certifications, ['title', '企业营业执照'])"
          label="企业营业执照"
          class="full-width">
          <figure v-if="$_.find(tempEnterpriseInfo.certifications, { title: '企业营业执照', type: 'A' })">
            <img :src="$_.find(tempEnterpriseInfo.certifications, { title: '企业营业执照', type: 'A' }).path">
            <figcaption>企业营业执照</figcaption>
          </figure>
          <figure v-if="$_.find(tempEnterpriseInfo.certifications, { title: '企业营业执照', type: 'B' })">
            <img :src="$_.find(tempEnterpriseInfo.certifications, { title: '企业营业执照', type: 'B' }).path">
            <figcaption>企业组织机构代码证</figcaption>
          </figure>
          <figure v-if="$_.find(tempEnterpriseInfo.certifications, { title: '企业营业执照', type: 'C' })">
            <img :src="$_.find(tempEnterpriseInfo.certifications, { title: '企业营业执照', type: 'C' }).path">
            <figcaption>企业税务登记证</figcaption>
          </figure>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempEnterpriseInfo.certifications, ['title', '企业道路运输经营许可证'])"
          label="企业道路运输经营许可证"
          class="full-width">
          <figure v-if="$_.find(tempEnterpriseInfo.certifications, { title: '企业道路运输经营许可证', type: 'A' })">
            <img :src="$_.find(tempEnterpriseInfo.certifications, { title: '企业道路运输经营许可证', type: 'A' }).path">
            <figcaption>企业道路运输经营许可证</figcaption>
          </figure>
          <h5 class="sub-title">
            <span>有效期: {{($_.find(tempEnterpriseInfo.certifications, { title: '企业道路运输经营许可证', type: 'A' }).expireDate)/1000 | moment('YYYY/MM/DD')}}</span>
          </h5>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempEnterpriseInfo.certifications, ['title', '企业安全责任承诺书'])"
          label="企业安全责任承诺书"
          class="full-width">
          <figure v-if="$_.find(tempEnterpriseInfo.certifications, { title: '企业安全责任承诺书', type: 'A' })">
            <img :src="$_.find(tempEnterpriseInfo.certifications, { title: '企业安全责任承诺书', type: 'A' }).path">
            <figcaption>企业安全责任承诺书</figcaption>
          </figure>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="tempEnterpriseInfo.status === 'PENDING'">
        <el-button
          type="success"
          @click="reviewEnterprise(tempEnterpriseInfo.id, true)">审核通过</el-button>
        <el-button
          type="danger"
          @click="reviewEnterprise(tempEnterpriseInfo.id, false)">审核不通过</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  getEnterpriseList,
  // getEnterpriseInfo,
  reviewEnterprise,
  deleteEnterprise
} from '@/api/business/enterprises'
import datepickerOptions from '@/mixins/_datepickerOptions'

// import reduce from 'lodash/reduce'
import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'

export default {
  mixins: [datepickerOptions],
  data() {
    return {
      // dialogVisible: false,
      tempEnterpriseInfo: {},
      tempVehicleBusinessTypes: [],
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
  computed: {
    ...mapGetters([
      'statusTypes',
      'enterpriseStatusTypes',
      'businessTypes',
      'enterpriseTypes',
      'vehicleBusinessTypes'
    ])
  },
  methods: {
    addEnterprise() {
      this.$router.push('/business/enterprises/add')
    },
    editEnterprise(id) {
      this.$router.push({ path: '/business/info/edit', query: { id }})
    },
    viewEnterprise(id) {
      // this.dialogVisible = true
      // getEnterpriseInfo(id).then(res => {
      //   this.tempEnterpriseInfo = res.data
      //   // this.tempVehicleBusinessTypes = this.$_.map(this.vehicleBusinessTypes, item => {
      //   //   item.children = this.$_.filter(item.children, c => this.tempEnterpriseInfo.businessTerm.includes(String(c.id)))
      //   //   return item
      //   // })
      //   const matcher = (collection, selected) => reduce(collection, (result, item) => {
      //     if (selected.includes(item.id)) {
      //       result.push({ id: item.id, children: matcher(item.children, selected) })
      //     }
      //     return result
      //   }, [])
      //   this.tempVehicleBusinessTypes = matcher(this.vehicleBusinessTypes, this.tempEnterpriseInfo.businessTerm)
      // })
      this.$router.push({ path: '/business/info', query: { view: true, id }})
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
    },
    reviewEnterprise(id, passedOrNot) {
      if (passedOrNot) {
        this.$confirm('确定审核通过此企业？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reviewEnterprise(id, { status: 'AUDITED' }).then(res => {
            this.$message.success('已审核通过！')
            this.dialogVisible = false
            this.fetchData()
          })
        })
      } else {
        this.$prompt('请表明审核不通过理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(({ value }) => {
          reviewEnterprise(id, { status: 'UNAUDITED', comment: value }).then(res => {
            this.$message.info('已审核不通过！')
            this.dialogVisible = false
            this.fetchData()
          })
        })
      }
    }
  }
}
</script>