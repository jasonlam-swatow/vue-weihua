<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :md="24" :lg="20">
        <progress-bar></progress-bar>
        
        <el-row :gutter="12">
          <el-col
            v-for="kanban in kanbans"
            :key="kanban"
            :md="8" :sm="24">
            <kanban :title="kanban"></kanban>
          </el-col>
        </el-row>

        <div class="chart-container">
          <line-chart height="400px" width="100%"></line-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import kanban from './components/kanban'
import progressBar from './components/progressBar'
import lineChart from './components/lineChart'

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

  components: { kanban, progressBar, lineChart }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 4px 30px;
    padding-bottom: 40px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
