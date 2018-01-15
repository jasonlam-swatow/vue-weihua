<template>
  <div class="app-container">
    <el-tabs type="card" class="customized denser mgb0">
      <el-tab-pane v-for="(item, index) in tabPaneTitles" :label="item" :key="index">
        <el-row type="flex" class="mgb12 strange-input">
          <el-col :span="16">
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
            <el-input style="width:200px" placeholder="身份证号或姓名" v-model="searchQueries.idOrName"></el-input>
            <el-button size="medium" type="primary" plain round icon="el-icon-search" @click="onSearch"></el-button>
          </el-col>
          <el-col :span="8" class="fr">
            <el-button size="medium" icon="el-icon-plus" type="primary" @click="addEmployee">新增员工</el-button>
            <el-button size="medium" icon="el-icon-upload2">批量导入</el-button>
            <el-button type="text" icon="el-icon-document">下载模板</el-button>
          </el-col>
        </el-row>
        <el-table :data="employeeList" border stripe v-loading="loading">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column label="性别" width="80">
            <template slot-scope="scope">{{find(genderTypes, ['code', scope.row.gender])}}</template>
          </el-table-column>
          <el-table-column prop="idCard" label="身份证"></el-table-column>
          <el-table-column label="主要岗位">
            <template slot-scope="scope">{{find(positionTypes, ['code', scope.row.position])}}</template>
          </el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
          <el-table-column label="入职日期">
            <template slot-scope="scope">
              <span>{{scope.row.entryDate/1000 | moment('YYYY/MM/DD')}}</span>
            </template>
          </el-table-column>         
          <el-table-column label="审核状态" width="100">
            <template slot-scope="scope">{{find(statusTypes, ['code', scope.row.status])}}</template>
          </el-table-column>
          <el-table-column label="证照有限期状态" width="240">
            <template slot-scope="scope">
              <span v-for="(item, key) in scope.row.certifications" :key="key">
                <el-tag class="adjacent"  :type="item.status === '已上传' ? 'success': 'warning' ">{{switchShortName(item.name)}}</el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  getEmployeeList,
  deleteEmployee
} from '@/api/business/employees'
import find from 'lodash/find'
import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'

export default {
  data() {
    return {
      loading: true,
      employeeList: [],
      currentPage: 1,
      total: 0,
      searchQueries: {
        status: '',
        position: '',
        idOrName: ''
      },
      tabPaneTitles: ['全部员工', '待审核', '审核未通过']
    }
  },
  computed: {
    ...mapGetters([
      'statusTypes',
      'positionTypes',
      'genderTypes'
    ]),
    find() { return find }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSearch() {
      this.fetchData()
    },
    switchShortName(name) {
      let shortName = ''
      switch (name) {
        case '身份证' :
          shortName = '基本'
          break
        case '劳动合同' :
          shortName = '合同'
          break
        case '驾驶证审验' :
          shortName = '驾驶证'
          break
        case '驾驶员从业资格证' :
          shortName = '驾资格'
          break
        case '押运员从业资格证' :
          shortName = '押资格'
          break
        default :
          shortName = '其他'
      }
      return shortName
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
        pageSize: 10,
        ...omitBy(this.searchQueries, isEmpty)
      }
      console.log(queries)
      getEmployeeList(queries).then(res => {
        console.log(res)
        this.employeeList = res.data.list
        this.total = res.data.total
        this.loading = false
      })
    }
  }
}
</script>

