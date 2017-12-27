<template>
  <div class="app-container">
    <el-tabs type="card">
      <el-tab-pane v-for="(item, index) in tabsPane" :label="item" :key="index">
       <div class="button-area" style="display: flex; justify-content: space-between">
         <div>
            <el-select placeholder="按证照状态筛选" v-model="statusSelected">
              <el-option v-for="(status, key) in statusSelection" :key="key" :label="status.label" :value="status.value">
              </el-option>
            </el-select>
            <el-select placeholder="主要岗位" v-model="positionSelected">
              <el-option v-for="(position, key) in positionSelection" :key="key" :label="position.label" :value="position.value">
              </el-option>
            </el-select>
            <el-input size="medium" style="width:200px">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
         </div>
         <div>
           <el-button @click="increaseEmployees">新增员工</el-button>
           <el-button>批量导入</el-button>
           <a type="text">下载模版</a>
         </div>
       </div>
       <el-table :data="orderList" border>
         <el-table-column type="selection"></el-table-column>
         <el-table-column prop="name" label="姓名"></el-table-column>
         <el-table-column prop="gender" label="性别"></el-table-column>
         <el-table-column prop="id_card" label="身份证"></el-table-column>
         <el-table-column prop="position" label="主要岗位"></el-table-column>
         <el-table-column prop="tel" label="联系电话"></el-table-column>
         <el-table-column prop="entry_date" label="入职日期"></el-table-column>         
         <el-table-column prop="status" label="审核状态"></el-table-column>
         <el-table-column  label="证照有限期状态">
           <template slot-scope="scope">
             <span v-for="(item, key) in scope.row.certifications" :key="key">
               <el-tag :type="item.status === '已上传' ? 'success': 'warning' ">{{item.name}}</el-tag>
             </span>
           </template>
         </el-table-column>
         <el-table-column prop="contact" label="操作">
           <template slot-scope="scope">
             <i class="el-icon-edit" @click="editUserInfo(scope.row)"></i>
             <i class="el-icon-delete" @click="deleteUser(scope.row)"></i>
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
      :total="orderListNum">
    </el-pagination>
  </div>
  </div>
</template>
<script>
import { getEmployeesList } from '../../api/business/employees'

export default {
  data() {
    return {
      orderList: [],
      currentPage: 1,
      orderListNum: 0,
      statusSelected: '',
      positionSelected: '',
      tabsPane: ['全部员工', '待审核', '审核未通过'],
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
    this.handleCurrentChange(1)
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.fetchData()
    },
    fetchData() {
      getEmployeesList().then(res => {
        console.log(res)
        this.orderList = res.data.list
        this.orderListNum = res.data.list.length
      })
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
