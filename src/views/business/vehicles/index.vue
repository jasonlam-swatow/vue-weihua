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
            <!-- <el-select placeholder="按证照状态筛选" v-model="searchQueries.status">
              <el-option
                v-for="status in statusTypes"
                :key="status.code"
                :label="status.value"
                :value="status.code">
              </el-option>
            </el-select> -->
            <el-select placeholder="车辆类型" v-model="searchQueries.vehicleType">
            <el-option-group
              v-for="group in vehicleTypes"
              :key="group.id"
              :label="group.value">
              <el-option
                v-for="child in group.children"
                :key="child.id"
                :label="child.value"
                :value="child.code">
              </el-option>
            </el-option-group>
            </el-select>
            <el-input
              size="medium"
              style="width:200px"
              placeholder="车号 or 道路运输证号"
              v-model="searchQueries.number"></el-input>
            <el-button size="medium" type="primary" plain round icon="el-icon-search" @click="onSearch"></el-button>
          </el-col>
          <el-col :span="6" class="fr">
            <div class="fr">
              <el-button size="medium" icon="el-icon-plus" type="primary" @click="addVehicle">新增车辆</el-button>
              <!-- <el-button size="medium" icon="el-icon-upload2">批量导入</el-button>
              <el-button type="text" icon="el-icon-document">下载模板</el-button> -->
            </div>
          </el-col>
        </el-row>
        <el-table :data="vehicleList" border>
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column prop="plateNo" label="车号" width="100"></el-table-column>
          <el-table-column label="车辆类型">
            <template slot-scope="scope">
              {{findVehicleType(scope.row.type, vehicleTypes)}}
              <!-- {{$_.find(vehicleTypes, ['code', scope.row.type]) &&
              $_.find(vehicleTypes, ['code', scope.row.type]).value}} -->
            </template>
          </el-table-column>
          <el-table-column label="车牌类型">
            <template slot-scope="scope">
              {{$_.find(licensePlateTypes, ['code', scope.row.plateType]) &&
              $_.find(licensePlateTypes, ['code', scope.row.plateType]).value}}
            </template>
          </el-table-column>
          <el-table-column prop="licenseNo" label="道路运输证号" width="140"></el-table-column>
          <!-- <el-table-column prop="gps_time" label="GPS更新时间"></el-table-column> -->
          <el-table-column prop="curbWeight" label="整备质量（KG）" width="130"></el-table-column>
          <el-table-column prop="tractionMass" label="核载/准牵引（KG）" width="150"></el-table-column>         
          <el-table-column label="审核状态" width="90">
            <template slot-scope="scope">
              {{$_.find(statusTypes, ['code', scope.row.status]) &&
              $_.find(statusTypes, ['code', scope.row.status]).value}}
            </template>
          </el-table-column>
          <el-table-column label="证照展示" width="240">
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
          <el-table-column label="证件有效期状态" width="140">
            <template slot-scope="scope">
              {{checkValidity(scope.row.certifications)}}
            </template>
          </el-table-column>
          <el-table-column prop="contact" label="操作" fixed="right" width="120">
            <template slot-scope="scope">
              <el-tooltip content="查看" placement="top">
                <el-button type="text" icon="el-icon-view" @click="viewTank(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
                <el-button type="text" icon="el-icon-edit-outline" @click="editVehicle(scope.row.id)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="text" icon="el-icon-delete"  @click="deleteVehicle(scope.row)"></el-button>
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
      :title="tempVehicleInfo.plateNo"
      width="70%" top="4vh"
      :visible.sync="dialogVisible">
      <img
        v-if="tempVehicleInfo.status === 'AUDITED'"
        :src="stamp_pic"
        class="approved-stamp">
      <el-form
        :model="tempVehicleInfo"
        class="view-form"
        label-width="100px"
        :inline="true">
        <el-form-item label="车牌号">{{tempVehicleInfo.plateNo}}</el-form-item>
        <el-form-item label="车辆类型">
          {{findVehicleType(tempVehicleInfo.type, vehicleTypes)}}
        </el-form-item>
        <el-form-item label="车牌类型">
          {{$_.find(licensePlateTypes, ['code', tempVehicleInfo.plateType]) &&
            $_.find(licensePlateTypes, ['code', tempVehicleInfo.plateType]).value}}
        </el-form-item>
        <el-form-item label="道路运输证号">
          {{tempVehicleInfo.licenseNo}}
        </el-form-item>
        <el-form-item label="车架号">
          {{tempVehicleInfo.vin}}
        </el-form-item>
        <el-form-item label="整备质量">
          {{tempVehicleInfo.curbWeight}} KG
        </el-form-item>
         <el-form-item label="核载/准牵引质量">
          {{tempVehicleInfo.tractionMass}} KG
        </el-form-item>     
          <el-form-item label="经营类型" class="full-width">
            <div style="max-height: 280px; overflow: scroll; border: 1px solid #eee; padding-top: 12px;">
              <el-tree
                :data="tempVehicleBusinessTypes"
                :default-expand-all="true"
                ></el-tree>
            </div>
        </el-form-item>          
        <el-form-item
          v-if="$_.find(tempVehicleInfo.certifications, ['title', '车辆道路运输证'])"
          label="车辆道路运输证"
          class="full-width wider-label-140">
          <!-- <el-form-item label="关联挂车号">{{tempVehicleInfo.plateNo}}</el-form-item> -->
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '车辆道路运输证', type: 'A' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '车辆道路运输证', type: 'A' }).path">
            <figcaption>营运证正本正本正面</figcaption>
          </figure>
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '车辆道路运输证', type: 'B' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '车辆道路运输证', type: 'B' }).path">
            <figcaption>代理证正面</figcaption>
          </figure>
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '车辆道路运输证', type: 'C' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '车辆道路运输证', type: 'C' }).path">
            <figcaption>代理证反面</figcaption>
          </figure>
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '车辆道路运输证', type: 'D' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '车辆道路运输证', type: 'D' }).path">
            <figcaption>等级评定卡（挂车不需要）</figcaption>
          </figure>
           <h5 class="sub-title">
             <span>道路运输证号: {{$_.find(tempVehicleInfo.certifications, { title: '车辆道路运输证', type: 'A' }).licenseNo}}</span>
             <span>车辆有效期: {{$_.find(tempVehicleInfo.certifications, { title: '车辆道路运输证', type: 'A' }).expireDate/1000 | moment('YYYY-MM-DD')}}</span>
             <span>等级评定有效期: {{$_.find(tempVehicleInfo.certifications, { title: '车辆道路运输证', type: 'A' }).restsDate/1000 | moment('YYYY-MM-DD')}}</span>
            </h5>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempVehicleInfo.certifications, ['title', '机动车登记证'])"
          label="机动车登记证"
          class="full-width wider-label-120">
          <!-- <el-form-item label="关联挂车号">{{tempVehicleInfo.plateNo}}</el-form-item> -->
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '机动车登记证', type: 'A' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '机动车登记证', type: 'A' }).path">
            <figcaption>机动车登记信息证</figcaption>
          </figure>
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '机动车登记证', type: 'B' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '机动车登记证', type: 'B' }).path">
            <figcaption>机动车登记证登记栏（最近一次登记）</figcaption>
          </figure>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempVehicleInfo.certifications, ['title', '车辆行驶证'])"
          label="车辆行驶证"
          class="full-width">
          <!-- <el-form-item label="关联挂车号">{{tempVehicleInfo.plateNo}}</el-form-item> -->
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '车辆行驶证', type: 'A' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '车辆行驶证', type: 'A' }).path">
            <figcaption>行驶证正本正面</figcaption>
          </figure>
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '车辆行驶证', type: 'B' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '车辆行驶证', type: 'B' }).path">
            <figcaption>行驶证正本反面</figcaption>
          </figure>
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '车辆行驶证', type: 'C' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '车辆行驶证', type: 'C' }).path">
            <figcaption>行驶证副本正面</figcaption>
          </figure>
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '车辆行驶证', type: 'D' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '车辆行驶证', type: 'D' }).path">
            <figcaption>行驶证副本反面</figcaption>
          </figure>
           <h5 class="sub-title">
             <span>检测有效期: {{$_.find(tempVehicleInfo.certifications, { title: '车辆行驶证', type: 'A' }).expireDate/1000 | moment('YYYY-MM-DD')}}</span>
            </h5>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempVehicleInfo.certifications, ['title', '卫星定位终端安装证书'])"
          label="卫星定位终端安装证书"
          class="full-width wider-label-160">
          <!-- <el-form-item label="关联挂车号">{{tempVehicleInfo.plateNo}}</el-form-item> -->
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '卫星定位终端安装证书', type: 'A' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '卫星定位终端安装证书', type: 'A' }).path">
            <figcaption>卫星定位终端安装证书</figcaption>
          </figure>
           <h5 class="sub-title">
             <span>从业资格证号: {{$_.find(tempVehicleInfo.certifications, { title: '卫星定位终端安装证书', type: 'A' }).licenseNo}}</span>
             <span>有效期截止日期: {{$_.find(tempVehicleInfo.certifications, { title: '卫星定位终端安装证书', type: 'A' }).restsDate/1000 | moment('YYYY-MM-DD')}}</span>             
            </h5>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempVehicleInfo.certifications, ['title', '道路危险货物承运人责任保险单'])"
          label="道路危险货物承运人责任保险单"
          class="full-width wider-label-210">
          <!-- <el-form-item label="关联挂车号">{{tempVehicleInfo.plateNo}}</el-form-item> -->
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '道路危险货物承运人责任保险单', type: 'A' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '道路危险货物承运人责任保险单', type: 'A' }).path">
            <figcaption>道路危险货物承运人责任保险单</figcaption>
          </figure>
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '道路危险货物承运人责任保险单', type: 'B' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '道路危险货物承运人责任保险单', type: 'B' }).path">
            <figcaption>道路危险货物承运人责任保险单（附</figcaption>
          </figure>
           <h5 class="sub-title">
             <span>保险有效期: {{$_.find(tempVehicleInfo.certifications, { title: '道路危险货物承运人责任保险单', type: 'A' }).expireDate/1000 | moment('YYYY-MM-DD')}}</span>
            </h5>
        </el-form-item>
        <el-form-item
          v-if="$_.find(tempVehicleInfo.certifications, ['title', '车辆安全设备配备照'])"
          label="车辆安全设备配备照"
          class="full-width wider-label-160">
          <!-- <el-form-item label="关联挂车号">{{tempVehicleInfo.plateNo}}</el-form-item> -->
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '车辆安全设备配备照', type: 'A' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '车辆安全设备配备照', type: 'A' }).path">
            <figcaption>车辆安全设备配备照片</figcaption>
          </figure>
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '车辆安全设备配备照', type: 'B' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '车辆安全设备配备照', type: 'B' }).path">
            <figcaption>车辆安全设备配备照片</figcaption>
          </figure>
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '车辆安全设备配备照', type: 'C' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '车辆安全设备配备照', type: 'C' }).path">
            <figcaption>车辆安全设备配备照片</figcaption>
          </figure>
          <figure v-if="$_.find(tempVehicleInfo.certifications, { title: '车辆安全设备配备照', type: 'D' })">
            <img :src="$_.find(tempVehicleInfo.certifications, { title: '车辆安全设备配备照', type: 'D' }).path">
            <figcaption>车辆安全设备配备照片</figcaption>
          </figure>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="tempVehicleInfo.status !== 'AUDITED'">
        <el-button
          type="success"
          @click="reviewVehicle(tempVehicleInfo.id, true)">审核通过</el-button>
        <el-button
          type="danger"
          @click="reviewVehicle(tempVehicleInfo.id, false)">审核不通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  getVehicleList,
  deleteVehicle,
  getTrailerInfo,
  reviewVehicle
} from '@/api/business/vehicles'
import mappingCertifications from '@/mixins/_mappingCertifications'

import stamp_pic from '@/assets/stamp.png'

import flatten from 'lodash/flatten'
import thru from 'lodash/thru'
import union from 'lodash/union'
import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'
// import find from 'lodash/find'

export default {
  mixins: [mappingCertifications],
  data() {
    return {
      stamp_pic,
      dialogVisible: false,
      tempVehicleInfo: {},
      vehicleList: [],
      currentPage: 1,
      total: 0,
      loading: true,
      statusSelected: '',
      carTypeSelected: '',
      searchQueries: {
        status: '',
        vehicleType: '',
        number: ''
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
      tempVehicleBusinessTypes: []
    }
  },
  computed: {
    ...mapGetters([
      'vehicleTypes',
      'statusTypes',
      'licensePlateTypes',
      'vehicleBusinessTypes'
    ])
    // find() { return find }
  },
  created() {
    this.fetchData()
  },
  methods: {
    findVehicleType(type, vehicleTypes) {
      const flattened = flatten(thru(vehicleTypes, coll =>
        union(coll, this.$_.map(coll, 'children'))
      ))
      return this.$_.find(flattened, { code: type }) ? this.$_.find(flattened, { code: type }).value : null
    },
    onSearch() {
      this.fetchData()
    },
    _resetSearch() {
      this.searchQueries = {
        status: '',
        vehicleType: '',
        number: ''
      }
    },
    onTabChange({ label }) {
      this._resetSearch()
      this.searchQueries.status = this.tabPanes[label]
      this.fetchData()
    },
    addVehicle() {
      this.$router.push('/business/vehicles/add')
    },
    editVehicle(id) {
      this.$router.push({ path: '/business/vehicles/edit', query: { id }})
    },
    deleteVehicle(id) {
      this.$confirm('此操作将永久删除该车辆，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteVehicle(id).then(() => {
          this.$message.success('已删除车辆！')
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
      console.log(queries)
      getVehicleList(queries).then(res => {
        console.log(res)
        this.vehicleList = res.data.list
        this.total = res.data.total
        this.loading = false
      })
    },
    viewTank(id) {
      this.dialogVisible = true
      getTrailerInfo(id).then(res => {
        this.tempVehicleInfo = res.data
        this.tempVehicleBusinessTypes = this.$_.filter(this.$_.map(this.vehicleBusinessTypes, item => {
          const children = this.$_.filter(item.children, child => this.tempVehicleInfo.businessType.includes(child.id))
          return Object.assign({}, item, { children })
        }), elem => elem.children.length > 0)
      })
    },
    reviewVehicle(id, passedOrNot) {
      if (passedOrNot) {
        this.$confirm('确定审核通过此车辆？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reviewVehicle(id, { status: 'AUDITED' }).then(res => {
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
          reviewVehicle(id, { status: 'UNAUDITED', comment: value }).then(res => {
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