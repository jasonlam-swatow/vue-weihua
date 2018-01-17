import Vue from 'vue'
import Router from 'vue-router'
// import store from './../store'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    name: '首页',
    hidden: true,
    children: [
      {
        path: 'home',
        component: _import('dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'home' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/business',
    component: Layout,
    redirect: '/business/info',
    name: '企业管理',
    meta: { title: '企业管理', icon: 'enterprise' },
    children: [
      {
        path: 'enterprises',
        name: '企业管理',
        component: _import('business/enterprises/index'),
        meta: { title: '企业管理', icon: 'cubes' }
        // hidden:
      },
      {
        path: 'info',
        name: '企业信息',
        component: _import('business/info/index'),
        meta: { title: '企业信息', icon: 'cubes' }
      }, {
        path: 'info/edit',
        name: '企业信息修改',
        component: _import('business/info/edit'),
        meta: { title: '企业信息修改' },
        hidden: true
      }, {
        path: 'employees',
        name: '员工管理',
        component: _import('business/employees/index'),
        meta: { title: '员工管理', icon: 'group' }
      }, {
        path: 'employees/edit',
        name: '员工信息新增/修改',
        component: _import('business/employees/edit'),
        meta: { title: '员工信息新增/修改' },
        hidden: true
      }, {
        path: 'employees/add',
        name: '员工信息新增/修改',
        component: _import('business/employees/edit'),
        meta: { title: '员工信息新增/修改' },
        hidden: true
      }, {
        path: 'vehicles',
        name: '车辆管理',
        component: _import('business/vehicles/index'),
        meta: { title: '车辆管理', icon: 'vehicle' }
      }, {
        path: 'tanks',
        name: '罐体管理',
        component: _import('business/tanks/index'),
        meta: { title: '罐体管理', icon: 'tanks' }
      }
    ]
  }, {
    path: '/orders',
    component: Layout,
    redirect: '/orders/search',
    name: '运单管理',
    meta: { title: '运单管理', icon: 'file' },
    children: [
      {
        path: 'search',
        name: '运单需求查询',
        component: _import('table/index'),
        meta: { title: '运单需求查询', icon: 'search' }
      }, {
        path: 'accepted',
        name: '已接运单',
        component: _import('tree/index'),
        meta: { title: '已接运单', icon: 'order' }
      }, {
        path: 'pin',
        name: '在途车辆定位',
        component: _import('tree/index'),
        meta: { title: '在途车辆定位', icon: 'location' }
      }, {
        path: 'epass',
        name: '电子通行证',
        component: _import('tree/index'),
        meta: { title: '电子通行证', icon: 'certificate' }
      }, {
        path: 'collaborators',
        name: '合作委托企业',
        component: _import('orders/collaborators'),
        meta: { title: '合作委托企业', icon: 'suitcase' }
      }
    ]
  }, {
    path: '/finance',
    component: Layout,
    redirect: '/finance/income',
    name: '财务管理',
    meta: { title: '财务管理', icon: 'money' },
    children: [
      {
        path: 'income',
        name: '收入流水',
        component: _import('table/index'),
        meta: { title: '收入流水', icon: 'income' }
      }, {
        path: 'statements',
        name: '收支报表',
        component: _import('tree/index'),
        meta: { title: '收支报表', icon: 'statements' }
      }, {
        path: 'invoices',
        name: '发票管理',
        component: _import('tree/index'),
        meta: { title: '发票管理', icon: 'coupon' }
      }, {
        path: 'accounting',
        name: '人工记账',
        component: _import('tree/index'),
        meta: { title: '人工记账', icon: 'bills' }
      }
    ]
  }, {
    path: '/settings',
    component: Layout,
    redirect: '/settings/systemg',
    name: '其他',
    meta: { title: '其他', icon: 'stacks' },
    children: [
      {
        path: 'system',
        name: '系统消息配置',
        component: _import('settings/system/index'),
        meta: { title: '系统消息配置', icon: 'setting' }
      }, {
        path: 'messages',
        name: '我的消息',
        component: _import('tree/index'),
        meta: { title: '我的消息', icon: 'bell' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

