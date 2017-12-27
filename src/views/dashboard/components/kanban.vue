<template>  
  <el-card class="box-card kanban mgb12" style="min-height: 360px" v-loading="loading">
    <div slot="header" class="clearfix">
      <el-row type="flex">
        <el-col :span="10" class="kanban-header-column">
          <svg-icon class="kanban-icon" icon-class="vehicle"></svg-icon>
        </el-col>
        <el-col :span="14" class="kanban-header-column">
          <div class="countup-container">
            <count-up
              class="countup"
              :start="0"
              :end="statistics.total"
              :decimals="0"
              :duration="2.5"
              :options="countUpOptions"></count-up>
            <h5 class="text-info">{{title}}</h5>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row
        type="flex"
        justify="space-between"
        class="kanban-row"
        v-for="item in statistics.list"
        :key="item.name">
        <el-col :span="10">{{item.name}}</el-col>
        <el-col
          v-if="typeof item.value === 'object'"
          style="text-align: right"
          :span="14">
          <span class="text-warning">{{item.value.expiring}}(即将过期)</span>+<span class="text-danger">{{item.value.expired}}(已过期)</span></el-col>
        <el-col
          v-else
          style="text-align: right"
          :span="16">{{item.value}}</el-col>
      </el-row>
    </div>
  </el-card>

</template>

<script>
import CountUp from 'vue-countup-v2'
import { getStatistics } from '@/api/dashboard'
export default {
  name: 'kanban',
  props: {
    title: String
  },
  data() {
    return {
      statistics: null,
      loading: true,
      countUpOptions: {
        useEasing: true,
        useGrouping: true,
        seperator: ',',
        decimal: '.',
        suffix: ''
      }
    }
  },
  created() {
    this.fetchData(this.title)
  },
  methods: {
    fetchData(type) {
      this.loading = true
      getStatistics(type).then(res => {
        this.statistics = res.data
        this.loading = false
      })
    }
  },
  components: { CountUp }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .kanban {
    &-row {
      line-height: 2;
      font-size: 14px;
    }

    &-icon {
      font-size: 48px;
    }

    &-header-column {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .countup {
      font-size: 48px;
      font-family: Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace;
    }

    h5 {
      margin: 0;
      font-size: 18px;
    }
  }
</style>