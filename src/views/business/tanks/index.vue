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
            <el-select placeholder="车辆类型" v-model="tanksSelected">
            <el-option v-for="(tank, key) in tanksSelection" :key="key" :label="tank.label" :value="tank.value">
              </el-option>
            </el-select>
            <el-input size="medium" style="width:200px" placeholder="车号 or 道路运输证号">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button icon="el-icon-plus" type="primary" @click="increaseEmployees">新增罐体</el-button>
            <el-button icon="el-icon-upload2">批量导入</el-button>
            <el-button type="text" icon="el-icon-document">下载模板</el-button>
          </el-col>
        </el-row>
        <el-table :data="orderList" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="tanks_num" label="罐体编号" width="100"></el-table-column>
          <el-table-column prop="tanks_type" label="罐体类型" width="80"></el-table-column>
          <el-table-column prop="tanks_volume" label="罐体容积 m3"></el-table-column>
          <el-table-column prop="vehicles_relation" label="关联挂车号"></el-table-column>
          <el-table-column prop="operation_date" label="投运日期"></el-table-column>       
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
import { getTanksList } from '@/api/business/tanks'

export default {
  data() {
    return {
      orderList: [],
      currentPage: 1,
      total: 0,
      statusSelected: '',
      carTypeSelected: '',
      tabPaneTitles: ['全部罐体', '待审核', '审核未通过'],
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
      tanksSelection: [{
        value: '1',
        label: '压力罐'
      }, {
        value: '2',
        label: '常压馆'
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
      getTanksList().then(res => {
        console.log(res)
        this.orderList = res.data.list
        this.total = res.data.list.length
      })
    }
  }
}
</script>