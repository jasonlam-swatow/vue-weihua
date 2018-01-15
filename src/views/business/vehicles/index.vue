<template>
  <div class="app-container">
    <el-tabs type="card" class="customized denser mgb0">
      <el-tab-pane v-for="(item, index) in tabPaneTitles" :label="item" :key="index">
        <el-row type="flex" class="mgb12 strange-input">
          <el-col :span="16">
            <el-select placeholder="按证照状态筛选" v-model="statusSelected">
              <el-option
                v-for="status in statusTypes"
                :key="status.code"
                :label="status.value"
                :value="status.code">
              </el-option>
            </el-select>
            <el-select placeholder="车辆类型" v-model="carTypeSelected">
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
            <el-input size="medium" style="width:200px" placeholder="车号 or 道路运输证号"></el-input>
            <el-button size="medium" type="primary" plain round icon="el-icon-search" @click="onSearch"></el-button>
          </el-col>
          <el-col :span="8" class="fr">
            <el-button size="medium" icon="el-icon-plus" type="primary" @click="increaseEmployees">新增车辆</el-button>
            <el-button size="medium" icon="el-icon-upload2">批量导入</el-button>
            <el-button type="text" icon="el-icon-document">下载模板</el-button>
          </el-col>
        </el-row>
        <el-table :data="vehicleList" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="plateNo" label="车号" width="100"></el-table-column>
          <el-table-column label="车辆类型" width="100">
            <template slot-scope="scope">
              {{$_.find(licensePlateTypes, ['code', scope.row.plateType]) &&
              $_.find(licensePlateTypes, ['code', scope.row.plateType]).value}}
            </template>
          </el-table-column>
          <el-table-column prop="licenseNo" label="道路运输证号"></el-table-column>
          <el-table-column prop="gps_time" label="GPS更新时间"></el-table-column>
          <el-table-column prop="curbWeight" label="整备质量（KG）"></el-table-column>
          <el-table-column prop="tractionMass" label="核载/准牵引（KG）"></el-table-column>         
          <el-table-column label="审核状态" width="100">
            <template slot-scope="scope">
              {{$_.find(statusTypes, ['code', scope.row.status]) &&
              $_.find(statusTypes, ['code', scope.row.status]).value}}
            </template>
          </el-table-column>
          <el-table-column label="证照有限期状态" width="240">
            <template slot-scope="scope">
              <!-- <span v-for="(item, key) in scope.row.businessType" :key="key">
                <el-tag class="adjacent" :type="item.status === '已上传' ? 'success': 'warning' ">{{item.name}}</el-tag>
              </span> -->
            </template>
          </el-table-column>
          <el-table-column prop="contact" label="操作">
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top">
                <el-button type="text" icon="el-icon-edit-outline" @click="editVehicle(scope.row)"></el-button>
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  getVehicleList,
  deleteVehicle
} from '@/api/business/vehicles'
// import find from 'lodash/find'

export default {
  data() {
    return {
      vehicleList: [],
      currentPage: 1,
      total: 0,
      loading: true,
      statusSelected: '',
      carTypeSelected: '',
      tabPaneTitles: ['全部车辆', '待审核', '审核未通过']
    }
  },
  computed: {
    ...mapGetters([
      'vehicleTypes',
      'statusTypes',
      'licensePlateTypes'
    ])
    // find() { return find }
  },
  created() {
    this.fetchData()
  },
  methods: {
    increaseEmployees() {
      this.$router.push('/home')
    },
    editVehicle(id) {
      console.log(id)
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
    onPaginate(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.fetchData()
    },
    fetchData(page = 1) {
      this.loading = true
      this.currentPage = page
      getVehicleList(page).then(res => {
        console.log(res)
        this.vehicleList = res.data.list
        this.total = res.data.total
        this.loading = false
      })
    }
  }
}
</script>