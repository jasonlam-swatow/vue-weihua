<template>
  <div class="app-container">
    <el-tabs
      type="card"
      class="customized denser mgb0"
      @tab-click="onTabChange">
      <el-tab-pane
        v-for="(value, key) in tabPanes"
        :label="key"
        :key="value">
        <el-row type="flex" class="mgb12 strange-input">
          <el-col :span="18">
            <el-select placeholder="按证照状态筛选" v-model="searchQueries.status" clearable>
              <el-option
                v-for="status in statusTypes"
                :key="status.code"
                :label="status.value"
                :value="status.code">
              </el-option>
            </el-select>
            <el-select placeholder="主要岗位" v-model="searchQueries.position" clearable>
              <el-option
                v-for="position in positionTypes"
                :key="position.code"
                :label="position.value"
                :value="position.code">
              </el-option>
            </el-select>
            <el-input style="width:200px" placeholder="姓名" v-model="searchQueries.idOrName" @keyup.enter.native="onSearch"></el-input>
            <el-button size="medium" type="primary" plain round icon="el-icon-search" @click="onSearch"></el-button>
          </el-col>
          <el-col :span="6" class="fr">
            <div class="fr">
              <el-button size="medium" icon="el-icon-plus" type="primary" @click="addEmployee">新增员工</el-button>
              <!-- <el-button size="medium" icon="el-icon-upload2">批量导入</el-button>
              <el-button type="text" icon="el-icon-document">下载模板</el-button> -->
            </div>
          </el-col>
        </el-row>
        <el-table :data="employeeList" border stripe v-loading="loading">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column label="性别" width="80">
            <template slot-scope="scope">
              {{$_.find(genderTypes, ['code', scope.row.gender]) &&
                $_.find(genderTypes, ['code', scope.row.gender]).value}}
            </template>
          </el-table-column>
          <el-table-column prop="idCard" label="身份证"></el-table-column>
          <el-table-column label="主要岗位">
            <template slot-scope="scope">
              {{$_.find(positionTypes, ['code', scope.row.position]) &&
                $_.find(positionTypes, ['code', scope.row.position]).value}}
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column label="入职日期">
            <template slot-scope="scope">
              <span>{{scope.row.entryDate/1000 | moment('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" width="100">
            <template slot-scope="scope">
              {{$_.find(statusTypes, ['code', scope.row.status]) &&
                $_.find(statusTypes, ['code', scope.row.status]).value}}
            </template>
          </el-table-column>
          <el-table-column label="证件展示" width="200">
            <template slot-scope="scope">
              <el-tooltip placement="right" effect="light">
                <div
                  slot="content"
                  class="text-success"
                  style="font-size: 14px">
                  <p
                    v-for="(cert, key) in flattenCertifications(getCertificationMaps(scope.row.certifications, certificationMap))"
                    :key="key"
                    :class="{ 'text-warning': cert.status === 'WILL_ABNORMAL', 'text-danger': cert.status === 'ABNORMAL', }">
                    <b>{{cert.title}}</b>：
                    <span v-if="cert.status ==='NORMAL'">未过期</span>
                    <span v-else-if="cert.status ==='WILL_ABNORMAL'">将过期</span>
                    <span v-else-if="cert.status ==='ABNORMAL'">已过期</span>
                  </p>
                </div>
                <div>
                  <el-tag
                    v-for="(cert, key) in shortenCertifications(getCertificationMaps(scope.row.certifications, certificationMap))"
                    :key="key"
                    size="small" type="success" class="adjacent">{{key}}</el-tag>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="证件有效期状态" width="100">
            <template slot-scope="scope">
              {{checkValidity(scope.row.certifications)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="120">
            <template slot-scope="scope">
              <el-tooltip content="查看" placement="top">
                <el-button type="text" icon="el-icon-view" @click="viewEmployee(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
                <el-button type="text" icon="el-icon-edit-outline" @click="editEmployee(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="text" icon="el-icon-delete"  @click="deleteEmployee(scope.row.id)"></el-button>
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

    <el-dialog
      :title="tempEmployeeInfo.name"
      width="70%" top="4vh"
      :visible.sync="dialogVisible">
      <img
        v-if="tempEmployeeInfo.status === 'AUDITED'"
        :src="stamp_pic"
        class="approved-stamp">
      <el-form
        :model="tempEmployeeInfo"
        class="view-form"
        label-width="100px"
        :inline="true">
        <el-form-item label="姓名">{{tempEmployeeInfo.name}}</el-form-item>
        <el-form-item label="性别">
          {{$_.find(genderTypes, ['code', tempEmployeeInfo.gender]) &&
            $_.find(genderTypes, ['code', tempEmployeeInfo.gender]).value}}
        </el-form-item>
        <el-form-item label="主要岗位">
          {{$_.find(positionTypes, ['code', tempEmployeeInfo.position]) &&
            $_.find(positionTypes, ['code', tempEmployeeInfo.position]).value}}
        </el-form-item>
        <el-form-item label="入职时间">{{tempEmployeeInfo.entryDate/1000 | moment('YYYY-MM-DD')}}</el-form-item>
        <el-form-item label="联系电话">{{tempEmployeeInfo.phone}}</el-form-item>
        <el-form-item label="身份证号码">{{tempEmployeeInfo.idCard}}</el-form-item>
        <el-form-item label="审核状态">
          {{$_.find(statusTypes, ['code', tempEmployeeInfo.status]) &&
            $_.find(statusTypes, ['code', tempEmployeeInfo.status]).value}}
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempEmployeeInfo.certifications, ['title', '身份证'])"
          label="身份证"
          class="full-width">
          <figure v-if="$_.find(tempEmployeeInfo.certifications, { title: '身份证', type: 'A' })">
            <img :src="$_.find(tempEmployeeInfo.certifications, { title: '身份证', type: 'A' }).path">
            <figcaption>正面</figcaption>
          </figure>
          <figure v-if="$_.find(tempEmployeeInfo.certifications, { title: '身份证', type: 'B' })">
            <img :src="$_.find(tempEmployeeInfo.certifications, { title: '身份证', type: 'B' }).path">
            <figcaption>反面</figcaption>
          </figure>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempEmployeeInfo.certifications, ['title', '劳动合同'])"
          label="劳动合同"
          class="full-width">
          <figure v-if="$_.find(tempEmployeeInfo.certifications, { title: '劳动合同', type: 'A' })">
            <img :src="$_.find(tempEmployeeInfo.certifications, { title: '劳动合同', type: 'A' }).path">
            <figcaption>封面（含甲乙方名称）</figcaption>
          </figure>
          <figure v-if="$_.find(tempEmployeeInfo.certifications, { title: '劳动合同', type: 'B' })">
            <img :src="$_.find(tempEmployeeInfo.certifications, { title: '劳动合同', type: 'B' }).path">
            <figcaption>内页（含劳动合约时间页）</figcaption>
          </figure>
          <figure v-if="$_.find(tempEmployeeInfo.certifications, { title: '劳动合同', type: 'C' })">
            <img :src="$_.find(tempEmployeeInfo.certifications, { title: '劳动合同', type: 'C' }).path">
            <figcaption>内页（含甲乙方签字）</figcaption>
          </figure>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempEmployeeInfo.certifications, ['title', '驾驶证'])"
          label="驾驶证"
          class="full-width">
          <figure v-if="$_.find(tempEmployeeInfo.certifications, { title: '驾驶证', type: 'A' })">
            <img :src="$_.find(tempEmployeeInfo.certifications, { title: '驾驶证', type: 'A' }).path">
            <figcaption>正本正面</figcaption>
          </figure>
          <figure v-if="$_.find(tempEmployeeInfo.certifications, { title: '驾驶证', type: 'B' })">
            <img :src="$_.find(tempEmployeeInfo.certifications, { title: '驾驶证', type: 'B' }).path">
            <figcaption>正本反面</figcaption>
          </figure>
          <figure v-if="$_.find(tempEmployeeInfo.certifications, { title: '驾驶证', type: 'C' })">
            <img :src="$_.find(tempEmployeeInfo.certifications, { title: '驾驶证', type: 'C' }).path">
            <figcaption>副本正面</figcaption>
          </figure>
          <figure v-if="$_.find(tempEmployeeInfo.certifications, { title: '驾驶证', type: 'D' })">
            <img :src="$_.find(tempEmployeeInfo.certifications, { title: '驾驶证', type: 'D' }).path">
            <figcaption>副本反面</figcaption>
          </figure>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempEmployeeInfo.certifications, ['title', '驾驶员从业资格证'])"
          label="驾驶员从业资格证"
          class="full-width wider-label-140">
          <figure v-if="$_.find(tempEmployeeInfo.certifications, ['title', '驾驶员从业资格证'])">
            <img :src="$_.find(tempEmployeeInfo.certifications, ['title', '驾驶员从业资格证']).path">
            <figcaption>基本信息页</figcaption>
          </figure>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempEmployeeInfo.certifications, ['title', '押运员从业资格证'])"
          label="押运员从业资格证"
          class="full-width wider-label-140">
          <figure v-if="$_.find(tempEmployeeInfo.certifications, ['title', '押运员从业资格证'])">
            <img :src="$_.find(tempEmployeeInfo.certifications, ['title', '押运员从业资格证']).path">
            <figcaption>基本信息页</figcaption>
          </figure>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempEmployeeInfo.certifications, ['title', '安全责任状'])"
          label="安全责任状"
          class="full-width">
          <figure v-if="$_.find(tempEmployeeInfo.certifications, { title: '安全责任状', type: 'A' })">
            <img :src="$_.find(tempEmployeeInfo.certifications, { title: '安全责任状', type: 'A' }).path">
            <figcaption>含甲乙方名称页</figcaption>
          </figure>
          <figure v-if="$_.find(tempEmployeeInfo.certifications, { title: '安全责任状', type: 'B' })">
            <img :src="$_.find(tempEmployeeInfo.certifications, { title: '安全责任状', type: 'B' }).path">
            <figcaption>含甲乙方签章页</figcaption>
          </figure>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="tempEmployeeInfo.status !== 'AUDITED'">
        <el-button
          type="success"
          @click="reviewEmployee(tempEmployeeInfo.id, true)">审核通过</el-button>
        <el-button
          type="danger"
          @click="reviewEmployee(tempEmployeeInfo.id, false)">审核不通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  getEmployeeList,
  getEmployeeInfo,
  reviewEmployee,
  deleteEmployee
} from '@/api/business/employees'
import mappingCertifications from '@/mixins/_mappingCertifications'

import stamp_pic from '@/assets/stamp.png'

import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'

export default {
  mixins: [mappingCertifications],
  data() {
    return {
      stamp_pic,
      loading: true,
      employeeList: [],
      currentPage: 1,
      total: 0,
      searchQueries: {
        status: '',
        position: '',
        idOrName: ''
      },
      certificationMap: {
        '基': ['身份证', '驾驶证'],
        '劳': ['劳动合同'],
        '驾': ['驾驶员从业资格证'],
        '押': ['押运员从业资格证'],
        '安': ['安全责任状']
      },
      tabPanes: {
        '全部员工': '',
        '待审核': 'PENDING',
        '审核未通过': 'UNAUDITED'
      },
      dialogVisible: false,
      tempEmployeeInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'statusTypes',
      'positionTypes',
      'genderTypes',
      'certificationStatusTypes'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSearch() {
      this.fetchData()
    },
    _resetSearch() {
      this.searchQueries = {
        status: '',
        position: '',
        idOrName: ''
      }
    },
    onTabChange({ label }) {
      this._resetSearch()
      this.searchQueries.status = this.tabPanes[label]
      this.fetchData()
    },
    addEmployee() {
      this.$router.push('/business/employees/add')
    },
    editEmployee(id) {
      this.$router.push({ path: '/business/employees/edit', query: { id }})
    },
    deleteEmployee(id) {
      this.$confirm('此操作将永久删除该员工，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEmployee(id).then(() => {
          this.$message.success('已删除员工！')
          this.fetchData(this.currentPage)
        })
      })
    },
    fetchData(pageNum = 1) {
      this.loading = true
      this.currentPage = pageNum
      const queries = {
        pageNum,
        pageSize: 15,
        ...omitBy(this.searchQueries, isEmpty)
      }
      console.log(queries)
      getEmployeeList(queries).then(res => {
        console.log(res)
        this.employeeList = res.data.list
        this.total = res.data.total
        this.loading = false
      })
    },
    viewEmployee(id) {
      this.dialogVisible = true
      getEmployeeInfo(id).then(res => {
        this.tempEmployeeInfo = res.data
      })
    },
    reviewEmployee(id, passedOrNot) {
      if (passedOrNot) {
        this.$confirm('确定审核通过此员工？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reviewEmployee(id, { status: 'AUDITED' }).then(res => {
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
          reviewEmployee(id, { status: 'UNAUDITED', comment: value }).then(res => {
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

