<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :md="24" :lg="20">
        <el-steps class="dashboard-steps mgb24" :active="2" align-center>
          <el-step title="企业信息认证（审核通过）"></el-step>
          <el-step title="至少一人审核通过"></el-step>
          <el-step title="至少一辆车审核通过"></el-step>
          <el-step title="至少一个罐体审核通过"></el-step>
          <el-step title="完成认证即可承运订单！"></el-step>
          <el-step title="恭喜已可承运订单！"></el-step>
        </el-steps>
        
        <el-row type="flex" justify="space-around">
          <el-col v-for="kanban in kanbans" :span="6">
            <kanban :title="kanban"></kanban>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import kanban from './components/kanban'

export default {
  name: 'dashboard',

  data() {
    return {
      kanbans: ['在册车辆', '在册罐体', '在册员工']
    }
  },

  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },

  components: { kanban }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
