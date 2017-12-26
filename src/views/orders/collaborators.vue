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
         <el-table-column prop="qualifications" label="查看企业资质"></el-table-column>
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
      orderlist: []
    }
  },
  mounted() {
    getOrderList().then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="sass" scoped>

</style>
