<template>
  <div class="app-container">
    <el-tabs type="card" class="customized denser mgb0" @tab-click="onTabChange">
      <el-tab-pane v-for="(value, key) in tabPanes" :label="key" :key="value">
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
            <el-select placeholder="全部罐体类型" v-model="tanksSelected">
            <el-option v-for="(tank, key) in tanksSelection" :key="key" :label="tank.label" :value="tank.value">
              </el-option>
            </el-select>
            <el-input size="medium" style="width:200px" placeholder="罐体编号 or 关联挂车号" v-model="searchQueries.tankerNo"></el-input>
            <el-button size="medium" type="primary" plain round icon="el-icon-search" @click="onSearch"></el-button>
          </el-col>
          <el-col :span="8" class="fr">
            <el-button size="medium" icon="el-icon-plus" type="primary" @click="addTank">新增罐体</el-button>
            <el-button size="medium" icon="el-icon-upload2">批量导入</el-button>
            <el-button type="text" icon="el-icon-document">下载模板</el-button>
          </el-col>
        </el-row>
        <el-table :data="tankList" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="tankerNo" label="罐体编号" width="100"></el-table-column>
          <el-table-column prop="type" label="罐体类型" width="80"></el-table-column>
          <el-table-column prop="volume" label="罐体容积 m3"></el-table-column>
          <el-table-column prop="trailerId" label="关联挂车号"></el-table-column>
          <el-table-column label="投运日期">
            <template slot-scope="scope">
              <span>{{scope.row.startDate/1000 | moment('YYYY/MM/DD')}}</span>
            </template>
          </el-table-column>       
          <el-table-column prop="status" label="审核状态" width="100"></el-table-column>
          <el-table-column label="证照有效期状态" width="240">
            <!-- <template slot-scope="scope">
              <span v-for="(item, key) in scope.row.certifications" :key="key">
                <el-tag class="adjacent" :type="item.status === '已上传' ? 'success': 'warning' ">{{item.name}}</el-tag>
              </span>
            </template> -->
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
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
  </div>
</template>
<script>
import {
  getTankList,
  deleteTank
} from '@/api/business/tanks'
import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchQueries: {
        type: '',
        tankerNo: ''
      },
      tankList: [],
      currentPage: 1,
      total: 0,
      loading: true,
      statusSelected: '',
      carTypeSelected: '',
      tabPanes: {
        '全部罐体': '',
        '待审核': 'PENDING',
        '审核未通过': 'UNAUDITED'
      },
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
    this.fetchData()
  },
  computed: {
    ...mapGetters(['statusTypes'])
  },
  methods: {
    _resetSearch() {
      this.searchQueries = {
        type: '',
        tankerNo: ''
      }
    },
    onTabChange({ label }) {
      this._resetSearch()
      this.searchQueries.status = this.tabPanes[label]
      this.fetchData()
    },
    addTank() {
      this.$router.push('/home')
    },
    editTank(id) {
      console.log(id)
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
        pageSize,
        ...omitBy(this.searchQueries, isEmpty)
      }
      getTankList(page).then(res => {
        console.log(res)
        this.tankList = res.data.list
        this.total = res.data.total
        this.loading = false
      })
    }
  }
}
</script>