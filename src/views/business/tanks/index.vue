<template>
  <div class="app-container">
    <el-tabs type="card" class="customized denser mgb0" @tab-click="onTabChange">
      <el-tab-pane v-for="(value, key) in tabPanes" :label="key" :key="value">
        <el-row type="flex" class="mgb12 strange-input">
          <el-col :span="18">
            <!-- <el-select placeholder="按证照状态筛选" v-model="statusSelected">
              <el-option 
                v-for="status in statusTypes" 
                :key="status.code" 
                :label="status.value" 
                :value="status.code">
              </el-option>
            </el-select> -->
            <el-select placeholder="所属企业" v-model="searchQueries.enterpriseId">
              <el-option
                v-for="ent in enterpriseList"
                :key="ent.id"
                :value="ent.id"
                :label="ent.name"></el-option>
            </el-select>
            <el-select placeholder="全部罐体类型" v-model="searchQueries.type">
              <el-option label="全部罐体" value=""></el-option>
              <el-option
                v-for="tank in tankerTypes"
                :key="tank.seq"
                :label="tank.value" :value="tank.code">
              </el-option>
            </el-select>
            <el-input
              size="medium" style="width:200px"
              placeholder="罐体编号"
              @keyup.enter.native="onSearch"
              v-model="searchQueries.tankerNo"></el-input>
            <el-button
              size="medium"
              type="primary" plain round
              icon="el-icon-search"
              @click="onSearch"></el-button>
          </el-col>
          <el-col :span="6" class="fr">
            <div class="fr">
              <el-button size="medium" icon="el-icon-plus" type="primary" @click="addTank">新增罐体</el-button>
              <!-- <el-button size="medium" icon="el-icon-upload2">批量导入</el-button>
              <el-button type="text" icon="el-icon-document">下载模板</el-button> -->
            </div>
          </el-col>
        </el-row>
        <el-table :data="tankList" border v-loading="loading">
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column prop="tankerNo" label="罐体编号" width="180"></el-table-column>
          <el-table-column label="车辆类型" width="100">
            <template slot-scope="scope">
              {{$_.find(tankerTypes, ['code', scope.row.type]) &&
              $_.find(tankerTypes, ['code', scope.row.type]).value}}
            </template>
          </el-table-column>
          <el-table-column prop="volume" label="罐体容积 m3" width="110"></el-table-column>
          <el-table-column prop="plateNo" label="关联挂车号"></el-table-column>
          <el-table-column label="审核状态">
            <template slot-scope="scope">
              {{$_.find(statusTypes, ['code', scope.row.status]) &&
              $_.find(statusTypes, ['code', scope.row.status]).value}}
            </template>
          </el-table-column>
          <el-table-column label="证照展示" width="180">
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
                    v-for="cert in shortenCertifications(getCertificationMaps(scope.row.certifications, certificationMap))"
                    :key="cert"
                    size="small" type="success" class="adjacent">{{cert}}</el-tag>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="证件有效期状态" width="120">
            <template slot-scope="scope">
              {{checkValidity(scope.row.certifications)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="120">
            <template slot-scope="scope">
              <el-tooltip content="查看" placement="top">
                <el-button type="text" icon="el-icon-view" @click="viewTank(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
                <el-button type="text" icon="el-icon-edit-outline" @click="editTank(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="text" icon="el-icon-delete"  @click="deleteTank(scope.row.id)"></el-button>
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
      :title="tempTankInfo.name"
      width="70%" top="4vh"
      :visible.sync="dialogVisible">
      <img
        v-if="tempTankInfo.status === 'AUDITED'"
        :src="stamp_pic"
        class="approved-stamp">
      <el-form
        :model="tempTankInfo"
        class="view-form"
        label-width="120px"
        :inline="true">
        <el-form-item label="罐体编号">{{tempTankInfo.tankerNo}}</el-form-item>
        <el-form-item label="罐体类型">
          {{$_.find(tankerTypes, ['code', tempTankInfo.type]) &&
            $_.find(tankerTypes, ['code', tempTankInfo.type]).value}}
        </el-form-item>
        <el-form-item label="罐体容积">{{tempTankInfo.volume}}</el-form-item>
        <el-form-item label="投运日期">{{tempTankInfo.startDate/1000 | moment('YYYY-MM-DD')}}</el-form-item>
        <el-form-item label="关联挂车号">{{tempTankInfo.plateNo}}</el-form-item>
        <el-form-item
          v-if="$_.find(tempTankInfo.certifications, ['title', '罐体检验报告'])"
          label="罐体校验报告"
          class="full-width">
          <!-- <el-form-item label="关联挂车号">{{tempTankInfo.plateNo}}</el-form-item> -->
          <figure v-if="$_.find(tempTankInfo.certifications, { title: '罐体检验报告', type: 'A' })">
            <img @click="scaleUpImage" :src="$_.find(tempTankInfo.certifications, { title: '罐体检验报告', type: 'A' }).path">
            <figcaption>检验报告封面页</figcaption>
          </figure>
          <figure v-if="$_.find(tempTankInfo.certifications, { title: '罐体检验报告', type: 'B' })">
            <img @click="scaleUpImage" :src="$_.find(tempTankInfo.certifications, { title: '罐体检验报告', type: 'B' }).path">
            <figcaption>检验报告细节页</figcaption>
          </figure>
          <h5 class="sub-title">
            <span>报告编号：{{$_.find(tempTankInfo.certifications, { title: '罐体检验报告', type: 'A' }).licenseNo}}</span>
            <span>下次检验日期：{{($_.find(tempTankInfo.certifications, { title: '罐体检验报告', type: 'A' }).restsDate)/1000 | moment('YYYY-MM-DD')}}</span>
          </h5>
        </el-form-item>
        <el-form-item
          v-if="tempTankInfo.type === 'OVERHEAD_TANK' && $_.find(tempTankInfo.certifications, ['title', '压力罐容器登记证'])"
          label="压力罐容器登记证"
          class="full-width wider-label-140">
          <!-- <el-form-item label="关联挂车号">{{tempTankInfo.plateNo}}</el-form-item> -->
          <figure v-if="$_.find(tempTankInfo.certifications, { title: '压力罐容器登记证', type: 'A' })">
            <img @click="scaleUpImage" :src="$_.find(tempTankInfo.certifications, { title: '压力罐容器登记证', type: 'A' }).path">
            <figcaption>管理页</figcaption>
          </figure>
          <figure v-if="$_.find(tempTankInfo.certifications, { title: '压力罐容器登记证', type: 'B' })">
            <img @click="scaleUpImage" :src="$_.find(tempTankInfo.certifications, { title: '压力罐容器登记证', type: 'B' }).path">
            <figcaption>检验页</figcaption>
          </figure>
          <figure v-if="$_.find(tempTankInfo.certifications, { title: '压力罐容器登记证', type: 'C' })">
            <img @click="scaleUpImage" :src="$_.find(tempTankInfo.certifications, { title: '压力罐容器登记证', type: 'C' }).path">
            <figcaption>特性页</figcaption>
          </figure>
           <h5 class="sub-title">
             <span>使用登记证编号: {{$_.find(tempTankInfo.certifications, { title: '压力罐容器登记证', type: 'A' }).licenseNo}}</span>
             <span>下次检验日期：{{$_.find(tempTankInfo.certifications, { title: '压力罐容器登记证', type: 'A' }).restsDate}}</span>
            </h5>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="tempTankInfo.status !== 'AUDITED'">
        <el-button
          type="success"
          @click="reviewTank(tempTankInfo.id, true)">审核通过</el-button>
        <el-button
          type="danger"
          @click="reviewTank(tempTankInfo.id, false)">审核不通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { getEnterpriseList } from '@/api/business/enterprises'
import {
  getTankList,
  deleteTank,
  getTankInfo,
  reviewTank
} from '@/api/business/tanks'
import mappingCertifications from '@/mixins/_mappingCertifications'

import stamp_pic from '@/assets/stamp.png'

import omitBy from 'lodash/omitBy'

export default {
  mixins: [mappingCertifications],
  data() {
    return {
      stamp_pic,
      dialogVisible: false,
      tempTankInfo: {},
      searchQueries: {
        type: '',
        tankerNo: '',
        enterpriseId: ''
      },
      enterpriseList: [],
      tankList: [],
      currentPage: 1,
      total: 0,
      loading: true,
      statusSelected: '',
      carTypeSelected: '',
      certificationMap: {
        '检': ['罐体检验报告'],
        '登': ['压力罐容器登记证']
      },
      tabPanes: {
        '全部罐体': '',
        '待审核': 'PENDING',
        '审核未通过': 'UNAUDITED'
      }
    }
  },
  computed: {
    ...mapGetters([
      'statusTypes',
      'tankerTypes'
    ]),
    isView() {
      return !!this.$route.query.view
    }
  },
  created() {
    // this.fetchData()
    getEnterpriseList({ pageNum: 1, pageSize: 250 }).then(res => {
      this.enterpriseList = res.data.list
      if (this.isView) {
        this.searchQueries.enterpriseId = this.$route.query.id
      }
      this.fetchData()
    })
  },
  methods: {
    onSearch() {
      this.fetchData()
    },
    _resetSearch() {
      this.searchQueries.type = ''
      this.searchQueries.tankerNo = ''
      this.searchQueries.enterpriseId = ''
    },
    onTabChange({ label }) {
      this._resetSearch()
      this.searchQueries.status = this.tabPanes[label]
      this.fetchData()
    },
    addTank() {
      this.$router.push('/business/tanks/add')
    },
    editTank(id) {
      this.$router.push({ path: '/business/tanks/edit', query: { id }})
    },
    deleteTank(id) {
      this.$confirm('此操作将永久删除该罐体，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTank(id).then(() => {
          this.$message.success('已删除罐体！')
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
        ...omitBy(this.searchQueries, query => !query)
      }
      console.log(queries)
      getTankList(queries).then(res => {
        console.log(res)
        this.tankList = res.data.list
        this.total = res.data.total
        this.loading = false
      })
    },
    viewTank(id) {
      this.dialogVisible = true
      getTankInfo(id).then(res => {
        this.tempTankInfo = res.data
      })
    },
    reviewTank(id, passedOrNot) {
      if (passedOrNot) {
        this.$confirm('确定审核通过此罐体？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reviewTank(id, { status: 'AUDITED' }).then(res => {
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
          reviewTank(id, { status: 'UNAUDITED', comment: value }).then(res => {
            this.$message.info('已审核不通过！')
            this.dialogVisible = false
            this.fetchData()
          })
        })
      }
    },
    scaleUpImage(event) {
      const imageSrc = event.target.src
      const h = this.$createElement
      this.$msgbox({
        showConfirmButton: false,
        showCancelButton: false,
        customClass: 'image-previewer',
        message: h('img', { attrs: { src: imageSrc }})
      })
    }
  }
}
</script>