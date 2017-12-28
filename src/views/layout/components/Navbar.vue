<template>
  <el-menu class="navbar" mode="horizontal">
    <el-menu-item index="1" class="logo">
      <router-link to="/home">
          <img class="logo-image" src="../../../assets/logo.png" alt="logo">
          <span class="logo-name">危化运输</span>
        </router-link>
    </el-menu-item>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <!-- <breadcrumb></breadcrumb> -->
    <div class="navbar-workbench">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-menu-item index="2">
        <!-- <svg-icon icon-class="bell-o" /> -->
        <i class="el-icon-bell"></i>
      </el-menu-item>
      <el-menu-item index="3">
        <svg-icon icon-class="setting" />
      </el-menu-item>
      <el-menu-item index="4" class="welcome">
        <span>欢迎你，{{name}}</span>
      </el-menu-item>
      <el-menu-item index="5">
        <svg-icon icon-class="home" />
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/variables.scss';

.navbar {
  $color: #fff;

  height: $navbarHeight;
  width: 100%;
  line-height: $navbarHeight;
  border-radius: 0px !important;
  position: fixed;
  z-index: map-get($zIndex, drone);
  background-color: transparent;
  border: none;

  .el-menu-item {
    height: $navbarHeight;
    line-height: $navbarHeight;
    color: $color;

    i {
      color: $color;
    }

    &:hover,
    &:focus {
      background-color: inherit;
      border-bottom-color: rgb(64, 158, 255) !important;
    }
  }
  .logo {
    width: 180px;
    height: $navbarHeight;
    &-name {
      font-size: 28px;
      line-height: $navbarHeight;
      color: $color;
    }
    &-image {
      width: 28px;
      height: 28px;
      margin-right: 8px;
    }
  }
  .hamburger-container {
    line-height: 58px;
    height: $navbarHeight;
    float: left;
    padding: 0 8px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  &-workbench > * {
    float: right;
  }
  .avatar-container {
    height: $navbarHeight;
    display: inline-block;
    margin-right: 35px;
    // position: absolute;
    // right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

