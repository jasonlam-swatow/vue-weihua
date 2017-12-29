<template>
  <el-card class="dashboard-steps mgb24">
    <el-steps :active="2" align-center simple>
      <el-step class="step-1" title="企业信息认证审核通过"></el-step>
      <el-step class="step-2" title="至少一个人审核通过"></el-step>
      <el-step class="step-3" title="至少一辆车审核通过"></el-step>
      <el-step class="step-4" title="至少一个罐体审核通过"></el-step>
      <el-step class="step-5" title="完成认证即可承运订单！"></el-step>
      <el-step class="step-6" title="恭喜已可承运订单！"></el-step>
    </el-steps>
  </el-card>
</template>

<script>
export default {
  name: 'progressBar'
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/variables.scss";
$grey-images: (
  1: url('./../../../assets/enterprise-grey.png'),
  2: url('./../../../assets/employee-grey.png'),
  3: url('./../../../assets/vehicle-grey.png'),
  4: url('./../../../assets/tank-grey.png'),
  5: url('./../../../assets/order-grey.png')
);
$orange-images: (
  1: url('./../../../assets/enterprise-orange.png'),
  2: url('./../../../assets/employee-orange.png'),
  3: url('./../../../assets/vehicle-orange.png'),
  4: url('./../../../assets/tank-orange.png'),
  5: url('./../../../assets/order-orange.png')
);
.dashboard-steps {
  @each $index, $image in $grey-images {
    .step-#{$index} .el-step__head {
      background-image: $image;
    }
  }
  @each $index, $image in $orange-images {
    .step-#{$index}  .el-step__head.is-finish {
      background-image: $image;
    }
  }
  .el-steps--simple {
    padding: 12px 24px;
    background-color: #fff;
  }
  .el-step.is-simple {
    display: inline-block;

    & + .el-step.is-simple {
      margin-left: 6%;
    }

    .el-step__head {
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
      width: 85px;
      height: 72px;
      margin: 0 auto;
    }
    .el-step__title {
      font-size: 14px;
      text-align: center;
      margin-top: 12px;
      max-width: 100% !important;
      color: map-get($palette, info);
      font-weight: normal;
    }
    .el-step__arrow {
      position: absolute;
      right: -28px;
      top: -12px;
      &::before,
      &::after {
        width: 2px;
      }
    }
  }
}
</style>