<template>
  <div class="sub-navbar">
    <div class="home-nav">
      <router-link to="/">
        <svg-icon icon-class="home"></svg-icon>
        <span>业务工作台首页</span>
      </router-link>
    </div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
          <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
          <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  // name: 'Breadcrumb',
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== '首页') {
        matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
      }
      console.log(matched)
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/variables.scss';
  .sub-navbar {
    background-color: transparent;
    color: $subNavbarColor;
    width: 100%;
    height: $subNavbarHeight;
    // position: fixed;
    // top: $navbarHeight;
    display: block;

    * {
      vertical-align: middle;
    }

    .home-nav {
      width: $subNavbarWidth;
      line-height: $subNavbarHeight;
      display: table-cell;
      text-align: center;
      position: relative;

      a {
        position: absolute;
        top: 48%;
        left: 0;
        right: 0;
        transform: translateY(-50%)
      }
    }
  }
  .app-breadcrumb {
    &.el-breadcrumb {
      display: table-cell;
      font-size: 14px;
      line-height: 50px;
      margin-left: 30px;
      line-height: $subNavbarHeight;
      padding-left: 24px;

      .el-breadcrumb__inner * {
        color: $subNavbarColor;
      }

      .no-redirect {
        cursor: text;
      }
    }
  }
</style>
