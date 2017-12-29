<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="navbar-container">
      <navbar></navbar>
      <breadcrumb></breadcrumb>
    </div>
    <div class="main-container">
      <app-main></app-main>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, Breadcrumb, FooterBar } from './components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Breadcrumb,
    FooterBar
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  // height: 100vh;
  width: 100%;
  background-color: $mainBg;
}
.app-wrapper,
.navbar-container {
  background-image: url("./../../assets/main-bg.png");
  background-position: top center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.navbar-container {
  position: fixed;
  width: 100%;
  z-index: map-get($zIndex, drone);
}
</style>
