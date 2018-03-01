<template>
  <el-row :gutter="12">
    <el-col :md="8" :sm="24">
      <el-card class="box-card kanban mgb12" style="min-height: 360px" v-loading="loading">
        <div slot="header" class="clearfix">
          <el-row type="flex">
            <el-col :span="10" class="kanban-header-column">
              <!-- <svg-icon class="kanban-icon" icon-class="vehicle"></svg-icon> -->
              <div class="kanban-icon">
                <img :src="dash_vehicles">
              </div>
            </el-col>
            <el-col :span="14" class="kanban-header-column">
              <div class="countup-container">
                <count-up
                  v-if="statistics.tras"
                  class="countup"
                  :start="0"
                  :end="statistics.tras"
                  :decimals="0"
                  :duration="2.5"
                  :options="countUpOptions"></count-up>
                <span v-else class="countup">{{statistics.tras}}</span>
                <h5 class="text-info">在册车辆</h5>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">牵引车</el-col>
            <el-col
              style="text-align: right"
              :span="16">{{statistics.tvTras}}</el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">挂车</el-col>
            <el-col
              style="text-align: right"
              :span="16">{{statistics.semiTras}}</el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">车辆运输证</el-col>
            <el-col
              style="text-align: right"
              :span="16">
              <span class="text-warning">即将过期</span>
              <el-tag type="warning" size="small">{{statistics.transportWillAbnor}}</el-tag>
              <span class="text-danger">已过期</span>
              <el-tag type="danger" size="small">{{statistics.transportAbnor}}</el-tag>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">承运人责任险</el-col>
            <el-col
              style="text-align: right"
              :span="16">
              <span class="text-warning">即将过期</span>
              <el-tag type="warning" size="small">{{statistics.roadWillAbnor}}</el-tag>
              <span class="text-danger">已过期</span>
              <el-tag type="danger" size="small">{{statistics.roadAbnor}}</el-tag>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">车辆行驶证</el-col>
            <el-col
              style="text-align: right"
              :span="16">
              <span class="text-warning">即将过期</span>
              <el-tag type="warning" size="small">{{statistics.drivingWillAbnor}}</el-tag>
              <span class="text-danger">已过期</span>
              <el-tag type="danger" size="small">{{statistics.drivingInsAbnor}}</el-tag>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">待认证审核</el-col>
            <el-col
              style="text-align: right"
              :span="16">
              <el-tag type="warning" size="small">{{statistics.penTras}}</el-tag>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>

    <el-col :md="8" :sm="24">
      <el-card class="box-card kanban mgb12" style="min-height: 360px" v-loading="loading">
        <div slot="header" class="clearfix">
          <el-row type="flex">
            <el-col :span="10" class="kanban-header-column">
              <!-- <svg-icon class="kanban-icon" icon-class="vehicle"></svg-icon> -->
              <div class="kanban-icon">
                <img :src="dash_tanks">
              </div>
            </el-col>
            <el-col :span="14" class="kanban-header-column">
              <div class="countup-container">
                <count-up
                  v-if="statistics.tans"
                  class="countup"
                  :start="0"
                  :end="statistics.tans"
                  :decimals="0"
                  :duration="2.5"
                  :options="countUpOptions"></count-up>
                <span v-else class="countup">{{statistics.tans}}</span>
                <h5 class="text-info">在册罐体</h5>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">常压罐</el-col>
            <el-col
              style="text-align: right"
              :span="16">{{statistics.atmTans}}</el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">压力罐</el-col>
            <el-col
              style="text-align: right"
              :span="16">{{statistics.oveTans}}</el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">罐体检测报告</el-col>
            <el-col
              style="text-align: right"
              :span="16">
              <span class="text-warning">即将过期</span>
              <el-tag type="warning" size="small">{{statistics.tanInsWillAbnor}}</el-tag>
              <span class="text-danger">已过期</span>
              <el-tag type="danger" size="small">{{statistics.tanInsAbnor}}</el-tag>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">压力罐容器登记证</el-col>
            <el-col
              style="text-align: right"
              :span="16">
              <span class="text-warning">即将过期</span>
              <el-tag type="warning" size="small">{{statistics.tanPreInsWillAbnor}}</el-tag>
              <span class="text-danger">已过期</span>
              <el-tag type="danger" size="small">{{statistics.tanPreInsAbnor}}</el-tag>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">待认证审核</el-col>
            <el-col
              style="text-align: right"
              :span="16">
              <el-tag type="warning" size="small">{{statistics.penTans}}</el-tag>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>

    <el-col :md="8" :sm="24">
      <el-card class="box-card kanban mgb12" style="min-height: 360px" v-loading="loading">
        <div slot="header" class="clearfix">
          <el-row type="flex">
            <el-col :span="10" class="kanban-header-column">
              <!-- <svg-icon class="kanban-icon" icon-class="vehicle"></svg-icon> -->
              <div class="kanban-icon">
                <img :src="dash_employees">
              </div>
            </el-col>
            <el-col :span="14" class="kanban-header-column">
              <div class="countup-container">
                <count-up
                  v-if="statistics.employees"
                  class="countup"
                  :start="0"
                  :end="statistics.employees"
                  :decimals="0"
                  :duration="2.5"
                  :options="countUpOptions"></count-up>
                <span v-else class="countup">{{statistics.employees}}</span>
                <h5 class="text-info">在册员工</h5>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">司机</el-col>
            <el-col
              style="text-align: right"
              :span="16">{{statistics.drivers}}</el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">押运员</el-col>
            <el-col
              style="text-align: right"
              :span="16">{{statistics.escorts}}</el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">身份证</el-col>
            <el-col
              style="text-align: right"
              :span="16">
              <span class="text-warning">即将过期</span>
              <el-tag type="warning" size="small">{{statistics.idCardWillAbnor}}</el-tag>
              <span class="text-danger">已过期</span>
              <el-tag type="danger" size="small">{{statistics.idCardAbnor}}</el-tag>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">劳动合同</el-col>
            <el-col
              style="text-align: right"
              :span="16">
              <span class="text-warning">即将过期</span>
              <el-tag type="warning" size="small">{{statistics.laborContractWillAbnor}}</el-tag>
              <span class="text-danger">已过期</span>
              <el-tag type="danger" size="small">{{statistics.laborContractAbnor}}</el-tag>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">从业资格证</el-col>
            <el-col
              style="text-align: right"
              :span="16">
              <span class="text-warning">即将过期</span>
              <el-tag type="warning" size="small">{{statistics.quaCerWillAbnor}}</el-tag>
              <span class="text-danger">已过期</span>
              <el-tag type="danger" size="small">{{statistics.quaCerAbnor}}</el-tag>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">驾驶证</el-col>
            <el-col
              style="text-align: right"
              :span="16">
              <span class="text-warning">即将过期</span>
              <el-tag type="warning" size="small">{{statistics.dirLicWillAbnor}}</el-tag>
              <span class="text-danger">已过期</span>
              <el-tag type="danger" size="small">{{statistics.dirLicAbnor}}</el-tag>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
            class="kanban-row">
            <el-col :span="8">待认证审核</el-col>
            <el-col
              style="text-align: right"
              :span="16">
              <el-tag type="warning" size="small">{{statistics.penEmploye}}</el-tag>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import CountUp from 'vue-countup-v2'
import dash_vehicles from '@/assets/dash-vehicles.png'
import dash_employees from '@/assets/dash-employees.png'
import dash_tanks from '@/assets/dash-tanks.png'

export default {
  name: 'kanbans',
  props: {
    statistics: Object,
    loading: Boolean
  },
  data() {
    return {
      countUpOptions: {
        useEasing: true,
        useGrouping: true,
        seperator: ',',
        decimal: '.',
        suffix: ''
      },
      dash_vehicles,
      dash_employees,
      dash_tanks
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