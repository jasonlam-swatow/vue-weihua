<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-openeds="defaultOpeneds" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="permittedRouters"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      'permittedRouters'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    defaultOpeneds() {
      const openeds = []
      this.permittedRouters.forEach(_ => {
        if (_.name) openeds.push(_.name)
      })
      return openeds
    }
  }
}
</script>
