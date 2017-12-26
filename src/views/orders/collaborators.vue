<template>
  <div>
    <el-tabs>
      <el-tab-pane>
       <el-input></el-input>
       <el-table :data="orderList">
         <el-table-column prop="name" label="企业名称"></el-table-column>
         <el-table-column prop="social_code" label="统一社会信用代码"></el-table-column>
         <el-table-column prop="order_num" label="相关运单"></el-table-column>
         <el-table-column prop="address" label="企业注册地址"></el-table-column>
         <el-table-column prop="contact" label="紧急联系人/联系电话"></el-table-column>
         <el-table-column  label="查看企业资质">
           <template slot-scope="scope">
             <el-button type="text" @click="dialogVisible=true">点击查看</el-button>
              <el-dialog
              title="基本信息"
              :visible.sync="dialogVisible"
              >
              <span v-for="(item, key) in scope.row.qualifications">{{key}}: {{item.value}}</span>
              <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span> -->
            </el-dialog>
           </template>
         </el-table-column>
       </el-table>
      </el-tab-pane> 
    </el-tabs>
  </div>
</template>
<script>
import { getOrderList } from '../../api/orders/collaborators'

export default {
  data() {
    return {
      orderList: [],
      dialogVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData () {
      getOrderList().then(res => {
      console.log(res)
      this.orderList = res.data.list
    })
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
