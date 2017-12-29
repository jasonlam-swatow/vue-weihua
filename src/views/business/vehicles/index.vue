<template>
  <div class="app-container">
    <el-tabs type="card">
      <el-tab-pane v-for="(item, index) in tabPaneTitles" :label="item" :key="index">
        <el-row type="flex" class="mgb12">
          <el-col :span="16">
            <el-select placeholder="按证照状态筛选" v-model="statusSelected">
              <el-option v-for="(status, key) in statusSelection" :key="key" :label="status.label" :value="status.value">
              </el-option>
            </el-select>
            <el-select placeholder="车辆类型" v-model="carTypeSelected">
            <el-option-group v-for="(group, key) in vehicleSelection" :key="key" :label="group.label">
              <el-option v-for="(item, key) in group.options" :key="key" :label="item.label" :value="item.value">
              </el-option>
            </el-option-group>
            </el-select>
            <el-input size="medium" style="width:200px" placeholder="车号 or 道路运输证号">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button icon="el-icon-plus" type="primary" @click="increaseEmployees">新增车辆</el-button>
            <el-button icon="el-icon-upload2">批量导入</el-button>
            <el-button type="text" icon="el-icon-document">下载模板</el-button>
          </el-col>
        </el-row>
        <el-table :data="orderList" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="lisence_num" label="车号" width="100"></el-table-column>
          <el-table-column prop="vehicle_type" label="车辆类型" width="80"></el-table-column>
          <el-table-column prop="transport_num" label="道路运输证号"></el-table-column>
          <el-table-column prop="gps_time" label="GPS更新时间"></el-table-column>
          <el-table-column prop="curb_weight" label="整备质量（KG）"></el-table-column>
          <el-table-column prop="tow_weight" label="核载/准牵引（KG）"></el-table-column>         
          <el-table-column prop="status" label="审核状态" width="100"></el-table-column>
          <el-table-column label="证照有限期状态" width="240">
            <template slot-scope="scope">
              <span v-for="(item, key) in scope.row.certifications" :key="key">
                <el-tag class="adjacent" :type="item.status === '已上传' ? 'success': 'warning' ">{{item.name}}</el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="contact" label="操作">
            <template slot-scope="scope">
              <el-tooltip content="编辑" placement="top">
                <el-button type="text" icon="el-icon-edit" @click="editUserInfo(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="text" icon="el-icon-delete"  @click="deleteUser(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane> 
    </el-tabs>
    <div class="fr" style="margin-top:12px">
    <el-pagination
      @current-change="onPaginate"
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
import { getVehiclesList } from '@/api/business/vehicles'

export default {
  data() {
    return {
      orderList: [],
      currentPage: 1,
      total: 0,
      statusSelected: '',
      carTypeSelected: '',
      tabPaneTitles: ['全部车辆', '待审核', '审核未通过'],
      statusSelection: [{
        value: '1',
        label: '即将过期'
      }, {
        value: '2',
        label: '已过期'
      }, {
        value: '3',
        label: '正常有效期'
      }, {
        value: '4',
        label: '证照数量齐全'
      }],
      vehicleSelection: [{
        label: '牵引车',
        options: [{
          value: '1',
          label: '重型半挂牵引车'
        }, {
          value: '2',
          label: '中型半挂牵引车'
        }]
      }, {
        label: '半挂车',
        options: [{
          value: '3',
          label: '重型普通牵引车'
        }, {
          value: '1',
          label: '重型厢式牵引车'
        }]
      }]
    }
  },
  created() {
    this.onPaginate(1)
  },
  methods: {
    increaseEmployees() {
      this.$router.push('/home')
    },
    editUserInfo(info) {
      console.log(info)
    },
    deleteUser(user) {
      console.log(user)
    },
    onPaginate(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.fetchData()
    },
    fetchData() {
      getVehiclesList().then(res => {
        console.log(res)
        this.orderList = res.data.list
        this.total = res.data.list.length
      })
    }
  }
}
</script>