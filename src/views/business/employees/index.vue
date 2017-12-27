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
            <el-select placeholder="主要岗位" v-model="positionSelected">
              <el-option v-for="(position, key) in positionSelection" :key="key" :label="position.label" :value="position.value">
              </el-option>
            </el-select>
            <el-input size="medium" style="width:200px" placeholder="身份证号或姓名">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button icon="el-icon-plus" type="primary" @click="increaseEmployees">新增员工</el-button>
            <el-button icon="el-icon-upload2">批量导入</el-button>
            <el-button type="text" icon="el-icon-document">下载模板</el-button>
          </el-col>
        </el-row>
        <el-table :data="orderList" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="gender" label="性别" width="80"></el-table-column>
          <el-table-column prop="id_card" label="身份证"></el-table-column>
          <el-table-column prop="position" label="主要岗位"></el-table-column>
          <el-table-column prop="tel" label="联系电话"></el-table-column>
          <el-table-column prop="entry_date" label="入职日期"></el-table-column>         
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
import { getEmployeesList } from '@/api/business/employees'

export default {
  data() {
    return {
      orderList: [],
      currentPage: 1,
      total: 0,
      statusSelected: '',
      positionSelected: '',
      tabPaneTitles: ['全部员工', '待审核', '审核未通过'],
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
      positionSelection: [{
        value: '1',
        label: '驾驶员'
      }, {
        value: '2',
        label: '押运员'
      }, {
        value: '3',
        label: '驾驶员/押运员'
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
      getEmployeesList().then(res => {
        console.log(res)
        this.orderList = res.data.list
        this.total = res.data.list.length
      })
    }
  }
}
</script>