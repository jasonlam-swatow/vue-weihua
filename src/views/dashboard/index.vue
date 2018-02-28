<template>
  <div class="dashboard-container">
    <el-row v-if="enterpriseId && !dialogSelectVisible">
      <el-col :md="24" :lg="20">
        <!-- <progress-bar></progress-bar> -->
        
        <kanbans :loading="loading" :statistics="statistics"></kanbans>

        <div class="chart-container">
          <!-- <line-chart height="400px" width="100%"></line-chart> -->
        </div>
      </el-col>
    </el-row>

    <el-dialog title="请选择企业" width="33%" :visible.sync="dialogSelectVisible">
      <el-select v-model="enterpriseId">
        <el-option
          v-for="ent in enterpriseList"
          :key="ent.id"
          :value="ent.id"
          :label="ent.name"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogSelectVisible = false; $router.go(-1)">返回</el-button>
        <el-button
          type="primary"
          @click="fetchData(enterpriseId)">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getEnterpriseList } from '@/api/business/enterprises'
import { getStatistics } from '@/api/dashboard'
import kanbans from './components/kanbans'
// import progressBar from './components/progressBar'
// import lineChart from './components/lineChart'

export default {
  name: 'dashboard',

  data() {
    return {
      enterpriseId: '',
      enterpriseList: [],
      dialogSelectVisible: true,
      loading: true,
      statistics: {},
      kanbans: ['在册车辆', '在册罐体', '在册员工']
    }
  },

  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },

  created() {
    getEnterpriseList({ pageNum: 1, pageSize: 250 }).then(res => {
      this.enterpriseList = res.data.list
    })
  },

  methods: {
    fetchData(id) {
      this.dialogSelectVisible = false
      getStatistics(id).then(res => {
        this.statistics = res.data
        this.loading = false
      })
    }
  },

  components: {
    kanbans
    // progressBar,
    // lineChart
  }
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
