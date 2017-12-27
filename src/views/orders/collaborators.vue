<template>
  <div class="app-container">
    <el-tabs type="card">
      <el-tab-pane key="1" :label="title" >
        <div class="button-area">
          <el-input size="medium" style="max-width: 320px; min-width: 260px;" placeholder="输入企业名称或信用代码">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-table :data="collaborators" border>
          <el-table-column prop="name" label="企业名称"></el-table-column>
          <el-table-column prop="social_code" label="统一社会信用代码"></el-table-column>
          <el-table-column prop="order_num" label="相关运单"></el-table-column>
          <el-table-column prop="address" label="企业注册地址"></el-table-column>
          <el-table-column prop="contact" label="紧急联系人/联系电话"></el-table-column>
          <el-table-column  label="查看企业资质">
            <template slot-scope="scope">
              <el-button type="text" @click="onViewBusiness(scope.row)">点击查看</el-button>
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
      :total="totalNum">
    </el-pagination>
  </div>
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <business-info :business-info="selectedBusiness"></business-info>
    </el-dialog>
  </div>
</template>
<script>
import { getCollaborators } from '@/api/orders/collaborators'
import businessInfo from '@/components/businessInfo'

export default {
  data() {
    return {
      collaborators: [],
      dialogVisible: false,
      selectedBusiness: null,
      title: '',
      totalNum: 0,
      currentPage: 1
    }
  },
  created() {
    this.onPaginate(1)
  },
  methods: {
    onPaginate(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.fetchData()
    },
    fetchData() {
      getCollaborators().then(res => {
        console.log(res)
        this.collaborators = res.data.list
        this.totalNum = res.data.list.length
        this.title = '全部企业' + '（' + this.totalNum + '）'
      })
    },
    onViewBusiness({ qualifications }) {
      this.selectedBusiness = qualifications
      this.dialogVisible = true
    }
  },
  components: {
    businessInfo
  }
}
</script>
