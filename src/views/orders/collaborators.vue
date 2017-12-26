<template>
  <div class="app-container">
    <el-tabs type="card">
      <el-tab-pane key="1" :label="holeBusinessTitle" >
       <el-input size="medium" class="button-area" style="width:30%">
         <el-button slot="append" icon="el-icon-search"></el-button>
       </el-input>
       <el-table :data="orderList" border>
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
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="holeBusinessNum">
    </el-pagination>
  </div>
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <business-info :business-info="selectedBusiness"></business-info>
    </el-dialog>
  </div>
</template>
<script>
import { getOrderList } from '../../api/orders/collaborators'
import businessInfo from '@/components/businessInfo'

export default {
  data() {
    return {
      orderList: [],
      dialogVisible: false,
      selectedBusiness: null,
      holeBusinessTitle: '',
      holeBusinessNum: 0,
      currentPage: 1
    }
  },
  created() {
    this.handleCurrentChange(1)
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.fetchData()
    },
    fetchData () {
      getOrderList().then(res => {
        console.log(res)
        this.orderList = res.data.list
        this.holeBusinessNum = res.data.list.length
        this.holeBusinessTitle = '全部企业' + '(' + this.holeBusinessNum + ')'
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
<style lang="sass" scoped>

</style>
