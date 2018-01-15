<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$store.dispatch('GetVehicleTypes')
    this.$store.dispatch('GetLicensePlateTypes')
    this.$store.dispatch('GetStatusType')
    this.$store.dispatch('GetPositionType')
  }
}
</script>
