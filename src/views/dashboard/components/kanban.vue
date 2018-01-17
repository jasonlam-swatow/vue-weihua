<template>  
  <el-card class="box-card kanban mgb12" style="min-height: 360px" v-loading="loading">
    <div slot="header" class="clearfix">
      <el-row type="flex">
        <el-col :span="10" class="kanban-header-column">
          <!-- <svg-icon class="kanban-icon" icon-class="vehicle"></svg-icon> -->
          <div class="kanban-icon">
            <img v-if="title === '在册车辆'" :src="dash_vehicles">
            <img v-else-if="title === '在册员工'" :src="dash_employees">
            <img v-else :src="dash_tanks">
          </div>
        </el-col>
        <el-col :span="14" class="kanban-header-column">
          <div class="countup-container">
            <count-up
              v-if="statistics.total"
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
          <span class="text-warning">即将过期</span>
          <el-tag type="warning" size="small">{{item.value.expiring}}</el-tag>
          <span class="text-danger">已过期</span>
          <el-tag type="danger" size="small">{{item.value.expired}}</el-tag>
        </el-col>
        <el-col
          v-else-if="item.name === '待认证审核'"
          style="text-align: right"
          :span="16">
          <el-tag type="warning" size="small">{{item.value}}</el-tag>
        </el-col>
        <el-col
          v-else
          style="text-align: right"
          :span="16">
          <b class="text-sub">{{item.value}} {{titleMap[title].suffix}}</b>  
        </el-col>
      </el-row>
    </div>
  </el-card>

</template>

<script>
import CountUp from 'vue-countup-v2'
import { getStatistics } from '@/api/dashboard'
import dash_vehicles from '@/assets/dash-vehicles.png'
import dash_employees from '@/assets/dash-employees.png'
import dash_tanks from '@/assets/dash-tanks.png'

export default {
  name: 'kanban',
  props: {
    title: String
  },
  data() {
    return {
      statistics: {},
      loading: true,
      countUpOptions: {
        useEasing: true,
        useGrouping: true,
        seperator: ',',
        decimal: '.',
        suffix: ''
      },
      titleMap: {
        '在册车辆': { suffix: '辆' },
        '在册罐体': { suffix: '个' },
        '在册员工': { suffix: '人' }
      },
      dash_vehicles,
      dash_employees,
      dash_tanks
    }
  },
  created() {
    // this.fetchData(this.title)
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
      img {
        width: 100%;
      }
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
      background: -webkit-linear-gradient(#ababab, #000);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    h5 {
      margin: 0;
      font-size: 18px;
    }
  }
</style>